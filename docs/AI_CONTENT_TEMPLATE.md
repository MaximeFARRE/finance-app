# AI Content Template — Finance Learning

Guide complet pour générer du contenu via IA (Claude, GPT-4, etc.) compatible
avec le système d'import YAML de l'application.

---

## Schéma YAML complet

```yaml
track: "identifiant-du-track"          # kebab-case, unique
title: "Titre du Track"                 # Affiché dans l'UI
emoji: "📈"                             # Un seul emoji
color: "blue"                           # blue | green | purple | orange | red | yellow
description: "Description courte."     # 1-2 phrases max

lessons:
  - id: "track-slug-de-la-leçon"       # kebab-case, unique globalement
    slug: "slug-de-la-leçon"           # identique au suffixe de l'id
    title: "Titre de la Leçon"
    description: "Description courte." # 1-2 phrases
    estimatedMinutes: 8                 # 5 à 15 typiquement

    cards:
      - id: ""                          # Laisser vide → généré automatiquement
        type: definition                # Voir types ci-dessous
        difficulty: 1                   # 1 | 2 | 3
        tags: [tag1, tag2]             # lowercase, kebab-case, max 4 tags
        front: "Question ou terme"      # Texte affiché recto, 1-2 lignes max
        back: "Réponse courte"          # Texte affiché verso, 2-4 lignes max
        detail: "Explication longue..." # Optionnel, markdown autorisé
```

---

## Formats de cartes

> **Important :** les leçons `l1-action`, `l1-obligation`, `l1-rendement`, `l1-risque`,
> `l1-marche-primaire`, `l1-marche-secondaire`, `l1-market-cap` ont été migrées vers
> le **nouveau format** (voir `AGENTS.md` dans la racine du projet). Les types
> `intuition`, `trap`, `interview-question` et `model-answer` y sont **interdits**.
> Utilisez ce template YAML uniquement pour les autres leçons (format legacy) ou
> pour créer de nouvelles leçons en legacy.

## Les 7 types de cartes (format legacy)

### 1. `definition` — Terme clé avec définition

La carte la plus courante. Définit un concept ou un terme financier.

```yaml
- id: ""
  type: definition
  difficulty: 1
  tags: [action, marché]
  front: "Qu'est-ce qu'une action ?"
  back: "Titre de propriété d'une fraction du capital d'une société."
  detail: |
    Acheter une action, c'est devenir actionnaire — donc copropriétaire de l'entreprise.
    L'actionnaire peut percevoir des **dividendes** (part des bénéfices distribués)
    et bénéficier de la **plus-value** si le cours monte.

    Contrairement à une obligation, une action ne garantit aucun remboursement.
```

---

### 2. `intuition` — Analogie ou image mentale

Aide à retenir le concept grâce à une métaphore ou un raisonnement intuitif.

```yaml
- id: ""
  type: intuition
  difficulty: 1
  tags: [action, analogie]
  front: "Quelle est l'intuition derrière le cours d'une action ?"
  back: "Le cours reflète ce que le marché est prêt à payer aujourd'hui pour les profits futurs de l'entreprise."
  detail: |
    Imaginez une pizzeria : quelqu'un vous propose d'en acheter 10 %.
    Si la pizzeria gagne 100 k€/an, ce 10 % vaut peut-être 50 k€.
    Si demain le quartier se gentrifie et que les bénéfices doublent,
    votre part vaut davantage — même si rien n'a physiquement changé.

    Le cours d'une action fonctionne exactement pareil :
    il capitalise les **attentes** de profits futurs.
```

---

### 3. `example` — Cas concret ou chiffre réel

Ancre le concept dans la réalité avec un exemple précis et mémorable.

```yaml
- id: ""
  type: example
  difficulty: 2
  tags: [obligation, taux, exemple]
  front: "Exemple chiffré : obligation à coupon fixe"
  back: "Obligation 1 000 € nominale, coupon 5 %, maturité 3 ans → 3 × 50 € + 1 000 € au terme."
  detail: |
    **Flux de l'investisseur :**
    - Investissement initial : –1 000 €
    - An 1 : +50 € (coupon = 5 % × 1 000)
    - An 2 : +50 €
    - An 3 : +1 050 € (coupon + remboursement du principal)

    Si les taux montent à 7 % après émission, personne ne voudra payer 1 000 €
    pour un coupon de 5 % → le prix de l'obligation **chute** sur le marché secondaire.
```

---

### 4. `formula` — Formule mathématique

Présente une formule avec ses variables et unités. Utiliser LaTeX-style pour les formules.

