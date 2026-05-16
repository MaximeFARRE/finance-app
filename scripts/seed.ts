/**
 * Script de seed : migre le contenu statique TypeScript vers Supabase.
 * Usage : npx tsx scripts/seed.ts
 *
 * Prérequis : remplir .env.local avec SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { marketFinanceTrack } from "../src/content/market-finance";
import type { Track, Lesson, Card } from "../src/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Variables d'environnement manquantes.");
  console.error("   Ajoute NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local");
  process.exit(1);
}

// Client admin (bypasse le RLS pour l'insertion initiale)
const supabase = createClient(supabaseUrl, serviceRoleKey);

const tracks: Track[] = [marketFinanceTrack];

async function seed() {
  console.log("🌱 Démarrage du seed...\n");

  for (const track of tracks) {
    console.log(`📚 Track : ${track.title}`);

    // Upsert track
    const { error: trackError } = await supabase.from("tracks").upsert({
      id: track.id,
      title: track.title,
      description: track.description,
      emoji: track.emoji,
      color: track.color,
    });

    if (trackError) {
      console.error(`  ❌ Erreur track ${track.id}:`, trackError.message);
      continue;
    }
    console.log(`  ✅ Track inséré`);

    for (let lessonIndex = 0; lessonIndex < track.lessons.length; lessonIndex++) {
      const lesson: Lesson = track.lessons[lessonIndex];
      console.log(`  📖 Leçon : ${lesson.title}`);

      // Upsert lesson
      const { error: lessonError } = await supabase.from("lessons").upsert({
        id: lesson.id,
        track_id: track.id,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        estimated_minutes: lesson.estimatedMinutes,
        order: lessonIndex,
      });

      if (lessonError) {
        console.error(`    ❌ Erreur leçon ${lesson.id}:`, lessonError.message);
        continue;
      }
      console.log(`    ✅ Leçon insérée`);

      // Upsert cards par batch de 50
      const cards: Card[] = lesson.cards;
      const batchSize = 50;

      for (let i = 0; i < cards.length; i += batchSize) {
        const batch = cards.slice(i, i + batchSize).map((card) => ({
          id: card.id,
          lesson_id: lesson.id,
          type: card.type,
          front: card.front,
          back: card.back,
          detail: card.detail ?? null,
          difficulty: card.difficulty,
          tags: card.tags,
        }));

        const { error: cardsError } = await supabase.from("cards").upsert(batch);

        if (cardsError) {
          console.error(`    ❌ Erreur cartes (batch ${i}):`, cardsError.message);
        } else {
          console.log(`    ✅ ${batch.length} cartes insérées`);
        }
      }
    }
  }

  console.log("\n✅ Seed terminé !");
}

seed().catch((err) => {
  console.error("❌ Erreur inattendue :", err);
  process.exit(1);
});
