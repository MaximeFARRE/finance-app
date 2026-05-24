import { IDBFactory } from "fake-indexeddb";
import { beforeEach, describe, expect, it } from "vitest";
import { allTracks } from "@/content";
import { LocalContentProvider } from "./local-content-provider";

// Réinitialise IndexedDB avant chaque test pour garantir l'isolation
beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).indexedDB = new IDBFactory();
});

// ---------------------------------------------------------------------------
// Seed & lecture
// ---------------------------------------------------------------------------

describe("seed et lecture", () => {
  it("isSeeded retourne false avant le seed", async () => {
    const provider = new LocalContentProvider();
    expect(await provider.isSeeded()).toBe(false);
  });

  it("isSeeded retourne true après le seed", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    expect(await provider.isSeeded()).toBe(true);
  });

  it("getAllTracks retourne tous les tracks après le seed", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const tracks = await provider.getAllTracks();
    expect(tracks).toHaveLength(allTracks.length);
    expect(tracks[0]!.id).toBe(allTracks[0]!.id);
  });

  it("getAllTracks retourne les tracks avec leurs leçons et cartes", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const tracks = await provider.getAllTracks();
    expect(tracks[0]!.lessons.length).toBeGreaterThan(0);
    expect(tracks[0]!.lessons[0]!.cards.length).toBeGreaterThan(0);
  });

  it("syncBuiltinContent ajoute les nouveaux worlds, leçons et cartes sans écraser les cartes existantes", async () => {
    const provider = new LocalContentProvider();
    const baseTrack = {
      id: "market-finance",
      title: "Finance de marché",
      description: "Ancienne description",
      emoji: "📈",
      color: "blue",
      lessons: [
        {
          id: "lesson-1",
          slug: "lesson-1",
          title: "Leçon 1",
          description: "Leçon existante",
          estimatedMinutes: 5,
          cards: [
            {
              id: "card-1",
              type: "definition" as const,
              front: "Ancienne question",
              back: "Ancienne réponse",
              difficulty: 1 as const,
              tags: [],
            },
          ],
        },
      ],
    };
    const updatedTrack = {
      ...baseTrack,
      description: "Nouvelle description",
      worlds: [
        {
          id: "world-1",
          trackId: "market-finance",
          title: "World 1",
          description: "World ajouté",
          order: 1,
          lessonIds: ["lesson-1", "boss-1"],
          bossLessonId: "boss-1",
        },
      ],
      lessons: [
        {
          ...baseTrack.lessons[0]!,
          cards: [
            {
              ...baseTrack.lessons[0]!.cards[0]!,
              front: "Nouvelle question built-in",
            },
          ],
        },
        {
          id: "boss-1",
          slug: "boss-1",
          title: "Boss 1",
          description: "Boss ajouté",
          estimatedMinutes: 10,
          kind: "boss" as const,
          worldId: "world-1",
          cards: [
            {
              id: "boss-card-1",
              type: "definition" as const,
              front: "Question boss",
              back: "Réponse boss",
              difficulty: 1 as const,
              tags: [],
            },
          ],
        },
      ],
    };

    await provider.seed([baseTrack]);
    await provider.syncBuiltinContent([updatedTrack], "test-version");

    const track = await provider.getTrackById("market-finance");
    const existingCard = await provider.getCardsByLesson("lesson-1");
    const boss = await provider.getLessonById("market-finance", "boss-1");

    expect(track?.description).toBe("Nouvelle description");
    expect(track?.worlds?.[0]?.id).toBe("world-1");
    expect(existingCard[0]?.front).toBe("Ancienne question");
    expect(boss?.kind).toBe("boss");
    expect(boss?.cards[0]?.id).toBe("boss-card-1");
  });

  it("getTrackById retourne le bon track", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const track = await provider.getTrackById("market-finance");
    expect(track).toBeDefined();
    expect(track?.id).toBe("market-finance");
    expect(track?.lessons.length).toBeGreaterThan(0);
  });

  it("getTrackById retourne undefined pour un id inconnu", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const track = await provider.getTrackById("inexistant");
    expect(track).toBeUndefined();
  });

  it("getLessonById retourne la bonne leçon avec ses cartes", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const lesson = await provider.getLessonById(
      "market-finance",
      "mf-found-l1-action",
    );
    expect(lesson).toBeDefined();
    expect(lesson?.id).toBe("mf-found-l1-action");
    expect(lesson?.cards.length).toBeGreaterThan(0);
  });

  it("getLessonById retourne undefined si le trackId ne correspond pas", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const lesson = await provider.getLessonById(
      "mauvais-track",
      "mf-found-l1-action",
    );
    expect(lesson).toBeUndefined();
  });

  it("getCardsByLesson retourne les cartes dans l'ordre", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const cards = await provider.getCardsByLesson("mf-found-l1-action");
    expect(cards.length).toBeGreaterThan(0);
    // L'ordre doit correspondre à celui du built-in
    const builtinCards =
      allTracks[0]!.lessons.find((l) => l.id === "mf-found-l1-action")
        ?.cards ?? [];
    expect(cards.map((c) => c.id)).toEqual(builtinCards.map((c) => c.id));
  });

  it("getAllCards retourne toutes les cartes", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);
    const cards = await provider.getAllCards();
    const totalBuiltin = allTracks.flatMap((t) =>
      t.lessons.flatMap((l) => l.cards),
    ).length;
    expect(cards.length).toBe(totalBuiltin);
  });
});

