import type { Lesson } from "@/lib/types";

export const lessonStructureDuCapital: Lesson = {
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
};
