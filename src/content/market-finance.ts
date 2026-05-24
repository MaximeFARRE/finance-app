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
          front: "Qu'est-ce que le rendement ?",
          back: "Gain total d'un investissement exprimé en pourcentage du capital investi sur une période donnée. Il comprend les revenus (dividendes, coupons) et les plus ou moins-values.",
          difficulty: 1,
          tags: ["rendement"],
          detail: `**Deux composantes du rendement :**
- **Rendement en revenu** (income return) : dividendes, coupons, loyers — flux reçus pendant la détention
- **Rendement en capital** (capital return) : plus ou moins-value entre le prix d'achat et de vente

**Exemple :** une action achetée 100 €, revendue 115 € après avoir reçu 5 € de dividende
→ Rendement total = (15 + 5) / 100 = **20 %** sur la période

**Rendement annualisé :** si la période est de 2 ans, le rendement annualisé ≈ √1,20 - 1 ≈ 9,5 %/an`,
        },
        {
          id: "mf-found-l1-rend-formula",
          type: "formula",
          front: "Formule du rendement simple",
          back: "Rendement = (Plus-value + Revenus) / Capital investi × 100 %\n\nEx : achat 100 €, vente 110 €, dividende reçu 3 €\n→ Rendement = (10 + 3) / 100 = 13 %",
          difficulty: 1,
          tags: ["rendement", "calcul"],
          detail: `**Formules à maîtriser :**

**Rendement simple (holding period return) :**
R = (P₁ - P₀ + D) / P₀

Où : P₀ = prix d'achat, P₁ = prix de vente, D = dividendes reçus

**Rendement annualisé (CAGR) :**
CAGR = (P₁/P₀)^(1/n) - 1

Où n = nombre d'années

**Rendement actuariel (YTM) pour une obligation :**
Résoudre : P₀ = Σ [Ct / (1+r)^t] + N/(1+r)^n

**En entretien :** toujours préciser si vous parlez de rendement brut ou net (après frais et impôts).`,
        },
        {
          id: "mf-found-l1-rend-intuition",
          type: "intuition",
          front: "Rendement et risque sont indissociables",
          back: "Plus un investissement est risqué, plus les investisseurs exigent un rendement élevé pour compenser. C'est la prime de risque. Une OAT française à 3 % vs une obligation d'une PME à 8 % : l'écart rémunère le risque de défaut supplémentaire.",
          difficulty: 1,
          tags: ["rendement", "risque", "prime"],
          detail: `**La hiérarchie des rendements attendus (en ordre croissant de risque) :**
1. Obligations d'État AAA (~2-4 %) — taux "sans risque"
2. Obligations d'État BB-B (~5-8 %) — risque souverain
3. Obligations corporate investment grade (~4-6 %)
4. Obligations high yield ("junk bonds") (~7-12 %)
5. Actions (~8-12 % de rendement historique long terme)
6. Private Equity (~15-20 % TRI visé)
7. Venture Capital (~20 %+ avec taux d'échec élevé)

**Principe fondamental :** un rendement plus élevé sans risque plus élevé est une anomalie qui ne peut pas durer. Si quelqu'un vous propose 15 % "sans risque", c'est soit une erreur soit une fraude.`,
        },
        {
          id: "mf-found-l1-rend-trap",
          type: "trap",
          front: "Piège : rendement brut ≠ rendement net",
          back: "Le rendement brut ignore les frais de courtage, la fiscalité (30 % flat tax en France) et l'inflation. Un rendement de 5 % brut peut devenir négatif en termes réels si l'inflation est à 6 %. Toujours raisonner en net réel.",
          difficulty: 2,
          tags: ["rendement", "fiscalité", "inflation"],
          detail: `**Le chemin de 5 % brut à rendement réel net :**
- Rendement brut : **5,0 %**
- Moins frais de courtage (0,2 %) : **4,8 %**
- Moins flat tax 30 % (sur gains et revenus) : **3,36 %**
- Moins inflation 2,5 % : **rendement réel net ≈ 0,8 %**

**L'inflation est le grand oublié :** 1 000 € à 3 %/an pendant 30 ans = 2 427 € nominaux. Mais si l'inflation moyenne est 2 %/an, le pouvoir d'achat réel n'augmente que de ~35 % sur 30 ans (taux réel ≈ 1 %).

**Règle en entretien :** quand on vous parle de performances ou projections, demandez toujours si c'est nominal ou réel, brut ou net de frais.`,
        },
        {
          id: "mf-found-l1-rend-iq",
          type: "interview-question",
          front: "Qu'est-ce que le taux sans risque et comment l'estimez-vous en pratique ?",
          back: "Taux de rendement d'un actif théoriquement sans risque de défaut. En pratique : rendement des obligations d'État des pays les plus sûrs (T-bill US, Bund allemand). Base de tout modèle de valorisation (CAPM, DCF).",
          difficulty: 2,
          tags: ["rendement", "taux", "CAPM"],
          detail: `**Structure de réponse (2 min) :**
1. Définir le taux sans risque théorique (actif sans risque de défaut, pas de réinvestissement)
2. En pratique : T-bill 3 mois US pour court terme, T-note 10 ans pour valorisation long terme
3. Pourquoi le 10 ans : correspond à l'horizon typique des projections DCF
4. En Europe : Bund 10 ans (Allemagne, notation AAA)

**Nuance importante :** même les Bunds ou T-notes ont un risque de taux (leur prix varie). Le "sans risque" signifie sans risque de défaut, pas sans risque de marché.

**Chiffres 2024 :** T-note 10 ans ~4,2 %, Bund 10 ans ~2,5 %, OAT 10 ans ~3,0 %`,
        },
        {
          id: "mf-found-l1-rend-ma",
          type: "model-answer",
          front: "Réponse : taux sans risque",
          back: "\"Le taux sans risque est le rendement d'un actif sans risque de défaut. En pratique j'utilise le rendement du T-note américain à 10 ans pour un DCF en USD, ou le Bund 10 ans en EUR. Aujourd'hui, le T-note 10 ans est autour de 4 %. C'est la base du CAPM pour calculer le coût des capitaux propres.\"",
          difficulty: 2,
          tags: ["rendement", "taux", "CAPM"],
          detail: `**Points bonus :**
- Distinguer court terme (T-bill 3 mois) vs long terme (T-note 10 ans) selon l'horizon de l'analyse
- Le taux sans risque + prime de risque equity historique (~5-6 %) + beta × prime = coût des capitaux propres (CAPM)
- En période de QE (2015-2021), taux sans risque quasi-nul → modèles de valorisation gonflés → surévaluation des actifs à duration longue (growth stocks)
- Remonter le taux sans risque de 0 % à 4 % réduit mécaniquement la valorisation de toute entreprise, même sans changement des bénéfices`,
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
          front: "Qu'est-ce que le risque en finance ?",
          back: "Possibilité que le rendement réel d'un investissement diffère du rendement attendu. Le risque peut être quantifié par la volatilité (écart-type des rendements). On distingue : risque de marché, de crédit, de liquidité, opérationnel.",
          difficulty: 1,
          tags: ["risque", "volatilité"],
          detail: `**Mesures quantitatives du risque :**
- **Volatilité (σ)** : écart-type des rendements journaliers/annuels. Une action avec σ = 30 %/an peut facilement varier de ±30 % sur un an
- **Value at Risk (VaR)** : perte maximale avec un niveau de confiance donné (ex : VaR 99 % à 1 jour = 2 M€ → moins d'1 % de chances de perdre plus de 2 M€ demain)
- **Beta (β)** : sensibilité d'un actif par rapport au marché. β > 1 = plus volatile que le marché

**Risque systématique vs idiosyncratique :**
- Systématique (non diversifiable) : risque de marché global (krach, guerre)
- Idiosyncratique (diversifiable) : risque spécifique à une entreprise (fraude, perte d'un dirigeant)`,
        },
        {
          id: "mf-found-l1-risque-example",
          type: "example",
          front: "Les 4 grands types de risques",
          back: "• Risque de marché : actions qui chutent lors d'un krach\n• Risque de crédit : émetteur qui fait défaut (ex : Lehman Brothers 2008)\n• Risque de liquidité : impossible de revendre rapidement sans décote\n• Risque opérationnel : erreur de trading, fraude (ex : Kerviel)",
          difficulty: 1,
          tags: ["risque", "crédit", "liquidité"],
          detail: `**Exemples historiques marquants par type :**

**Risque de marché :** crise 2008 (S&P 500 -57 %), COVID mars 2020 (-34 % en 5 semaines)

**Risque de crédit :** Lehman Brothers (2008, défaut sur ~600 Mds $ de dette), Evergrande (2021, ~300 Mds $ de dette)

**Risque de liquidité :** MBS (Mortgage-Backed Securities) en 2008 — devenus invendables du jour au lendemain malgré des notations AAA

**Risque opérationnel :**
- Jérôme Kerviel (SG, 2008) : 4,9 Mds € de pertes cachées
- Nick Leeson (Barings, 1995) : 827 M£ → faillite de la banque`,
        },
        {
          id: "mf-found-l1-risque-intuition",
          type: "intuition",
          front: "Risque ≠ perte certaine",
          back: "Le risque est l'incertitude du résultat, pas forcément une perte. Un actif risqué peut générer d'excellentes performances. Un actif 'sans risque apparent' peut cacher des risques non visibles (ex : un placement illiquide qui semble stable).",
          difficulty: 1,
          tags: ["risque", "incertitude"],
          detail: `**L'erreur classique :** confondre volatilité et risque permanent.
- Un actif très volatile peut être un excellent investissement sur le long terme (ex : actions tech)
- Un actif apparemment "stable" peut cacher un risque de défaut (ex : obligations d'entreprises zombies)

**La "volatilité positive" existe :** si votre portefeuille monte de 30 %, c'est aussi de la volatilité — mais personne ne s'en plaint.

**Principe de Taleb (Black Swan) :** les événements rares mais extrêmes sont systématiquement sous-estimés par les modèles de risque classiques. La crise de 2008 était "impossible" selon les modèles VaR des banques.`,
        },
        {
          id: "mf-found-l1-risque-iq",
          type: "interview-question",
          front: "Citez les principaux types de risques en finance de marché et donnez un exemple pour chacun.",
          back: "Risque de marché (krach), de crédit (défaut), de liquidité (ABS 2008), opérationnel (fraude Kerviel). Structurer : définir chaque type, donner 1 exemple historique, mentionner comment il se mesure/gère.",
          difficulty: 1,
          tags: ["risque"],
          detail: `**Conseils pour répondre à cette question :**
- Structurer la réponse en 4 catégories clairement nommées
- Pour chaque catégorie : définition + exemple + outil de mesure ou de gestion
- Montrer que vous connaissez les événements historiques récents
- Conclure en mentionnant l'agrégation des risques et la diversification

**Piège courant :** oublier le risque opérationnel (souvent négligé par les candidats), et ne pas mentionner le risque de contrepartie (très important en dérivés).`,
        },
        {
          id: "mf-found-l1-risque-ma",
          type: "model-answer",
          front: "Réponse : types de risques",
          back: "Risque de marché (krach 2008 : -40 % sur les actions), risque de crédit (défaut Lehman Brothers), risque de liquidité (ABS devenus invendables en 2008), risque opérationnel (fraude Kerviel chez SG). On peut aussi citer le risque de contrepartie et le risque réglementaire.",
          difficulty: 1,
          tags: ["risque"],
          detail: `**Réponse complète structurée :**

"Je distingue quatre grandes catégories :
1. **Risque de marché** : baisse de valeur due aux mouvements de marché. Exemple : le S&P 500 a perdu 57 % en 2008-2009.
2. **Risque de crédit** : défaut d'un émetteur. Exemple : Lehman Brothers a fait défaut sur 600 Mds $ en 2008.
3. **Risque de liquidité** : impossibilité de céder un actif au prix souhaité. En 2008, les MBS sont devenus invendables.
4. **Risque opérationnel** : erreurs internes ou fraudes. Kerviel a coûté 4,9 Mds € à la Société Générale.

Je citerais aussi le risque de contrepartie sur les dérivés OTC, et le risque réglementaire croissant depuis Bâle III."`,
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
          front: "Qu'est-ce que le marché primaire ?",
          back: "Marché sur lequel de nouveaux titres (actions, obligations) sont émis et vendus pour la première fois aux investisseurs. C'est là que les émetteurs (entreprises, États) lèvent des capitaux directement.",
          difficulty: 1,
          tags: ["marché primaire"],
          detail: `**Le circuit du marché primaire :**
1. L'émetteur mandate des **banques d'investissement** (arrangeurs, bookrunners)
2. Les banques structurent l'offre et conduisent le **roadshow** (présentation aux investisseurs)
3. Le **livre d'ordres** (orderbook) est constitué : les investisseurs expriment leur demande à différents prix
4. Le prix final est fixé et les titres sont **alloués** aux investisseurs
5. À la date de règlement-livraison, les fonds vont à l'émetteur

**Acteurs clés :** banques d'investissement (lead manager), avocats, agences de notation (pour les obligations), régulateurs (AMF en France, SEC aux US).`,
        },
        {
          id: "mf-found-l1-mp-intuition",
          type: "intuition",
          front: "Marché primaire = création de titres",
          back: "Lors d'une IPO, l'entreprise crée de nouvelles actions et les vend. L'argent va directement à l'entreprise. C'est du financement direct : l'entreprise n'emprunte pas à une banque, elle lève des fonds sur les marchés.",
          difficulty: 1,
          tags: ["IPO", "financement"],
          detail: `**Primaire vs Secondaire : qui reçoit l'argent ?**
- **Marché primaire** : l'argent va à l'**émetteur** (entreprise ou État). C'est un vrai financement.
- **Marché secondaire** : l'argent va à l'**investisseur vendeur**. L'émetteur ne reçoit rien.

**Analogie :** le marché primaire est comme la vente d'une maison neuve par le promoteur (il reçoit les fonds). Le secondaire est la revente de la même maison entre particuliers (le promoteur n'est plus dans la boucle).

**Impact réel de l'économie :** seul le marché primaire finance directement l'investissement des entreprises et les dépenses des États.`,
        },
        {
          id: "mf-found-l1-mp-example",
          type: "example",
          front: "Exemples d'opérations de marché primaire",
          back: "• IPO : Arm Holdings sur le Nasdaq (sept. 2023, 54 Mds $)\n• Émission obligataire : la France émet des OAT régulièrement\n• Augmentation de capital : une entreprise émet de nouvelles actions pour financer une acquisition\n• Privatisation : État cède des parts d'une entreprise publique",
          difficulty: 1,
          tags: ["IPO", "OAT", "augmentation de capital"],
          detail: `**Focus IPO — le processus en pratique :**
- **Pre-IPO** (6-12 mois avant) : sélection des banques, restructuration, préparation du prospectus
- **Roadshow** (2-3 semaines) : management présente l'entreprise à 50-100 investisseurs institutionnels
- **Pricing** : le soir avant la cotation, le prix est fixé sur la base des ordres reçus
- **J+1** : premier jour de cotation sur le marché secondaire

**Les grandes IPO françaises récentes :** EDF (2005, 7 Mds €), CNP Assurances, Technip, Eurofins.

**À noter :** une IPO donne de la liquidité aux actionnaires existants, pas seulement des fonds frais à l'entreprise. Les fondateurs/fonds PE peuvent vendre leurs parts lors de l'IPO.`,
        },
        {
          id: "mf-found-l1-mp-trap",
          type: "trap",
          front: "⚠️ Piège : marché primaire = toujours du financement frais ?",
          back: "Non — lors d'une IPO, une partie des actions vendues peut appartenir à des actionnaires existants (secondary offering). Dans ce cas, l'entreprise ne reçoit rien : seuls les vendeurs sont rémunérés.",
          difficulty: 2,
          tags: ["IPO", "marché primaire", "financement"],
          detail: `**Primary vs Secondary offering dans une IPO :**
- **Primary shares** : nouvelles actions émises → le produit va à l'entreprise (vrai financement)
- **Secondary shares** : actions existantes vendues par les actionnaires actuels (fondateurs, fonds PE) → le produit va aux vendeurs, pas à l'entreprise

**Exemple typique :** une IPO lève 500 M€ dont 200 M€ de primary (pour l'entreprise) et 300 M€ de secondary (pour les fonds qui sortent). L'entreprise ne lève que 200 M€.

**En entretien :** si on vous parle d'une IPO, précisez toujours la distinction primary/secondary pour montrer que vous comprenez où va réellement l'argent.`,
        },
        {
          id: "mf-found-l1-mp-iq",
          type: "interview-question",
          front: "Décrivez le processus d'une IPO, de la décision de s'introduire en bourse jusqu'au premier jour de cotation.",
          back: "Sélection des banques → due diligence & documentation → roadshow → constitution du livre d'ordres → pricing → cotation J+1. Durée typique : 6-18 mois.",
          difficulty: 3,
          tags: ["IPO", "marché primaire", "processus"],
          detail: `**Structure de réponse (3-4 min) :**
1. **Décision et sélection des banques** (12 mois avant) : mandats, beauty contest, rémunération (3-7 % des fonds levés)
2. **Préparation** (6-12 mois) : due diligence, restructuration si nécessaire, préparation du prospectus (document réglementaire exhaustif)
3. **Pre-marketing** (3 mois) : analyst presentations, pre-deal research publiée par les banques
4. **Roadshow** (2-3 semaines) : management + banquiers présentent à ~100 investisseurs institutionnels dans les grandes places (NY, Londres, Paris, Zurich)
5. **Pricing & allocation** (j-1) : fixation du prix final dans la fourchette annoncée, allocation des actions aux investisseurs
6. **Premier jour de cotation** : trading commence sur le marché secondaire

**Ce qui peut faire échouer une IPO :** mauvais timing de marché, valorisation trop élevée, manque d'intérêt institutionnel, problèmes de gouvernance révélés pendant la due diligence.`,
        },
        {
          id: "mf-found-l1-mp-ma",
          type: "model-answer",
          front: "Réponse : processus d'une IPO",
          back: "\"Une IPO prend typiquement 12 à 18 mois. L'entreprise sélectionne ses banques via un beauty contest, prépare le prospectus avec avocats et auditeurs, puis conduit un roadshow de 2-3 semaines auprès des institutionnels. Le livre d'ordres constitué, le prix est fixé la veille de la cotation. Le premier jour, les actions s'échangent sur le marché secondaire.\"",
          difficulty: 3,
          tags: ["IPO", "marché primaire"],
          detail: `**Précisions pour se distinguer :**
- Mentionner la **stabilisation** (greenshoe option) : les banques peuvent racheter des actions en marché pour soutenir le cours les 30 premiers jours
- La **lock-up period** : les actionnaires pré-IPO s'engagent généralement à ne pas vendre pendant 180 jours
- Le rôle du **stabilizing agent** qui gère la fourchette de prix indicative vs prix final
- En France : dossier déposé à l'**AMF** (Autorité des marchés financiers) qui vise le prospectus`,
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
          front: "Qu'est-ce que le marché secondaire ?",
          back: "Marché sur lequel s'échangent des titres déjà émis entre investisseurs. Aucun capital ne va à l'émetteur : c'est un simple transfert de propriété entre acheteur et vendeur. La Bourse est le principal marché secondaire.",
          difficulty: 1,
          tags: ["marché secondaire", "bourse"],
          detail: `**Les différentes formes de marché secondaire :**
- **Marchés organisés (exchanges)** : Euronext (Paris), NYSE, Nasdaq, LSE — prix transparent, centralisé, réglementé
- **Marchés de gré à gré (OTC)** : trading bilatéral entre deux parties, surtout pour les obligations, dérivés, produits structurés — moins transparent
- **MTF (Multilateral Trading Facilities)** : CBOE Europe, Turquoise — alternatives aux exchanges traditionnels

**Rôle des chambres de compensation (CCP) :** se posent entre acheteur et vendeur pour garantir le règlement-livraison et éliminer le risque de contrepartie.`,
        },
        {
          id: "mf-found-l1-ms-intuition",
          type: "intuition",
          front: "Marché secondaire = liquidité pour les investisseurs",
          back: "Sans marché secondaire, un investisseur qui achète une obligation à 10 ans serait bloqué pendant 10 ans. La Bourse permet de revendre à tout moment. C'est ce qui rend les titres financiers attractifs : on peut sortir quand on veut.",
          difficulty: 1,
          tags: ["liquidité", "marché secondaire"],
          detail: `**Le cercle vertueux de la liquidité :**
1. Un marché secondaire liquide attire plus d'investisseurs
2. Plus d'investisseurs → plus de transactions → marché encore plus liquide
3. Marché liquide → les émetteurs peuvent lever des fonds à meilleur prix sur le marché primaire

**L'importance pour le marché primaire :** si les investisseurs savent qu'ils peuvent revendre facilement leurs actions ou obligations, ils acceptent de les acheter à l'émission avec une décote moindre. La liquidité du secondaire **réduit le coût de financement** des émetteurs.

**Exemple :** le marché obligataire des PME est peu liquide → coût de financement plus élevé pour les PME vs les grands groupes.`,
        },
        {
          id: "mf-found-l1-ms-example",
          type: "example",
          front: "Marché secondaire au quotidien",
          back: "Quand tu achètes des actions Apple via un courtier, tu achètes à un autre investisseur via le NYSE (New York Stock Exchange). Apple ne reçoit rien : l'entreprise avait levé ses fonds lors de son IPO en 1980.",
          difficulty: 1,
          tags: ["Apple", "NYSE", "marché secondaire"],
          detail: `**Les chiffres du marché secondaire :**
- NYSE : ~20 milliards $ de volume quotidien
- Nasdaq : ~15 milliards $/jour
- Euronext Paris : ~3-5 milliards €/jour
- Marché obligataire mondial OTC : ~700 milliards $/jour

**Apple en 1980 vs 2024 :**
- IPO 1980 : 100 M$ levés (marché primaire)
- Capitalisation 2024 : ~3 000 milliards $ (marché secondaire)
- Chaque jour, des milliards de $ d'actions Apple s'échangent sans qu'Apple reçoive 1 dollar`,
        },
        {
          id: "mf-found-l1-ms-trap",
          type: "trap",
          front: "Piège : confondre les deux marchés",
          back: "Une IPO se passe sur le marché primaire, mais dès le 1er jour de cotation les échanges sur la Bourse sont du marché secondaire. Une augmentation de capital d'une entreprise déjà cotée est aussi du marché primaire (nouvelle émission).",
          difficulty: 1,
          tags: ["IPO", "marché primaire", "marché secondaire"],
          detail: `**Cas ambigus à maîtriser :**

| Opération | Marché | Argent vers |
|-----------|--------|------------|
| IPO (souscription) | Primaire | Entreprise |
| IPO J+1 (1er échange) | Secondaire | Vendeur |
| Augmentation de capital | Primaire | Entreprise |
| Rachat d'actions (buyback) | Secondaire | Actionnaires |
| Émission d'obligations | Primaire | Émetteur |
| Vente d'obligations en portefeuille | Secondaire | Vendeur |

**En entretien :** si on vous demande "où lève-t-on des capitaux ?", la réponse est toujours le marché **primaire**. Le secondaire ne finance pas les émetteurs.`,
        },
        {
          id: "mf-found-l1-ms-iq",
          type: "interview-question",
          front: "Quelle est l'utilité économique du marché secondaire si l'entreprise n'y reçoit aucun argent ?",
          back: "Le secondaire crée la liquidité qui rend le primaire possible. Sans possibilité de revendre, les investisseurs exigeraient une prime de risque massive pour immobiliser leur capital. Le secondaire réduit le coût du capital pour les émetteurs.",
          difficulty: 2,
          tags: ["marché secondaire", "liquidité"],
          detail: `**Structure de réponse (2 min) :**
1. Reconnaître l'apparente contradiction (l'émetteur ne reçoit rien)
2. Expliquer le mécanisme de la liquidité : les investisseurs acceptent de s'engager sur le primaire uniquement s'ils peuvent sortir via le secondaire
3. Exemple chiffré : sans secondaire liquide, une entreprise devrait offrir 2-3 % de plus pour lever des fonds (prime d'illiquidité)
4. Autres utilités : formation des prix, signal d'information sur la valeur des entreprises, allocation efficace du capital

**C'est une bonne question de fond** que les recruteurs posent pour tester la compréhension systémique au-delà des définitions.`,
        },
        {
          id: "mf-found-l1-ms-ma",
          type: "model-answer",
          front: "Réponse : utilité économique du marché secondaire",
          back: "\"Le secondaire est indispensable au primaire : il crée la liquidité qui permet aux investisseurs d'accepter de s'engager. Sans pouvoir revendre, ils exigeraient une prime d'illiquidité massive, ce qui renchérirait le coût de financement des entreprises. Le secondaire forme aussi les prix et alloue le capital vers les usages les plus productifs.\"",
          difficulty: 2,
          tags: ["marché secondaire", "liquidité"],
          detail: `**Arguments complémentaires à développer :**
- **Formation des prix (price discovery)** : le cours en temps réel agrège l'information de milliers d'acteurs → signal pour les dirigeants d'entreprise
- **Discipline managériale** : une chute du cours envoie un signal au management et au CA, peut provoquer un changement de stratégie ou d'équipe
- **Financement continu** : le cours boursier est une "monnaie" que l'entreprise peut utiliser pour financer des acquisitions (actions comme moyen de paiement)
- **Épargne longue** : les épargnants investissent à long terme (retraite) car ils savent pouvoir liquider leur position à tout moment`,
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
