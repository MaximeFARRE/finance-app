"use client";

import type { CardType, Difficulty } from "@/lib/types";
import { getCardTheme } from "@/lib/card-themes";

interface Props {
  type: CardType;
  front: string;
  back: string;
  detail?: string;
  difficulty: Difficulty;
  tags: string[];
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: "Facile",
  2: "Moyen",
  3: "Difficile",
};

export function CardPreview({ type, front, back, detail, difficulty, tags }: Props) {
  const theme = getCardTheme(type);

  const isEmpty = !front.trim() && !back.trim();

  if (isEmpty) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="text-sm text-gray-400">La prévisualisation apparaîtra ici</p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 shadow-sm border-l-4 ${theme.accent} ${theme.cardBg}`}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-3 flex items-start justify-between gap-4">
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
        >
          <span>{theme.icon}</span>
          {theme.label}
        </span>
        <span className="text-xs text-gray-400">{DIFFICULTY_LABEL[difficulty]}</span>
      </div>

      {/* Front */}
      {front.trim() && (
        <div className="px-6 pb-3">
          <p className="text-lg font-semibold leading-snug text-gray-900 whitespace-pre-line">
            {front}
          </p>
        </div>
      )}

      {/* Back */}
      {back.trim() && (
        <div className={`mx-6 mb-4 rounded-xl p-4 ${theme.answerBg}`}>
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{back}</p>
        </div>
      )}

      {/* Detail */}
      {detail?.trim() && (
        <div className="mx-6 mb-4 rounded-xl border border-gray-200 bg-white p-4">
          <p className="mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Détail
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{detail}</p>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-6 pb-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Fake "mark as read" button */}
      <div className="px-6 pb-5">
        <div
          className={`w-full rounded-xl py-2.5 text-center text-sm font-semibold text-white ${theme.buttonBg} opacity-40`}
        >
          Marquer comme lu
        </div>
      </div>
    </div>
  );
}
