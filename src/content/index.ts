import type { Track, Lesson, Card, CardType, Difficulty } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------------
// Types Supabase (lignes brutes retournées par la DB)
// ---------------------------------------------------------------------------

type DbTrack = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
};

type DbLesson = {
  id: string;
  track_id: string;
  slug: string;
  title: string;
  description: string;
  estimated_minutes: number;
  order: number;
};

type DbCard = {
  id: string;
  lesson_id: string;
  type: CardType;
  front: string;
  back: string;
  detail: string | null;
  difficulty: Difficulty;
  tags: string[];
};

// ---------------------------------------------------------------------------
// Helpers de mapping DB → types app
// ---------------------------------------------------------------------------

function mapCard(row: DbCard): Card {
  return {
    id: row.id,
    type: row.type,
    front: row.front,
    back: row.back,
    detail: row.detail ?? undefined,
    difficulty: row.difficulty,
    tags: row.tags,
  };
}

function mapLesson(row: DbLesson, cards: Card[]): Lesson {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    estimatedMinutes: row.estimated_minutes,
    cards,
  };
}

function mapTrack(row: DbTrack, lessons: Lesson[]): Track {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    emoji: row.emoji,
    color: row.color,
    lessons,
  };
}

// ---------------------------------------------------------------------------
// Fonctions d'accès aux données
// ---------------------------------------------------------------------------

export async function getAllTracks(): Promise<Track[]> {
  const supabase = await createClient();

  const { data: trackRows, error: trackError } = await supabase
    .from("tracks")
    .select("*")
    .returns<DbTrack[]>();

  if (trackError || !trackRows) return [];

  const tracks: Track[] = [];

  for (const trackRow of trackRows) {
    const { data: lessonRows, error: lessonError } = await supabase
      .from("lessons")
      .select("*")
      .eq("track_id", trackRow.id)
      .order("order")
      .returns<DbLesson[]>();

    if (lessonError || !lessonRows) continue;

    const lessons: Lesson[] = [];

    for (const lessonRow of lessonRows) {
      const { data: cardRows, error: cardError } = await supabase
        .from("cards")
        .select("*")
        .eq("lesson_id", lessonRow.id)
        .returns<DbCard[]>();

      if (cardError || !cardRows) continue;

      lessons.push(mapLesson(lessonRow, cardRows.map(mapCard)));
    }

    tracks.push(mapTrack(trackRow, lessons));
  }

  return tracks;
}

export async function getTrackById(id: string): Promise<Track | undefined> {
  const supabase = await createClient();

  const { data: trackRow, error: trackError } = await supabase
    .from("tracks")
    .select("*")
    .eq("id", id)
    .single<DbTrack>();

  if (trackError || !trackRow) return undefined;

  const { data: lessonRows, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("track_id", id)
    .order("order")
    .returns<DbLesson[]>();

  if (lessonError || !lessonRows) return mapTrack(trackRow, []);

  const lessons: Lesson[] = [];

  for (const lessonRow of lessonRows) {
    const { data: cardRows, error: cardError } = await supabase
      .from("cards")
      .select("*")
      .eq("lesson_id", lessonRow.id)
      .returns<DbCard[]>();

    if (cardError || !cardRows) continue;

    lessons.push(mapLesson(lessonRow, cardRows.map(mapCard)));
  }

  return mapTrack(trackRow, lessons);
}

export async function getLessonById(
  trackId: string,
  lessonId: string
): Promise<Lesson | undefined> {
  const supabase = await createClient();

  const { data: lessonRow, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .eq("track_id", trackId)
    .single<DbLesson>();

  if (lessonError || !lessonRow) return undefined;

  const { data: cardRows, error: cardError } = await supabase
    .from("cards")
    .select("*")
    .eq("lesson_id", lessonId)
    .returns<DbCard[]>();

  if (cardError || !cardRows) return mapLesson(lessonRow, []);

  return mapLesson(lessonRow, cardRows.map(mapCard));
}
