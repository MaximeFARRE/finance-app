import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadProgress, saveProgress } from "./storage";

const STORAGE_KEY = "finance-app:progress";

function makeLocalStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
}

let mockStorage = makeLocalStorageMock();

beforeEach(() => {
  mockStorage = makeLocalStorageMock();
  vi.stubGlobal("localStorage", mockStorage);
});

describe("loadProgress", () => {
  it("returns initial progress when localStorage is empty", () => {
    const progress = loadProgress();
    expect(progress.xp).toBe(0);
    expect(progress.streak).toBe(0);
    expect(progress.completedLessonIds).toEqual([]);
    expect(progress.learnedCardIds).toEqual([]);
    expect(progress.learnSessionIds).toEqual([]);
  });

  it("returns saved progress when data is valid", () => {
    const stored = {
      userId: "default",
      xp: 150,
      streak: 3,
      lastSessionAt: "2026-05-27T10:00:00.000Z",
      cards: {},
      completedLessonIds: ["lesson-1"],
      lessonStars: { "lesson-1": 3 },
      learnedCardIds: ["card-a"],
      learnSessionIds: ["lesson-1"],
    };
    mockStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    const progress = loadProgress();
    expect(progress.xp).toBe(150);
    expect(progress.streak).toBe(3);
    expect(progress.completedLessonIds).toEqual(["lesson-1"]);
    expect(progress.learnedCardIds).toEqual(["card-a"]);
  });

  it("back-fills learnedCardIds when missing from stored data", () => {
    const legacy = {
      userId: "default",
      xp: 50,
      streak: 1,
      lastSessionAt: null,
      cards: {},
      completedLessonIds: [],
      lessonStars: {},
      // learnedCardIds absent — old format
      learnSessionIds: [],
    };
    mockStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));

    const progress = loadProgress();
    expect(progress.learnedCardIds).toEqual([]);
  });

  it("back-fills learnSessionIds when missing from stored data", () => {
    const legacy = {
      userId: "default",
      xp: 50,
      streak: 1,
      lastSessionAt: null,
      cards: {},
      completedLessonIds: [],
      lessonStars: {},
      learnedCardIds: [],
      // learnSessionIds absent — old format
    };
    mockStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));

    const progress = loadProgress();
    expect(progress.learnSessionIds).toEqual([]);
  });

  it("returns initial progress when stored JSON is malformed", () => {
    mockStorage.setItem(STORAGE_KEY, "not-valid-json{{{");

    const progress = loadProgress();
    expect(progress.xp).toBe(0);
    expect(progress.completedLessonIds).toEqual([]);
  });

  it("returns a fresh object each call when storage is empty", () => {
    const a = loadProgress();
    const b = loadProgress();
    a.completedLessonIds.push("lesson-x");
    expect(b.completedLessonIds).toEqual([]);
  });
});

describe("saveProgress", () => {
  it("persists progress to localStorage", () => {
    const progress = {
      userId: "default",
      xp: 200,
      streak: 5,
      lastSessionAt: "2026-05-28T08:00:00.000Z",
      cards: {},
      completedLessonIds: ["lesson-2"],
      lessonStars: {},
      learnedCardIds: [],
      learnSessionIds: ["lesson-2"],
    };

    saveProgress(progress);

    const raw = mockStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.xp).toBe(200);
    expect(parsed.completedLessonIds).toEqual(["lesson-2"]);
  });

  it("round-trips correctly with loadProgress", () => {
    const progress = {
      userId: "default",
      xp: 99,
      streak: 2,
      lastSessionAt: null,
      cards: {},
      completedLessonIds: ["a", "b"],
      lessonStars: { a: 3, b: 1 },
      learnedCardIds: ["card-1"],
      learnSessionIds: ["a"],
    };

    saveProgress(progress);
    const loaded = loadProgress();

    expect(loaded.xp).toBe(99);
    expect(loaded.completedLessonIds).toEqual(["a", "b"]);
    expect(loaded.lessonStars).toEqual({ a: 3, b: 1 });
    expect(loaded.learnedCardIds).toEqual(["card-1"]);
    expect(loaded.learnSessionIds).toEqual(["a"]);
  });
});
