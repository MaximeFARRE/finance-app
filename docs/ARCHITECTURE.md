# Architecture

## Overview

Finance App is a **client-side spaced-repetition platform** with a full content-management layer. All business logic runs in the browser; progress is persisted in LocalStorage. The content management system (admin UI, import/export, suggestions) is designed to be Supabase-ready without requiring a backend today.

```
┌──────────────────────────────────────────────────────────────────┐
│                            Browser                               │
│                                                                  │
│  ┌──────────────────┐    ┌────────────────────────────────────┐  │
│  │  Next.js App     │    │            src/lib/                │  │
│  │  Router          │───▶│  Business Logic                    │  │
│  │  (src/app/)      │    │  spaced-repetition · progression   │  │
│  └──────┬───────────┘    │  level-engine · unlock             │  │
│         │                │  difficulty-gate · quiz-utils      │  │
│  ┌──────▼───────────┐    │  review-utils · import-export/     │  │
│  │ React Components │    └──────────────┬─────────────────────┘  │
│  │ (src/components/)│                   │                         │
│  └──────────────────┘    ┌──────────────▼─────────────────────┐  │
│                          │       ContentProvider              │  │
│  ┌──────────────────┐    │  LocalContentProvider (IndexedDB)  │  │
│  │  src/content/    │    │  ──── future: SupabaseProvider ─── │  │
│  │  Static tracks   │    └──────────────┬─────────────────────┘  │
│  └──────────────────┘                   │                         │
│                          ┌──────────────▼─────────────────────┐  │
│                          │  LocalStorage / IndexedDB          │  │
│                          │  UserProgress + CardProgress       │  │
│                          │  Content (cards, suggestions, …)   │  │
│                          └────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Layer Responsibilities

### `src/app/` — Pages & Routing

| Route | Type | Description |
|-------|------|-------------|
| `/` | Client | Home with daily review badge |
| `/tracks` | Client | Track listing |
| `/tracks/[trackId]` | Client | Track detail with lesson list and XP bar |
| `/session` | Client | Active flashcard session (learn + review modes) |
| `/results` | Client | Post-session summary |
| `/admin` | Client | Admin dashboard (stats, quick links) |
| `/admin/tracks` | Client | All tracks overview |
| `/admin/tracks/[trackId]` | Client | Track detail + lessons |
| `/admin/tracks/[trackId]/lessons/[lessonId]` | Client | Lesson detail + cards list |
| `/admin/tracks/[trackId]/lessons/[lessonId]/cards/new` | Client | New card editor |
| `/admin/tracks/[trackId]/lessons/[lessonId]/cards/[cardId]/edit` | Client | Card editor with version history |
| `/admin/import` | Client | Bulk import (YAML/JSON/CSV) with diff preview |
| `/admin/export` | Client | Bulk export with scope and format selection |
| `/admin/suggestions` | Client | User suggestion review queue |

**Session modes:**
- `?mode=learn&trackId=…&lessonId=…` — lesson learn flow (LearnCard)
- `?mode=quiz&trackId=…&lessonId=…` — lesson quiz flow (LearningCard with SM-2)
- `?mode=review` — cross-lesson daily review (ReviewFlow)

---

### `src/components/` — UI Components

| Component | Purpose |
|-----------|---------|
| `LearningCard` | Flip card with type-specific color/icon; emits answer quality (SM-2 input) |
| `LearnCard` | Read-only learn-mode card with `detail` reveal on demand |
| `LessonList` | Grid of lessons with lock / star / available states |
| `XPBar` | Level badge, title, and progress bar |
| `SuggestionButton` | Floating trigger shown on each flashcard |
| `SuggestionModal` | Bottom-sheet form with 5 suggestion categories |
| `admin/CardForm` | Full card editor (7 types, difficulty, tags, detail) with live `onChange` |
| `admin/CardPreview` | Real-time card preview mirroring the LearnCard rendering |
| `admin/CardHistory` | Version history accordion with restore action |
| `admin/ImportDiff` | Diff visualizer: added / modified / unchanged / errors |

---

### `src/lib/` — Business Logic

Pure TypeScript functions — no React, no side effects (except `storage.ts`). Fully unit-tested.

| Module | Responsibility |
|--------|---------------|
| `types.ts` | Shared interfaces: `Card`, `Lesson`, `Track`, `UserProgress`, `CardProgress`, `Suggestion`, `ContentProvider` |
| `spaced-repetition.ts` | SM-2 algorithm — `computeNextReview`, `isDueForReview` |
| `progression.ts` | XP gain per quality, streak bonus, lesson star rating |
| `level-engine.ts` | Maps total XP → level number and career title |
| `unlock.ts` | `isLessonUnlocked(lessons, lessonId, completedIds)` |
| `difficulty-gate.ts` | `filterByUnlockedDifficulty` — unlocks d2/d3 at 70% mastery of lower difficulties |
| `quiz-utils.ts` | `buildQuizDeck` — filters by difficulty, sorts due cards first |
| `review-utils.ts` | `buildReviewDeck`, `countDueCards` — cross-lesson review queue |
| `storage.ts` | Read/write `UserProgress` from/to `localStorage` |
| `use-content.ts` | React hook wrapping the `ContentProvider`; exposes `tracks`, `isLoading` |
| `auth.ts` | `isAdmin()` guard (returns `true` locally; Supabase hook when deployed) |
| `local-content-provider.ts` | `ContentProvider` implementation backed by IndexedDB (`fake-indexeddb` in tests) |
| `import-export/` | Full import/export engine (see below) |

#### `src/lib/import-export/`

| Module | Responsibility |
|--------|---------------|
| `index.ts` | Public API: `analyzeImport`, `applyImport`, `exportContent` |
| `yaml-io.ts` | YAML parse (full + quick formats) and export with header comment |
| `json-io.ts` | JSON parse and export (same API as yaml-io) |
| `csv-io.ts` | CSV parse/export — 17 columns, BOM, pipe-tags, auto-separator detection |
| `diff.ts` | `computeImportDiff` — compares incoming cards with existing, returns added/modified/unchanged |
| `normalizer.ts` | `normalizeFullImport` / `normalizeQuickImport` — Zod-parsed data → domain `Card[]` |
| `id-generator.ts` | `generateCardId` — deterministic djb2 hash, collision-safe suffix |

---

### `src/content/` — Course Data

Plain TypeScript objects conforming to the `Track` / `Lesson` / `Card` types.

| File | Content |
|------|---------|
| `market-finance.ts` | 11 lessons on market finance fundamentals (~90 cards) |
| `corporate-finance.ts` | 5 lessons on IBD fundamentals: capital structure, DCF, comps, M&A, LBO (~42 cards) |
| `index.ts` | `allTracks` array + `getTrackById` / `getLessonById` helpers |

---

## Data Flows

### Learning Session

```
User opens /tracks/[id]
       │
       ▼
 load UserProgress from LocalStorage
 isLessonUnlocked() for each lesson         ← unlock.ts
       │
       ▼
