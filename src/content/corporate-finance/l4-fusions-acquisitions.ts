import type { Lesson } from "@/lib/types";

export const lessonFusionsAcquisitions: Lesson = {
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
};
