import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { ContentProvider, LessonMeta, StoredCard, TrackMeta } from "./content-provider";
import type {
  Card,
  CardVersion,
  Lesson,
  Suggestion,
  SuggestionStatus,
  Track,
} from "./types";

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

const DB_NAME = "finance-app-content";
const DB_VERSION = 1;
const MAX_VERSIONS_PER_CARD = 20;

// ---------------------------------------------------------------------------
// Schéma IndexedDB
// ---------------------------------------------------------------------------

interface ContentDBSchema extends DBSchema {
  tracks: {
    key: string;
    value: TrackMeta;
  };
  lessons: {
    key: string;
    value: LessonMeta;
    indexes: { "by-trackId": string };
  };
  cards: {
    key: string;
    value: StoredCard;
    indexes: { "by-lessonId": string };
  };
  card_versions: {
    key: string;
    value: CardVersion;
    indexes: { "by-cardId": string };
  };
  suggestions: {
    key: string;
    value: Suggestion;
    indexes: { "by-status": string; "by-trackId": string };
  };
  meta: {
    key: string;
    value: { key: string; value: unknown };
  };
}

type ContentDB = IDBPDatabase<ContentDBSchema>;

// ---------------------------------------------------------------------------
// Implémentation
// ---------------------------------------------------------------------------

export class LocalContentProvider implements ContentProvider {
  private dbPromise: Promise<ContentDB> | null = null;

