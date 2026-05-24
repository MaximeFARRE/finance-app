"use client";

import { useState } from "react";
import type { Card } from "@/lib/types";
import { getCardTheme } from "@/lib/card-themes";
import { SuggestionButton } from "./SuggestionButton";

interface LearnCardProps {
  card: Card;
  isRead: boolean;
  onRead: () => void;
  trackId?: string;
  lessonId?: string;
}

export function LearnCard({ card, isRead, onRead, trackId, lessonId }: LearnCardProps) {
  const [detailExpanded, setDetailExpanded] = useState(false);
  const theme = getCardTheme(card.type);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 shadow-sm border-l-4 ${theme.accent} ${theme.cardBg} transition-all`}
    >
      {/* Header: type badge + read indicator */}
      <div className="px-6 pt-6 pb-3 flex items-start justify-between gap-4">
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
        >
          <span>{theme.icon}</span>
          {theme.label}
        </span>
        {isRead && (
          <span className="text-xs font-semibold text-emerald-600">Lu ✓</span>
        )}
      </div>

      {/* Title */}
      <div className="px-6 pb-3">
        <p className="text-lg font-semibold leading-snug text-gray-900">{card.front}</p>
      </div>

      {/* Short summary — always visible */}
      <div className={`mx-6 mb-4 rounded-xl p-4 ${theme.answerBg}`}>
        <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{card.back}</p>
      </div>

      {/* Deep detail — revealed on demand */}
      {card.detail && (
        <div className="px-6 pb-4">
          <button
            onClick={() => setDetailExpanded((e) => !e)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors"
          >
            {detailExpanded ? "Réduire ▲" : "En savoir plus ▼"}
          </button>

          {detailExpanded && (
            <div className="mt-3 rounded-xl border border-gray-200 bg-white p-5">
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {card.detail}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mark as read + suggestion */}
      <div className="px-6 pb-5 flex flex-col gap-2">
        <button
          onClick={onRead}
          disabled={isRead}
          className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-150 ${
            isRead
              ? "bg-emerald-100 text-emerald-700 cursor-default"
              : `text-white active:scale-95 ${theme.buttonBg} ${theme.buttonHover}`
          }`}
        >
          {isRead ? "Lu ✓" : "Marquer comme lu"}
        </button>
        {trackId && lessonId && (
          <div className="flex justify-end">
            <SuggestionButton
              cardId={card.id}
              trackId={trackId}
              lessonId={lessonId}
              cardFront={card.front}
            />
          </div>
        )}
      </div>
    </div>
  );
}
