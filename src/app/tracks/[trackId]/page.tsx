"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, Flame, BookOpen, Target } from "lucide-react";
import { getTrackIcon, getTrackColorClasses } from "@/lib/track-icons";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo } from "@/lib/level-engine";
import { useContent } from "@/lib/use-content";
import { LessonMap } from "@/components/LessonMap";
import { XPBar } from "@/components/XPBar";
import { isLessonUnlocked, isLessonCompleted, hasCompletedLearnSession } from "@/lib/unlock";
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
  const completedCount = progress
    ? track.lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length
    : 0;
  const totalLessons = track.lessons.length;

  // Next actionable lesson: unlocked, not completed. Prefer quiz-ready (learn done) over learn-first.
  const nextLesson = progress
    ? track.lessons.find((l) => {
        const unlocked = isLessonUnlocked(track.lessons, l.id, progress.completedLessonIds, track.worlds);
        const completed = isLessonCompleted(l.id, progress.completedLessonIds);
        return unlocked && !completed;
      })
    : null;
  const nextMode = nextLesson && hasCompletedLearnSession(nextLesson.id, progress?.learnSessionIds ?? [])
    ? "quiz"
    : "learn";

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
              <Settings size={13} className="inline mr-1" />
              Gérer les cartes
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-3">
            {(() => {
              const Icon = getTrackIcon(track.id);
              const { bg, text } = getTrackColorClasses(track.color);
              return (
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
                  <Icon size={22} strokeWidth={1.75} />
                </div>
              );
            })()}
            <h1 className="text-2xl font-bold text-gray-900">{track.title}</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">{track.description}</p>
          {progress && (
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                <span>{completedCount} / {totalLessons} leçons complétées</span>
                <span className="font-semibold text-blue-600">
                  {Math.round((completedCount / totalLessons) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-200">
                <div
                  className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${(completedCount / totalLessons) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {levelInfo && progress && (
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <XPBar levelInfo={levelInfo} xp={progress.xp} className="flex-1" />
              {progress.streak > 0 && (
                <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600">
                  <Flame size={14} />
                  {progress.streak}
                </div>
              )}
            </div>
          </div>
        )}

        {nextLesson && (
          <button
            onClick={() => router.push(`/session?trackId=${trackId}&lessonId=${nextLesson.id}&mode=${nextMode}`)}
            className="mb-6 w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
          >
            {nextMode === "quiz" ? <Target size={16} className="inline mr-1.5" /> : <BookOpen size={16} className="inline mr-1.5" />}
          Reprendre — {nextLesson.title}
          </button>
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
