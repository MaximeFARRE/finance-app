"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getLessonById } from "@/content";
import { LearningCard } from "@/components/LearningCard";
import { loadProgress, saveProgress } from "@/lib/storage";
import { computeNextReview, createInitialCardProgress } from "@/lib/spaced-repetition";
import { computeXpGain, computeLessonStars, updateStreak } from "@/lib/progression";
import type { AnswerQuality, Card, CardProgress, ReviewResult, UserProgress } from "@/lib/types";

type RatingQuality = 0 | 2 | 4;

interface SessionState {
  cards: Card[];
  cardIndex: number;
  results: ReviewResult[];
  updatedCards: Record<string, CardProgress>;
  progress: UserProgress;
}

function PauseModal({
  progress,
  onResume,
  onQuit,
}: {
  progress: number;
  onResume: () => void;
  onQuit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-center text-xl font-bold text-gray-900">Session en pause</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{progress}% complété</p>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onResume}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Reprendre
          </button>
          <button
            onClick={onQuit}
            className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Quitter la session
          </button>
        </div>
      </div>
    </div>
  );
}

function SessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackId = searchParams.get("trackId") ?? "";
  const lessonId = searchParams.get("lessonId") ?? "";

  const [session, setSession] = useState<SessionState | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const cardStartedAt = useRef(0);

  useEffect(() => {
    const lesson = getLessonById(trackId, lessonId);
    if (!lesson) return;
    const progress = loadProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession({
      cards: lesson.cards,
      cardIndex: 0,
      results: [],
      updatedCards: { ...progress.cards },
      progress,
    });
  }, [trackId, lessonId]);

  useEffect(() => {
    cardStartedAt.current = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealed(false);
  }, [session?.cardIndex]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Chargement…</p>
      </div>
    );
  }

  const currentCard = session.cards[session.cardIndex];
  const totalCards = session.cards.length;
  const doneCards = session.cardIndex;
  const progressPct = Math.round((doneCards / totalCards) * 100);

  function finishSession(finalSession: SessionState) {
    const { results, updatedCards, progress } = finalSession;
    const stars = computeLessonStars(results);
    const totalXp = results.reduce((s, r) => s + r.xpGained, 0);
    const newStreak = updateStreak(progress);

    const updated: UserProgress = {
      ...progress,
      xp: progress.xp + totalXp,
      streak: newStreak,
      lastSessionAt: new Date().toISOString(),
      cards: updatedCards,
      completedLessonIds: progress.completedLessonIds.includes(lessonId)
        ? progress.completedLessonIds
        : [...progress.completedLessonIds, lessonId],
      lessonStars: {
        ...progress.lessonStars,
        [lessonId]: Math.max(
          progress.lessonStars[lessonId] ?? 0,
          stars,
        ) as 0 | 1 | 2 | 3,
      },
    };

    saveProgress(updated);
    router.push(
      `/results?xp=${totalXp}&count=${results.length}&stars=${stars}&trackId=${trackId}&lessonId=${lessonId}`,
    );
  }

  function handleRate(quality: RatingQuality) {
    if (!session || !currentCard) return;

    const timeSpentMs = Date.now() - cardStartedAt.current;
    const xpGained = computeXpGain(quality as AnswerQuality, session.progress.streak);

    const cardProgress =
      session.updatedCards[currentCard.id] ??
      createInitialCardProgress(currentCard.id);
    const updatedCardProgress = computeNextReview(cardProgress, quality as AnswerQuality);

    const result: ReviewResult = {
      cardId: currentCard.id,
      quality: quality as AnswerQuality,
      timeSpentMs,
      xpGained,
    };

    const nextIndex = session.cardIndex + 1;
    const updatedSession: SessionState = {
      ...session,
      cardIndex: nextIndex,
      results: [...session.results, result],
      updatedCards: { ...session.updatedCards, [currentCard.id]: updatedCardProgress },
    };

    if (nextIndex >= session.cards.length) {
      finishSession(updatedSession);
    } else {
      setSession(updatedSession);
    }
  }

  if (!currentCard) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      {paused && (
        <PauseModal
          progress={progressPct}
          onResume={() => setPaused(false)}
          onQuit={() => router.push(`/tracks/${trackId}`)}
        />
      )}

      <div className="mx-auto max-w-xl px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setPaused(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
            aria-label="Pause"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </button>

          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>{doneCards + 1} / {totalCards}</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        <LearningCard
          key={currentCard.id}
          card={currentCard}
          onReveal={() => setRevealed(true)}
        />

        {revealed && (
          <div className="mt-6">
            <p className="mb-3 text-center text-sm font-medium text-gray-700">
              Comment avez-vous trouvé ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleRate(0)}
                className="flex-1 rounded-xl border-2 border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                ✗ Raté
              </button>
              <button
                onClick={() => handleRate(2)}
                className="flex-1 rounded-xl border-2 border-yellow-200 bg-yellow-50 py-3 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-100"
              >
                ~ Presque
              </button>
              <button
                onClick={() => handleRate(4)}
                className="flex-1 rounded-xl border-2 border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
              >
                ✓ Trouvé
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SessionPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Chargement…</p>
        </main>
      }
    >
      <SessionContent />
    </Suspense>
  );
}
