import { isLegacyCard } from "./card-normalizer";
import type { Track } from "./types";

export interface ContentWarning {
  trackId: string;
  worldId?: string;
  message: string;
}

/**
 * Vérifie la cohérence entre track.lessons et worlds.lessonIds.
 *
 * Problèmes détectés :
 * - Leçon présente dans track.lessons mais absente de tous les worlds → affichée
 *   en bas de la LessonMap sans logique de monde ni de déverrouillage boss.
 * - ID présent dans worlds.lessonIds mais sans leçon correspondante dans
 *   track.lessons → référence morte, la leçon ne s'affichera pas.
 */
export function validateTracksContent(tracks: Track[]): ContentWarning[] {
  const warnings: ContentWarning[] = [];

  for (const track of tracks) {
    const lessonIds = new Set(track.lessons.map((l) => l.id));

    if (track.worlds && track.worlds.length > 0) {
      const groupedIds = new Set(track.worlds.flatMap((w) => w.lessonIds));

      // Leçons dans track.lessons mais absentes de tous les worlds
      for (const lesson of track.lessons) {
        if (!groupedIds.has(lesson.id)) {
          warnings.push({
            trackId: track.id,
            message: `Leçon "${lesson.id}" présente dans track.lessons mais absente de tous les worlds.lessonIds — elle s'affichera hors monde.`,
          });
        }
      }

      // IDs dans worlds.lessonIds sans leçon correspondante
      for (const world of track.worlds) {
        for (const id of world.lessonIds) {
          if (!lessonIds.has(id)) {
            warnings.push({
              trackId: track.id,
              worldId: world.id,
              message: `ID "${id}" référencé dans worlds["${world.id}"].lessonIds mais introuvable dans track.lessons — référence morte.`,
            });
          }
        }
      }
    }

    // Leçons qui mélangent les deux formats dans la même leçon
    for (const lesson of track.lessons) {
      if (lesson.cards.length === 0) continue;
      const legacyCount = lesson.cards.filter(isLegacyCard).length;
      const newCount = lesson.cards.length - legacyCount;
      if (legacyCount > 0 && newCount > 0) {
        warnings.push({
          trackId: track.id,
          message: `Leçon "${lesson.id}" mélange ${newCount} carte(s) nouveau format et ${legacyCount} carte(s) legacy — homogénéiser pour éviter les incohérences visuelles.`,
        });
      }
    }
  }

  return warnings;
}

/**
 * Affiche les avertissements de cohérence dans la console en développement.
 * Sans effet en production.
 */
export function warnIfContentInconsistent(tracks: Track[]): void {
  if (process.env.NODE_ENV === "production") return;
  const warnings = validateTracksContent(tracks);
  for (const w of warnings) {
    console.warn(`[content-validator] ${w.message}`);
  }
}
