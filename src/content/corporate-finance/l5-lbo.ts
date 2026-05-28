import type { Lesson } from "@/lib/types";

export const lessonLbo: Lesson = {
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
};
