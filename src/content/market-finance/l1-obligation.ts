import type { Lesson } from "@/lib/types";

export const lessonObligation: Lesson = {
  id: "mf-found-l1-obligation",
  slug: "obligation",
  title: "L'obligation",
  description: "Comprendre ce qu'est une obligation et comment elle fonctionne",
  estimatedMinutes: 8,
  cards: [
    {
      id: "mf-found-l1-oblig-def",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce qu'une obligation ?",
      shortAnswer:
        "Une obligation est un titre de dette : l'investisseur prête de l'argent à un émetteur, qui verse des coupons et rembourse le principal à maturité.",
      explanation:
        "L'émetteur peut être un État, une entreprise ou une institution financière. L'investisseur est créancier, pas propriétaire.",
      front: "Qu'est-ce qu'une obligation ?",
      back: "Une obligation est un titre de dette : l'investisseur prête de l'argent à un émetteur, qui verse des coupons et rembourse le principal à maturité.",
      difficulty: 1,
      learningStage: 1,
      topics: ["obligation", "dette", "coupon"],
      skills: ["definition"],
      tags: ["obligation", "dette"],
    },
    {
      id: "mf-found-l1-oblig-intuition",
      type: "definition",
      questionType: "mechanism",
      question: "Pourquoi une entreprise émet-elle une obligation plutôt que de prendre un prêt bancaire ?",
      shortAnswer:
        "Elle peut accéder à davantage d'investisseurs, emprunter des montants plus élevés et choisir des maturités parfois plus longues.",
      explanation:
        "Une obligation est négociable sur le marché secondaire, ce qui rend l'investissement plus flexible pour les investisseurs qu'un prêt bancaire classique.",
      front: "Pourquoi une entreprise émet-elle une obligation plutôt que de prendre un prêt bancaire ?",
      back: "Elle peut accéder à davantage d'investisseurs, emprunter des montants plus élevés et choisir des maturités parfois plus longues.",
      difficulty: 1,
      learningStage: 1,
      topics: ["obligation", "marché-obligataire", "financement"],
      skills: ["mechanism"],
      tags: ["obligation", "financement"],
    },
    {
      id: "mf-found-l1-oblig-formula",
      type: "formula",
      questionType: "definition",
      question: "Quels sont les principaux composants d'une obligation ?",
      shortAnswer:
        "Les composants clés sont la valeur nominale, le coupon, la maturité et le prix de marché.",
      explanation:
        "La valeur nominale est le montant remboursé à maturité. Le coupon est l'intérêt périodique. Le prix de marché peut varier avant la maturité.",
      example:
        "Pour une obligation de nominal 1 000 euros avec coupon 3 %, l'investisseur reçoit 30 euros par an.",
      front: "Quels sont les principaux composants d'une obligation ?",
      back: "Les composants clés sont la valeur nominale, le coupon, la maturité et le prix de marché.",
      difficulty: 1,
      learningStage: 1,
      topics: ["obligation", "coupon", "maturité"],
      skills: ["definition"],
      tags: ["obligation", "coupon"],
    },
    {
      id: "mf-found-l1-oblig-example",
      type: "example",
      questionType: "quick-calculation",
      question: "Une obligation de nominal 100 000 euros paie un coupon de 3 %. Quel coupon annuel reçoit l'investisseur ?",
      shortAnswer:
        "L'investisseur reçoit 3 000 euros par an.",
      formula: "Coupon annuel = Nominal × Taux de coupon",
      example: "100 000 × 3 % = 3 000 euros.",
      front: "Une obligation de nominal 100 000 euros paie un coupon de 3 %. Quel coupon annuel reçoit l'investisseur ?",
      back: "L'investisseur reçoit 3 000 euros par an.",
      difficulty: 1,
      learningStage: 1,
      topics: ["obligation", "coupon", "calcul"],
      skills: ["quick-calculation"],
      tags: ["obligation", "coupon"],
    },
    {
      id: "mf-found-l1-oblig-trap",
      type: "definition",
      questionType: "mechanism",
      question: "Que se passe-t-il au prix d'une obligation existante quand les taux montent ?",
      shortAnswer:
        "Son prix baisse généralement, car les nouvelles obligations offrent des coupons ou rendements plus attractifs.",
      explanation:
        "Le prix de l'obligation existante doit baisser pour que son rendement effectif redevienne compétitif avec les nouvelles émissions.",
      commonMistake:
        "Ne pas confondre coupon fixe et rendement de marché : le coupon ne change pas, mais le prix peut changer.",
      front: "Que se passe-t-il au prix d'une obligation existante quand les taux montent ?",
      back: "Son prix baisse généralement, car les nouvelles obligations offrent des coupons ou rendements plus attractifs.",
      difficulty: 2,
      learningStage: 1,
      topics: ["obligation", "taux", "prix"],
      skills: ["mechanism"],
      tags: ["obligation", "taux", "prix"],
    },
    {
      id: "mf-found-l1-oblig-iq",
      type: "definition",
      questionType: "mechanism",
      question: "Pourquoi les prix des obligations baissent-ils quand les taux montent ?",
      shortAnswer:
        "Parce que les flux fixes de l'obligation sont actualisés à un taux plus élevé, ce qui réduit leur valeur actuelle.",
      explanation:
        "Il y a aussi une logique d'arbitrage : si le marché offre maintenant 4 %, une obligation existante à 2 % doit baisser de prix pour offrir un rendement comparable.",
      front: "Pourquoi les prix des obligations baissent-ils quand les taux montent ?",
      back: "Parce que les flux fixes de l'obligation sont actualisés à un taux plus élevé, ce qui réduit leur valeur actuelle.",
      difficulty: 2,
      learningStage: 1,
      topics: ["obligation", "taux", "actualisation"],
      skills: ["mechanism"],
      tags: ["obligation", "taux", "prix"],
    },
    {
      id: "mf-found-l1-oblig-ma",
      type: "definition",
      questionType: "definition",
      question: "Que mesure la duration d'une obligation ?",
      shortAnswer:
        "La duration mesure la sensibilité approximative du prix d'une obligation à une variation des taux.",
      explanation:
        "Une duration de 7 signifie qu'une hausse de taux de 1 point peut faire baisser le prix d'environ 7 %, toutes choses égales par ailleurs.",
      front: "Que mesure la duration d'une obligation ?",
      back: "La duration mesure la sensibilité approximative du prix d'une obligation à une variation des taux.",
      difficulty: 2,
      learningStage: 1,
      topics: ["obligation", "duration", "taux"],
      skills: ["definition"],
      tags: ["obligation", "taux", "duration"],
    },
  ],
};
