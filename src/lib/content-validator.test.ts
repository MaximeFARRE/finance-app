import { describe, it, expect } from "vitest";
import { validateTracksContent } from "./content-validator";
import { allTracks } from "@/content";
import type { Track } from "./types";

// ---------------------------------------------------------------------------
// Contenu builtin
// ---------------------------------------------------------------------------

describe("validateTracksContent — contenu builtin", () => {
  it("ne produit aucun avertissement sur le contenu built-in", () => {
    const warnings = validateTracksContent(allTracks);
    if (warnings.length > 0) {
      console.error("Incohérences détectées :", warnings.map((w) => w.message).join("\n"));
    }
    expect(warnings).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Cas unitaires
// ---------------------------------------------------------------------------

function makeTrack(overrides: Partial<Track> = {}): Track {
  return {
    id: "t1",
    title: "Test",
    description: "",
    emoji: "📈",
    color: "blue",
    lessons: [
      { id: "l1", slug: "l1", title: "L1", description: "", estimatedMinutes: 5, cards: [] },
      { id: "l2", slug: "l2", title: "L2", description: "", estimatedMinutes: 5, cards: [] },
    ],
    worlds: [
      {
        id: "w1",
        trackId: "t1",
        title: "World 1",
        description: "",
        order: 1,
        lessonIds: ["l1", "l2"],
      },
    ],
    ...overrides,
  };
}

describe("validateTracksContent — cas unitaires", () => {
  it("passe sur un track cohérent", () => {
    expect(validateTracksContent([makeTrack()])).toHaveLength(0);
  });

  it("passe sur un track sans worlds", () => {
    expect(validateTracksContent([makeTrack({ worlds: [] })])).toHaveLength(0);
  });

  it("détecte une leçon absente des worlds", () => {
    const track = makeTrack({
      lessons: [
        { id: "l1", slug: "l1", title: "L1", description: "", estimatedMinutes: 5, cards: [] },
        { id: "l2", slug: "l2", title: "L2", description: "", estimatedMinutes: 5, cards: [] },
        { id: "l3", slug: "l3", title: "L3", description: "", estimatedMinutes: 5, cards: [] },
      ],
      worlds: [{ id: "w1", trackId: "t1", title: "W1", description: "", order: 1, lessonIds: ["l1", "l2"] }],
    });
    const warnings = validateTracksContent([track]);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]!.message).toContain("l3");
    expect(warnings[0]!.message).toContain("hors monde");
  });

  it("détecte un ID dans worlds sans leçon correspondante", () => {
    const track = makeTrack({
      lessons: [
        { id: "l1", slug: "l1", title: "L1", description: "", estimatedMinutes: 5, cards: [] },
      ],
      worlds: [{ id: "w1", trackId: "t1", title: "W1", description: "", order: 1, lessonIds: ["l1", "l2-fantome"] }],
    });
    const warnings = validateTracksContent([track]);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]!.message).toContain("l2-fantome");
    expect(warnings[0]!.message).toContain("référence morte");
  });
});
