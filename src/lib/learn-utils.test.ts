import { describe, it, expect } from "vitest";
import { groupLearnCards } from "./learn-utils";
import type { Card } from "./types";

function makeCard(id: string, type: Card["type"]): Card {
  return { id, type, front: id, back: "", difficulty: 1, tags: [] };
}

describe("groupLearnCards", () => {
  it("returns empty arrays for empty input", () => {
    const { primary, supplementary } = groupLearnCards([]);
    expect(primary).toHaveLength(0);
    expect(supplementary).toHaveLength(0);
  });

  it("puts definition, intuition, example, formula into primary", () => {
    const cards = [
      makeCard("a", "definition"),
      makeCard("b", "intuition"),
      makeCard("c", "example"),
      makeCard("d", "formula"),
    ];
    const { primary, supplementary } = groupLearnCards(cards);
    expect(primary).toHaveLength(4);
    expect(supplementary).toHaveLength(0);
  });

  it("puts trap, interview-question, model-answer into supplementary", () => {
    const cards = [
      makeCard("a", "trap"),
      makeCard("b", "interview-question"),
      makeCard("c", "model-answer"),
    ];
    const { primary, supplementary } = groupLearnCards(cards);
    expect(primary).toHaveLength(0);
    expect(supplementary).toHaveLength(3);
  });

  it("splits a mixed card list correctly", () => {
    const cards = [
      makeCard("def", "definition"),
      makeCard("trap", "trap"),
      makeCard("int", "intuition"),
      makeCard("iq", "interview-question"),
      makeCard("ma", "model-answer"),
      makeCard("ex", "example"),
    ];
    const { primary, supplementary } = groupLearnCards(cards);
    expect(primary.map((c) => c.id)).toEqual(["def", "int", "ex"]);
    expect(supplementary.map((c) => c.id)).toEqual(["trap", "iq", "ma"]);
  });

  it("preserves order within each group", () => {
    const cards = [
      makeCard("d1", "definition"),
      makeCard("d2", "definition"),
      makeCard("d3", "definition"),
    ];
    const { primary } = groupLearnCards(cards);
    expect(primary.map((c) => c.id)).toEqual(["d1", "d2", "d3"]);
  });
});
