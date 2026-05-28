import type { Lesson } from "@/lib/types";

export const lessonComparables: Lesson = {
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
};
