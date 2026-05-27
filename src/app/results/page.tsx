"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Trophy, Target, BookOpen } from "lucide-react";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo } from "@/lib/level-engine";
import { useContent, useLesson } from "@/lib/use-content";
import { isLessonUnlocked, isLessonCompleted, hasCompletedLearnSession } from "@/lib/unlock";
import { XPBar } from "@/components/XPBar";

function StarDisplay({ stars }: { stars: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex justify-center gap-2 my-4">
      {([1, 2, 3] as const).map((i) => (
        <span
          key={i}
          className={`text-4xl transition-all ${i <= stars ? "text-yellow-400 drop-shadow" : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ResultsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const xp = Number(params.get("xp") ?? 0);
  const count = Number(params.get("count") ?? 0);
  const stars = Math.min(3, Math.max(0, Number(params.get("stars") ?? 0))) as 0 | 1 | 2 | 3;
  const trackId = params.get("trackId") ?? "";
  const lessonId = params.get("lessonId") ?? "";
  const failedParam = params.get("failed") ?? "";

  const progress = loadProgress();
  const levelInfo = getLevelInfo(progress.xp);
  const { tracks } = useContent();
  const track = tracks.find((t) => t.id === trackId);

  // Resolve failed card IDs to card objects for the "Concepts à revoir" section
  const failedIds = failedParam ? failedParam.split(",").filter(Boolean) : [];
  const { lesson } = useLesson(trackId, lessonId);

  // Find next lesson to continue
  const nextLesson = track?.lessons.find((l) => {
    const unlocked = isLessonUnlocked(track.lessons, l.id, progress.completedLessonIds, track.worlds);
    const completed = isLessonCompleted(l.id, progress.completedLessonIds);
    return unlocked && !completed;
  }) ?? null;
  const nextMode = nextLesson && hasCompletedLearnSession(nextLesson.id, progress.learnSessionIds)
    ? "quiz"
    : "learn";
  const failedCards =
    lesson && failedIds.length > 0
      ? lesson.cards.filter((c) => failedIds.includes(c.id))
      : [];

  const starLabel =
    stars === 3 ? "Parfait ! 🎉" : stars === 2 ? "Très bien ! 👍" : stars === 1 ? "Bien joué ! 💪" : "";

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Main results card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-4 text-center">
          <div className="mb-3 flex justify-center text-gray-700">
            {stars === 3 ? <Trophy size={52} strokeWidth={1.5} className="text-yellow-500" /> : <Target size={52} strokeWidth={1.5} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Session terminée !</h1>
          {starLabel && <p className="mt-1 text-base font-medium text-gray-600">{starLabel}</p>}
        </div>

        <StarDisplay stars={stars} />

        <p className="mb-6 text-center text-sm text-gray-500">
          {count} cartes · +{xp} XP gagnés
        </p>

        <div className="mb-6 rounded-xl bg-yellow-50 p-4">
          <XPBar levelInfo={levelInfo} xp={progress.xp} />
        </div>

        <div className="flex flex-col gap-3">
          {nextLesson && trackId && (
            <button
              onClick={() => router.push(`/session?trackId=${trackId}&lessonId=${nextLesson.id}&mode=${nextMode}`)}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              {nextMode === "quiz" ? <Target size={15} className="inline mr-1.5" /> : <BookOpen size={15} className="inline mr-1.5" />}
              Leçon suivante — {nextLesson.title}
            </button>
          )}
          {trackId && (
            <button
              onClick={() => router.push(`/tracks/${trackId}`)}
              className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Voir le parcours
            </button>
          )}
          <button
            onClick={() => router.push("/tracks")}
            className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50"
          >
            Tous les parcours
          </button>
        </div>
      </div>

      {/* Concepts à revoir */}
      {failedCards.length > 0 && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange-500">
            À revoir
          </p>
          <h2 className="mb-4 text-base font-bold text-gray-900">Concepts à retravailler</h2>
          <div className="flex flex-col gap-2">
            {failedCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 border border-orange-100"
              >
                <p className="text-sm text-gray-700 line-clamp-1 flex-1">{card.front}</p>
                <button
                  onClick={() =>
                    router.push(
                      `/session?trackId=${trackId}&lessonId=${lessonId}&mode=learn`,
                    )
                  }
                  className="shrink-0 rounded-lg bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-200 transition"
                >
                  Revoir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <Suspense fallback={<p className="text-gray-500">Chargement…</p>}>
        <ResultsContent />
      </Suspense>
    </main>
  );
}
