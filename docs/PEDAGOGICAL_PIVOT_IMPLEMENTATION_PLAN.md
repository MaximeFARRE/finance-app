# Plan d'implementation — Pivot pedagogique Finance de marche

> **Objectif** : transformer l'application d'un systeme de flashcards generiques
> vers un parcours guide, court et progressif pour apprendre a repondre
> clairement a des questions de finance de marche.
>
> **Document source** :
> [FINANCE_MARKET_LEARNING_SYSTEM.md](./FINANCE_MARKET_LEARNING_SYSTEM.md)
>
> **Principe directeur** : la V1 doit d'abord rendre le parcours principal
> excellent. Les modes secondaires (topic practice, challenge, news,
> diagnostic, preparation entretien ouverte) restent hors scope tant que le
> chemin guide Finance de marche n'est pas solide.

---

## Table des matieres

1. [Decisions structurantes](#1-decisions-structurantes)
2. [Etat cible produit](#2-etat-cible-produit)
3. [Modele de donnees cible](#3-modele-de-donnees-cible)
4. [Strategie de migration](#4-strategie-de-migration)
5. [Architecture applicative](#5-architecture-applicative)
6. [Contenu Finance de marche V1](#6-contenu-finance-de-marche-v1)
7. [Experience utilisateur cible](#7-experience-utilisateur-cible)
8. [Plan d'implementation par phases](#8-plan-dimplementation-par-phases)
9. [Tests et verification](#9-tests-et-verification)
10. [Risques et garde-fous](#10-risques-et-garde-fous)
11. [Definition of Done](#11-definition-of-done)

---

## 1. Decisions structurantes

### D1 — Le parcours principal devient prioritaire

Le produit ne doit pas etre pense comme une base de cartes consultable, mais
comme un parcours d'apprentissage guide.

Priorite V1 :

```txt
Track -> World -> Lesson -> Cards -> Boss
```

Hors priorite V1 :

- topic practice avance ;
- challenge mode ;
- diagnostic mode ;
- current news mode ;
- questions d'entretien ouvertes ;
- parcours par metier (Sales & Trading, Structuring, Asset Management, Risk).

---

### D2 — Finance de marche et finance d'entreprise restent separees

La track Finance de marche ne doit pas recevoir de cartes Corporate Finance par
accident.

Regle V1 :

```ts
card.trackId === "market-finance"
```

ou, si le modele evolue :

```ts
card.track === "finance-market"
```

Les concepts partages sont acceptes uniquement s'ils servent directement la
finance de marche : rendement, risque, liquidite, taux, dette, valeur de marche,
volatilite.

---

### D3 — La carte devient une question claire

Chaque carte doit entrainer l'utilisateur a produire une reponse orale courte.

Le recto doit etre une question claire.

Le verso doit contenir :

1. une reponse courte ;
2. une formule si utile ;
3. une explication concise si utile ;
4. un exemple si utile ;
5. une erreur frequente si utile, mais sans transformer la carte en type `trap`.

---

### D4 — Les anciens types de cartes sont remplaces progressivement

Types conserves ou introduits pour la V1 :

```ts
export type QuestionType =
  | "definition"
  | "comparison"
  | "mechanism"
  | "formula"
  | "quick-calculation"
  | "market-culture";
```

Types a sortir du parcours Finance de marche V1 :

- `intuition` ;
- `trap` ;
- `interview-question` ;
- `model-answer`.

Important : la migration doit etre progressive pour eviter de casser
l'import/export, l'admin et les tests existants d'un seul coup.

---

### D5 — Les sessions doivent rester courtes

Objectif :

```txt
Lesson normale: 6 a 10 questions
Reinforcement lesson: 8 a 12 questions
Boss/checkpoint: 10 a 15 questions
Temps cible: 5 a 10 minutes maximum
```

Si une lecon depasse ce volume, elle doit etre scindee.

---

## 2. Etat cible produit

### Parcours principal

La page track Finance de marche doit afficher un parcours lisible, decoupe en
mondes/modules.

Structure cible :

```txt
Finance de marche
  World 1 — Bases des marches financiers
    Lesson 1.1 — What is a financial market?
    Lesson 1.2 — Prices, buyers and sellers
    Lesson 1.3 — Bid, ask and spread
    Lesson 1.4 — Order types
    Lesson 1.5 — Liquidity and volume
    Lesson 1.6 — Market makers
    Boss 1 — Market basics review
```

Les mondes suivants suivent le meme principe :

1. Bases des marches financiers
2. Rendement, performance and P&L
3. Grandes classes d'actifs
4. Taux, obligations and yield curve
5. Risque de marche and risk management
6. Derives fondamentaux
7. Options, volatility and Greeks
8. Produits structures and structuring

---

### Experience de session

Pour une lecon normale :

```txt
Question -> Reponse revelee -> Failed / Correct -> Question suivante
```

Le systeme peut continuer a utiliser SM-2 en interne.

Mapping V1 recommande :

```txt
Failed  -> quality 0
Correct -> quality 4
```

L'interface peut garder des choix plus fins plus tard, mais la V1 doit rester
simple et rapide.

---

### Boss / Checkpoint

Un boss est une validation courte des notions precedentes.

Il doit :

- reprendre des cartes deja vues ;
- prioriser les cartes faibles ou dues ;
- ajouter quelques cartes essentielles non vues si necessaire ;
- rester entre 10 et 15 questions ;
- debloquer clairement la suite du parcours.

---

## 3. Modele de donnees cible

### 3.1 Evolution minimale recommandee

Pour limiter le risque, faire evoluer le modele existant plutot que tout
remplacer immediatement.

Modele actuel simplifie :

```ts
export interface Card {
  id: string;
  type: CardType;
  difficulty: 1 | 2 | 3;
  tags: string[];
  front: string;
  back: string;
  detail?: string;
}
```

Modele transitoire recommande :

```ts
export type QuestionType =
  | "definition"
  | "comparison"
  | "mechanism"
  | "formula"
  | "quick-calculation"
  | "market-culture";

export interface Card {
  id: string;
  questionType: QuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  learningStage?: 1 | 2 | 3 | 4 | 5;
  topics: string[];
  skills: string[];
  question: string;
  shortAnswer: string;
  explanation?: string;
  formula?: string;
  example?: string;
  commonMistake?: string;

  // Compatibilite temporaire
  type?: CardType;
  tags?: string[];
  front?: string;
  back?: string;
  detail?: string;
}
```

Objectif : permettre aux nouvelles cartes Finance de marche d'utiliser
`questionType`, `question` et `shortAnswer`, tout en gardant l'ancien contenu
lisible pendant la migration.

---

### 3.2 Monde / module

Ajouter une notion explicite de `world` ou `module`.

Option recommandee :

```ts
export interface LearningWorld {
  id: string;
  trackId: string;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
  bossLessonId?: string;
}
```

Puis etendre `Track` :

```ts
export interface Track {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: TrackColor;
  worlds?: LearningWorld[];
  lessons: Lesson[];
}
```

Pourquoi ce choix :

- garde la compatibilite avec les tracks existantes ;
- permet d'afficher une track sans worlds si elle n'a pas encore migre ;
- evite de reecrire tout le `ContentProvider` d'un coup.

---

### 3.3 Lecon normale vs boss

Etendre `Lesson` :

```ts
export type LessonKind = "lesson" | "boss" | "bonus";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  kind?: LessonKind;
  worldId?: string;
  order?: number;
  cards: Card[];
}
```

Regles :

- `kind: "lesson"` par defaut ;
- `kind: "boss"` pour les checkpoints ;
- `kind: "bonus"` pour la culture de marche evergreen.

---

### 3.4 Metadata pedagogique

Chaque nouvelle carte Finance de marche doit avoir :

```ts
trackId: "market-finance";
questionType: QuestionType;
topics: string[];
skills: string[];
difficulty: 1 | 2 | 3 | 4 | 5;
learningStage: 1 | 2 | 3 | 4 | 5;
```

Mapping temporaire :

```txt
tags  -> topics
type  -> skills/questionType quand possible
front -> question
back  -> shortAnswer
detail -> explanation
```

---

## 4. Strategie de migration

### Principe

Ne pas faire une rupture totale en une seule PR.

La migration doit suivre cet ordre :

1. Ajouter le modele transitoire.
2. Ajouter des helpers de normalisation.
3. Adapter l'affichage pour lire les deux formats.
4. Migrer le contenu Finance de marche.
5. Ajouter worlds et boss.
6. Nettoyer les anciens types dans la track Finance de marche.
7. Adapter l'admin/import-export.
8. Supprimer la compatibilite uniquement quand tout le contenu est migre.

---

### Helper de normalisation

Creer un helper pur :

```ts
normalizeLearningCard(card: Card): NormalizedLearningCard
```

Il doit garantir que l'UI recoit toujours :

```ts
{
  id: string;
  questionType: QuestionType;
  question: string;
  shortAnswer: string;
  explanation?: string;
  formula?: string;
  example?: string;
  commonMistake?: string;
  topics: string[];
  skills: string[];
  difficulty: number;
}
```

Fallbacks temporaires :

```txt
question      = card.question ?? card.front
shortAnswer   = card.shortAnswer ?? card.back
explanation   = card.explanation ?? card.detail
topics        = card.topics ?? card.tags ?? []
skills        = card.skills ?? [card.type]
questionType  = card.questionType ?? mapLegacyType(card.type)
```

Mapping legacy :

```txt
definition         -> definition
formula            -> formula
example            -> quick-calculation ou mechanism selon metadata
intuition          -> mechanism temporaire, puis reecriture contenu
trap               -> definition/comparison/mechanism apres reecriture
interview-question -> mechanism temporaire, puis sortie V1
model-answer       -> definition temporaire, puis sortie V1
```

---

## 5. Architecture applicative

### Modules a creer ou modifier

#### `src/lib/types.ts`

Ajouter :

- `QuestionType` ;
- `LessonKind` ;
- `LearningWorld` ;
- champs optionnels sur `Card` et `Lesson`.

#### `src/lib/card-normalizer.ts`

Nouveau module pur pour traduire ancien/nouveau format vers un format stable
pour l'UI.

#### `src/lib/lesson-deck.ts`

Responsabilites :

- construire le deck d'une lecon normale ;
- limiter le nombre de cartes ;
- filtrer par track/lesson ;
- appliquer le gating si conserve ;
- prioriser les cartes dues.

API cible :

```ts
buildLessonDeck(params: {
  trackId: string;
  lessonId: string;
  cards: Card[];
  progress: Record<string, CardProgress>;
  limit?: number;
}): Card[];
```

#### `src/lib/boss-deck.ts`

Responsabilites :

- collecter les cartes des lecons precedentes d'un world ;
- prioriser les cartes echouees ou dues ;
- garantir un deck court ;
- eviter de melanger les tracks.

API cible :

```ts
buildBossDeck(params: {
  track: Track;
  worldId: string;
  progress: Record<string, CardProgress>;
  limit?: number;
}): Card[];
```

#### `src/lib/review-utils.ts`

Conserver l'existant, mais verifier que la review globale ne melange pas les
tracks si l'utilisateur lance une review depuis une track specifique.

---

### Regle d'architecture

Les composants React ne doivent pas decider seuls :

- quelles cartes appartiennent a une session ;
- quelles cartes sont dues ;
- comment un boss est construit ;
- comment les anciens champs sont mappes vers les nouveaux.

Ces decisions doivent rester dans `src/lib/`.

---

## 6. Contenu Finance de marche V1

### Structure cible

#### World 1 — Bases des marches financiers

Objectif : comprendre marche, prix, acheteur/vendeur, bid/ask, spread,
ordres, liquidite, volume, market maker, marche primaire/secondaire.

Lecons recommandees :

1. What is a financial market?
2. Prices, buyers and sellers
3. Bid, ask and spread
4. Order types
5. Liquidity and volume
6. Market makers
7. Boss 1 — Market basics review

#### World 2 — Rendement, performance and P&L

Objectif : calculer rendement, gains/pertes, P&L long/short, notional, couts,
drawdown simple.

#### World 3 — Grandes classes d'actifs

Objectif : comprendre equities, bonds, FX, commodities, indices, cash,
money market, credit, derivatives.

#### World 4 — Taux, obligations and yield curve

Objectif : obligations, coupon, principal, maturity, yield, duration, DV01,
courbe des taux, credit spread, IG/HY.

#### World 5 — Risque de marche and risk management

Objectif : market risk, credit risk, liquidity risk, vol, correlation, beta,
hedge, VaR, stress test, Sharpe ratio, tracking error.

#### World 6 — Derives fondamentaux

Objectif : derivative, underlying, forward, future, option, call, put, payoff,
premium, strike, put-call parity, IRS, CDS.

#### World 7 — Options, volatility and Greeks

Objectif : delta, gamma, vega, theta, hedging, implied/historical/realized vol,
smile, skew, time value.

#### World 8 — Produits structures and structuring

Objectif : structured product, zero-coupon, capital protection, participation,
autocallable, barrier, worst-of, correlation, rates, volatility, hedging.

---

### Regles de redaction

Chaque carte doit respecter :

- une seule idee ;
- question claire ;
- reponse orale en 20 a 45 secondes ;
- pas de type `trap` visible ;
- pas de question d'entretien ouverte ;
- calcul mental uniquement pour `quick-calculation` ;
- pas de news actuelle dans le parcours principal.

---

### Exemple de carte cible

```ts
{
  id: "market-finance-bid-ask-spread-def-001",
  questionType: "comparison",
  question: "What is the difference between bid and ask?",
  shortAnswer:
    "The bid is the price at which a buyer is willing to buy. The ask is the price at which a seller is willing to sell. The ask is usually above the bid.",
  explanation:
    "The gap between the two is the bid-ask spread. A tight spread usually indicates a liquid market.",
  topics: ["market-microstructure", "bid-ask", "liquidity"],
  skills: ["comparison"],
  difficulty: 1,
  learningStage: 1
}
```

---

## 7. Experience utilisateur cible

### Track page

La page Finance de marche doit afficher les worlds sous forme de progression.

Chaque lecon doit montrer :

- titre court ;
- statut verrouille/deverrouille ;
- progression ;
- etoiles ou score ;
- duree estimee ;
- badge boss/bonus si applicable.

---

### Session page

La session doit privilegier la vitesse et la clarte.

Etat initial :

```txt
Question
```

Apres reveal :

```txt
Short answer
Formula
Explanation
Example
Common mistake
```

Actions V1 :

```txt
Failed
Correct
```

Un bouton "Je ne sais pas" peut etre equivalent a `Failed`.

---

### Result page

Afficher :

- score ;
- XP ;
- cartes reussies ;
- cartes ratees ;
- cartes a revoir ;
- progression de la lecon ;
- unlock du prochain noeud si applicable.

Pour un boss :

- afficher explicitement si le boss est valide ;
- debloquer le world suivant uniquement si le seuil est atteint.

---

## 8. Plan d'implementation par phases

### Phase 0 — Audit et garde-fous

Objectif : comprendre l'etat actuel avant modification.

Actions :

- lister les types de cartes utilises dans `src/content/market-finance.ts` ;
- compter les cartes par lecon ;
- identifier les lecons trop longues ;
- identifier les cartes `intuition`, `trap`, `interview-question`, `model-answer` ;
- verifier les tests existants ;
- documenter les routes qui dependent de `Card.type`.

Livrables :

- rapport court dans la PR ou issue ;
- aucun changement fonctionnel obligatoire.

Verification :

```bash
npm run typecheck
npm test
```

---

### Phase 1 — Modele transitoire et normalisation

Objectif : introduire le nouveau modele sans casser l'ancien.

Actions :

- ajouter `QuestionType`, `LessonKind`, `LearningWorld` ;
- ajouter les champs optionnels du nouveau modele a `Card` et `Lesson` ;
- creer `card-normalizer.ts` ;
- tester `normalizeLearningCard()` ;
- adapter `LearningCard`, `LearnCard` et `CardPreview` pour consommer le format normalise.

Livrables :

- compatibilite totale avec le contenu actuel ;
- premiers tests unitaires du normalizer.

Verification :

```bash
npm run typecheck
npm test
```

---

### Phase 2 — Decks courts et logique de session simplifiee

Objectif : rendre les sessions courtes et compatibles avec le pivot.

Actions :

- creer ou adapter `buildLessonDeck()` ;
- imposer une limite par defaut de 10 cartes pour une lecon normale ;
- mapper les actions UI simples vers SM-2 ;
- verifier que les cartes dues restent prioritaires ;
- ne pas melanger les tracks.

Livrables :

- sessions normales plus courtes ;
- logique de deck testee hors UI.

Verification :

```bash
npm run typecheck
npm test
```

---

### Phase 3 — Worlds et boss levels

Objectif : ajouter la structure Duolingo-like.

Actions :

- ajouter `worlds` a la track Finance de marche ;
- associer chaque lecon a un `worldId` ;
- ajouter `kind: "boss"` sur les checkpoints ;
- creer `buildBossDeck()` ;
- adapter l'unlock pour gerer les boss ;
- adapter `LessonList` ou creer un composant de parcours par world.

Livrables :

- affichage par worlds ;
- boss visible et jouable ;
- unlock coherent entre lecons, boss et world suivant.

Verification :

```bash
npm run typecheck
npm test
```

Verification visuelle :

- lancer l'app ;
- ouvrir `/tracks/market-finance` ;
- verifier desktop et mobile.

---

### Phase 4 — Migration du contenu Finance de marche

Objectif : reecrire le contenu selon le nouveau format pedagogique.

Actions :

- reconstruire `market-finance.ts` en 8 worlds ;
- decouper les grandes lecons en noeuds de 6 a 10 questions ;
- convertir `intuition` en questions `definition`, `comparison` ou `mechanism` ;
- convertir `trap` en questions normales ;
- supprimer les questions d'entretien ouvertes du parcours principal ;
- remplacer `model-answer` par des `shortAnswer` solides dans chaque carte ;
- ajouter `topics`, `skills`, `learningStage`.

Livrables :

- Finance de marche V1 propre ;
- aucune carte legacy interdite dans cette track.

Verification :

```bash
npm run typecheck
npm test
```

Controle contenu :

- aucune lecon normale > 10 cartes ;
- aucun boss > 15 cartes ;
- aucune carte `trap`, `intuition`, `interview-question`, `model-answer` dans Finance de marche ;
- toutes les cartes ont une question claire et une reponse courte.

---

### Phase 5 — Admin et import/export

Objectif : permettre de gerer le nouveau contenu sans regressions.

Actions :

- mettre a jour les schemas Zod ;
- accepter `questionType`, `question`, `shortAnswer`, `topics`, `skills`,
  `learningStage` ;
- garder l'import legacy temporairement ;
- mettre a jour YAML/JSON/CSV export ;
- adapter `CardForm` aux nouveaux champs ;
- adapter `ImportDiff` pour comparer les nouveaux champs.

Livrables :

- admin compatible nouveau format ;
- import/export du nouveau contenu ;
- legacy encore lisible si necessaire.

Verification :

```bash
npm run typecheck
npm test
```

Tests manuels :

- exporter une lecon Finance de marche ;
- reimporter sans diff inattendu ;
- modifier une carte ;
- verifier l'historique.

---

### Phase 6 — Nettoyage progressif

Objectif : retirer les anciennes hypotheses uniquement quand elles ne servent
plus au parcours principal.

Actions :

- supprimer les styles UI specifiques aux anciens types dans Finance de marche ;
- conserver ou isoler la compatibilite pour Corporate Finance si non migree ;
- mettre a jour `CONTENT_STYLE_GUIDE.md` ;
- mettre a jour `ADDING_CONTENT.md` ;
- mettre a jour `AI_CONTENT_TEMPLATE.md` ;
- mettre a jour `ARCHITECTURE.md`.

Livrables :

- documentation alignee ;
- code plus simple ;
- ancien modele limite aux tracks non migrees ou supprime si tout est migre.

Verification :

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

---

## 9. Tests et verification

### Tests unitaires a ajouter

#### `card-normalizer.test.ts`

Cas :

- carte nouveau format complete ;
- carte legacy `definition` ;
- carte legacy `formula` ;
- carte legacy `trap` ;
- champs manquants ;
- topics fallback depuis tags ;
- skills fallback depuis type.

#### `lesson-deck.test.ts`

Cas :

- limite a 10 cartes ;
- cartes dues prioritaires ;
- cartes hors track exclues ;
- cartes verrouillees exclues si gating conserve ;
- ordre stable.

#### `boss-deck.test.ts`

Cas :

- collecte uniquement les lecons du world ;
- exclut les bonus si non demandes ;
- priorise cartes faibles ;
- limite a 15 cartes ;
- ne melange pas Corporate Finance.

#### Tests contenu

Ajouter un test de validation du contenu Finance de marche :

- pas de types interdits ;
- question non vide ;
- short answer non vide ;
- lecons normales entre 6 et 10 cartes ;
- boss entre 10 et 15 cartes ;
- topics et skills presents ;
- `learningStage` present ;
- aucune question de current news.

---

### Checks obligatoires avant fin de phase

Pour chaque phase avec code :

```bash
npm run typecheck
npm test
```

Pour les phases UI :

```bash
npm run lint
npm run build
```

Et verification manuelle dans le navigateur si l'affichage change.

---

## 10. Risques et garde-fous

### Risque 1 — Casser l'admin/import-export

Garde-fou :

- introduire le nouveau format en mode additif ;
- garder les champs legacy temporairement ;
- tester export/import round-trip.

---

### Risque 2 — Migrer trop de contenu d'un coup

Garde-fou :

- migrer world par world ;
- verifier les tests contenu a chaque world ;
- garder des commits separes par monde ou par phase.

---

### Risque 3 — Transformer les cartes en cours trop longs

Garde-fou :

- imposer `shortAnswer` concis ;
- limiter `explanation` ;
- creer un test ou script de longueur recommandee si necessaire.

---

### Risque 4 — Surconstruire les modes secondaires

Garde-fou :

- ne pas ajouter topic practice, challenge, diagnostic ou news avant validation
  du parcours principal.

---

### Risque 5 — Melanger Finance de marche et Corporate Finance

Garde-fou :

- filtrage explicite par `trackId` ;
- tests sur `buildLessonDeck`, `buildBossDeck` et `buildReviewDeck`.

---

## 11. Definition of Done

Le pivot pedagogique est considere correctement implemente quand :

- la track Finance de marche est organisee en 8 worlds ;
- chaque world contient des lecons courtes et un boss/checkpoint ;
- les lecons normales contiennent 6 a 10 questions ;
- les boss contiennent 10 a 15 questions ;
- les cartes Finance de marche utilisent les types V1 approuves ;
- aucune carte V1 Finance de marche n'utilise `intuition`, `trap`,
  `interview-question` ou `model-answer` ;
- chaque carte a une question claire et une reponse courte ;
- la session utilisateur reste simple et rapide ;
- les cartes ratees continuent d'alimenter la repetition espacee ;
- l'app ne melange pas Finance de marche et Finance d'entreprise ;
- l'admin et l'import/export supportent le nouveau format ;
- les docs de contenu sont mises a jour ;
- `npm run typecheck`, `npm run lint`, `npm test` et `npm run build` passent.

---

## Ordre recommande des premieres PRs

1. `refactor: add learning card normalization`
2. `feat: add short lesson deck builder`
3. `feat: add worlds and boss lesson model`
4. `feat: migrate market basics world`
5. `feat: migrate finance market path`
6. `feat: update admin import export for question cards`
7. `docs: update content authoring guide for pedagogical pivot`

Ce decoupage permet de verifier chaque couche avant de toucher massivement au
contenu.
