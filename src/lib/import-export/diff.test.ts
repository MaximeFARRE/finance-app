import { describe, expect, it } from "vitest";
import { computeImportDiff } from "./diff";
import type { Card } from "../types";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeCard(overrides: Partial<Card> & { id: string }): Card {
  return {
    id: overrides.id,
    type: overrides.type ?? "definition",
    front: overrides.front ?? "Question ?",
    back: overrides.back ?? "Réponse.",
    difficulty: overrides.difficulty ?? 1,
    tags: overrides.tags ?? [],
    ...(overrides.detail !== undefined ? { detail: overrides.detail } : {}),
  };
}

const ctx = { trackId: "t1", lessonId: "l1" };

// ---------------------------------------------------------------------------
// Cas de base
// ---------------------------------------------------------------------------

describe("computeImportDiff", () => {
  it("classe une carte inconnue comme added", () => {
    const newCard = makeCard({ id: "c1", front: "Nouvelle carte" });
    const result = computeImportDiff([{ card: newCard, ...ctx }], []);

    expect(result.added).toHaveLength(1);
    expect(result.added[0]?.card.id).toBe("c1");
    expect(result.modified).toHaveLength(0);
    expect(result.unchanged).toHaveLength(0);
  });

  it("classe une carte identique comme unchanged", () => {
    const card = makeCard({ id: "c1" });
    const result = computeImportDiff([{ card, ...ctx }], [card]);

    expect(result.added).toHaveLength(0);
    expect(result.modified).toHaveLength(0);
    expect(result.unchanged).toHaveLength(1);
    expect(result.unchanged[0]?.id).toBe("c1");
  });

  it("classe une carte modifiée comme modified avec before/after", () => {
    const before = makeCard({ id: "c1", back: "Ancienne réponse." });
    const after = makeCard({ id: "c1", back: "Nouvelle réponse." });
    const result = computeImportDiff([{ card: after, ...ctx }], [before]);

    expect(result.modified).toHaveLength(0 + 1);
    expect(result.modified[0]?.before.back).toBe("Ancienne réponse.");
    expect(result.modified[0]?.after.back).toBe("Nouvelle réponse.");
  });

  it("gère un mix de cas en une seule passe", () => {
    const cardNew = makeCard({ id: "new", front: "Nouvelle" });
    const cardUnchanged = makeCard({ id: "same" });
    const cardBefore = makeCard({ id: "mod", front: "Avant" });
    const cardAfter = makeCard({ id: "mod", front: "Après" });

    const result = computeImportDiff(
      [
        { card: cardNew, ...ctx },
        { card: cardUnchanged, ...ctx },
        { card: cardAfter, ...ctx },
      ],
      [cardUnchanged, cardBefore],
    );

    expect(result.added).toHaveLength(1);
    expect(result.unchanged).toHaveLength(1);
    expect(result.modified).toHaveLength(1);
    expect(result.errors).toHaveLength(0);
  });

  it("propage le trackId et lessonId dans added", () => {
    const card = makeCard({ id: "c1" });
    const result = computeImportDiff(
      [{ card, trackId: "track-x", lessonId: "lesson-y" }],
      [],
    );
    expect(result.added[0]?.trackId).toBe("track-x");
    expect(result.added[0]?.lessonId).toBe("lesson-y");
  });

  it("propage le trackId et lessonId dans modified", () => {
    const before = makeCard({ id: "c1", back: "Avant." });
    const after = makeCard({ id: "c1", back: "Après." });
    const result = computeImportDiff(
      [{ card: after, trackId: "track-x", lessonId: "lesson-y" }],
      [before],
    );
    expect(result.modified[0]?.trackId).toBe("track-x");
    expect(result.modified[0]?.lessonId).toBe("lesson-y");
  });
});

// ---------------------------------------------------------------------------
// Comparaison fine des champs
// ---------------------------------------------------------------------------

describe("areCardsEqual (via computeImportDiff)", () => {
  it("détecte une différence sur le type", () => {
    const before = makeCard({ id: "c1", type: "definition" });
    const after = makeCard({ id: "c1", type: "intuition" });
    const result = computeImportDiff([{ card: after, ...ctx }], [before]);
    expect(result.modified).toHaveLength(1);
  });

  it("détecte une différence sur la difficulté", () => {
    const before = makeCard({ id: "c1", difficulty: 1 });
    const after = makeCard({ id: "c1", difficulty: 2 });
    const result = computeImportDiff([{ card: after, ...ctx }], [before]);
    expect(result.modified).toHaveLength(1);
  });

  it("détecte une différence sur les tags (ordre insensible)", () => {
    const before = makeCard({ id: "c1", tags: ["a", "b"] });
    // Même tags dans un ordre différent → unchanged
    const sameOrder = makeCard({ id: "c1", tags: ["b", "a"] });
    const r1 = computeImportDiff([{ card: sameOrder, ...ctx }], [before]);
    expect(r1.unchanged).toHaveLength(1);

    // Tags différents → modified
    const differentTags = makeCard({ id: "c1", tags: ["a", "c"] });
    const r2 = computeImportDiff([{ card: differentTags, ...ctx }], [before]);
    expect(r2.modified).toHaveLength(1);
  });

  it("traite detail absent et detail vide comme identiques", () => {
    const before = makeCard({ id: "c1" }); // pas de detail
    const after = makeCard({ id: "c1", detail: "" }); // detail vide
    const result = computeImportDiff([{ card: after, ...ctx }], [before]);
    expect(result.unchanged).toHaveLength(1);
  });

  it("détecte une différence sur le detail", () => {
    const before = makeCard({ id: "c1", detail: "Avant." });
    const after = makeCard({ id: "c1", detail: "Après." });
    const result = computeImportDiff([{ card: after, ...ctx }], [before]);
    expect(result.modified).toHaveLength(1);
  });

  it("retourne des arrays vides si incoming est vide", () => {
    const existing = [makeCard({ id: "c1" })];
    const result = computeImportDiff([], existing);
    expect(result.added).toHaveLength(0);
    expect(result.modified).toHaveLength(0);
    expect(result.unchanged).toHaveLength(0);
  });
});
