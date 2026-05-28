import { describe, expect, it } from "vitest";
import { corporateFinanceTrack } from "./corporate-finance";

describe("corporateFinanceTrack structure", () => {
  it("has required track-level fields", () => {
    expect(corporateFinanceTrack.id).toBe("corporate-finance");
    expect(corporateFinanceTrack.title.trim()).toBeTruthy();
    expect(corporateFinanceTrack.lessons.length).toBeGreaterThan(0);
  });

  it("has no duplicate lesson IDs", () => {
    const ids = corporateFinanceTrack.lessons.map((l) => l.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("has no duplicate card IDs across all lessons", () => {
    const ids = corporateFinanceTrack.lessons.flatMap((l) => l.cards.map((c) => c.id));
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("every lesson has required fields", () => {
    for (const lesson of corporateFinanceTrack.lessons) {
      expect(lesson.id.trim(), `lesson id`).toBeTruthy();
      expect(lesson.slug.trim(), `slug on ${lesson.id}`).toBeTruthy();
      expect(lesson.title.trim(), `title on ${lesson.id}`).toBeTruthy();
      expect(lesson.cards.length, `cards on ${lesson.id}`).toBeGreaterThan(0);
    }
  });

  it("every card has required fields", () => {
    for (const lesson of corporateFinanceTrack.lessons) {
      for (const card of lesson.cards) {
        expect(card.id.trim(), `card id in ${lesson.id}`).toBeTruthy();
        expect(card.front.trim(), `front on ${card.id}`).toBeTruthy();
        expect(card.back.trim(), `back on ${card.id}`).toBeTruthy();
        expect(card.tags.length, `tags on ${card.id}`).toBeGreaterThan(0);
        expect([1, 2, 3], `difficulty on ${card.id}`).toContain(card.difficulty);
      }
    }
  });

  it("does not attach cards to another track", () => {
    for (const lesson of corporateFinanceTrack.lessons) {
      for (const card of lesson.cards) {
        expect(
          card.trackId === undefined || card.trackId === corporateFinanceTrack.id,
          `trackId on ${card.id}`,
        ).toBe(true);
      }
    }
  });
});
