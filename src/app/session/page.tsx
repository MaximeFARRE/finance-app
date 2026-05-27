"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLesson } from "@/lib/use-content";
import { LearningCard } from "@/components/LearningCard";
import { LearnCard } from "@/components/LearnCard";
import { LearnSessionSummary } from "@/components/LearnSessionSummary";
import { loadProgress, saveProgress } from "@/lib/storage";
import { computeNextReview, createInitialCardProgress } from "@/lib/spaced-repetition";
import { computeXpGain, computeLessonStars, updateStreak } from "@/lib/progression";
import { groupLearnCards } from "@/lib/learn-utils";
import { findRelatedConceptCards } from "@/lib/quiz-utils";
import { buildLessonDeck } from "@/lib/lesson-deck";
import { buildBossDeck } from "@/lib/boss-deck";
import { buildReviewDeck } from "@/lib/review-utils";
import { useContent } from "@/lib/use-content";
import type { AnswerQuality, Card, CardProgress, ReviewResult, UserProgress } from "@/lib/types";
import type { QuizEntry } from "@/lib/quiz-utils";

// ---------------------------------------------------------------------------
// Quiz session state
// ---------------------------------------------------------------------------

interface QuizSession {
  deck: QuizEntry[];
  cardIndex: number;
  results: ReviewResult[];
  updatedCards: Record<string, CardProgress>;
  progress: UserProgress;
}

// ---------------------------------------------------------------------------
// Pause modal
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Concept overlay
// ---------------------------------------------------------------------------

