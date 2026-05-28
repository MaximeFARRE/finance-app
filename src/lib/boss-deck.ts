import type { Card, CardProgress, Track } from "./types";
import { filterByUnlockedDifficulty } from "./difficulty-gate";
import { isDueForReview } from "./spaced-repetition";
import type { QuizEntry } from "./quiz-utils";

export const DEFAULT_BOSS_DECK_LIMIT = 15;

export interface BuildBossDeckParams {
  track: Track;
  worldId: string;
  progress?: Record<string, CardProgress>;
  limit?: number;
}

export function buildBossDeck({
  track,
  worldId,
  progress = {},
  limit = DEFAULT_BOSS_DECK_LIMIT,
}: BuildBossDeckParams): QuizEntry[] {
  if (limit <= 0) return [];

  const world = track.worlds?.find((item) => item.id === worldId);
  if (!world) return [];

  const bossLessonIds = new Set(
    track.lessons.filter((lesson) => lesson.kind === "boss").map((lesson) => lesson.id),
  );
  if (world.bossLessonId) bossLessonIds.add(world.bossLessonId);

  const cards = world.lessonIds.flatMap((lessonId) => {
    if (bossLessonIds.has(lessonId)) return [];
    const lesson = track.lessons.find((item) => item.id === lessonId);
    return lesson?.cards ?? [];
  });

  const trackCards = cards.filter(
    (card) => !card.trackId || card.trackId === track.id || card.trackIds?.includes(track.id),
  );
  const unlockedCards = filterByUnlockedDifficulty(trackCards, progress);
  const entries = unlockedCards.map((card) => ({ question: card, answer: null }));

  return entries.sort((a, b) => compareDueCards(a.question, b.question, progress)).slice(0, limit);
}

function compareDueCards(
  a: Card,
  b: Card,
  progress: Record<string, CardProgress>,
): number {
  const progA = progress[a.id];
  const progB = progress[b.id];
  const dueA = progA ? isDueForReview(progA) : false;
  const dueB = progB ? isDueForReview(progB) : false;

  if (dueA && !dueB) return -1;
  if (!dueA && dueB) return 1;
  if (dueA && dueB) {
    return new Date(progA!.nextReviewAt).getTime() - new Date(progB!.nextReviewAt).getTime();
  }
  return 0;
}
