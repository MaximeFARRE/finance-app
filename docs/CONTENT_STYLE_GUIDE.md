# Content Style Guide — Finance Learning

Référence canonique pour tout contributeur (humain ou IA) qui crée ou modifie
du contenu dans `src/content/`.

---

## 1. Conventions d'ID

### Pattern général

```
{trackId}-{lessonSlug}-{typeAbbrev}-{hash4}
```

| Composant | Règle | Exemple |
|-----------|-------|---------|
| `trackId` | ID du track, kebab-case | `market-finance` |
| `lessonSlug` | Slug de la leçon | `action` |
| `typeAbbrev` | Voir tableau ci-dessous | `def` |
| `hash4` | 4 chars hex, généré auto à l'import | `3a7f` |

### Abréviations de type

| Type | Abréviation |
|------|-------------|
| `definition` | `def` |
| `intuition` | `int` |
| `example` | `ex` |
| `formula` | `form` |
| `trap` | `trap` |
| `interview-question` | `iq` |
| `model-answer` | `ma` |

### Règles ID
- Toujours **laisser l'ID vide** dans les fichiers source importés via YAML — le générateur le calculera.
- Dans `src/content/*.ts`, les IDs sont définis manuellement à la création puis **ne changent plus jamais**.
- Un ID modifié = toute la progression SM-2 de l'utilisateur sur cette carte est perdue.
- En cas de collision (rare), le générateur ajoute un suffixe : `-2`, `-3`, etc.

---

## 2. Nommage des tracks et leçons

### Tracks

```
track.id    : kebab-case, court, décrit le domaine     → "market-finance", "corporate-finance"
track.emoji : 1 seul emoji thématique                   → "📈", "🏦", "📊"
track.color : parmi : blue | green | purple | orange | red | yellow
```

### Leçons

```
lesson.id   : "{trackId}-{slug}"   → "market-finance-action"
lesson.slug : suffixe seul          → "action"
lesson.title: Capitalisé, court     → "L'Action", "Valorisation DCF"
lesson.estimatedMinutes : 5-15 typiquement, basé sur le nombre de cartes
                          (environ 1 min par carte en mode learn)
```

### Ordre des leçons dans un track

Les leçons s'affichent dans l'ordre du tableau `lessons[]`. Respecter une
progression pédagogique :
1. Concepts fondamentaux (difficulty 1 dominant)
2. Mécanismes et calculs (difficulty 2 dominant)
3. Applications entretien (difficulty 3 dominant)

---

## 3. Tags

### Règles
- **kebab-case** obligatoire : `marché-primaire` et non `Marché Primaire`
- **Maximum 4 tags** par carte
- Tags **généraux** pour permettre les groupements (ex. `action`, `rendement`, `risque`)
- Tags **spécifiques** en complément si utile (ex. `dcf`, `wacc`, `lbo`)
- Pas de tag redondant avec le type (ne pas mettre `définition` sur une carte `definition`)

### Tags courants par domaine

**Marché financier**
`action`, `obligation`, `taux`, `rendement`, `risque`, `dividende`, `cours`,
`marché`, `liquidité`, `volume`, `capitalisation`, `indice`

**Corporate Finance**
`valorisation`, `dcf`, `wacc`, `multiple`, `ma`, `lbo`, `synergies`,
`dette`, `equity`, `capital`, `bilan`, `résultat`

**Techniques d'entretien**
`entretien`, `calcul`, `formule`, `analogie`, `piège`, `exemple`

---

## 4. Niveaux de difficulté

| Niveau | Quand l'utiliser | Exemples |
|--------|-----------------|---------|
| **1** | Définitions de base, concepts introductifs, analogies simples | "Qu'est-ce qu'une action ?", intuitions fondamentales |
| **2** | Mécanismes, calculs, exemples chiffrés, pièges courants | Formule YTM, exemple obligation, trap dividende |
| **3** | Questions d'entretien, cas complexes, combinaisons de concepts | IQ valorisation, MA structure LBO, formule WACC complète |

### Règle de déverrouillage (système)
- **d1** : toujours accessible
- **d2** : déverrouillé quand ≥ 70 % des cartes d1 de la leçon sont maîtrisées
- **d3** : déverrouillé quand ≥ 70 % des cartes d1+d2 sont maîtrisées

→ Il faut donc qu'une leçon ait **au moins 2-3 cartes d1** pour que le gating fonctionne.

