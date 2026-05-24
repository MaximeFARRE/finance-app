# Finance App

[![CI](https://github.com/MaximeFARRE/finance-app/actions/workflows/ci.yml/badge.svg)](https://github.com/MaximeFARRE/finance-app/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)

A gamified, offline-first spaced-repetition app to master finance interview concepts. Study flashcards, earn XP, and track your progress through a 9-level career system — from *Stagiaire* to *Partner*.

## Features

- **Spaced Repetition (SM-2)** — cards adapt to your performance; weak cards come back sooner
- **7 Card Types** — Definition, Intuition, Example, Formula, Trap, Interview Question, Model Answer
- **XP & Level System** — 9 finance career levels (Stagiaire → Partner) with XP rewards and streak bonuses
- **Lesson Stars** — earn 1–3 stars per lesson based on accuracy
- **Progressive Unlock** — lessons unlock as you complete previous ones
- **Difficulty Gating** — difficulty 2 and 3 cards unlock only once ≥ 70% of lower-difficulty cards are mastered
- **Cross-lesson Review Mode** — daily review queue built from all due cards across every track, accessible from the home page
- **Suggestion System** — users can flag errors or propose new cards directly from the flashcard UI
- **Admin UI** — full content management at `/admin`: browse tracks/lessons/cards, CRUD editor with live preview and version history, import/export, and suggestions management
- **Import / Export** — bulk content management via YAML (primary), JSON, or CSV; diff preview before applying changes
- **Offline-First** — all progress stored locally in the browser; no account required
- **Windows Launcher** — `lancer.bat` opens the app directly on Windows

## Content

| Track | Lessons | Cards |
|-------|---------|-------|
| Finance de marché | 11 | ~90 |
| Corporate Finance | 5 | ~42 |

All cards include a `detail` field with analogies, worked examples, and interview tips.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript 5 (strict) |
| Storage | LocalStorage (IndexedDB-ready via ContentProvider) |
| Testing | Vitest + jsdom + fake-indexeddb |
| Linting | ESLint 9 + Prettier |

## Getting Started

**Requirements:** Node.js 20+

```bash
git clone https://github.com/MaximeFARRE/finance-app.git
cd finance-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

On Windows you can also run `lancer.bat` — it starts the dev server on port 3210 and opens the browser automatically.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (single run) |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home / landing (with daily review badge)
│   ├── tracks/             # Track listing & detail pages
│   ├── session/            # Active learning & review session
│   ├── results/            # Session results screen
│   └── admin/              # Content management UI
│       ├── page.tsx        # Admin dashboard
│       ├── tracks/         # Track / lesson / card browser & editor
│       ├── import/         # Bulk import with diff preview
│       ├── export/         # Bulk export (YAML / JSON / CSV)
│       └── suggestions/    # User suggestion review queue
├── components/             # Reusable UI components
│   ├── LearningCard.tsx    # Flashcard with flip interaction
│   ├── LearnCard.tsx       # Learn-mode card (detail reveal)
│   ├── LessonList.tsx      # Lesson grid with lock/star states
│   ├── XPBar.tsx           # XP progress bar and level display
│   ├── SuggestionButton.tsx  # Suggestion trigger button
│   ├── SuggestionModal.tsx   # Suggestion submission form
│   └── admin/              # Admin-only components
│       ├── CardForm.tsx    # Card editor with live validation
│       ├── CardPreview.tsx # Real-time card preview
│       ├── CardHistory.tsx # Version history with restore
│       └── ImportDiff.tsx  # Import diff visualizer
├── content/                # Course data (tracks & lessons)
│   ├── index.ts            # Track registry & lookup helpers
│   ├── market-finance.ts   # Market Finance track (11 lessons)
│   └── corporate-finance.ts  # Corporate Finance track (5 lessons)
└── lib/                    # Core business logic
    ├── types.ts            # Shared TypeScript types
    ├── spaced-repetition.ts  # SM-2 algorithm
    ├── progression.ts      # XP gain & streak logic
    ├── level-engine.ts     # 9-level ranking system
    ├── unlock.ts           # Lesson unlock rules
    ├── difficulty-gate.ts  # Difficulty unlock (70% mastery threshold)
    ├── quiz-utils.ts       # Quiz deck builder (due-first + difficulty gating)
    ├── review-utils.ts     # Cross-lesson review deck builder
    ├── storage.ts          # LocalStorage persistence
    ├── use-content.ts      # React hook for ContentProvider
    ├── auth.ts             # Admin auth guard (Supabase-ready)
    ├── local-content-provider.ts  # IndexedDB-backed content provider
    └── import-export/      # YAML / JSON / CSV import-export engine
        ├── index.ts        # analyzeImport, applyImport, exportContent
        ├── yaml-io.ts      # YAML parser & exporter
        ├── json-io.ts      # JSON parser & exporter
        ├── csv-io.ts       # CSV parser & exporter (BOM, auto-separator)
        ├── diff.ts         # Diff engine (added / modified / unchanged)
        ├── normalizer.ts   # Normalize parsed data → domain objects
        └── id-generator.ts # Deterministic card ID generation
```

## Adding Content

The recommended workflow depends on the volume of changes:

- **1–5 cards:** use the admin card editor at `/admin`
- **A full lesson or track:** author in YAML and import via `/admin/import`
- **AI-assisted generation:** see [docs/AI_CONTENT_TEMPLATE.md](docs/AI_CONTENT_TEMPLATE.md) for ready-to-use prompts

Style rules and ID conventions are documented in [docs/CONTENT_STYLE_GUIDE.md](docs/CONTENT_STYLE_GUIDE.md).
For a code-first approach, see [docs/ADDING_CONTENT.md](docs/ADDING_CONTENT.md).

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for a detailed overview of the system design, data flow, and algorithms.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

[MIT](LICENSE) © 2025 Maxime FARRE
