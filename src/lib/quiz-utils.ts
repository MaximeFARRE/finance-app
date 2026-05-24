import type { Card, CardProgress } from "./types";
import { isDueForReview } from "./spaced-repetition";
import { filterByUnlockedDifficulty } from "./difficulty-gate";

export interface QuizEntry {
  question: Card;
  answer: Card | null;
}

const CONCEPT_TYPES = new Set(["definition", "intuition", "example", "formula"]);

function countTagOverlap(a: string[], b: string[]): number {
  const setB = new Set(b);
  return a.filter((t) => setB.has(t)).length;
}

/**
 * Construit le deck de quiz pour une leçon.
 *
 * - Filtre les cartes selon la difficulté déverrouillée (gating SM-2)
 * - Trie : cartes dues en premier (les plus en retard d'abord), puis non-dues
 * - Apparie les interview-questions avec leur model-answer si disponible
 *
 * @param cards        Toutes les cartes de la leçon
 * @param cardProgress Progression SM-2 de l'utilisateur (défaut: {})
 */
export function buildQuizDeck(
  cards: Card[],
  cardProgress: Record<string, CardProgress> = {},
): QuizEntry[] {
  // 1. Filtrer par difficulté déverrouillée
  const unlocked = filterByUnlockedDifficulty(cards, cardProgress);

  // 2. Construire les entrées (question + réponse appariée)
  const entries = buildRawEntries(unlocked);

  // 3. Trier : dues d'abord (plus en retard = plus tôt), non-dues ensuite
  return entries.sort((a, b) => {
    const progA = cardProgress[a.question.id];
    const progB = cardProgress[b.question.id];
    const dueA = progA ? isDueForReview(progA) : false;
    const dueB = progB ? isDueForReview(progB) : false;

    if (dueA && !dueB) return -1;
    if (!dueA && dueB) return 1;
    if (dueA && dueB) {
      // Les deux sont dues : la plus en retard passe en premier
      return (
        new Date(progA!.nextReviewAt).getTime() -
        new Date(progB!.nextReviewAt).getTime()
      );
    }
    return 0; // préserver l'ordre pour les non-dues
  });
}

function buildRawEntries(cards: Card[]): QuizEntry[] {
  const questions = cards.filter((c) => c.type === "interview-question");

  if (questions.length === 0) {
    return cards.map((c) => ({ question: c, answer: null }));
  }

  const modelAnswers = cards.filter((c) => c.type === "model-answer");

  return questions.map((q) => {
    const answer =
      modelAnswers.reduce<Card | null>((best, ma) => {
        const score = countTagOverlap(q.tags, ma.tags);
        const bestScore = best ? countTagOverlap(q.tags, best.tags) : -1;
        return score > bestScore ? ma : best;
      }, null) ?? null;

    return { question: q, answer };
  });
}

export function findRelatedConceptCards(failedCard: Card, allCards: Card[]): Card[] {
  if (failedCard.tags.length === 0) return [];
  const failedTags = new Set(failedCard.tags);
  return allCards.filter(
    (c) => c.id !== failedCard.id && CONCEPT_TYPES.has(c.type) && c.tags.some((t) => failedTags.has(t)),
  );
}
