"use client";

// Note : metadata ne peut pas être exportée depuis un Client Component.
// SEO non prioritaire pour une app locale. À revoir si déploiement public.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Upload, Settings } from "lucide-react";
import { useContent } from "@/lib/use-content";
import { getTrackIcon, getTrackColorClasses } from "@/lib/track-icons";
import { loadProgress } from "@/lib/storage";
import type { UserProgress } from "@/lib/types";

export default function TracksPage() {
  const { tracks, isLoading } = useContent();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← Accueil
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/import"
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                <Download size={13} />
                Import
              </Link>
              <Link
                href="/admin/export"
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                <Upload size={13} />
                Export
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
                title="Administration"
              >
                <Settings size={13} />
              </Link>
            </div>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Choisissez votre parcours
          </h1>
          <p className="mt-2 text-gray-600">
            Chaque parcours couvre un domaine de la finance. Progressez à votre
            rythme.
          </p>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-sm text-gray-400">
            Chargement…
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {tracks.map((track) => (
              <Link
                key={track.id}
                href={`/tracks/${track.id}`}
                className="block rounded-2xl border-2 border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = getTrackIcon(track.id);
                    const { bg, text } = getTrackColorClasses(track.color);
                    return (
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${bg} ${text}`}>
                        <Icon size={28} strokeWidth={1.75} />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {track.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {track.description}
                    </p>
                    {(() => {
                      const done = progress
                        ? track.lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length
                        : 0;
                      const total = track.lessons.length;
                      const pct = Math.round((done / total) * 100);
                      return (
                        <div className="mt-2">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-500">
                              {done} / {total} leçons
                            </span>
                            {done > 0 && (
                              <span className="text-xs font-semibold text-blue-600">{pct}%</span>
                            )}
                          </div>
                          <div className="h-1 w-32 rounded-full bg-gray-100">
                            <div
                              className="h-1 rounded-full bg-blue-400 transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
