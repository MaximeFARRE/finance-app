import { describe, expect, it } from "vitest";
import { exportYaml, parseYaml } from "./yaml-io";
import type { Track } from "../types";
import type { ExportOptions } from "../types";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const sampleTrack: Track = {
  id: "market-finance",
  title: "Finance de marché",
  description: "Les fondamentaux des marchés financiers.",
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
          back: "Titre de propriété représentant une fraction du capital.",
          difficulty: 1,
          tags: ["action", "equity"],
        },
        {
          id: "mf-l1-action-intuition",
          type: "intuition",
          front: "Comment penser à une action ?",
          back: "Acheter une action = devenir associé.",
          detail: "En droit français, l'action est un titre financier.",
          difficulty: 1,
          tags: [],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// parseYaml — format "track complet"
// ---------------------------------------------------------------------------

describe("parseYaml — format track complet", () => {
  const fullYaml = `
track:
  id: market-finance
  title: Finance de marché
  description: Les fondamentaux.
  emoji: "📈"
  color: blue

lessons:
  - id: mf-l1-action
    slug: action
    title: L'action
    description: Comprendre l'action
    estimatedMinutes: 5
    cards:
      - id: mf-l1-action-def
        type: definition
        front: "Qu'est-ce qu'une action ?"
        back: Titre de propriété.
        difficulty: 1
        tags: [action, equity]
      - type: intuition
        front: "Comment penser ?"
        back: Acheter = devenir associé.
        difficulty: 1
        tags: []
`;

  it("parse avec succès un YAML valide", () => {
    const result = parseYaml(fullYaml);
    expect(result.format).toBe("full");
    expect(result.errors).toHaveLength(0);
  });

  it("retourne le track normalisé", () => {
    const result = parseYaml(fullYaml);
    expect(result.format).toBe("full");
    if (result.format === "full") {
      expect(result.data.track.id).toBe("market-finance");
      expect(result.data.track.title).toBe("Finance de marché");
    }
  });

  it("retourne les leçons normalisées", () => {
    const result = parseYaml(fullYaml);
    if (result.format === "full") {
      expect(result.data.lessons).toHaveLength(1);
      expect(result.data.lessons[0]?.meta.id).toBe("mf-l1-action");
    }
  });

  it("génère un ID pour la carte sans id", () => {
    const result = parseYaml(fullYaml);
    if (result.format === "full") {
      const cards = result.data.lessons[0]?.cards ?? [];
      // Première carte a un ID explicite
      expect(cards[0]?.id).toBe("mf-l1-action-def");
      // Deuxième carte n'avait pas d'ID → généré
      expect(cards[1]?.id).toMatch(/^mf-action-int-[0-9a-f]{4}$/);
    }
  });

  it("retourne des erreurs si le type de carte est invalide", () => {
    const bad = fullYaml.replace("type: definition", "type: inconnu");
    const result = parseYaml(bad);
    expect(result.format).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("retourne une erreur si front est vide", () => {
    const bad = fullYaml.replace(
      'front: "Qu\'est-ce qu\'une action ?"',
      "front: ''",
    );
    const result = parseYaml(bad);
    expect(result.format).toBeNull();
    expect(result.errors).toEqual(
      expect.arrayContaining([expect.stringContaining("front")]),
    );
  });
});

// ---------------------------------------------------------------------------
// parseYaml — format "import rapide"
// ---------------------------------------------------------------------------

describe("parseYaml — format import rapide", () => {
  const quickYaml = `
target:
  track: market-finance
  lesson: mf-l1-action

cards:
  - type: trap
    front: "Piège : action à 5€ vs 500€"
    back: Le prix ne dit rien sur la capitalisation.
    difficulty: 2
    tags: [piège]
`;

  it("détecte le format quick", () => {
    const result = parseYaml(quickYaml, new Set(), "action");
    expect(result.format).toBe("quick");
    expect(result.errors).toHaveLength(0);
  });

  it("retourne la cible correcte", () => {
    const result = parseYaml(quickYaml, new Set(), "action");
    if (result.format === "quick") {
      expect(result.data.target.trackId).toBe("market-finance");
      expect(result.data.target.lessonId).toBe("mf-l1-action");
    }
  });

  it("génère un ID pour la carte", () => {
    const result = parseYaml(quickYaml, new Set(), "action");
    if (result.format === "quick") {
      expect(result.data.cards[0]?.id).toMatch(/^mf-action-trap-[0-9a-f]{4}$/);
    }
  });

  it("retourne une erreur si target.track est vide", () => {
    const bad = quickYaml.replace("track: market-finance", "track: ''");
    const result = parseYaml(bad);
    expect(result.format).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// parseYaml — erreurs de parsing
// ---------------------------------------------------------------------------

describe("parseYaml — erreurs de parsing", () => {
  it("retourne une erreur si le YAML est invalide", () => {
    const result = parseYaml("{ invalid yaml: [");
    expect(result.format).toBeNull();
    expect(result.errors[0]).toMatch(/Erreur de parsing YAML/);
  });

  it("retourne une erreur si le format est inconnu", () => {
    const result = parseYaml("title: Orphelin\ncards: []");
    expect(result.format).toBeNull();
    expect(result.errors[0]).toMatch(/Format YAML non reconnu/);
  });

  it("retourne une erreur si le contenu n'est pas un objet", () => {
    const result = parseYaml("- juste une liste\n- d items");
    expect(result.format).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// exportYaml
// ---------------------------------------------------------------------------

describe("exportYaml", () => {
  const allOptions: ExportOptions = { format: "yaml", scope: "all" };
  const trackOptions: ExportOptions = {
    format: "yaml",
    scope: "track",
    trackId: "market-finance",
  };
  const lessonOptions: ExportOptions = {
    format: "yaml",
    scope: "lesson",
    trackId: "market-finance",
    lessonId: "mf-l1-action",
  };

  it("exporte un track avec le header de commentaires", () => {
    const yaml = exportYaml([sampleTrack], allOptions);
    expect(yaml).toContain("# Finance Learning — Export");
    expect(yaml).toContain("# Format: track-complet");
  });

  it("exporte le scope track (un seul track)", () => {
    const yaml = exportYaml([sampleTrack], trackOptions);
    expect(yaml).toContain("id: market-finance");
    expect(yaml).toContain("id: mf-l1-action");
  });

  it("exporte le scope lesson (une seule leçon)", () => {
    const yaml = exportYaml([sampleTrack], lessonOptions);
    expect(yaml).toContain("id: mf-l1-action");
    expect(yaml).not.toContain("id: mf-l2");
  });

  it("inclut le detail si présent", () => {
    const yaml = exportYaml([sampleTrack], allOptions);
    expect(yaml).toContain("En droit français");
  });

  it("n'inclut pas la clé detail si absente", () => {
    const yaml = exportYaml([sampleTrack], allOptions);
    // La première carte n'a pas de detail, elle ne doit pas avoir la clé
    // On vérifie qu'il n'y a pas "detail: null" ou "detail: ~"
    const lines = yaml.split("\n");
    const defCardSection = lines
      .join("\n")
      .indexOf("id: mf-l1-action-def");
    const nextCardSection = lines
      .join("\n")
      .indexOf("id: mf-l1-action-intuition");
    const between = yaml.slice(defCardSection, nextCardSection);
    expect(between).not.toMatch(/\bdetail\b/);
  });

  it("inclut les tags", () => {
    const yaml = exportYaml([sampleTrack], allOptions);
    expect(yaml).toContain("action");
    expect(yaml).toContain("equity");
  });

  it("retourne un message si aucun contenu ne correspond", () => {
    const yaml = exportYaml([sampleTrack], {
      format: "yaml",
      scope: "track",
      trackId: "inexistant",
    });
    expect(yaml).toContain("Aucun contenu");
  });
});

// ---------------------------------------------------------------------------
// Roundtrip : export → parse → export → identique
// ---------------------------------------------------------------------------

describe("roundtrip YAML", () => {
  it("export puis import donne des données cohérentes", () => {
    const yaml = exportYaml([sampleTrack], { format: "yaml", scope: "all" });
    const parsed = parseYaml(yaml);

    expect(parsed.format).toBe("full");
    if (parsed.format !== "full") return;

    // Track
    expect(parsed.data.track.id).toBe(sampleTrack.id);
    expect(parsed.data.track.title).toBe(sampleTrack.title);

    // Leçon
    const lesson = parsed.data.lessons[0]!;
    expect(lesson.meta.id).toBe(sampleTrack.lessons[0]!.id);

    // Cartes
    expect(lesson.cards).toHaveLength(2);
    expect(lesson.cards[0]!.id).toBe("mf-l1-action-def");
    expect(lesson.cards[0]!.front).toBe("Qu'est-ce qu'une action ?");
    expect(lesson.cards[1]!.detail).toBe(
      "En droit français, l'action est un titre financier.",
    );
  });
});
