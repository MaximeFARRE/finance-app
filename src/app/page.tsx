"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  TrendingUp, Bell, CreditCard, RefreshCw, Trophy,
  Settings, Download, Upload,
} from "lucide-react";
import { useContent } from "@/lib/use-content";
import { loadProgress } from "@/lib/storage";
import { countDueCards } from "@/lib/review-utils";

function ReviewBadge() {
  const { tracks, isLoading } = useContent();

  const dueCount = useMemo(() => {
    if (isLoading || tracks.length === 0) return null;
    const progress = loadProgress();
    return countDueCards(tracks, progress);
  }, [tracks, isLoading]);

  if (dueCount === null) return null;

  if (dueCount === 0) {
    return (
      <p className="text-sm text-emerald-600 font-medium">
        ✓ Pas de révision pour le moment
      </p>
    );
  }

  return (
    <Link
      href="/session?mode=review"
      className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-300 bg-amber-50 px-6 py-4 text-base font-semibold text-amber-800 transition hover:bg-amber-100"
    >
      <Bell size={18} />
      {dueCount} carte{dueCount > 1 ? "s" : ""} à réviser →
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 flex justify-center text-blue-600">
          <TrendingUp size={56} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Finance Learning</h1>
        <p className="mt-4 text-lg text-gray-600">
          Prépare tes entretiens techniques en finance. Micro-cartes, répétition espacée,
          progression gamifiée.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {/* Révisions du jour */}
          <ReviewBadge />

          <Link
            href="/tracks"
            className="rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Commencer →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: <CreditCard size={24} className="mx-auto text-gray-600" />, label: "Micro-cartes" },
            { icon: <RefreshCw size={24} className="mx-auto text-gray-600" />, label: "Répétition espacée" },
            { icon: <Trophy size={24} className="mx-auto text-gray-600" />, label: "XP & niveaux" },
          ].map(({ icon, label }) => (
            <div key={label}>
              {icon}
              <p className="mt-1 text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Administration
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/admin"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
            >
              <Settings size={18} />
              Admin
            </Link>
            <Link
              href="/admin/import"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
            >
              <Download size={18} />
              Import
            </Link>
            <Link
              href="/admin/export"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-700"
            >
              <Upload size={18} />
              Export
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
