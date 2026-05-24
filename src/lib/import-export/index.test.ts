import { beforeEach, describe, expect, it, vi } from "vitest";
import { analyzeImport, applyImport, exportContent } from "./index";
import type { ContentProvider } from "../content-provider";
import type { Card, Track } from "../types";
import { exportYaml } from "./yaml-io";
import { exportJson } from "./json-io";
import { exportCsv } from "./csv-io";

// ---------------------------------------------------------------------------
// Mock ContentProvider
// ---------------------------------------------------------------------------

function makeCard(overrides: Partial<Card> & { id: string }): Card {
  return {
    id: overrides.id,
    type: overrides.type ?? "definition",
    front: overrides.front ?? "Question ?",
    back: overrides.back ?? "Réponse.",
    difficulty: overrides.difficulty ?? 1,
    tags: overrides.tags ?? [],
  };
}

function makeMockProvider(existingCards: Card[] = []): ContentProvider {
  return {
    getAllCards: vi.fn().mockResolvedValue(existingCards),
    getAllTracks: vi.fn().mockResolvedValue([]),
    getTrackById: vi.fn().mockResolvedValue(undefined),
    getLessonById: vi.fn().mockResolvedValue(undefined),
    getCardsByLesson: vi.fn().mockResolvedValue([]),
    upsertTrack: vi.fn().mockResolvedValue(undefined),
    deleteTrack: vi.fn().mockResolvedValue(undefined),
    upsertLesson: vi.fn().mockResolvedValue(undefined),
    deleteLesson: vi.fn().mockResolvedValue(undefined),
    upsertCard: vi.fn().mockResolvedValue(undefined),
    deleteCard: vi.fn().mockResolvedValue(undefined),
    reorderLessons: vi.fn().mockResolvedValue(undefined),
    reorderCards: vi.fn().mockResolvedValue(undefined),
    getCardHistory: vi.fn().mockResolvedValue([]),
    restoreCardVersion: vi.fn().mockResolvedValue(undefined),
    submitSuggestion: vi.fn().mockResolvedValue(undefined),
    getSuggestions: vi.fn().mockResolvedValue([]),
    updateSuggestionStatus: vi.fn().mockResolvedValue(undefined),
    bulkUpsertCards: vi.fn().mockResolvedValue(undefined),
    isSeeded: vi.fn().mockResolvedValue(true),
    seed: vi.fn().mockResolvedValue(undefined),
  } as ContentProvider;
}

// ---------------------------------------------------------------------------
// Fixture track
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
        makeCard({ id: "mf-l1-action-def", front: "Qu'est-ce qu'une action ?" }),
        makeCard({ id: "mf-l1-action-int", type: "intuition", front: "Comment penser ?" }),
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// analyzeImport — YAML
// ---------------------------------------------------------------------------

