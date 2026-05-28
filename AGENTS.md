<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Agent rules — Content

## Where content lives

```
src/content/
├── index.ts                         ← registers all tracks, bump version here
├── market-finance/
│   ├── index.ts                     ← assembles Track from lesson imports
│   ├── l1-action.ts                 ← one Lesson export per file
│   ├── l1-obligation.ts
│   └── ...
├── corporate-finance/
│   ├── index.ts
│   ├── l1-structure-du-capital.ts
│   └── ...
└── shared/
    └── financial-culture/
        └── index.ts                 ← cross-track cards (empty placeholder)
```

**One file per lesson. Never edit `index.ts` to add cards — add cards to the lesson file.**

---

## Adding cards to an existing lesson

Open the lesson file (e.g. `src/content/market-finance/l1-action.ts`) and append a card object to the `cards` array.

### New-format card (required for market-finance migrated lessons)

The 7 migrated lessons (`l1-action`, `l1-obligation`, `l1-rendement`, `l1-risque`, `l1-marche-primaire`, `l1-marche-secondaire`, `l1-market-cap`) **must use this format exclusively**. The test suite rejects legacy types in these lessons.

```typescript
{
  id: "mf-found-l1-action-{typeAbbrev}-{4hex}",   // e.g. "mf-found-l1-action-def-3a7f"
  type: "definition",           // see approved types below
  questionType: "definition",   // see approved questionTypes below
  question: "Question affichée recto ?",
  shortAnswer: "Réponse concise en 1-2 phrases.",
  explanation: "Explication supplémentaire optionnelle.",
  formula: "Formule si pertinente",               // optional
  example: "Exemple chiffré si pertinent",        // optional
  front: "Question affichée recto ?",             // duplicate of question
  back: "Réponse concise en 1-2 phrases.",        // duplicate of shortAnswer
  difficulty: 1,                // 1 | 2 | 3
  learningStage: 1,             // always 1 for new cards
  topics: ["action", "equity"], // max 4, kebab-case
  skills: ["definition"],       // one or more approved skills
  tags: ["action", "equity"],   // max 4, kebab-case
}
```

**Approved `type` values (new-format lessons):**
`definition`, `formula`, `example`

**Approved `questionType` values:**
`definition`, `comparison`, `mechanism`, `formula`, `quick-calculation`, `market-culture`, `true-false`

**Approved `skills` values:**
`definition`, `comparison`, `mechanism`, `formula`, `quick-calculation`, `market-culture`

**Forbidden `type` values in migrated lessons:**
`intuition`, `trap`, `interview-question`, `model-answer` — the test suite will fail if these appear.

### True/false variant

