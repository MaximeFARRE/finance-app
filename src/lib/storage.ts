import type { UserProgress } from "./types";

const STORAGE_KEY = "finance-app:progress";

function makeInitialProgress(): UserProgress {
  return {
    userId: "default",
    xp: 0,
    streak: 0,
    lastSessionAt: null,
    cards: {},
    completedLessonIds: [],
    lessonStars: {},
    learnedCardIds: [],
    learnSessionIds: [],
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return makeInitialProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return makeInitialProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    // Forward-migration: back-fill fields added after initial release
    if (!parsed.learnedCardIds) parsed.learnedCardIds = [];
    if (!parsed.learnSessionIds) parsed.learnSessionIds = [];
    return parsed;
  } catch {
    return makeInitialProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
