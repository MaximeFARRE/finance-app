"use client";

// Note : metadata ne peut pas être exportée depuis un Client Component.
// SEO non prioritaire pour une app locale. À revoir si déploiement public.

import Link from "next/link";
import { useContent } from "@/lib/use-content";

export default function TracksPage() {
  const { tracks, isLoading } = useContent();

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
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                📥 Import
              </Link>
              <Link
                href="/admin/export"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
              >
                📤 Export
              </Link>
              <Link
                href="/admin"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
                title="Administration"
              >
                ⚙️
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
                  <span className="text-4xl">{track.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {track.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {track.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-blue-600">
                      {track.lessons.length} leçons
                    </p>
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
