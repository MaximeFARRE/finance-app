import type { Track } from "@/lib/types";

export const corporateFinanceTrack: Track = {
  id: "corporate-finance",
  title: "Corporate Finance",
  description: "Structure du capital, valorisation DCF, M&A et LBO — les fondamentaux pour les entretiens IBD.",
  emoji: "🏦",
  color: "purple",
  lessons: [
    // -------------------------------------------------------------------------
    // Leçon 1 — Structure du capital
    // -------------------------------------------------------------------------
    {
      id: "cf-l1-structure-du-capital",
      slug: "structure-du-capital",
      title: "Structure du capital",
      description: "Debt vs Equity, WACC et théorèmes de Modigliani-Miller",
      estimatedMinutes: 10,
      cards: [
        {
          id: "cf-l1-sdc-def-dette-equity",
          type: "definition",
          front: "Qu'est-ce que la structure du capital ?",
          back: "Combinaison de dettes et de capitaux propres (equity) utilisée par une entreprise pour financer ses actifs. Résumé au passif du bilan : Dette financière + Capitaux propres = Actif total.",
          difficulty: 1,
          tags: ["structure du capital", "dette", "equity"],
          detail: `**Le passif du bilan simplifié :**
- **Capitaux propres (Equity)** : argent des actionnaires (capital + bénéfices cumulés non distribués)
- **Dette financière** : emprunts bancaires, obligations, crédit-bail

**Notion de levier financier :** plus la part de dette est élevée, plus l'entreprise est "leveraged". Un levier élevé amplifie les rendements pour les actionnaires… et les risques.

**Ratio clé :** Debt/Equity (D/E) ou Leverage ratio = Dette nette / EBITDA
- D/E < 1 : structure prudente
- D/E de 3-6× en LBO : structure très leveraged`,
        },
        {
          id: "cf-l1-sdc-def-wacc",
          type: "definition",
          front: "Qu'est-ce que le WACC ?",
          back: "Weighted Average Cost of Capital : coût moyen pondéré du capital. C'est le taux de rendement minimum exigé par l'ensemble des apporteurs de fonds (actionnaires + créanciers). Utilisé comme taux d'actualisation dans le DCF.",
          difficulty: 1,
          tags: ["WACC", "coût du capital"],
          detail: `**Intuition du WACC :**
Le WACC répond à la question : "Quel rendement minimum l'entreprise doit-elle générer pour satisfaire tous ses financeurs ?"

- Les actionnaires exigent un rendement élevé (risque élevé)
- Les créanciers exigent un coupon plus faible (priorité de remboursement)
- Le WACC est la moyenne pondérée de ces exigences

**Si l'entreprise génère un ROIC (Return on Invested Capital) > WACC :** elle crée de la valeur
**Si ROIC < WACC :** elle détruit de la valeur même si elle est bénéficiaire`,
        },
        {
          id: "cf-l1-sdc-formula-wacc",
          type: "formula",
          front: "Formule du WACC",
          back: "WACC = (E/V) × Re + (D/V) × Rd × (1 − T)\n\nE = Capitaux propres, D = Dette, V = E + D\nRe = Coût des capitaux propres (CAPM)\nRd = Coût de la dette, T = Taux d'imposition",
          difficulty: 2,
          tags: ["WACC", "formule", "calcul"],
          detail: `**Calcul étape par étape :**

**1. Coût de la dette (Rd) :**
= Taux d'intérêt moyen sur la dette financière
Après impôt : Rd × (1 − T) — la dette est déductible fiscalement

**2. Coût des capitaux propres (Re) via CAPM :**
Re = Rf + β × (Rm − Rf)
Rf = taux sans risque (~4 % en 2024), β = beta de l'action, (Rm − Rf) = prime de risque marché (~5-6 %)

**3. Pondérations (E/V et D/V) :**
Utiliser les valeurs de marché (pas comptables)

**Exemple :** E = 600 M€, D = 400 M€, Re = 10 %, Rd = 5 %, T = 30 %
WACC = (600/1000) × 10 % + (400/1000) × 5 % × (1 − 30 %)
= 6 % + 1,4 % = **7,4 %**`,
        },
        {
          id: "cf-l1-sdc-intuition-levier",
          type: "intuition",
          front: "Pourquoi la dette est-elle moins chère que l'equity ?",
          back: "Deux raisons : 1) les créanciers ont une priorité de remboursement (moins de risque → moins de rendement exigé) ; 2) les intérêts sont déductibles fiscalement (avantage fiscal de la dette).",
          difficulty: 1,
          tags: ["dette", "equity", "levier"],
          detail: `**L'avantage fiscal de la dette (tax shield) :**
Si une entreprise paie 100 € d'intérêts avec un IS à 30 %, elle économise 30 € d'impôts.
→ Le coût réel de la dette n'est pas Rd mais Rd × (1 − T)

**Exemple :** dette à 6 %, IS 30 % → coût après impôt = 6 % × 70 % = **4,2 %**
Vs coût de l'equity qui pourrait être 10-12 %

**Mais attention :** plus de dette = plus de risque de défaut = les créanciers et actionnaires exigent plus. L'avantage fiscal a une limite.

**Arbitrage :** les entreprises cherchent une structure "optimale" qui minimise le WACC en équilibrant l'avantage fiscal et les coûts de détresse financière.`,
        },
        {
          id: "cf-l1-sdc-example-structure",
          type: "example",
          front: "Structures du capital selon les secteurs",
          back: "Utilities (EDF) : forte dette, flux stables → D/E élevé. Tech (Alphabet) : peu de dette, flux volatils → D/E faible. LBO (Private Equity) : dette maximale volontairement pour maximiser l'effet levier sur l'equity.",
          difficulty: 2,
          tags: ["structure du capital", "secteur", "LBO"],
          detail: `**Benchmarks D/E par secteur :**

| Secteur | Dette nette/EBITDA | Raison |
|---------|-------------------|--------|
| Utilities | 4-6× | Flux très prévisibles, actifs réels |
| Télécom | 2-3× | Flux récurrents (abonnements) |
| Industriel | 1-2× | Cyclicité modérée |
| Tech | 0-0,5× | Flux imprévisibles, croissance |
| LBO | 4-7× | Structure volontairement leveraged |
| Banques | N/A (réglementaire) | Ratio Tier 1 capital à la place |

**Intuition :** plus les flux sont prévisibles et stables, plus l'entreprise peut supporter une dette élevée sans risquer la détresse financière.`,
        },
        {
          id: "cf-l1-sdc-formula-mm",
          type: "formula",
          front: "Modigliani-Miller : théorème I (sans impôt)",
          back: "La valeur d'une entreprise est indépendante de sa structure du capital dans un monde sans impôt, sans coûts de transaction et avec information parfaite.\n\nV(levier) = V(sans levier)",
          difficulty: 2,
          tags: ["Modigliani-Miller", "structure du capital"],
          detail: `**Modigliani-Miller (1958) — ce que ça signifie vraiment :**

Dans un monde parfait (aucune friction), si vous prenez 1 € de dette pour remplacer 1 € d'equity, la valeur totale de l'entreprise ne change pas. Vous avez juste réorganisé le gâteau entre créanciers et actionnaires.

**Pourquoi c'est important ?**
Parce que dans la réalité, les marchés ne sont PAS parfaits → les frictions (impôts, coûts de faillite, asymétrie d'information) déterminent la structure optimale.

**Théorème II (avec impôt) :** quand on intègre le tax shield de la dette :
V(levier) = V(sans levier) + T × D (PV du tax shield)
→ La dette crée de la valeur via l'avantage fiscal, mais seulement jusqu'à un certain point.`,
        },
        {
          id: "cf-l1-sdc-trap",
          type: "trap",
          front: "⚠️ Piège : une entreprise peut-elle toujours s'endetter davantage pour augmenter sa valeur ?",
          back: "Non — au-delà d'un certain niveau, les coûts de détresse financière (risque de défaut, perte de clients/fournisseurs, coûts juridiques) surpassent l'avantage fiscal de la dette. Il existe une structure optimale.",
          difficulty: 2,
          tags: ["dette", "structure du capital", "défaut"],
          detail: `**La théorie du Trade-off :**
Valeur optimale = V(sans levier) + PV(tax shield) − PV(coûts de détresse)

**Les coûts de détresse financière :**
- **Directs** : frais d'avocat, de restructuration (5-15 % de la valeur de l'actif)
- **Indirects** : perte de clients (peur de faillite), départ des bons employés, perte de conditions fournisseurs

**Signal : quand la dette devient trop élevée :**
- Notation dégradée → coût de la dette augmente
- Investissements sous-optimaux (underinvestment problem)
- Perte de flexibilité stratégique

**En entretien :** "La structure optimale maximise la valeur de l'entreprise en équilibrant l'avantage fiscal de la dette et les coûts de détresse."`,
        },
        {
          id: "cf-l1-sdc-iq",
          type: "interview-question",
          front: "Comment une entreprise choisit-elle sa structure du capital ? Quels facteurs prend-elle en compte ?",
          back: "Trade-off entre avantage fiscal de la dette et coûts de détresse financière. Facteurs : prévisibilité des flux, secteur, notation cible, flexibilité stratégique, signaling aux marchés.",
          difficulty: 3,
          tags: ["structure du capital", "WACC"],
          detail: `**Structure de réponse (3 min) :**
1. Modigliani-Miller comme point de départ théorique (monde parfait)
2. Dans la réalité : trois grandes théories
   - **Trade-off** : optimiser entre tax shield et coûts de détresse
   - **Pecking order** : financement interne > dette > equity (asymétrie d'information)
   - **Market timing** : émettre de l'equity quand le cours est élevé
3. Facteurs pratiques : secteur, cyclicité des flux, notation visée, covenants bancaires, politique dividende
4. Exemple concret : tech qui lève de l'equity vs utility qui émet de la dette

**Ce que le recruteur veut entendre :** connaissance de MM et des théories modernes, capacité à appliquer à des cas concrets.`,
        },
        {
          id: "cf-l1-sdc-ma",
          type: "model-answer",
          front: "Réponse : choix de la structure du capital",
          back: "\"Modigliani-Miller nous dit qu'en marchés parfaits la structure est neutre. Dans la réalité, les entreprises arbitrent entre l'avantage fiscal de la dette (intérêts déductibles) et les coûts de détresse (risque de défaut). La structure optimale maximise la valeur en équilibrant ces deux forces. En pratique, on regarde aussi la prévisibilité des flux, la notation visée, et les pratiques du secteur.\"",
          difficulty: 3,
          tags: ["structure du capital", "WACC"],
          detail: `**Points bonus :**
- Citer la **théorie du pecking order** (Myers & Majluf) : les managers préfèrent le financement interne (moins d'asymétrie d'information), puis la dette, puis l'equity en dernier recours
- La notion de **target leverage ratio** : beaucoup d'entreprises ont un ratio cible et s'y ajustent progressivement
- L'impact sur le **WACC** : la structure optimale est celle qui minimise le WACC
- Les **covenants** : les clauses des contrats de dette limitent parfois la capacité à s'endetter davantage`,
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Leçon 2 — Valorisation DCF
    // -------------------------------------------------------------------------
    {
      id: "cf-l2-valorisation-dcf",
      slug: "valorisation-dcf",
      title: "Valorisation DCF",
      description: "Free Cash Flow, WACC, valeur terminale et analyse de sensibilité",
      estimatedMinutes: 12,
      cards: [
        {
          id: "cf-l2-dcf-def",
          type: "definition",
          front: "Qu'est-ce qu'un DCF ?",
          back: "Discounted Cash Flow : méthode de valorisation intrinsèque qui actualise les flux de trésorerie futurs (FCF) au taux d'actualisation (WACC). Valeur de l'entreprise = Σ [FCF_t / (1+WACC)^t] + Valeur terminale.",
          difficulty: 1,
          tags: ["DCF", "valorisation"],
          detail: `**Pourquoi le DCF est la méthode de référence :**
- C'est la seule méthode réellement intrinsèque : elle valorise l'entreprise sur ses propres flux futurs, indépendamment du marché
- Base théorique solide (VAN = Valeur Actuelle Nette)
- Oblige à modéliser explicitement les hypothèses de croissance et de rentabilité

**Limites du DCF :**
- Très sensible aux hypothèses (surtout le taux de croissance terminal et le WACC)
- Nécessite une visibilité sur les flux futurs (difficile pour les start-ups, entreprises cycliques)
- "Garbage in, garbage out" : un DCF peut justifier n'importe quelle valorisation avec les bonnes hypothèses

**En entretien :** toujours accompagner un DCF d'une analyse de sensibilité et d'une triangulation avec les multiples.`,
        },
        {
          id: "cf-l2-dcf-def-fcf",
          type: "definition",
          front: "Qu'est-ce que le Free Cash Flow (FCF) ?",
          back: "Flux de trésorerie disponible après investissements. FCF = EBITDA − Impôts − Variation BFR − Capex. C'est le cash réellement généré par l'activité opérationnelle après avoir financé la croissance.",
          difficulty: 1,
          tags: ["FCF", "free cash flow", "DCF"],
          detail: `**Du résultat comptable au FCF :**

EBIT (résultat opérationnel)
− Impôts sur l'EBIT (NOPAT = EBIT × (1 − T))
+ Dotations aux amortissements (non-cash)
− Variation du BFR (Besoin en Fonds de Roulement)
− Capex (investissements nets)
= **Free Cash Flow (FCFF)**

**Différence FCFF vs FCFE :**
- **FCFF** (Free Cash Flow to the Firm) : flux disponible pour tous les apporteurs de fonds → actualisé au WACC
- **FCFE** (Free Cash Flow to Equity) : flux disponible pour les actionnaires seulement (après paiement de la dette) → actualisé au coût de l'equity (Re)

**En pratique :** le FCFF (ou "Unlevered FCF") est le plus utilisé en corporate finance.`,
        },
        {
          id: "cf-l2-dcf-formula-vt",
          type: "formula",
          front: "Formule de la valeur terminale (Gordon-Shapiro)",
          back: "VT = FCF_n+1 / (WACC − g)\n\nOù g = taux de croissance à l'infini (perpetuity growth rate)\nFCF_n+1 = FCF de la première année post-horizon d'explicite",
          difficulty: 2,
          tags: ["valeur terminale", "DCF", "Gordon-Shapiro"],
          detail: `**La valeur terminale représente 60-80 % de la valeur totale dans un DCF !**
C'est pourquoi ses hypothèses sont critiques.

**Choix du taux g :**
- Doit être inférieur au WACC (sinon la formule explose)
- En pratique : entre PIB nominal de long terme (~3-4 %) et l'inflation (~2 %)
- Pour la plupart des entreprises en Europe : 2-3 %

**Méthode alternative — Valeur terminale par multiple de sortie :**
VT = EV/EBITDA_sortie × EBITDA_n

Cette méthode est moins "pure" mais plus pragmatique car ancrée dans les valorisations de marché.

**Valeur actuelle de VT :** VT / (1 + WACC)^n → La VT actualisée représente souvent 60-80 % de l'EV totale. C'est le talon d'Achille du DCF.`,
        },
        {
          id: "cf-l2-dcf-intuition-sensibilite",
          type: "intuition",
          front: "Pourquoi le DCF est-il si sensible aux hypothèses ?",
          back: "Une variation de 0,5 % du WACC ou du taux de croissance terminal peut changer la valorisation de 20-30 %. La valeur terminale pèse 60-80 % du total — et elle est construite sur deux hypothèses fragiles.",
          difficulty: 2,
          tags: ["DCF", "sensibilité", "valorisation"],
          detail: `**Exercice de sensibilité typique (à connaître) :**

Pour une entreprise avec FCF = 100 M€, WACC = 8 %, g = 2,5 % :
VT = 100 / (8 % − 2,5 %) = 100 / 5,5 % = **1 818 M€**

Si WACC monte à 8,5 % (+ 50 bp) :
VT = 100 / 6 % = 1 667 M€ → **-8,3 %**

Si g baisse à 2 % (−50 bp) :
VT = 100 / 6 % = 1 667 M€ → **-8,3 %**

**En entretien :** "Un DCF sans analyse de sensibilité est incomplet. Je construis toujours un tableau WACC × g avec les valorisations correspondantes pour identifier la fourchette de valeur."`,
        },
        {
          id: "cf-l2-dcf-example-etapes",
          type: "example",
          front: "DCF étape par étape : exemple simplifié",
          back: "Entreprise : 5 ans de projection, FCF croissant de 100 à 150 M€, WACC 9 %, g terminal 2,5 %. → Somme PV(FCF) ≈ 550 M€ + PV(VT) ≈ 900 M€ → EV ≈ 1 450 M€.",
          difficulty: 2,
          tags: ["DCF", "exemple", "calcul"],
          detail: `**Construction du DCF (5 ans + VT) :**

| Année | FCF (M€) | PV Factor (9 %) | PV (M€) |
|-------|----------|-----------------|---------|
| 1 | 100 | 0,917 | 91,7 |
| 2 | 110 | 0,842 | 92,6 |
| 3 | 122 | 0,772 | 94,2 |
| 4 | 135 | 0,708 | 95,6 |
| 5 | 150 | 0,650 | 97,5 |
| **Σ FCF** | | | **571 M€** |

**Valeur terminale :**
VT = 150 × (1 + 2,5 %) / (9 % − 2,5 %) = 153,75 / 6,5 % = **2 365 M€**
PV(VT) = 2 365 / (1,09)^5 = **1 537 M€**

**Enterprise Value = 571 + 1 537 = 2 108 M€**

→ La VT représente 73 % de l'EV totale !`,
        },
        {
          id: "cf-l2-dcf-trap",
          type: "trap",
          front: "⚠️ Piège : EV = Valeur des actions de l'entreprise ?",
          back: "Non — l'EV inclut la dette. Pour obtenir la valeur des capitaux propres (Equity Value) : Equity Value = EV − Dette nette. Ne jamais confondre les deux en entretien.",
          difficulty: 2,
          tags: ["DCF", "EV", "equity value"],
          detail: `**Du DCF à la valeur de l'action :**

1. **Enterprise Value (EV)** : valeur pour tous les financeurs (actionnaires + créanciers)
   = Somme des FCF actualisés + PV(Valeur terminale)

2. **Bridge EV → Equity Value :**
   Equity Value = EV − Dette financière nette + Actifs non-opérationnels

3. **Valeur par action :**
   Prix par action = Equity Value / Nombre d'actions diluées

**Exemple :**
EV = 2 000 M€
− Dette brute : 800 M€
+ Trésorerie : 200 M€
= **Equity Value = 1 400 M€**
/ 100 M d'actions = **14 € par action**

**Erreur fréquente :** oublier de soustraire les minoritaires, les dettes de pension, les options dilutives.`,
        },
        {
          id: "cf-l2-dcf-iq",
          type: "interview-question",
          front: "Quels sont les facteurs qui font le plus varier un DCF ? Comment les gérez-vous ?",
          back: "Taux de croissance terminal (g) et WACC dominent la valorisation via la valeur terminale (60-80 % de l'EV). Gestion : analyse de sensibilité en table à deux entrées, triangulation avec multiples de comparables.",
          difficulty: 3,
          tags: ["DCF", "sensibilité", "valorisation"],
          detail: `**Structure de réponse (3 min) :**
1. Identifier les deux drivers principaux : WACC et taux g (valeur terminale)
2. Quantifier l'impact : une variation de ±50 bp sur chacun peut changer l'EV de 15-25 %
3. Méthodes de gestion :
   - Table de sensibilité WACC × g (2D)
   - Analyse de scénarios (bull/base/bear)
   - Triangulation avec EV/EBITDA de comparables
4. Nuancer : la croissance des FCF sur la période explicite compte aussi (mais moins que la VT)
5. Conclure : "Le DCF donne une fourchette, pas un chiffre unique"

**Ce que le recruteur cherche :** maturité analytique — vous savez qu'un modèle DCF est toujours incertain et vous savez comment le communiquer.`,
        },
        {
          id: "cf-l2-dcf-ma",
          type: "model-answer",
          front: "Réponse : facteurs de variation du DCF",
          back: "\"Les deux facteurs les plus impactants sont le WACC et le taux de croissance terminal, car ils déterminent la valeur terminale qui pèse 60-80 % de l'EV. Une variation de 50 bp sur le WACC peut changer la valorisation de 15-20 %. Je gère ça avec une table de sensibilité et en triangulant avec les multiples de comparables cotés pour valider l'ordre de grandeur.\"",
          difficulty: 3,
          tags: ["DCF", "valorisation"],
          detail: `**Points bonus :**
- Mentionner la **croissance des FCF** sur la période explicite comme troisième facteur
- Parler de l'**exit multiple method** comme alternative à Gordon-Shapiro pour la VT
- Souligner que le DCF est particulièrement sensible pour les entreprises en forte croissance où la majorité de la valeur est dans les années lointaines
- En pratique : "Je construis toujours 3 scénarios (bear/base/bull) avec des hypothèses cohérentes entre elles, pas juste en changeant le WACC"`,
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Leçon 3 — Multiples de valorisation
    // -------------------------------------------------------------------------
    {
      id: "cf-l3-comparables",
      slug: "comparables",
      title: "Multiples de valorisation",
      description: "EV/EBITDA, P/E, construction du peer group et limites des comparables",
      estimatedMinutes: 10,
      cards: [
        {
          id: "cf-l3-comp-def-multiples",
          type: "definition",
          front: "Qu'est-ce qu'une valorisation par multiples ?",
          back: "Méthode relative qui valorise une entreprise en appliquant les multiples observés sur des entreprises comparables (peer group). Valeur = Multiple × Métrique financière. Complémentaire au DCF.",
          difficulty: 1,
          tags: ["multiples", "comparables", "valorisation"],
          detail: `**Logique des multiples :**
Si des entreprises similaires se négocient à 10× l'EBITDA, et que notre cible a un EBITDA de 100 M€, alors sa valeur ≈ 10 × 100 = **1 000 M€**

**Types de multiples :**
- **EV-based** (Enterprise Value) : EV/EBITDA, EV/EBIT, EV/Revenus → valorisent toute l'entreprise
- **Equity-based** (Price) : P/E, Price/Book, Price/FCF → valorisent seulement les capitaux propres
- **Sectoriels spécifiques** : EV/Abonnés (telco), Price/NAV (immobilier), EV/Réserves (pétrolier)

**Avantage principal :** ancre la valorisation dans la réalité du marché. Rapide à calculer. Accepté par toutes les parties.
**Inconvénient :** comparaison imparfaite, dépend de la qualité du peer group, "marché" peut lui-même être mal valorisé.`,
        },
        {
          id: "cf-l3-comp-formula-ev-ebitda",
          type: "formula",
          front: "EV/EBITDA : le multiple roi du M&A",
          back: "EV/EBITDA = Enterprise Value / EBITDA\n\nMesure combien l'acheteur paie pour chaque euro d'EBITDA généré. Neutre vis-à-vis de la structure du capital et des amortissements.",
          difficulty: 2,
          tags: ["EV/EBITDA", "multiple", "EBITDA"],
          detail: `**Pourquoi EV/EBITDA est préféré au P/E en M&A :**
1. **Neutralité de la structure du capital :** EV intègre la dette → on compare "la même chose" entre une entreprise endettée et une sans dette
2. **Neutralité comptable :** l'EBITDA exclut amortissements (D&A) et impôts → moins sensible aux choix comptables
3. **Proxy du FCF :** l'EBITDA approxime la capacité de génération de cash avant capex

**Benchmarks EV/EBITDA par secteur (2024) :**

| Secteur | EV/EBITDA typique |
|---------|------------------|
| SaaS / Tech | 15-30× |
| Biens de consommation | 12-18× |
| Industriel | 8-12× |
| Distribution | 6-10× |
| Utilities | 8-12× |
| LBO (prix d'entrée) | 6-10× |`,
        },
        {
          id: "cf-l3-comp-formula-pe",
          type: "formula",
          front: "Price-to-Earnings (P/E) : le multiple des actions",
          back: "P/E = Cours de l'action / Bénéfice par action (EPS)\n\nOu : Market Cap / Bénéfice net\n\nInterprétation : combien l'investisseur paie pour 1 € de bénéfice annuel.",
          difficulty: 1,
          tags: ["P/E", "multiple", "equity"],
          detail: `**Lecture du P/E :**
- P/E de 20 : l'investisseur paie 20 € pour 1 € de bénéfice → en 20 ans il "récupère" sa mise (si bénéfices stables)
- Inverse du P/E = "earnings yield" : P/E 20 → yield de 5 %

**Benchmarks P/E :**
- S&P 500 historique : 15-18× (moyenne long terme)
- S&P 500 2024 : ~22× (élevé historiquement)
- Actions value/cycliques : 8-12×
- Growth stocks (tech) : 30-50×+

**Limites du P/E :**
- Sensible aux choix comptables (résultat net peut être manipulé)
- Non-pertinent si résultat négatif ou exceptionnel
- Ignore la structure du capital (une entreprise très endettée peut avoir un P/E apparent attractif)
- Préférer EV/EBITDA ou EV/EBIT pour les comparaisons inter-entreprises`,
        },
        {
          id: "cf-l3-comp-intuition-peer-group",
          type: "intuition",
          front: "Comment construire un bon peer group ?",
          back: "Le peer group doit regrouper des entreprises comparables sur : secteur d'activité, zone géographique, taille (revenus, capitalisation), phase de croissance, marges et profil de risque.",
          difficulty: 2,
          tags: ["peer group", "comparables"],
          detail: `**Critères de sélection d'un peer group :**

**Obligatoires :**
1. Même secteur d'activité (SIC code ou GICS)
2. Zone géographique similaire (biais de marché local)
3. Taille comparable (éviter de mélanger une €10 Mds cap avec une €100 Mds cap)

**Importants :**
4. Profil de croissance similaire (enterprise growing vs mature)
5. Marges comparables (une société premium ne se compare pas à une discount)
6. Cyclicité et exposition géographique

**En pratique :** un peer group de 5-10 entreprises est idéal. Trop large dilue les comparaisons, trop petit n'est pas représentatif.

**Ajustements :** si une comparable a une structure de capital très différente, recalculer son EV/EBITDA sur une base "normalize" (ex : retirer les actifs non-opérationnels).`,
        },
        {
          id: "cf-l3-comp-example-ma",
          type: "example",
          front: "Application en M&A : deal LVMH / Tiffany",
          back: "LVMH a acquis Tiffany en 2021 pour 15,8 Mds $ (EV/EBITDA ~17×, P/E ~50×). Premium de ~37 % vs cours non-affecté. Benchmark vs Cartier (Richemont), Bulgari — multiples du luxe 15-20× EBITDA.",
          difficulty: 2,
          tags: ["M&A", "multiples", "luxe"],
          detail: `**Analyse des multiples de la transaction :**

| Métrique | Tiffany standalone | Prix payé par LVMH |
|----------|-------------------|-------------------|
| EV/EBITDA | ~12-14× | ~17× |
| P/E LTM | ~32× | ~50× |
| EV/Revenus | ~3× | ~4× |

**Le premium de contrôle (~37 %)** se justifie par :
- Synergies de distribution (réseau LVMH mondial)
- Amélioration des marges post-acquisition
- Accès au segment joaillerie de luxe en croissance

**Leçon :** les multiples d'une transaction M&A sont toujours supérieurs aux multiples de trading (prime de contrôle + synergies). L'analyste doit construire les deux referentiels.`,
        },
        {
          id: "cf-l3-comp-trap",
          type: "trap",
          front: "⚠️ Piège : un multiple bas signifie-t-il toujours une opportunité ?",
          back: "Non — un multiple bas peut refléter une qualité inférieure, un risque de croissance plus élevé ou une détérioration structurelle. Il faut comprendre pourquoi le marché paie moins.",
          difficulty: 2,
          tags: ["multiples", "valorisation", "comparables"],
          detail: `**Les raisons légitimes d'un multiple bas :**
- Croissance plus faible (DCF justifie un multiple plus bas)
- Marges opérationnelles inférieures
- Risque de disruption sectorielle
- Gouvernance problématique
- Exposition géographique risquée

**"Value trap" :** une action qui semble bon marché (P/E bas) mais dont les bénéfices continuent de décliner. L'apparent "bon marché" masque une détérioration fondamentale.

**L'analyse juste :** pour toute anomalie de multiple, demandez "pourquoi le marché paie-t-il moins ici ?" avant de conclure à une opportunité. Si vous ne trouvez pas de raison, soit c'est une vraie opportunité, soit vous avez une information manquante.

**En entretien :** on attend que vous challengiez les multiples, pas que vous les acceptiez aveuglément.`,
        },
        {
          id: "cf-l3-comp-iq",
          type: "interview-question",
          front: "Quelles sont les limites des multiples de valorisation et comment y remédier ?",
          back: "Trois limites principales : 1) comparaison imparfaite (pas deux entreprises identiques), 2) marchés peuvent être globalement mal valorisés, 3) multiples historiques vs forward. Remède : triangulation DCF + trading comps + transaction comps.",
          difficulty: 3,
          tags: ["multiples", "valorisation", "comparables"],
          detail: `**Structure de réponse (2-3 min) :**

**Limites :**
1. **"Comparables" jamais vraiment comparables** : différences de croissance, marges, géographie, management
2. **Dépend de l'état du marché** : en pleine bulle, tous les comparables sont surévalués → multiples "relativement corrects" mais absolument trop chers
3. **Multiples historiques vs forward** : utiliser le NTM (next twelve months) EBITDA pour éviter un effet saisonnalité ou one-off
4. **Distorsions sectorielles** : M&A récents dans le secteur peuvent avoir tiré les multiples artificiellement

**Solutions :**
- Toujours croiser 3 méthodes (DCF + trading comps + transaction comps)
- Ajuster les multiples pour les différences identifiées (régression des multiples sur la croissance)
- Utiliser les multiples forward (NTM) plutôt que LTM`,
        },
        {
          id: "cf-l3-comp-ma",
          type: "model-answer",
          front: "Réponse : limites des multiples",
          back: "\"Les multiples sont relatifs — si tout le secteur est surévalué, votre comparable l'est aussi. De plus, deux entreprises du même secteur peuvent avoir des profils de croissance et de risque très différents, rendant la comparaison trompeuse. Je compense ces limites en croisant toujours DCF, trading comps et transaction comps, et en utilisant des multiples forward (NTM) pour atténuer les effets one-off.\"",
          difficulty: 3,
          tags: ["multiples", "valorisation"],
          detail: `**Triangulation des trois méthodes :**

| Méthode | Ancrage | Avantage |
|---------|---------|---------|
| DCF | Intrinsèque | Indépendant du marché |
| Trading comps | Marché coté | Liquide, temps réel |
| Transaction comps | Deals récents | Inclut prime de contrôle |

**Règle pratique :** si DCF et comps sont cohérents → forte conviction. S'ils divergent de >30 %, cherchez pourquoi avant de conclure.

**Présentation des résultats (football field) :** représenter les fourchettes de chaque méthode sur un graphique — la zone de chevauchement est la "fairness zone".`,
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Leçon 4 — Fusions-Acquisitions (M&A)
    // -------------------------------------------------------------------------
    {
      id: "cf-l4-fusions-acquisitions",
      slug: "fusions-acquisitions",
      title: "Fusions & Acquisitions",
      description: "Processus M&A, synergies, accrétion/dilution et évaluation des deals",
      estimatedMinutes: 11,
      cards: [
        {
          id: "cf-l4-ma-def",
          type: "definition",
          front: "Qu'est-ce qu'une fusion-acquisition (M&A) ?",
          back: "Transaction par laquelle une entreprise (acquéreur) prend le contrôle d'une autre (cible). Fusion = les deux entités fusionnent en une. Acquisition = l'acquéreur achète 100 % ou une participation de contrôle.",
          difficulty: 1,
          tags: ["M&A", "acquisition", "fusion"],
          detail: `**Les différentes structures de transaction :**
- **Acquisition 100 %** : l'acquéreur achète la totalité du capital de la cible
- **Acquisition de contrôle** : >50 % du capital → consolidation comptable
- **Prise de participation minoritaire** : <50 %, pas de consolidation (equity method)
- **Fusion (merger)** : les deux entités se combinent en une nouvelle société

**Motivations stratégiques :**
- Croissance externe (vs organique)
- Synergies de coûts et de revenus
- Acquisition de technologie ou de talent
- Consolidation sectorielle
- Défensif : se protéger d'une acquisition hostile

**Types de M&A :**
- **Horizontal** : deux concurrents (ex: Total + Elf)
- **Vertical** : amont ou aval de la chaîne de valeur
- **Conglomérat** : secteurs non liés`,
        },
        {
          id: "cf-l4-ma-def-synergies",
          type: "definition",
          front: "Qu'est-ce que les synergies dans un deal M&A ?",
          back: "Valeur créée par la combinaison de deux entreprises au-delà de leur valeur standalone respective. Synergies de coûts (réductions, économies d'échelle) et de revenus (cross-selling, nouveaux marchés).",
          difficulty: 1,
          tags: ["synergies", "M&A"],
          detail: `**Types de synergies :**

**Synergies de coûts (plus certaines, valorisées à la valeur pleine) :**
- Réductions des doublons (fonctions support : finance, RH, IT)
- Économies d'achats (pouvoir de négociation accru)
- Optimisation des sites de production
- Mutualisation des réseaux de distribution

**Synergies de revenus (moins certaines, valorisées avec décote) :**
- Cross-selling (vendre les produits de la cible aux clients de l'acquéreur et vice-versa)
- Accès à de nouveaux marchés géographiques
- Combinaison de produits complémentaires

**Règle pratique :** en entretien, toujours distinguer les deux types et preciser que les synergies de revenus sont moins certaines → valorisées avec une décote de 30-50 %.

**NPV des synergies :** les synergies annuelles projetées sont actualisées au WACC → contribuent à justifier la prime de contrôle.`,
        },
        {
          id: "cf-l4-ma-intuition-premium",
          type: "intuition",
          front: "Pourquoi l'acquéreur paie-t-il une prime sur le cours ?",
          back: "La prime de contrôle (20-40 % en moyenne) rémunère : la valeur des synergies, le fait de payer pour le contrôle (capacité à diriger), et la compétition entre acquéreurs potentiels lors du processus.",
          difficulty: 1,
          tags: ["M&A", "premium de contrôle"],
          detail: `**Décomposition de la prime de contrôle :**

Prix payé = Valeur standalone cible + PV(synergies) − Coûts d'intégration + Prime de contrôle pure

**La prime reflète :**
1. **Les synergies** : l'acquéreur paie pour la valeur qu'il va créer
2. **Le contrôle** : capacité à changer le management, la stratégie, les dividendes
3. **La compétition** : en processus dual-track, les acheteurs se surenchèrent

**Données historiques :** prime médiane en M&A ~25-35 % selon les années et les secteurs

**Question clé :** l'acquéreur "overpaye" s'il donne plus que PV(synergies) + Valeur standalone. C'est le "winner's curse" — le risque de surpayer dans une compétition.`,
        },
        {
          id: "cf-l4-ma-formula-accretion-dilution",
          type: "formula",
          front: "Analyse accrétion/dilution du BPA",
          back: "Un deal est accrétif si l'EPS (BPA) de l'acquéreur augmente post-deal. Dilutif si l'EPS baisse.\n\nAccrétion = (Bénéfice cible + Synergies − Coût de financement) / Nouvelles actions émises",
          difficulty: 2,
          tags: ["accrétion", "dilution", "EPS", "M&A"],
          detail: `**Pourquoi l'accrétion/dilution est important :**
- Mesure l'impact immédiat du deal sur les actionnaires existants
- Les analystes et médias regardent d'abord si un deal est accrétif

**Mécanisme simplifié :**
L'acquéreur paie 1 000 M€ pour une entreprise qui gagne 60 M€/an.
Si financé par dette à 4 % : coût d'intérêt = 40 M€/an → bénéfice additionnel = 60 − 40 = 20 M€
Si les synergies ajoutent 15 M€ → bénéfice additionnel total = 35 M€
Impact sur l'EPS = 35 M€ / nombre d'actions → accrétif si positif

**Financement par actions (scrip deal) :**
L'acquéreur émet de nouvelles actions pour payer → dilution du nombre d'actions. Le deal est accrétif si le bénéfice additionnel par action dépasse la dilution.

**Règle rapide :** un deal financé par dette à faible coût est généralement plus accrétif qu'un deal financé par actions.`,
        },
        {
          id: "cf-l4-ma-example-processus",
          type: "example",
          front: "Processus M&A : sell-side advisor perspective",
          back: "1. Mandat → 2. Teaser & IM anonyme → 3. First round bids → 4. Management presentations → 5. Final bids & due diligence → 6. Exclusivité → 7. SPA → 8. Closing",
          difficulty: 2,
          tags: ["M&A", "processus", "IBD"],
          detail: `**Le processus de vente en détail :**

**Phase 1 — Préparation (4-8 semaines) :**
- Signature du mandat, NDA avec l'acheteur potentiel
- Préparation de l'Information Memorandum (IM) : 60-100 pages sur la société
- Construction du modèle financier vendeur

**Phase 2 — Marketing (4-6 semaines) :**
- Envoi du teaser anonyme à ~20-30 acheteurs potentiels
- Envoi de l'IM aux intéressés après signature de NDA
- First round bids (offres indicatives non-engageantes)
- Sélection de 3-5 candidats pour la suite

**Phase 3 — Due Diligence (6-10 semaines) :**
- Data room ouverte (VDR : Virtual Data Room)
- Management presentations (Q&A avec l'équipe dirigeante)
- Final bids (offres fermes et engageantes)

**Phase 4 — Closing (4-8 semaines) :**
- Exclusivité accordée au meilleur offrant
- Négociation et signature du SPA (Sale & Purchase Agreement)
- Conditions de closing (antitrust, régulateur, financement)
- Closing et transfert des fonds`,
        },
        {
          id: "cf-l4-ma-trap",
          type: "trap",
          front: "⚠️ Piège : la majorité des acquisitions créent-elles de la valeur pour l'acquéreur ?",
          back: "Non — les études académiques montrent que 50-70 % des acquisitions détruisent de la valeur pour les actionnaires de l'acquéreur (synergies surestimées, intégration difficile, surpaiement). Les actionnaires de la cible captent la majorité de la valeur créée.",
          difficulty: 2,
          tags: ["M&A", "synergies", "création de valeur"],
          detail: `**Pourquoi les acquisitions échouent-elles si souvent ?**

1. **Synergies surestimées** : les banquiers et le management ont intérêt à montrer un deal attractif
2. **Intégration sous-estimée** : coûts d'intégration, chocs culturels, départ des talents clés
3. **Winner's curse** : en processus compétitif, le gagnant surpaie souvent
4. **Biais cognitifs** : les dirigeants sont confiants dans leur capacité à gérer plus grand

**Études empiriques :**
- Les actionnaires de la **cible** gagnent en moyenne +25-30 % (prime de contrôle)
- Les actionnaires de l'**acquéreur** perdent en moyenne -2 % le jour de l'annonce
- Sur 3 ans post-deal : performance souvent inférieure au secteur

**Leçon pour l'entretien :** être capable de critiquer un deal M&A n'est pas une faiblesse — c'est ce que font les bons analystes.`,
        },
        {
          id: "cf-l4-ma-iq",
          type: "interview-question",
          front: "Comment évaluez-vous si une acquisition est créatrice de valeur pour l'acquéreur ?",
          back: "Prix payé vs valeur créée : 1) valorisation standalone de la cible, 2) PV des synergies (avec décote d'exécution), 3) coûts d'intégration → deal créateur si VAN > 0 après prime payée. Aussi : analyse accrétion/dilution du BPA.",
          difficulty: 3,
          tags: ["M&A", "synergies", "valorisation"],
          detail: `**Framework pour évaluer un deal M&A (3 min) :**

1. **Valeur standalone de la cible** : DCF ou multiples de comparables
2. **Synergies identifiées** : distinguer coûts (certaines) et revenus (moins certaines, décote 30-50 %)
3. **Coûts d'intégration** : one-off, à actualiser
4. **Prix payé** : standalone + premium
5. **Test de création de valeur :**
   Valeur créée = Standalone + PV(synergies) − Coûts d'intégration − Prix payé
   Si > 0 : deal créateur de valeur pour l'acquéreur

6. **Analyse accrétion/dilution** : impact sur le BPA court terme

7. **Analyse qualitative :** cohérence stratégique, risque d'intégration, dépendance au deal`,
        },
        {
          id: "cf-l4-ma-ma",
          type: "model-answer",
          front: "Réponse : évaluer la création de valeur d'une acquisition",
          back: "\"J'analyse un M&A en comparant ce que je paie à ce que je reçois. Je valorise la cible en standalone (DCF + multiples), j'estime les synergies en distinguant coûts (valorisées à 100 %) et revenus (décote 30-50 %), je déduis les coûts d'intégration. Si Standalone + PV(synergies nettes) > Prix payé, le deal est créateur. Je complète par une analyse d'accrétion/dilution du BPA.\"",
          difficulty: 3,
          tags: ["M&A", "valorisation", "synergies"],
          detail: `**Points bonus :**
- Mentionner les **risques d'exécution** : même si le deal est créateur sur le papier, l'intégration peut échouer
- Parler du **ROIC post-acquisition vs WACC** comme test ultime sur 3-5 ans
- Les **coûts d'intégration** sont souvent under-estimés (IT systems, restructuring, départs involontaires)
- L'analyse **dilution du cours** court terme vs création de valeur long terme : parfois les marchés réagissent négativement à une bonne acquisition (incompréhension du marché)
- En pratique : consulter les rapports des proxy advisors (ISS, Glass Lewis) et les reactions des analystes sell-side`,
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Leçon 5 — LBO
    // -------------------------------------------------------------------------
    {
      id: "cf-l5-lbo",
      slug: "lbo",
      title: "Leveraged Buyout (LBO)",
      description: "Structure LBO, dette senior/mezzanine, IRR et returns pour les fonds PE",
      estimatedMinutes: 11,
      cards: [
        {
          id: "cf-l5-lbo-def",
          type: "definition",
          front: "Qu'est-ce qu'un LBO ?",
          back: "Leveraged Buyout : acquisition d'une entreprise financée majoritairement par de la dette (60-80 %), le reste par les capitaux propres du fonds de Private Equity. La dette est remboursée par les flux de trésorerie de la cible.",
          difficulty: 1,
          tags: ["LBO", "private equity", "levier"],
          detail: `**La mécanique du LBO :**
1. Le fonds PE crée une **HoldCo** (société holding)
2. La HoldCo lève de la dette auprès de banques et d'obligataires
3. La HoldCo acquiert la cible en combinant dette + equity
4. La dette est remboursée par les **dividendes** ou **remontées de cash** de la cible
5. À la sortie (3-7 ans), le fonds revend la cible plus chère → réalise sa plus-value

**Structure typique d'un LBO :**
- Dette bancaire senior (Dette A, B, C) : 40-50 % du prix d'acquisition
- Obligations high yield (HY bonds) : 20-30 %
- Equity fonds PE : 20-40 %

**Cibles idéales pour un LBO :**
- Flux de trésorerie stables et prévisibles
- Actifs réels (collatéral pour la dette)
- Management de qualité
- Pas de capex majeur
- Potentiel d'amélioration opérationnelle`,
        },
        {
          id: "cf-l5-lbo-intuition-levier",
          type: "intuition",
          front: "Comment le levier amplifie-t-il les rendements du fonds PE ?",
          back: "Le PE investit 40 € sur 100 € (60 € de dette). Si l'entreprise est revendue à 140 € (croissance de 40 %), l'equity est passé de 40 à 80 € → rendement de 100 %. Sans levier : rendement de 40 %.",
          difficulty: 1,
          tags: ["LBO", "levier", "rendement"],
          detail: `**L'effet multiplicateur du levier — exemple chiffré :**

**Acquisition :** Prix = 100 M€
- Equity fonds PE : 40 M€ (40 %)
- Dette : 60 M€ (60 %)

**Après 5 ans :** l'entreprise vaut 140 M€, la dette remboursée est de 20 M€ (reste 40 M€ de dette)
- Equity value à la sortie = 140 − 40 = **100 M€**
- Le fonds PE récupère 100 M€ pour 40 M€ investis → **Multiple de 2,5× (MoM)**

**Sans levier :** invest 100 M€, vente 140 M€ → Multiple de 1,4×

**Levier amplifie aussi les pertes :** si la cible vaut 80 M€ à la sortie et dette = 60 M€ → equity = 20 M€, perte de 50 % sur le cash investi.`,
        },
        {
          id: "cf-l5-lbo-formula-irr",
          type: "formula",
          front: "IRR et Money-on-Money Multiple (MoM) du LBO",
          back: "IRR = taux qui annule la VAN des flux (investissement initial + distributions)\n\nMoM = Total distributions reçues / Capital investi\n\nCible PE : IRR 20-25 %+, MoM 2-3×",
          difficulty: 2,
          tags: ["IRR", "MoM", "LBO", "private equity"],
          detail: `**IRR vs MoM — deux métriques complémentaires :**

**IRR (Internal Rate of Return) :**
- Tient compte du timing des flux (important : recevoir 2× en 2 ans > 2× en 7 ans)
- Peut être "boosté" par une sortie rapide même sur un petit multiple

**MoM (Money on Money / MOIC) :**
- Mesure l'enrichissement absolu : 3× = triplement du capital investi
- Ne tient pas compte du temps (2× en 2 ans = 2× en 8 ans selon le MoM)

**Règle d'or :**
| Durée | IRR ~20-25 % → MoM |
|-------|---------------------|
| 3 ans | ~1,7-1,9× |
| 5 ans | ~2,5-3,1× |
| 7 ans | ~3,6-4,9× |

**Target d'un fonds PE tier 1 :** IRR net > 20 %, MoM net > 2,5× sur le fonds (net = après fees de gestion et carried interest)`,
        },
        {
          id: "cf-l5-lbo-example-structure-dette",
          type: "example",
          front: "Structure de dette dans un LBO type",
          back: "Prix d'acquisition : 500 M€ (7× EBITDA de 70 M€)\n• Dette senior A (revolving + term A) : 150 M€ @ Euribor + 2 %\n• Term Loan B (TLB) : 150 M€ @ Euribor + 4 %\n• High Yield bonds : 50 M€ @ 8 %\n• Equity fonds : 150 M€",
          difficulty: 2,
          tags: ["LBO", "structure de dette", "leveraged finance"],
          detail: `**La cascade de remboursement (waterfall) :**
En cas de difficultés ou liquidation, les créanciers sont remboursés par ordre de priorité :

1. **Secured senior debt** (Term Loan A, RCF) : priorité absolue, taux le plus bas
2. **Second lien / Term Loan B** : semi-secured, taux plus élevé
3. **Mezzanine / High Yield** : non-secured, taux élevé (8-12 %)
4. **Equity** : résiduel, potentiellement zéro si les dettes ne sont pas couvertes

**Covenants :** les prêteurs imposent des covenants (clauses restrictives) :
- Minimum Interest Coverage Ratio (ICR) : EBITDA / Intérêts > 2-3×
- Maximum Leverage : Dette nette / EBITDA < 5-6×
- Covenant breach → renégociation ou défaut technique

**DSCR (Debt Service Coverage Ratio) :** FCF / (Intérêts + Remboursement principal) > 1× pour que le deal tienne`,
        },
        {
          id: "cf-l5-lbo-trap",
          type: "trap",
          front: "⚠️ Piège : un LBO réussi = l'entreprise a progressé ?",
          back: "Pas nécessairement. Un LBO peut être rentable pour le fonds PE même si l'entreprise n'a pas fondamentalement progressé, grâce à : 1) désendettement (FCF affectés aux dettes), 2) revalorisation des multiples, 3) levier financier seul.",
          difficulty: 2,
          tags: ["LBO", "private equity", "création de valeur"],
          detail: `**Les trois sources de création de valeur dans un LBO :**

1. **Multiple expansion :** achat à 6× EBITDA, vente à 8× → pur effet de marché, pas d'amélioration opérationnelle
2. **Croissance de l'EBITDA :** amélioration des marges, croissance organique ou build-up acquisitions
3. **Désendettement (deleveraging) :** les FCF remboursent la dette → equity value = EV − dette restante augmente même si l'EV ne bouge pas

**Décomposition typique de la création de valeur dans un LBO :**
- Désendettement : 30-40 %
- Croissance de l'EBITDA : 30-40 %
- Multiple expansion : 20-30 %

**Les fonds PE de qualité** créent de la valeur principalement via l'amélioration opérationnelle (EBITDA). Les fonds qui comptent sur le multiple expansion ou le seul effet levier sont plus fragiles si les marchés se retournent.`,
        },
        {
          id: "cf-l5-lbo-iq",
          type: "interview-question",
          front: "Quelles caractéristiques fait une bonne cible de LBO ? Donnez un exemple.",
          back: "Cible idéale : FCF stables et prévisibles, faible capex, fort pricing power, position de marché défendable, management en place, potentiel d'amélioration opérationnelle. Exemple : entreprise de services aux entreprises (SaaS, outsourcing).",
          difficulty: 3,
          tags: ["LBO", "private equity", "cible"],
          detail: `**Checklist d'une bonne cible LBO :**

**Financier :**
- EBITDA > 30-50 M€ (taille minimale pour un deal institutionnel)
- FCF / EBITDA conversion > 60 % (peu de capex de maintenance)
- Revenus récurrents ou contrats long terme
- Faible cyclicité (dette = risque si revenus s'effondrent)

**Opérationnel :**
- Position de marché défendable (pricing power)
- Marges améliorables (inefficiencé ou sous-investissement)
- Management motivé (associé via un management package)
- Possibilité de build-up (acquisitions bolt-on dans le secteur)

**Sortie :**
- Secteur avec acheteurs industriels ou autres PE actifs
- Valorisé sur EBITDA croissant et multiple soutenu

**Exemple parfait :** éditeur de logiciels métier avec clients en contrat annuel renouvelable, faible churn, peu de capex, potentiel de hausse de prix.`,
        },
        {
          id: "cf-l5-lbo-ma",
          type: "model-answer",
          front: "Réponse : caractéristiques d'une bonne cible LBO",
          back: "\"Une bonne cible LBO a des FCF stables et prévisibles pour rembourser la dette, un faible niveau de capex de maintenance, une position de marché défendable avec pricing power, et du potentiel d'amélioration opérationnelle. Par exemple, un éditeur de logiciel SaaS avec 80 % de revenus récurrents, NRR > 100 %, et des marges EBITDA améliorables de 25 % à 35 %. La dette est couverte, la sortie est visible.\"",
          difficulty: 3,
          tags: ["LBO", "private equity"],
          detail: `**Points bonus :**
- Mentionner l'importance du **management package** : les managers sont intéressés à la performance via un sweet equity ou des BSA (bons de souscription d'actions)
- Le **covenant headroom** : la cible doit générer assez de FCF pour respecter les covenants même en scénario dégradé (15-20 % de buffer recommandé)
- La **sortie stratégique** est souvent plus lucrative qu'une IPO ou une vente à un autre PE — un acheteur industriel paie pour les synergies
- Les **build-up acquisitions** peuvent amplifier la création de valeur : acheter de petites entreprises à des multiples bas et les intégrer dans la plateforme valorisée plus haut`,
        },
      ],
    },
  ],
};
