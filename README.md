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
- **Offline-First** — all progress stored locally in the browser; no account required
- **Windows Launcher** — `lancer.bat` opens the app directly on Windows

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript 5 (strict) |
| Testing | Vitest + jsdom |
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
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home / landing
│   ├── tracks/           # Track listing & detail pages
│   ├── session/          # Active learning session
│   └── results/          # Session results screen
├── components/           # Reusable UI components
│   ├── LearningCard.tsx  # Flashcard with flip interaction
│   ├── LessonList.tsx    # Lesson grid with lock/star states
│   └── XPBar.tsx         # XP progress bar and level display
├── content/              # Course data (tracks & lessons)
│   ├── index.ts          # Track registry & lookup helpers
│   └── market-finance.ts # Market Finance track content
└── lib/                  # Core business logic
    ├── types.ts           # Shared TypeScript types
    ├── spaced-repetition.ts  # SM-2 algorithm
    ├── progression.ts    # XP gain & streak logic
    ├── level-engine.ts   # 9-level ranking system
    ├── unlock.ts         # Lesson unlock rules
    └── storage.ts        # LocalStorage persistence
```

## Adding Content

Want to add a new track or lessons? See [docs/ADDING_CONTENT.md](docs/ADDING_CONTENT.md) for a step-by-step guide.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for a detailed overview of the system design, data flow, and algorithms.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

[MIT](LICENSE) © 2025 Maxime FARRE
