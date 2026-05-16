import { describe, it, expect } from "vitest";
import { computeXpGain, computeLessonStars, updateStreak } from "./progression";
import type { UserProgress } from "./types";

function makeProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return {
    userId: "user-1",
    xp: 0,
    streak: 0,
    lastSessionAt: null,
    cards: {},
    completedLessonIds: [],
    lessonStars: {},
    learnedCardIds: [],
    learnSessionIds: [],
    ...overrides,
  };
}

describe("computeXpGain", () => {
  it("returns 0 for quality 0 and 1", () => {
    expect(computeXpGain(0, 1)).toBe(0);
    expect(computeXpGain(1, 1)).toBe(0);
  });

  it("returns base XP for low streak", () => {
    expect(computeXpGain(3, 1)).toBe(5);
    expect(computeXpGain(4, 1)).toBe(10);
    expect(computeXpGain(5, 2)).toBe(15);
  });

  it("applies streak bonus at threshold", () => {
    expect(computeXpGain(4, 3)).toBe(15);
    expect(computeXpGain(5, 5)).toBe(23);
  });
});

describe("computeLessonStars", () => {
  it("returns 3 stars for perfect score", () => {
    const results = [
      { cardId: "a", quality: 4 as const, timeSpentMs: 1000, xpGained: 10 },
      { cardId: "b", quality: 5 as const, timeSpentMs: 1000, xpGained: 15 },
    ];
    expect(computeLessonStars(results)).toBe(3);
  });

  it("returns 2 stars for 70%+ correct", () => {
    const results = [
      { cardId: "a", quality: 4 as const, timeSpentMs: 1000, xpGained: 10 },
      { cardId: "b", quality: 4 as const, timeSpentMs: 1000, xpGained: 10 },
      { cardId: "c", quality: 4 as const, timeSpentMs: 1000, xpGained: 10 },
      { cardId: "d", quality: 0 as const, timeSpentMs: 1000, xpGained: 0 },
    ];
    expect(computeLessonStars(results)).toBe(2);
  });

  it("returns 1 star when below 70%", () => {
    const results = [
      { cardId: "a", quality: 0 as const, timeSpentMs: 1000, xpGained: 0 },
      { cardId: "b", quality: 0 as const, timeSpentMs: 1000, xpGained: 0 },
    ];
    expect(computeLessonStars(results)).toBe(1);
  });

  it("returns 0 for empty results", () => {
    expect(computeLessonStars([])).toBe(0);
  });
});

describe("updateStreak", () => {
  it("returns 1 for first session", () => {
    expect(updateStreak(makeProgress())).toBe(1);
  });

  it("keeps streak for same day", () => {
    const progress = makeProgress({
      streak: 3,
      lastSessionAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    });
    expect(updateStreak(progress)).toBe(3);
  });

  it("increments streak for consecutive days", () => {
    const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString();
    const progress = makeProgress({ streak: 3, lastSessionAt: yesterday });
    expect(updateStreak(progress)).toBe(4);
  });

  it("resets streak after missing a day", () => {
    const threeDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString();
    const progress = makeProgress({ streak: 5, lastSessionAt: threeDaysAgo });
    expect(updateStreak(progress)).toBe(1);
  });
});
