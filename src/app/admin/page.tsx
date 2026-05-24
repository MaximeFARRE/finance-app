"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getContentProvider } from "@/lib/content";

interface Stats {
  tracks: number;
  lessons: number;
  cards: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const provider = getContentProvider();
        const tracks = await provider.getAllTracks();
        const lessons = tracks.flatMap((t) => t.lessons);
        const cards = await provider.getAllCards();
        setStats({ tracks: tracks.length, lessons: lessons.length, cards: cards.length });
      } finally {
        setIsLoading(false);
      }
    }
    void loadStats();
  }, []);

  const QUICK_LINKS = [
    { href: "/admin/tracks", label: "Gérer les contenus", icon: "📚", desc: "Tracks, leçons, cartes" },
    { href: "/admin/import", label: "Importer du contenu", icon: "📥", desc: "YAML · JSON · CSV" },
    { href: "/admin/export", label: "Exporter du contenu", icon: "📤", desc: "Télécharger un fichier" },
  ];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Vue d&apos;ensemble du contenu</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
                <div className="h-8 w-12 rounded bg-gray-100 mb-2" />
                <div className="h-4 w-16 rounded bg-gray-100" />
              </div>
            ))
          : [
              { value: stats?.tracks ?? 0, label: "Tracks", icon: "🎓" },
              { value: stats?.lessons ?? 0, label: "Leçons", icon: "📖" },
              { value: stats?.cards ?? 0, label: "Cartes", icon: "🃏" },
            ].map(({ value, label, icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="mt-1 text-sm text-gray-500">
                  <span className="mr-1">{icon}</span>
                  {label}
                </p>
              </div>
            ))}
      </div>

      {/* Quick links */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Actions rapides
      </h2>
      <div className="flex flex-col gap-3">
        {QUICK_LINKS.map(({ href, label, icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
          >
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <span className="ml-auto text-gray-300">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
