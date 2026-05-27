import { describe, it, expect } from "vitest";
import { isLessonUnlocked, isLessonCompleted, hasCompletedLearnSession } from "./unlock";
import type { LearningWorld, Lesson } from "./types";

function makeLesson(id: string, kind?: Lesson["kind"]): Lesson {
  return { id, slug: id, title: id, description: "", estimatedMinutes: 5, cards: [], kind };
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

  describe("boss lesson unlock", () => {
    const bossLesson = makeLesson("boss", "boss");
    const worldLessons: Lesson[] = [makeLesson("w1"), makeLesson("w2"), makeLesson("w3"), bossLesson];
    const world: LearningWorld = {
      id: "world-1",
      trackId: "track-1",
      title: "World 1",
      description: "",
      order: 1,
      lessonIds: ["w1", "w2", "w3", "boss"],
      bossLessonId: "boss",
    };

    it("does not unlock boss if no world lessons are completed", () => {
      expect(isLessonUnlocked(worldLessons, "boss", [], [world])).toBe(false);
    });

    it("does not unlock boss if only some world lessons are completed", () => {
      expect(isLessonUnlocked(worldLessons, "boss", ["w1", "w2"], [world])).toBe(false);
    });

    it("unlocks boss when all world lessons (except boss) are completed", () => {
      expect(isLessonUnlocked(worldLessons, "boss", ["w1", "w2", "w3"], [world])).toBe(true);
    });

    it("falls back to linear unlock if no matching world found", () => {
      expect(isLessonUnlocked(worldLessons, "boss", ["w3"], [])).toBe(true);
    });
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

describe("hasCompletedLearnSession", () => {
  it("returns false when learnSessionIds is empty", () => {
    expect(hasCompletedLearnSession("l1", [])).toBe(false);
  });

  it("returns true when lessonId is in learnSessionIds", () => {
    expect(hasCompletedLearnSession("l1", ["l1", "l2"])).toBe(true);
  });

  it("returns false when lessonId is not in learnSessionIds", () => {
    expect(hasCompletedLearnSession("l3", ["l1", "l2"])).toBe(false);
  });
});
