import { describe, expect, it } from "vitest";
import { exportJson, parseJson } from "./json-io";
import type { Track } from "../types";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const sampleTrack: Track = {
  id: "market-finance",
  title: "Finance de marché",
  description: "Les fondamentaux.",
  emoji: "📈",
  color: "blue",
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
          id: "mf-l1-action-int",
          type: "intuition",
          front: "Comment penser à une action ?",
          back: "Acheter = devenir associé.",
          detail: "Détail supplémentaire.",
          difficulty: 1,
          tags: [],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// parseJson — format "track complet"
// ---------------------------------------------------------------------------

describe("parseJson — format track complet", () => {
  const fullJson = JSON.stringify({
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
            tags: ["action"],
          },
          {
            // sans id → auto-généré
            type: "intuition",
            front: "Comment penser ?",
            back: "Acheter = devenir associé.",
            difficulty: 1,
            tags: [],
          },
        ],
      },
    ],
  });

  it("parse avec succès un JSON valide", () => {
    const result = parseJson(fullJson);
    expect(result.format).toBe("full");
    expect(result.errors).toHaveLength(0);
  });

  it("retourne le track normalisé", () => {
    const result = parseJson(fullJson);
    if (result.format === "full") {
      expect(result.data.track.id).toBe("market-finance");
    }
  });

  it("génère un ID pour la carte sans id", () => {
    const result = parseJson(fullJson);
    if (result.format === "full") {
      const cards = result.data.lessons[0]?.cards ?? [];
      expect(cards[0]?.id).toBe("mf-l1-action-def");
      expect(cards[1]?.id).toMatch(/^mf-action-int-[0-9a-f]{4}$/);
    }
  });

  it("retourne des erreurs si la carte a un type invalide", () => {
    const bad = JSON.parse(fullJson);
    bad.lessons[0].cards[0].type = "invalide";
    const result = parseJson(JSON.stringify(bad));
    expect(result.format).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("retourne une erreur si front est vide", () => {
    const bad = JSON.parse(fullJson);
    bad.lessons[0].cards[0].front = "";
    const result = parseJson(JSON.stringify(bad));
    expect(result.format).toBeNull();
    expect(result.errors).toEqual(
      expect.arrayContaining([expect.stringContaining("front")]),
    );
  });
});

// ---------------------------------------------------------------------------
// parseJson — format "import rapide"
// ---------------------------------------------------------------------------

describe("parseJson — format import rapide", () => {
  const quickJson = JSON.stringify({
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
  });

  it("détecte le format quick", () => {
    const result = parseJson(quickJson, new Set(), "action");
    expect(result.format).toBe("quick");
    expect(result.errors).toHaveLength(0);
  });

  it("retourne la cible correcte", () => {
    const result = parseJson(quickJson, new Set(), "action");
    if (result.format === "quick") {
      expect(result.data.target.trackId).toBe("market-finance");
      expect(result.data.target.lessonId).toBe("mf-l1-action");
    }
  });

  it("génère un ID pour la carte", () => {
    const result = parseJson(quickJson, new Set(), "action");
    if (result.format === "quick") {
      expect(result.data.cards[0]?.id).toMatch(/^mf-action-trap-[0-9a-f]{4}$/);
    }
  });
});

// ---------------------------------------------------------------------------
// parseJson — erreurs de parsing
// ---------------------------------------------------------------------------

describe("parseJson — erreurs", () => {
  it("retourne une erreur si le JSON est invalide", () => {
    const result = parseJson("{ invalid json");
    expect(result.format).toBeNull();
    expect(result.errors[0]).toMatch(/Erreur de parsing JSON/);
  });

  it("retourne une erreur si la racine est un tableau", () => {
    const result = parseJson("[]");
    expect(result.format).toBeNull();
    expect(result.errors[0]).toMatch(/objet/);
  });

  it("retourne une erreur si le format est inconnu", () => {
    const result = parseJson('{"title": "orphelin"}');
    expect(result.format).toBeNull();
    expect(result.errors[0]).toMatch(/Format JSON non reconnu/);
  });
});

// ---------------------------------------------------------------------------
// exportJson
// ---------------------------------------------------------------------------

describe("exportJson", () => {
  it("exporte un track au format JSON indenté", () => {
    const json = exportJson([sampleTrack], { format: "json", scope: "all" });
    const parsed = JSON.parse(json);
    expect(parsed.track.id).toBe("market-finance");
    expect(parsed.lessons).toHaveLength(1);
  });

  it("exporte le scope track", () => {
    const json = exportJson([sampleTrack], {
      format: "json",
      scope: "track",
      trackId: "market-finance",
    });
    const parsed = JSON.parse(json);
    expect(parsed.track.id).toBe("market-finance");
  });

  it("exporte le scope lesson", () => {
    const json = exportJson([sampleTrack], {
      format: "json",
      scope: "lesson",
      trackId: "market-finance",
      lessonId: "mf-l1-action",
    });
    const parsed = JSON.parse(json);
    expect(parsed.lessons[0].id).toBe("mf-l1-action");
  });

  it("inclut le detail si présent", () => {
    const json = exportJson([sampleTrack], { format: "json", scope: "all" });
    const parsed = JSON.parse(json);
    const card = parsed.lessons[0].cards[1];
    expect(card.detail).toBe("Détail supplémentaire.");
  });

  it("n'inclut pas la clé detail si absente", () => {
    const json = exportJson([sampleTrack], { format: "json", scope: "all" });
    const parsed = JSON.parse(json);
    const card = parsed.lessons[0].cards[0];
    expect(card).not.toHaveProperty("detail");
  });

  it("retourne un message si aucun contenu ne correspond", () => {
    const json = exportJson([sampleTrack], {
      format: "json",
      scope: "track",
      trackId: "inexistant",
    });
    const parsed = JSON.parse(json);
    expect(parsed.error).toMatch(/Aucun contenu/);
  });

  it("exporte plusieurs tracks en tableau", () => {
    const track2: Track = { ...sampleTrack, id: "track-2", lessons: [] };
    const json = exportJson([sampleTrack, track2], {
      format: "json",
      scope: "all",
    });
    const parsed = JSON.parse(json);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// Roundtrip
// ---------------------------------------------------------------------------

describe("roundtrip JSON", () => {
  it("export puis import donne des données cohérentes", () => {
    const json = exportJson([sampleTrack], { format: "json", scope: "all" });
    const result = parseJson(json);

    expect(result.format).toBe("full");
    if (result.format !== "full") return;

    expect(result.data.track.id).toBe(sampleTrack.id);
    const lesson = result.data.lessons[0]!;
    expect(lesson.meta.id).toBe(sampleTrack.lessons[0]!.id);
    expect(lesson.cards).toHaveLength(2);
    expect(lesson.cards[0]!.id).toBe("mf-l1-action-def");
    expect(lesson.cards[1]!.detail).toBe("Détail supplémentaire.");
  }) as void;
});
