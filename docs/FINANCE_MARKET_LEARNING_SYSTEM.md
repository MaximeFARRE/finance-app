# Finance Market Learning System — Specification for AI Coding Agent

## 1. Purpose of this document

This document defines the pedagogical and product structure of the learning application for the **Finance de marché** track.

It is intended to be used as a base of understanding for an AI coding agent before modifying the application. The goal is to avoid implementing features that look useful in isolation but break the learning logic.

The application is not a generic flashcard app. It is a structured, gamified learning app inspired by Duolingo and Quizlet, where users learn finance concepts through short, clear question/answer cards.

The first priority is to build a clean and effective **main learning path** for Finance de marché. Secondary modes such as topic training, challenges, news mode, and diagnostic mode can be added later, but they must not be implemented before the main path is solid.

---

## 2. Core product vision

The app should help users learn finance concepts progressively, in the right order, through short sessions.

The learning experience should feel:

- progressive;
- structured;
- gamified;
- fast to complete;
- useful for oral answers;
- easy to revise;
- technically clean.

The user should never be forced into a long 30-minute or 1-hour quiz. A normal level should take around **5 to 10 minutes maximum**.

The application must support two long-term needs:

1. **Guided learning path**: the user learns concepts in the correct pedagogical order.
2. **Future topic-based practice**: the user will eventually be able to train on a specific topic, such as formulas, options, rates, volatility, or products.

For now, the main focus is the guided path.

---

## 3. Important design decisions already made

### 3.1 Finance de marché and finance d'entreprise must be separate tracks

Finance de marché and finance d'entreprise must be treated as **distinct learning paths**.

A user choosing the Finance de marché path should not receive finance d'entreprise questions unless the concept is genuinely shared and useful for market finance.

Allowed shared concepts include, for example:

- return;
- risk;
- liquidity;
- volatility;
- interest rates;
- debt instruments;
- credit risk;
- market value;
- simple financial performance measures.

But the Finance de marché path should not include topics such as:

- DCF valuation in corporate finance depth;
- LBO mechanics;
- M&A process;
- financial statement analysis in detail;
- company valuation multiples as a corporate finance path;
- accounting-specific topics unless strictly needed for a market concept.

The two tracks may share some cards in the future, but they should remain structurally separate.

---

### 3.2 The main unit is not a passive flashcard but a clear question

Every card must be based on a clear question that the user can answer orally.

Bad card style:

```txt
Intuition: An obligation is like a loan.
```

Good card style:

```txt
Question: What is a bond?
Answer: A bond is a debt instrument. The investor lends money to an issuer, who pays coupons and repays the principal at maturity.
```

The application should not behave like a library of passive course notes. It should train the user to produce clear answers.

---

### 3.3 All answers are model answers

There should not be a separate `model-answer` card type.

Every card must already contain a good answer: short, clear, structured, and simple enough to be useful.

A model answer does not mean a very long answer. It means the best concise answer expected from a serious candidate.

---

### 3.4 Removed card/question types

The following types must not be used in the V1 Finance de marché path:

#### Removed: `intuition`

Reason: an intuition-only card is too vague and often does not create a clear question. It can lead to passive reading instead of active recall.

#### Removed: `explanation-simple`

Reason: this overlaps with the answer/explanation fields. The user should answer a real question, not receive a passive explanation.

#### Removed: `trap`

Reason: if the user knows the card is a trap, the question becomes easier and biased. The app should not label a question as a trap. If a question tests a common misconception, it should be framed as a normal definition, comparison, mechanism, or calculation question.

#### Removed: `interview-question`

Reason: interview questions are often too open-ended and difficult to correct simply. The V1 should avoid broad questions such as “How would you analyze the market today?” or “Why do you want to work in finance?”

The app may later include interview preparation, but the first learning path should focus on clear, answerable finance questions.

---

## 4. Approved question types for V1

The V1 should use only a limited set of clear question types.

Recommended TypeScript type:

```ts
export type QuestionType =
  | "definition"
  | "comparison"
  | "mechanism"
  | "formula"
  | "quick-calculation"
  | "market-culture";
```

---

### 4.1 `definition`

A definition question asks the user to define a concept precisely.

Examples:

