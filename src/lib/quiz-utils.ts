import type { Card } from "./types";

export interface QuizEntry {
  question: Card;
  answer: Card | null;
}

const CONCEPT_TYPES = new Set(["definition", "intuition", "example", "formula"]);

function countTagOverlap(a: string[], b: string[]): number {
  const setB = new Set(b);
  return a.filter((t) => setB.has(t)).length;
}

export function buildQuizDeck(cards: Card[]): QuizEntry[] {
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