---

## 5. Règles par type de carte

### `definition`
- `front` : terme seul ou question directe ("Qu'est-ce que X ?")
- `back` : définition en 1-2 phrases, sans jargon inutile
- `detail` : étymologie / analogie / nuance importante
- Difficulté : 1 pour concepts de base, 2 pour termes techniques avancés

### `intuition`
- `front` : "Quelle est l'intuition derrière X ?" ou "Comment retenir X ?"
- `back` : 1 phrase imagée, mémorable
- `detail` : développer l'analogie, montrer les limites si nécessaire
- Difficulté : 1-2

### `example`
- `front` : titre descriptif ("Exemple chiffré : obligation à coupon fixe")
- `back` : résumé en 1-2 lignes avec les chiffres clés
- `detail` : calcul complet, tableaux si pertinent, source si réel
- Difficulté : 2
- **Règle** : utiliser des chiffres ronds et mémorables (1 000 €, 5 %, etc.)

### `formula`
- `front` : "Formule de X" ou "Comment calculer X ?"
- `back` : la formule elle-même, lisible en texte brut
- `detail` : définition de chaque variable, unités, propriétés importantes
- Difficulté : 2-3
- **Règle** : une formule par carte, pas de formules combinées

### `trap`
- `front` : commence par "⚠️ Piège :" ou "⚠️ Erreur fréquente :"
- `back` : l'erreur en 1 phrase + la correction en 1 phrase
- `detail` : pourquoi l'erreur est fréquente, comment l'éviter en entretien
- Difficulté : 2
- **Règle** : chaque leçon doit avoir **au moins 1 trap**

### `interview-question` (IQ)
- `front` : question exacte telle qu'elle serait posée en entretien
- `back` : les 3 points clés de la réponse (structure annoncée)
- `detail` : réponse développée avec structure chronométrée (2-3 min)
- Difficulté : 3
- **Règle** : toujours accompagnée d'un `model-answer` dans la même leçon

### `model-answer` (MA)
- `front` : "Réponse modèle : [sujet de la question]"
- `back` : réponse complète entre guillemets, comme si prononcée à voix haute
- `detail` : points bonus, pièges à éviter, variantes selon l'interviewer
- Difficulté : 3
- **Règle** : les tags doivent inclure ≥ 1 tag commun avec l'IQ associée

---

## 6. Règles de composition d'une leçon

### Structure minimale requise

Chaque leçon **doit** contenir :
- [ ] ≥ 3 cartes `definition` (d1)
- [ ] ≥ 1 carte `intuition`
- [ ] ≥ 1 carte `example` avec chiffres réels
- [ ] ≥ 1 carte `trap`
- [ ] 1 paire `interview-question` + `model-answer` si la leçon est de niveau 3

### Taille recommandée

| Niveau de la leçon | Nb de cartes |
|--------------------|-------------|
| Introductive (d1 dominant) | 8-12 |
| Intermédiaire (d1+d2) | 12-16 |
| Avancée (d1+d2+d3) | 14-20 |

### Ordre des cartes dans une leçon

