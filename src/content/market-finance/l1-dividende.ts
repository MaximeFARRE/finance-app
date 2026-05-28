import type { Lesson } from "@/lib/types";

export const lessonDividende: Lesson = {
  id: "mf-found-l1-dividende",
  slug: "dividende",
  title: "Le dividende",
  description: "Comprendre comment les entreprises redistribuent leurs bénéfices",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-div-def",
      type: "definition",
      front: "Qu'est-ce qu'un dividende ?",
      back: "Part des bénéfices d'une entreprise redistribuée aux actionnaires. Décidé par le conseil d'administration et voté en AG. Versé en cash ou en actions. Son montant n'est pas garanti et peut être réduit ou supprimé.",
      difficulty: 1,
      tags: ["dividende"],
      detail: `**Le cycle du dividende :**
1. **Annonce** : le CA propose un dividende, les actionnaires votent en AG
2. **Date de détachement (ex-div date)** : le cours baisse mécaniquement du montant du dividende à cette date
3. **Date de référence (record date)** : les actionnaires inscrits à cette date y ont droit
4. **Date de paiement** : versement effectif, généralement 2-5 jours après la record date

**Dividende ordinaire vs exceptionnel :**
- **Ordinaire** : versement régulier, annuel ou trimestriel
- **Exceptionnel (special dividend)** : versement ponctuel après une vente d'actif majeur ou une trésorerie excédentaire

**En France :** les dividendes sont soumis à la flat tax de 30 % (PFU) ou au barème IR sur option.`,
    },
    {
      id: "mf-found-l1-div-formula",
      type: "formula",
      front: "Dividend Yield = Dividende annuel / Cours × 100 %",
      back: "Exemple TotalEnergies (2024) :\nDividende annuel ≈ 3 € / cours 60 € = 5 % de yield\n\nInterprétation : pour 1 000 € investis, tu reçois 50 €/an en dividendes.",
      difficulty: 1,
      tags: ["dividend yield", "calcul"],
      detail: `**Dividend Yield et Payout Ratio — les deux métriques à maîtriser :**

**Dividend Yield** = Dividende par action / Cours × 100 %
→ Mesure le rendement immédiat pour l'investisseur

**Payout Ratio** = Dividendes totaux distribués / Bénéfice net × 100 %
→ Mesure la part des bénéfices distribuée (vs réinvestie)

**Benchmarks sectoriels (2024) :**
- Utilities (EDF, Engie) : yield ~5-7 %, payout ratio ~60-80 %
- Pétrole (TotalEnergies) : yield ~4-6 %
- Tech croissance (LVMH) : yield ~1-2 %, payout ~30-40 %
- Growth pure (Kering) : yield < 1 %

**Attention :** un yield calculé avec un dividende passé peut ne pas refléter le dividende futur.`,
    },
    {
      id: "mf-found-l1-div-intuition",
      type: "intuition",
      front: "Dividende vs réinvestissement",
      back: "Une entreprise a deux choix avec ses bénéfices : distribuer (dividende) ou réinvestir (croissance). Les entreprises matures (TotalEnergies, LVMH) paient de forts dividendes. Les entreprises en forte croissance (Amazon longtemps, Nvidia) préfèrent réinvestir.",
      difficulty: 1,
      tags: ["dividende", "croissance"],
      detail: `**Le signal du dividende (dividend signaling) :**
- Initier un dividende signale que le management est confiant sur les flux de trésorerie futurs
- Couper un dividende est un signal très négatif → le cours chute généralement de 10-20 %
- Les dividendes "stables et croissants" sur 10+ ans sont un signe de qualité et de discipline financière

**Les "Dividend Aristocrats" :** entreprises du S&P 500 ayant augmenté leur dividende pendant 25+ années consécutives (ex : Johnson & Johnson, Coca-Cola). Ce sont souvent des investissements défensifs très appréciés.

**La controverse Modigliani-Miller :** en théorie (marchés parfaits), la politique de dividende est neutre pour la valeur de l'entreprise. Dans la réalité, fiscalité, signaling et préférences des investisseurs font que ça compte.`,
    },
    {
      id: "mf-found-l1-div-trap",
      type: "trap",
      front: "Piège : le yield élevé n'est pas toujours bon signe",
      back: "Un yield de 10 % peut indiquer que le cours a fortement chuté (dividende stable, cours en baisse). Le marché anticipe peut-être une coupe du dividende. On appelle ça un 'dividend trap'. Toujours vérifier si le dividende est soutenable (ratio de distribution).",
      difficulty: 2,
      tags: ["dividende", "yield", "dividend trap"],
      detail: `**Comment détecter un dividend trap :**

1. **Payout ratio > 100 %** : l'entreprise distribue plus que ses bénéfices → insoutenable
2. **FCF inférieur au dividende** : les dividendes sont financés par de la dette ou des cessions d'actifs
3. **Cours en chute de -30 %+ sur 1 an** avec dividende stable : le marché anticipe une coupe
4. **Secteur en difficulté structurelle** : les utilities face à la transition énergétique, journaux face au numérique

**Exemple réel :** dans les années 2010, certaines compagnies pétrolières maintenaient leur dividende malgré la chute du pétrole, finançant le dividende par dette. Plusieurs ont finalement coupé de 50-100 %.

**La bonne question :** "Est-ce que le Free Cash Flow couvre confortablement le dividende ?" Si FCF/dividende < 1.2×, le dividende est fragile.`,
    },
    {
      id: "mf-found-l1-div-iq",
      type: "interview-question",
      front: "Une entreprise devrait-elle verser des dividendes ou racheter ses propres actions ? Comparez les deux approches.",
      back: "Les deux redistribuent du capital aux actionnaires, mais différemment : dividende = revenu immédiat imposable pour tous ; buyback = optionnel, fiscalement avantageux, signal de sous-évaluation. Le bon choix dépend de la situation de l'entreprise.",
      difficulty: 3,
      tags: ["dividende", "buyback", "capital allocation"],
      detail: `**Structure de réponse (3 min) :**

**Dividende :**
- Revenu régulier, prévisible
- Imposable immédiatement pour tous les actionnaires (pas de choix)
- Signal d'engagement du management
- Difficile à couper sans impact négatif

**Rachat d'actions (buyback) :**
- L'actionnaire choisit de vendre ou non → fiscalement avantageux
- Augmente mécaniquement l'EPS (moins d'actions en circulation)
- Signal que le management pense l'action sous-évaluée
- Flexible : peut être réduit sans le même stigma qu'une coupe de dividende

**Facteurs de décision :**
- Fiscalité locale (favorable aux plus-values vs dividendes ?)
- Base d'actionnaires (institutionnels préfèrent souvent les buybacks)
- Situation de trésorerie (buyback requiert des fonds disponibles)
- Valorisation de l'action (buyback peu créateur de valeur si l'action est chère)`,
    },
    {
      id: "mf-found-l1-div-payout-ratio",
      type: "formula",
      front: "Payout Ratio = ?",
      back: "Payout Ratio = Dividendes totaux versés / Bénéfice net × 100 %\n\nEx : bénéfice net 500 M€, dividendes 200 M€ → Payout Ratio = 40 %.\nUn ratio > 100 % signifie que l'entreprise distribue plus qu'elle ne gagne : insoutenable.",
      difficulty: 1,
      tags: ["dividende", "payout ratio", "calcul"],
      detail: `**Interpréter le Payout Ratio :**

| Ratio | Signal |
|-------|--------|
| < 30 % | Entreprise en croissance, réinvestissement prioritaire |
| 30–60 % | Équilibre raisonnable croissance / redistribution |
| 60–80 % | Secteur mature, dividende élevé mais soutenable |
| > 100 % | Insoutenable à terme — surveiller le FCF et l'endettement |

**Payout Ratio vs Dividend Yield :**
- Le Yield mesure le rendement pour l'investisseur : Dividende / Cours
- Le Payout Ratio mesure la capacité de l'entreprise à tenir son dividende

**Astuce :** un payout ratio en hausse avec un bénéfice net en baisse est un signal d'alerte fort.`,
    },
    {
      id: "mf-found-l1-div-exdate-trap",
      type: "trap",
      front: "Piège : acheter une action juste avant le dividende pour le toucher «gratuitement»",
      back: "Impossible. Le jour de la date de détachement (ex-div date), le cours baisse mécaniquement du montant du dividende. Tu ne gagnes rien nette : tu reçois le dividende mais la valeur de l'action diminue d'autant.",
      difficulty: 2,
      tags: ["dividende", "ex-div date", "cours"],
      detail: `**Pourquoi le cours baisse-t-il le jour du détachement ?**

La veille du détachement : action vaut 100 €, dividende annoncé = 3 €.
Le jour du détachement : le cours d'ouverture est ajusté à ~97 € (prix ex-dividende).

L'actionnaire inscrit à la record date reçoit 3 € de dividende — mais son action vaut 3 € de moins.

**En pratique :** la baisse peut être plus ou moins prononcée selon la fiscalité locale et le contexte de marché, mais l'ajustement technique est toujours effectué.

**Pour les traders :** certaines stratégies ("dividend capture") tentent d'exploiter des inefficiences autour des détachements, mais les frais de transaction et la fiscalité des dividendes les rendent souvent non-profitables.`,
    },
    {
      id: "mf-found-l1-div-ma",
      type: "model-answer",
      front: "Réponse : dividende vs rachat d'actions",
      back: "\"Dividende et buyback sont deux formes de retour de capital aux actionnaires. Le dividende est régulier et immédiatement imposable — il fidélise les actionnaires income. Le rachat d'actions est plus flexible, fiscalement avantageux (plus-value différée), et augmente l'EPS mécaniquement. Je préconise le buyback quand l'action est sous-évaluée, le dividende quand l'actionnariat cherche un revenu stable.\"",
      difficulty: 3,
      tags: ["dividende", "buyback"],
      detail: `**Points bonus :**
- En pratique, les grandes entreprises font les **deux** : dividende stable + programme de rachat
- Le buyback peut être vu négativement si l'entreprise rachète ses actions à prix élevé au lieu d'investir dans sa croissance
- Certains actionnaires institutionnels (fonds de pension, fonds de retraite) préfèrent les dividendes car ils ont besoin de flux de revenus réguliers
- Depuis 2018, les rachats d'actions aux US sont soumis à une taxe de 1 % (Inflation Reduction Act 2022 → 1 %)`,
    },
  ],
};