function ConceptOverlay({ cards, onClose }: { cards: Card[]; onClose: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="shrink-0 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              Bouée de sauvetage
            </p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">Rappel de cours</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable cards */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {cards.map((card) => (
            <LearningCard key={card.id} card={card} />
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Continuer le quiz →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Learn mode flow
// ---------------------------------------------------------------------------

function LearnFlow({ trackId, lessonId }: { trackId: string; lessonId: string }) {
  const router = useRouter();
  const { lesson, isLoading } = useLesson(trackId, lessonId);
  const [readCardIds, setReadCardIds] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400 text-sm">Chargement…</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Leçon introuvable.</p>
      </div>
    );
  }

  const { primary, supplementary } = groupLearnCards(lesson.cards);
  // All cards in order: primary first, then supplementary
  const allCards = [...primary, ...supplementary];
  const totalCards = allCards.length;
  const readCount = readCardIds.size;
  const allPrimaryRead = primary.every((c) => readCardIds.has(c.id));
  const progressPct = primary.length > 0 ? Math.round((primary.filter((c) => readCardIds.has(c.id)).length / primary.length) * 100) : 0;

  const currentCard = allCards[currentIndex];
  const isLastCard = currentIndex === totalCards - 1;
  const isPrimarySection = currentIndex < primary.length;

  function markRead(cardId: string) {
    setReadCardIds((prev) => new Set([...prev, cardId]));
  }

  function handleMarkAndNext() {
    if (currentCard) markRead(currentCard.id);
    if (!isLastCard) setCurrentIndex((i) => i + 1);
  }

  function handleFinish() {
    const progress = loadProgress();
    const newLearnedIds = [...new Set([...progress.learnedCardIds, ...[...readCardIds]])];
    const newLearnSessionIds = progress.learnSessionIds.includes(lessonId)
      ? progress.learnSessionIds
      : [...progress.learnSessionIds, lessonId];
    saveProgress({ ...progress, learnedCardIds: newLearnedIds, learnSessionIds: newLearnSessionIds });
    setDone(true);
  }

  if (done) {
    return (
      <LearnSessionSummary
        readCount={readCount}
        totalCount={primary.length}
        trackId={trackId}
        lessonId={lessonId}
      />
    );
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
        {/* Progress bar (primary cards only) */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setPaused(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
            aria-label="Quitter"
          >
            ✕
          </button>
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>
                {isPrimarySection
                  ? `Fiche ${currentIndex + 1} / ${primary.length}`
                  : "Pour aller plus loin"}
              </span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section label when entering supplementary */}
        {!isPrimarySection && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Pour aller plus loin
          </p>
        )}

        {/* Current card */}
        <LearnCard
          card={currentCard}
          isRead={readCardIds.has(currentCard.id)}
          onRead={() => markRead(currentCard.id)}
          trackId={trackId}
          lessonId={lessonId}
        />

        {/* Navigation row */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            className={`flex-none rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all ${
              currentIndex === 0
                ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95"
            }`}
          >
            ← Précédente
          </button>

          {isLastCard ? (
            <button
              onClick={handleFinish}
              disabled={!allPrimaryRead}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                allPrimaryRead
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {allPrimaryRead ? "Terminer ✓" : "Lisez d'abord toutes les fiches"}
            </button>
          ) : (
            <button
              onClick={handleMarkAndNext}
              className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 active:scale-95 transition-all"
            >
              {readCardIds.has(currentCard.id) ? "Suivante →" : "Lu & Suivante →"}
            </button>
          )}
        </div>

        {/* Dot indicators */}
        {totalCards > 1 && (
          <div className="mt-5 flex justify-center gap-1.5">
            {allCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? "w-5 bg-emerald-500"
                    : readCardIds.has(card.id)
                      ? "w-2 bg-emerald-300"
                      : "w-2 bg-gray-300"
                }`}
                aria-label={`Fiche ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Quiz mode flow
// ---------------------------------------------------------------------------

function QuizFlow({ trackId, lessonId }: { trackId: string; lessonId: string }) {
  const router = useRouter();
  const { lesson, isLoading } = useLesson(trackId, lessonId);
  const { tracks } = useContent();
  const track = tracks.find((item) => item.id === trackId);

  const [session, setSession] = useState<QuizSession | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [overlayCards, setOverlayCards] = useState<Card[] | null>(null);

  // Holds the next session state while the overlay is open, applied on close
  const pendingSession = useRef<QuizSession | null>(null);
  const cardStartedAt = useRef(0);

  useEffect(() => {
    if (!lesson) return;
    const progress = loadProgress();
    const lessonDeck = buildLessonDeck({
      trackId,
      cards: lesson.cards,
      progress: progress.cards,
    });
    const bossDeck =
      lesson.kind === "boss" && lesson.worldId && track
        ? buildBossDeck({
            track,
            worldId: lesson.worldId,
            progress: progress.cards,
          })
        : [];
    const deck = bossDeck.length > 0 ? bossDeck : lessonDeck;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession({
      deck,
      cardIndex: 0,
      results: [],
      updatedCards: { ...progress.cards },
      progress,
    });
  }, [lesson, lessonId, track, trackId]);

  useEffect(() => {
    cardStartedAt.current = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealed(false);
  }, [session?.cardIndex]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400 text-sm">Chargement…</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Leçon introuvable.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400 text-sm">Chargement…</p>
      </div>
    );
  }

  const entry = session.deck[session.cardIndex];
  const totalCards = session.deck.length;
  const doneCards = session.cardIndex;
  const progressPct = Math.round((doneCards / totalCards) * 100);

  function finishSession(finalSession: QuizSession) {
    const { results, updatedCards, progress } = finalSession;
    const stars = computeLessonStars(results);
    const totalXp = results.reduce((s, r) => s + r.xpGained, 0);
    const newStreak = updateStreak(progress);
    const failedIds = results.filter((r) => r.quality === 0).map((r) => r.cardId);

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
        [lessonId]: Math.max(progress.lessonStars[lessonId] ?? 0, stars) as 0 | 1 | 2 | 3,
      },
    };

    saveProgress(updated);
    const failedParam = failedIds.length > 0 ? `&failed=${failedIds.join(",")}` : "";
    router.push(
      `/results?xp=${totalXp}&count=${results.length}&stars=${stars}&trackId=${trackId}&lessonId=${lessonId}${failedParam}`,
    );
  }

  function advance(nextSession: QuizSession) {
    if (nextSession.cardIndex >= nextSession.deck.length) {
      finishSession(nextSession);
    } else {
      setSession(nextSession);
    }
  }

  function handleRate(quality: 0 | 4) {
    if (!session || !entry) return;

    const question = entry.question;
    const timeSpentMs = Date.now() - cardStartedAt.current;
    const xpGained = computeXpGain(quality as AnswerQuality, session.progress.streak);

    const cardProgress =
      session.updatedCards[question.id] ?? createInitialCardProgress(question.id);
    const updatedCardProgress = computeNextReview(cardProgress, quality as AnswerQuality);

    const result: ReviewResult = {
      cardId: question.id,
      quality: quality as AnswerQuality,
      timeSpentMs,
      xpGained,
    };

    const nextSession: QuizSession = {
      ...session,
      cardIndex: session.cardIndex + 1,
      results: [...session.results, result],
      updatedCards: { ...session.updatedCards, [question.id]: updatedCardProgress },
    };

    if (quality === 0) {
      const related = findRelatedConceptCards(question, lesson?.cards ?? []);
      if (related.length > 0) {
        // Store next session in ref; apply it when overlay closes
        pendingSession.current = nextSession;
        setOverlayCards(related);
        return;
      }
    }

    advance(nextSession);
  }

  function handleOverlayClose() {
    setOverlayCards(null);
    const next = pendingSession.current;
    pendingSession.current = null;
    if (next) advance(next);
  }

  if (!entry) return null;

  const isMcq = Array.isArray(entry.question.choices) && entry.question.choices.length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {paused && (
        <PauseModal
          progress={progressPct}
          onResume={() => setPaused(false)}
          onQuit={() => router.push(`/tracks/${trackId}`)}
        />
      )}

      {overlayCards && <ConceptOverlay cards={overlayCards} onClose={handleOverlayClose} />}

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
          key={entry.question.id}
          card={entry.question}
          onReveal={() => setRevealed(true)}
          onAnswer={(correct) => handleRate(correct ? 4 : 0)}
          trackId={trackId}
          lessonId={lessonId}
        />

        {revealed && !isMcq && entry.answer && (
          <div className="mt-4 rounded-xl bg-teal-50 border border-teal-100 p-5">
            <p className="mb-1 text-xs font-semibold text-teal-600">✅ Réponse modèle</p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
              {entry.answer.back}
            </p>
          </div>
        )}

        {revealed && !isMcq && (
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

// ---------------------------------------------------------------------------
// Review mode flow (cross-lessons, cartes dues SM-2)
// ---------------------------------------------------------------------------

function ReviewFlow() {
  const router = useRouter();
  const { tracks, isLoading } = useContent();

  const [session, setSession] = useState<QuizSession | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const cardStartedAt = useRef(0);

  useEffect(() => {
    if (isLoading || tracks.length === 0) return;
    const progress = loadProgress();
    const { cards } = buildReviewDeck(tracks, progress);
    if (cards.length === 0) {
      router.push("/tracks");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession({
      deck: cards.map((c) => ({ question: c, answer: null })),
      cardIndex: 0,
      results: [],
      updatedCards: { ...progress.cards },
      progress,
    });
  }, [isLoading, tracks, router]);

  useEffect(() => {
    cardStartedAt.current = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealed(false);
  }, [session?.cardIndex]);

  if (isLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400 text-sm">Chargement des révisions…</p>
      </div>
    );
  }

  const entry = session.deck[session.cardIndex];
  const totalCards = session.deck.length;
  const doneCards = session.cardIndex;
  const progressPct = Math.round((doneCards / totalCards) * 100);

  function finishSession(finalSession: QuizSession) {
    const { results, updatedCards, progress } = finalSession;
    const totalXp = results.reduce((s, r) => s + r.xpGained, 0);
    const newStreak = updateStreak(progress);
    const updated: UserProgress = {
      ...progress,
      xp: progress.xp + totalXp,
      streak: newStreak,
      lastSessionAt: new Date().toISOString(),
      cards: updatedCards,
    };
    saveProgress(updated);
    router.push(`/results?xp=${totalXp}&count=${results.length}&stars=0&trackId=&lessonId=`);
  }

  function advance(nextSession: QuizSession) {
    if (nextSession.cardIndex >= nextSession.deck.length) {
      finishSession(nextSession);
    } else {
      setSession(nextSession);
    }
  }

  function handleRate(quality: 0 | 4) {
    if (!session || !entry) return;
    const question = entry.question;
    const timeSpentMs = Date.now() - cardStartedAt.current;
    const xpGained = computeXpGain(quality as AnswerQuality, session.progress.streak);
    const cardProgress =
      session.updatedCards[question.id] ?? createInitialCardProgress(question.id);
    const updatedCardProgress = computeNextReview(cardProgress, quality as AnswerQuality);
    const result: ReviewResult = { cardId: question.id, quality: quality as AnswerQuality, timeSpentMs, xpGained };
    const nextSession: QuizSession = {
      ...session,
      cardIndex: session.cardIndex + 1,
      results: [...session.results, result],
      updatedCards: { ...session.updatedCards, [question.id]: updatedCardProgress },
    };
    advance(nextSession);
  }

  if (!entry) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      {paused && (
        <PauseModal
          progress={progressPct}
          onResume={() => setPaused(false)}
          onQuit={() => router.push("/tracks")}
        />
      )}
      <div className="mx-auto max-w-xl px-4 py-8">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setPaused(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200"
            aria-label="Pause"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </button>
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
              <span>🔁 Révisions · {doneCards + 1} / {totalCards}</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-blue-500 transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>

        <LearningCard key={entry.question.id} card={entry.question} onReveal={() => setRevealed(true)} />

        {revealed && (
          <div className="mt-6">
            <p className="mb-3 text-center text-sm font-medium text-gray-700">Comment avez-vous trouvé ?</p>
            <div className="flex gap-3">
              <button onClick={() => handleRate(0)} className="flex-1 rounded-xl border-2 border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                ✗ Raté
              </button>
              <button onClick={() => handleRate(4)} className="flex-1 rounded-xl border-2 border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100">
                ✓ Trouvé
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Root session page — branches on ?mode=
// ---------------------------------------------------------------------------

function SessionContent() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get("trackId") ?? "";
  const lessonId = searchParams.get("lessonId") ?? "";
  const mode = searchParams.get("mode") ?? "quiz";

  if (mode === "review") {
    return <ReviewFlow />;
  }

  if (mode === "learn") {
    return <LearnFlow trackId={trackId} lessonId={lessonId} />;
  }

  return <QuizFlow trackId={trackId} lessonId={lessonId} />;
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
