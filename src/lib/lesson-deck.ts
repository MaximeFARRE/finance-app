import type { Card, CardProgress } from "./types";
import { buildQuizDeck, type QuizEntry } from "./quiz-utils";

export const DEFAULT_LESSON_DECK_LIMIT = 10;

export interface BuildLessonDeckParams {
  trackId: string;
  cards: Card[];
  progress?: Record<string, CardProgress>;
  limit?: number;
}

export function buildLessonDeck({
  trackId,
  cards,
  progress = {},
  limit = DEFAULT_LESSON_DECK_LIMIT,
}: BuildLessonDeckParams): QuizEntry[] {
  const trackCards = cards.filter((card) => !card.trackId || card.trackId === trackId);
  const deck = buildQuizDeck(trackCards, progress);

  if (limit <= 0) return [];
  return deck.slice(0, limit);
}
