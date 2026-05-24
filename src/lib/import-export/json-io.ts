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

export type JsonParseResult =
  | { format: "full"; data: NormalizedFullImport; errors: string[] }
  | { format: "quick"; data: NormalizedQuickImport; errors: string[] }
  | { format: null; data: null; errors: string[] };

// ---------------------------------------------------------------------------
// Import JSON
// ---------------------------------------------------------------------------

/**
 * Parse un texte JSON et retourne les données normalisées.
 *
 * Détecte automatiquement le format :
 * - Clé `track` au premier niveau → format "track complet"
 * - Clé `target` au premier niveau → format "import rapide"
 *
 * @param text          Contenu brut du fichier JSON
 * @param existingIds   IDs déjà en base (pour éviter les collisions)
 * @param lessonSlug    Slug de la leçon cible (requis pour l'import rapide)
 */
export function parseJson(
  text: string,
  existingIds: Set<string> = new Set(),
  lessonSlug = "",
): JsonParseResult {
  let raw: unknown;

  try {
    raw = JSON.parse(text);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { format: null, data: null, errors: [`Erreur de parsing JSON : ${msg}`] };
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { format: null, data: null, errors: ["Le fichier JSON doit contenir un objet à la racine"] };
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
    errors: ["Format JSON non reconnu : clé `track` ou `target` attendue à la racine"],
  };
}

// ---------------------------------------------------------------------------
// Export JSON
// ---------------------------------------------------------------------------

/**
 * Sérialise des tracks en JSON indenté (2 espaces).
 *
 * - scope "all"    → tableau de tracks
 * - scope "track"  → un seul track (options.trackId requis)
 * - scope "lesson" → un track filtré à une seule leçon
 */
export function exportJson(tracks: Track[], options: ExportOptions): string {
  const filtered = filterTracks(tracks, options);

  if (filtered.length === 0) {
    return JSON.stringify({ error: "Aucun contenu correspondant" }, null, 2);
  }

  if (filtered.length === 1 && filtered[0]) {
    // Un seul track → format "track complet"
    const track = filtered[0];
    const doc = buildTrackDoc(track);
    return JSON.stringify(doc, null, 2);
  }

  // Plusieurs tracks → tableau
  return JSON.stringify(filtered.map(buildTrackDoc), null, 2);
}

// ---------------------------------------------------------------------------
// Helpers internes
// ---------------------------------------------------------------------------

function buildTrackDoc(track: Track): Record<string, unknown> {
  return {
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
        if (card.detail !== undefined) c["detail"] = card.detail;
        return c;
      }),
    })),
  };
}

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
