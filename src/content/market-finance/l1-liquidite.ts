import type { Lesson } from "@/lib/types";

export const lessonLiquidite: Lesson = {
  id: "mf-found-l1-liquidite",
  slug: "liquidite",
  title: "La liquidité",
  description: "Comprendre ce que signifie la liquidité et pourquoi elle est cruciale",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-liq-def",
      type: "definition",
      front: "Qu'est-ce que la liquidité d'un actif ?",
      back: "Facilité à acheter ou vendre un actif rapidement, en grande quantité, sans impacter significativement son prix. Un actif liquide = marché profond avec beaucoup d'acheteurs et vendeurs en permanence.",
      difficulty: 1,
      tags: ["liquidité"],
      detail: `**Les quatre dimensions de la liquidité :**
- **Immédiateté** : délai pour trouver une contrepartie
- **Profondeur** : volume disponible aux prix proches du marché (carnet d'ordres épais)
- **Largeur** : écart bid-ask (plus il est petit, plus c'est liquide)
- **Résilience** : vitesse à laquelle la liquidité revient après un choc

**Mesures pratiques :**
- **Spread bid-ask** : différence entre prix achat et prix vente. Apple : 0,01 $ ; small cap illiquide : 1-5 %
- **Impact de marché** : combien le cours bouge quand on passe un ordre de taille donnée
- **Volume médian journalier (ADTV)** : average daily trading volume — référence pour les institutionnels`,
    },
    {
      id: "mf-found-l1-liq-intuition",
      type: "intuition",
      front: "Pourquoi la liquidité est-elle cruciale ?",
      back: "Imagine vouloir vendre une maison en 24h : tu dois brader le prix. Une action Apple se vend en millisecondes à son prix de marché. La liquidité = liberté de sortir quand on veut, au bon prix. Les marchés illiquides exigent une prime de risque supplémentaire.",
      difficulty: 1,
      tags: ["liquidité", "prime de risque"],
      detail: `**La prime d'illiquidité en pratique :**
Les investisseurs exigent un rendement supplémentaire pour compenser l'illiquidité :
- Small caps vs large caps : ~1-3 % de prime
- Obligations high yield vs investment grade : ~2-4 % de spread
- Private Equity vs actions cotées : ~3-5 % de prime
- Immobilier vs SCPI : prime variable mais significative

**Le paradoxe de la liquidité :** les actifs illiquides peuvent offrir de meilleures performances à long terme précisément parce que les investisseurs exigent une prime pour les détenir. Les investisseurs patients capturent cette prime.

**Horizon temporel :** un fonds de pension avec des engagements à 30 ans peut se permettre d'investir dans des actifs illiquides (PE, infra) et capturer la prime d'illiquidité.`,
    },
    {
      id: "mf-found-l1-liq-example",
      type: "example",
      front: "Du plus liquide au moins liquide",
      back: "Forex (7 000 Mds $/jour) > Obligations d'État > Actions large cap (Apple, LVMH) > Small caps > Immobilier > Private Equity > Art\n\nLe Forex est le marché le plus liquide au monde. L'art peut prendre des mois à vendre.",
      difficulty: 1,
      tags: ["forex", "liquidité", "actifs"],
      detail: `**Volumes journaliers de marché (ordre de grandeur 2024) :**

| Marché | Volume journalier |
|--------|------------------|
| Forex | ~7 500 Mds $ |
| Obligations mondiales (OTC) | ~700 Mds $ |
| Actions mondiales | ~300 Mds $ |
| Futures et options | ~200 Mds $ |
| Crypto (top 10) | ~20-50 Mds $ |

**Cas pratique pour un institutionnel :** un fonds gérant 10 Mds € ne peut pas investir plus de 1-2 % dans une small cap dont le volume journalier est de 5 M€ — il déplacerait trop le marché à l'achat, et ne pourrait pas sortir rapidement.`,
    },
    {
      id: "mf-found-l1-liq-trap",
      type: "trap",
      front: "Piège : la liquidité peut s'évaporer",
      back: "En période de stress, la liquidité peut disparaître brutalement. En 2008, des actifs réputés liquides (certains ABS) sont devenus totalement invendables. Jamais supposer qu'un actif restera liquide en crise. C'est le risque de liquidité.",
      difficulty: 2,
      tags: ["liquidité", "risque", "2008"],
      detail: `**Mécanisme de l'évaporation de liquidité :**
1. Un choc déclenche des ventes forcées (margin calls, rachats de fonds)
2. Les market makers élargissent leurs spreads ou se retirent — trop de risque
3. Le carnet d'ordres se vide côté acheteurs
4. Impossibilité de vendre sauf à des prix catastrophiques → amplification de la crise

**2008 — cas concret :**
Les CDO (Collateralized Debt Obligations) notés AAA s'échangeaient normalement jusqu'en juillet 2007. En quelques semaines, le marché disparaît. Des banques se retrouvent avec des milliards d'actifs invendables à n'importe quel prix.

**Leçon de régulation :** depuis 2010, les banques doivent maintenir un **Liquidity Coverage Ratio (LCR)** — réserves d'actifs liquides pour couvrir 30 jours de stress de liquidité.`,
    },
    {
      id: "mf-found-l1-liq-iq",
      type: "interview-question",
      front: "Comment évaluez-vous le risque de liquidité d'un actif ? Quels indicateurs utilisez-vous ?",
      back: "Spread bid-ask, volume journalier moyen (ADTV), profondeur du carnet d'ordres, nombre de market makers, comportement historique en période de stress.",
      difficulty: 1,
      tags: ["liquidité", "risque"],
      detail: `**Structure de réponse (2 min) :**
1. Définir le risque de liquidité (impossibilité de sortir au prix voulu)
2. Métriques quantitatives : spread bid-ask, ADTV, impact de marché estimé
3. Métriques qualitatives : nombre de market makers, profondeur du carnet
4. Analyse de stress : comment cet actif s'est-il comporté en 2008, 2020 ?
5. Nuancer : la liquidité n'est pas binaire mais un spectre

**Ce que le recruteur veut voir :** que vous ne regardez pas uniquement les conditions normales de marché, mais que vous pensez aussi aux scénarios extrêmes.`,
    },
    {
      id: "mf-found-l1-liq-ma",
      type: "model-answer",
      front: "Réponse : évaluer le risque de liquidité",
      back: "J'utilise le spread bid-ask (plus il est large, moins c'est liquide), les volumes journaliers moyens, la profondeur du carnet d'ordres et le nombre de market makers. Je regarde aussi le comportement en période de stress passé. Un actif peut sembler liquide en temps normal et devenir illiquide en crise (risk-off).",
      difficulty: 2,
      tags: ["liquidité", "bid-ask", "spread"],
      detail: `**Réponse enrichie :**

"J'utilise plusieurs indicateurs complémentaires :
- Le **spread bid-ask** : pour Apple, c'est 1 centime ; pour une small cap, ça peut être 1-2 %
- L'**ADTV** (Average Daily Trading Volume) : si je dois investir 100 M€, je veux un ADTV d'au moins 1-2 Mds € pour ne pas déplacer le marché
- La **profondeur du carnet d'ordres** : combien puis-je vendre avant que le cours bouge de 1 %
- L'**Amihud ratio** : mesure l'impact de marché par unité de volume — standard académique

Surtout, j'analyse le comportement lors d'épisodes de stress (2008, mars 2020) : la vraie liquidité se mesure quand tout le monde veut sortir en même temps."`,
    },
  ],
};