// ---------------------------------------------------------------------------
// upsertCard & historique
// ---------------------------------------------------------------------------

describe("upsertCard et historique", () => {
  it("upsertCard ajoute une nouvelle carte", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const newCard = {
      id: "test-new-card",
      type: "definition" as const,
      front: "Question test ?",
      back: "Réponse test.",
      difficulty: 1 as const,
      tags: ["test"],
    };
    await provider.upsertCard("mf-found-l1-action", newCard);

    const cards = await provider.getCardsByLesson("mf-found-l1-action");
    expect(cards.find((c) => c.id === "test-new-card")).toBeDefined();
  });

  it("upsertCard crée une version lors d'une modification", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const original = (
      await provider.getCardsByLesson("mf-found-l1-action")
    )[0]!;
    const modified = { ...original, front: "Question modifiée ?" };
    await provider.upsertCard("mf-found-l1-action", modified);

    const history = await provider.getCardHistory(original.id);
    expect(history).toHaveLength(1);
    expect(history[0]!.snapshot.front).toBe(original.front);
  });

  it("upsertCard ne crée pas de version pour une nouvelle carte", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const newCard = {
      id: "test-no-history",
      type: "trap" as const,
      front: "Piège ?",
      back: "Attention.",
      difficulty: 2 as const,
      tags: [],
    };
    await provider.upsertCard("mf-found-l1-action", newCard);

    const history = await provider.getCardHistory("test-no-history");
    expect(history).toHaveLength(0);
  });

  it("restoreCardVersion restaure le contenu précédent", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const original = (
      await provider.getCardsByLesson("mf-found-l1-action")
    )[0]!;
    const originalFront = original.front;

    await provider.upsertCard("mf-found-l1-action", {
      ...original,
      front: "Version modifiée",
    });
    const history = await provider.getCardHistory(original.id);
    expect(history).toHaveLength(1);

    await provider.restoreCardVersion(history[0]!.id);

    const restored = (
      await provider.getCardsByLesson("mf-found-l1-action")
    ).find((c) => c.id === original.id);
    expect(restored?.front).toBe(originalFront);
  });

  it("restoreCardVersion sauvegarde l'état actuel avant de restaurer", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const original = (
      await provider.getCardsByLesson("mf-found-l1-action")
    )[0]!;
    await provider.upsertCard("mf-found-l1-action", {
      ...original,
      front: "Version v2",
    });
    const historyBeforeRestore = await provider.getCardHistory(original.id);

    await provider.restoreCardVersion(historyBeforeRestore[0]!.id);

    // Maintenant il devrait y avoir 2 versions (v1=original, v2=état avant restore)
    const historyAfterRestore = await provider.getCardHistory(original.id);
    expect(historyAfterRestore.length).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Suggestions
// ---------------------------------------------------------------------------

describe("suggestions", () => {
  it("submitSuggestion enregistre une suggestion en statut pending", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    await provider.submitSuggestion({
      cardId: "mf-found-l1-action-def",
      trackId: "market-finance",
      lessonId: "mf-found-l1-action",
      category: "error",
      message: "Il y a une erreur dans la définition",
    });

    const suggestions = await provider.getSuggestions();
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]!.status).toBe("pending");
    expect(suggestions[0]!.category).toBe("error");
    expect(suggestions[0]!.reviewedAt).toBeNull();
  });

  it("updateSuggestionStatus change le statut", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    await provider.submitSuggestion({
      cardId: "mf-found-l1-action-def",
      trackId: "market-finance",
      lessonId: "mf-found-l1-action",
      category: "wording",
      message: "Formulation confuse",
    });

    const [suggestion] = await provider.getSuggestions();
    await provider.updateSuggestionStatus(
      suggestion!.id,
      "accepted",
      "Correction appliquée",
    );

    const accepted = await provider.getSuggestions({ status: "accepted" });
    expect(accepted).toHaveLength(1);
    expect(accepted[0]!.adminNote).toBe("Correction appliquée");
    expect(accepted[0]!.reviewedAt).not.toBeNull();
  });

  it("getSuggestions filtre par statut", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    await provider.submitSuggestion({
      cardId: null,
      trackId: "market-finance",
      lessonId: "mf-found-l1-action",
      category: "new-card",
      message: "Proposition de nouvelle carte",
    });

    const pending = await provider.getSuggestions({ status: "pending" });
    const rejected = await provider.getSuggestions({ status: "rejected" });
    expect(pending).toHaveLength(1);
    expect(rejected).toHaveLength(0);
  });

  it("getSuggestions filtre par trackId", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    await provider.submitSuggestion({
      cardId: "mf-found-l1-action-def",
      trackId: "market-finance",
      lessonId: "mf-found-l1-action",
      category: "error",
      message: "Test",
    });

    const results = await provider.getSuggestions({ trackId: "market-finance" });
    expect(results).toHaveLength(1);

    const empty = await provider.getSuggestions({ trackId: "autre-track" });
    expect(empty).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// bulkUpsertCards
// ---------------------------------------------------------------------------

describe("bulkUpsertCards", () => {
  it("insère plusieurs cartes en une seule opération", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const before = (await provider.getCardsByLesson("mf-found-l1-action"))
      .length;

    const newCards = [
      {
        id: "bulk-1",
        type: "definition" as const,
        front: "Bulk 1 ?",
        back: "Réponse bulk 1.",
        difficulty: 1 as const,
        tags: [],
      },
      {
        id: "bulk-2",
        type: "intuition" as const,
        front: "Bulk 2 ?",
        back: "Réponse bulk 2.",
        difficulty: 2 as const,
        tags: [],
      },
    ];

    await provider.bulkUpsertCards(
      "mf-found-l1-action",
      newCards,
      "import:test.yaml",
    );

    const after = (await provider.getCardsByLesson("mf-found-l1-action"))
      .length;
    expect(after).toBe(before + 2);
  });

  it("crée des versions pour les cartes existantes modifiées en masse", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const existing = (await provider.getCardsByLesson("mf-found-l1-action"))[0]!;
    await provider.bulkUpsertCards(
      "mf-found-l1-action",
      [{ ...existing, front: "Front modifié en masse" }],
      "import:batch.yaml",
    );

    const history = await provider.getCardHistory(existing.id);
    expect(history).toHaveLength(1);
    expect(history[0]!.source).toBe("import");
    expect(history[0]!.changedBy).toBe("import:batch.yaml");
  });
});

// ---------------------------------------------------------------------------
// reorderLessons & reorderCards
// ---------------------------------------------------------------------------

describe("reorder", () => {
  it("reorderLessons change l'ordre des leçons", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const track = await provider.getTrackById("market-finance");
    const ids = track!.lessons.map((l) => l.id);
    const reversed = [...ids].reverse();

    await provider.reorderLessons("market-finance", reversed);

    const reordered = await provider.getTrackById("market-finance");
    expect(reordered!.lessons.map((l) => l.id)).toEqual(reversed);
  });

  it("reorderCards change l'ordre des cartes", async () => {
    const provider = new LocalContentProvider();
    await provider.seed(allTracks);

    const cards = await provider.getCardsByLesson("mf-found-l1-action");
    const ids = cards.map((c) => c.id);
    const reversed = [...ids].reverse();

    await provider.reorderCards("mf-found-l1-action", reversed);

    const reordered = await provider.getCardsByLesson("mf-found-l1-action");
    expect(reordered.map((c) => c.id)).toEqual(reversed);
  });
});
