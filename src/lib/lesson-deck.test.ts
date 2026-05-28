import { describe, expect, it } from "vitest";
import { buildLessonDeck, DEFAULT_LESSON_DECK_LIMIT } from "./lesson-deck";
import type { Card, CardProgress } from "./types";

function makeCard(id: string, overrides: Partial<Card> = {}): Card {
  return {
    id,
    type: "definition",
    front: `Question ${id}`,
    back: `Réponse ${id}`,
    difficulty: 1,
    tags: [],
    ...overrides,
  };
}

function makeProgress(cardId: string, nextReviewAt: string): CardProgress {
  return {
    cardId,
    repetitions: 1,
    easeFactor: 2.5,
    interval: 1,
    nextReviewAt,
    lastReviewedAt: "2026-05-20T00:00:00.000Z",
  };
}

describe("buildLessonDeck", () => {
  it("limits normal lesson decks to 10 entries by default", () => {
    const cards = Array.from({ length: 12 }, (_, index) => makeCard(`card-${index}`));

    const deck = buildLessonDeck({
      trackId: "market-finance",
      cards,
    });

    expect(deck).toHaveLength(DEFAULT_LESSON_DECK_LIMIT);
  });

  it("keeps due cards first before applying the limit", () => {
    const cards = [
      makeCard("new-1"),
      makeCard("due-late"),
      makeCard("new-2"),
      makeCard("due-early"),
    ];
    const progress = {
      "due-late": makeProgress("due-late", "2026-05-23T00:00:00.000Z"),
      "due-early": makeProgress("due-early", "2026-05-21T00:00:00.000Z"),
    };

    const deck = buildLessonDeck({
      trackId: "market-finance",
      cards,
      progress,
      limit: 2,
    });

    expect(deck.map((entry) => entry.question.id)).toEqual(["due-early", "due-late"]);
  });

  it("filters cards explicitly attached to another track", () => {
    const cards = [
      makeCard("market-card", { trackId: "market-finance" }),
      makeCard("corporate-card", { trackId: "corporate-finance" }),
      makeCard("legacy-card"),
    ];

    const deck = buildLessonDeck({
      trackId: "market-finance",
      cards,
    });

    expect(deck.map((entry) => entry.question.id)).toEqual(["market-card", "legacy-card"]);
  });

  it("returns an empty deck when the requested limit is zero", () => {
    const deck = buildLessonDeck({
      trackId: "market-finance",
      cards: [makeCard("card-1")],
      limit: 0,
    });

    expect(deck).toEqual([]);
  });
});