```txt
What is a bid price?
What is a bond?
What is implied volatility?
What is a CDS?
```

Expected answer style:

- one clear definition;
- one or two important details;
- no long explanation unless needed.

---

### 4.2 `comparison`

A comparison question asks the user to distinguish two close concepts.

Examples:

```txt
What is the difference between a forward and a future?
What is the difference between historical volatility and implied volatility?
What is the difference between market risk and credit risk?
What is the difference between an equity and a bond?
```

This is one of the most useful formats because finance interviews and learning often require distinguishing similar concepts.

Expected answer style:

- define both concepts briefly;
- explain the key difference;
- add one practical consequence if useful.

---

### 4.3 `mechanism`

A mechanism question asks how something works.

Examples:

```txt
How does a market maker make money?
How does daily mark-to-market work on a future?
How does a plain vanilla interest rate swap work?
How does an autocallable product work?
```

Expected answer style:

- explain the process step by step;
- keep it short;
- avoid unnecessary technical depth in early levels.

---

### 4.4 `formula`

A formula question asks for a formula or a direct mathematical relation.

Examples:

```txt
What is the payoff of a European call at maturity?
What is the formula for the total return of a stock?
What is the simple formula for a forward price on a non-dividend-paying stock?
How is Sharpe ratio calculated?
```

Expected answer style:

- formula;
- meaning of variables;
- one short interpretation.

Large manual calculations should be avoided. The goal is oral mastery, not heavy quantitative exercises.

---

### 4.5 `quick-calculation`

A quick calculation question asks for simple mental arithmetic or a short finance calculation.

Examples:

```txt
A stock rises from 80 to 92. What is the percentage return?
You buy 100 shares at 50 and sell them at 53. What is the P&L?
A portfolio is 60% invested in an asset returning 5% and 40% in an asset returning 2%. What is the portfolio return?
```

Expected answer style:

- show the short calculation;
- give the final result;
- keep the calculation feasible mentally.

---

### 4.6 `market-culture`

A market culture question asks about a historical or cultural market event or concept.

Examples:

```txt
What happened during the 2008 financial crisis?
What was the 1929 crash?
What was LTCM and why is it famous?
What was the LIBOR scandal?
What is high-frequency trading?
```

This type should be used to build financial culture, especially around major events, famous investors, crises, market failures, and institutional concepts.

This is different from current news. Market culture is mostly evergreen.

---

## 5. Question types not included in V1

### 5.1 Current news questions

Current news questions are important but should not be included in the core V1 path.

Reason: they become outdated quickly and require active maintenance.

Examples of future news questions:

```txt
How do current central bank policies affect bond markets?
How has inflation affected market expectations recently?
What geopolitical risks currently affect markets?
```

These questions should later become a separate mode or module, with metadata such as:

```ts
timeSensitivity: "hot" | "cold" | "evergreen";
validFrom?: string;
validUntil?: string;
sourceDate?: string;
```

For now: do not implement current news in the main V1 path.

---

### 5.2 Open interview questions

Open interview questions should not be used in the main path.

Examples to avoid in V1:

```txt
Why do you want to work in sales & trading?
How would you analyze today’s market environment?
What do you think about current equity valuations?
```

Reason: these questions are useful for interview practice, but too subjective and hard to correct simply in a learning app.

---

### 5.3 Riddles and behavioral questions

Riddles, behavioral questions, and experience-based questions may be useful for interview preparation, but they do not belong in the Finance de marché technical path.

They should be handled later as separate modules if needed.

---

## 6. Card data model recommendation

The existing system should evolve from a card-type logic to a question-type logic.

Recommended conceptual structure:

```ts
export type LearningCard = {
  id: string;

  // Core question structure
  questionType: QuestionType;
  question: string;
  shortAnswer: string;

  // Optional learning support
  explanation?: string;
  formula?: string;
  example?: string;
  commonMistake?: string;

  // Pedagogical metadata
  track: "finance-market" | "corporate-finance" | string;
  moduleId: string;
  lessonId: string;
  conceptId: string;

  // Filtering metadata
  topics: string[];
  skills: string[];

  // Progression metadata
  difficulty: 1 | 2 | 3 | 4 | 5;
  learningStage: 1 | 2 | 3 | 4 | 5;
  prerequisites?: string[];

  // Maintenance metadata
  version?: number;
  status?: "draft" | "ready" | "archived";
};
```

