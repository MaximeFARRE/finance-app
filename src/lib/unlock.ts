import type { Lesson } from "./types";

export function isLessonUnlocked(
  lessons: Lesson[],
  lessonId: string,
  completedLessonIds: string[],
): boolean {
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index <= 0) return true;
  const prev = lessons[index - 1];
  return prev !== undefined && completedLessonIds.includes(prev.id);
}

export function isLessonCompleted(
  lessonId: string,
  completedLessonIds: string[],
): boolean {
  return completedLessonIds.includes(lessonId);
}

export function hasCompletedLearnSession(
  lessonId: string,
  learnSessionIds: string[],
): boolean {
  return learnSessionIds.includes(lessonId);
}
