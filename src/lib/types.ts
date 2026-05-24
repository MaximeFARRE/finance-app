export type CardType =
  | "definition"
  | "intuition"
  | "example"
  | "formula"
  | "trap"
  | "interview-question"
  | "model-answer";

export type Difficulty = 1 | 2 | 3;
export type LearningDifficulty = 1 | 2 | 3 | 4 | 5;
export type LearningStage = 1 | 2 | 3 | 4 | 5;

export type QuestionType =
  | "definition"
  | "comparison"
  | "mechanism"
  | "formula"
  | "quick-calculation"
  | "market-culture";

export interface Card {
  id: string;
  type: CardType;
  front: string;
  back: string;
  detail?: string;
  difficulty: Difficulty;
  tags: string[];
  questionType?: QuestionType;
  question?: string;
  shortAnswer?: string;
  explanation?: string;
  formula?: string;
  example?: string;
  commonMistake?: string;
  trackId?: string;
  moduleId?: string;
  conceptId?: string;
  topics?: string[];
  skills?: string[];
  learningStage?: LearningStage;
  version?: number;
  status?: "draft" | "ready" | "archived";
}

export type LessonKind = "lesson" | "boss" | "bonus";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  kind?: LessonKind;
  worldId?: string;
  order?: number;
  cards: Card[];
}

export interface LearningWorld {
  id: string;
  trackId: string;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
  bossLessonId?: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  worlds?: LearningWorld[];
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
  /** Cartes à créer, avec leur contexte track/leçon */
  added: { card: Card; trackId: string; lessonId: string }[];
  /** Cartes existantes à mettre à jour (avec snapshot avant/après) */
  modified: { before: Card; after: Card; trackId: string; lessonId: string }[];
  /** Cartes identiques, inchangées */
  unchanged: Card[];
  /** Erreurs de validation ou de parsing */
  errors: { line?: number; field?: string; message: string }[];
  /** Nouveaux tracks à créer (absents du store) */
  newTracks: Omit<Track, "lessons">[];
  /** Nouvelles leçons à créer (absentes du store) */
  newLessons: { trackId: string; lesson: Omit<Lesson, "cards"> }[];
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