```yaml
- id: ""
  type: formula
  difficulty: 2
  tags: [rendement, calcul]
  front: "Formule du rendement actuariel (YTM)"
  back: "Prix = Σ [Coupon_t / (1+r)^t] + Nominal / (1+r)^n"
  detail: |
    **Variables :**
    - **r** = taux actuariel (YTM) — l'inconnue à résoudre
    - **Coupon_t** = flux à la date t
    - **Nominal** = valeur de remboursement (100 ou pair)
    - **n** = nombre de périodes jusqu'à maturité

    **Propriété clé :** prix et taux évoluent en sens **inverse**.
    Si r monte → le dénominateur grossit → le prix baisse.
```

---

### 5. `trap` — Erreur courante ou idée reçue

Signale un piège ou une confusion fréquente. Doit être percutant.

```yaml
- id: ""
  type: trap
  difficulty: 2
  tags: [dividende, piège]
  front: "⚠️ Piège : un dividende élevé est-il toujours bon signe ?"
  back: "Non — un dividende élevé peut signaler que l'entreprise manque d'opportunités d'investissement ou peine à conserver ses bénéfices."
  detail: |
    **Erreur fréquente :** confondre rendement du dividende élevé avec qualité de l'entreprise.

    **Cas réels à connaître :**
    - Une entreprise mûre (ex. utility) distribue 70 % de ses bénéfices car elle n'a plus où investir.
    - Une entreprise en croissance (ex. Amazon historiquement) ne distribuait rien — elle réinvestissait tout.

    **En entretien :** si on vous montre un dividende de 15 %, demandez-vous d'abord
    si le cours n'a pas chuté de 50 % (dividende = dividende/cours ↑ mécaniquement).
```

---

### 6. `interview-question` — Question ouverte style entretien

Question type Buy-side / IBD / Sales & Trading. Sans réponse unique, nécessite un `model-answer` associé.

```yaml
- id: ""
  type: interview-question
  difficulty: 3
  tags: [valorisation, dcf, entretien]
  front: "Comment valoriseriez-vous une entreprise non cotée ?"
  back: "Trois approches : DCF (flux futurs actualisés), multiples de comparables cotés, transactions comparables."
  detail: |
    **Structure de réponse attendue en entretien (2-3 min) :**
    1. Annoncer les 3 méthodes et les positionner (intrinsèque vs. marché)
    2. Développer le DCF : hypothèses clés (WACC, taux de croissance terminal)
    3. Nuancer : le DCF est très sensible aux hypothèses → importance des comparables
    4. Conclure : triangulation des 3 méthodes, expliquer les écarts
```

---

### 7. `model-answer` — Réponse modèle pour une interview-question

Doit partager au moins 1 tag avec l'`interview-question` associée (appariement automatique).

```yaml
- id: ""
  type: model-answer
  difficulty: 3
  tags: [valorisation, dcf, entretien]
  front: "Réponse modèle : valorisation d'une entreprise non cotée"
  back: |
    "Je commencerais par un DCF — actualiser les FCF sur 5 ans avec un WACC calculé
    via CAPM, puis une valeur terminale Gordon-Shapiro. En parallèle, je construirais
    un peer group de comparables cotés pour les multiples EV/EBITDA et P/E.
    Enfin, je regarderais les transactions récentes dans le secteur.
    Le DCF donne la valeur intrinsèque, les multiples ancrent dans la réalité de marché."
  detail: |
    **Points bonus en entretien :**
    - Citer un beta désendetté/réendetté pour le CAPM si la société cible n'est pas cotée
    - Mentionner la prime d'illiquidité (10-30 % de décote typique sur non-coté)
    - Reconnaître les limites : DCF très sensible au taux de croissance terminal
```

---

## Conventions de rédaction

