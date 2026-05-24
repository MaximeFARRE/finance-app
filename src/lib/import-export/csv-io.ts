import Papa from "papaparse";
import type { Track } from "../types";
import type { ExportOptions } from "../types";
import { FullImportSchema } from "./schemas";
import { normalizeFullImport, type NormalizedFullImport } from "./normalizer";

// ---------------------------------------------------------------------------
// Colonnes CSV (ordre canonique — 17 colonnes)
// ---------------------------------------------------------------------------

const CSV_COLUMNS = [
  "track_id",
  "track_title",
  "track_emoji",
  "track_color",
  "track_description",
  "lesson_id",
  "lesson_slug",
  "lesson_title",
  "lesson_description",
  "lesson_minutes",
  "card_id",
  "card_type",
  "card_difficulty",
  "card_tags",
  "card_front",
  "card_back",
  "card_detail",
] as const;

type CsvColumn = (typeof CSV_COLUMNS)[number];
type CsvRow = Record<CsvColumn, string>;

// ---------------------------------------------------------------------------
// Types publics
// ---------------------------------------------------------------------------

export type CsvParseResult =
  | { format: "full"; data: NormalizedFullImport; errors: string[] }
  | { format: null; data: null; errors: string[] };

// ---------------------------------------------------------------------------
// Import CSV
// ---------------------------------------------------------------------------

/**
 * Parse un fichier CSV et retourne les données normalisées.
 *
 * - Auto-détecte le séparateur (`;` ou `,`) en comptant les occurrences sur
 *   la ligne d'en-tête
 * - Gère le BOM UTF-8 éventuel en début de fichier
 * - Une ligne = une carte ; les métadonnées track/lesson sont répétées
 * - Reconstruit la hiérarchie track > lesson > cards
 * - Les IDs de carte vides sont auto-générés
 *
 * @param text          Contenu brut du fichier CSV
 * @param existingIds   IDs déjà en base (pour éviter les collisions)
 */
