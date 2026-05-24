import type { Card, ImportResult } from "../types";

// ---------------------------------------------------------------------------
// Comparaison de cartes
// ---------------------------------------------------------------------------

/**
 * Vérifie si deux cartes ont un contenu identique.
 * Compare tous les champs métier — ignore les champs internes (sortOrder, etc.).
 */
function areCardsEqual(a: Card, b: Card): boolean {
  return (
    a.id === b.id &&
    a.type === b.type &&
    a.front === b.front &&
    a.back === b.back &&
    (a.detail ?? "") === (b.detail ?? "") &&
    a.difficulty === b.difficulty &&
    JSON.stringify([...a.tags].sort()) === JSON.stringify([...b.tags].sort())
  );
}

// ---------------------------------------------------------------------------
// Moteur de diff
// ---------------------------------------------------------------------------

/**
 * Compare les cartes entrantes avec les cartes existantes et produit un
 * `ImportResult` détaillant les ajouts, modifications et doublons.
 *
 * Logique par ID :
 * - ID présent dans `incoming` mais absent de `existing`  → `added`
 * - ID présent des deux côtés, contenu **différent**        → `modified`
 * - ID présent des deux côtés, contenu **identique**        → `unchanged`
 *
 * Les champs `trackId` et `lessonId` du `ImportResult` correspondent à
 * ceux passés via `context`.
 *
 * @param incoming  Cartes normalisées issues de l'import
 * @param existing  Cartes actuellement en base pour les mêmes leçons
 * @param context   Contexte de chaque carte entrante (trackId + lessonId)
 */
export function computeImportDiff(
  incoming: Array<{ card: Card; trackId: string; lessonId: string }>,
  existing: Card[],
): ImportResult {
  const existingById = new Map(existing.map((c) => [c.id, c]));

  const added: ImportResult["added"] = [];
  const modified: ImportResult["modified"] = [];
  const unchanged: Card[] = [];
  const errors: ImportResult["errors"] = [];

  for (const { card, trackId, lessonId } of incoming) {
    const existingCard = existingById.get(card.id);

    if (!existingCard) {
      added.push({ card, trackId, lessonId });
    } else if (!areCardsEqual(card, existingCard)) {
      modified.push({ before: existingCard, after: card, trackId, lessonId });
    } else {
      unchanged.push(existingCard);
    }
  }

  return {
    added,
    modified,
    unchanged,
    errors,
    newTracks: [],
    newLessons: [],
  };
}
