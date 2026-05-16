import { describe, it, expect } from "vitest";
import {
  computeNextReview,
  createInitialCardProgress,
  isDueForReview,
} from "./spaced-repetition";

describe("createInitialCardProgress", () => {
  it("creates progress with default values", () => {
    const progress = createInitialCardProgress("card-1");
    expect(progress.cardId).toBe("card-1");
    expect(progress.repetitions).toBe(0);
    expect(progress.easeFactor).toBe(2.5);
    expect(progress.interval).toBe(0);
    expect(typeof progress.nextReviewAt).toBe("string");
    expect(progress.lastReviewedAt).toBeNull();
  });
});

describe("computeNextReview", () => {
  it("resets repetitions on quality < 3", () => {
    const initial = createInitialCardProgress("card-1");
    const result = computeNextReview(initial, 1);
    expect(result.repetitions).toBe(0);
    expect(result.interval).toBe(1);
  });

  it("sets interval to 1 on first successful review", () => {
    const initial = createInitialCardProgress("card-1");
    const result = computeNextReview(initial, 4);
    expect(result.repetitions).toBe(1);
    expect(result.interval).toBe(1);
  });

  it("sets interval to 6 on second successful review", () => {
    const afterFirst = computeNextReview(createInitialCardProgress("card-1"), 4);
    const result = computeNextReview(afterFirst, 4);
    expect(result.repetitions).toBe(2);
    expect(result.interval).toBe(6);
  });

  it("increases interval with ease factor on subsequent reviews", () => {
    let progress = createInitialCardProgress("card-1");
    progress = computeNextReview(progress, 5);
    progress = computeNextReview(progress, 5);
    progress = computeNextReview(progress, 5);
    expect(progress.repetitions).toBe(3);
    expect(progress.interval).toBeGreaterThan(6);
  });

  it("never drops ease factor below 1.3", () => {
    let progress = createInitialCardProgress("card-1");
    for (let i = 0; i < 10; i++) {
      progress = computeNextReview(progress, 0);
    }
    expect(progress.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("sets lastReviewedAt to an ISO string", () => {
    const initial = createInitialCardProgress("card-1");
    const result = computeNextReview(initial, 4);
    expect(typeof result.lastReviewedAt).toBe("string");
    expect(new Date(result.lastReviewedAt!).toISOString()).toBe(result.lastReviewedAt);
  });
});

describe("isDueForReview", () => {
  it("returns true for new cards (nextReviewAt is now)", () => {
    const progress = createInitialCardProgress("card-1");
    expect(isDueForReview(progress)).toBe(true);
  });

  it("returns false when review is in the future", () => {
    const progress = createInitialCardProgress("card-1");
    const reviewed = computeNextReview(progress, 5);
    expect(isDueForReview(reviewed)).toBe(false);
  });
});