export function parseCsv(
  text: string,
  existingIds: Set<string> = new Set(),
): CsvParseResult {
  // Enlever le BOM UTF-8 éventuel
  const clean = text.startsWith("﻿") ? text.slice(1) : text;

  const separator = detectSeparator(clean);

  const parsed = Papa.parse<CsvRow>(clean, {
    header: true,
    delimiter: separator,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  if (parsed.errors.length > 0 && parsed.data.length === 0) {
    const errors = parsed.errors.map((e) => `Ligne ${e.row ?? "?"}: ${e.message}`);
    return { format: null, data: null, errors };
  }

  // Valider les colonnes requises
  const firstRow = parsed.data[0];
  if (!firstRow) {
    return { format: null, data: null, errors: ["Le fichier CSV est vide"] };
  }

  const missingCols = CSV_COLUMNS.filter(
    (col) => !(col in firstRow),
  );
  if (missingCols.length > 0) {
    return {
      format: null,
      data: null,
      errors: [`Colonnes manquantes : ${missingCols.join(", ")}`],
    };
  }

  // Reconstruire la hiérarchie à partir des lignes plates
  const errors: string[] = [];
  const trackMap = new Map<string, {
    trackData: Record<string, string>;
    lessonMap: Map<string, { lessonData: Record<string, string>; cards: CsvRow[] }>;
  }>();

  for (let i = 0; i < parsed.data.length; i++) {
    const row = parsed.data[i]!;
    const lineNum = i + 2; // +2 : 1-based + ligne d'en-tête

    const trackId = row.track_id?.trim();
    const lessonId = row.lesson_id?.trim();

    if (!trackId) {
      errors.push(`Ligne ${lineNum} : track_id vide`);
      continue;
    }
    if (!lessonId) {
      errors.push(`Ligne ${lineNum} : lesson_id vide`);
      continue;
    }

    if (!trackMap.has(trackId)) {
      trackMap.set(trackId, { trackData: row, lessonMap: new Map() });
    }

    const trackEntry = trackMap.get(trackId)!;
    if (!trackEntry.lessonMap.has(lessonId)) {
      trackEntry.lessonMap.set(lessonId, { lessonData: row, cards: [] });
    }

    trackEntry.lessonMap.get(lessonId)!.cards.push(row);
  }

  if (trackMap.size === 0) {
    return { format: null, data: null, errors: errors.length > 0 ? errors : ["Aucune ligne valide"] };
  }

  // Prendre le premier track (CSV = un track par fichier en pratique)
  const [trackId, trackEntry] = [...trackMap.entries()][0]!;
  const { trackData, lessonMap } = trackEntry;

  // Construire un objet compatible FullImportSchema
  const rawImport = {
    track: {
      id: trackId,
      title: trackData.track_title?.trim() ?? "",
      description: trackData.track_description?.trim() ?? "",
      emoji: trackData.track_emoji?.trim() ?? "📚",
      color: trackData.track_color?.trim() ?? "blue",
    },
    lessons: [...lessonMap.entries()].map(([lessonId, { lessonData, cards }]) => ({
      id: lessonId,
      slug: lessonData.lesson_slug?.trim() ?? "",
      title: lessonData.lesson_title?.trim() ?? "",
      description: lessonData.lesson_description?.trim() ?? "",
      estimatedMinutes: parseInt(lessonData.lesson_minutes ?? "5", 10) || 5,
      cards: cards.map((row) =>
        buildCardFromRow(row),
      ),
    })),
  };

  const validated = FullImportSchema.safeParse(rawImport);
  if (!validated.success) {
    const zodErrors = validated.error.issues.map(
      (i) => `${i.path.join(".")}: ${i.message}`,
    );
    return { format: null, data: null, errors: [...errors, ...zodErrors] };
  }

  const data = normalizeFullImport(validated.data, existingIds);
  return { format: "full", data, errors };
}

// ---------------------------------------------------------------------------
// Export CSV
// ---------------------------------------------------------------------------

/**
 * Sérialise des tracks en CSV.
 * - Ajoute le BOM UTF-8 pour la compatibilité Excel FR
 * - Une ligne par carte, métadonnées track/lesson répétées
 * - Tags joints par `|`
 * - Champs multi-lignes gérés par RFC 4180 (PapaParse)
 */
export function exportCsv(
  tracks: Track[],
  options: ExportOptions & { separator?: ";" | "," },
): string {
  const separator = options.separator ?? ";";
  const filtered = filterTracks(tracks, options);
  const rows: CsvRow[] = [];

  for (const track of filtered) {
    for (const lesson of track.lessons) {
      for (const card of lesson.cards) {
        rows.push({
          track_id: track.id,
          track_title: track.title,
          track_emoji: track.emoji,
          track_color: track.color,
          track_description: track.description,
          lesson_id: lesson.id,
          lesson_slug: lesson.slug,
          lesson_title: lesson.title,
          lesson_description: lesson.description,
          lesson_minutes: String(lesson.estimatedMinutes),
          card_id: card.id,
          card_type: card.type,
          card_difficulty: String(card.difficulty),
          card_tags: card.tags.join("|"),
          card_front: card.front,
          card_back: card.back,
          card_detail: card.detail ?? "",
        });
      }
    }
  }

  if (rows.length === 0) {
    return "﻿" + Papa.unparse([[...CSV_COLUMNS]], { delimiter: separator });
  }

  const csv = Papa.unparse(rows, {
    columns: [...CSV_COLUMNS],
    delimiter: separator,
  });

  // BOM UTF-8 en préfixe
  return "﻿" + csv;
}

// ---------------------------------------------------------------------------
// Helpers internes
// ---------------------------------------------------------------------------

function detectSeparator(text: string): ";" | "," {
  // Analyser uniquement la première ligne (en-têtes)
  const firstLine = text.split("\n")[0] ?? "";
  const semicolons = (firstLine.match(/;/g) ?? []).length;
  const commas = (firstLine.match(/,/g) ?? []).length;
  return semicolons >= commas ? ";" : ",";
}

function buildCardFromRow(row: CsvRow): Record<string, unknown> {
  const card: Record<string, unknown> = {
    type: row.card_type?.trim(),
    front: row.card_front?.trim(),
    back: row.card_back?.trim(),
    difficulty: parseInt(row.card_difficulty ?? "1", 10) || 1,
    tags: row.card_tags
      ? row.card_tags
          .split("|")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
  };

  const cardId = row.card_id?.trim();
  if (cardId) card["id"] = cardId;

  const detail = row.card_detail?.trim();
  if (detail) card["detail"] = detail;

  return card;
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
