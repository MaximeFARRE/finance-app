import { describe, expect, it } from "vitest";
import {
  CardImportSchema,
  FullImportSchema,
  LessonImportSchema,
  QuickImportSchema,
  TrackImportSchema,
} from "./schemas";

// ---------------------------------------------------------------------------
// CardImportSchema
// ---------------------------------------------------------------------------

describe("CardImportSchema", () => {
  it("accepte une carte valide avec tous les champs", () => {
    const result = CardImportSchema.safeParse({
      id: "test-def",
      type: "definition",
      front: "Qu'est-ce que X ?",
      back: "X est...",
      detail: "Plus de détails...",
      difficulty: 1,
      tags: ["tag1", "tag2"],
    });
    expect(result.success).toBe(true);
  });

  it("accepte une carte sans id (auto-generation)", () => {
    const result = CardImportSchema.safeParse({
      type: "intuition",
      front: "Comment penser à Y ?",
      back: "On peut y penser...",
      difficulty: 2,
      tags: [],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBeUndefined();
    }
  });

  it("accepte une carte sans detail (optionnel)", () => {
    const result = CardImportSchema.safeParse({
      type: "formula",
      front: "Formule de X ?",
      back: "X = Y + Z",
      difficulty: 3,
      tags: [],
    });
    expect(result.success).toBe(true);
  });

  it("applique tags: [] par défaut si absent", () => {
    const result = CardImportSchema.safeParse({
      type: "trap",
      front: "Piège ?",
      back: "Attention.",
      difficulty: 1,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tags).toEqual([]);
    }
  });

  it("rejette un type invalide", () => {
    const result = CardImportSchema.safeParse({
      type: "inconnu",
      front: "?",
      back: ".",
      difficulty: 1,
      tags: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejette une difficulté hors plage", () => {
    const result = CardImportSchema.safeParse({
      type: "definition",
      front: "?",
      back: ".",
      difficulty: 4,
      tags: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejette un front vide", () => {
    const result = CardImportSchema.safeParse({
      type: "definition",
      front: "",
      back: "Une réponse.",
      difficulty: 1,
      tags: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejette un back vide", () => {
    const result = CardImportSchema.safeParse({
      type: "definition",
      front: "Une question ?",
      back: "",
      difficulty: 1,
      tags: [],
    });
    expect(result.success).toBe(false);
  });

  it("accepte tous les types valides", () => {
    const types = [
      "definition",
      "intuition",
      "example",
      "formula",
      "trap",
      "interview-question",
      "model-answer",
    ] as const;
    for (const type of types) {
      const result = CardImportSchema.safeParse({
        type,
        front: "Q?",
        back: "R.",
        difficulty: 1,
        tags: [],
      });
      expect(result.success, `type "${type}" devrait être valide`).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// LessonImportSchema
// ---------------------------------------------------------------------------

describe("LessonImportSchema", () => {
  const validLesson = {
    id: "track-l1",
    slug: "lecon-1",
    title: "Leçon 1",
    description: "Description",
    estimatedMinutes: 5,
    cards: [
      { type: "definition", front: "Q?", back: "R.", difficulty: 1, tags: [] },
    ],
  };

  it("accepte une leçon valide", () => {
    expect(LessonImportSchema.safeParse(validLesson).success).toBe(true);
  });

  it("applique description: '' et estimatedMinutes: 5 par défaut", () => {
    const result = LessonImportSchema.safeParse({
      id: "l1",
      slug: "s1",
      title: "T",
      cards: [{ type: "definition", front: "Q?", back: "R.", difficulty: 1, tags: [] }],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBe("");
      expect(result.data.estimatedMinutes).toBe(5);
    }
  });

  it("rejette une leçon sans id", () => {
    const { id: _id, ...noId } = validLesson;
    expect(LessonImportSchema.safeParse(noId).success).toBe(false);
  });

  it("rejette une leçon sans cartes", () => {
    expect(
      LessonImportSchema.safeParse({ ...validLesson, cards: [] }).success,
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// TrackImportSchema
// ---------------------------------------------------------------------------

describe("TrackImportSchema", () => {
  it("accepte un track valide", () => {
    expect(
      TrackImportSchema.safeParse({
        id: "my-track",
        title: "Mon Track",
        description: "Description",
        emoji: "📈",
        color: "blue",
      }).success,
    ).toBe(true);
  });

  it("applique emoji et color par défaut", () => {
    const result = TrackImportSchema.safeParse({
      id: "t1",
      title: "Track",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.emoji).toBe("📚");
      expect(result.data.color).toBe("blue");
    }
  });

  it("rejette un track sans id", () => {
    expect(
      TrackImportSchema.safeParse({ title: "Sans ID" }).success,
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// FullImportSchema
// ---------------------------------------------------------------------------

describe("FullImportSchema", () => {
  const validFull = {
    track: { id: "t1", title: "Track" },
    lessons: [
      {
        id: "t1-l1",
        slug: "l1",
        title: "L1",
        cards: [
          { type: "definition", front: "Q?", back: "R.", difficulty: 1, tags: [] },
        ],
      },
    ],
  };

  it("accepte un import complet valide", () => {
    expect(FullImportSchema.safeParse(validFull).success).toBe(true);
  });

  it("rejette si lessons est vide", () => {
    expect(
      FullImportSchema.safeParse({ ...validFull, lessons: [] }).success,
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// QuickImportSchema
// ---------------------------------------------------------------------------

describe("QuickImportSchema", () => {
  it("accepte un import rapide valide", () => {
    const result = QuickImportSchema.safeParse({
      target: { track: "market-finance", lesson: "mf-found-l1-action" },
      cards: [
        { type: "trap", front: "Piège?", back: "Attention.", difficulty: 2, tags: [] },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejette si target.track est vide", () => {
    expect(
      QuickImportSchema.safeParse({
        target: { track: "", lesson: "l1" },
        cards: [{ type: "definition", front: "Q?", back: "R.", difficulty: 1, tags: [] }],
      }).success,
    ).toBe(false);
  });

  it("rejette si cards est vide", () => {
    expect(
      QuickImportSchema.safeParse({
        target: { track: "t1", lesson: "l1" },
        cards: [],
      }).success,
    ).toBe(false);
  });
});
