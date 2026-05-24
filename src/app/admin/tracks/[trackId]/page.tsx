"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getContentProvider } from "@/lib/content";
import type { Track } from "@/lib/types";

export default function AdminTrackDetailPage({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = use(params);
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const provider = getContentProvider();
        const data = await provider.getTrackById(trackId);
        setTrack(data ?? null);
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [trackId]);

  if (isLoading) {
    return <div className="text-sm text-gray-400">Chargement…</div>;
  }

  if (!track) {
    return (
      <div className="text-sm text-gray-500">
        Track introuvable.{" "}
        <Link href="/admin/tracks" className="text-blue-600 underline">
          Retour
        </Link>
      </div>
    );
  }

  const totalCards = track.lessons.reduce((a, l) => a + l.cards.length, 0);

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin/tracks" className="hover:text-gray-600 transition-colors">
          Contenus
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{track.title}</span>
      </nav>

      {/* Track header */}
      <div className="flex items-start gap-4 mb-8">
        <span className="text-4xl">{track.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{track.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{track.description}</p>
          <div className="flex gap-3 mt-2">
            <span className="text-xs text-gray-400">ID : {track.id}</span>
            <span className="text-xs text-gray-400">
              {track.lessons.length} leçon{track.lessons.length > 1 ? "s" : ""} · {totalCards} cartes
            </span>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Leçons</h2>
      </div>

      {track.lessons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-400">
          Aucune leçon dans ce track.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {track.lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/admin/tracks/${track.id}/lessons/${lesson.id}`}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {lesson.cards.length} carte{lesson.cards.length > 1 ? "s" : ""} · {lesson.estimatedMinutes} min
                </p>
              </div>
              <span className="text-gray-300">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
