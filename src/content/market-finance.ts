import type { Track } from "@/lib/types";

export const marketFinanceTrack: Track = {
  id: "market-finance",
  title: "Finance de marché",
  description: "Les fondamentaux des marchés financiers, de A à Z.",
  emoji: "📈",
  color: "blue",
  worlds: [
    {
      id: "mf-world-1-market-basics",
      trackId: "market-finance",
      title: "Bases des marchés financiers",
      description: "Comprendre les instruments, les acteurs et les mécaniques de marché essentielles.",
      order: 1,
      lessonIds: [
        "mf-found-l1-action",
        "mf-found-l1-obligation",
        "mf-found-l1-rendement",
        "mf-found-l1-risque",
        "mf-found-l1-marche-primaire",
        "mf-found-l1-marche-secondaire",
        "mf-found-l1-market-cap",
        "mf-found-l1-dividende",
        "mf-found-l1-volume",
        "mf-found-l1-liquidite",
        "mf-found-l1-buyside-sellside",
        "mf-found-l1-acteurs",
        "mf-boss-1-market-basics",
      ],
      bossLessonId: "mf-boss-1-market-basics",
    },
  ],
  lessons: [
    {
      id: "mf-found-l1-action",
      slug: "action",
      title: "L'action",
      description: "Comprendre ce qu'est une action et ce qu'elle représente",
      estimatedMinutes: 7,
      cards: [
        {
          id: "mf-found-l1-action-def",
          type: "definition",
          questionType: "definition",
          question: "Qu'est-ce qu'une action ?",
          shortAnswer:
            "Une action est un titre de propriété représentant une fraction du capital d'une entreprise.",
          explanation:
            "L'actionnaire est copropriétaire : il peut recevoir des dividendes, voter en assemblée générale et profiter d'une hausse du cours. En contrepartie, il supporte le risque résiduel : en cas de faillite, il passe après les créanciers.",
          front: "Qu'est-ce qu'une action ?",
          back: "Une action est un titre de propriété représentant une fraction du capital d'une entreprise.",
          difficulty: 1,
          learningStage: 1,
          topics: ["action", "equity", "capital"],
          skills: ["definition"],
          tags: ["action", "equity"],
        },
        {
          id: "mf-found-l1-action-intuition",
          type: "definition",
          questionType: "mechanism",
          question: "Pourquoi dit-on qu'acheter une action revient à devenir associé d'une entreprise ?",
          shortAnswer:
            "Parce que l'actionnaire détient une part du capital : il participe à la création de valeur, mais supporte aussi le risque économique de l'entreprise.",
          explanation:
            "Si l'entreprise grandit, le cours peut monter et l'actionnaire peut toucher des dividendes. Si elle va mal, le cours baisse et la perte peut aller jusqu'au capital investi.",
          front: "Pourquoi dit-on qu'acheter une action revient à devenir associé d'une entreprise ?",
          back: "Parce que l'actionnaire détient une part du capital : il participe à la création de valeur, mais supporte aussi le risque économique de l'entreprise.",
          difficulty: 1,
          learningStage: 1,
          topics: ["action", "risque", "plus-value"],
          skills: ["mechanism"],
          tags: ["action", "risque"],
        },
        {
          id: "mf-found-l1-action-example",
          type: "example",
          questionType: "quick-calculation",
          question: "Vous achetez une action à 800 euros et elle monte à 900 euros. Quelle est votre plus-value ?",
          shortAnswer:
            "La plus-value est de 100 euros par action, avant impôts et frais.",
          formula: "Plus-value = Prix de vente - Prix d'achat",
          example:
            "Si vous possédez 10 actions, la plus-value latente est 10 × 100 = 1 000 euros.",
          front: "Vous achetez une action à 800 euros et elle monte à 900 euros. Quelle est votre plus-value ?",
          back: "La plus-value est de 100 euros par action, avant impôts et frais.",
          difficulty: 1,
          learningStage: 1,
          topics: ["action", "p&l", "plus-value"],
          skills: ["quick-calculation"],
          tags: ["action", "p&l"],
        },
        {
          id: "mf-found-l1-action-trap",
          type: "definition",
          questionType: "definition",
          question: "Une action sans dividende est-elle forcément une mauvaise action ?",
          shortAnswer:
            "Non. Une entreprise peut créer de la valeur en réinvestissant ses bénéfices plutôt qu'en les distribuant.",
          explanation:
            "Les entreprises de croissance privilégient souvent l'investissement, la R&D ou les acquisitions. La rémunération de l'actionnaire peut alors venir surtout de la hausse du cours.",
          commonMistake:
            "Ne pas confondre absence de dividende et absence de création de valeur.",
          front: "Une action sans dividende est-elle forcément une mauvaise action ?",
          back: "Non. Une entreprise peut créer de la valeur en réinvestissant ses bénéfices plutôt qu'en les distribuant.",
          difficulty: 2,
          learningStage: 1,
          topics: ["action", "dividende", "croissance"],
          skills: ["definition"],
          tags: ["action", "dividende", "croissance"],
        },
        {
          id: "mf-found-l1-action-iq",
          type: "definition",
          questionType: "comparison",
          question: "Quelle est la différence entre une action et une obligation ?",
          shortAnswer:
            "Une action est une part de capital : l'investisseur est propriétaire. Une obligation est une dette : l'investisseur est créancier.",
          explanation:
            "L'action offre un potentiel de hausse plus élevé mais passe après la dette en cas de faillite. L'obligation verse généralement un coupon et a une priorité de remboursement supérieure.",
          front: "Quelle est la différence entre une action et une obligation ?",
          back: "Une action est une part de capital : l'investisseur est propriétaire. Une obligation est une dette : l'investisseur est créancier.",
          difficulty: 1,
          learningStage: 1,
          topics: ["action", "obligation", "capital"],
          skills: ["comparison"],
          tags: ["action", "obligation"],
        },
        {
          id: "mf-found-l1-action-ma",
          type: "definition",
          questionType: "mechanism",
          question: "Pourquoi l'actionnaire exige-t-il généralement un rendement supérieur à l'obligataire ?",
          shortAnswer:
            "Parce que l'actionnaire porte le risque résiduel : il est servi après les créanciers et son rendement n'est pas contractuel.",
          explanation:
            "Le coupon obligataire est prévu à l'avance, alors que dividendes et plus-values sont incertains. Cette incertitude justifie une prime de risque equity.",
          front: "Pourquoi l'actionnaire exige-t-il généralement un rendement supérieur à l'obligataire ?",
          back: "Parce que l'actionnaire porte le risque résiduel : il est servi après les créanciers et son rendement n'est pas contractuel.",
          difficulty: 1,
          learningStage: 1,
          topics: ["action", "obligation", "prime-de-risque"],
          skills: ["mechanism"],
          tags: ["action", "obligation"],
        },
      ],
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
      id: "mf-found-l1-market-cap",
      slug: "capitalisation-boursiere",
      title: "La capitalisation boursière",
      description: "Calculer et interpréter la market cap d'une entreprise",
      estimatedMinutes: 6,
      cards: [
        {
          id: "mf-found-l1-cap-def",
          type: "definition",
          front: "Qu'est-ce que la capitalisation boursière ?",
          back: "Valeur totale de marché d'une entreprise cotée à un instant T. Elle se calcule : Cours de l'action × Nombre d'actions en circulation.",
          difficulty: 1,
          tags: ["market cap", "capitalisation"],
          detail: `**Nuance : actions en circulation ≠ actions totales émises**
- **Actions émises** : toutes les actions créées par l'entreprise
- **Actions en circulation (float)** : actions disponibles sur le marché (hors actions auto-détenues = trésorerie)
- **Free float** : actions réellement disponibles pour les investisseurs (hors bloc de contrôle des fondateurs)

**Exemple :** une entreprise avec 100 M d'actions émises, mais 20 M en autocontrôle et 30 M bloquées chez le fondateur → free float = 50 M × cours = market cap du free float

**Importance du free float :** plus le free float est bas, plus les mouvements de prix peuvent être amplifiés par des volumes limités.`,
        },
        {
          id: "mf-found-l1-cap-formula",
          type: "formula",
          front: "Market Cap = Cours × Nombre d'actions",
          back: "Exemple LVMH (2024) :\nCours ≈ 750 € × 500 M d'actions ≈ 375 Mds €\n\nTop mondial 2024 :\n• Apple : ~3 000 Mds $\n• Microsoft : ~3 000 Mds $\n• Nvidia : ~2 000 Mds $",
          difficulty: 1,
          tags: ["market cap", "LVMH", "calcul"],
          detail: `**Market Cap vs Enterprise Value (EV) :**

| Concept | Formule | Représente |
|---------|---------|-----------|
| Market Cap | Cours × Actions | Valeur des capitaux propres |
| Enterprise Value | Market Cap + Dette nette | Valeur totale de l'entreprise |

**EV = Market Cap + Dette financière nette (dette brute - trésorerie)**

**Pourquoi EV est plus pertinent pour les comparaisons :**
- Deux entreprises avec la même Market Cap mais des structures de dette différentes ont des EV très différentes
- L'EV est "structure-neutre" : on compare la valeur opérationnelle de l'entreprise indépendamment de la façon dont elle est financée

**Exemple :** une entreprise avec Market Cap 100 M€, dette 200 M€, trésorerie 50 M€ → EV = 100 + 200 - 50 = **250 M€**`,
        },
        {
          id: "mf-found-l1-cap-intuition",
          type: "intuition",
          front: "Market cap ≠ valeur réelle de l'entreprise",
          back: "La market cap reflète ce que le marché est prêt à payer aujourd'hui, pas la 'valeur intrinsèque'. Elle change à chaque seconde. Une entreprise peut être surévaluée (bulle) ou sous-évaluée (opportunité). C'est le point de départ de la valorisation, pas la conclusion.",
          difficulty: 1,
          tags: ["valorisation", "market cap"],
          detail: `**L'exemple de la bulle dot-com (2000) :**
Des entreprises sans revenus valaient des milliards en market cap. Pets.com : IPO à 300 M$ de market cap, moins de 20 M$ de revenus, liquidée 9 mois plus tard.

**L'exemple inverse (sous-évaluation) :**
En 2009, des banques européennes cotaient à 0,3× leur valeur comptable — le marché anticipait des pertes massives non encore reconnues. Ceux qui ont acheté à ces niveaux ont fait 5-10× en quelques années.

**La market cap est un consensus momentané :** elle agrège les anticipations de millions d'investisseurs avec des horizons et informations différents. Elle peut se tromper — c'est ce qui crée les opportunités d'investissement.`,
        },
        {
          id: "mf-found-l1-cap-iq",
          type: "interview-question",
          front: "Comment calculez-vous la capitalisation boursière et quelles sont ses limites ?",
          back: "Market Cap = cours × actions en circulation. Limites : n'inclut pas la dette, varie seconde par seconde, peut refléter des bulles ou sous-évaluations, ignore le free float.",
          difficulty: 1,
          tags: ["market cap"],
          detail: `**Structure de réponse (2 min) :**
1. Formule simple : Cours × Actions en circulation
2. Première limite : ne mesure que la valeur des capitaux propres, pas de l'entreprise entière (oublier la dette)
3. Deuxième limite : instantanéité → fluctue en permanence, difficile à utiliser comme référence stable
4. Troisième limite : peut refléter des irrationalités de marché (bulles, paniques)
5. Solution : utiliser l'EV (Enterprise Value) pour une vision plus complète

**Bonne transition :** "C'est pourquoi pour comparer des entreprises, j'utilise l'EV plutôt que la simple market cap."`,
        },
        {
          id: "mf-found-l1-cap-ma",
          type: "model-answer",
          front: "Réponse : market cap et ses limites",
          back: "Market cap = cours × nombre d'actions. Limite principale : ne reflète que la valeur des capitaux propres, pas la dette. L'enterprise value (EV = market cap + dette nette) est plus pertinente pour comparer des entreprises avec des structures financières différentes.",
          difficulty: 1,
          tags: ["market cap", "enterprise value", "EV"],
          detail: `**Réponse enrichie pour se distinguer :**

"La market cap = cours × actions en circulation. Sa première limite est de n'intégrer que les capitaux propres : pour comparer deux entreprises, je préfère l'Enterprise Value qui ajoute la dette nette. Sa deuxième limite est d'être un snapshot instantané soumis aux mouvements irrationnels du marché. Enfin, le free float (portion réellement échangeable) peut être bien inférieur à la market cap totale — ce qui peut amplifier la volatilité."

**Chiffre à retenir :** les 10 plus grandes entreprises mondiales (par market cap) représentent ~20 % de l'indice MSCI World.`,
        },
      ],
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
      id: "mf-boss-1-market-basics",
      slug: "boss-market-basics",
      title: "Boss 1 — Bases des marchés",
      description: "Valider les notions fondamentales du premier monde.",
      estimatedMinutes: 10,
      kind: "boss",
      worldId: "mf-world-1-market-basics",
      order: 13,
      cards: [
        {
          id: "mf-boss-1-financial-market-def",
          type: "definition",
          questionType: "definition",
          question: "Qu'est-ce qu'un marché financier ?",
          shortAnswer:
            "Un marché financier est un lieu physique ou électronique où des acheteurs et des vendeurs échangent des actifs financiers à un prix de marché.",
          explanation:
            "Le marché sert à former les prix, transférer le risque et permettre aux entreprises ou États de se financer. Il peut être organisé en bourse ou de gré à gré.",
          front: "Qu'est-ce qu'un marché financier ?",
          back: "Un marché financier est un lieu physique ou électronique où des acheteurs et des vendeurs échangent des actifs financiers à un prix de marché.",
          difficulty: 1,
          learningStage: 1,
          topics: ["marché", "prix", "actifs-financiers"],
          skills: ["definition"],
          tags: ["marché", "prix"],
        },
        {
          id: "mf-boss-1-equity-bond-comparison",
          type: "definition",
          questionType: "comparison",
          question: "Quelle est la différence fondamentale entre une action et une obligation ?",
          shortAnswer:
            "Une action représente une part de propriété dans une entreprise. Une obligation représente une dette : l'investisseur prête de l'argent et devient créancier.",
          explanation:
            "L'actionnaire a un upside plus élevé mais passe après les créanciers en cas de faillite. L'obligataire reçoit généralement des coupons et est prioritaire dans la structure de capital.",
          front: "Quelle est la différence fondamentale entre une action et une obligation ?",
          back: "Une action représente une part de propriété. Une obligation représente une dette : l'investisseur prête de l'argent et devient créancier.",
          difficulty: 1,
          learningStage: 1,
          topics: ["action", "obligation", "structure-du-capital"],
          skills: ["comparison"],
          tags: ["action", "obligation"],
        },
        {
          id: "mf-boss-1-total-return-formula",
          type: "formula",
          questionType: "formula",
          question: "Comment calcule-t-on le rendement total d'un investissement ?",
          shortAnswer:
            "Le rendement total compare le gain global au capital investi, en incluant la variation de prix et les revenus reçus.",
          formula: "Rendement total = (Prix final - Prix initial + Revenus) / Prix initial",
          example: "Achat 100, vente 110, dividende 3 : rendement = (110 - 100 + 3) / 100 = 13 %.",
          front: "Comment calcule-t-on le rendement total d'un investissement ?",
          back: "Rendement total = (Prix final - Prix initial + Revenus) / Prix initial.",
          difficulty: 1,
          learningStage: 1,
          topics: ["rendement", "performance", "dividende"],
          skills: ["formula"],
          tags: ["rendement", "calcul"],
        },
        {
          id: "mf-boss-1-risk-return-mechanism",
          type: "definition",
          questionType: "mechanism",
          question: "Pourquoi rendement attendu et risque sont-ils liés ?",
          shortAnswer:
            "Plus un investissement est risqué, plus les investisseurs exigent un rendement attendu élevé pour accepter ce risque.",
          explanation:
            "Cette compensation s'appelle une prime de risque. Une obligation d'État solide paie moins qu'une obligation high yield car le risque de défaut est plus faible.",
          front: "Pourquoi rendement attendu et risque sont-ils liés ?",
          back: "Plus un investissement est risqué, plus les investisseurs exigent un rendement attendu élevé pour accepter ce risque.",
          difficulty: 1,
          learningStage: 1,
          topics: ["risque", "rendement", "prime-de-risque"],
          skills: ["mechanism"],
          tags: ["risque", "rendement"],
        },
        {
          id: "mf-boss-1-primary-secondary-comparison",
          type: "definition",
          questionType: "comparison",
          question: "Quelle est la différence entre marché primaire et marché secondaire ?",
          shortAnswer:
            "Le marché primaire sert à émettre de nouveaux titres. Le marché secondaire sert à échanger des titres déjà émis entre investisseurs.",
          explanation:
            "Une IPO ou une émission obligataire a lieu sur le primaire. Les échanges quotidiens en bourse ont lieu sur le secondaire.",
          front: "Quelle est la différence entre marché primaire et marché secondaire ?",
          back: "Le primaire sert à émettre de nouveaux titres. Le secondaire sert à échanger des titres déjà émis.",
          difficulty: 1,
          learningStage: 1,
          topics: ["marché-primaire", "marché-secondaire", "émission"],
          skills: ["comparison"],
          tags: ["marché-primaire", "marché-secondaire"],
        },
        {
          id: "mf-boss-1-market-cap-formula",
          type: "formula",
          questionType: "formula",
          question: "Comment calcule-t-on la capitalisation boursière ?",
          shortAnswer:
            "La capitalisation boursière est la valeur de marché de l'equity d'une entreprise cotée.",
          formula: "Capitalisation boursière = Prix de l'action × Nombre d'actions en circulation",
          commonMistake:
            "Ne pas confondre prix unitaire de l'action et taille de l'entreprise : une action à 500 euros peut représenter une entreprise plus petite qu'une action à 20 euros.",
          front: "Comment calcule-t-on la capitalisation boursière ?",
          back: "Capitalisation boursière = Prix de l'action × Nombre d'actions en circulation.",
          difficulty: 1,
          learningStage: 1,
          topics: ["capitalisation", "action", "valeur-de-marché"],
          skills: ["formula"],
          tags: ["capitalisation", "action"],
        },
        {
          id: "mf-boss-1-volume-liquidity-comparison",
          type: "definition",
          questionType: "comparison",
          question: "Quelle est la différence entre volume et liquidité ?",
          shortAnswer:
            "Le volume mesure la quantité échangée. La liquidité mesure la facilité à acheter ou vendre rapidement sans trop déplacer le prix.",
          explanation:
            "Un actif très liquide a souvent beaucoup de volume, un carnet d'ordres profond et un spread serré.",
          front: "Quelle est la différence entre volume et liquidité ?",
          back: "Le volume mesure la quantité échangée. La liquidité mesure la facilité à acheter ou vendre rapidement sans trop déplacer le prix.",
          difficulty: 1,
          learningStage: 1,
          topics: ["volume", "liquidité", "marché-secondaire"],
          skills: ["comparison"],
          tags: ["volume", "liquidité"],
        },
        {
          id: "mf-boss-1-dividend-definition",
          type: "definition",
          questionType: "definition",
          question: "Qu'est-ce qu'un dividende ?",
          shortAnswer:
            "Un dividende est une partie du bénéfice distribuée aux actionnaires, généralement en cash, après décision de l'entreprise.",
          commonMistake:
            "Un dividende élevé n'est pas toujours bon signe : il peut aussi refléter peu d'opportunités de croissance ou une forte baisse du cours.",
          front: "Qu'est-ce qu'un dividende ?",
          back: "Un dividende est une partie du bénéfice distribuée aux actionnaires, généralement en cash.",
          difficulty: 1,
          learningStage: 1,
          topics: ["dividende", "action", "rendement"],
          skills: ["definition"],
          tags: ["dividende", "action"],
        },
        {
          id: "mf-boss-1-buyside-sellside-comparison",
          type: "definition",
          questionType: "comparison",
          question: "Quelle est la différence entre buy-side et sell-side ?",
          shortAnswer:
            "Le buy-side gère ou investit du capital. Le sell-side fournit des services de marché, de recherche, d'exécution ou de structuration.",
          explanation:
            "Un asset manager ou hedge fund est buy-side. Une banque d'investissement, un broker ou une desk de market making est sell-side.",
          front: "Quelle est la différence entre buy-side et sell-side ?",
          back: "Le buy-side gère ou investit du capital. Le sell-side fournit des services de marché, de recherche, d'exécution ou de structuration.",
          difficulty: 1,
          learningStage: 1,
          topics: ["buy-side", "sell-side", "acteurs"],
          skills: ["comparison"],
          tags: ["buy-side", "sell-side"],
        },
        {
          id: "mf-boss-1-market-actors-mechanism",
          type: "definition",
          questionType: "mechanism",
          question: "Pourquoi la diversité des acteurs aide-t-elle le marché à fonctionner ?",
          shortAnswer:
            "Des acteurs avec horizons et objectifs différents créent naturellement des acheteurs et des vendeurs, donc de la liquidité et de la formation de prix.",
          explanation:
            "Un fonds de pension peut investir sur 30 ans, un hedge fund sur quelques semaines et un market maker sur quelques secondes. Ces motivations différentes rendent l'échange possible.",
          front: "Pourquoi la diversité des acteurs aide-t-elle le marché à fonctionner ?",
          back: "Des acteurs avec horizons et objectifs différents créent des acheteurs et des vendeurs, donc de la liquidité et de la formation de prix.",
          difficulty: 1,
          learningStage: 1,
          topics: ["acteurs", "liquidité", "formation-des-prix"],
          skills: ["mechanism"],
          tags: ["acteurs", "liquidité"],
        },
      ],
    },
  ],
};
