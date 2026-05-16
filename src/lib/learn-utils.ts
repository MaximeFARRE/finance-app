import type { Card } from "./types";

const PRIMARY_TYPES = new Set(["definition", "intuition", "example", "formula"]);

export function groupLearnCards(cards: Card[]): { primary: Card[]; supplementary: Card[] } {
  const primary: Card[] = [];
  const supplementary: Card[] = [];
  for (const card of cards) {
    if (PRIMARY_TYPES.has(card.type)) {
      primary.push(card);
    } else {
      supplementary.push(card);
    }
  }
  return { primary, supplementary };
}
