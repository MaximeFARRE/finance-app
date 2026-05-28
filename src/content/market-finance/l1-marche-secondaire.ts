import type { Lesson } from "@/lib/types";

export const lessonMarcheSecondaire: Lesson = {
  id: "mf-found-l1-marche-secondaire",
  slug: "marche-secondaire",
  title: "Le marché secondaire",
  description: "Comprendre le rôle de la Bourse dans l'échange de titres existants",
  estimatedMinutes: 6,
  cards: [
    {
      id: "mf-found-l1-ms-def",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce que le marché secondaire ?",
      shortAnswer:
        "Le marché secondaire est le marché où des titres déjà émis s'échangent entre investisseurs.",
      explanation:
        "L'émetteur ne reçoit pas les fonds de ces échanges : l'argent va au vendeur. La Bourse est l'exemple le plus visible de marché secondaire.",
      front: "Qu'est-ce que le marché secondaire ?",
      back: "Le marché secondaire est le marché où des titres déjà émis s'échangent entre investisseurs.",
      difficulty: 1,
      learningStage: 1,
      topics: ["marché-secondaire", "bourse", "liquidité"],
      skills: ["definition"],
      tags: ["marché secondaire", "bourse"],
    },
    {
      id: "mf-found-l1-ms-intuition",
      type: "definition",
      questionType: "mechanism",
      question: "Pourquoi le marché secondaire apporte-t-il de la liquidité aux investisseurs ?",
      shortAnswer:
        "Parce qu'il permet aux investisseurs de revendre leurs titres sans attendre leur maturité ou un événement particulier.",
      explanation:
        "Sans marché secondaire, acheter une obligation à 10 ans signifierait rester bloqué pendant 10 ans. La possibilité de sortir rend les titres plus attractifs.",
      front: "Pourquoi le marché secondaire apporte-t-il de la liquidité aux investisseurs ?",
      back: "Parce qu'il permet aux investisseurs de revendre leurs titres sans attendre leur maturité ou un événement particulier.",
      difficulty: 1,
      learningStage: 1,
      topics: ["marché-secondaire", "liquidité", "investisseurs"],
      skills: ["mechanism"],
      tags: ["liquidité", "marché secondaire"],
    },
    {
      id: "mf-found-l1-ms-example",
      type: "example",
      questionType: "mechanism",
      question: "Quand vous achetez une action Apple en bourse, Apple reçoit-elle votre argent ?",
      shortAnswer:
        "Non. Vous achetez l'action à un autre investisseur sur le marché secondaire.",
      explanation:
        "Apple a reçu des fonds lors de son émission primaire. Les échanges quotidiens entre investisseurs ne financent pas directement l'entreprise.",
      front: "Quand vous achetez une action Apple en bourse, Apple reçoit-elle votre argent ?",
      back: "Non. Vous achetez l'action à un autre investisseur sur le marché secondaire.",
      difficulty: 1,
      learningStage: 1,
      topics: ["marché-secondaire", "action", "bourse"],
      skills: ["mechanism"],
      tags: ["Apple", "NYSE", "marché secondaire"],
    },
    {
      id: "mf-found-l1-ms-trap",
      type: "definition",
      questionType: "comparison",
      question: "Quelle est la différence entre marché primaire et marché secondaire ?",
      shortAnswer:
        "Le primaire sert à émettre de nouveaux titres et finance l'émetteur. Le secondaire sert à échanger des titres déjà émis entre investisseurs.",
      explanation:
        "Une IPO est primaire au moment de l'émission. Les échanges en bourse dès le premier jour de cotation sont secondaires.",
      commonMistake:
        "Penser qu'une entreprise reçoit de l'argent à chaque échange de ses actions en bourse.",
      front: "Quelle est la différence entre marché primaire et marché secondaire ?",
      back: "Le primaire sert à émettre de nouveaux titres et finance l'émetteur. Le secondaire sert à échanger des titres déjà émis entre investisseurs.",
      difficulty: 1,
      learningStage: 1,
      topics: ["marché-primaire", "marché-secondaire", "émission"],
      skills: ["comparison"],
      tags: ["IPO", "marché primaire", "marché secondaire"],
    },
    {
      id: "mf-found-l1-ms-iq",
      type: "definition",
      questionType: "mechanism",
      question: "Pourquoi le marché secondaire aide-t-il aussi le marché primaire ?",
      shortAnswer:
        "Parce que la liquidité du secondaire rassure les investisseurs, qui acceptent plus facilement d'acheter les titres à l'émission.",
      explanation:
        "Si les investisseurs savent qu'ils pourront revendre, ils demandent une prime d'illiquidité plus faible. Cela peut réduire le coût de financement des émetteurs.",
      front: "Quelle est l'utilité économique du marché secondaire si l'entreprise n'y reçoit aucun argent ?",
      back: "Parce que la liquidité du secondaire rassure les investisseurs, qui acceptent plus facilement d'acheter les titres à l'émission.",
      difficulty: 2,
      learningStage: 1,
      topics: ["marché-secondaire", "liquidité", "marché-primaire"],
      skills: ["mechanism"],
      tags: ["marché secondaire", "liquidité"],
    },
    {
      id: "mf-found-l1-ms-ma",
      type: "definition",
      questionType: "definition",
      question: "Qu'est-ce que la price discovery ?",
      shortAnswer:
        "La price discovery est le processus par lequel les échanges de marché agrègent l'information pour former un prix.",
      explanation:
        "Sur le marché secondaire, chaque ordre d'achat ou de vente apporte une information. Le prix devient un signal visible pour les investisseurs et les émetteurs.",
      front: "Qu'est-ce que la price discovery ?",
      back: "La price discovery est le processus par lequel les échanges de marché agrègent l'information pour former un prix.",
      difficulty: 2,
      learningStage: 1,
      topics: ["marché-secondaire", "price-discovery", "prix"],
      skills: ["definition"],
      tags: ["marché secondaire", "liquidité"],
    },
  ],
};