### Important field explanations

#### `questionType`

Defines the format of the question, not the theme.

Example:

```ts
questionType: "comparison"
```

#### `track`

Defines the learning path.

For this document:

```ts
track: "finance-market"
```

Finance de marché and finance d'entreprise must not be mixed accidentally.

#### `topics`

Used for future topic-based practice.

Examples:

```ts
topics: ["options", "volatility", "greeks"]
topics: ["bonds", "rates", "duration"]
topics: ["market-microstructure", "bid-ask", "liquidity"]
```

#### `skills`

Used to identify what the user is training.

Examples:

```ts
skills: ["definition"]
skills: ["calculation"]
skills: ["formula"]
skills: ["comparison"]
```

#### `difficulty`

How hard the question is.

#### `learningStage`

When the question should appear in the learning path.

Difficulty and learning stage are different.

A concept can be easy but should appear later because it requires prerequisites.

Example:

```ts
difficulty: 1,
learningStage: 3
```

---

## 7. Recommended card answer format

Each card should display a clear question on the front and a structured answer on the back.

### Front side

```txt
Question
```

Optional minimal context if needed.

### Back side

Recommended display order:

```txt
Short answer
Formula, if relevant
Explanation, if relevant
Example, if relevant
Common mistake, if relevant
```

The answer should be short enough to be read quickly. The app should avoid long course-like blocks.

Rule of thumb:

```txt
The user should be able to answer orally in 20 to 45 seconds.
```

For advanced cards, slightly longer answers are acceptable, but the main answer must remain clear.

---

## 8. Learning format

### 8.1 Main format

The main learning format is a guided path composed of short levels.

Inspired by Duolingo:

```txt
Track -> World/Module -> Lesson/Node -> Cards -> Checkpoint/Boss
```

Recommended terminology:

```txt
Track: Finance de marché
World/Module: Major theme
Lesson/Node: Small learning objective
Card: One clear question
Checkpoint/Boss: Review of previous lessons
```

---

### 8.2 Session length

A normal lesson should take:

```txt
5 to 10 minutes maximum
```

Recommended card counts:

```txt
Normal lesson: 6 to 10 questions
Reinforcement lesson: 8 to 12 questions
Checkpoint/Boss: 10 to 15 questions
```

Avoid long quizzes.

If a topic is large, split it into many small lessons instead of creating one large lesson.

---

### 8.3 Checkpoints / Boss levels

After several lessons, the user should face a checkpoint or boss.

A boss level should review previous lessons and validate that the user has retained the core concepts.

A boss level is not just a longer quiz. It should feel like a milestone.

Example:

```txt
Boss 1 — Market basics
- bid/ask/spread
- market order vs limit order
- market maker
- liquidity
- simple P&L
```

Recommended boss length:

```txt
10 to 15 questions maximum
```

---

### 8.4 Repetition of failed cards

The app already has a spaced repetition / SM-2-like mechanism.

This should be preserved.

When the user fails a card, the card should come back more often.

The user interface can remain simple:

```txt
Failed / Correct
```

But internally, the system may map these to spaced repetition quality values.

For example:

```txt
Failed -> quality 0
Correct -> quality 4
```

The exact algorithm can evolve later, but the principle must remain: failed or weak cards should reappear more often.

---

## 9. Main Finance de marché path — V1 structure

The V1 Finance de marché path should be organized by conceptual learning order, not by job category.

Do not use the following as the main path structure:

```txt
Sales & Trading
Structuring
Asset Management
Derivatives
```

Reason: these are job families or professional contexts, not beginner-friendly learning steps.

The user first needs the building blocks:

- market mechanics;
- return;
- P&L;
- asset classes;
- rates;
- risk;
- derivatives;
- options;
- structured products.

Only later should the app offer job-specific paths such as Sales & Trading, Structuring, Asset Management, or Risk.

---

# 10. Proposed V1 path: Finance de marché

## World 1 — Bases des marchés financiers

### Objective

Understand what a market is, how prices are quoted, and how basic trading mechanics work.

### Topics

