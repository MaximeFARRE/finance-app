# [1.3.0](https://github.com/MaximeFARRE/finance-app/compare/v1.2.0...v1.3.0) (2026-05-24)


### Features

* **admin:** full content management UI at `/admin` — track/lesson/card browser, CRUD editor with live preview and version history
* **admin:** import page with YAML/JSON/CSV file upload, diff preview (added/modified/unchanged), and one-click apply
* **admin:** export page with scope selector (all/track/lesson), format selector (YAML/JSON/CSV), and filename preview
* **admin:** suggestions management page with accept/reject workflow and optional admin note
* **content:** ContentProvider abstraction (`LocalContentProvider` backed by IndexedDB) for Supabase-ready migration
* **content:** import/export engine — `analyzeImport`, `applyImport`, `exportContent` with Zod validation, diff computation, and deterministic ID generation
* **content:** YAML import supports full (track-scoped) and quick (lesson-scoped) formats; auto-detects format
* **content:** CSV import/export with BOM, pipe-separated tags, auto-separator detection (`;` vs `,`)
* **difficulty-gate:** d2/d3 cards unlock progressively at 70% mastery of lower-difficulty cards
* **quiz-utils:** `buildQuizDeck` now filters by unlocked difficulty and sorts due cards first (most overdue first)
* **review-utils:** `buildReviewDeck` and `countDueCards` for cross-lesson review sessions
* **session:** review mode (`?mode=review`) — cross-lesson daily review queue (due cards first, up to 5 new cards to fill limit of 15)
* **home:** daily review badge showing due card count, links to review session
* **suggestions:** `SuggestionButton` and `SuggestionModal` integrated into `LearnCard` and `LearningCard`
* **content:** Corporate Finance track added — 5 lessons, 42+ cards (structure du capital, DCF, comparables, M&A, LBO)
* **content:** Market Finance track enriched — `detail` field on all cards, missing trap/IQ/MA cards added to 7 lessons
* **docs:** `AI_CONTENT_TEMPLATE.md` — YAML schema, 7 card type examples, generation prompts for Claude/GPT-4
* **docs:** `CONTENT_STYLE_GUIDE.md` — ID conventions, card rules, IQ/MA pairing, difficulty guidelines


# [1.2.0](https://github.com/MaximeFARRE/finance-app/compare/v1.1.0...v1.2.0) (2026-05-16)


### Bug Fixes

* **LearningCard:** prevent flex shrink clipping text in concept overlay ([f30f576](https://github.com/MaximeFARRE/finance-app/commit/f30f576c8df269198b6521b82d2fb19d1e2bf01b))
* **session:** center concept overlay and fix card scroll truncation ([dbdbea9](https://github.com/MaximeFARRE/finance-app/commit/dbdbea97d2cf9824be22ae9c9667449e97b3ccde))


### Features

* add Claude launch configuration for finance-app development server ([4721ca7](https://github.com/MaximeFARRE/finance-app/commit/4721ca77e7e150da8feb840f77994ca9c56de571))
* **LearnCard:** show back as summary, detail revealed on demand ([e6ded74](https://github.com/MaximeFARRE/finance-app/commit/e6ded7497635e2ee07f8d4baa6f55433004f1e80))
* **session:** paginate learn mode with prev/next navigation ([0414dad](https://github.com/MaximeFARRE/finance-app/commit/0414dada04c641930d3360733c9ba721bc56709f))
* **types:** add optional detail field to Card for deep learn content ([b4f5193](https://github.com/MaximeFARRE/finance-app/commit/b4f51931a539c3a45cc9328a5804beb5e8d5c12a))

# [1.1.0](https://github.com/MaximeFARRE/finance-app/compare/v1.0.0...v1.1.0) (2026-05-16)


### Bug Fixes

* **lint:** add eslint-disable for setState in effects ([49a9521](https://github.com/MaximeFARRE/finance-app/commit/49a952125c12ecf4b25c1033569742efe2679df3))


### Features

* add learn mode and enhanced quiz mode ([a04331c](https://github.com/MaximeFARRE/finance-app/commit/a04331c379974545e43a00b4b4c5b093a03121e3))
* **data:** add learn/quiz mode data model and pure logic utils ([e3c47b7](https://github.com/MaximeFARRE/finance-app/commit/e3c47b72042f1adb9ce617cc1cdcfc722bc74890))

# 1.0.0 (2026-05-16)


### Features

* implement spaced-repetition finance learning app ([b810212](https://github.com/MaximeFARRE/finance-app/commit/b810212a5280741782f3fe42f67bc446aaaf007d))
