# Architecture

## Overview

Finance App is a **client-side only** spaced-repetition learning platform. There is no backend: all business logic runs in the browser and all state is persisted in LocalStorage.

```
┌─────────────────────────────────────────────┐
│                 Browser                      │
│                                              │
│  ┌─────────────┐    ┌──────────────────────┐ │
│  │  Next.js    │    │     src/lib/         │ │
│  │  App Router │───▶│  Business Logic      │ │
│  │  (src/app/) │    │  spaced-repetition   │ │
│  └──────┬──────┘    │  progression         │ │
│         │           │  level-engine        │ │
│  ┌──────▼──────┐    │  unlock              │ │
│  │ Components  │    │  storage             │ │
│  │(src/compon.)│    └──────────┬───────────┘ │
│  └─────────────┘               │             │
│                        ┌───────▼───────┐     │
│  ┌─────────────┐       │  LocalStorage │     │
│  │src/content/ │       │  (UserProgress│     │
│  │Track data   │       │   + CardState)│     │
│  └─────────────┘       └───────────────┘     │
└─────────────────────────────────────────────┘
```

## Layer Responsibilities

### `src/app/` — Pages & Routing

Next.js App Router pages. Mix of server components (static pages) and client components (interactive sessions).

| Route | Description |
|-------|-------------|
| `/` | Home / landing page |
| `/tracks` | Track listing |
| `/tracks/[trackId]` | Track detail with lesson list and XP bar |
| `/session` | Active flashcard session (client component) |
| `/results` | Post-session summary |

The session page receives `trackId` and `lessonId` as URL search params, loads the lesson cards, runs the review loop, then redirects to `/results` with XP and stars encoded in the URL.

### `src/components/` — UI Components

Stateless, presentational components.

| Component | Purpose |
|-----------|---------|
| `LearningCard` | Flip card with type-specific color/icon; emits answer quality |
| `LessonList` | Grid of lessons with lock / star / available states |
| `XPBar` | Level badge, title, and progress bar |

### `src/lib/` — Business Logic

Pure TypeScript functions — no React, no side effects (except `storage.ts`). Fully unit-tested.

| Module | Responsibility |
|--------|---------------|
| `types.ts` | Shared TypeScript interfaces (`Card`, `Lesson`, `Track`, `UserProgress`, …) |
| `spaced-repetition.ts` | SM-2 algorithm — computes next review date from answer quality |
| `progression.ts` | XP gain per answer quality, streak bonus, lesson star rating |
| `level-engine.ts` | Maps total XP to level number and title |
| `unlock.ts` | Determines whether a lesson is accessible |
| `storage.ts` | Read/write `UserProgress` from/to `localStorage` |

### `src/content/` — Course Data

Plain TypeScript objects conforming to the `Track` / `Lesson` / `Card` types. No framework coupling.

| File | Content |
|------|---------|
| `market-finance.ts` | Market Finance track (stocks, bonds, derivatives, …) |
| `index.ts` | `allTracks` array + `getTrackById` / `getLessonById` helpers |

## Data Flow — Learning Session

```
User opens /tracks/[id]
        │
        ▼
  load UserProgress from LocalStorage
  compute unlock status for each lesson
        │
        ▼
User starts a lesson → /session?trackId=…&lessonId=…
        │
        ▼
  load lesson cards from src/content/
  for each card:
    show card front → user flips → rates answer (0/2/4)
    computeNextReview(cardProgress, quality)   ← spaced-repetition.ts
    computeXpGain(quality, streak)             ← progression.ts
        │
        ▼
  session ends:
    computeLessonStars(results)               ← progression.ts
    updateStreak(lastSessionAt)               ← progression.ts
    merge new CardProgress into UserProgress
    saveProgress(userProgress)               ← storage.ts
    redirect → /results?xp=…&stars=…
```

## SM-2 Spaced Repetition Algorithm

Each card carries a `CardProgress` record:

| Field | Description |
|-------|-------------|
| `repetitions` | Number of successful reviews |
| `easeFactor` | Multiplier for interval growth (min 1.3, default 2.5) |
| `interval` | Days until next review |
| `nextReviewAt` | ISO date string for next scheduled review |

On each answer the algorithm:
1. Receives a quality score 0–5 (mapped from ✗/~/✓ user input)
2. If quality < 3 → resets interval to 1 day, keeps ease factor
3. If quality ≥ 3 → grows interval (`interval × easeFactor`) and adjusts ease factor: `easeFactor += 0.1 - (5 - quality) × 0.08`

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

## Persistence

`storage.ts` serializes the full `UserProgress` object to `localStorage` under the key `finance-app:progress`. No server, no cookies, no external dependencies.

This means progress is:
- **Persistent** across browser sessions on the same device
- **Lost** if the user clears browser data
- **Not synced** across devices
