import type { Lesson } from "@/lib/types";

export const lessonVolume: Lesson = {
  id: "mf-found-l1-volume",
  slug: "volume",
  title: "Le volume",
  description: "Lire et interpréter les volumes de trading en bourse",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-vol-def",
      type: "definition",
      front: "Qu'est-ce que le volume en bourse ?",
      back: "Nombre de titres (actions, obligations) échangés sur un marché sur une période donnée (journée, semaine). Il mesure l'intensité de l'activité et l'intérêt des investisseurs pour un titre.",
      difficulty: 1,
      tags: ["volume", "trading"],
      detail: `**Volume en nombre de titres vs volume en valeur :**
- **Volume en titres** : nombre d'actions échangées (ex : 5 millions d'actions LVMH)
- **Volume en valeur** : montant en euros/dollars échangés (ex : 500 M€ de LVMH)
- Les indices utilisent généralement le volume en valeur pour les comparaisons

**Turnover ratio :** volume annuel / capitalisation boursière. Mesure la fréquence de rotation des actionnaires.
- Actions US large cap : ~100-200 % (la capitalisation "tourne" 1-2× par an)
- Small caps illiquides : < 20 %

**Volumes en temps réel :** disponibles sur Bloomberg, Reuters, Yahoo Finance. Important pour les traders intraday.`,
    },
    {
      id: "mf-found-l1-vol-intuition",
      type: "intuition",
      front: "Volume = confirmation d'une tendance",
      back: "Une hausse avec fort volume = signal haussier solide (beaucoup d'acheteurs). Une hausse avec faible volume = signal moins fiable (peu de participants). Le volume valide les mouvements de prix. C'est la différence entre un vrai mouvement et un 'faux signal'.",
      difficulty: 1,
      tags: ["volume", "tendance", "signal"],
      detail: `**Les quatre signaux volume/prix à retenir :**

| Prix | Volume | Signal |
|------|--------|--------|
| ↑ | ↑ fort | Tendance haussière solide ✅ |
| ↑ | ↓ faible | Hausse fragile, méfiance ⚠️ |
| ↓ | ↑ fort | Tendance baissière solide (selling pressure) ❌ |
| ↓ | ↓ faible | Baisse sans conviction, possible rebond ⚠️ |

**L'analyse technique** utilise systématiquement la combinaison prix + volume. Un breakout sur un support ou résistance n'est crédible que s'il s'accompagne d'un fort volume.`,
    },
    {
      id: "mf-found-l1-vol-example",
      type: "example",
      front: "Lecture du volume sur le CAC 40",
      back: "Volume quotidien moyen du CAC 40 : ~3–5 milliards €. Lors d'une décision de la BCE ou d'annonces de résultats majeurs, le volume peut doubler. En été ou entre Noël et le Nouvel An, les volumes chutent : les prix sont moins représentatifs.",
      difficulty: 1,
      tags: ["CAC 40", "volume", "BCE"],
      detail: `**Événements qui font exploser les volumes :**
- Annonces de résultats trimestriels / annuels
- Décisions de politique monétaire (BCE, Fed)
- Événements macro (guerre, choc pétrolier, crise financière)
- Fusions-acquisitions : l'action cible monte +20-40 % avec volumes × 10-20

**Volumes anormaux = signal d'alerte :**
Un volume anormalement élevé avant une annonce publique peut indiquer un **délit d'initié** (insider trading). Les régulateurs (AMF, SEC) surveillent les volumes anormaux en permanence.

**Thin markets :** en août ou fin décembre, volumes réduits → prix peu représentatifs → mouvements amplifiés par peu d'ordres. Les traders institutionnels évitent généralement de passer de gros ordres lors de ces périodes.`,
    },
    {
      id: "mf-found-l1-vol-trap",
      type: "trap",
      front: "⚠️ Piège : fort volume = toujours bon signe ?",
      back: "Non — un fort volume peut accompagner une baisse violente (panic selling). Volume élevé confirme l'ampleur d'un mouvement, quelle que soit sa direction. Un krach se produit généralement avec des volumes records.",
      difficulty: 2,
      tags: ["volume", "krach", "trading"],
      detail: `**Le paradoxe du volume en période de stress :**
Les plus forts volumes de l'histoire se produisent souvent lors des krachs :
- **Mars 2020 (COVID)** : volumes records sur toutes les places mondiales — panique de vente
- **Octobre 1987 (Black Monday)** : 604 millions d'actions sur le NYSE (×2 le record), S&P -20 % en 1 jour
- **2008** : volumes records sur les obligations et CDS lors de la faillite Lehman

**Ce que le fort volume signal vraiment :**
- Fort désaccord entre acheteurs et vendeurs sur la valeur d'un actif
- Changement d'opinion massif dans le marché
- Potentiel retournement de tendance (quand le volume est extrême, le mouvement peut s'épuiser)

**À retenir :** analyser toujours le volume dans son contexte directionnel, jamais de façon isolée.`,
    },
    {
      id: "mf-found-l1-vol-iq",
      type: "interview-question",
      front: "Comment utilisez-vous le volume pour analyser un titre ou un marché ?",
      back: "Volume confirme ou infirme les mouvements de prix. Fort volume + hausse = signal solide. Faible volume + hausse = signal fragile. Volume anormal = événement en cours. Utilisé en combinaison avec l'analyse technique et fundamentale.",
      difficulty: 2,
      tags: ["volume", "analyse", "trading"],
      detail: `**Structure de réponse (2 min) :**
1. Définir le volume et son rôle de confirmation
2. Donner les 4 cas prix/volume et leur interprétation
3. Citer l'utilisation pratique : identifier les breakouts valides, détecter les retournements de tendance
4. Mentionner les volumes anormaux comme signal d'alerte (M&A, earnings, délit d'initié)
5. Nuancer : le volume seul ne suffit pas — toujours croiser avec les fondamentaux

**Erreur à éviter :** confondre volume élevé avec signal positif. Insister sur la direction du mouvement.`,
    },
    {
      id: "mf-found-l1-vol-ma",
      type: "model-answer",
      front: "Réponse : utilisation du volume en analyse",
      back: "\"J'utilise le volume pour valider les mouvements de prix. Un breakout sur un niveau clé est crédible seulement s'il s'accompagne d'un fort volume. À l'inverse, une hausse sur faible volume me rend méfiant — c'est souvent un faux signal. Je surveille aussi les volumes anormaux qui précèdent souvent les annonces importantes ou peuvent signaler un délit d'initié.\"",
      difficulty: 2,
      tags: ["volume", "analyse"],
      detail: `**Outils pratiques pour analyser le volume :**
- **Relative Volume (RVOL)** : volume actuel / volume moyen des 20 derniers jours. RVOL > 2 = volume anormalement élevé
- **On Balance Volume (OBV)** : indicateur cumulatif qui ajoute le volume les jours de hausse et le soustrait les jours de baisse → divergences OBV/prix signalent un retournement potentiel
- **Volume Profile** : distribution du volume par niveaux de prix → identifie les zones de support/résistance où beaucoup de transactions ont eu lieu

**En practice sur le buy-side :** avant de passer un gros ordre (>1 % du volume journalier), les traders institutionnels fractionnent l'ordre (algo TWAP, VWAP) pour ne pas déplacer le marché.`,
    },
  ],
};
