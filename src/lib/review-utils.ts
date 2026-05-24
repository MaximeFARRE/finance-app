import type { Card, Track, UserProgress } from "./types";
import { isDueForReview } from "./spaced-repetition";
import { isLessonUnlocked } from "./unlock";

const DEFAULT_LIMIT = 15;
const MAX_NEW_PER_SESSION = 5;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReviewDeck {
  cards: Card[];
  /** Nombre de cartes dues (déjà vues et en retard de révision) */
  dueCount: number;
  /** Nombre de cartes nouvelles (jamais vues) ajoutées pour compléter le deck */
  newCount: number;
}

// ---------------------------------------------------------------------------
// Construction du deck de révision cross-leçons
// ---------------------------------------------------------------------------

/**
 * Construit un deck de révision cross-leçons.
 *
 * Algorithme :
 * 1. Collecte toutes les cartes des leçons déverrouillées
 * 2. Filtre les cartes "dues" (isDueForReview) → triées par retard décroissant
 * 3. Si < `limit` cartes dues, complète avec des cartes nouvelles (jamais vues)
 *    — max MAX_NEW_PER_SESSION nouvelles par session
 * 4. Retourne au plus `limit` cartes au total
 *
 * @param allTracks Tous les tracks disponibles (avec leurs leçons et cartes)
 * @param progress  Progression de l'utilisateur
 * @param limit     Nombre max de cartes par session (défaut 15)
 */
export function buildReviewDeck(
  allTracks: Track[],
  progress: UserProgress,
  limit = DEFAULT_LIMIT,
): ReviewDeck {
  const { cards: cardProgress, completedLessonIds } = progress;

  // 1. Collecter les cartes des leçons déverrouillées
  const allUnlockedCards: Card[] = [];

  for (const track of allTracks) {
    for (const lesson of track.lessons) {
      if (isLessonUnlocked(track.lessons, lesson.id, completedLessonIds)) {
        allUnlockedCards.push(...lesson.cards);
      }
    }
  }

  // 2. Séparer dues / nouvelles
  const dueCards: Card[] = [];
  const newCards: Card[] = [];

  for (const card of allUnlockedCards) {
    const prog = cardProgress[card.id];
    if (!prog) {
      newCards.push(card); // jamais vue
    } else if (isDueForReview(prog)) {
      dueCards.push(card);
    }
  }

  // Trier les dues : les plus en retard en premier
  dueCards.sort((a, b) => {
    const dateA = new Date(cardProgress[a.id]!.nextReviewAt).getTime();
    const dateB = new Date(cardProgress[b.id]!.nextReviewAt).getTime();
    return dateA - dateB;
  });

  // 3. Construire le deck final
  const selected = dueCards.slice(0, limit);
  const dueCount = selected.length;

  let newCount = 0;
  if (selected.length < limit) {
    const slots = Math.min(limit - selected.length, MAX_NEW_PER_SESSION);
    const fillers = newCards.slice(0, slots);
    selected.push(...fillers);
    newCount = fillers.length;
  }

  return { cards: selected, dueCount, newCount };
}

// ---------------------------------------------------------------------------
// Compteur rapide de cartes dues (pour le badge sur la home)
// ---------------------------------------------------------------------------

/**
 * Retourne le nombre de cartes dues toutes leçons confondues.
 * Utilisé pour afficher le badge "X cartes à réviser" sur la page d'accueil.
 */
export function countDueCards(allTracks: Track[], progress: UserProgress): number {
  const { cards: cardProgress, completedLessonIds } = progress;
  let count = 0;

  for (const track of allTracks) {
    for (const lesson of track.lessons) {
      if (isLessonUnlocked(track.lessons, lesson.id, completedLessonIds)) {
        for (const card of lesson.cards) {
          const prog = cardProgress[card.id];
          if (prog && isDueForReview(prog)) count++;
        }
      }
    }
  }

  return count;
}
