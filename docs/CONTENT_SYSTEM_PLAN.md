# Plan d'implémentation — Système de gestion de contenu

> **Objectif** : permettre l'ajout, la modification, l'import/export et la suggestion
> de cartes directement dans l'app, sans dépendance externe pour l'instant.
>
> **Principe architectural** : tout est local (IndexedDB) aujourd'hui, mais chaque
> couche passe par une interface abstraite (`ContentProvider`) qui sera remplacée
> par une implémentation Supabase lors du déploiement multi-utilisateurs.

---

## Table des matières

1. [Décisions d'architecture](#1-décisions-darchitecture)
2. [Modèle de données](#2-modèle-de-données)
3. [Spécifications des formats de fichiers](#3-spécifications-des-formats-de-fichiers)
4. [Phase 0 — Fondations](#4-phase-0--fondations)
5. [Phase 1 — Import / Export engine](#5-phase-1--import--export-engine)
6. [Phase 2 — Interface admin](#6-phase-2--interface-admin)
7. [Phase 3 — Suggestions utilisateurs](#7-phase-3--suggestions-utilisateurs)
8. [Phase 4 — Algorithme de session intelligent](#8-phase-4--algorithme-de-session-intelligent)
9. [Phase 5 — Template IA et contenu](#9-phase-5--template-ia-et-contenu)
10. [Migration future vers Supabase](#10-migration-future-vers-supabase)

---

## 1. Décisions d'architecture

| # | Sujet | Choix | Rationale |
|---|-------|-------|-----------|
| D1 | **Stockage contenu** | IndexedDB via une interface `ContentProvider` | Plus de place que localStorage (~50 MB+), requêtes structurées, async natif. L'interface abstraite permettra de brancher Supabase plus tard sans toucher au reste du code. |
| D2 | **Stockage user progress** | localStorage (inchangé) | Fonctionne déjà. Reste indépendant du content store. |
| D3 | **Source de vérité** | IndexedDB (seeded depuis le TS built-in au premier lancement) | Au premier chargement, si l'IndexedDB est vide, on l'initialise avec le contenu de `src/content/*.ts`. Ensuite toutes les modifications passent par l'IndexedDB. Le TS built-in reste en fallback read-only. |
| D4 | **Formats import/export** | YAML (principal), JSON, CSV | 3 formats. YAML pour les humains et les IA. JSON pour le programmatique. CSV pour les tableurs. |
| D5 | **CSV séparateur** | Auto-détection à l'import, choix à l'export (défaut `;`) | On compte les `;` vs `,` sur la première ligne de données pour détecter. À l'export, un toggle avec `;` par défaut (locale FR). |
| D6 | **CSV encodage** | UTF-8 avec BOM | Pour qu'Excel FR ouvre correctement sans import manuel. |
| D7 | **CSV multi-ligne** | RFC 4180 (champs entre guillemets doubles) | Standard supporté par PapaParse et tous les tableurs. |
| D8 | **Tags en CSV** | Séparés par `\|` (pipe) | Évite toute confusion avec `,` ou `;`. |
| D9 | **Conflits import** | Écraser automatiquement + garder l'historique des versions précédentes | Chaque modification (import ou édition manuelle) crée une entrée dans le store `card_versions`. Restauration possible. Max 20 versions par carte. |
| D10 | **IDs manquants à l'import** | Auto-générés | Pattern : `{trackPrefix}-{lessonSlug}-{type}-{hash4}`. Le hash court (4 chars hex) garantit l'unicité. |
| D11 | **Admin** | Route `/admin`, pas d'auth (local) | En local, pas besoin de login. La route est accessible directement. Un guard `isAdmin()` renverra toujours `true` en mode local et vérifiera le JWT Supabase en mode déployé. |
| D12 | **Suggestions** | Corrections + nouvelles cartes, stockées dans IndexedDB | Même store local. Plus tard migrées vers une table Supabase. |
| D13 | **Validation** | Zod schemas | Validation stricte et typesafe à l'import et dans les formulaires admin. |
| D14 | **Dépendances** | `yaml`, `papaparse`, `zod`, `idb` | `idb` est un wrapper typed de 1KB autour de l'API IndexedDB native. Évite le boilerplate. |

---

## 2. Modèle de données

### 2a. Nouveaux types TypeScript

Fichier : `src/lib/types.ts` (à étendre)

```typescript
// === Content management ===

/** Source d'une carte */
export type CardSource = "builtin" | "custom";

/** Entrée d'historique pour le versioning */
export interface CardVersion {
  id: string;              // auto-generated UUID
  cardId: string;
  version: number;
  snapshot: Card;          // copie complète avant modification
  changedAt: string;       // ISO date
  changedBy: string;       // "admin" | "import:<filename>"
  source: "manual" | "import";
}

// === Suggestions ===

export type SuggestionCategory =
  | "error"
  | "missing-detail"
  | "wording"
  | "new-card"
  | "other";

export type SuggestionStatus = "pending" | "accepted" | "rejected";

export interface Suggestion {
  id: string;
  cardId: string | null;         // null si suggestion de nouvelle carte
  trackId: string;
  lessonId: string;
  category: SuggestionCategory;
  message: string;
  proposedCard?: Partial<Card>;  // rempli si category === "new-card"
  status: SuggestionStatus;
  createdAt: string;
  reviewedAt: string | null;
  adminNote?: string;
}

// === Import/Export ===

export interface ImportResult {
  added: Card[];
  modified: { before: Card; after: Card; lessonId: string }[];
  unchanged: Card[];
  errors: { line?: number; field?: string; message: string }[];
}

export type ExportFormat = "yaml" | "json" | "csv";
export type ExportScope = "all" | "track" | "lesson";

export interface ExportOptions {
  format: ExportFormat;
  scope: ExportScope;
  trackId?: string;
  lessonId?: string;
  csvSeparator?: ";" | ",";
}
```

### 2b. Interface ContentProvider

Fichier : `src/lib/content-provider.ts`

C'est l'abstraction clé. Tout le code applicatif utilise cette interface.
L'implémentation locale (IndexedDB) sera créée en phase 0.
L'implémentation Supabase viendra plus tard.

```typescript
export interface ContentProvider {
  // --- Lecture ---
  getAllTracks(): Promise<Track[]>;
  getTrackById(id: string): Promise<Track | undefined>;
  getLessonById(trackId: string, lessonId: string): Promise<Lesson | undefined>;
  getCardsByLesson(lessonId: string): Promise<Card[]>;
  getAllCards(): Promise<Card[]>;

  // --- Écriture (admin) ---
  upsertTrack(track: Omit<Track, "lessons">): Promise<void>;
  deleteTrack(trackId: string): Promise<void>;
  upsertLesson(trackId: string, lesson: Omit<Lesson, "cards">): Promise<void>;
  deleteLesson(lessonId: string): Promise<void>;
  upsertCard(lessonId: string, card: Card): Promise<void>;
  deleteCard(cardId: string): Promise<void>;
  reorderLessons(trackId: string, lessonIds: string[]): Promise<void>;
  reorderCards(lessonId: string, cardIds: string[]): Promise<void>;

  // --- Historique ---
  getCardHistory(cardId: string): Promise<CardVersion[]>;
  restoreCardVersion(versionId: string): Promise<void>;

  // --- Suggestions ---
  submitSuggestion(suggestion: Omit<Suggestion, "id" | "status" | "createdAt" | "reviewedAt">): Promise<void>;
  getSuggestions(filters?: { status?: SuggestionStatus; trackId?: string }): Promise<Suggestion[]>;
  updateSuggestionStatus(id: string, status: SuggestionStatus, adminNote?: string): Promise<void>;

  // --- Import bulk ---
  bulkUpsertCards(lessonId: string, cards: Card[], changedBy: string): Promise<void>;

  // --- Seed ---
  isSeeded(): Promise<boolean>;
  seed(tracks: Track[]): Promise<void>;
}
```

### 2c. Structure IndexedDB

Nom de la base : `finance-app-content`

| Object Store | Key | Index | Description |
|-------------|-----|-------|-------------|
| `tracks` | `id` | — | Métadonnées des tracks (sans lessons) |
| `lessons` | `id` | `trackId`, `sortOrder` | Métadonnées des leçons (sans cards) |
| `cards` | `id` | `lessonId`, `sortOrder` | Toutes les cartes |
| `card_versions` | `id` | `cardId` | Historique des modifications |
| `suggestions` | `id` | `status`, `trackId` | Suggestions utilisateurs |
| `meta` | `key` | — | Flags système (`seeded: true`, `lastSyncAt`, etc.) |

---

## 3. Spécifications des formats de fichiers

### 3a. YAML — Format principal

**Export complet d'un track** :

```yaml
# Finance Learning — Export
# Format: track-complet
# Date: 2026-05-24

track:
  id: market-finance
  title: "Finance de marché"
  description: "Les fondamentaux des marchés financiers, de A à Z."
  emoji: "📈"
  color: blue

lessons:
  - id: mf-found-l1-action
    slug: action
    title: "L'action"
    description: "Comprendre ce qu'est une action et ce qu'elle représente"
    estimatedMinutes: 5
    cards:
      - id: mf-found-l1-action-def
        type: definition
        difficulty: 1
        tags: [action, equity]
        front: "Qu'est-ce qu'une action ?"
        back: |
          Titre de propriété représentant une fraction du capital
          d'une entreprise. L'actionnaire est copropriétaire, a droit
          aux dividendes distribués et au vote en assemblée générale.
        detail: |
          En droit français, l'action est un titre financier émis
          par une société de capitaux (SA, SAS)...

      - id: mf-found-l1-action-intuition
        type: intuition
        difficulty: 1
        tags: [action, risque]
        front: "Comment penser à une action ?"
        back: |
          Acheter une action = devenir associé d'une entreprise.
```

**Import rapide (cartes seules, IDs optionnels)** :

```yaml
# Format: import-rapide
target:
  track: market-finance
  lesson: mf-found-l1-action

cards:
  - type: trap
    difficulty: 2
    tags: [action, piège]
    front: "Piège : action à 5€ vs 500€"
    back: |
      Le prix unitaire ne dit rien sur la taille de l'entreprise.
      Ce qui compte c'est la capitalisation boursière.
```

**Règles de parsing** :
- Si le fichier contient une clé `track` au premier niveau → format "track complet"
- Si le fichier contient une clé `target` au premier niveau → format "import rapide"
- Les `id` manquants dans les cartes sont auto-générés
- Les `id` manquants dans les leçons produisent une erreur (leçon doit exister ou avoir un id)

### 3b. JSON — Format programmatique

Structure identique au YAML, sérialisé en JSON standard.

```json
{
  "track": {
    "id": "market-finance",
    "title": "Finance de marché",
    "description": "Les fondamentaux des marchés financiers, de A à Z.",
    "emoji": "📈",
    "color": "blue"
  },
  "lessons": [
    {
      "id": "mf-found-l1-action",
      "slug": "action",
      "title": "L'action",
      "description": "Comprendre ce qu'est une action",
      "estimatedMinutes": 5,
      "cards": [
        {
          "id": "mf-found-l1-action-def",
          "type": "definition",
          "difficulty": 1,
          "tags": ["action", "equity"],
          "front": "Qu'est-ce qu'une action ?",
          "back": "Titre de propriété représentant une fraction..."
        }
      ]
    }
  ]
}
```

Supporte aussi le format "import rapide" avec `target` + `cards`.

### 3c. CSV — Format tableur

**17 colonnes** (une ligne = une carte avec son contexte complet) :

```
track_id ; track_title ; track_emoji ; track_color ; track_description ; lesson_id ; lesson_slug ; lesson_title ; lesson_description ; lesson_minutes ; card_id ; card_type ; card_difficulty ; card_tags ; card_front ; card_back ; card_detail
```

**Règles** :
- Première ligne = en-têtes (obligatoire)
- Séparateur auto-détecté à l'import : on compte les `;` et `,` sur la ligne d'en-tête
- Encodage UTF-8 avec BOM à l'export
- Multi-ligne : RFC 4180 — les champs contenant des retours à la ligne sont entourés de `"` doubles
- Tags : séparés par `|` dans le champ `card_tags` (ex : `action|equity`)
- `card_id` peut être vide → auto-généré
- `card_detail` peut être vide
- Les colonnes track/lesson sont redondantes (répétées pour chaque carte) — c'est voulu pour la compatibilité tableur
- À l'import, les métadonnées track/lesson sont extraites de la première occurrence et utilisées pour créer/mettre à jour les tracks et leçons

**Exemple** :

```csv
track_id;track_title;track_emoji;track_color;track_description;lesson_id;lesson_slug;lesson_title;lesson_description;lesson_minutes;card_id;card_type;card_difficulty;card_tags;card_front;card_back;card_detail
market-finance;Finance de marché;📈;blue;Les fondamentaux;mf-found-l1-action;action;L'action;Comprendre ce qu'est une action;5;mf-found-l1-action-def;definition;1;action|equity;"Qu'est-ce qu'une action ?";"Titre de propriété représentant une fraction du capital d'une entreprise.";
```

---

## 4. Phase 0 — Fondations

> **Objectif** : créer la couche de stockage abstraite et l'implémentation locale
> IndexedDB. À la fin de cette phase, l'app fonctionne exactement comme avant
> mais le contenu est servi depuis IndexedDB (seeded depuis le TS built-in).

### Étape 0.1 — Installer les dépendances

**Fichier** : `package.json`

```bash
npm install yaml papaparse zod idb
npm install -D @types/papaparse
```

| Paquet | Rôle | Taille |
|--------|------|--------|
| `yaml` | Parse/serialize YAML | ~70KB |
| `papaparse` | Parse/serialize CSV (RFC 4180, auto-detect) | ~25KB |
| `zod` | Validation de schémas TypeScript-first | ~50KB |
| `idb` | Wrapper typé sur IndexedDB natif | ~1KB |

**Vérification** : `npm run typecheck` passe.

### Étape 0.2 — Étendre les types

**Fichier** : `src/lib/types.ts`

Ajouter à la fin du fichier existant les types listés dans la section
[2a. Nouveaux types TypeScript](#2a-nouveaux-types-typescript) ci-dessus :
`CardSource`, `CardVersion`, `SuggestionCategory`, `SuggestionStatus`,
`Suggestion`, `ImportResult`, `ExportFormat`, `ExportScope`, `ExportOptions`.

**Vérification** : `npx tsc --noEmit` passe.

### Étape 0.3 — Créer l'interface ContentProvider

**Nouveau fichier** : `src/lib/content-provider.ts`

Créer l'interface exactement comme décrite dans la section
[2b. Interface ContentProvider](#2b-interface-contentprovider).

Exporter aussi un type utilitaire :

```typescript
/** Métadonnées track sans le tableau lessons (stocké à plat dans IndexedDB) */
export type TrackMeta = Omit<Track, "lessons">;

/** Métadonnées lesson sans le tableau cards */
export type LessonMeta = Omit<Lesson, "cards"> & { trackId: string; sortOrder: number };

/** Card avec sa référence lesson */
export type StoredCard = Card & { lessonId: string; sortOrder: number };
```

**Vérification** : `npx tsc --noEmit` passe.

### Étape 0.4 — Implémenter le LocalContentProvider

**Nouveau fichier** : `src/lib/local-content-provider.ts`

Implémenter `ContentProvider` en utilisant `idb` pour IndexedDB.

Structure de l'implémentation :

1. **Initialisation de la DB** : utiliser `openDB("finance-app-content", 1, { upgrade })` pour créer les 6 object stores listés dans la section [2c](#2c-structure-indexeddb).

2. **Lecture** : les méthodes `getAllTracks()`, `getTrackById()`, etc. lisent dans IndexedDB et réassemblent la hiérarchie `Track > Lesson > Card` à partir des stores plats.

3. **Écriture** : `upsertCard()` doit d'abord sauvegarder la version précédente dans `card_versions` (si la carte existe), puis écrire la nouvelle version.

4. **Seed** : `isSeeded()` vérifie le flag `seeded` dans le store `meta`. `seed(tracks)` décompose les tracks en entrées plates (track meta + lessons + cards) et les insère.

5. **Historique** : `getCardHistory()` lit dans `card_versions` indexé par `cardId`, trié par `version` descendant. Limiter à 20 entrées par carte (supprimer les plus anciennes à l'insertion).

6. **Suggestions** : CRUD simple dans le store `suggestions`.

**Points d'attention** :
- Toutes les méthodes sont `async` (IndexedDB est asynchrone)
- Les `sortOrder` sont initialisés à partir de l'index dans le tableau lors du seed
- Le `bulkUpsertCards` doit utiliser une transaction unique pour la performance

**Vérification** : écrire un test `src/lib/local-content-provider.test.ts` qui :
- Seed le provider avec le contenu built-in
- Vérifie que `getAllTracks()` retourne 1 track
- Vérifie que `getCardsByLesson("mf-found-l1-action")` retourne 5 cartes
- Upsert une carte modifiée et vérifie que `getCardHistory()` retourne 1 version
- Teste les suggestions (create, list, update status)

Note : les tests IndexedDB nécessitent `fake-indexeddb`. Ajouter :
```bash
npm install -D fake-indexeddb
```
Et dans `vitest.config.ts`, ajouter `fake-indexeddb/auto` aux `setupFiles`.

### Étape 0.5 — Singleton et provider global

**Nouveau fichier** : `src/lib/content.ts`

```typescript
import { LocalContentProvider } from "./local-content-provider";
import type { ContentProvider } from "./content-provider";

// Singleton. Sera remplacé par SupabaseContentProvider quand on déploiera.
let provider: ContentProvider | null = null;

export function getContentProvider(): ContentProvider {
  if (!provider) {
    provider = new LocalContentProvider();
  }
  return provider;
}
```

Ce fichier est le **seul point d'entrée** pour accéder au contenu dans toute l'app.
Quand on migrera vers Supabase, on ne modifiera que ce fichier.

### Étape 0.6 — Hook React pour consommer le contenu

**Nouveau fichier** : `src/lib/use-content.ts`

Créer un hook custom `useContent()` qui :
1. Appelle `getContentProvider()`
2. Vérifie si le provider est seeded (`isSeeded()`)
3. Si non seeded, importe le contenu built-in depuis `src/content/` et appelle `seed()`
4. Expose les données et un état de chargement

```typescript
interface UseContentReturn {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useContent(): UseContentReturn { /* ... */ }

interface UseLessonReturn {
  lesson: Lesson | undefined;
  isLoading: boolean;
}

export function useLesson(trackId: string, lessonId: string): UseLessonReturn { /* ... */ }
```

### Étape 0.7 — Migrer les pages existantes

**Fichiers à modifier** :
- `src/app/tracks/page.tsx` : remplacer l'import statique `allTracks` par `useContent()`
- `src/app/tracks/[trackId]/page.tsx` : utiliser `useContent()` au lieu de `getTrackById()`
- `src/app/session/page.tsx` : utiliser `useLesson()` dans `LearnFlow` et `QuizFlow`
- `src/app/results/page.tsx` : utiliser `useLesson()` pour résoudre les cartes échouées

**Règle** : l'import direct de `src/content/index.ts` ne doit plus être utilisé
dans les pages. Seul `src/lib/use-content.ts` et `src/lib/content.ts` sont autorisés.
L'ancien `src/content/index.ts` reste comme module de données brutes pour le seed.

**Vérification** :
- `npx tsc --noEmit` passe
- `npm test` passe (tests existants inchangés)
- `npm run dev` → l'app fonctionne exactement comme avant
- Inspecter IndexedDB dans les DevTools : les données sont présentes

---

## 5. Phase 1 — Import / Export engine

> **Objectif** : pouvoir importer et exporter du contenu dans les 3 formats
> (YAML, JSON, CSV). Logique pure, sans UI (l'UI viendra en phase 2).

### Étape 1.1 — Schémas de validation Zod

**Nouveau fichier** : `src/lib/import-export/schemas.ts`

Définir les schémas suivants :

```typescript
// Schéma d'une carte
const CardSchema = z.object({
  id: z.string().optional(),  // optionnel à l'import
  type: z.enum(["definition", "intuition", "example", "formula",
                 "trap", "interview-question", "model-answer"]),
  front: z.string().min(1),
  back: z.string().min(1),
  detail: z.string().optional(),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  tags: z.array(z.string()).default([]),
});

// Schéma d'une leçon (avec cartes)
const LessonSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().default(""),
  estimatedMinutes: z.number().int().positive().default(5),
  cards: z.array(CardSchema).min(1),
});

// Format "track complet"
const TrackExportSchema = z.object({
  track: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().default(""),
    emoji: z.string().default("📚"),
    color: z.string().default("blue"),
  }),
  lessons: z.array(LessonSchema).min(1),
});

// Format "import rapide" (cartes seules vers une leçon existante)
const QuickImportSchema = z.object({
  target: z.object({
    track: z.string().min(1),
    lesson: z.string().min(1),
  }),
  cards: z.array(CardSchema).min(1),
});
```

**Vérification** : test unitaire qui valide des exemples valides et invalides.

### Étape 1.2 — Générateur d'IDs

**Nouveau fichier** : `src/lib/import-export/id-generator.ts`

```typescript
/**
 * Génère un ID unique pour une carte.
 * Pattern : {trackPrefix}-{lessonSlug}-{type abbreviation}-{hash4}
 *
 * Exemples :
 *   generateCardId("market-finance", "action", "definition", existingIds)
 *   → "mf-action-def-a3f2"
 */
export function generateCardId(
  trackId: string,
  lessonSlug: string,
  cardType: CardType,
  existingIds: Set<string>,
): string { /* ... */ }

/**
 * Abréviation du type de carte pour les IDs :
 * definition → def, intuition → int, example → ex, formula → form,
 * trap → trap, interview-question → iq, model-answer → ma
 */
```

Le hash4 est un hash court (4 caractères hexadécimaux) calculé à partir du
`front` de la carte pour être déterministe. Si collision, incrémenter.

**Vérification** : test unitaire qui vérifie l'unicité et le format.

### Étape 1.3 — YAML import/export

**Nouveau fichier** : `src/lib/import-export/yaml-io.ts`

```typescript
import YAML from "yaml";

/**
 * Parse un fichier YAML et retourne les données validées.
 * Détecte automatiquement le format (track complet ou import rapide).
 * Génère les IDs manquants.
 */
export function parseYaml(text: string, existingIds: Set<string>): {
  format: "track" | "quick";
  data: TrackExportData | QuickImportData;
  errors: ValidationError[];
};

/**
 * Sérialise des tracks en YAML.
 */
export function exportYaml(tracks: Track[], options: ExportOptions): string;
```

**Vérification** : test roundtrip — exporter puis ré-importer doit donner des
données identiques.

### Étape 1.4 — JSON import/export

**Nouveau fichier** : `src/lib/import-export/json-io.ts`

Même API que `yaml-io.ts` mais avec `JSON.parse` / `JSON.stringify(data, null, 2)`.

**Vérification** : test roundtrip.

### Étape 1.5 — CSV import/export

**Nouveau fichier** : `src/lib/import-export/csv-io.ts`

```typescript
import Papa from "papaparse";

/**
 * Parse un fichier CSV.
 * - Auto-détecte le séparateur (; ou ,) en analysant la ligne d'en-tête
 * - Reconstruit la hiérarchie track > lesson > card depuis les lignes plates
 * - Valide chaque ligne avec le schéma Zod
 * - Gère les tags pipe-separated (action|equity → ["action", "equity"])
 * - Gère les champs multi-ligne RFC 4180
 */
export function parseCsv(text: string, existingIds: Set<string>): {
  data: TrackExportData;
  errors: ValidationError[];
};

/**
 * Sérialise des tracks en CSV.
 * - Ajoute le BOM UTF-8 en début de fichier
 * - Utilise le séparateur spécifié (défaut ";")
 * - Une ligne par carte, métadonnées track/lesson répétées
 * - Tags joints par "|"
 */
export function exportCsv(tracks: Track[], options: ExportOptions & { separator: ";" | "," }): string;
```

**Auto-détection du séparateur** :
```typescript
function detectSeparator(headerLine: string): ";" | "," {
  const semicolons = (headerLine.match(/;/g) || []).length;
  const commas = (headerLine.match(/,/g) || []).length;
  return semicolons >= commas ? ";" : ",";
}
```

**Vérification** :
- Test roundtrip (export → import → identique)
- Test avec séparateur `;`
- Test avec séparateur `,`
- Test avec contenu multi-ligne
- Test avec tags multiples
- Test avec champs vides (`card_detail` optionnel)

### Étape 1.6 — Moteur de diff

**Nouveau fichier** : `src/lib/import-export/diff.ts`

```typescript
/**
 * Compare le contenu importé avec le contenu existant.
 * Retourne un ImportResult avec les cartes ajoutées, modifiées et inchangées.
 *
 * La comparaison se fait par ID :
 * - ID présent dans l'import mais pas dans l'existant → added
 * - ID présent des deux côtés, contenu différent → modified (avec before/after)
 * - ID présent des deux côtés, contenu identique → unchanged
 */
export function computeImportDiff(
  incoming: Card[],
  existing: Card[],
): ImportResult;

/**
 * Vérifie si deux cartes ont un contenu identique
 * (ignore les métadonnées internes comme sortOrder).
 */
function areCardsEqual(a: Card, b: Card): boolean;
```

**Vérification** : tests unitaires couvrant chaque cas (ajout, modif, identique, erreur).

### Étape 1.7 — Gestion de l'historique

**Nouveau fichier** : `src/lib/import-export/history.ts`

```typescript
/**
 * Crée une entrée de version avant de modifier une carte.
 * Appelé automatiquement par upsertCard() et bulkUpsertCards().
 */
export function createCardVersion(
  provider: ContentProvider,
  card: Card,
  changedBy: string,
): Promise<CardVersion>;

/**
 * Récupère l'historique d'une carte (max 20, les plus récents d'abord).
 */
export function getCardHistory(
  provider: ContentProvider,
  cardId: string,
): Promise<CardVersion[]>;

/**
 * Restaure une version précédente d'une carte.
 * La version actuelle est d'abord sauvegardée en tant que nouvelle version
 * (pour pouvoir annuler la restauration).
 */
export function restoreCardVersion(
  provider: ContentProvider,
  versionId: string,
): Promise<void>;
```

Note : ces fonctions font partie du `ContentProvider` mais sont extraites ici pour la
logique métier. Le `LocalContentProvider` les utilise en interne.

### Étape 1.8 — API publique d'import/export

**Nouveau fichier** : `src/lib/import-export/index.ts`

```typescript
/**
 * Point d'entrée unique pour l'import.
 * Détecte le format par l'extension du fichier ou par le contenu.
 * Retourne un ImportResult (diff) sans appliquer les changements.
 */
export async function analyzeImport(
  fileContent: string,
  fileName: string,
  provider: ContentProvider,
): Promise<ImportResult>;

/**
 * Applique un import validé : upsert les cartes ajoutées et modifiées.
 * Crée les versions historiques avant chaque modification.
 */
export async function applyImport(
  result: ImportResult,
  provider: ContentProvider,
  changedBy: string,
): Promise<void>;

/**
 * Exporte le contenu selon les options spécifiées.
 * Retourne le contenu du fichier en string + le nom de fichier suggéré.
 */
export async function exportContent(
  provider: ContentProvider,
  options: ExportOptions,
): Promise<{ content: string; filename: string; mimeType: string }>;
```

**Détection du format** :
- `.yaml` / `.yml` → YAML
- `.json` → JSON
- `.csv` → CSV
- Si pas d'extension : tenter YAML, puis JSON, puis CSV (dans cet ordre)

**Vérification** : test d'intégration complet — créer un provider, seed, exporter
en 3 formats, ré-importer chacun, vérifier que le diff est vide (unchanged).

---

## 6. Phase 2 — Interface admin

> **Objectif** : permettre de gérer le contenu (CRUD), importer/exporter,
> et visualiser l'historique, le tout dans une interface web dédiée.

### Étape 2.1 — Layout admin et guard

**Nouveau fichier** : `src/app/admin/layout.tsx`

- Layout avec sidebar de navigation : Dashboard, Contenus, Import, Export, Suggestions
- Un composant `AdminGuard` qui encapsule le contenu :
  - En local : retourne toujours `true` (pas de protection)
  - Préparer un emplacement commenté pour le check Supabase Auth futur

```typescript
// src/lib/auth.ts
export function isAdmin(): boolean {
  // TODO: vérifier Supabase Auth quand déployé
  // Pour l'instant, toujours admin en local
  return true;
}
```

**Nouveau fichier** : `src/app/admin/page.tsx` (dashboard)

Affiche :
- Nombre total de tracks, leçons, cartes
- Nombre de suggestions en attente
- Liens rapides vers les pages principales

### Étape 2.2 — Gestion des tracks

**Nouveau fichier** : `src/app/admin/tracks/page.tsx`

- Liste de tous les tracks avec : emoji, titre, nombre de leçons, nombre de cartes
- Bouton "Nouveau track" → formulaire inline ou modal
- Chaque track est cliquable → détail

**Nouveau fichier** : `src/app/admin/tracks/[trackId]/page.tsx`

- Détail du track : métadonnées éditables (titre, description, emoji, couleur)
- Liste des leçons avec drag-and-drop pour réordonner (ou flèches haut/bas)
- Chaque leçon est cliquable → détail
- Bouton "Nouvelle leçon"

### Étape 2.3 — Gestion des leçons et cartes

**Nouveau fichier** : `src/app/admin/tracks/[trackId]/lessons/[lessonId]/page.tsx`

- Métadonnées de la leçon éditables (titre, description, slug, durée estimée)
- Liste des cartes avec : type (badge coloré), difficulté (1/2/3), front (tronqué)
- Drag-and-drop ou flèches pour réordonner
- Bouton "Nouvelle carte"
- Chaque carte est cliquable → éditeur

### Étape 2.4 — Éditeur de carte

**Nouveau fichier** : `src/components/admin/CardForm.tsx`

Formulaire complet :
- `type` : dropdown avec les 7 types (afficher l'icône à côté)
- `front` : textarea
- `back` : textarea (plus grand, car le dos est souvent plus long)
- `detail` : textarea (optionnel, pliable/dépliable)
- `difficulty` : radio buttons 1 / 2 / 3 avec labels (Facile / Moyen / Difficile)
- `tags` : input avec chips (taper un tag + Enter pour ajouter)
- Validation Zod en temps réel (erreurs affichées sous chaque champ)
- Boutons : Sauvegarder / Annuler

**Nouveau fichier** : `src/components/admin/CardPreview.tsx`

- Affiche la carte exactement comme elle apparaît en mode Learn
- Mise à jour en temps réel pendant l'édition (live preview)
- Réutilise le composant `LearnCard` existant

**Nouveau fichier** : `src/app/admin/tracks/[trackId]/lessons/[lessonId]/cards/new/page.tsx`

Layout en 2 colonnes (ou stacked sur mobile) : `CardForm` à gauche, `CardPreview` à droite.

**Nouveau fichier** : `src/app/admin/tracks/[trackId]/lessons/[lessonId]/cards/[cardId]/edit/page.tsx`

Idem mais pré-rempli avec les données existantes. Bouton supplémentaire "Historique"
qui ouvre un panneau latéral avec les versions précédentes.

### Étape 2.5 — Page import

**Nouveau fichier** : `src/app/admin/import/page.tsx`

1. **Zone d'upload** : drag-and-drop ou bouton file picker. Accepte `.yaml`, `.yml`, `.json`, `.csv`.
2. **Après upload** : appelle `analyzeImport()` et affiche le résultat dans un composant `ImportDiff`.
3. **Boutons** : "Tout importer" / "Annuler"

**Nouveau fichier** : `src/components/admin/ImportDiff.tsx`

Affiche le résultat de l'analyse :
- Section "Nouvelles cartes" (vert) : liste avec type, front, difficulté
- Section "Cartes modifiées" (orange) : chaque carte affiche un diff before/after
- Section "Cartes identiques" (gris, repliée par défaut) : juste le nombre
- Section "Erreurs" (rouge) : si des lignes sont invalides, afficher le détail
- Compteurs en haut : "X nouvelles · Y modifiées · Z identiques · W erreurs"

### Étape 2.6 — Page export

**Nouveau fichier** : `src/app/admin/export/page.tsx`

Formulaire :
- **Scope** : radio buttons — Tout / Par track (dropdown) / Par leçon (dropdown dépendant)
- **Format** : radio buttons — YAML / JSON / CSV
- **Séparateur CSV** : toggle `;` / `,` (visible seulement si format = CSV)
- **Bouton "Télécharger"** : génère le fichier et déclenche le téléchargement

Le nom du fichier est automatique :
- `finance-learning-all.yaml`
- `track-market-finance.json`
- `lesson-action.csv`

### Étape 2.7 — Historique des cartes

**Nouveau fichier** : `src/components/admin/CardHistory.tsx`

- Timeline verticale des versions (date, source, changé par)
- Chaque version est cliquable → preview de la carte à cette version
- Bouton "Restaurer cette version" avec confirmation

---

## 7. Phase 3 — Suggestions utilisateurs

> **Objectif** : les utilisateurs peuvent signaler des erreurs ou proposer
> de nouvelles cartes. L'admin peut les consulter et les traiter.

### Étape 3.1 — Composants de suggestion

**Nouveau fichier** : `src/components/SuggestionButton.tsx`

- Petit bouton 🚩 (ou icône drapeau) positionné en bas à droite de la carte
- Discret : gris clair, visible au hover ou au tap
- Au clic : ouvre `SuggestionModal`

**Nouveau fichier** : `src/components/SuggestionModal.tsx`

- **Catégorie** (radio) : Erreur / Détail manquant / Formulation confuse / Nouvelle carte / Autre
- **Message** (textarea) : description du problème ou de la suggestion
- **Si "Nouvelle carte"** : afficher des champs supplémentaires :
  - Type (dropdown)
  - Front (textarea)
  - Back (textarea)
  - Difficulty (radio 1/2/3)
- **Auto-capture** (non visible par l'utilisateur) : `cardId`, `trackId`, `lessonId`, `timestamp`
- **Bouton "Envoyer"** → appelle `provider.submitSuggestion()`
- **Feedback** : toast ou message "Merci pour votre retour !" après envoi

### Étape 3.2 — Intégrer le bouton dans les cartes

**Modifier** : `src/components/LearningCard.tsx`
- Ajouter `<SuggestionButton cardId={card.id} trackId={trackId} lessonId={lessonId} />`
- Les props `trackId` et `lessonId` devront être propagées depuis le parent

**Modifier** : `src/components/LearnCard.tsx`
- Même ajout

**Modifier** : `src/app/session/page.tsx`
- Passer `trackId` et `lessonId` aux composants de carte

### Étape 3.3 — Page admin des suggestions

**Nouveau fichier** : `src/app/admin/suggestions/page.tsx`

- Filtres : par statut (En attente / Acceptée / Rejetée), par track, par catégorie
- Liste des suggestions avec :
  - Badge catégorie (coloré)
  - Carte concernée (front tronqué) ou "[Nouvelle carte]"
  - Message de l'utilisateur (tronqué)
  - Date
  - Boutons rapides : ✅ Accepter / ❌ Rejeter

- **Accepter une correction** : ouvre l'éditeur de la carte (`/admin/.../edit`)
  avec le message de suggestion affiché en bandeau
- **Accepter une nouvelle carte** : ouvre le formulaire de création
  (`/admin/.../cards/new`) pré-rempli avec la carte proposée
- **Rejeter** : demande une note optionnelle, met à jour le statut

---

## 8. Phase 4 — Algorithme de session intelligent

> **Objectif** : exploiter enfin le SM-2 et la difficulté des cartes
> pour des sessions plus efficaces.

### Étape 4.1 — Quiz avec cartes dues en priorité

**Modifier** : `src/lib/quiz-utils.ts`

Modifier `buildQuizDeck()` pour :
1. Récupérer le `CardProgress` de chaque carte depuis `UserProgress`
2. Séparer les cartes en 2 groupes : dues (`isDueForReview() === true`) et non-dues
3. Mettre les cartes dues en premier, triées par date de review (les plus en retard d'abord)
4. Ajouter les cartes non-dues après (ordre actuel)

### Étape 4.2 — Gating par difficulté

**Nouveau fichier** : `src/lib/difficulty-gate.ts`

```typescript
/**
 * Vérifie si les cartes d'une difficulté donnée sont débloquées
 * dans une leçon.
 *
 * Règle :
 * - Difficulté 1 : toujours débloquée
 * - Difficulté 2 : débloquée si ≥ 70% des cartes de difficulté 1
 *                   de cette leçon ont quality ≥ 3 (au dernier review)
 * - Difficulté 3 : débloquée si ≥ 70% des cartes de difficulté 1+2
 *                   ont quality ≥ 3
 */
export function isDifficultyUnlocked(
  lessonCards: Card[],
  cardProgress: Record<string, CardProgress>,
  targetDifficulty: Difficulty,
): boolean;

/**
 * Filtre les cartes d'un quiz en fonction de la difficulté débloquée.
 */
export function filterByUnlockedDifficulty(
  cards: Card[],
  cardProgress: Record<string, CardProgress>,
): Card[];
```

Intégrer dans `buildQuizDeck()`.

### Étape 4.3 — Mode "Révisions du jour"

**Nouveau fichier** : `src/lib/review-utils.ts`

```typescript
/**
 * Construit un deck de révision cross-leçons.
 *
 * 1. Collecte toutes les cartes de toutes les leçons débloquées
 * 2. Filtre celles qui sont "due" (isDueForReview)
 * 3. Trie par retard décroissant (les plus en retard d'abord)
 * 4. Si < limit cartes dues, ajoute des cartes nouvelles (jamais vues)
 *    depuis les leçons débloquées (max 5 nouvelles par session)
 * 5. Limite au nombre total demandé (défaut 15)
 */
export function buildReviewDeck(
  allTracks: Track[],
  progress: UserProgress,
  limit?: number,
): { cards: Card[]; dueCount: number; newCount: number };
```

### Étape 4.4 — Page de révision et badge

**Modifier** : `src/app/session/page.tsx`
- Ajouter le mode `review` (en plus de `learn` et `quiz`)
- URL : `/session?mode=review`
- Utilise `buildReviewDeck()` au lieu de charger une leçon spécifique

**Modifier** : `src/app/page.tsx` (home page)
- Afficher le nombre de cartes dues : "🔔 X cartes à réviser"
- Bouton "Révisions du jour" qui redirige vers `/session?mode=review`
- Si aucune carte due : "Pas de révision pour le moment ✓"

### Étape 4.5 — Tests

- Tests `difficulty-gate.ts` : vérifier les seuils 70% pour chaque niveau
- Tests `review-utils.ts` : vérifier le tri, la limite, le mélange due/new
- Tests `quiz-utils.ts` mis à jour : vérifier la priorité des cartes dues

---

## 9. Phase 5 — Template IA et contenu

> **Objectif** : documenter le processus de génération de contenu par IA
> et enrichir le contenu existant.

### Étape 5.1 — Guide de génération IA

**Nouveau fichier** : `docs/AI_CONTENT_TEMPLATE.md`

Contenu :
- Le schéma YAML complet avec explications de chaque champ
- Les 7 types de cartes avec un exemple de chacun
- Les conventions de rédaction :
  - Le `front` est toujours une question ou un titre court
  - Le `back` est une réponse concise (< 150 mots)
  - Le `detail` est un approfondissement optionnel
  - Toujours en français, tutoiement
  - Les formules utilisent la notation textuelle (pas de LaTeX)
- Un prompt type à donner à l'IA pour générer une leçon complète
- Un prompt type pour générer des cartes supplémentaires pour une leçon existante
- Les erreurs courantes à vérifier dans le output de l'IA

### Étape 5.2 — Guide de style du contenu

**Nouveau fichier** : `docs/CONTENT_STYLE_GUIDE.md`

- Convention de nommage des IDs
- Tags normalisés (liste de tags autorisés par track)
- Difficulté : guidelines précises (1 = vocabulaire, 2 = raisonnement, 3 = multi-step)
- Paires IQ/MA : toujours associer une interview-question et un model-answer
- Longueur idéale d'une leçon : 4-8 cartes
- Ordre des cartes dans une leçon : definition → intuition → example → formula → trap → IQ → MA

### Étape 5.3 — Enrichir le contenu existant

- Ajouter le champ `detail` aux cartes existantes de `market-finance.ts`
- Ajouter des cartes `trap` manquantes dans les leçons qui n'en ont pas
- Vérifier que chaque leçon a au moins 1 paire IQ/MA

### Étape 5.4 — Nouveau track : Corporate Finance

Utiliser le workflow IA :
1. Écrire le prompt à partir du template
2. Générer les cartes en YAML
3. Importer via l'interface admin
4. Relire et ajuster

---

## 10. Migration future vers Supabase

> Cette section n'est **pas à implémenter maintenant**. Elle documente les
> changements à effectuer quand l'app sera déployée sur Vercel + Supabase.

### Ce qui changera

| Composant | Aujourd'hui (local) | Après migration |
|-----------|-------------------|-----------------|
| `content.ts` | Instancie `LocalContentProvider` | Instancie `SupabaseContentProvider` |
| `auth.ts` | `isAdmin()` retourne `true` | Vérifie le JWT Supabase + rôle admin |
| Suggestions | Stockées dans IndexedDB local | Envoyées à Supabase (table `suggestions`) |
| Contenu | IndexedDB seeded depuis le TS | Table Supabase seeded par script migration |
| Historique | IndexedDB store `card_versions` | Table Supabase `card_versions` |

### Fichiers à créer

- `src/lib/supabase.ts` — Client Supabase (singleton, env vars)
- `src/lib/supabase-content-provider.ts` — Implémentation de `ContentProvider` avec `@supabase/supabase-js`
- `src/app/admin/login/page.tsx` — Page de connexion Supabase Auth
- `supabase/migrations/001_initial_schema.sql` — Les CREATE TABLE documentés dans ce plan

### Fichiers à modifier

- `src/lib/content.ts` — Changer l'instanciation du provider
- `src/lib/auth.ts` — Implémenter la vraie vérification
- `src/app/admin/layout.tsx` — Activer le guard auth
- `.env.local` — Ajouter `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Étapes de migration

1. Créer le projet Supabase (dashboard web)
2. Exécuter le script de migration SQL
3. Lancer le seed : exporter le contenu local en JSON → importer dans Supabase
4. Ajouter les env vars sur Vercel
5. Créer `SupabaseContentProvider` (même interface, backend différent)
6. Changer le singleton dans `content.ts`
7. Ajouter le cache IndexedDB en couche intermédiaire (offline fallback)
8. Configurer les RLS policies Supabase
9. Tester le déploiement

### Schema SQL de référence

```sql
CREATE TABLE tracks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  emoji TEXT,
  color TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  track_id TEXT REFERENCES tracks(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  estimated_minutes INT DEFAULT 5,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cards (
  id TEXT PRIMARY KEY,
  lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'definition','intuition','example','formula',
    'trap','interview-question','model-answer'
  )),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  detail TEXT,
  difficulty INT NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  tags TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE card_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT NOT NULL,
  version INT NOT NULL,
  snapshot JSONB NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT now(),
  changed_by TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('manual','import')),
  UNIQUE(card_id, version)
);

CREATE TABLE suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT,
  track_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'error','missing-detail','wording','new-card','other'
  )),
  message TEXT NOT NULL,
  proposed_card JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending','accepted','rejected'
  )),
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);

-- RLS
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON cards FOR SELECT USING (true);
CREATE POLICY "Public read" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public read" ON lessons FOR SELECT USING (true);
CREATE POLICY "Admin write" ON cards FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Anyone can suggest" ON suggestions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manages suggestions" ON suggestions FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');
```

---

## Résumé des dépendances entre phases

```
Phase 0 (Fondations : types, provider, IndexedDB, migration pages)
    │
    ├──────────────────────┐
    ▼                      ▼
Phase 1 (Import/Export)   Phase 3 (Suggestions)
    │                      │
    ▼                      │
Phase 2 (Admin UI) ◄──────┘
    │
    ▼
Phase 4 (Algo session intelligent)
    │
    ▼
Phase 5 (Template IA + contenu)
```

Phase 1 et Phase 3 peuvent avancer en parallèle.
Phase 2 dépend de Phase 1 (pour les pages import/export).
Phase 4 est indépendante des phases 1-3 (ne touche que la logique de session).
Phase 5 dépend de Phase 2 (utilise l'interface admin pour importer le contenu).
