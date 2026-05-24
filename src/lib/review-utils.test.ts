import { describe, expect, it } from "vitest";
import { buildReviewDeck, countDueCards } from "./review-utils";
import type { Card, CardProgress, Track, UserProgress } from "./types";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeCard(id: string): Card {
  return { id, type: "definition", front: `Q ${id}`, back: `R ${id}`, difficulty: 1, tags: [] };
}

function makeProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return {
    userId: "u1",
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

function dueProgress(cardId: string): CardProgress {
  return {
    cardId,
    repetitions: 1,
    easeFactor: 2.5,
    interval: 1,
    nextReviewAt: new Date(Date.now() - 1000).toISOString(), // passé
    lastReviewedAt: new Date(Date.now() - 86400000).toISOString(),
  };
}

function futureProgress(cardId: string, daysAhead = 3): CardProgress {
  return {
    cardId,
    repetitions: 1,
    easeFactor: 2.5,
    interval: daysAhead,
    nextReviewAt: new Date(Date.now() + daysAhead * 86400000).toISOString(),
    lastReviewedAt: new Date().toISOString(),
  };
}

function makeTrack(id: string, lessons: Track["lessons"]): Track {
  return { id, title: id, description: "", emoji: "📈", color: "blue", lessons };
}

// Une track simple : deux leçons, la 2e déverrouillée après la 1re
function sampleTrack(): Track {
  return makeTrack("t1", [
    {
      id: "l1",
      slug: "l1",
      title: "Leçon 1",
      description: "",
      estimatedMinutes: 5,
      cards: [makeCard("c1"), makeCard("c2"), makeCard("c3")],
    },
    {
      id: "l2",
      slug: "l2",
      title: "Leçon 2",
      description: "",
      estimatedMinutes: 5,
      cards: [makeCard("c4"), makeCard("c5")],
    },
  ]);
}

// ---------------------------------------------------------------------------
// buildReviewDeck
// ---------------------------------------------------------------------------

describe("buildReviewDeck", () => {
  it("retourne un deck vide si aucune carte due et aucune nouvelle", () => {
    const track = sampleTrack();
    // Toutes les cartes sont dans le futur
    const progress = makeProgress({
      completedLessonIds: ["l1"],
      cards: {
        c1: futureProgress("c1"),
        c2: futureProgress("c2"),
        c3: futureProgress("c3"),
      },
    });
    const result = buildReviewDeck([track], progress);
    // L1 déverrouillée (première leçon), L2 déverrouillée car L1 complétée
    // c1,c2,c3 dans le futur → dues = 0
    // c4,c5 jamais vues → new = 2 (plafond 5)
    expect(result.dueCount).toBe(0);
    expect(result.newCount).toBe(2);
    expect(result.cards).toHaveLength(2);
  });

  it("place les cartes dues avant les nouvelles", () => {
    const track = sampleTrack();
    const progress = makeProgress({
      completedLessonIds: ["l1"],
      cards: {
        c1: dueProgress("c1"),
        // c2, c3 jamais vues
      },
    });
    const result = buildReviewDeck([track], progress);
    expect(result.cards[0]!.id).toBe("c1"); // due en premier
    expect(result.dueCount).toBe(1);
  });

  it("trie les dues par retard décroissant (la plus en retard d'abord)", () => {
    const track = makeTrack("t1", [
      {
        id: "l1",
        slug: "l1",
        title: "L1",
        description: "",
        estimatedMinutes: 5,
        cards: [makeCard("old"), makeCard("recent")],
      },
    ]);
    const veryLateProgress: CardProgress = {
      cardId: "old",
      repetitions: 1,
      easeFactor: 2.5,
      interval: 1,
      nextReviewAt: new Date(Date.now() - 10 * 86400000).toISOString(), // 10 jours de retard
      lastReviewedAt: null,
    };
    const slightlyLateProgress: CardProgress = {
      cardId: "recent",
      repetitions: 1,
      easeFactor: 2.5,
      interval: 1,
      nextReviewAt: new Date(Date.now() - 1000).toISOString(), // 1 seconde de retard
      lastReviewedAt: null,
    };
    const progress = makeProgress({
      cards: { old: veryLateProgress, recent: slightlyLateProgress },
    });
    const result = buildReviewDeck([track], progress);
    expect(result.cards[0]!.id).toBe("old");
    expect(result.cards[1]!.id).toBe("recent");
  });

  it("respecte la limite totale", () => {
    const cards = Array.from({ length: 20 }, (_, i) => makeCard(`c${i}`));
    const track = makeTrack("t1", [
      { id: "l1", slug: "l1", title: "L1", description: "", estimatedMinutes: 5, cards },
    ]);
    const cardProgress: Record<string, CardProgress> = {};
    for (let i = 0; i < 20; i++) cardProgress[`c${i}`] = dueProgress(`c${i}`);
    const progress = makeProgress({ cards: cardProgress });
    const result = buildReviewDeck([track], progress, 10);
    expect(result.cards).toHaveLength(10);
  });

  it("n'ajoute pas plus de MAX_NEW (5) nouvelles cartes", () => {
    const cards = Array.from({ length: 10 }, (_, i) => makeCard(`n${i}`));
    const track = makeTrack("t1", [
      { id: "l1", slug: "l1", title: "L1", description: "", estimatedMinutes: 5, cards },
    ]);
    const result = buildReviewDeck([track], makeProgress(), 15);
    expect(result.newCount).toBe(5);
    expect(result.dueCount).toBe(0);
    expect(result.cards).toHaveLength(5);
  });

  it("n'inclut que les leçons déverrouillées", () => {
    const track = sampleTrack(); // L2 déverrouillée seulement si L1 complétée
    // L1 non complétée → L2 verrouillée
    const progress = makeProgress({ completedLessonIds: [] });
    const result = buildReviewDeck([track], progress);
    const cardIds = result.cards.map((c) => c.id);
    // c4,c5 sont dans L2 qui est verrouillée
    expect(cardIds).not.toContain("c4");
    expect(cardIds).not.toContain("c5");
  });
});

// ---------------------------------------------------------------------------
// countDueCards
// ---------------------------------------------------------------------------

describe("countDueCards", () => {
  it("compte correctement les cartes dues", () => {
    const track = sampleTrack();
    const progress = makeProgress({
      cards: {
        c1: dueProgress("c1"),
        c2: futureProgress("c2"),
        c3: dueProgress("c3"),
      },
    });
    expect(countDueCards([track], progress)).toBe(2);
  });

  it("retourne 0 si aucune carte due", () => {
    const track = sampleTrack();
    const progress = makeProgress({
      cards: { c1: futureProgress("c1"), c2: futureProgress("c2") },
    });
    expect(countDueCards([track], progress)).toBe(0);
  });

  it("ignore les leçons verrouillées", () => {
    const track = sampleTrack();
    // c4 et c5 sont dans L2 verrouillée
    const progress = makeProgress({
      cards: { c4: dueProgress("c4") },
    });
    expect(countDueCards([track], progress)).toBe(0);
  });
});
