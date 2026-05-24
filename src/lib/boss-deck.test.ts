import { describe, expect, it } from "vitest";
import { buildBossDeck, DEFAULT_BOSS_DECK_LIMIT } from "./boss-deck";
import type { Card, CardProgress, Track } from "./types";

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

function makeTrack(cardsByLesson: Record<string, Card[]>): Track {
  return {
    id: "market-finance",
    title: "Finance de marché",
    description: "Track test",
    emoji: "📈",
    color: "blue",
    worlds: [
      {
        id: "world-1",
        trackId: "market-finance",
        title: "Bases",
        description: "Fondations",
        order: 1,
        lessonIds: ["lesson-1", "lesson-2", "boss-1"],
        bossLessonId: "boss-1",
      },
    ],
    lessons: Object.entries(cardsByLesson).map(([id, cards], index) => ({
      id,
      slug: id,
      title: id,
      description: id,
      estimatedMinutes: 5,
      kind: id.startsWith("boss") ? "boss" : "lesson",
      worldId: "world-1",
      order: index + 1,
      cards,
    })),
  };
}

describe("buildBossDeck", () => {
  it("collects cards from the world's normal lessons and excludes the boss lesson", () => {
    const track = makeTrack({
      "lesson-1": [makeCard("l1-c1"), makeCard("l1-c2")],
      "lesson-2": [makeCard("l2-c1")],
      "boss-1": [makeCard("boss-card")],
    });

    const deck = buildBossDeck({ track, worldId: "world-1" });

    expect(deck.map((entry) => entry.question.id)).toEqual(["l1-c1", "l1-c2", "l2-c1"]);
  });

  it("limits boss decks to 15 entries by default", () => {
    const track = makeTrack({
      "lesson-1": Array.from({ length: 20 }, (_, index) => makeCard(`card-${index}`)),
      "lesson-2": [],
      "boss-1": [],
    });

    const deck = buildBossDeck({ track, worldId: "world-1" });

    expect(deck).toHaveLength(DEFAULT_BOSS_DECK_LIMIT);
  });

  it("prioritizes due cards before new cards", () => {
    const track = makeTrack({
      "lesson-1": [makeCard("new-1"), makeCard("due-late")],
      "lesson-2": [makeCard("due-early"), makeCard("new-2")],
      "boss-1": [],
    });
    const progress = {
      "due-late": makeProgress("due-late", "2026-05-23T00:00:00.000Z"),
      "due-early": makeProgress("due-early", "2026-05-21T00:00:00.000Z"),
    };

    const deck = buildBossDeck({ track, worldId: "world-1", progress, limit: 3 });

    expect(deck.map((entry) => entry.question.id)).toEqual(["due-early", "due-late", "new-1"]);
  });

  it("filters cards explicitly attached to another track", () => {
    const track = makeTrack({
      "lesson-1": [
        makeCard("market-card", { trackId: "market-finance" }),
        makeCard("corporate-card", { trackId: "corporate-finance" }),
      ],
      "lesson-2": [],
      "boss-1": [],
    });

    const deck = buildBossDeck({ track, worldId: "world-1" });

    expect(deck.map((entry) => entry.question.id)).toEqual(["market-card"]);
  });

  it("returns an empty deck for an unknown world", () => {
    const track = makeTrack({ "lesson-1": [makeCard("card-1")] });

    expect(buildBossDeck({ track, worldId: "missing" })).toEqual([]);
  });
});
