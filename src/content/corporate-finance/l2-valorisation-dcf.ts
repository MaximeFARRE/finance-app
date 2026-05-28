import type { Lesson } from "@/lib/types";

export const lessonValorisationDcf: Lesson = {
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
};
