export type CardType =
  | "definition"
  | "intuition"
  | "example"
  | "formula"
  | "trap"
  | "interview-question"
  | "model-answer";

export type Difficulty = 1 | 2 | 3;

export interface Card {
  id: string;
  type: CardType;
  front: string;
  back: string;
  difficulty: Difficulty;
  tags: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  cards: Card[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  lessons: Lesson[];
}

// --- Progression ---

export type AnswerQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface CardProgress {
  cardId: string;
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReviewAt: string;
  lastReviewedAt: string | null;
}

export interface UserProgress {
  userId: string;
  xp: number;
  streak: number;
  lastSessionAt: string | null;
  cards: Record<string, CardProgress>;
  completedLessonIds: string[];
  lessonStars: Record<string, 0 | 1 | 2 | 3>;
}

export interface ReviewResult {
  cardId: string;
  quality: AnswerQuality;
  timeSpentMs: number;
  xpGained: number;
}

// --- Niveaux XP ---

export interface LevelInfo {
  level: number;
  title: string;
  xpRequired: number;
  xpForNext: number;
  progressPercent: number;
}