Respecter cet ordre pour la progression naturelle :
1. `definition` d1 (les plus fondamentales d'abord)
2. `intuition` d1
3. `definition` + `formula` d2
4. `example` d2
5. `trap` d2
6. `interview-question` + `model-answer` d3

L'ordre affecte l'expérience learn mais pas la révision (SM-2 gère l'ordre).

---

## 7. Appariement IQ / MA

Le système apparie automatiquement chaque `interview-question` avec la
`model-answer` ayant le plus de tags en commun.

### Exemple correct ✅
```yaml
- type: interview-question
  tags: [valorisation, dcf, entretien]   # 3 tags
  ...

- type: model-answer
  tags: [valorisation, dcf, entretien]   # 3 tags en commun → appariement parfait
  ...
```

### Exemple à éviter ❌
```yaml
- type: interview-question
  tags: [valorisation, dcf]

- type: model-answer
  tags: [lbo, dette]                      # 0 tag en commun → appariement aléatoire
```

### Si plusieurs IQ dans une leçon
Chaque IQ doit avoir un sous-ensemble de tags distinct :
```yaml
IQ1 : tags: [dcf, free-cash-flow]       → MA1 : tags: [dcf, free-cash-flow]
IQ2 : tags: [wacc, structure-du-capital] → MA2 : tags: [wacc, structure-du-capital]
```

---

## 8. Rédaction des textes

### Langue
- **Français** pour tout le contenu pédagogique
- **Anglais** conservé pour les termes techniques consacrés :
  `YTM`, `WACC`, `DCF`, `P/E`, `EV/EBITDA`, `LBO`, `M&A`, `IRR`, `FCF`, etc.
- **Vouvoiement** dans les questions d'entretien : "Pouvez-vous nous présenter..."
- **Tutoiement** accepté dans les `detail` et explications pédagogiques

### Ton
- Direct, sans fioritures
- Orienté entretien : "En entretien, on attend...", "Le recruteur veut entendre..."
- Factuel pour les définitions, anecdotique pour les intuitions/examples

### Markdown dans `detail`
Autorisé et recommandé :
- `**bold**` pour les termes clés
- `_italic_` pour l'emphase
- Listes à puces `- item` pour les énumérations
- Tableaux markdown pour les comparaisons
- Pas de titres (`#`) dans les `detail` (utiliser `**Titre :**` à la place)

### Longueur
| Champ | Max recommandé |
|-------|---------------|
| `front` | 120 caractères (2 lignes) |
| `back` | 300 caractères (3-4 lignes) |
| `detail` | 800 caractères (lisible en 30 sec) |

---

## 9. Modes de réponse interactifs

Les cartes peuvent déclencher trois modes de réponse différents selon les champs
renseignés. Un seul mode peut être actif par carte.

### Mode A — Carte classique (retournement)

Aucun champ supplémentaire. L'utilisateur lit la question, réfléchit, retourne la
carte et auto-évalue sa réponse (boutons 0–5 ou Facile/Moyen/Difficile).

C'est le mode par défaut si aucun des champs ci-dessous n'est présent.

---

### Mode B — QCM (`choices` + `correctIndex`)

Affiche 3 ou 4 propositions à choix unique. L'utilisateur sélectionne une réponse
et le système valide immédiatement.

**Champs requis :**

| Champ | Type | Règle |
|---|---|---|
| `choices` | `string[]` | 3 ou 4 options, toujours 4 en priorité |
| `correctIndex` | `number` | Index 0-basé de la bonne réponse |

**Quand l'utiliser :**
- Questions de définition ou de comparaison entre termes distincts
- Questions de calcul avec 4 résultats proposés (dont 2 distracteurs plausibles)
- Boss et sessions de révision rapide

**Règles de rédaction des options :**
- La bonne réponse ne doit pas se démarquer visuellement (même longueur approximative)
- Toujours proposer **2 distracteurs plausibles** (erreurs fréquentes) et **1 leurre évident**
- Éviter les options qui se contredisent toutes sauf une (trop facile)
- Ne pas commencer plusieurs options par le même mot
- Mélanger la position de la bonne réponse (ne pas toujours mettre en index 0)

**Exemple YAML :**
```yaml
- type: definition
  questionType: definition
  question: "Qu'est-ce que la duration d'une obligation ?"
  shortAnswer: "La sensibilité approximative du prix à une variation de taux."
  difficulty: 2
  choices:
    - "La durée de vie restante jusqu'à maturité"
    - "La sensibilité approximative du prix à une variation de taux"
    - "Le rendement actuariel à maturité (YTM)"
    - "Le montant total des coupons restants à verser"
  correctIndex: 1
```

---

### Mode C — Saisie numérique (`answerMode: "numeric"`)

Affiche un champ de saisie texte. L'utilisateur tape sa réponse chiffrée et le
système vérifie si elle est dans la tolérance définie.

**Réserver à :** questions de calcul dont la réponse est un nombre précis
(`quick-calculation`, certaines `formula`). Ne **pas** utiliser pour les questions
ouvertes, de définition ou de mécanisme.

**Champs requis :**

| Champ | Type | Règle |
|---|---|---|
| `answerMode` | `"numeric"` | Active la saisie numérique |
| `expectedAnswer` | `number` | Valeur correcte (ex. : `250`, `0.13`) |
| `answerUnit` | `string` | Unité affichée à côté du champ : `"€"`, `"M€"`, `"%"`, `"Mds €"` |
| `tolerance` | `number` | Écart accepté en % de la valeur correcte (défaut : `0.05` = ±5 %) |

**Cas limites à gérer (pour les développeurs) :**

| Cas | Comportement attendu |
|---|---|
| Réponse en pourcentage | Accepter `13` et `0.13` si `answerUnit: "%"` — normaliser avant comparaison |
| Millions / milliards | Accepter `375 000 000 000` et `375` si `answerUnit: "Mds €"` |
| Virgule vs point décimal | Accepter `1,5` et `1.5` — normaliser en float |
| Espaces dans le nombre | `375 000` → supprimer les espaces avant parsing |
| Signe négatif | Accepter `-100` pour une perte |
| Zéro | Cas particulier : tolérance absolue ±0.01 si `expectedAnswer === 0` |
| Champ vide | Ne pas valider, afficher un message "Entrez une valeur" |

**Exemple YAML :**
```yaml
- type: formula
  questionType: quick-calculation
  question: "Une entreprise a 500 M d'actions à 750 €. Quelle est sa capitalisation boursière ?"
  shortAnswer: "375 Mds €"
  formula: "Market cap = Cours × Nombre d'actions"
  answerMode: numeric
  expectedAnswer: 375
  answerUnit: "Mds €"
  tolerance: 0.02
  difficulty: 1
```

---

### Mode D — Vrai / Faux (`questionType: "true-false"`)

Affiche deux boutons "Vrai" et "Faux". L'utilisateur choisit et le système valide
immédiatement.

**Champs requis :**

| Champ | Type | Règle |
|---|---|---|
| `questionType` | `"true-false"` | Active les boutons Vrai/Faux |
| `correctBool` | `boolean` | `true` → "Vrai" est correct, `false` → "Faux" est correct |

**Quand l'utiliser :**
- Affirmations à corriger (pièges fréquents, idées reçues)
- Propriétés d'un instrument ("Une obligation peut-elle se négocier à la hausse ? → Vrai")
- Révision rapide de mécanismes bien définis

**Règles de rédaction :**
- La question doit être une **affirmation**, pas une interrogation
- Éviter les formulations ambiguës ("parfois", "dans certains cas") → réserver aux cartes classiques
- Ne pas enchaîner deux cartes vrai/faux consécutives sur le même thème dans une leçon
- Équilibrer les réponses au sein d'une leçon : ne pas mettre que des "Vrai" ou que des "Faux"

**Exemple YAML :**
```yaml
- type: trap
  questionType: true-false
  question: "Un dividende élevé est toujours un signal positif pour une entreprise."
  shortAnswer: "Faux. Un yield élevé peut refléter une chute du cours, pas une générosité de l'entreprise."
  explanation: "Un cours qui baisse avec un dividende stable produit mécaniquement un yield élevé — c'est le dividend trap."
  correctBool: false
  difficulty: 2
```

---

### Récapitulatif des modes

| Mode | Champ déclencheur | Meilleur usage |
|---|---|---|
| Carte classique | *(aucun)* | Définitions, mécanismes, IQ/MA |
| QCM | `choices` + `correctIndex` | Définitions, comparaisons, calculs à choix |
| Saisie numérique | `answerMode: "numeric"` | Calculs avec résultat précis |
| Vrai / Faux | `questionType: "true-false"` | Affirmations à valider, pièges |

---

## 10. Checklist avant de commiter du contenu

- [ ] Tous les IDs sont définis (pas de `""` dans les fichiers `.ts`)
- [ ] Chaque leçon a ≥ 3 cartes d1, ≥ 1 trap
- [ ] Les IQ ont toutes une MA associée avec tags en commun
- [ ] Les `detail` sont présents sur au moins 80 % des cartes
- [ ] Les tags sont en kebab-case, max 4 par carte
- [ ] L'ordre des cartes suit la progression d1 → d2 → d3
- [ ] `estimatedMinutes` reflète le nombre réel de cartes (≈ 1 min/carte)
- [ ] TypeScript compile sans erreur : `npx tsc --noEmit`
- [ ] Aucun contenu factuel incorrect (dates, formules, définitions)
- [ ] QCM : 4 options, `correctIndex` défini, distracteurs plausibles
- [ ] Saisie numérique : `expectedAnswer` est un nombre, `answerUnit` renseignée, `tolerance` définie
- [ ] Vrai/Faux : question formulée comme une **affirmation**, `correctBool` défini
- [ ] Un seul mode de réponse actif par carte (pas de `choices` + `correctBool` sur la même carte)
