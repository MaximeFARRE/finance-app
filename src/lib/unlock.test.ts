import { describe, it, expect } from "vitest";
import { isLessonUnlocked, isLessonCompleted } from "./unlock";
import type { Lesson } from "./types";

function makeLesson(id: string): Lesson {
  return { id, slug: id, title: id, description: "", estimatedMinutes: 5, cards: [] };
}

const lessons: Lesson[] = [makeLesson("l1"), makeLesson("l2"), makeLesson("l3")];

describe("isLessonUnlocked", () => {
  it("always unlocks the first lesson", () => {
    expect(isLessonUnlocked(lessons, "l1", [])).toBe(true);
  });

  it("does not unlock l2 before l1 is completed", () => {
    expect(isLessonUnlocked(lessons, "l2", [])).toBe(false);
  });

  it("unlocks l2 after l1 is completed", () => {
    expect(isLessonUnlocked(lessons, "l2", ["l1"])).toBe(true);
  });

  it("does not unlock l3 if only l1 is completed", () => {
    expect(isLessonUnlocked(lessons, "l3", ["l1"])).toBe(false);
  });

  it("unlocks l3 after l1 and l2 are completed", () => {
    expect(isLessonUnlocked(lessons, "l3", ["l1", "l2"])).toBe(true);
  });
});

describe("isLessonCompleted", () => {
  it("returns false for empty completedLessonIds", () => {
    expect(isLessonCompleted("l1", [])).toBe(false);
  });

  it("returns true when lessonId is in completedLessonIds", () => {
    expect(isLessonCompleted("l1", ["l1", "l2"])).toBe(true);
  });
});