- financial asset;
- market price;
- buyer / seller;
- bid;
- ask;
- spread;
- order book;
- market order;
- limit order;
- liquidity;
- volume;
- market maker;
- primary market;
- secondary market.

### Example questions

```txt
What is the difference between bid and ask?
What is the spread?
How does a market maker make money?
What is the difference between a market order and a limit order?
What is market liquidity?
What is the difference between primary and secondary market?
```

### Recommended question types

- definition;
- comparison;
- mechanism.

---

## World 2 — Rendement, performance and P&L

### Objective

Understand how to calculate gains, losses, returns, and simple trading P&L.

### Topics

- price change;
- percentage return;
- total return;
- P&L;
- long position;
- short position;
- notional;
- transaction costs;
- compounded performance;
- simple drawdown;
- basic mental calculation.

### Example questions

```txt
How do you calculate the P&L of a simple long equity position?
A stock rises from 80 to 92. What is the percentage return?
What is the difference between a long and a short position?
How do transaction costs affect net P&L?
What is total return?
```

### Recommended question types

- formula;
- quick-calculation;
- definition;
- comparison.

---

## World 3 — Grandes classes d'actifs

### Objective

Understand the main asset classes traded in financial markets.

### Topics

- equities;
- bonds;
- FX;
- commodities;
- indices;
- cash / money market;
- credit;
- listed real estate / REITs;
- derivatives as instruments;
- developed markets;
- emerging markets.

### Example questions

```txt
What is the fundamental difference between equities and bonds?
What is an index?
What is the difference between money market and bond market?
What generates return in FX?
How do commodities futures work in broad terms?
Are derivatives a traditional asset class?
```

### Recommended question types

- definition;
- comparison;
- mechanism.

---

## World 4 — Taux, obligations and yield curve

### Objective

Understand fixed income foundations and interest rate risk.

### Topics

- bond;
- coupon;
- principal;
- maturity;
- bond price;
- yield;
- yield to maturity;
- price-rate relationship;
- duration;
- modified duration;
- convexity;
- DV01;
- yield curve;
- parallel shift;
- steepening;
- flattening;
- government bond;
- corporate bond;
- credit spread;
- investment grade;
- high yield.

### Example questions

```txt
What is a bond?
What is the relationship between bond prices and interest rates?
What is duration?
What is DV01?
What is the difference between a government bond and a corporate bond?
What is a credit spread?
What is the difference between investment grade and high yield?
```

### Recommended question types

- definition;
- formula;
- mechanism;
- comparison;
- quick-calculation.

---

## World 5 — Risque de marché and risk management

### Objective

Understand the main risk concepts used in market finance.

### Topics

- market risk;
- credit risk;
- liquidity risk;
- operational risk;
- volatility;
- historical volatility;
- correlation;
- beta;
- diversification;
- hedge;
- basis risk;
- VaR;
- stress test;
- drawdown;
- tracking error;
- Sharpe ratio;
- information ratio.

### Example questions

```txt
What is the difference between market risk, credit risk and liquidity risk?
What is volatility?
What is beta?
What is Value at Risk?
What is basis risk in a hedge?
What is the Sharpe ratio?
What is the difference between tracking error and information ratio?
```

### Recommended question types

- definition;
- comparison;
- formula;
- mechanism;
- quick-calculation.

---

## World 6 — Dérivés fondamentaux

### Objective

Understand the main derivative instruments before going deeper into options and volatility.

### Topics

- derivative;
- underlying;
- forward;
- future;
- option;
- call;
- put;
- payoff;
- premium;
- strike;
- maturity;
- moneyness;
- put-call parity;
- FX forward;
- equity forward;
- interest rate swap;
- CDS.

### Example questions

```txt
What is a derivative product?
What is an underlying?
What is the difference between a forward and a future?
What is the payoff of a European call at maturity?
What is the payoff of a European put at maturity?
What is put-call parity?
How does a plain vanilla interest rate swap work?
What is a CDS?
```

### Recommended question types

- definition;
- comparison;
- formula;
- mechanism;
- quick-calculation.

---

## World 7 — Options, volatility and Greeks

### Objective

Understand option sensitivities and volatility concepts.

### Topics

