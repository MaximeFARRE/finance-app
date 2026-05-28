import type { Lesson } from "@/lib/types";

export const lessonActeurs: Lesson = {
  id: "mf-found-l1-acteurs",
  slug: "acteurs-du-marche",
  title: "Les acteurs du marché",
  description: "Identifier qui opère sur les marchés financiers et leurs motivations",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-act-def",
      type: "definition",
      front: "Qui sont les acteurs des marchés financiers ?",
      back: "• Sell-side : banques d'investissement, brokers, market makers\n• Buy-side institutionnel : asset managers, hedge funds, fonds de pension, assureurs\n• Banques centrales : Fed, BCE (interventions ponctuelles mais impactantes)\n• Retail : investisseurs particuliers\n• Gouvernements : via les émissions de dette publique",
      difficulty: 1,
      tags: ["acteurs", "institutionnel"],
      detail: `**Rôles spécifiques de chaque acteur :**

**Market makers :** fournissent de la liquidité en permanence (bid et ask) en échange du spread. Ils sont contrepartie des ordres clients. Ex : Citadel Securities, Virtu.

**Banques centrales :** interviennent rarement mais massivement (QE, rachats d'actifs). La BCE a acheté >3 000 Mds € d'obligations 2015-2022.

**HFT (High Frequency Trading) :** algorithmes qui passent des millions d'ordres par seconde, exploitent des micro-inefficiences. Représentent ~50 % des volumes actions US.

**Retail :** poids croissant avec la démocratisation (Robinhood, Trade Republic). Effets meme stocks (GameStop 2021) ont montré leur impact potentiel.`,
    },
    {
      id: "mf-found-l1-act-example",
      type: "example",
      front: "Poids relatif des acteurs",
      back: "• Institutionnels (buy-side) : ~80 % des volumes mondiaux\n• Retail : ~15–20 % (en hausse avec Robinhood, Trade Republic)\n• HFT (High Frequency Trading) : ~50 % des volumes actions US\n• Banques centrales : faible volume mais impact maximal sur les prix",
      difficulty: 1,
      tags: ["institutionnel", "retail", "HFT"],
      detail: `**Évolution de la structure des marchés :**

**Avant 2000 :** marché dominé par les grandes banques, commissions élevées, peu de transparence.

**2000-2010 :** démocratisation via internet (eTrade, etc.), MiFID I en Europe (2007) → fragmentation des marchés, apparition des MTF.

**2010-présent :**
- Explosion du HFT et du trading algorithmique
- Émergence des ETF (BlackRock iShares, Vanguard) → investisseurs passifs
- Retail 2.0 : Robinhood, Trading 212, Trade Republic → options accessibles aux particuliers
- Épisode GameStop (2021) : un Reddit forum coordonne un short squeeze mondial

**Tendance actuelle :** les investisseurs passifs (ETF indiciels) représentent maintenant >50 % des AUM aux US. Cela pose des questions sur la formation des prix et l'efficience des marchés.`,
    },
    {
      id: "mf-found-l1-act-intuition",
      type: "intuition",
      front: "Chaque acteur a des motivations différentes",
      back: "Un fonds de pension investit sur 30 ans pour payer les retraites. Un hedge fund macro peut shorter un pays entier sur 3 mois. Un market maker achète et revend en millisecondes pour capturer le spread. Comprendre les motivations de chaque acteur aide à anticiper leurs comportements.",
      difficulty: 1,
      tags: ["motivations", "fonds de pension", "hedge fund"],
      detail: `**Horizons temporels des acteurs — clé pour comprendre les marchés :**

| Acteur | Horizon typique | Objectif principal |
|--------|---------------|-------------------|
| HFT / algo | Millisecondes à secondes | Capturer micro-arbitrages |
| Trader prop | Jours à semaines | P&L quotidien |
| Hedge fund L/S | Mois | Alpha vs benchmark |
| Hedge fund macro | Semaines à années | Thèses macro directionnelles |
| Asset manager | 1-5 ans | Battre un indice |
| Fonds de pension | 20-40 ans | Financer les retraites |
| Banque centrale | N/A | Stabilité financière |

**Pourquoi c'est utile :** quand un fonds de pension vend massivement, c'est souvent pour des raisons réglementaires (rebalancement) et non fondamentales — donc potentiellement une opportunité d'achat pour un hedge fund avec un horizon plus court.`,
    },
    {
      id: "mf-found-l1-act-iq",
      type: "interview-question",
      front: "Décrivez les principaux acteurs des marchés financiers et expliquez leurs motivations respectives.",
      back: "Sell-side (services, commissions), buy-side institutionnel (performance, fees), banques centrales (stabilité), retail (épargne), gouvernements (financement de la dette publique). Horizons et motivations divergentes créent la liquidité.",
      difficulty: 1,
      tags: ["acteurs"],
      detail: `**Structure de réponse (3 min) :**
1. Catégoriser : sell-side, buy-side institutionnel, banques centrales, retail, souverains
2. Pour chaque catégorie : 1 exemple + motivation principale + horizon temporel
3. Montrer que les divergences de motivation créent les échanges (le vendeur et l'acheteur ont des besoins différents)
4. Conclure sur les évolutions récentes (montée des passifs, HFT, retail 2.0)

**Ce que le recruteur cherche :** que vous compreniez l'écosystème global des marchés, pas juste les banques. Mentionner les banques centrales et leur impact sur les prix montre une vision macro.`,
    },
    {
      id: "mf-found-l1-act-ma",
      type: "model-answer",
      front: "Réponse : acteurs des marchés financiers",
      back: "\"Je distingue cinq grandes catégories. Le sell-side (banques, brokers) fournit les services et la liquidité. Le buy-side institutionnel (asset managers, hedge funds, fonds de pension) gère les capitaux pour performer. Les banques centrales interviennent rarement mais massivement. Le retail représente 15-20 % des volumes en hausse. Enfin, les souverains financent leur dette via les marchés obligataires. Chaque acteur a un horizon et des motivations différents — c'est ce qui crée les échanges.\"",
      difficulty: 1,
      tags: ["acteurs", "institutionnel"],
      detail: `**Points bonus pour se distinguer :**
- Mentionner le rôle croissant des **ETF** et de la gestion passive (>50 % des AUM aux US) et ses implications sur l'efficience des marchés
- Citer l'épisode **GameStop (2021)** pour illustrer l'émergence du retail coordonné
- Parler des **family offices** (souvent oubliés) : gestion des grandes fortunes (~6 000 Mds $ gérés mondialement), très actifs en PE et immobilier
- Mentionner les **souverains wealth funds** (fonds souverains) : GPFG norvégien (~1 700 Mds $), ADIA (Abu Dhabi), GIC (Singapour) — acteurs majeurs des marchés actions et obligataires`,
    },
  ],
};
