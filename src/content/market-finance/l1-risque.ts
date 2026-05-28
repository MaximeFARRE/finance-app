import type { Lesson } from "@/lib/types";

export const lessonRisque: Lesson = {
  id: "mf-found-l1-risque",
  slug: "risque",
  title: "Le risque",
  description: "Identifier et comprendre les différents types de risques financiers",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-risque-def",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce que le risque en finance ?",
      shortAnswer:
        "Le risque est la possibilité que le rendement réalisé diffère du rendement attendu.",
      explanation:
        "Il ne signifie pas seulement perte certaine : il mesure l'incertitude. On peut notamment parler de risque de marché, de crédit, de liquidité ou opérationnel.",
      front: "Qu'est-ce que le risque en finance ?",
      back: "Le risque est la possibilité que le rendement réalisé diffère du rendement attendu.",
      difficulty: 1,
      learningStage: 1,
      topics: ["risque", "rendement", "incertitude"],
      skills: ["definition"],
      tags: ["risque", "volatilité"],
    },
    {
      id: "mf-found-l1-risque-example",
      type: "example",
      questionType: "comparison",
      question: "Quels sont les quatre grands types de risques en finance de marché ?",
      shortAnswer:
        "Les grands types sont le risque de marché, le risque de crédit, le risque de liquidité et le risque opérationnel.",
      explanation:
        "Le risque de marché vient des mouvements de prix. Le crédit vient du défaut d'un émetteur. La liquidité vient de la difficulté à vendre. L'opérationnel vient d'erreurs, fraudes ou défaillances internes.",
      example:
        "Exemples : krach actions, défaut Lehman Brothers, actifs invendables en 2008, fraude Kerviel.",
      front: "Quels sont les quatre grands types de risques en finance de marché ?",
      back: "Les grands types sont le risque de marché, le risque de crédit, le risque de liquidité et le risque opérationnel.",
      difficulty: 1,
      learningStage: 1,
      topics: ["risque", "crédit", "liquidité"],
      skills: ["comparison"],
      tags: ["risque", "crédit", "liquidité"],
    },
    {
      id: "mf-found-l1-risque-intuition",
      type: "definition",
      questionType: "comparison",
      question: "Quelle est la différence entre risque et perte certaine ?",
      shortAnswer:
        "Le risque est une incertitude sur le résultat. Une perte certaine est déjà connue ou quasiment inévitable.",
      explanation:
        "Un actif risqué peut très bien produire une excellente performance. À l'inverse, un actif apparemment stable peut cacher un risque de défaut ou d'illiquidité.",
      commonMistake:
        "Assimiler tout risque à une perte alors que le risque mesure une distribution de résultats possibles.",
      front: "Quelle est la différence entre risque et perte certaine ?",
      back: "Le risque est une incertitude sur le résultat. Une perte certaine est déjà connue ou quasiment inévitable.",
      difficulty: 1,
      learningStage: 1,
      topics: ["risque", "incertitude", "perte"],
      skills: ["comparison"],
      tags: ["risque", "incertitude"],
    },
    {
      id: "mf-found-l1-risque-iq",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce que la volatilité ?",
      shortAnswer:
        "La volatilité mesure l'ampleur des variations de prix ou de rendement d'un actif sur une période.",
      explanation:
        "Elle est souvent calculée comme l'écart-type des rendements. Une volatilité élevée signifie que les résultats possibles sont plus dispersés.",
      front: "Qu'est-ce que la volatilité ?",
      back: "La volatilité mesure l'ampleur des variations de prix ou de rendement d'un actif sur une période.",
      difficulty: 1,
      learningStage: 1,
      topics: ["risque", "volatilité", "rendement"],
      skills: ["definition"],
      tags: ["risque"],
    },
    {
      id: "mf-found-l1-risque-ma",
      type: "definition",
      questionType: "mechanism",
      question: "Comment la diversification réduit-elle le risque d'un portefeuille ?",
      shortAnswer:
        "Elle réduit le risque spécifique en combinant des actifs dont les performances ne bougent pas parfaitement ensemble.",
      explanation:
        "La diversification ne supprime pas le risque de marché global, mais elle peut réduire l'impact d'un problème propre à une entreprise ou un secteur.",
      front: "Comment la diversification réduit-elle le risque d'un portefeuille ?",
      back: "Elle réduit le risque spécifique en combinant des actifs dont les performances ne bougent pas parfaitement ensemble.",
      difficulty: 1,
      learningStage: 1,
      topics: ["risque", "diversification", "portefeuille"],
      skills: ["mechanism"],
      tags: ["risque"],
    },
    {
      id: "mf-found-l1-risque-credit-market",
      type: "definition",
      questionType: "comparison",
      question: "Quelle est la différence entre risque de marché et risque de crédit ?",
      shortAnswer:
        "Le risque de marché vient des mouvements de prix. Le risque de crédit vient de la capacité d'un émetteur ou d'une contrepartie à payer.",
      explanation:
        "Une action qui baisse avec le marché illustre le risque de marché. Une obligation dont l'émetteur fait défaut illustre le risque de crédit.",
      front: "Quelle est la différence entre risque de marché et risque de crédit ?",
      back: "Le risque de marché vient des mouvements de prix. Le risque de crédit vient de la capacité d'un émetteur ou d'une contrepartie à payer.",
      difficulty: 1,
      learningStage: 1,
      topics: ["risque", "risque-de-marché", "risque-de-crédit"],
      skills: ["comparison"],
      tags: ["risque", "crédit"],
    },
  ],
};