  private getDB(): Promise<ContentDB> {
    if (!this.dbPromise) {
      this.dbPromise = openDB<ContentDBSchema>(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("tracks")) {
            db.createObjectStore("tracks", { keyPath: "id" });
          }

          if (!db.objectStoreNames.contains("lessons")) {
            const store = db.createObjectStore("lessons", { keyPath: "id" });
            store.createIndex("by-trackId", "trackId");
          }

          if (!db.objectStoreNames.contains("cards")) {
            const store = db.createObjectStore("cards", { keyPath: "id" });
            store.createIndex("by-lessonId", "lessonId");
          }

          if (!db.objectStoreNames.contains("card_versions")) {
            const store = db.createObjectStore("card_versions", {
              keyPath: "id",
            });
            store.createIndex("by-cardId", "cardId");
          }

          if (!db.objectStoreNames.contains("suggestions")) {
            const store = db.createObjectStore("suggestions", {
              keyPath: "id",
            });
            store.createIndex("by-status", "status");
            store.createIndex("by-trackId", "trackId");
          }

          if (!db.objectStoreNames.contains("meta")) {
            db.createObjectStore("meta", { keyPath: "key" });
          }
        },
      });
    }
    return this.dbPromise;
  }

  // ---------------------------------------------------------------------------
  // Lecture
  // ---------------------------------------------------------------------------

  async getAllTracks(): Promise<Track[]> {
    const db = await this.getDB();
    const metas = await db.getAll("tracks");
    metas.sort((a, b) => a.sortOrder - b.sortOrder);

    const tracks: Track[] = [];
    for (const meta of metas) {
      const lessons = await this.assembleLessonsForTrack(db, meta.id);
      const { sortOrder: _so, ...trackFields } = meta;
      tracks.push({ ...trackFields, lessons });
    }
    return tracks;
  }

  async getTrackById(id: string): Promise<Track | undefined> {
    const db = await this.getDB();
    const meta = await db.get("tracks", id);
    if (!meta) return undefined;
    const lessons = await this.assembleLessonsForTrack(db, id);
    const { sortOrder: _so, ...trackFields } = meta;
    return { ...trackFields, lessons };
  }

  async getLessonById(
    trackId: string,
    lessonId: string,
  ): Promise<Lesson | undefined> {
    const db = await this.getDB();
    const meta = await db.get("lessons", lessonId);
    if (!meta || meta.trackId !== trackId) return undefined;
    const cards = await this.assembleCardsForLesson(db, lessonId);
    const { trackId: _tid, sortOrder: _so, ...lessonFields } = meta;
    return { ...lessonFields, cards };
  }

  async getCardsByLesson(lessonId: string): Promise<Card[]> {
    const db = await this.getDB();
    return this.assembleCardsForLesson(db, lessonId);
  }

  async getAllCards(): Promise<Card[]> {
    const db = await this.getDB();
    const stored = await db.getAll("cards");
    return stored.map(({ lessonId: _lid, sortOrder: _so, ...card }) => card);
  }

  // ---------------------------------------------------------------------------
  // Helpers privés d'assemblage
  // ---------------------------------------------------------------------------

  private async assembleLessonsForTrack(
    db: ContentDB,
    trackId: string,
  ): Promise<Lesson[]> {
    const metas = await db.getAllFromIndex("lessons", "by-trackId", trackId);
    metas.sort((a, b) => a.sortOrder - b.sortOrder);

    const lessons: Lesson[] = [];
    for (const meta of metas) {
      const cards = await this.assembleCardsForLesson(db, meta.id);
      const { trackId: _tid, sortOrder: _so, ...lessonFields } = meta;
      lessons.push({ ...lessonFields, cards });
    }
    return lessons;
  }

  private async assembleCardsForLesson(
    db: ContentDB,
    lessonId: string,
  ): Promise<Card[]> {
    const stored = await db.getAllFromIndex("cards", "by-lessonId", lessonId);
    stored.sort((a, b) => a.sortOrder - b.sortOrder);
    return stored.map(({ lessonId: _lid, sortOrder: _so, ...card }) => card);
  }

  // ---------------------------------------------------------------------------
  // Écriture (admin)
  // ---------------------------------------------------------------------------

  async upsertTrack(track: Omit<Track, "lessons">): Promise<void> {
    const db = await this.getDB();
    const existing = await db.get("tracks", track.id);
    const sortOrder =
      existing?.sortOrder ?? (await db.count("tracks"));
    await db.put("tracks", { ...track, sortOrder });
  }

  async deleteTrack(trackId: string): Promise<void> {
    const db = await this.getDB();
    const lessons = await db.getAllFromIndex(
      "lessons",
      "by-trackId",
      trackId,
    );
    for (const lesson of lessons) {
      await this.deleteLesson(lesson.id);
    }
    await db.delete("tracks", trackId);
  }

  async upsertLesson(
    trackId: string,
    lesson: Omit<Lesson, "cards">,
  ): Promise<void> {
    const db = await this.getDB();
    const existing = await db.get("lessons", lesson.id);
    const sortOrder =
      existing?.sortOrder ??
      (await db.getAllFromIndex("lessons", "by-trackId", trackId)).length;
    await db.put("lessons", { ...lesson, trackId, sortOrder });
  }

  async deleteLesson(lessonId: string): Promise<void> {
    const db = await this.getDB();
    const cards = await db.getAllFromIndex("cards", "by-lessonId", lessonId);
    for (const card of cards) {
      await db.delete("cards", card.id);
    }
    await db.delete("lessons", lessonId);
  }

  async upsertCard(lessonId: string, card: Card): Promise<void> {
    const db = await this.getDB();
    await this.upsertCardInternal(db, lessonId, card, "admin");
  }

  async deleteCard(cardId: string): Promise<void> {
    const db = await this.getDB();
    await db.delete("cards", cardId);
  }

  async reorderLessons(trackId: string, lessonIds: string[]): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction("lessons", "readwrite");
    for (let i = 0; i < lessonIds.length; i++) {
      const lesson = await tx.store.get(lessonIds[i]!);
      if (lesson && lesson.trackId === trackId) {
        await tx.store.put({ ...lesson, sortOrder: i });
      }
    }
    await tx.done;
  }

  async reorderCards(lessonId: string, cardIds: string[]): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction("cards", "readwrite");
    for (let i = 0; i < cardIds.length; i++) {
      const card = await tx.store.get(cardIds[i]!);
      if (card && card.lessonId === lessonId) {
        await tx.store.put({ ...card, sortOrder: i });
      }
    }
    await tx.done;
  }

  // ---------------------------------------------------------------------------
  // Helpers privés d'écriture
  // ---------------------------------------------------------------------------

  private async upsertCardInternal(
    db: ContentDB,
    lessonId: string,
    card: Card,
    changedBy: string,
  ): Promise<void> {
    const existing = await db.get("cards", card.id);
    if (existing) {
      await this.saveVersionSnapshot(db, existing, changedBy);
    }
    const sortOrder =
      existing?.sortOrder ??
      (await db.getAllFromIndex("cards", "by-lessonId", lessonId)).length;
    await db.put("cards", { ...card, lessonId, sortOrder });
  }

  private async saveVersionSnapshot(
    db: ContentDB,
    existing: StoredCard,
    changedBy: string,
  ): Promise<void> {
    const { lessonId: _lid, sortOrder: _so, ...card } = existing;
    const allVersions = await db.getAllFromIndex(
      "card_versions",
      "by-cardId",
      card.id,
    );
    const maxVersion = allVersions.reduce(
      (max, v) => Math.max(max, v.version),
      0,
    );

    const version: CardVersion = {
      id: crypto.randomUUID(),
      cardId: card.id,
      version: maxVersion + 1,
      snapshot: card,
      changedAt: new Date().toISOString(),
      changedBy,
      source: changedBy === "admin" ? "manual" : "import",
    };
    await db.put("card_versions", version);

    // Pruning : garder au max MAX_VERSIONS_PER_CARD versions
    if (allVersions.length >= MAX_VERSIONS_PER_CARD) {
      const sorted = [...allVersions].sort((a, b) => a.version - b.version);
      const toDelete = sorted.slice(
        0,
        allVersions.length - MAX_VERSIONS_PER_CARD + 1,
      );
      for (const v of toDelete) {
        await db.delete("card_versions", v.id);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Historique
  // ---------------------------------------------------------------------------

  async getCardHistory(cardId: string): Promise<CardVersion[]> {
    const db = await this.getDB();
    const versions = await db.getAllFromIndex(
      "card_versions",
      "by-cardId",
      cardId,
    );
    return versions
      .sort((a, b) => b.version - a.version)
      .slice(0, MAX_VERSIONS_PER_CARD);
  }

  async restoreCardVersion(versionId: string): Promise<void> {
    const db = await this.getDB();
    const version = await db.get("card_versions", versionId);
    if (!version) return;

    const current = await db.get("cards", version.cardId);
    if (!current) return;

    // Sauvegarde l'état actuel avant de restaurer (pour pouvoir annuler)
    await this.saveVersionSnapshot(db, current, "admin");

    await db.put("cards", {
      ...version.snapshot,
      lessonId: current.lessonId,
      sortOrder: current.sortOrder,
    });
  }

  // ---------------------------------------------------------------------------
  // Suggestions
  // ---------------------------------------------------------------------------

  async submitSuggestion(
    suggestion: Omit<
      Suggestion,
      "id" | "status" | "createdAt" | "reviewedAt"
    >,
  ): Promise<void> {
    const db = await this.getDB();
    const newSuggestion: Suggestion = {
      ...suggestion,
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
      reviewedAt: null,
    };
    await db.put("suggestions", newSuggestion);
  }

  async getSuggestions(filters?: {
    status?: SuggestionStatus;
    trackId?: string;
  }): Promise<Suggestion[]> {
    const db = await this.getDB();
    let results: Suggestion[];

    if (filters?.status) {
      results = await db.getAllFromIndex(
        "suggestions",
        "by-status",
        filters.status,
      );
      if (filters.trackId) {
        results = results.filter((s) => s.trackId === filters.trackId);
      }
    } else if (filters?.trackId) {
      results = await db.getAllFromIndex(
        "suggestions",
        "by-trackId",
        filters.trackId,
      );
    } else {
      results = await db.getAll("suggestions");
    }

    return results.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async updateSuggestionStatus(
    id: string,
    status: SuggestionStatus,
    adminNote?: string,
  ): Promise<void> {
    const db = await this.getDB();
    const suggestion = await db.get("suggestions", id);
    if (!suggestion) return;
    await db.put("suggestions", {
      ...suggestion,
      status,
      adminNote: adminNote ?? suggestion.adminNote,
      reviewedAt: new Date().toISOString(),
    });
  }

  // ---------------------------------------------------------------------------
  // Import en masse
  // ---------------------------------------------------------------------------

  async bulkUpsertCards(
    lessonId: string,
    cards: Card[],
    changedBy: string,
  ): Promise<void> {
    const db = await this.getDB();
    for (const card of cards) {
      await this.upsertCardInternal(db, lessonId, card, changedBy);
    }
  }

  // ---------------------------------------------------------------------------
  // Seed
  // ---------------------------------------------------------------------------

  async isSeeded(): Promise<boolean> {
    const db = await this.getDB();
    const meta = await db.get("meta", "seeded");
    return meta?.value === true;
  }

  async seed(tracks: Track[]): Promise<void> {
    const db = await this.getDB();

    for (let ti = 0; ti < tracks.length; ti++) {
      const track = tracks[ti]!;
      const { lessons, ...trackMeta } = track;
      await db.put("tracks", { ...trackMeta, sortOrder: ti });

      for (let li = 0; li < lessons.length; li++) {
        const lesson = lessons[li]!;
        const { cards, ...lessonMeta } = lesson;
        await db.put("lessons", {
          ...lessonMeta,
          trackId: track.id,
          sortOrder: li,
        });

        for (let ci = 0; ci < cards.length; ci++) {
          const card = cards[ci]!;
          await db.put("cards", {
            ...card,
            lessonId: lesson.id,
            sortOrder: ci,
          });
        }
      }
    }

    await db.put("meta", { key: "seeded", value: true });
  }

  async syncBuiltinContent(tracks: Track[], version: string): Promise<void> {
    const db = await this.getDB();
    const currentVersion = await db.get("meta", "builtinContentVersion");
    if (currentVersion?.value === version) return;

    if (!(await this.isSeeded())) {
      await this.seed(tracks);
      await db.put("meta", { key: "builtinContentVersion", value: version });
      return;
    }

    for (let ti = 0; ti < tracks.length; ti++) {
      const track = tracks[ti]!;
      const { lessons, ...trackMeta } = track;
      const existingTrack = await db.get("tracks", track.id);
      await db.put("tracks", {
        ...existingTrack,
        ...trackMeta,
        sortOrder: existingTrack?.sortOrder ?? ti,
      });

      for (let li = 0; li < lessons.length; li++) {
        const lesson = lessons[li]!;
        const { cards, ...lessonMeta } = lesson;
        const existingLesson = await db.get("lessons", lesson.id);
        await db.put("lessons", {
          ...existingLesson,
          ...lessonMeta,
          trackId: track.id,
          sortOrder: existingLesson?.sortOrder ?? li,
        });

        for (let ci = 0; ci < cards.length; ci++) {
          const card = cards[ci]!;
          const existingCard = await db.get("cards", card.id);
          if (!existingCard) {
            await db.put("cards", {
              ...card,
              lessonId: lesson.id,
              sortOrder: ci,
            });
          } else if (!(await this.hasCardHistory(db, card.id))) {
            await db.put("cards", {
              ...card,
              lessonId: existingCard.lessonId,
              sortOrder: existingCard.sortOrder,
            });
          }
        }
      }
    }

    await db.put("meta", { key: "seeded", value: true });
    await db.put("meta", { key: "builtinContentVersion", value: version });
  }

  private async hasCardHistory(db: ContentDB, cardId: string): Promise<boolean> {
    const versions = await db.getAllFromIndex("card_versions", "by-cardId", cardId);
    return versions.length > 0;
  }
}
