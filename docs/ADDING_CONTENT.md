# Adding Content

This guide explains how to add new tracks or lessons to the app. No deep knowledge of the codebase is required — content is plain TypeScript objects.

## Concepts

| Term | Description |
|------|-------------|
| **Track** | A course (e.g. "Finance de marché"). Contains a list of lessons. |
| **Lesson** | A themed unit inside a track (e.g. "L'action"). Contains a list of cards. |
| **Card** | A single flashcard with a front (question) and a back (answer). |

## Card Types

| Type | Icon | Purpose |
|------|------|---------|
| `definition` | 📖 | Formal, precise definition |
| `intuition` | 💡 | Mental model or framework to understand the concept |
| `example` | 🔍 | Real-world concrete scenario |
| `formula` | 🔢 | Equation or calculation |
| `trap` | ⚠️ | Common mistake to avoid |
| `interview-question` | 🎯 | Practice question (back can be empty — paired with a model-answer card) |
| `model-answer` | ✅ | Sample answer for the preceding interview question |

## Step 1 — Create a track file

Create a new file in `src/content/`, e.g. `src/content/corporate-finance.ts`:

```typescript
import type { Track } from "@/lib/types";

export const corporateFinanceTrack: Track = {
  id: "corporate-finance",          // unique, kebab-case
  title: "Corporate Finance",
  description: "Valuation, M&A, and capital structure fundamentals.",
  emoji: "🏢",
  color: "green",                   // used for UI theming (tailwind color name)
  lessons: [
    {
      id: "cf-l1-dcf",             // unique, kebab-case, prefixed by track
      slug: "dcf",
      title: "Discounted Cash Flow",
      description: "Understanding and building a DCF valuation model.",
      estimatedMinutes: 8,
      cards: [
        {
          id: "cf-l1-dcf-def",     // unique, kebab-case, prefixed by lesson
          type: "definition",
          front: "What is a DCF?",
          back: "A DCF (Discounted Cash Flow) values a business by discounting its future free cash flows back to the present using a required rate of return (WACC).",
          difficulty: 1,           // 1 = easy, 2 = medium, 3 = hard
          tags: ["dcf", "valuation"],
        },
        {
          id: "cf-l1-dcf-formula",
          type: "formula",
          front: "DCF formula",
          back: "Enterprise Value = Σ FCFt / (1 + WACC)^t + Terminal Value / (1 + WACC)^n",
          difficulty: 2,
          tags: ["dcf", "wacc"],
        },
        {
          id: "cf-l1-dcf-trap",
          type: "trap",
          front: "Common DCF mistake",
          back: "Using the equity cost of capital (Ke) instead of WACC to discount free cash flows to the firm. WACC accounts for the full capital structure; Ke only applies when discounting equity cash flows.",
          difficulty: 2,
          tags: ["dcf", "wacc"],
        },
        {
          id: "cf-l1-dcf-iq",
          type: "interview-question",
          front: "Walk me through a DCF.",
          back: "",
          difficulty: 2,
          tags: ["dcf", "interview"],
        },
        {
          id: "cf-l1-dcf-ma",
          type: "model-answer",
          front: "Answer: Walk me through a DCF",
          back: "A DCF has three parts: (1) Project free cash flows for 5–10 years. (2) Calculate a terminal value using either a Gordon Growth Model or an exit multiple. (3) Discount everything back to present using WACC. Sum = Enterprise Value.",
          difficulty: 2,
          tags: ["dcf", "interview"],
        },
      ],
    },
    // add more lessons here...
  ],
};
```

### ID Conventions

- Track ID: `corporate-finance`
- Lesson ID: `cf-l1-dcf` (track prefix + lesson number + slug)
- Card ID: `cf-l1-dcf-def` (lesson ID + card type abbreviation)

All IDs must be **globally unique** — they are used as LocalStorage keys to track card progress.

## Step 2 — Register the track

Open `src/content/index.ts` and add your track:

```typescript
import { marketFinanceTrack } from "./market-finance";
import { corporateFinanceTrack } from "./corporate-finance"; // add this

export const allTracks = [
  marketFinanceTrack,
  corporateFinanceTrack,               // add this
];

// getTrackById and getLessonById are already implemented — no changes needed
```

That's it. The track will appear on the `/tracks` page automatically.

## Step 3 — Verify

```bash
npm run typecheck   # catches type errors in your new file
npm run dev         # open the app and navigate to your new track
```

## Tips

- A lesson works well with **4–8 cards**. More than 10 cards makes a session feel long.
- Always pair an `interview-question` card with a `model-answer` card directly after it.
- Use `difficulty: 1` for vocabulary, `difficulty: 2` for reasoning, `difficulty: 3` for complex multi-step problems.
- `tags` are not currently displayed in the UI but are useful for future filtering — keep them short and consistent.
- Content is in French by convention (matching existing tracks), but the types support any language.
