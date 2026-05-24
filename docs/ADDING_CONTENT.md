# Adding Content

Three workflows depending on what you want to add:

| Goal | Recommended workflow |
|------|---------------------|
| 1–5 cards | Admin card editor at `/admin` |
| Full lesson or track | Author in YAML → import via `/admin/import` |
| AI-assisted generation | Use prompts in [AI_CONTENT_TEMPLATE.md](AI_CONTENT_TEMPLATE.md) |
| TypeScript directly | Follow this guide |

Style rules, ID conventions, and IQ/MA pairing rules are in [CONTENT_STYLE_GUIDE.md](CONTENT_STYLE_GUIDE.md).

---

## Concepts

| Term | Description |
|------|-------------|
| **Track** | A course (e.g. "Corporate Finance"). Contains a list of lessons. |
| **Lesson** | A themed unit inside a track (e.g. "Valorisation DCF"). Contains a list of cards. |
| **Card** | A single flashcard: `front` (question), `back` (short answer), optional `detail` (deep explanation). |

## Card Types

| Type | Icon | Purpose |
|------|------|---------|
| `definition` | 📖 | Formal definition of a term |
| `intuition` | 💡 | Analogy or mental model |
| `example` | 🔍 | Real-world scenario with figures |
| `formula` | 🔢 | Equation with variable definitions |
| `trap` | ⚠️ | Common mistake to avoid in interviews |
| `interview-question` | 🎯 | Open-ended interview question (pair with a `model-answer`) |
| `model-answer` | ✅ | Sample answer — must share ≥1 tag with its `interview-question` for auto-pairing |

---

## Option A — Import via YAML (recommended for large additions)

Create a YAML file following this schema:

```yaml
track: "corporate-finance"
title: "Corporate Finance"
emoji: "🏦"
color: "purple"
description: "Structure du capital, valorisation, M&A."

lessons:
  - id: "cf-l1-structure-du-capital"
    slug: "structure-du-capital"
    title: "Structure du capital"
    description: "Debt vs Equity, WACC, Modigliani-Miller."
    estimatedMinutes: 10

    cards:
      - id: ""                     # leave empty — generated on import
        type: definition
        difficulty: 1
        tags: [wacc, dette, equity]
        front: "Qu'est-ce que le WACC ?"
        back: "Coût moyen pondéré du capital : taux de rendement minimum exigé par tous les apporteurs de fonds."
        detail: |
          Formule : WACC = (E/V) × Re + (D/V) × Rd × (1 − T)
          où Re = coût de l'equity (CAPM), Rd = coût de la dette, T = taux d'imposition.
          Utilisé comme taux d'actualisation dans le DCF.
```

Then go to `/admin/import`, drop the file, review the diff, and click **Importer**.

Supported formats: `.yaml` / `.yml`, `.json`, `.csv`.

See [AI_CONTENT_TEMPLATE.md](AI_CONTENT_TEMPLATE.md) for ready-to-use prompts that generate valid YAML.

---

## Option B — TypeScript file (code-first)

### Step 1 — Create a track file

Create `src/content/my-track.ts`:

```typescript
import type { Track } from "@/lib/types";

export const myTrack: Track = {
  id: "my-track",               // unique, kebab-case
  title: "My Track",
  description: "Short description.",
  emoji: "📊",
  color: "green",               // blue | green | purple | orange | red | yellow
  lessons: [
    {
      id: "my-track-lesson-slug",    // "{trackId}-{slug}"
      slug: "lesson-slug",
      title: "Lesson Title",
      description: "Short description.",
      estimatedMinutes: 8,           // ~1 min per card

      cards: [
        {
          id: "my-track-lesson-slug-def",   // manually set, never change after creation
          type: "definition",
          difficulty: 1,
          tags: ["concept", "basics"],
          front: "Question or term",
          back: "Concise answer (1-2 sentences).",
          detail: `Optional deep explanation.
Use **bold** for key terms, lists, tables.`,
        },
        {
          id: "my-track-lesson-slug-trap",
          type: "trap",
          difficulty: 2,
          tags: ["concept", "interview"],
          front: "⚠️ Piège : common misconception?",
          back: "The misconception in one sentence. The correction in one sentence.",
          detail: "Why this mistake is frequent and how to avoid it in interviews.",
        },
        {
          id: "my-track-lesson-slug-iq",
          type: "interview-question",
          difficulty: 3,
          tags: ["concept", "entretien"],
          front: "Interview question phrased exactly as asked?",
          back: "The 3 key points of a strong answer.",
          detail: "Structured 2-min response with key talking points.",
        },
        {
          id: "my-track-lesson-slug-ma",
          type: "model-answer",
          difficulty: 3,
          tags: ["concept", "entretien"],  // ≥1 tag must match the interview-question above
          front: "Réponse modèle : [topic]",
          back: "\"Full answer as spoken aloud in an interview.\"",
          detail: "Bonus points and variants to mention.",
        },
      ],
    },
  ],
};
```

### Step 2 — Register the track

Edit `src/content/index.ts`:

```typescript
import { marketFinanceTrack } from "./market-finance";
import { corporateFinanceTrack } from "./corporate-finance";
import { myTrack } from "./my-track";                    // add this

export const allTracks: Track[] = [
  marketFinanceTrack,
  corporateFinanceTrack,
  myTrack,                                               // add this
];
```

The track appears on `/tracks` automatically.

### Step 3 — Verify

```bash
npm run typecheck   # catch type errors in your new file
npm test            # ensure no regressions
npm run dev         # open the app and navigate to your new track
```

---

## Card Rules (quick reference)

| Rule | Detail |
|------|--------|
| **IDs are permanent** | Changing a card ID loses all SM-2 progress for that card |
| **`detail` is required** | Every card should have a `detail` with analogies, figures, or interview tips |
| **Each lesson needs ≥1 `trap`** | Highlight at least one common interview mistake |
| **IQ always paired with MA** | The MA must share ≥1 tag with the IQ for auto-pairing |
| **Max 4 tags per card** | Tags in kebab-case (`marché-primaire`, not `marché primaire`) |
| **Difficulty 1 first** | Order cards d1 → d2 → d3 within a lesson |
| **3+ cards at d1** | Required for difficulty gating to work (≥70% mastery threshold) |

Full rules: [CONTENT_STYLE_GUIDE.md](CONTENT_STYLE_GUIDE.md)
