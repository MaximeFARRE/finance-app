"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getTrackById } from "@/content";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo } from "@/lib/level-engine";
import { LessonList } from "@/components/LessonList";
import { XPBar } from "@/components/XPBar";
import type { UserProgress } from "@/lib/types";

export default function TrackDetailPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const router = useRouter();
  const track = getTrackById(trackId);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress());
  }, []);

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
          <Link href="/tracks" className="text-sm text-blue-600 hover:underline">
            ← Tous les parcours
          </Link>
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
          <LessonList
            lessons={track.lessons}
            completedLessonIds={progress.completedLessonIds}
            lessonStars={progress.lessonStars}
            onStart={(lessonId) =>
              router.push(`/session?trackId=${trackId}&lessonId=${lessonId}`)
            }
          />
        )}
      </div>
    </main>
  );
}