```typescript
{
  id: "mf-found-l1-action-tf-{4hex}",
  type: "definition",
  questionType: "true-false",
  question: "Une action sans dividende est forcément un mauvais investissement.",  // affirmation
  shortAnswer: "Faux. Une entreprise peut créer de la valeur en réinvestissant ses bénéfices.",
  explanation: "Les entreprises de croissance (Amazon, Nvidia) ont longtemps versé zéro dividende.",
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

### MCQ variant

```typescript
{
  id: "mf-found-l1-action-mcq-{4hex}",
  type: "definition",
  questionType: "definition",
  question: "Qu'est-ce que détenir une action confère à l'investisseur ?",
  shortAnswer: "Une fraction de la propriété de l'entreprise.",
  explanation: "Être actionnaire = être copropriétaire, avec droit au dividende et droit de vote.",
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

### Numeric input variant

```typescript
{
  id: "mf-found-l1-action-num-{4hex}",
  type: "formula",
  questionType: "quick-calculation",
  question: "Vous achetez 50 actions à 20 € et les revendez à 25 €. Quelle est votre plus-value totale ?",
  shortAnswer: "250 €",
  formula: "Plus-value = (Prix de vente − Prix d'achat) × Nombre d'actions",
  example: "(25 − 20) × 50 = 5 × 50 = 250 €",
  answerMode: "numeric",
  expectedAnswer: 250,
  answerUnit: "€",
  tolerance: 0.01,
  front: "Vous achetez 50 actions à 20 € et les revendez à 25 €. Quelle est votre plus-value totale ?",
  back: "250 €",
  difficulty: 1,
  learningStage: 1,
  topics: ["action", "plus-value", "calcul"],
  skills: ["quick-calculation"],
  tags: ["action", "calcul"],
}
```

---

## Adding cards to legacy-format lessons

Lessons that have **not** been migrated (`l1-dividende`, `l1-volume`, `l1-liquidite`, `l1-buyside-sellside`, `l1-acteurs`, `boss-world-1`, and all corporate-finance lessons) use the legacy format. Add cards in the same format as the existing ones in the file.

```typescript
{
  id: "mf-found-l1-dividende-{typeAbbrev}",
  type: "definition",           // definition | intuition | example | formula | trap | interview-question | model-answer
  front: "Question affichée recto ?",
  back: "Réponse courte (2-4 lignes).",
  difficulty: 1,
  tags: ["dividende", "action"],
  detail: `**Titre de section :**
- Point 1
- Point 2

**Titre 2 :**
Texte explicatif avec **mots clés** en gras.`,
}
```

---

## Creating a new lesson

### 1. Create the lesson file

```
src/content/market-finance/l2-mon-concept.ts
```

```typescript
import type { Lesson } from "@/lib/types";

export const lessonMonConcept: Lesson = {
  id: "mf-found-l2-mon-concept",
  slug: "mon-concept",
  title: "Mon concept",
  description: "Ce que cette leçon apprend.",
  estimatedMinutes: 8,          // ~1 min par carte
  cards: [
    // ... cartes ici
  ],
};
```

### 2. Register in the track index

In `src/content/market-finance/index.ts`:

```typescript
import { lessonMonConcept } from "./l2-mon-concept";

// Add to the lessons array
lessons: [
  lessonAction,
  lessonMonConcept,   // ← add here
  // ...
],
```

If the lesson belongs to a world, also add its `id` to the world's `lessonIds` array.

### 3. Bump the content version

In `src/content/index.ts`, increment `BUILTIN_CONTENT_VERSION` so existing users get the new content on next load:

```typescript
export const BUILTIN_CONTENT_VERSION = "2026-05-28-per-lesson-split-2";  // increment suffix
```

---

## ID conventions

| Context | Pattern | Example |
|---------|---------|---------|
| Lesson | `{trackId}-{worldPrefix}-{slug}` | `mf-found-l1-action` |
| Card (new format) | `{lessonId}-{typeAbbrev}-{4hex}` | `mf-found-l1-action-def-3a7f` |
| Card (legacy) | `{lessonId}-{typeAbbrev}` | `mf-found-l1-dividende-def` |

**IDs are permanent.** Changing a card ID loses all SM-2 spaced-repetition progress for every user who has studied that card.

Type abbreviations: `def`, `form`, `ex`, `int`, `trap`, `iq`, `ma`, `tf`, `mcq`, `num`

---

## Validation

After editing content, always run:

```bash
npx tsc --noEmit          # TypeScript type errors
npx vitest run            # 306 tests must pass
npx eslint src/content/   # no lint errors
```

The test in `src/content/market-finance.test.ts` enforces the new-format rules on migrated lessons. If it fails, check `type` and `questionType` values.

---

## Rules summary

| Rule | Detail |
|------|--------|
| One file per lesson | Never combine multiple lessons in one file |
| IDs permanent | Never rename a card ID after it's published |
| `front`/`back` = `question`/`shortAnswer` | New-format cards require both pairs (duplicated) |
| `learningStage: 1` | Always set to 1 for new cards |
| Max 4 `topics` and 4 `tags` | kebab-case only |
| Forbidden types in migrated lessons | `intuition`, `trap`, `interview-question`, `model-answer` |
| One answer mode per card | Never combine `choices` and `correctBool` on one card |
| T/F question = affirmation | Must be a statement, not a question |
| Version bump on new content | Increment `BUILTIN_CONTENT_VERSION` when adding or removing cards |
