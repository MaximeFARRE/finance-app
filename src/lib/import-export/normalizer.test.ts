import { describe, expect, it } from "vitest";
import { normalizeFullImport, normalizeQuickImport } from "./normalizer";
import type { FullImportData, QuickImportData } from "./schemas";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const minimalCard = {
  type: "definition" as const,
  front: "Qu'est-ce qu'une action ?",
  back: "Titre de propriété.",
  difficulty: 1 as const,
  tags: [],
};

const fullImportData: FullImportData = {
  track: {
    id: "market-finance",
    title: "Finance de marché",
    description: "Les fondamentaux.",
    emoji: "📈",
    color: "blue",
  },
  lessons: [
    {
      id: "mf-l1-action",
      slug: "action",
      title: "L'action",
      description: "Comprendre l'action",
      estimatedMinutes: 5,
      cards: [
        {
          id: "mf-l1-action-def",
          type: "definition",
          front: "Qu'est-ce qu'une action ?",
          back: "Titre de propriété.",
          difficulty: 1,
          tags: ["action", "equity"],
        },
        {
          // pas d'id → auto-généré
          type: "intuition",
          front: "Comment penser à une action ?",
          back: "Acheter une action = devenir associé.",
          difficulty: 1,
          tags: [],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// normalizeFullImport
// ---------------------------------------------------------------------------

describe("normalizeFullImport", () => {
  it("préserve les métadonnées du track", () => {
    const result = normalizeFullImport(fullImportData);
    expect(result.track).toEqual({
      id: "market-finance",
      title: "Finance de marché",
      description: "Les fondamentaux.",
      emoji: "📈",
      color: "blue",
    });
  });

  it("produit le bon nombre de leçons et cartes", () => {
    const result = normalizeFullImport(fullImportData);
    expect(result.lessons).toHaveLength(1);
    expect(result.lessons[0]?.cards).toHaveLength(2);
  });

  it("préserve l'ID de la carte si fourni", () => {
    const result = normalizeFullImport(fullImportData);
    expect(result.lessons[0]?.cards[0]?.id).toBe("mf-l1-action-def");
  });

  it("génère un ID pour la carte sans id", () => {
    const result = normalizeFullImport(fullImportData);
    const generatedId = result.lessons[0]?.cards[1]?.id;
    expect(generatedId).toBeDefined();
    expect(generatedId).toMatch(/^mf-action-int-[0-9a-f]{4}$/);
  });

  it("attache le trackId à chaque leçon", () => {
    const result = normalizeFullImport(fullImportData);
    expect(result.lessons[0]?.trackId).toBe("market-finance");
  });

  it("inclut les métadonnées de la leçon correctement", () => {
    const result = normalizeFullImport(fullImportData);
    const meta = result.lessons[0]?.meta;
    expect(meta).toMatchObject({
      id: "mf-l1-action",
      slug: "action",
      title: "L'action",
      description: "Comprendre l'action",
      estimatedMinutes: 5,
    });
  });

  it("inclut detail sur la carte si présent", () => {
    const data: FullImportData = {
      ...fullImportData,
      lessons: [
        {
          ...fullImportData.lessons[0]!,
          cards: [
            { ...minimalCard, id: "c1", detail: "Plus de détails ici." },
          ],
        },
      ],
    };
    const result = normalizeFullImport(data);
    expect(result.lessons[0]?.cards[0]?.detail).toBe("Plus de détails ici.");
  });

  it("n'inclut pas la clé detail si absente", () => {
    const data: FullImportData = {
      ...fullImportData,
      lessons: [
        {
          ...fullImportData.lessons[0]!,
          cards: [{ ...minimalCard, id: "c1" }],
        },
      ],
    };
    const result = normalizeFullImport(data);
    expect(result.lessons[0]?.cards[0]).not.toHaveProperty("detail");
  });

  it("évite les collisions d'ID générés entre deux cartes sans id", () => {
    const data: FullImportData = {
      ...fullImportData,
      lessons: [
        {
          ...fullImportData.lessons[0]!,
          cards: [
            { type: "definition", front: "Q?", back: "R.", difficulty: 1, tags: [] },
            { type: "definition", front: "Q?", back: "R.", difficulty: 1, tags: [] },
          ],
        },
      ],
    };
    const result = normalizeFullImport(data);
    const ids = result.lessons[0]!.cards.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(2);
  });

  it("n'écrase pas les IDs fournis même si existingIds les contient", () => {
    // Si la carte a déjà un ID explicite, il est conservé même s'il est dans existingIds
    const existing = new Set(["mf-l1-action-def"]);
    const result = normalizeFullImport(fullImportData, existing);
    expect(result.lessons[0]?.cards[0]?.id).toBe("mf-l1-action-def");
  });

  it("gère plusieurs leçons", () => {
    const data: FullImportData = {
      ...fullImportData,
      lessons: [
        {
          id: "l1",
          slug: "lecon-1",
          title: "L1",
          description: "",
          estimatedMinutes: 5,
          cards: [{ ...minimalCard, id: "c1" }],
        },
        {
          id: "l2",
          slug: "lecon-2",
          title: "L2",
          description: "",
          estimatedMinutes: 5,
          cards: [{ ...minimalCard, id: "c2" }],
        },
      ],
    };
    const result = normalizeFullImport(data);
    expect(result.lessons).toHaveLength(2);
    expect(result.lessons[0]?.meta.id).toBe("l1");
    expect(result.lessons[1]?.meta.id).toBe("l2");
  });
});

// ---------------------------------------------------------------------------
// normalizeQuickImport
// ---------------------------------------------------------------------------

describe("normalizeQuickImport", () => {
  const quickData: QuickImportData = {
    target: { track: "market-finance", lesson: "mf-l1-action" },
    cards: [
      {
        type: "trap",
        front: "Piège : action à 5€ vs 500€",
        back: "Le prix ne dit rien sur la capitalisation.",
        difficulty: 2,
        tags: ["piège"],
      },
    ],
  };

  it("retourne la cible avec trackId et lessonId", () => {
    const result = normalizeQuickImport(quickData, "action");
    expect(result.target).toEqual({
      trackId: "market-finance",
      lessonId: "mf-l1-action",
    });
  });

  it("génère un ID pour la carte sans id", () => {
    const result = normalizeQuickImport(quickData, "action");
    expect(result.cards[0]?.id).toMatch(/^mf-action-trap-[0-9a-f]{4}$/);
  });

  it("préserve l'ID si fourni", () => {
    const data: QuickImportData = {
      ...quickData,
      cards: [{ ...quickData.cards[0]!, id: "mf-l1-action-trap-custom" }],
    };
    const result = normalizeQuickImport(data, "action");
    expect(result.cards[0]?.id).toBe("mf-l1-action-trap-custom");
  });

  it("normalise plusieurs cartes", () => {
    const data: QuickImportData = {
      ...quickData,
      cards: [
        { ...minimalCard },
        { type: "example", front: "Exemple X", back: "Description.", difficulty: 1, tags: [] },
      ],
    };
    const result = normalizeQuickImport(data, "action");
    expect(result.cards).toHaveLength(2);
  });

  it("utilise le lessonSlug pour générer les IDs", () => {
    const result = normalizeQuickImport(quickData, "obligations");
    const id = result.cards[0]?.id;
    expect(id).toContain("-obligations-");
  });
});
