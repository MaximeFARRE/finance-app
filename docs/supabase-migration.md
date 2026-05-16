# Migration Supabase

## Objectif

Migrer l'app d'une architecture statique (données TypeScript + localStorage) vers Supabase afin de :
- Gérer plusieurs utilisateurs avec une progression indépendante
- Permettre la gestion du contenu (cartes, leçons) via une page admin
- Importer/exporter des cartes en CSV

---

## Phases

### Phase 1 — Infrastructure Supabase

**Statut :** À faire

#### 1.1 Setup projet

- [ ] Créer le projet Supabase (supabase.com)
- [ ] Installer les dépendances : `@supabase/supabase-js` `@supabase/ssr`
- [ ] Configurer les variables d'environnement dans `.env.local` :
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  ```
- [ ] Créer `src/lib/supabase/client.ts` (client navigateur)
- [ ] Créer `src/lib/supabase/server.ts` (client serveur avec cookies)

#### 1.2 Schéma de base de données

Tables à créer dans Supabase :

```sql
-- Contenu
tracks (id, title, description, emoji, color)
lessons (id, track_id, slug, title, description, estimated_minutes, "order")
cards (id, lesson_id, type, front, back, detail, difficulty, tags[])

-- Progression utilisateur
user_progress (user_id, xp, streak, last_session_at, completed_lesson_ids[], lesson_stars jsonb, learned_card_ids[])
card_progress (user_id, card_id, repetitions, ease_factor, interval, next_review_at, last_reviewed_at)

-- Profils (rôles admin)
profiles (id, user_id, role)  -- role: 'user' | 'admin'
```

- [ ] Créer les tables via l'éditeur SQL Supabase
- [ ] Activer Row Level Security (RLS) sur toutes les tables
- [ ] Configurer les policies RLS :
  - `tracks`, `lessons`, `cards` → lecture publique, écriture admin uniquement
  - `user_progress`, `card_progress` → lecture/écriture par le propriétaire uniquement
  - `profiles` → lecture/écriture par le propriétaire uniquement

#### 1.3 Migration du contenu existant

- [ ] Créer un script `scripts/seed.ts` qui lit `src/content/market-finance.ts` et insère tout dans Supabase
- [ ] Exécuter le script et vérifier l'insertion
- [ ] Mettre à jour `src/content/index.ts` pour lire depuis Supabase au lieu des fichiers statiques
- [ ] Supprimer `src/content/market-finance.ts` une fois validé

---

### Phase 2 — Authentification

**Statut :** À faire  
**Dépend de :** Phase 1

#### 2.1 Pages auth

- [ ] Créer `src/app/login/page.tsx` — formulaire email + mot de passe
- [ ] Créer `src/app/signup/page.tsx` — création de compte
- [ ] Redirection post-login vers `/tracks`
- [ ] Redirection post-signup vers `/tracks` (avec création du profil `user_progress`)

#### 2.2 Middleware Next.js

- [ ] Créer `src/middleware.ts`
- [ ] Routes protégées : `/session`, `/results`, `/admin`
- [ ] Rediriger vers `/login` si non authentifié

#### 2.3 Remplacement du userId hardcodé

- [ ] Localiser tous les usages de `userId: "default"` dans `src/lib/storage.ts`
- [ ] Remplacer par le `user.id` récupéré depuis la session Supabase
- [ ] Initialiser `user_progress` à la création de compte (valeurs par défaut)

---

### Phase 3 — Migration de la progression

**Statut :** À faire  
**Dépend de :** Phase 1 + Phase 2

#### 3.1 Remplacer localStorage

- [ ] Réécrire `src/lib/storage.ts` :
  - `loadProgress(userId)` → requête Supabase sur `user_progress` + `card_progress`
  - `saveProgress(userId, progress)` → upsert Supabase
  - Conserver les mêmes signatures de fonctions pour ne pas casser les appelants
- [ ] Tester : démarrer une session, compléter, vérifier que les données sont en base
- [ ] Tester : recharger la page, vérifier que la progression est restaurée

#### 3.2 Edge cases

- [ ] Utilisateur sans `user_progress` en base → créer automatiquement au premier accès
- [ ] Migration optionnelle : détecter si localStorage contient des données et proposer l'import

---

### Phase 4 — Page admin

**Statut :** À faire  
**Dépend de :** Phase 1 + Phase 2

#### 4.1 Route et layout

- [ ] Créer `src/app/admin/layout.tsx` — layout admin distinct
- [ ] Créer `src/app/admin/page.tsx` — dashboard (stats : nb tracks, leçons, cartes, users)
- [ ] Vérifier le rôle `admin` dans le middleware, rediriger si non autorisé
- [ ] Ajouter la colonne `role` dans `profiles` et setter manuellement le premier admin

#### 4.2 Gestion des tracks et leçons

- [ ] `src/app/admin/tracks/page.tsx` — liste des tracks avec actions (éditer, supprimer)
- [ ] `src/app/admin/tracks/[trackId]/page.tsx` — détail track + liste leçons
- [ ] `src/app/admin/tracks/[trackId]/lessons/[lessonId]/page.tsx` — détail leçon + liste cartes
- [ ] Formulaires inline ou modals pour créer/éditer tracks et leçons

#### 4.3 Gestion des cartes (CRUD)

- [ ] Liste des cartes d'une leçon avec filtres (type, difficulté)
- [ ] Formulaire d'édition d'une carte :
  - `type` — select : definition | intuition | example | formula | trap | interview-question | model-answer
  - `front` — textarea
  - `back` — textarea
  - `detail` — textarea (optionnel)
  - `difficulty` — 1 / 2 / 3
  - `tags` — input multi-valeur
- [ ] Prévisualisation de la carte telle qu'elle apparaît dans l'app
- [ ] Création / suppression de carte

#### 4.4 Import CSV

- [ ] Interface drag & drop d'un fichier CSV
- [ ] Format attendu des colonnes :
  ```
  lesson_id, type, front, back, detail, difficulty, tags
  ```
- [ ] Validation avant insertion (types valides, champs requis, lesson_id existant)
- [ ] Rapport d'import : X cartes insérées, Y erreurs avec ligne et raison

#### 4.5 Export CSV

- [ ] Bouton export sur la page d'une leçon → téléchargement CSV de toutes ses cartes
- [ ] Bouton export sur la page d'un track → téléchargement CSV de toutes les cartes du track

---

## Ce qui ne change pas

- Toute la logique métier (`spaced-repetition.ts`, `progression.ts`, `quiz-utils.ts`, `level-engine.ts`, `unlock.ts`) → aucune modification
- L'UX des sessions learn/quiz → identique pour l'utilisateur
- Les composants React existants → conservés

---

## Dépendances entre phases

```
Phase 1 (schema + SDK)
    ↓
Phase 2 (auth)          ← débloque les vrais utilisateurs
    ↓
Phase 3 (progression)   ← dépend des users réels
    ↓
Phase 4 (admin)         ← peut démarrer dès Phase 1 terminée pour le CRUD contenu
                           nécessite Phase 2 pour la protection des routes
```

---

## Notes techniques

- Next.js 16.2.6 avec App Router — utiliser `@supabase/ssr` (pas l'ancien `auth-helpers`)
- Les Server Components lisent les données via le client serveur Supabase (cookies)
- Les Client Components utilisent le client navigateur pour les interactions temps réel
- La logique SM-2 reste entièrement côté client — seul le résultat final est persisté en base