| Règle | ✅ Correct | ❌ Incorrect |
|-------|-----------|-------------|
| **Langue** | Français, vouvoiement dans les IQ | Anglais sauf termes techniques |
| **Front** | Question directe ou terme seul | Phrase longue avec contexte |
| **Back** | 1 phrase de réponse nette | Liste à puces / paragraphe |
| **Detail** | Markdown structuré, bold pour mots clés | Texte brut sans mise en forme |
| **Tags** | `[action, bilan]` max 4 | `[action, bilan, comptabilité, actif, passif]` |
| **Difficulty** | 1 = définition de base, 3 = calcul/entretien | 2 pour une définition simple |
| **IDs** | Laisser vide (auto-généré à l'import) | Inventer un ID à la main |

---

## Prompt type — Générer une leçon complète

Copier-coller ce prompt dans Claude / GPT-4 en remplaçant les `[VARIABLE]` :

```
Tu es un expert en finance de marché et en pédagogie.
Génère une leçon complète sur le concept "[CONCEPT]" pour un étudiant
préparant des entretiens en finance (stages Buy-side / IBD / S&T).

Contraintes :
- Format YAML strict (voir schéma ci-dessous)
- Track ID : "[TRACK_ID]", lesson slug : "[LESSON_SLUG]"
- Laisser tous les `id` vides (seront générés à l'import)
- Minimum 12 cartes, maximum 20 cartes par leçon
- Répartition requise :
  * 3-4 cartes `definition` (difficulty 1)
  * 2-3 cartes `intuition` (difficulty 1-2)
  * 2-3 cartes `example` (difficulty 2) avec chiffres réels
  * 1-2 cartes `formula` si le concept s'y prête (difficulty 2)
  * 2-3 cartes `trap` sur les erreurs fréquentes en entretien (difficulty 2)
  * 1-2 paires `interview-question` + `model-answer` (difficulty 3)
    Les tags de la MA doivent inclure au moins 1 tag de l'IQ associée.
- Tags : kebab-case, max 4 par carte, pertinents pour la recherche
- Chaque carte `detail` doit apporter une valeur ajoutée réelle
  (analogie, chiffre clé, erreur à éviter, structure de réponse)
- Terminologie anglaise acceptée pour les termes techniques standard
  (YTM, WACC, P/E, DCF, etc.) mais phrases en français

Schéma YAML attendu :
[COLLER LE SCHÉMA DE LA SECTION "Schéma YAML complet" CI-DESSUS]

Génère la leçon complète en YAML valide maintenant.
```

---

## Prompt type — Enrichir une leçon existante

Utiliser quand une leçon existe déjà mais manque de cartes ou de `detail` :

```
Tu es un expert en finance de marché et en pédagogie.
Voici une leçon existante sur "[CONCEPT]" au format YAML :

[COLLER LE YAML EXISTANT]

Tâches :
1. Ajouter le champ `detail` manquant sur les cartes qui n'en ont pas.
   Le detail doit apporter une vraie valeur (analogie, chiffre, erreur courante).

2. Ajouter les types de cartes manquants :
   [LISTE DES TYPES MANQUANTS : ex. "trap", "interview-question", "model-answer"]

3. Laisser les `id` existants inchangés. Mettre "" pour les nouvelles cartes.

4. Ne pas modifier les cartes existantes sauf pour ajouter `detail`.

Retourne l'intégralité du YAML mis à jour, valide et complet.
```

---

## Prompt type — Générer le track Corporate Finance

```
Tu es un expert en finance d'entreprise (Corporate Finance) et en pédagogie.
Génère un track complet "Corporate Finance" pour un étudiant
préparant des entretiens IBD / M&A / LevFin.

Track :
- id: "corporate-finance"
- title: "Corporate Finance"
- emoji: "🏦"
- color: "purple"

Leçons à créer (une par une, séparément si nécessaire) :
1. slug: "structure-du-capital" — Debt vs Equity, WACC, Modigliani-Miller
2. slug: "valorisation-dcf" — Free Cash Flow, WACC, valeur terminale, sensibilités
3. slug: "comparables" — EV/EBITDA, P/E, Price/Book, peer group construction
4. slug: "fusions-acquisitions" — Processus M&A, synergies, accrétion/dilution
5. slug: "lbo" — Structure LBO, dette senior/mezz, IRR, returns

Pour chaque leçon, appliquer les contraintes de la template (12-20 cartes,
tous les types représentés, IQ/MA pairs, details obligatoires).

Commence par la leçon 1 : "structure-du-capital".
```

---

## Erreurs courantes à vérifier dans le output IA

Avant d'importer un YAML généré par IA, vérifier systématiquement :

### Structure
- [ ] Le `track` ID correspond bien au track cible
- [ ] Chaque `lesson.id` est unique et suit le pattern `{track}-{slug}`
- [ ] Les `slug` des leçons correspondent aux suffixes des `id`
- [ ] Tous les `card.id` sont bien vides `""` (pas inventés)

### Appariement IQ / MA
- [ ] Chaque `interview-question` a au moins une `model-answer` dans la même leçon
- [ ] Les tags de la MA incluent ≥1 tag de l'IQ (pour l'appariement automatique)

### Qualité du contenu
- [ ] Les `back` sont concis (1-2 phrases max, pas de listes à puces)
- [ ] Les `detail` apportent une valeur réelle (pas juste répéter le `back`)
- [ ] Les `trap` commencent par un signal clair (ex: "⚠️ Piège :")
- [ ] La difficulté est cohérente : d1=basique, d2=intermédiaire, d3=expert

### Tags
- [ ] Maximum 4 tags par carte
- [ ] Tags en kebab-case : `marché-primaire` et non `marché primaire`
- [ ] Tags suffisamment généraux pour regrouper des cartes connexes

### YAML syntax
- [ ] Pas de tabulations (utiliser 2 espaces)
- [ ] Les textes multi-lignes utilisent `|` ou `>`
- [ ] Les caractères spéciaux dans les strings sont échappés ou entre guillemets
- [ ] Le YAML se parse sans erreur (tester sur yaml.org/start.html)
