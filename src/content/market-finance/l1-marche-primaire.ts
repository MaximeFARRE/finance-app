import type { Lesson } from "@/lib/types";

export const lessonMarchePrimaire: Lesson = {
  id: "mf-found-l1-marche-primaire",
  slug: "marche-primaire",
  title: "Le marché primaire",
  description: "Comprendre comment les entreprises et États lèvent des capitaux",
  estimatedMinutes: 7,
  cards: [
    {
      id: "mf-found-l1-mp-def",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce que le marché primaire ?",
      shortAnswer:
        "Le marché primaire est le marché où de nouveaux titres sont émis pour la première fois afin de lever des capitaux.",
      explanation:
        "Les émetteurs, comme les entreprises ou les États, y vendent de nouvelles actions ou obligations directement aux investisseurs.",
      front: "Qu'est-ce que le marché primaire ?",
      back: "Le marché primaire est le marché où de nouveaux titres sont émis pour la première fois afin de lever des capitaux.",
      difficulty: 1,
      learningStage: 1,
      topics: ["marché-primaire", "émission", "financement"],
      skills: ["definition"],
      tags: ["marché primaire"],
    },
    {
      id: "mf-found-l1-mp-intuition",
      type: "definition",
      questionType: "mechanism",
      question: "Pourquoi dit-on que le marché primaire finance directement les émetteurs ?",
      shortAnswer:
        "Parce que l'argent des investisseurs va à l'émetteur lorsqu'il crée ou vend de nouveaux titres.",
      explanation:
        "Lors d'une émission obligataire, l'État ou l'entreprise reçoit les fonds. Lors d'une augmentation de capital primaire, l'entreprise reçoit aussi les fonds.",
      front: "Pourquoi dit-on que le marché primaire finance directement les émetteurs ?",
      back: "Parce que l'argent des investisseurs va à l'émetteur lorsqu'il crée ou vend de nouveaux titres.",
      difficulty: 1,
      learningStage: 1,
      topics: ["marché-primaire", "financement", "émission"],
      skills: ["mechanism"],
      tags: ["IPO", "financement"],
    },
    {
      id: "mf-found-l1-mp-example",
      type: "example",
      questionType: "definition",
      question: "Quels sont des exemples d'opérations de marché primaire ?",
      shortAnswer:
        "Une IPO, une émission obligataire et une augmentation de capital sont des opérations de marché primaire.",
      explanation:
        "Dans chaque cas, de nouveaux titres peuvent être proposés aux investisseurs pour financer l'émetteur ou organiser son accès au marché.",
      example:
        "Une entreprise qui émet de nouvelles actions pour financer une acquisition utilise le marché primaire.",
      front: "Quels sont des exemples d'opérations de marché primaire ?",
      back: "Une IPO, une émission obligataire et une augmentation de capital sont des opérations de marché primaire.",
      difficulty: 1,
      learningStage: 1,
      topics: ["marché-primaire", "ipo", "obligation"],
      skills: ["definition"],
      tags: ["IPO", "OAT", "augmentation de capital"],
    },
    {
      id: "mf-found-l1-mp-trap",
      type: "definition",
      questionType: "comparison",
      question: "Dans une IPO, quelle est la différence entre primary shares et secondary shares ?",
      shortAnswer:
        "Les primary shares sont de nouvelles actions vendues pour financer l'entreprise. Les secondary shares sont des actions existantes vendues par des actionnaires.",
      explanation:
        "Dans le second cas, l'argent va aux vendeurs, pas à l'entreprise.",
      commonMistake:
        "Croire que tout le montant d'une IPO va automatiquement dans les caisses de l'entreprise.",
      front: "Dans une IPO, quelle est la différence entre primary shares et secondary shares ?",
      back: "Les primary shares sont de nouvelles actions vendues pour financer l'entreprise. Les secondary shares sont des actions existantes vendues par des actionnaires.",
      difficulty: 2,
      learningStage: 1,
      topics: ["marché-primaire", "ipo", "financement"],
      skills: ["comparison"],
      tags: ["IPO", "marché primaire", "financement"],
    },
    {
      id: "mf-found-l1-mp-iq",
      type: "definition",
      questionType: "mechanism",
      question: "Quelles sont les grandes étapes d'une IPO ?",
      shortAnswer:
        "Les grandes étapes sont la sélection des banques, la préparation du prospectus, le roadshow, le bookbuilding, le pricing puis la cotation.",
      explanation:
        "Le roadshow sert à présenter l'entreprise aux investisseurs. Le bookbuilding collecte la demande pour aider à fixer le prix final.",
      front: "Quelles sont les grandes étapes d'une IPO ?",
      back: "Les grandes étapes sont la sélection des banques, la préparation du prospectus, le roadshow, le bookbuilding, le pricing puis la cotation.",
      difficulty: 3,
      learningStage: 1,
      topics: ["marché-primaire", "ipo", "processus"],
      skills: ["mechanism"],
      tags: ["IPO", "marché primaire", "processus"],
    },
    {
      id: "mf-found-l1-mp-ma",
      type: "definition",
      questionType: "mechanism",
      question: "À quoi servent le roadshow et le livre d'ordres dans une IPO ?",
      shortAnswer:
        "Le roadshow présente l'entreprise aux investisseurs. Le livre d'ordres mesure la demande et aide à fixer le prix et l'allocation.",
      explanation:
        "Si la demande est forte, le prix peut être fixé haut dans la fourchette. Si elle est faible, l'opération peut être repricée ou reportée.",
      front: "À quoi servent le roadshow et le livre d'ordres dans une IPO ?",
      back: "Le roadshow présente l'entreprise aux investisseurs. Le livre d'ordres mesure la demande et aide à fixer le prix et l'allocation.",
      difficulty: 3,
      learningStage: 1,
      topics: ["marché-primaire", "ipo", "bookbuilding"],
      skills: ["mechanism"],
      tags: ["IPO", "marché primaire"],
    },
  ],
};
