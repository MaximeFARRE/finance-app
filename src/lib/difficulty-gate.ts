import type { Card, CardProgress, Difficulty } from "./types";

// ---------------------------------------------------------------------------
// Seuil de maîtrise pour déverrouiller la difficulté suivante
// ---------------------------------------------------------------------------

const MASTERY_THRESHOLD = 0.7; // 70 %

/**
 * Une carte est considérée "maîtrisée" si la dernière réponse était correcte
 * (quality ≥ 3 dans SM-2 → repetitions >= 1 et pas de reset depuis).
 * Proxy fiable car SM-2 remet repetitions à 0 si quality < 3.
 */
function isMastered(cardId: string, cardProgress: Record<string, CardProgress>): boolean {
  const progress = cardProgress[cardId];
  return progress !== undefined && progress.repetitions >= 1;
}

// ---------------------------------------------------------------------------
// Vérification du déverrouillage par difficulté
// ---------------------------------------------------------------------------

/**
 * Vérifie si les cartes d'une difficulté donnée sont débloquées dans une leçon.
 *
 * Règles :
 * - Difficulté 1 : toujours débloquée
 * - Difficulté 2 : débloquée si ≥ 70 % des cartes de difficulté 1 sont maîtrisées
 * - Difficulté 3 : débloquée si ≥ 70 % des cartes de difficulté 1+2 sont maîtrisées
 */
export function isDifficultyUnlocked(
  lessonCards: Card[],
  cardProgress: Record<string, CardProgress>,
  targetDifficulty: Difficulty,
): boolean {
  if (targetDifficulty === 1) return true;

  const prerequisiteDifficulties: Difficulty[] =
    targetDifficulty === 2 ? [1] : [1, 2];

  const prerequisites = lessonCards.filter((c) =>
    prerequisiteDifficulties.includes(c.difficulty),
  );

  if (prerequisites.length === 0) return true; // rien à vérifier

  const masteredCount = prerequisites.filter((c) =>
    isMastered(c.id, cardProgress),
  ).length;

  return masteredCount / prerequisites.length >= MASTERY_THRESHOLD;
}

// ---------------------------------------------------------------------------
// Filtre des cartes selon la difficulté débloquée
// ---------------------------------------------------------------------------

/**
 * Filtre les cartes d'une leçon en ne gardant que celles dont la difficulté
 * est débloquée. Garantit qu'il y a toujours au moins les cartes de difficulté 1.
 */
export function filterByUnlockedDifficulty(
  cards: Card[],
  cardProgress: Record<string, CardProgress>,
): Card[] {
  return cards.filter((card) =>
    isDifficultyUnlocked(cards, cardProgress, card.difficulty),
  );
}
