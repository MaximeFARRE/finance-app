"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getContentProvider } from "@/lib/content";
import type { Track } from "@/lib/types";

export default function AdminTracksPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const provider = getContentProvider();
        const data = await provider.getAllTracks();
        setTracks(data);
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, []);

  const totalCards = tracks.reduce(
    (acc, t) => acc + t.lessons.reduce((a, l) => a + l.cards.length, 0),
    0,
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contenus</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {tracks.length} track{tracks.length > 1 ? "s" : ""} · {totalCards} cartes
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-white border border-gray-200 animate-pulse" />
          ))}
        </div>
      ) : tracks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-400 text-sm">Aucun track pour l'instant.</p>
          <p className="text-gray-400 text-xs mt-1">
            Importez du contenu via la page{" "}
            <Link href="/admin/import" className="underline text-blue-500">Import</Link>.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tracks.map((track) => {
            const cardCount = track.lessons.reduce((a, l) => a + l.cards.length, 0);
            return (
              <Link
                key={track.id}
                href={`/admin/tracks/${track.id}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <span className="text-3xl">{track.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{track.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{track.description}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs text-gray-500">
                      {track.lessons.length} leçon{track.lessons.length > 1 ? "s" : ""}
                    </span>
                    <span className="text-xs text-gray-500">{cardCount} cartes</span>
                  </div>
                </div>
                <span className="text-gray-300 shrink-0">→</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
