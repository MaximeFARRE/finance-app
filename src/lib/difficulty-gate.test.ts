import { describe, expect, it } from "vitest";
import { filterByUnlockedDifficulty, isDifficultyUnlocked } from "./difficulty-gate";
import type { Card, CardProgress } from "./types";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeCard(id: string, difficulty: 1 | 2 | 3): Card {
  return {
    id,
    type: "definition",
    front: `Question ${id}`,
    back: `Réponse ${id}`,
    difficulty,
    tags: [],
  };
}

function makeProgress(cardId: string, repetitions: number): CardProgress {
  return {
    cardId,
    repetitions,
    easeFactor: 2.5,
    interval: repetitions > 0 ? 6 : 1,
    nextReviewAt: new Date().toISOString(),
    lastReviewedAt: repetitions > 0 ? new Date().toISOString() : null,
  };
}

function mastered(cardId: string): CardProgress {
  return makeProgress(cardId, 1); // repetitions >= 1 → maîtrisé
}

function failed(cardId: string): CardProgress {
  return makeProgress(cardId, 0); // repetitions = 0 + lastReviewedAt non null (reset)
}

// ---------------------------------------------------------------------------
// isDifficultyUnlocked
// ---------------------------------------------------------------------------

describe("isDifficultyUnlocked", () => {
  it("difficulté 1 toujours déverrouillée", () => {
    const cards = [makeCard("c1", 1)];
    expect(isDifficultyUnlocked(cards, {}, 1)).toBe(true);
  });

  it("difficulté 2 verrouillée si aucune carte de diff 1 maîtrisée", () => {
    const cards = [makeCard("c1", 1), makeCard("c2", 1), makeCard("c3", 2)];
    expect(isDifficultyUnlocked(cards, {}, 2)).toBe(false);
  });

  it("difficulté 2 déverrouillée si 100% des diff-1 maîtrisées", () => {
    const cards = [makeCard("c1", 1), makeCard("c2", 1), makeCard("c3", 2)];
    const progress = { c1: mastered("c1"), c2: mastered("c2") };
    expect(isDifficultyUnlocked(cards, progress, 2)).toBe(true);
  });

  it("difficulté 2 déverrouillée si exactement 70% des diff-1 maîtrisées", () => {
    // 7 cartes de diff 1, 7 maîtrisées = 100 % → déverrouillé
    // 3 cartes de diff 1, 2 maîtrisées = 66 % → verrouillé
    // 10 cartes de diff 1, 7 maîtrisées = 70 % → déverrouillé
    const cards = Array.from({ length: 10 }, (_, i) => makeCard(`c${i}`, 1));
    const progress: Record<string, CardProgress> = {};
    for (let i = 0; i < 7; i++) progress[`c${i}`] = mastered(`c${i}`);
    expect(isDifficultyUnlocked(cards, progress, 2)).toBe(true);
  });

  it("difficulté 2 verrouillée si <70% des diff-1 maîtrisées", () => {
    const cards = Array.from({ length: 10 }, (_, i) => makeCard(`c${i}`, 1));
    const progress: Record<string, CardProgress> = {};
    for (let i = 0; i < 6; i++) progress[`c${i}`] = mastered(`c${i}`);
    expect(isDifficultyUnlocked(cards, progress, 2)).toBe(false);
  });

  it("difficulté 3 dépend des diff 1+2", () => {
    const cards = [
      makeCard("d1a", 1),
      makeCard("d1b", 1),
      makeCard("d2a", 2),
      makeCard("d2b", 2),
      makeCard("d3a", 3),
    ];
    // 4 prérequis (diff 1+2), besoin de ≥ 3 maîtrisées
    const progress3 = {
      d1a: mastered("d1a"),
      d1b: mastered("d1b"),
      d2a: mastered("d2a"),
      d2b: failed("d2b"),
    };
    expect(isDifficultyUnlocked(cards, progress3, 3)).toBe(true); // 3/4 = 75%
  });

  it("difficulté 3 verrouillée si <70% diff 1+2 maîtrisées", () => {
    const cards = [makeCard("d1", 1), makeCard("d2", 2), makeCard("d3", 3)];
    const progress = { d1: mastered("d1"), d2: failed("d2") };
    expect(isDifficultyUnlocked(cards, progress, 3)).toBe(false); // 1/2 = 50%
  });

  it("difficulté 2 déverrouillée s'il n'y a pas de cartes de diff 1", () => {
    const cards = [makeCard("c1", 2)]; // pas de diff 1
    expect(isDifficultyUnlocked(cards, {}, 2)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// filterByUnlockedDifficulty
// ---------------------------------------------------------------------------

describe("filterByUnlockedDifficulty", () => {
  it("retourne toutes les cartes si diff 2 et 3 sont déverrouillées", () => {
    const cards = [makeCard("c1", 1), makeCard("c2", 2), makeCard("c3", 3)];
    const progress = {
      c1: mastered("c1"),
      c2: mastered("c2"),
    };
    const result = filterByUnlockedDifficulty(cards, progress);
    expect(result).toHaveLength(3);
  });

  it("ne retourne que les cartes de diff 1 si diff 2 verrouillée", () => {
    const cards = [makeCard("c1", 1), makeCard("c2", 2), makeCard("c3", 3)];
    const result = filterByUnlockedDifficulty(cards, {}); // rien maîtrisé
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("c1");
  });

  it("retourne diff 1+2 si diff 2 déverrouillée mais pas diff 3", () => {
    const cards = [makeCard("c1", 1), makeCard("c2", 2), makeCard("c3", 3)];
    const progress = { c1: mastered("c1") };
    // diff 1 maîtrisée → diff 2 ouverte
    // diff 1+2 : c1 maîtrisé, c2 pas → 1/2 = 50% < 70% → diff 3 verrouillée
    const result = filterByUnlockedDifficulty(cards, progress);
    const ids = result.map((c) => c.id);
    expect(ids).toContain("c1");
    expect(ids).toContain("c2");
    expect(ids).not.toContain("c3");
  });

  it("retourne au moins les cartes de diff 1 même sans progression", () => {
    const cards = [
      makeCard("d1", 1),
      makeCard("d2", 2),
      makeCard("d3", 3),
    ];
    const result = filterByUnlockedDifficulty(cards, {});
    expect(result.map((c) => c.id)).toEqual(["d1"]);
  });

  it("fonctionne avec seulement des cartes de diff 1", () => {
    const cards = [makeCard("c1", 1), makeCard("c2", 1)];
    const result = filterByUnlockedDifficulty(cards, {});
    expect(result).toHaveLength(2);
  });
});
