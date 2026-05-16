# Contributing to Finance App

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Table of Contents

- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Branch Strategy](#branch-strategy)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Adding Content](#adding-content)

## Development Setup

**Requirements:** Node.js 20+, npm 10+

```bash
git clone https://github.com/MaximeFARRE/finance-app.git
cd finance-app
npm install
npm run dev
```

Run the full check suite before submitting a PR:

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm test            # Vitest unit tests
npm run build       # Next.js production build
```

All four commands must pass with zero errors.

## Code Style

The project uses **Prettier** and **ESLint** — formatting is enforced automatically.

Key conventions (see [`.prettierrc`](.prettierrc)):
- 2-space indentation
- Double quotes
- Trailing commas
- 100-character line width
- LF line endings

Configure your editor to format on save, or run `npx prettier --write .` before committing.

TypeScript strict mode is enabled — no `any` types, no unchecked index access.

## Branch Strategy

```
main              ← production-ready code
└── feature/xyz   ← feature branches (branch off main, PR back to main)
└── fix/xyz       ← bug fix branches
└── docs/xyz      ← documentation-only changes
```

Never commit directly to `main`. Always open a pull request.

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

feat(content): add Corporate Finance track
fix(session): correct XP calculation on streak reset
docs(readme): add screenshot section
test(progression): cover edge case for zero-day streak
refactor(lib): extract card scoring to separate function
```

**Types:** `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `style`

## Pull Request Process

1. Fork the repository and create your branch from `main`
2. Make your changes and ensure the full check suite passes
3. Write or update tests for any logic changes in `src/lib/`
4. Open a PR with a clear description of what changed and why
5. A maintainer will review and merge

## Adding Content

The fastest way to contribute is adding new tracks or lessons. See [docs/ADDING_CONTENT.md](docs/ADDING_CONTENT.md) for a step-by-step guide — no deep knowledge of the codebase required.
