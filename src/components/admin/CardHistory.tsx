"use client";

import { useEffect, useState } from "react";
import { getContentProvider } from "@/lib/content";
import { getCardTheme } from "@/lib/card-themes";
import type { CardVersion } from "@/lib/types";

interface Props {
  cardId: string;
  onRestore?: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CardHistory({ cardId, onRestore }: Props) {
  const [versions, setVersions] = useState<CardVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const provider = getContentProvider();
        const history = await provider.getCardHistory(cardId);
        setVersions(history);
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [cardId]);

  async function handleRestore(versionId: string) {
    if (!confirm("Restaurer cette version ? La version actuelle sera sauvegardée.")) return;
    setRestoring(versionId);
    try {
      const provider = getContentProvider();
      await provider.restoreCardVersion(versionId);
      onRestore?.();
    } finally {
      setRestoring(null);
    }
  }

  if (isLoading) {
    return <p className="text-xs text-gray-400">Chargement de l&apos;historique…</p>;
  }

  if (versions.length === 0) {
    return (
      <p className="text-xs text-gray-400">
        Aucune version précédente. L&apos;historique apparaît après la première modification.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {versions.map((version) => {
        const theme = getCardTheme(version.snapshot.type);
        const isExpanded = expanded === version.id;

        return (
          <div
            key={version.id}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            {/* Version header */}
            <button
              onClick={() => setExpanded(isExpanded ? null : version.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
              >
                v{version.version}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">
                  {version.snapshot.front}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDate(version.changedAt)} · {version.changedBy}
                </p>
              </div>
              <span className="text-gray-400 text-xs">{isExpanded ? "▲" : "▼"}</span>
            </button>

            {/* Expanded preview */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className={`mt-3 rounded-xl p-4 ${theme.cardBg} border-l-4 ${theme.accent}`}>
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    {version.snapshot.front}
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {version.snapshot.back}
                  </p>
                </div>
                <button
                  onClick={() => handleRestore(version.id)}
                  disabled={restoring === version.id}
                  className="mt-3 rounded-xl border border-orange-300 bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700 transition hover:bg-orange-100 disabled:opacity-50"
                >
                  {restoring === version.id ? "Restauration…" : "Restaurer cette version"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
