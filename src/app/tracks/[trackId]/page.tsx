"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo } from "@/lib/level-engine";
import { useContent } from "@/lib/use-content";
import { LessonMap } from "@/components/LessonMap";
import { XPBar } from "@/components/XPBar";
import type { UserProgress } from "@/lib/types";

export default function TrackDetailPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const router = useRouter();
  const { tracks, isLoading: tracksLoading } = useContent();
  const track = tracks.find((t) => t.id === trackId);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

  if (tracksLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400 text-sm">Chargement…</p>
      </main>
    );
  }

  if (!track) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Parcours introuvable.</p>
      </main>
    );
  }

  const levelInfo = progress ? getLevelInfo(progress.xp) : null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Link href="/tracks" className="text-sm text-blue-600 hover:underline">
              ← Tous les parcours
            </Link>
            <Link
              href={`/admin/tracks/${trackId}`}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
              title="Gérer les cartes de ce parcours"
            >
              ⚙️ Gérer les cartes
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-3xl">{track.emoji}</span>
            <h1 className="text-2xl font-bold text-gray-900">{track.title}</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">{track.description}</p>
        </div>

        {levelInfo && progress && (
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
            <XPBar levelInfo={levelInfo} xp={progress.xp} />
          </div>
        )}

        {!progress ? (
          <div className="py-12 text-center text-sm text-gray-400">Chargement…</div>
        ) : (
          <LessonMap
            lessons={track.lessons}
            worlds={track.worlds}
            completedLessonIds={progress.completedLessonIds}
            lessonStars={progress.lessonStars}
            learnSessionIds={progress.learnSessionIds}
            onLearn={(lessonId) =>
              router.push(`/session?trackId=${trackId}&lessonId=${lessonId}&mode=learn`)
            }
            onQuiz={(lessonId) =>
              router.push(`/session?trackId=${trackId}&lessonId=${lessonId}&mode=quiz`)
            }
          />
        )}
      </div>
    </main>
  );
}