- delta;
- gamma;
- vega;
- theta;
- rho, optionally later;
- delta hedging;
- gamma exposure;
- long gamma;
- short gamma;
- implied volatility;
- historical volatility;
- realized volatility;
- volatility smile;
- volatility skew;
- option time value;
- P&L of a delta-hedged option.

### Example questions

```txt
What does the delta of an option represent?
What does gamma represent?
What does vega represent?
What does theta represent?
What is the difference between historical volatility and implied volatility?
What is volatility skew?
How can you approximate the P&L of a delta-hedged option after a small move in the underlying?
```

### Recommended question types

- definition;
- comparison;
- formula;
- mechanism;
- quick-calculation.

---

## World 8 — Produits structurés and structuring

### Objective

Understand the basic logic of structured products after mastering the underlying concepts.

### Topics

- structured product;
- zero-coupon bond;
- capital protection;
- participation;
- autocallable;
- coupon conditionnel;
- barrier;
- discrete barrier;
- continuous barrier;
- worst-of basket;
- correlation;
- impact of rates;
- impact of implied volatility;
- mark-to-market;
- delta hedging of structured products;
- client risk / bank risk.

### Example questions

```txt
What is a structured product?
What are the basic building blocks of a capital-protected structured product?
How does a classic equity autocallable work?
What is the difference between a continuous and a discrete barrier?
Why does a worst-of basket often allow a higher coupon?
How does implied volatility affect the design of a structured product?
How can the directional exposure of an equity structured product be hedged?
```

### Recommended question types

- definition;
- comparison;
- mechanism;
- formula, occasionally.

---

## 11. Culture de marché positioning

Market culture is useful, but it should not be the main technical progression.

Recommended approach:

```txt
Main path: Finance de marché technical foundations
Bonus path: Culture de marché
```

Market culture can appear as bonus nodes between technical worlds.

Examples:

```txt
Bonus — 1929 crash
Bonus — Tulipomania
Bonus — Black Monday 1987
Bonus — 2008 crisis
Bonus — LTCM
Bonus — LIBOR scandal
Bonus — High-frequency trading
Bonus — Rogue traders
```

This makes the app more engaging without breaking the technical learning order.

For V1, market culture can be included lightly, but it should not delay building the technical core.

---

## 12. Future modes, not V1 priority

The following modes are useful but should not be implemented before the main path is clean.

### 12.1 Topic practice mode

The user chooses a topic:

```txt
Options
Rates
Bonds
Volatility
Derivatives
Structured products
Formulas
Quick calculations
```

This mode should use card metadata such as `topics`, `skills`, `difficulty`, and user review status.

---

### 12.2 Smart review mode

The user reviews cards due today based on spaced repetition.

```txt
Cards failed before
Cards due today
Weak concepts
```

This should build on the existing SM-2-like system.

---

### 12.3 Challenge mode

Short gamified sessions:

```txt
10 questions in 2 minutes
3 mistakes maximum
Formula sprint
Rates sprint
Options sprint
```

Not V1 priority.

---

### 12.4 Diagnostic mode

A short test to estimate the user’s level and suggest a starting point.

Not V1 priority.

---

### 12.5 Current news mode

A periodically updated mode about recent market news.

Not V1 priority because it requires maintenance and source management.

---

## 13. Pedagogical rules for writing cards

### 13.1 One card = one idea

Bad:

```txt
Explain equities, bonds, return, risk and how to build a portfolio.
```

Good:

```txt
What is an equity?
What is a bond?
What is the difference between an equity and a bond?
What is total return?
What is market risk?
```

---

### 13.2 Questions must be clear and answerable

Avoid vague questions.

Bad:

```txt
Talk about volatility.
```

Good:

```txt
What is the difference between historical volatility and implied volatility?
```

---

### 13.3 Avoid overly technical manual calculations in early levels

Allowed:

```txt
A stock goes from 80 to 92. What is the return?
```

Avoid in early V1:

```txt
Calibrate a volatility surface.
Compute a full option price by hand using Black-Scholes.
Run a Monte Carlo simulation.
```

The app can ask about formulas and calculations, but they must be feasible orally or mentally.

---

### 13.4 Do not label traps as traps

If a card targets a common misconception, write it as a normal question.

Instead of:

```txt
Trap: Is a bond always risk-free?
```

Use:

```txt
Is a bond always risk-free?
```

