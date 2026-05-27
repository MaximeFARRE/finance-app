import type { Card, CardType, LearningDifficulty, LearningStage, QuestionType } from "./types";

export interface NormalizedLearningCard {
  id: string;
  questionType: QuestionType;
  themeKey: QuestionType;
  question: string;
  shortAnswer: string;
  explanation?: string;
  formula?: string;
  example?: string;
  commonMistake?: string;
  topics: string[];
  skills: string[];
  difficulty: LearningDifficulty;
  learningStage?: LearningStage;
}

const LEGACY_TYPE_TO_QUESTION_TYPE: Record<CardType, QuestionType> = {
  definition: "definition",
  intuition: "mechanism",
  example: "quick-calculation",
  formula: "formula",
  trap: "definition",
  "interview-question": "mechanism",
  "model-answer": "definition",
};

function normalizeDifficulty(difficulty: Card["difficulty"]): LearningDifficulty {
  return difficulty;
}

function fallbackSkill(card: Card, questionType: QuestionType): string[] {
  if (card.skills && card.skills.length > 0) return card.skills;
  if (card.type) return [card.type];
  return [questionType];
}

export function mapLegacyTypeToQuestionType(type: CardType): QuestionType {
  return LEGACY_TYPE_TO_QUESTION_TYPE[type];
}

/**
 * Retourne true si la carte utilise uniquement le format legacy (front/back/detail)
 * sans aucun champ du nouveau format pédagogique.
 * Utile pour détecter les anciennes cartes qui n'ont pas été migrées.
 */
export function isLegacyCard(card: Card): boolean {
  return !card.question && !card.shortAnswer;
}

export function normalizeLearningCard(card: Card): NormalizedLearningCard {
  const questionType = card.questionType ?? mapLegacyTypeToQuestionType(card.type);

  return {
    id: card.id,
    questionType,
    themeKey: questionType,
    question: card.question ?? card.front,
    shortAnswer: card.shortAnswer ?? card.back,
    explanation: card.explanation ?? card.detail,
    formula: card.formula,
    example: card.example,
    commonMistake: card.commonMistake,
    topics: card.topics ?? card.tags ?? [],
    skills: fallbackSkill(card, questionType),
    difficulty: normalizeDifficulty(card.difficulty),
    learningStage: card.learningStage,
  };
}
