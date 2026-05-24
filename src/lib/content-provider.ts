import type {
  Card,
  CardVersion,
  Lesson,
  Suggestion,
  SuggestionStatus,
  Track,
} from "./types";

// ---------------------------------------------------------------------------
// Types de stockage à plat (IndexedDB / Supabase)
// ---------------------------------------------------------------------------

/** Track sans le tableau `lessons`, enrichi du sortOrder pour IndexedDB */
export type TrackMeta = Omit<Track, "lessons"> & { sortOrder: number };

/** Lesson sans le tableau `cards`, enrichie du contexte pour IndexedDB */
export type LessonMeta = Omit<Lesson, "cards"> & {
  trackId: string;
  sortOrder: number;
};

/** Card enrichie de sa référence leçon et de son ordre pour IndexedDB */
export type StoredCard = Card & { lessonId: string; sortOrder: number };

// ---------------------------------------------------------------------------
// Interface principale
// ---------------------------------------------------------------------------

/**
 * Abstraction du backend de contenu.
 *
 * Implémentation actuelle : LocalContentProvider (IndexedDB).
 * Implémentation future   : SupabaseContentProvider.
 *
 * Toute l'app doit passer par cette interface.
 * Changer de backend = changer l'implémentation dans src/lib/content.ts.
 */
export interface ContentProvider {
  // --- Lecture ---

  /** Retourne tous les tracks avec leurs leçons et cartes, triés par sortOrder. */
  getAllTracks(): Promise<Track[]>;

  /** Retourne un track avec ses leçons et cartes, ou undefined. */
  getTrackById(id: string): Promise<Track | undefined>;

  /**
   * Retourne une leçon avec ses cartes, ou undefined.
   * @param trackId nécessaire pour valider que la leçon appartient bien au track
   */
  getLessonById(trackId: string, lessonId: string): Promise<Lesson | undefined>;

  /** Retourne toutes les cartes d'une leçon, triées par sortOrder. */
  getCardsByLesson(lessonId: string): Promise<Card[]>;

  /** Retourne toutes les cartes de tous les tracks (pour le mode révision cross-leçons). */
  getAllCards(): Promise<Card[]>;

  // --- Écriture (admin) ---

  /** Crée ou met à jour un track (sans toucher à ses leçons). */
  upsertTrack(track: Omit<Track, "lessons">): Promise<void>;

  /** Supprime un track et en cascade ses leçons et cartes. */
  deleteTrack(trackId: string): Promise<void>;

  /** Crée ou met à jour une leçon (sans toucher à ses cartes). */
  upsertLesson(trackId: string, lesson: Omit<Lesson, "cards">): Promise<void>;

  /** Supprime une leçon et en cascade ses cartes. */
  deleteLesson(lessonId: string): Promise<void>;

  /**
   * Crée ou met à jour une carte.
   * Si la carte existe déjà, sauvegarde l'ancienne version dans l'historique.
   */
  upsertCard(lessonId: string, card: Card): Promise<void>;

  /** Supprime une carte (ne crée pas d'entrée dans l'historique). */
  deleteCard(cardId: string): Promise<void>;

  /** Met à jour le sortOrder des leçons d'un track selon l'ordre fourni. */
  reorderLessons(trackId: string, lessonIds: string[]): Promise<void>;

  /** Met à jour le sortOrder des cartes d'une leçon selon l'ordre fourni. */
  reorderCards(lessonId: string, cardIds: string[]): Promise<void>;

  // --- Historique ---

  /**
   * Retourne les versions précédentes d'une carte, de la plus récente à la plus ancienne.
   * Limité à 20 versions.
   */
  getCardHistory(cardId: string): Promise<CardVersion[]>;

  /**
   * Restaure une version précédente.
   * L'état actuel est sauvegardé comme nouvelle version avant la restauration
   * (pour pouvoir annuler la restauration).
   */
  restoreCardVersion(versionId: string): Promise<void>;

  // --- Suggestions ---

  /** Soumet une suggestion utilisateur. */
  submitSuggestion(
    suggestion: Omit<Suggestion, "id" | "status" | "createdAt" | "reviewedAt">,
  ): Promise<void>;

  /** Retourne les suggestions, avec filtres optionnels. */
  getSuggestions(filters?: {
    status?: SuggestionStatus;
    trackId?: string;
  }): Promise<Suggestion[]>;

  /** Met à jour le statut d'une suggestion (accept/reject). */
  updateSuggestionStatus(
    id: string,
    status: SuggestionStatus,
    adminNote?: string,
  ): Promise<void>;

  // --- Import en masse ---

  /**
   * Insère ou met à jour plusieurs cartes en une seule opération.
   * Crée les entrées d'historique pour les cartes modifiées.
   * @param changedBy identifiant de la source ("admin" | "import:<filename>")
   */
  bulkUpsertCards(
    lessonId: string,
    cards: Card[],
    changedBy: string,
  ): Promise<void>;

  // --- Initialisation ---

  /** Retourne true si le store a déjà été initialisé avec le contenu built-in. */
  isSeeded(): Promise<boolean>;

  /**
   * Initialise le store avec le contenu built-in.
   * Idempotent : peut être appelé plusieurs fois sans danger.
   */
  seed(tracks: Track[]): Promise<void>;

  /**
   * Synchronise les nouveautés du contenu built-in sans écraser les cartes déjà
   * présentes dans le store local.
   */
  syncBuiltinContent(tracks: Track[], version: string): Promise<void>;
}
