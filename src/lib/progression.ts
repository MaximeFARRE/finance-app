import type { AnswerQuality, ReviewResult, UserProgress } from "./types";

const XP_PER_QUALITY: Record<AnswerQuality, number> = {
  0: 0,
  1: 0,
  2: 2,
  3: 5,
  4: 10,
  5: 15,
};

const STREAK_BONUS_THRESHOLD = 3;
const STREAK_BONUS_MULTIPLIER = 1.5;

export function computeXpGain(quality: AnswerQuality, streak: number): number {
  const base = XP_PER_QUALITY[quality];
  if (streak >= STREAK_BONUS_THRESHOLD) {
    return Math.round(base * STREAK_BONUS_MULTIPLIER);
  }
  return base;
}

export function computeLessonStars(results: ReviewResult[]): 0 | 1 | 2 | 3 {
  if (results.length === 0) return 0;
  const correct = results.filter((r) => r.quality >= 2).length;
  const ratio = correct / results.length;
  if (ratio === 1) return 3;
  if (ratio >= 0.7) return 2;
  return 1;
}

export function updateStreak(progress: UserProgress): number {
  if (!progress.lastSessionAt) return 1;
  const diffMs = Date.now() - new Date(progress.lastSessionAt).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return progress.streak;
  if (diffDays === 1) return progress.streak + 1;
  return 1;
}
