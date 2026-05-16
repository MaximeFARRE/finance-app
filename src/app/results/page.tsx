"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo } from "@/lib/level-engine";
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

  const progress = loadProgress();
  const levelInfo = getLevelInfo(progress.xp);

  const starLabel =
    stars === 3 ? "Parfait ! 🎉" : stars === 2 ? "Très bien ! 👍" : stars === 1 ? "Bien joué ! 💪" : "";

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-4 text-center">
        <div className="mb-3 text-5xl">{stars === 3 ? "🏆" : "🎯"}</div>
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
        {trackId && (
          <button
            onClick={() => router.push(`/tracks/${trackId}`)}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Continuer le parcours →
          </button>
        )}
        <button
          onClick={() => router.push("/tracks")}
          className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Tous les parcours
        </button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<p className="text-gray-500">Chargement…</p>}>
        <ResultsContent />
      </Suspense>
    </main>
  );
}
