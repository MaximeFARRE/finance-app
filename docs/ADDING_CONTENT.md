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

## Option B — TypeScript file (code-first, recommended for agents)

Content is organized in **one file per lesson** under `src/content/{track-id}/`.
Do not put multiple lessons in a single file.

### Adding cards to an existing lesson

Open the relevant file (e.g. `src/content/market-finance/l1-action.ts`) and append a card to `cards[]`.

There are **two card formats** in use depending on the lesson. Match the format of the existing cards in the file.

#### New format (migrated market-finance lessons)

Used by: `l1-action`, `l1-obligation`, `l1-rendement`, `l1-risque`, `l1-marche-primaire`, `l1-marche-secondaire`, `l1-market-cap`.

The test suite **rejects** `type` values `intuition`, `trap`, `interview-question`, `model-answer` in these lessons.

```typescript
{
  id: "mf-found-l1-action-def-3a7f",    // permanent — never rename after creation
  type: "definition",                    // definition | formula | example
  questionType: "definition",            // definition | comparison | mechanism | formula | quick-calculation | true-false
  question: "Qu'est-ce qu'une action ?",
  shortAnswer: "Un titre de propriété représentant une fraction du capital.",
  explanation: "Être actionnaire = être copropriétaire, avec dividendes et droit de vote.",
  front: "Qu'est-ce qu'une action ?",    // same as question
  back: "Un titre de propriété représentant une fraction du capital.",  // same as shortAnswer
  difficulty: 1,
  learningStage: 1,
  topics: ["action", "equity"],          // max 4, kebab-case
  skills: ["definition"],
  tags: ["action", "equity"],            // max 4, kebab-case
}
```

For **true/false** cards add `correctBool` and set `questionType: "true-false"`. The `question` must be an affirmation (not a question):

```typescript
{
  id: "mf-found-l1-action-tf-a1b2",
  type: "definition",
  questionType: "true-false",
  question: "Une action sans dividende est forcément un mauvais investissement.",
  shortAnswer: "Faux. Une entreprise peut créer de la valeur en réinvestissant ses bénéfices.",
  correctBool: false,
  front: "Une action sans dividende est forcément un mauvais investissement.",
  back: "Faux.",
  difficulty: 1,
  learningStage: 1,
  topics: ["action", "dividende"],
  skills: ["definition"],
  tags: ["action", "dividende"],
}
```

For **MCQ** cards add `choices` (4 options) and `correctIndex`:

```typescript
{
  id: "mf-found-l1-action-mcq-c3d4",
  type: "definition",
  questionType: "definition",
  question: "Qu'est-ce que détenir une action confère à l'investisseur ?",
  shortAnswer: "Une fraction de la propriété de l'entreprise.",
  front: "Qu'est-ce que détenir une action confère à l'investisseur ?",
  back: "Une fraction de la propriété de l'entreprise.",
  difficulty: 1,
  learningStage: 1,
  topics: ["action"],
  skills: ["definition"],
  tags: ["action"],
  choices: [
    "Une fraction de la propriété de l'entreprise",
    "Un droit de créance prioritaire sur les actifs",
    "Un coupon fixe versé chaque année",
    "Une garantie de remboursement du capital",
  ],
  correctIndex: 0,
}
```

For **numeric input** cards add `answerMode`, `expectedAnswer`, `answerUnit`, `tolerance`:

```typescript
{
  id: "mf-found-l1-action-num-e5f6",
  type: "formula",
  questionType: "quick-calculation",
  question: "Vous achetez 50 actions à 20 € et les revendez à 25 €. Quelle est votre plus-value ?",
  shortAnswer: "250 €",
  formula: "Plus-value = (Prix de vente − Prix d'achat) × Nombre d'actions",
  example: "(25 − 20) × 50 = 250 €",
  answerMode: "numeric",
  expectedAnswer: 250,
  answerUnit: "€",
  tolerance: 0.01,
  front: "Vous achetez 50 actions à 20 € et les revendez à 25 €. Quelle est votre plus-value ?",
  back: "250 €",
  difficulty: 1,
  learningStage: 1,
  topics: ["action", "calcul"],
  skills: ["quick-calculation"],
  tags: ["action", "calcul"],
}
```

#### Legacy format (non-migrated lessons)

Used by: `l1-dividende`, `l1-volume`, `l1-liquidite`, `l1-buyside-sellside`, `l1-acteurs`, `boss-world-1`, and all corporate-finance lessons.

```typescript
{
  id: "mf-found-l1-dividende-def",    // permanent
  type: "definition",                  // definition | intuition | example | formula | trap | interview-question | model-answer
  front: "Question ou terme",
  back: "Réponse concise (1-2 phrases).",
  difficulty: 1,
  tags: ["dividende", "action"],       // max 4, kebab-case
  detail: `**Titre de section :**
- Point clé 1
- Point clé 2

**Autre section :**
Texte avec **mots clés** en gras. Tableaux markdown acceptés.`,
}
```

`interview-question` must always be paired with a `model-answer` sharing ≥1 tag.

### Creating a new lesson

**Step 1 — Create the lesson file**

```
src/content/market-finance/l2-nouveau-concept.ts
```

```typescript
import type { Lesson } from "@/lib/types";

export const lessonNouveauConcept: Lesson = {
  id: "mf-found-l2-nouveau-concept",
  slug: "nouveau-concept",
  title: "Nouveau concept",
  description: "Ce que cette leçon enseigne.",
  estimatedMinutes: 8,    // ~1 min par carte
  cards: [
    // cards here
  ],
};
```

**Step 2 — Register in the track index**

In `src/content/market-finance/index.ts`, import and add to `lessons[]`. If the lesson belongs to a world, also add its `id` to `world.lessonIds`.

```typescript
import { lessonNouveauConcept } from "./l2-nouveau-concept";

// inside marketFinanceTrack:
lessons: [
  lessonAction,
  lessonNouveauConcept,   // ← add here
  // ...
],
```

**Step 3 — Bump the content version**

In `src/content/index.ts`, increment the version suffix so the IndexedDB re-seeds for existing users:

```typescript
export const BUILTIN_CONTENT_VERSION = "2026-05-28-per-lesson-split-2";
```

**Step 4 — Verify**

```bash
npx tsc --noEmit      # TypeScript must be clean
npx vitest run        # all tests must pass (currently 306)
npx eslint src/content/
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
