import { describe, expect, it } from "vitest";
import { exportCsv, parseCsv } from "./csv-io";
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
          detail: "Détail additionnel.",
          difficulty: 2,
          tags: [],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// parseCsv — cas de base
// ---------------------------------------------------------------------------

describe("parseCsv — cas de base", () => {
  it("parse un CSV avec séparateur ;", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    expect(result.format).toBe("full");
    expect(result.errors).toHaveLength(0);
  });

  it("retourne les données du track", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    if (result.format === "full") {
      expect(result.data.track.id).toBe("market-finance");
      expect(result.data.track.title).toBe("Finance de marché");
      expect(result.data.track.emoji).toBe("📈");
    }
  });

  it("retourne les données de la leçon", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    if (result.format === "full") {
      expect(result.data.lessons).toHaveLength(1);
      expect(result.data.lessons[0]?.meta.id).toBe("mf-l1-action");
      expect(result.data.lessons[0]?.meta.slug).toBe("action");
    }
  });

  it("retourne les cartes avec les bonnes propriétés", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    if (result.format === "full") {
      const cards = result.data.lessons[0]?.cards ?? [];
      expect(cards).toHaveLength(2);
      expect(cards[0]?.id).toBe("mf-l1-action-def");
      expect(cards[0]?.type).toBe("definition");
      expect(cards[0]?.difficulty).toBe(1);
    }
  });

  it("reconstruit les tags depuis le pipe-separated", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    if (result.format === "full") {
      expect(result.data.lessons[0]?.cards[0]?.tags).toEqual(["action", "equity"]);
    }
  });

  it("inclut le detail si présent", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    if (result.format === "full") {
      expect(result.data.lessons[0]?.cards[1]?.detail).toBe("Détail additionnel.");
    }
  });

  it("n'inclut pas la clé detail si vide", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    if (result.format === "full") {
      expect(result.data.lessons[0]?.cards[0]).not.toHaveProperty("detail");
    }
  });
});

// ---------------------------------------------------------------------------
// parseCsv — séparateur virgule
// ---------------------------------------------------------------------------

describe("parseCsv — séparateur virgule", () => {
  it("parse un CSV avec séparateur ,", () => {
    const csv = exportCsv([sampleTrack], {
      format: "csv",
      scope: "all",
      separator: ",",
    });
    // Vérifier que l'export utilise bien la virgule
    expect(csv).toContain(",");
    const result = parseCsv(csv);
    expect(result.format).toBe("full");
    expect(result.errors).toHaveLength(0);
  });

  it("retourne les mêmes données qu'avec ;", () => {
    const csvSemicolon = exportCsv([sampleTrack], {
      format: "csv",
      scope: "all",
      separator: ";",
    });
    const csvComma = exportCsv([sampleTrack], {
      format: "csv",
      scope: "all",
      separator: ",",
    });

    const r1 = parseCsv(csvSemicolon);
    const r2 = parseCsv(csvComma);

    if (r1.format === "full" && r2.format === "full") {
      expect(r1.data.track.id).toBe(r2.data.track.id);
      expect(r1.data.lessons[0]?.cards).toHaveLength(
        r2.data.lessons[0]?.cards.length ?? 0,
      );
    }
  });
});

// ---------------------------------------------------------------------------
// parseCsv — BOM UTF-8
// ---------------------------------------------------------------------------

describe("parseCsv — BOM UTF-8", () => {
  it("gère le BOM en début de fichier", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    // L'export ajoute le BOM, on vérifie que le parse fonctionne
    expect(csv.startsWith("﻿")).toBe(true);
    const result = parseCsv(csv);
    expect(result.format).toBe("full");
  });

  it("parse aussi sans BOM", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const withoutBom = csv.startsWith("﻿") ? csv.slice(1) : csv;
    const result = parseCsv(withoutBom);
    expect(result.format).toBe("full");
  });
});

// ---------------------------------------------------------------------------
// parseCsv — contenu multi-ligne (RFC 4180)
// ---------------------------------------------------------------------------

