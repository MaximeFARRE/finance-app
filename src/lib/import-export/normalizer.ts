import type { Card, Lesson, Track } from "../types";
import type {
  CardImportData,
  FullImportData,
  QuickImportData,
} from "./schemas";
import { generateCardId } from "./id-generator";

// ---------------------------------------------------------------------------
// Types normalisés (sortie du normalizer)
// ---------------------------------------------------------------------------

export interface NormalizedLesson {
  trackId: string;
  meta: Omit<Lesson, "cards">;
  cards: Card[];
}

export interface NormalizedFullImport {
  track: Omit<Track, "lessons">;
  lessons: NormalizedLesson[];
}

export interface NormalizedQuickImport {
  target: { trackId: string; lessonId: string };
  cards: Card[];
}

// ---------------------------------------------------------------------------
// Normalisation d'une carte (génère l'ID si absent)
// ---------------------------------------------------------------------------

function normalizeCard(
  cardData: CardImportData,
  trackId: string,
  lessonSlug: string,
  existingIds: Set<string>,
): Card {
  const id =
    cardData.id ??
    generateCardId(trackId, lessonSlug, cardData.type, cardData.front, existingIds);

  // Enregistrer l'ID généré pour éviter les collisions avec les suivants
  existingIds.add(id);

  const card: Card = {
    id,
    type: cardData.type,
    front: cardData.front,
    back: cardData.back,
    difficulty: cardData.difficulty,
    tags: cardData.tags,
  };

  if (cardData.detail !== undefined) {
    card.detail = cardData.detail;
  }

  return card;
}

// ---------------------------------------------------------------------------
// Normalisation d'un import complet (track + leçons + cartes)
// ---------------------------------------------------------------------------

/**
 * Convertit un `FullImportData` validé par Zod en objets typés prêts à
 * persister. Génère les IDs manquants sur les cartes.
 *
 * @param data        Données validées par FullImportSchema
 * @param existingIds IDs déjà utilisés (pour éviter les collisions) — muté en place
 */
export function normalizeFullImport(
  data: FullImportData,
  existingIds: Set<string> = new Set(),
): NormalizedFullImport {
  const trackId = data.track.id;

  const track: Omit<Track, "lessons"> = {
    id: trackId,
    title: data.track.title,
    description: data.track.description,
    emoji: data.track.emoji,
    color: data.track.color,
  };

  const lessons: NormalizedLesson[] = data.lessons.map((lessonData) => {
    const meta: Omit<Lesson, "cards"> = {
      id: lessonData.id,
      slug: lessonData.slug,
      title: lessonData.title,
      description: lessonData.description,
      estimatedMinutes: lessonData.estimatedMinutes,
    };

    const cards = lessonData.cards.map((cardData) =>
      normalizeCard(cardData, trackId, lessonData.slug, existingIds),
    );

    return { trackId, meta, cards };
  });

  return { track, lessons };
}

// ---------------------------------------------------------------------------
// Normalisation d'un import rapide (cartes vers une leçon existante)
// ---------------------------------------------------------------------------

/**
 * Convertit un `QuickImportData` validé par Zod en objets typés.
 *
 * @param data        Données validées par QuickImportSchema
 * @param lessonSlug  Slug de la leçon cible (nécessaire pour générer les IDs)
 *                    — à récupérer depuis le ContentProvider avant d'appeler
 * @param existingIds IDs déjà utilisés — muté en place
 */
export function normalizeQuickImport(
  data: QuickImportData,
  lessonSlug: string,
  existingIds: Set<string> = new Set(),
): NormalizedQuickImport {
  const { track: trackId, lesson: lessonId } = data.target;

  const cards = data.cards.map((cardData) =>
    normalizeCard(cardData, trackId, lessonSlug, existingIds),
  );

  return { target: { trackId, lessonId }, cards };
}