User starts lesson → /session?mode=quiz&…
       │
       ▼
 buildQuizDeck(cards, cardProgress)         ← quiz-utils.ts
   └─ filterByUnlockedDifficulty()          ← difficulty-gate.ts
   └─ sort: due cards first (SM-2)          ← spaced-repetition.ts
       │
       ▼
 For each card:
   show front → user flips → rates (0/2/4)
   computeNextReview(cardProgress, quality) ← spaced-repetition.ts
   computeXpGain(quality, streak)           ← progression.ts
       │
       ▼
 Session ends:
   computeLessonStars(results)              ← progression.ts
   updateStreak(lastSessionAt)              ← progression.ts
   saveProgress(userProgress)              ← storage.ts
   redirect → /results?xp=…&stars=…
```

### Cross-lesson Review Session

```
User opens /  (home page)
       │
       ▼
 ReviewBadge: countDueCards(allTracks, progress)  ← review-utils.ts
       │
User clicks "X cartes à réviser" → /session?mode=review
       │
       ▼
 buildReviewDeck(allTracks, progress, limit=15)   ← review-utils.ts
   └─ collect cards from all unlocked lessons
   └─ separate: due cards (sorted by overdue date) + new cards (≤ 5)
       │
       ▼
 ReviewFlow runs same quiz loop as lesson session
 (no lessonId — results posted with empty trackId/lessonId)
