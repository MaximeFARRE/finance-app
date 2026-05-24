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
  detail?: string;
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
  learnedCardIds: string[];
  learnSessionIds: string[];
}

export interface ReviewResult {
  cardId: string;
  quality: AnswerQuality;
  timeSpentMs: number;
  xpGained: number;
}

// --- Session ---

export type SessionMode = "learn" | "quiz";

export interface LearnResult {
  cardId: string;
  read: boolean;
}

// --- Niveaux XP ---

export interface LevelInfo {
  level: number;
  title: string;
  xpRequired: number;
  xpForNext: number;
  progressPercent: number;
}

// --- Gestion de contenu ---

/** Source d'une carte : built-in (TS statique) ou custom (IndexedDB / Supabase) */
export type CardSource = "builtin" | "custom";

/** Snapshot d'une carte avant modification, pour le versioning */
export interface CardVersion {
  id: string;
  cardId: string;
  version: number;
  snapshot: Card;
  changedAt: string;       // ISO date
  changedBy: string;       // "admin" | "import:<filename>"
  source: "manual" | "import";
}

// --- Suggestions utilisateurs ---

export type SuggestionCategory =
  | "error"
  | "missing-detail"
  | "wording"
  | "new-card"
  | "other";

export type SuggestionStatus = "pending" | "accepted" | "rejected";

export interface Suggestion {
  id: string;
  cardId: string | null;         // null si suggestion de nouvelle carte
  trackId: string;
  lessonId: string;
  category: SuggestionCategory;
  message: string;
  proposedCard?: Partial<Card>;  // rempli si category === "new-card"
  status: SuggestionStatus;
  createdAt: string;
  reviewedAt: string | null;
  adminNote?: string;
}

// --- Import / Export ---

export interface ImportResult {
  added: Card[];
  modified: { before: Card; after: Card; lessonId: string }[];
  unchanged: Card[];
  errors: { line?: number; field?: string; message: string }[];
}

export type ExportFormat = "yaml" | "json" | "csv";
export type ExportScope = "all" | "track" | "lesson";

export interface ExportOptions {
  format: ExportFormat;
  scope: ExportScope;
  trackId?: string;
  lessonId?: string;
  csvSeparator?: ";" | ",";
}
