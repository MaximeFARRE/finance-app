import { describe, expect, it } from "vitest";
import { mapLegacyTypeToQuestionType, normalizeLearningCard } from "./card-normalizer";
import type { Card, CardType } from "./types";

function makeCard(overrides: Partial<Card> = {}): Card {
  return {
    id: "card-1",
    type: "definition",
    front: "Qu'est-ce qu'un marché financier ?",
    back: "Un lieu physique ou électronique où acheteurs et vendeurs échangent des actifs financiers.",
    difficulty: 1,
    tags: ["marché", "prix"],
    ...overrides,
  };
}

describe("mapLegacyTypeToQuestionType", () => {
  it.each<[CardType, string]>([
    ["definition", "definition"],
    ["intuition", "mechanism"],
    ["example", "quick-calculation"],
    ["formula", "formula"],
    ["trap", "definition"],
    ["interview-question", "mechanism"],
    ["model-answer", "definition"],
  ])("maps %s to %s", (legacyType, questionType) => {
    expect(mapLegacyTypeToQuestionType(legacyType)).toBe(questionType);
  });
});

describe("normalizeLearningCard", () => {
  it("keeps the explicit new question fields when present", () => {
    const normalized = normalizeLearningCard(
      makeCard({
        questionType: "comparison",
        question: "What is the difference between bid and ask?",
        shortAnswer: "Bid is the buyer price. Ask is the seller price.",
        explanation: "The spread is the gap between them.",
        formula: "Spread = Ask - Bid",
        example: "Bid 99 / Ask 101 means a spread of 2.",
        commonMistake: "Do not confuse bid with the price paid by the buyer.",
        topics: ["bid-ask", "liquidity"],
        skills: ["comparison"],
        learningStage: 1,
      }),
    );

    expect(normalized).toMatchObject({
      questionType: "comparison",
      themeKey: "comparison",
      question: "What is the difference between bid and ask?",
      shortAnswer: "Bid is the buyer price. Ask is the seller price.",
      explanation: "The spread is the gap between them.",
      formula: "Spread = Ask - Bid",
      example: "Bid 99 / Ask 101 means a spread of 2.",
      commonMistake: "Do not confuse bid with the price paid by the buyer.",
      topics: ["bid-ask", "liquidity"],
      skills: ["comparison"],
      learningStage: 1,
    });
  });

  it("falls back to legacy front, back, detail and tags", () => {
    const normalized = normalizeLearningCard(
      makeCard({
        type: "formula",
        front: "Comment calculer un rendement simple ?",
        back: "Rendement = (Prix final - Prix initial) / Prix initial.",
        detail: "Ajouter les revenus reçus si on calcule un total return.",
        tags: ["rendement", "calcul"],
      }),
    );

    expect(normalized).toMatchObject({
      questionType: "formula",
      question: "Comment calculer un rendement simple ?",
      shortAnswer: "Rendement = (Prix final - Prix initial) / Prix initial.",
      explanation: "Ajouter les revenus reçus si on calcule un total return.",
      topics: ["rendement", "calcul"],
      skills: ["formula"],
    });
  });

  it("does not expose legacy trap as a trap question type", () => {
    const normalized = normalizeLearningCard(
      makeCard({
        type: "trap",
        front: "Une obligation est-elle toujours sans risque ?",
        back: "Non, elle peut porter du risque de taux, de crédit et de liquidité.",
      }),
    );

    expect(normalized.questionType).toBe("definition");
    expect(normalized.themeKey).toBe("definition");
  });
});