But internally, do not create a `trap` type.

---

### 13.5 Keep answers short

A good answer should be concise.

Recommended answer length:

```txt
Short answer: 1-3 sentences
Explanation: 2-5 sentences if needed
Example: optional
```

Avoid long textbook blocks.

---

## 14. Suggested level structure inside each world

Each world should be split into small lessons/nodes.

Example for World 1:

```txt
World 1 — Bases des marchés financiers

Lesson 1.1 — What is a financial market?
Lesson 1.2 — Prices, buyers and sellers
Lesson 1.3 — Bid, ask and spread
Lesson 1.4 — Order types
Lesson 1.5 — Liquidity and volume
Lesson 1.6 — Market makers
Boss 1 — Market basics review
```

Example for World 6:

```txt
World 6 — Dérivés fondamentaux

Lesson 6.1 — What is a derivative?
Lesson 6.2 — Forwards
Lesson 6.3 — Futures
Lesson 6.4 — Options: call and put
Lesson 6.5 — Payoff and premium
Lesson 6.6 — Put-call parity
Lesson 6.7 — Swaps and CDS introduction
Boss 6 — Derivatives foundations review
```

---

## 15. Implementation guidance for AI coding agent

### 15.1 Do not overbuild modes now

The first implementation should prioritize:

```txt
Main guided path
Short lessons
Clear question cards
Checkpoint/boss levels
Spaced repetition for failed cards
```

Do not implement advanced topic practice, news, diagnostic, or challenge modes unless explicitly requested.

---

### 15.2 Keep architecture clean

Business logic must not be placed in UI components.

Recommended architecture principle:

```txt
UI -> Services -> Repositories / Content
```

The UI should display cards and collect answers.

Services should decide:

- which cards are shown;
- how decks are built;
- how progress is updated;
- how spaced repetition is applied;
- how checkpoints are unlocked.

Content files should define:

- tracks;
- worlds/modules;
- lessons;
- cards;
- metadata.

---

### 15.3 Required content filtering logic

The system must prevent accidental mixing of tracks.

For the Finance de marché path:

```ts
card.track === "finance-market"
```

A finance d'entreprise card should not appear in the Finance de marché path unless it is intentionally shared and marked accordingly.

Possible future approach:

```ts
track: "shared"
allowedTracks: ["finance-market", "corporate-finance"]
```

But for V1, keep it simple.

---

### 15.4 Deck building logic

The deck builder should support at least:

```ts
buildLessonDeck(trackId, lessonId)
buildBossDeck(trackId, worldId)
buildReviewDeck(userId)
```

Future modes can later add:

```ts
buildTopicDeck(filters)
buildChallengeDeck(config)
buildDiagnosticDeck(trackId)
```

But these should not be prioritized now.

---

## 16. Summary of final decisions

### Keep

```txt
Clear question/answer cards
Short model answers
Definitions
Comparisons
Mechanisms
Formulas
Quick calculations
Market culture
Spaced repetition
Short lessons
Boss/checkpoints
Separate Finance de marché path
```

### Remove from V1

```txt
Intuition cards
Simple explanation cards as standalone cards
Trap cards
Open interview questions
Behavioral questions
Riddles
Current news in the main path
Long quizzes
Mixed finance-market / corporate-finance progression
```

### Main path V1

```txt
Track: Finance de marché

World 1 — Bases des marchés financiers
World 2 — Rendement, performance and P&L
World 3 — Grandes classes d'actifs
World 4 — Taux, obligations and yield curve
World 5 — Risque de marché and risk management
World 6 — Dérivés fondamentaux
World 7 — Options, volatility and Greeks
World 8 — Produits structurés and structuring
```

### Long-term extensions

```txt
Topic practice
Smart review
Challenge mode
Diagnostic mode
Current news mode
Job-specific paths: Sales & Trading, Structuring, Asset Management, Risk
```

---

## 17. Final principle

The app should first teach the user to answer clear finance questions in the right order.

Do not build a generic flashcard database.
Do not build an interview simulator too early.
Do not mix job categories with learning foundations.
Do not add too many modes before the main path works.

The first successful version is:

```txt
A short, gamified, progressive Finance de marché path with clear questions, clean answers, smart revision, and checkpoints.
```