```

### Import Flow

```
Admin uploads file → /admin/import
       │
       ▼
 detectFormat(fileName)                      ← extension sniffing
 analyzeImport(text, format, provider)       ← import-export/index.ts
   └─ parse via yaml-io / json-io / csv-io
   └─ normalizeFullImport / normalizeQuickImport  (auto-generate IDs)
   └─ computeImportDiff(incoming, existing)  ← diff.ts
       │
       ▼
 ImportDiff component shows: added / modified / unchanged / errors
       │
Admin clicks "Importer (X modifications)"
       │
       ▼
 applyImport(result, normalized, provider)
   └─ provider.upsertCard() for each added/modified card
```

---

## SM-2 Spaced Repetition Algorithm

Each card carries a `CardProgress` record:

| Field | Description |
|-------|-------------|
| `repetitions` | Number of successful reviews |
| `easeFactor` | Multiplier for interval growth (min 1.3, default 2.5) |
| `interval` | Days until next review |
| `nextReviewAt` | ISO date string for next scheduled review |
| `lastReviewedAt` | ISO date string of last review |

**Answer → next interval:**
1. Quality score 0–5 (mapped from ✗ / ~ / ✓ user input)
2. If quality < 3 → reset interval to 1 day
3. If quality ≥ 3 → `interval × easeFactor`; `easeFactor += 0.1 − (5 − quality) × 0.08`

**Mastery proxy:** `repetitions ≥ 1` is used by the difficulty-gate as the "mastered" threshold.

---

## Difficulty Gating

```
d1 cards : always accessible
d2 cards : unlock when ≥ 70% of d1 cards in the lesson are mastered (repetitions ≥ 1)
d3 cards : unlock when ≥ 70% of d1+d2 cards in the lesson are mastered
```

Implemented in `difficulty-gate.ts` — `filterByUnlockedDifficulty(cards, cardProgress)`.

---

## XP & Level System

### XP per Answer

| Quality | Label | XP | With Streak ≥ 3 |
|---------|-------|----|-----------------|
| 0–1 | Raté | 0 | 0 |
| 2 | Presque | 2 | 3 |
| 3 | Trouvé | 5 | 7 |
| 4 | Facile | 10 | 15 |
| 5 | Parfait | 15 | 22 |

Streak bonus: **×1.5**, rounded up.

### Level Thresholds

| Level | Title | XP Required |
|-------|-------|------------|
| 1 | Stagiaire | 0 |
| 2 | Analyste Junior | 50 |
| 3 | Analyste | 150 |
| 4 | Analyste Senior | 350 |
| 5 | Associate | 700 |
| 6 | VP | 1 200 |
| 7 | Director | 2 000 |
| 8 | Managing Director | 3 500 |
| 9 | Partner | 6 000 |

### Lesson Stars

| Stars | Condition |
|-------|-----------|
| ⭐⭐⭐ | 100% correct answers |
| ⭐⭐ | ≥ 70% correct |
| ⭐ | < 70% correct (lesson still completed) |

---

## ContentProvider Abstraction

The admin and import/export features access content through a `ContentProvider` interface, enabling a future migration to Supabase without changing the UI layer.

```typescript
interface ContentProvider {
  getTracks(): Promise<Track[]>
  upsertCard(lessonId: string, card: Card): Promise<void>
  deleteCard(cardId: string): Promise<void>
  getCardHistory(cardId: string): Promise<CardVersion[]>
  submitSuggestion(suggestion: Omit<Suggestion, "id" | "createdAt">): Promise<void>
  getSuggestions(filter?: SuggestionFilter): Promise<Suggestion[]>
  updateSuggestionStatus(id: string, status: SuggestionStatus, note?: string): Promise<void>
}
```

Today: `LocalContentProvider` (IndexedDB).
Future: `SupabaseContentProvider` — swap at the `use-content.ts` hook level.

---

## Persistence

`storage.ts` serializes `UserProgress` to `localStorage` under `finance-app:progress`. Content metadata (cards created/modified via admin) is persisted in IndexedDB via `LocalContentProvider`.

| Data | Storage | Key |
|------|---------|-----|
| User progress (XP, streak, SM-2 state) | LocalStorage | `finance-app:progress` |
| Admin-managed content | IndexedDB | `finance-app-content` DB |
| Suggestions | IndexedDB | `finance-app-content` DB |

Progress is:
- **Persistent** across browser sessions on the same device
- **Lost** if the user clears browser data
- **Not synced** across devices (Supabase migration planned)
