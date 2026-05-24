import { describe, expect, it } from "vitest";
import { marketFinanceTrack } from "./market-finance";
import type { QuestionType } from "@/lib/types";

const APPROVED_QUESTION_TYPES = new Set<QuestionType>([
  "definition",
  "comparison",
  "mechanism",
  "formula",
  "quick-calculation",
  "market-culture",
]);

describe("marketFinanceTrack pedagogical structure", () => {
  it("declares worlds that reference existing lessons", () => {
    const lessonIds = new Set(marketFinanceTrack.lessons.map((lesson) => lesson.id));

    expect(marketFinanceTrack.worlds?.length).toBeGreaterThan(0);

    for (const world of marketFinanceTrack.worlds ?? []) {
      expect(world.trackId).toBe(marketFinanceTrack.id);
      expect(world.lessonIds.length).toBeGreaterThan(0);
      for (const lessonId of world.lessonIds) {
        expect(lessonIds.has(lessonId)).toBe(true);
      }
      if (world.bossLessonId) {
        expect(world.lessonIds).toContain(world.bossLessonId);
      }
    }
  });

  it("keeps boss lessons short and V1-question based", () => {
    const bossLessons = marketFinanceTrack.lessons.filter((lesson) => lesson.kind === "boss");

    expect(bossLessons.length).toBeGreaterThan(0);

    for (const lesson of bossLessons) {
      expect(lesson.cards.length).toBeGreaterThanOrEqual(10);
      expect(lesson.cards.length).toBeLessThanOrEqual(15);
      expect(lesson.worldId).toBeTruthy();

      for (const card of lesson.cards) {
        expect(card.questionType).toBeTruthy();
        expect(APPROVED_QUESTION_TYPES.has(card.questionType!)).toBe(true);
        expect(card.question?.trim()).toBeTruthy();
        expect(card.shortAnswer?.trim()).toBeTruthy();
        expect(card.learningStage).toBeTruthy();
        expect(card.topics?.length).toBeGreaterThan(0);
        expect(card.skills?.length).toBeGreaterThan(0);
      }
    }
  });

  it("does not attach structured Finance de marché cards to another track", () => {
    const structuredCards = marketFinanceTrack.lessons.flatMap((lesson) =>
      lesson.cards.filter((card) => card.questionType),
    );

    for (const card of structuredCards) {
      expect(card.trackId === undefined || card.trackId === marketFinanceTrack.id).toBe(true);
    }
  });
});
