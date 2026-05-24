/**
 * Point d'entrée public du module import/export.
 *
 * Expose trois fonctions de haut niveau :
 *   - `analyzeImport`  : parse + diff sans écrire en base
 *   - `applyImport`    : écrit le résultat du diff dans le ContentProvider
 *   - `exportContent`  : sérialise le contenu dans le format choisi
 *
 * Ces fonctions sont le seul point de contact entre l'UI et le moteur.
 */

import type { ContentProvider } from "../content-provider";
import type { ExportOptions, ImportResult, Track } from "../types";
import { parseYaml, exportYaml } from "./yaml-io";
import { parseJson, exportJson } from "./json-io";
import { parseCsv, exportCsv } from "./csv-io";
import { computeImportDiff } from "./diff";
import type { NormalizedFullImport, NormalizedQuickImport } from "./normalizer";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ImportFormat = "yaml" | "json" | "csv";

export interface AnalyzeImportOptions {
  /** Slug de la leçon cible, requis pour le format "import rapide" */
  lessonSlug?: string;
}

export interface AnalyzeResult {
  /** Format détecté dans le fichier */
  format: ImportFormat | null;
  /** Résultat du diff (cartes ajoutées, modifiées, inchangées) */
  diff: ImportResult | null;
  /** Données normalisées issues du parsing (null si erreurs) */
  normalized: NormalizedFullImport | NormalizedQuickImport | null;
  /** Erreurs de validation ou de parsing */
  errors: string[];
}

// ---------------------------------------------------------------------------
// analyzeImport
// ---------------------------------------------------------------------------

/**
 * Parse le fichier et calcule le diff avec le contenu existant.
 * **Ne modifie pas la base de données.**
 *
 * @param text      Contenu brut du fichier importé
 * @param format    Format du fichier ("yaml" | "json" | "csv")
 * @param provider  ContentProvider pour lire les cartes existantes
 * @param options   Options optionnelles (lessonSlug pour import rapide)
 */
export async function analyzeImport(
  text: string,
  format: ImportFormat,
  provider: ContentProvider,
  options: AnalyzeImportOptions = {},
): Promise<AnalyzeResult> {
  // 1. Récupérer les IDs existants pour l'auto-génération
  const allCards = await provider.getAllCards();
  const existingIds = new Set(allCards.map((c) => c.id));

  // 2. Parser le fichier selon le format
  let normalized: NormalizedFullImport | NormalizedQuickImport | null = null;
  let parseErrors: string[] = [];
  let detectedFormat: "full" | "quick" | null = null;

  if (format === "yaml") {
    const result = parseYaml(text, existingIds, options.lessonSlug ?? "");
    if (result.format !== null) {
      normalized = result.data;
      detectedFormat = result.format;
    }
    parseErrors = result.errors;
  } else if (format === "json") {
    const result = parseJson(text, existingIds, options.lessonSlug ?? "");
    if (result.format !== null) {
      normalized = result.data;
      detectedFormat = result.format;
    }
    parseErrors = result.errors;
  } else {
    const result = parseCsv(text, existingIds);
    if (result.format !== null) {
      normalized = result.data;
      detectedFormat = result.format;
    }
    parseErrors = result.errors;
  }

  if (!normalized || parseErrors.length > 0) {
    return { format, diff: null, normalized: null, errors: parseErrors };
  }

  // 3. Calculer le diff
  const incoming = buildIncomingList(normalized, detectedFormat);
  const diff = computeImportDiff(incoming, allCards);

  return { format, diff, normalized, errors: [] };
}

// ---------------------------------------------------------------------------
// applyImport
// ---------------------------------------------------------------------------

/**
 * Applique le résultat d'un `analyzeImport` dans la base de données.
 * Crée les tracks/leçons manquants et upserte toutes les cartes.
 *
 * @param result    Résultat d'un `analyzeImport` réussi
 * @param normalized Données normalisées issues du même `analyzeImport`
 * @param provider  ContentProvider
 * @param changedBy Identifiant de la source (ex: "import:mon-fichier.yaml")
 */
export async function applyImport(
  result: ImportResult,
  normalized: NormalizedFullImport | NormalizedQuickImport,
  provider: ContentProvider,
  changedBy: string,
): Promise<void> {
  if ("track" in normalized) {
    // Format "track complet" — upsert track + leçons + cartes
    await provider.upsertTrack(normalized.track);

    for (const { trackId, meta, cards } of normalized.lessons) {
      await provider.upsertLesson(trackId, meta);
      await provider.bulkUpsertCards(meta.id, cards, changedBy);
    }
  } else {
    // Format "import rapide" — cartes vers une leçon existante
    const { target, cards } = normalized;
    await provider.bulkUpsertCards(target.lessonId, cards, changedBy);
  }
}

// ---------------------------------------------------------------------------
// exportContent
// ---------------------------------------------------------------------------

/**
 * Sérialise le contenu dans le format choisi.
 *
 * @param tracks   Données à exporter
 * @param options  Options d'export (format, scope, trackId, lessonId…)
 */
export function exportContent(
  tracks: Track[],
  options: ExportOptions,
): string {
  switch (options.format) {
    case "yaml":
      return exportYaml(tracks, options);
    case "json":
      return exportJson(tracks, options);
    case "csv":
      return exportCsv(tracks, {
        ...options,
        separator: options.csvSeparator ?? ";",
      });
  }
}

// ---------------------------------------------------------------------------
// Helpers internes
// ---------------------------------------------------------------------------

function buildIncomingList(
  normalized: NormalizedFullImport | NormalizedQuickImport,
  format: "full" | "quick" | null,
): Array<{ card: import("../types").Card; trackId: string; lessonId: string }> {
  if (format === "quick" || (!("track" in normalized) && "target" in normalized)) {
    const n = normalized as NormalizedQuickImport;
    return n.cards.map((card) => ({
      card,
      trackId: n.target.trackId,
      lessonId: n.target.lessonId,
    }));
  }

  const n = normalized as NormalizedFullImport;
  return n.lessons.flatMap(({ trackId, meta, cards }) =>
    cards.map((card) => ({ card, trackId, lessonId: meta.id })),
  );
}

// ---------------------------------------------------------------------------
// Re-exports pour usage direct
// ---------------------------------------------------------------------------

export { parseYaml, exportYaml } from "./yaml-io";
export { parseJson, exportJson } from "./json-io";
export { parseCsv, exportCsv } from "./csv-io";
export { computeImportDiff } from "./diff";
export { generateCardId } from "./id-generator";
export { normalizeFullImport, normalizeQuickImport } from "./normalizer";
export type { NormalizedFullImport, NormalizedQuickImport } from "./normalizer";
export type { YamlParseResult } from "./yaml-io";
export type { JsonParseResult } from "./json-io";
export type { CsvParseResult } from "./csv-io";