describe("parseCsv — contenu multi-ligne", () => {
  const multilineTrack: Track = {
    ...sampleTrack,
    lessons: [
      {
        ...sampleTrack.lessons[0]!,
        cards: [
          {
            id: "mf-l1-action-ml",
            type: "definition",
            front: "Qu'est-ce qu'une action ?",
            back: "Ligne 1 de la réponse.\nLigne 2 de la réponse.\nLigne 3.",
            difficulty: 1,
            tags: [],
          },
        ],
      },
    ],
  };

  it("exporte et ré-importe un champ multi-ligne correctement", () => {
    const csv = exportCsv([multilineTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);
    if (result.format === "full") {
      const back = result.data.lessons[0]?.cards[0]?.back;
      expect(back).toContain("Ligne 1");
      expect(back).toContain("Ligne 2");
      expect(back).toContain("Ligne 3");
    }
  });
});

// ---------------------------------------------------------------------------
// parseCsv — génération d'ID
// ---------------------------------------------------------------------------

describe("parseCsv — génération d'ID", () => {
  it("génère un ID si card_id est vide", () => {
    const csvLines = [
      "﻿track_id;track_title;track_emoji;track_color;track_description;lesson_id;lesson_slug;lesson_title;lesson_description;lesson_minutes;card_id;card_type;card_difficulty;card_tags;card_front;card_back;card_detail",
      'market-finance;Finance de marché;📈;blue;Les fondamentaux;mf-l1-action;action;L\'action;Comprendre;5;;definition;1;action;"Qu\'est-ce qu\'une action ?";Titre de propriété.;',
    ].join("\n");

    const result = parseCsv(csvLines);
    expect(result.format).toBe("full");
    if (result.format === "full") {
      const id = result.data.lessons[0]?.cards[0]?.id;
      expect(id).toMatch(/^mf-action-def-[0-9a-f]{4}$/);
    }
  });
});

// ---------------------------------------------------------------------------
// parseCsv — erreurs
// ---------------------------------------------------------------------------

describe("parseCsv — erreurs", () => {
  it("retourne une erreur si des colonnes sont manquantes", () => {
    const csv = "﻿track_id;track_title\nmarket-finance;Finance";
    const result = parseCsv(csv);
    expect(result.format).toBeNull();
    expect(result.errors[0]).toMatch(/Colonnes manquantes/);
  });

  it("retourne une erreur si le CSV est vide", () => {
    const result = parseCsv("﻿");
    expect(result.format).toBeNull();
  });

  it("retourne une erreur si card_type est invalide", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const bad = csv.replace("definition", "invalide");
    const result = parseCsv(bad);
    expect(result.format).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// exportCsv — cas de base
// ---------------------------------------------------------------------------

describe("exportCsv", () => {
  it("exporte avec le BOM UTF-8", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    expect(csv.charCodeAt(0)).toBe(0xfeff);
  });

  it("utilise ; par défaut", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const header = csv.split("\n")[0] ?? "";
    expect(header).toContain(";");
  });

  it("utilise , si demandé", () => {
    const csv = exportCsv([sampleTrack], {
      format: "csv",
      scope: "all",
      separator: ",",
    });
    const header = csv.split("\n")[0] ?? "";
    expect(header).toContain(",");
  });

  it("joint les tags avec |", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    expect(csv).toContain("action|equity");
  });

  it("exporte le scope track", () => {
    const csv = exportCsv([sampleTrack], {
      format: "csv",
      scope: "track",
      trackId: "market-finance",
    });
    expect(csv).toContain("market-finance");
  });

  it("exporte le scope lesson", () => {
    const csv = exportCsv([sampleTrack], {
      format: "csv",
      scope: "lesson",
      trackId: "market-finance",
      lessonId: "mf-l1-action",
    });
    expect(csv).toContain("mf-l1-action");
  });

  it("retourne juste l'en-tête si aucune carte ne correspond", () => {
    const csv = exportCsv([sampleTrack], {
      format: "csv",
      scope: "track",
      trackId: "inexistant",
    });
    // Juste le BOM + en-tête, pas de données
    const lines = csv.split("\n").filter(Boolean);
    expect(lines).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Roundtrip
// ---------------------------------------------------------------------------

describe("roundtrip CSV", () => {
  it("export → import donne des données cohérentes", () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const result = parseCsv(csv);

    expect(result.format).toBe("full");
    if (result.format !== "full") return;

    expect(result.data.track.id).toBe("market-finance");
    const lesson = result.data.lessons[0]!;
    expect(lesson.meta.id).toBe("mf-l1-action");
    expect(lesson.cards).toHaveLength(2);
    expect(lesson.cards[0]!.front).toBe("Qu'est-ce qu'une action ?");
    expect(lesson.cards[0]!.tags).toEqual(["action", "equity"]);
    expect(lesson.cards[1]!.detail).toBe("Détail additionnel.");
  });
});
