import type { Lesson } from "@/lib/types";

export const lessonRendement: Lesson = {
  id: "mf-found-l1-rendement",
  slug: "rendement",
  title: "Le rendement",
  description: "Calculer et interpréter le rendement d'un investissement",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-rend-def",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce que le rendement d'un investissement ?",
      shortAnswer:
        "Le rendement est le gain total d'un investissement exprimé en pourcentage du capital investi.",
      explanation:
        "Il peut inclure à la fois les revenus reçus, comme dividendes ou coupons, et la plus-value ou moins-value sur le prix.",
      front: "Qu'est-ce que le rendement ?",
      back: "Le rendement est le gain total d'un investissement exprimé en pourcentage du capital investi.",
      difficulty: 1,
      learningStage: 1,
      topics: ["rendement", "performance", "investissement"],
      skills: ["definition"],
      tags: ["rendement"],
    },
    {
      id: "mf-found-l1-rend-formula",
      type: "formula",
      questionType: "formula",
      question: "Quelle est la formule du rendement simple ?",
      shortAnswer:
        "Le rendement simple rapporte le gain total au capital investi.",
      formula: "Rendement = (Prix final - Prix initial + Revenus) / Prix initial",
      example: "Achat 100, vente 110, dividende 3 : rendement = (110 - 100 + 3) / 100 = 13 %.",
      front: "Quelle est la formule du rendement simple ?",
      back: "Rendement = (Prix final - Prix initial + Revenus) / Prix initial.",
      difficulty: 1,
      learningStage: 1,
      topics: ["rendement", "calcul", "performance"],
      skills: ["formula"],
      tags: ["rendement", "calcul"],
    },
    {
      id: "mf-found-l1-rend-intuition",
      type: "definition",
      questionType: "mechanism",
      question: "Pourquoi rendement attendu et risque sont-ils indissociables ?",
      shortAnswer:
        "Parce qu'un investisseur exige généralement un rendement plus élevé pour accepter un risque plus élevé.",
      explanation:
        "L'écart de rendement demandé pour porter un risque supplémentaire s'appelle une prime de risque.",
      example:
        "Une obligation d'État solide à 3 % et une obligation fragile à 8 % ne rémunèrent pas le même niveau de risque.",
      front: "Pourquoi rendement attendu et risque sont-ils indissociables ?",
      back: "Parce qu'un investisseur exige généralement un rendement plus élevé pour accepter un risque plus élevé.",
      difficulty: 1,
      learningStage: 1,
      topics: ["rendement", "risque", "prime-de-risque"],
      skills: ["mechanism"],
      tags: ["rendement", "risque", "prime"],
    },
    {
      id: "mf-found-l1-rend-trap",
      type: "definition",
      questionType: "comparison",
      question: "Quelle est la différence entre rendement brut, rendement net et rendement réel ?",
      shortAnswer:
        "Le rendement brut ignore frais et fiscalité. Le rendement net les déduit. Le rendement réel déduit aussi l'inflation.",
      explanation:
        "Un rendement nominal positif peut être faible, voire négatif, en pouvoir d'achat si l'inflation est élevée.",
      commonMistake:
        "Comparer deux performances sans préciser si elles sont brutes ou nettes, nominales ou réelles.",
      front: "Quelle est la différence entre rendement brut, rendement net et rendement réel ?",
      back: "Le rendement brut ignore frais et fiscalité. Le rendement net les déduit. Le rendement réel déduit aussi l'inflation.",
      difficulty: 2,
      learningStage: 1,
      topics: ["rendement", "inflation", "frais"],
      skills: ["comparison"],
      tags: ["rendement", "fiscalité", "inflation"],
    },
    {
      id: "mf-found-l1-rend-iq",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce que le taux sans risque ?",
      shortAnswer:
        "Le taux sans risque est le rendement théorique d'un actif sans risque de défaut sur une maturité donnée.",
      explanation:
        "En pratique, on l'approche avec les obligations d'État les plus sûres, par exemple le T-bill ou le Treasury américain, ou le Bund allemand en euros.",
      front: "Qu'est-ce que le taux sans risque ?",
      back: "Le taux sans risque est le rendement théorique d'un actif sans risque de défaut sur une maturité donnée.",
      difficulty: 2,
      learningStage: 1,
      topics: ["rendement", "taux", "taux-sans-risque"],
      skills: ["definition"],
      tags: ["rendement", "taux", "CAPM"],
    },
    {
      id: "mf-found-l1-rend-ma",
      type: "definition",
      questionType: "comparison",
      question: "Le taux sans risque signifie-t-il vraiment qu'il n'y a aucun risque ?",
      shortAnswer:
        "Non. Il signifie surtout absence de risque de défaut dans l'approximation utilisée, mais il peut rester un risque de taux ou d'inflation.",
      explanation:
        "Une obligation d'État très sûre peut perdre de la valeur si les taux montent avant sa maturité.",
      front: "Le taux sans risque signifie-t-il vraiment qu'il n'y a aucun risque ?",
      back: "Non. Il signifie surtout absence de risque de défaut dans l'approximation utilisée, mais il peut rester un risque de taux ou d'inflation.",
      difficulty: 2,
      learningStage: 1,
      topics: ["rendement", "taux-sans-risque", "risque-de-taux"],
      skills: ["comparison"],
      tags: ["rendement", "taux", "CAPM"],
    },
  ],
};
