import type { LearningWorld, Lesson } from "./types";

export function isLessonUnlocked(
  lessons: Lesson[],
  lessonId: string,
  completedLessonIds: string[],
  worlds?: LearningWorld[],
): boolean {
  const lesson = lessons.find((l) => l.id === lessonId);

  // Boss: toutes les leçons du monde (sauf le boss lui-même) doivent être complétées
  if (lesson?.kind === "boss" && worlds) {
    const world = worlds.find((w) => w.bossLessonId === lessonId);
    if (world) {
      const required = world.lessonIds.filter((id) => id !== lessonId);
      return required.every((id) => completedLessonIds.includes(id));
    }
  }

  // Défaut : déverrouillage linéaire — la leçon précédente doit être complétée
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
