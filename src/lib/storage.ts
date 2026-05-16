import type { UserProgress } from "./types";

const STORAGE_KEY = "finance-app:progress";

const INITIAL_PROGRESS: UserProgress = {
  userId: "default",
  xp: 0,
  streak: 0,
  lastSessionAt: null,
  cards: {},
  completedLessonIds: [],
  lessonStars: {},
};

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return INITIAL_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserProgress) : { ...INITIAL_PROGRESS };
  } catch {
    return { ...INITIAL_PROGRESS };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
