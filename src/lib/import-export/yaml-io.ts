import YAML from "yaml";
import type { Track } from "../types";
import type { ExportOptions } from "../types";
import { FullImportSchema, QuickImportSchema } from "./schemas";
import {
  normalizeFullImport,
  normalizeQuickImport,
  type NormalizedFullImport,
  type NormalizedQuickImport,
} from "./normalizer";

// ---------------------------------------------------------------------------
// Types publics
// ---------------------------------------------------------------------------

export type YamlParseResult =
  | { format: "full"; data: NormalizedFullImport; errors: string[] }
  | { format: "quick"; data: NormalizedQuickImport; errors: string[] }
  | { format: null; data: null; errors: string[] };

// ---------------------------------------------------------------------------
// Import YAML
// ---------------------------------------------------------------------------

/**
 * Parse un texte YAML et retourne les données normalisées.
 *
 * Détecte automatiquement le format :
 * - Clé `track` au premier niveau → format "track complet"
 * - Clé `target` au premier niveau → format "import rapide"
 *
 * @param text          Contenu brut du fichier YAML
 * @param existingIds   IDs déjà en base (pour éviter les collisions lors de l'auto-génération)
 * @param lessonSlug    Slug de la leçon cible (requis pour l'import rapide, afin de générer les IDs)
 */
export function parseYaml(
  text: string,
  existingIds: Set<string> = new Set(),
  lessonSlug = "",
): YamlParseResult {
  let raw: unknown;

  try {
    raw = YAML.parse(text);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { format: null, data: null, errors: [`Erreur de parsing YAML : ${msg}`] };
  }

  if (!raw || typeof raw !== "object") {
    return { format: null, data: null, errors: ["Le fichier YAML ne contient pas un objet valide"] };
  }

  const obj = raw as Record<string, unknown>;

  // --- Format "track complet" ---
  if ("track" in obj) {
    const parsed = FullImportSchema.safeParse(raw);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (i) => `${i.path.join(".")}: ${i.message}`,
      );
      return { format: null, data: null, errors };
    }
    const data = normalizeFullImport(parsed.data, existingIds);
    return { format: "full", data, errors: [] };
  }

  // --- Format "import rapide" ---
  if ("target" in obj) {
    const parsed = QuickImportSchema.safeParse(raw);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(
        (i) => `${i.path.join(".")}: ${i.message}`,
      );
      return { format: null, data: null, errors };
    }
    const data = normalizeQuickImport(parsed.data, lessonSlug, existingIds);
    return { format: "quick", data, errors: [] };
  }

  return {
    format: null,
    data: null,
    errors: ["Format YAML non reconnu : clé `track` ou `target` attendue au premier niveau"],
  };
}

// ---------------------------------------------------------------------------
// Export YAML
// ---------------------------------------------------------------------------

/**
 * Sérialise des tracks en YAML.
 *
 * - scope "all"    → toutes les tracks dans un tableau
 * - scope "track"  → une seule track (options.trackId requis)
 * - scope "lesson" → une track filtrée à une seule leçon (options.lessonId requis)
 */
export function exportYaml(tracks: Track[], options: ExportOptions): string {
  const filtered = filterTracks(tracks, options);
  const today = new Date().toISOString().slice(0, 10);

  if (filtered.length === 0) {
    return YAML.stringify({ error: "Aucun contenu correspondant" });
  }

  if (filtered.length === 1 && filtered[0]) {
    // Un seul track → format "track complet"
    const track = filtered[0];
    const doc = {
      track: {
        id: track.id,
        title: track.title,
        description: track.description,
        emoji: track.emoji,
        color: track.color,
      },
      lessons: track.lessons.map((lesson) => ({
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        estimatedMinutes: lesson.estimatedMinutes,
        cards: lesson.cards.map((card) => {
          const c: Record<string, unknown> = {
            id: card.id,
            type: card.type,
            difficulty: card.difficulty,
            tags: card.tags,
            front: card.front,
            back: card.back,
          };
          if (card.detail) c["detail"] = card.detail;
          return c;
        }),
      })),
    };

    const header = [
      `# Finance Learning — Export`,
      `# Format: track-complet`,
      `# Date: ${today}`,
      "",
    ].join("\n");

    return header + YAML.stringify(doc, { lineWidth: 0 });
  }

  // Plusieurs tracks → tableau de documents track complet
  const header = [
    `# Finance Learning — Export`,
    `# Format: multi-tracks`,
    `# Date: ${today}`,
    "",
  ].join("\n");

  const docs = filtered.map((track) => ({
    track: {
      id: track.id,
      title: track.title,
      description: track.description,
      emoji: track.emoji,
      color: track.color,
    },
    lessons: track.lessons.map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      estimatedMinutes: lesson.estimatedMinutes,
      cards: lesson.cards.map((card) => {
        const c: Record<string, unknown> = {
          id: card.id,
          type: card.type,
          difficulty: card.difficulty,
          tags: card.tags,
          front: card.front,
          back: card.back,
        };
        if (card.detail) c["detail"] = card.detail;
        return c;
      }),
    })),
  }));

  return header + YAML.stringify(docs, { lineWidth: 0 });
}

// ---------------------------------------------------------------------------
// Helpers internes
// ---------------------------------------------------------------------------

function filterTracks(tracks: Track[], options: ExportOptions): Track[] {
  if (options.scope === "track" && options.trackId) {
    return tracks.filter((t) => t.id === options.trackId);
  }

  if (options.scope === "lesson" && options.trackId && options.lessonId) {
    return tracks
      .filter((t) => t.id === options.trackId)
      .map((t) => ({
        ...t,
        lessons: t.lessons.filter((l) => l.id === options.lessonId),
      }))
      .filter((t) => t.lessons.length > 0);
  }

  return tracks;
}
