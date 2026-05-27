"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getContentProvider } from "@/lib/content";
import { getCardTheme } from "@/lib/card-themes";
import type { Lesson, Track } from "@/lib/types";

const DIFFICULTY_LABEL: Record<number, string> = {
  1: "Facile",
  2: "Moyen",
  3: "Difficile",
};

const DIFFICULTY_CLASS: Record<number, string> = {
  1: "bg-emerald-100 text-emerald-700",
  2: "bg-amber-100 text-amber-700",
  3: "bg-red-100 text-red-700",
};

export default function AdminLessonDetailPage({
  params,
}: {
  params: Promise<{ trackId: string; lessonId: string }>;
}) {
  const { trackId, lessonId } = use(params);
  const [track, setTrack] = useState<Track | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const provider = getContentProvider();
        const t = await provider.getTrackById(trackId);
        if (t) {
          setTrack(t);
          setLesson(t.lessons.find((l) => l.id === lessonId) ?? null);
        }
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [trackId, lessonId]);

  if (isLoading) {
    return <div className="text-sm text-gray-400">Chargement…</div>;
  }

  if (!track || !lesson) {
    return (
      <div className="text-sm text-gray-500">
        Leçon introuvable.{" "}
        <Link href={`/admin/tracks/${trackId}`} className="text-blue-600 underline">
          Retour au track
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/admin/tracks" className="hover:text-gray-600 transition-colors">
          Contenus
        </Link>
        <span>/</span>
        <Link
          href={`/admin/tracks/${trackId}`}
          className="hover:text-gray-600 transition-colors"
        >
          {track.title}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{lesson.title}</span>
      </nav>

      {/* Lesson header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
        )}
        <div className="flex gap-3 mt-2">
          <span className="text-xs text-gray-400">ID : {lesson.id}</span>
          <span className="text-xs text-gray-400">slug : {lesson.slug}</span>
          <span className="text-xs text-gray-400">{lesson.estimatedMinutes} min</span>
        </div>
      </div>

      {/* Cards header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Cartes ({lesson.cards.length})
        </h2>
        <Link
          href={`/admin/tracks/${trackId}/lessons/${lessonId}/cards/new`}
          className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          + Nouvelle carte
        </Link>
      </div>

      {lesson.cards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-400">
          Aucune carte dans cette leçon.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {lesson.cards.map((card) => {
            const theme = getCardTheme(card.type);
            return (
              <Link
                key={card.id}
                href={`/admin/tracks/${trackId}/lessons/${lessonId}/cards/${card.id}/edit`}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
              >
                {/* Type badge */}
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
                >
                  <theme.icon size={11} />
                  {theme.label}
                </span>

                {/* Front (truncated) */}
                <p className="flex-1 min-w-0 text-sm text-gray-700 line-clamp-2">
                  {card.front}
                </p>

                {/* Difficulty */}
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${DIFFICULTY_CLASS[card.difficulty] ?? ""}`}
                >
                  {DIFFICULTY_LABEL[card.difficulty] ?? card.difficulty}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
