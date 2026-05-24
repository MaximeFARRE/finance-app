import { describe, expect, it } from "vitest";
import { generateCardId } from "./id-generator";

describe("generateCardId", () => {
  it("génère un id au format attendu", () => {
    const id = generateCardId("market-finance", "action", "definition", "Qu'est-ce ?", new Set());
    expect(id).toMatch(/^mf-action-def-[0-9a-f]{4}$/);
  });

  it("est déterministe pour le même front", () => {
    const ids = new Set<string>();
    const a = generateCardId("market-finance", "action", "definition", "Q?", ids);
    ids.clear();
    const b = generateCardId("market-finance", "action", "definition", "Q?", ids);
    expect(a).toBe(b);
  });

  it("diffère si le front diffère (fronts significativement distincts)", () => {
    const ids = new Set<string>();
    const a = generateCardId("market-finance", "action", "definition", "Qu'est-ce qu'une action ?", ids);
    ids.clear();
    const b = generateCardId("market-finance", "action", "definition", "Comment valoriser une entreprise en DCF ?", ids);
    expect(a).not.toBe(b);
  });

  it("utilise l'abréviation du bon type", () => {
    const types = [
      ["definition", "def"],
      ["intuition", "int"],
      ["example", "ex"],
      ["formula", "form"],
      ["trap", "trap"],
      ["interview-question", "iq"],
      ["model-answer", "ma"],
    ] as const;
    for (const [type, abbrev] of types) {
      const id = generateCardId("test-track", "lecon", type, "Q?", new Set());
      expect(id).toContain(`-${abbrev}-`);
    }
  });

  it("construit le préfixe depuis les initiales du trackId", () => {
    const id = generateCardId("corporate-finance-basics", "dcf", "definition", "Q?", new Set());
    expect(id).toMatch(/^cfb-/);
  });

  it("ajoute un suffixe -2 en cas de collision", () => {
    const first = generateCardId("market-finance", "action", "definition", "Q?", new Set());
    const existing = new Set([first]);
    const second = generateCardId("market-finance", "action", "definition", "Q?", existing);
    expect(second).toBe(`${first}-2`);
  });

  it("incrémente jusqu'à trouver un id libre", () => {
    const first = generateCardId("market-finance", "action", "definition", "Q?", new Set());
    const existing = new Set([first, `${first}-2`, `${first}-3`]);
    const fourth = generateCardId("market-finance", "action", "definition", "Q?", existing);
    expect(fourth).toBe(`${first}-4`);
  });
});
