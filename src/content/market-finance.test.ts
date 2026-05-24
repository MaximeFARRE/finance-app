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
const FORBIDDEN_LEGACY_TYPES = new Set([
  "intuition",
  "trap",
  "interview-question",
  "model-answer",
]);
const MIGRATED_LESSON_IDS = new Set([
  "mf-found-l1-action",
  "mf-found-l1-obligation",
  "mf-found-l1-rendement",
  "mf-found-l1-risque",
  "mf-found-l1-marche-primaire",
  "mf-found-l1-marche-secondaire",
  "mf-found-l1-market-cap",
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

  it("keeps migrated lessons short and free of removed V1 legacy types", () => {
    const migratedLessons = marketFinanceTrack.lessons.filter((lesson) =>
      MIGRATED_LESSON_IDS.has(lesson.id),
    );

    expect(migratedLessons).toHaveLength(MIGRATED_LESSON_IDS.size);

    for (const lesson of migratedLessons) {
      expect(lesson.cards.length).toBeGreaterThanOrEqual(6);
      expect(lesson.cards.length).toBeLessThanOrEqual(10);

      for (const card of lesson.cards) {
        expect(FORBIDDEN_LEGACY_TYPES.has(card.type)).toBe(false);
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
});