describe("analyzeImport — YAML", () => {
  it("parse et diffère un import complet", async () => {
    const yaml = exportYaml([sampleTrack], { format: "yaml", scope: "all" });
    const provider = makeMockProvider([]);
    const result = await analyzeImport(yaml, "yaml", provider);

    expect(result.errors).toHaveLength(0);
    expect(result.format).toBe("yaml");
    expect(result.diff).not.toBeNull();
    expect(result.diff?.added).toHaveLength(2); // 2 nouvelles cartes
    expect(result.diff?.modified).toHaveLength(0);
    expect(result.diff?.unchanged).toHaveLength(0);
  });

  it("détecte les cartes inchangées", async () => {
    const yaml = exportYaml([sampleTrack], { format: "yaml", scope: "all" });
    const existing = sampleTrack.lessons[0]!.cards;
    const provider = makeMockProvider(existing);
    const result = await analyzeImport(yaml, "yaml", provider);

    expect(result.diff?.unchanged).toHaveLength(2);
    expect(result.diff?.added).toHaveLength(0);
  });

  it("détecte les cartes modifiées", async () => {
    const modifiedCard = { ...sampleTrack.lessons[0]!.cards[0]!, back: "Réponse modifiée." };
    const existing = [modifiedCard, sampleTrack.lessons[0]!.cards[1]!];
    const provider = makeMockProvider(existing);

    const yaml = exportYaml([sampleTrack], { format: "yaml", scope: "all" });
    const result = await analyzeImport(yaml, "yaml", provider);

    expect(result.diff?.modified).toHaveLength(1);
    expect(result.diff?.unchanged).toHaveLength(1);
  });

  it("retourne des erreurs si le YAML est invalide", async () => {
    const provider = makeMockProvider();
    const result = await analyzeImport("{ invalid yaml [", "yaml", provider);

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.diff).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// analyzeImport — JSON
// ---------------------------------------------------------------------------

describe("analyzeImport — JSON", () => {
  it("parse et diffère un import complet", async () => {
    const json = exportJson([sampleTrack], { format: "json", scope: "all" });
    const provider = makeMockProvider([]);
    const result = await analyzeImport(json, "json", provider);

    expect(result.errors).toHaveLength(0);
    expect(result.diff?.added).toHaveLength(2);
  });

  it("retourne des erreurs si le JSON est invalide", async () => {
    const provider = makeMockProvider();
    const result = await analyzeImport("{ invalid json", "json", provider);

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.diff).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// analyzeImport — CSV
// ---------------------------------------------------------------------------

describe("analyzeImport — CSV", () => {
  it("parse et diffère un import CSV", async () => {
    const csv = exportCsv([sampleTrack], { format: "csv", scope: "all" });
    const provider = makeMockProvider([]);
    const result = await analyzeImport(csv, "csv", provider);

    expect(result.errors).toHaveLength(0);
    expect(result.diff?.added).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// applyImport
// ---------------------------------------------------------------------------

describe("applyImport", () => {
  it("upserte le track, la leçon et les cartes pour un import complet", async () => {
    const yaml = exportYaml([sampleTrack], { format: "yaml", scope: "all" });
    const provider = makeMockProvider([]);
    const { diff, normalized } = await analyzeImport(yaml, "yaml", provider);

    await applyImport(diff!, normalized!, provider, "import:test.yaml");

    expect(provider.upsertTrack).toHaveBeenCalledWith(
      expect.objectContaining({ id: "market-finance" }),
    );
    expect(provider.upsertLesson).toHaveBeenCalledWith(
      "market-finance",
      expect.objectContaining({ id: "mf-l1-action" }),
    );
    expect(provider.bulkUpsertCards).toHaveBeenCalledWith(
      "mf-l1-action",
      expect.arrayContaining([expect.objectContaining({ id: "mf-l1-action-def" })]),
      "import:test.yaml",
    );
  });
});

// ---------------------------------------------------------------------------
// exportContent
// ---------------------------------------------------------------------------

describe("exportContent", () => {
  it("exporte en YAML", () => {
    const result = exportContent([sampleTrack], { format: "yaml", scope: "all" });
    expect(result).toContain("track:");
    expect(result).toContain("market-finance");
  });

  it("exporte en JSON", () => {
    const result = exportContent([sampleTrack], { format: "json", scope: "all" });
    const parsed = JSON.parse(result);
    expect(parsed.track.id).toBe("market-finance");
  });

  it("exporte en CSV avec BOM", () => {
    const result = exportContent([sampleTrack], { format: "csv", scope: "all" });
    expect(result.startsWith("﻿")).toBe(true);
  });

  it("exporte en CSV avec séparateur , si csvSeparator est ,", () => {
    const result = exportContent([sampleTrack], {
      format: "csv",
      scope: "all",
      csvSeparator: ",",
    });
    const firstLine = result.split("\n")[0] ?? "";
    expect(firstLine).toContain(",");
  });

  it("exporte le scope track", () => {
    const result = exportContent([sampleTrack], {
      format: "json",
      scope: "track",
      trackId: "market-finance",
    });
    const parsed = JSON.parse(result);
    expect(parsed.track.id).toBe("market-finance");
  });
});
