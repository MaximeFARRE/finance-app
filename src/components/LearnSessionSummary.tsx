"use client";

import { useRouter } from "next/navigation";

interface LearnSessionSummaryProps {
  readCount: number;
  totalCount: number;
  trackId: string;
  lessonId: string;
}

export function LearnSessionSummary({
  readCount,
  totalCount,
  trackId,
  lessonId,
}: LearnSessionSummaryProps) {
  const router = useRouter();
  const allRead = readCount >= totalCount;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="text-5xl mb-4">{allRead ? "🎓" : "📖"}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {allRead ? "Leçon terminée !" : "Bonne progression !"}
        </h1>
        <p className="text-gray-500 mb-6">
          {readCount} / {totalCount} concepts lus
        </p>

        <div className="mb-8 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${Math.round((readCount / totalCount) * 100)}%` }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              router.push(`/session?trackId=${trackId}&lessonId=${lessonId}&mode=quiz`)
            }
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Commencer le quiz →
          </button>
          <button
            onClick={() => router.push(`/tracks/${trackId}`)}
            className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Retour au parcours
          </button>
        </div>
      </div>
    </main>
  );
}
