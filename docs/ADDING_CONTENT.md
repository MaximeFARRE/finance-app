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

## Answer Modes

Each card can use one of four answer modes. Only one can be active per card.

| Mode | How to activate | Best for |
|------|----------------|---------|
| **Classic** (flip) | *(no extra field)* | Definitions, mechanisms, IQ/MA |
| **QCM** | `choices: [...]` + `correctIndex: N` | Definitions, comparisons, calculations |
| **Numeric input** | `answerMode: numeric` + `expectedAnswer: N` | Precise calculated results |
| **True / False** | `questionType: true-false` + `correctBool: true\|false` | Statements to validate, traps |

See [CONTENT_STYLE_GUIDE.md §9](CONTENT_STYLE_GUIDE.md) for full rules and edge cases.

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
      # --- Carte classique (retournement) ---
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

      # --- QCM (choices + correctIndex) ---
      - id: ""
        type: definition
        questionType: definition
        question: "Qu'est-ce que le WACC ?"
        shortAnswer: "Le taux de rendement minimum exigé par tous les apporteurs de fonds."
        difficulty: 1
        tags: [wacc, capital]
        choices:
          - "Le rendement exigé uniquement par les actionnaires"
          - "Le taux de rendement minimum exigé par tous les apporteurs de fonds"
          - "Le coût de la dette après impôt de l'entreprise"
          - "Le taux d'actualisation utilisé exclusivement pour les obligations"
        correctIndex: 1

      # --- Saisie numérique (answerMode: numeric) ---
      - id: ""
        type: formula
        questionType: quick-calculation
        question: "Une entreprise a 200 M d'actions à 50 €. Quelle est sa capitalisation boursière ?"
        shortAnswer: "10 Mds €"
        formula: "Market cap = Cours × Nombre d'actions"
        example: "50 × 200 000 000 = 10 000 000 000 €"
        answerMode: numeric
        expectedAnswer: 10
        answerUnit: "Mds €"
        tolerance: 0.02        # ±2 % accepté
        difficulty: 1
        tags: [capitalisation, calcul]

      # --- Vrai / Faux (questionType: true-false + correctBool) ---
      - id: ""
        type: trap
        questionType: true-false
        question: "Quand les taux d'intérêt montent, le prix d'une obligation existante monte aussi."
        shortAnswer: "Faux. Prix et taux évoluent en sens inverse."
        explanation: |
          Les flux fixes de l'obligation sont actualisés à un taux plus élevé,
          ce qui réduit leur valeur actuelle. Le prix baisse donc quand les taux montent.
        correctBool: false
        difficulty: 2
        tags: [obligation, taux, prix]
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

### Answer mode rules (quick reference)

| Rule | Detail |
|------|--------|
| **One mode per card** | Never combine `choices` and `correctBool` on the same card |
| **QCM: always 4 options** | Prefer 4 choices; minimum 3. Two distractors must be plausible |
| **Numeric: numbers only** | `expectedAnswer` must be a number. Do not use for open-ended answers |
| **Numeric: always set `answerUnit`** | Without it, the user doesn't know what unit to enter |
| **True/False: use an affirmation** | The question must be a statement, not a question |
| **True/False: balance Vrai/Faux** | Don't make all T/F cards in a lesson have the same answer |

Full rules and edge cases: [CONTENT_STYLE_GUIDE.md §9](CONTENT_STYLE_GUIDE.md)
