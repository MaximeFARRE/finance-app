import type { Lesson } from "@/lib/types";

export const lessonBuysideSellside: Lesson = {
  id: "mf-found-l1-buyside-sellside",
  slug: "buy-side-sell-side",
  title: "Buy-side vs Sell-side",
  description: "Distinguer les deux grandes familles d'acteurs en finance de marché",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-bss-def",
      type: "definition",
      front: "Quelle est la différence entre buy-side et sell-side ?",
      back: "Sell-side : institutions qui vendent des services financiers (exécution, recherche, conseil, structuration). Ex : banques d'investissement, brokers.\n\nBuy-side : institutions qui achètent et gèrent des actifs pour le compte de clients. Ex : hedge funds, asset managers, fonds de pension.",
      difficulty: 1,
      tags: ["buy-side", "sell-side"],
      detail: `**Le sell-side en détail :**
- **Brokers / Sales & Trading** : exécution d'ordres pour les clients institutionnels
- **Research** : analyses sectorielles et recommandations (buy/hold/sell)
- **ECM (Equity Capital Markets)** : IPO, augmentations de capital
- **DCM (Debt Capital Markets)** : émissions obligataires
- **M&A Advisory** : conseil en fusions-acquisitions

**Le buy-side en détail :**
- **Asset managers** (BlackRock, Amundi) : gestion de fonds pour particuliers et institutionnels
- **Hedge funds** : stratégies alternatives (long/short, macro, quant)
- **Fonds de pension** : gestion de retraites (long terme, aversion au risque)
- **Family offices** : gestion de patrimoine de grandes fortunes`,
    },
    {
      id: "mf-found-l1-bss-intuition",
      type: "intuition",
      front: "Le sell-side sert le buy-side",
      back: "Goldman Sachs Sales & Trading (sell-side) exécute les ordres de BlackRock (buy-side). Le sell-side est rémunéré par des commissions et spreads. Le buy-side est rémunéré par des frais de gestion (management fee ~2 %) et une commission de performance (carried interest ~20 %).",
      difficulty: 1,
      tags: ["buy-side", "sell-side", "frais"],
      detail: `**Les modèles de rémunération :**

**Sell-side :**
- Commissions de transaction (0,05 % à 0,5 % selon la liquidité)
- Spreads sur le market-making
- Fees sur les deals (IPO : 3-7 % des fonds levés, M&A : 0,5-2 % de la valeur)
- Abonnements à la recherche

**Buy-side :**
- **Management fee** : 0,05-2 % des actifs gérés par an selon le type de fonds
- **Performance fee (carried interest)** : 20 % des gains au-delà d'un hurdle rate (typiquement 8 %)
- Formule "2 and 20" dans le private equity et hedge funds : 2 % de management fee + 20 % de perf

**Qui gagne plus ?** En moyenne, les rémunérations totales sont plus élevées sur le buy-side senior (gérants de fonds, partners PE), mais l'accès est plus difficile.`,
    },
    {
      id: "mf-found-l1-bss-example",
      type: "example",
      front: "Exemples d'acteurs des deux côtés",
      back: "Sell-side : Goldman Sachs, JP Morgan, BNP Paribas CIB, Morgan Stanley, Société Générale CIB, Rothschild.\n\nBuy-side : BlackRock, Vanguard, Fidelity, Amundi, AXA IM, Citadel, Bridgewater, Tiger Global.",
      difficulty: 1,
      tags: ["Goldman Sachs", "BlackRock", "buy-side", "sell-side"],
      detail: `**Ordre de grandeur des acteurs (AUM 2024) :**

**Buy-side :**
- BlackRock : ~10 000 Mds $ d'AUM (1er mondial)
- Vanguard : ~8 000 Mds $
- Fidelity : ~4 500 Mds $
- Amundi : ~2 000 Mds € (1er européen)

**Sell-side (revenus annuels environ) :**
- JP Morgan CIB : ~50 Mds $ de revenus
- Goldman Sachs : ~40 Mds $
- BNP Paribas CIB : ~15 Mds €

**Passerelles :** beaucoup de professionnels commencent leur carrière sur le sell-side (IBD ou S&T) puis "passent côté client" (buy-side) après 2-5 ans d'expérience.`,
    },
    {
      id: "mf-found-l1-bss-iq",
      type: "interview-question",
      front: "Quelle est la différence entre buy-side et sell-side ? Où souhaitez-vous travailler et pourquoi ?",
      back: "Sell-side = services financiers rémunérés par commissions/fees. Buy-side = gestion d'actifs rémunérée par management fees et perf fees. Répondre honnêtement à la seconde partie selon vos motivations réelles.",
      difficulty: 1,
      tags: ["buy-side", "sell-side", "carrière"],
      detail: `**Conseils pour répondre à la deuxième partie :**

**Si vous postulez sur le sell-side (IBD, S&T) :**
"Je préfère commencer sur le sell-side car j'apprécie le travail d'exécution et de conseil, la diversité des transactions et la formation intense que cela offre. À terme, j'envisage de migrer vers le buy-side pour prendre des décisions d'investissement."

**Si vous postulez sur le buy-side (PE, hedge fund) :**
"Ce qui m'attire sur le buy-side, c'est la responsabilité de la décision d'investissement finale, l'alignement avec la performance et un horizon de travail plus long sur chaque dossier."

**Pièges à éviter :**
- Ne pas dire "pour l'argent" même si c'est vrai
- Ne pas critiquer l'institution où vous postulez
- Montrer que vous comprenez vraiment les différences de métiers`,
    },
    {
      id: "mf-found-l1-bss-ma",
      type: "model-answer",
      front: "Réponse : buy-side vs sell-side",
      back: "Le sell-side fournit des services (exécution d'ordres, recherche, conseil en levée de fonds) et est rémunéré par des commissions. Le buy-side gère des actifs pour maximiser la performance de ses clients et est rémunéré par management fees et performance fees. Le buy-side décide des investissements, le sell-side les facilite.",
      difficulty: 1,
      tags: ["buy-side", "sell-side"],
      detail: `**Réponse complète en 3 parties :**

"Le sell-side regroupe les banques et brokers qui vendent des services financiers : exécution d'ordres, recherche, conseil en IPO ou M&A. Ils sont rémunérés par des commissions et fees transactionnels.

Le buy-side gère des actifs pour des clients (particuliers, institutionnels, fonds de pension) avec l'objectif de générer une performance. La rémunération se fait via des frais de gestion et une commission de performance.

Le sell-side est orienté service et volume de transactions ; le buy-side est orienté performance et gestion du risque. Les deux sont indispensables : le buy-side a besoin du sell-side pour exécuter ses stratégies."`,
    },
  ],
};
