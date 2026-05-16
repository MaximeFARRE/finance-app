"use client";

import { useState } from "react";
import type { Card } from "@/lib/types";
import { getCardTheme } from "@/lib/card-themes";

interface LearningCardProps {
  card: Card;
  onReveal?: () => void;
}

export function LearningCard({ card, onReveal }: LearningCardProps) {
  const [revealed, setRevealed] = useState(false);
  const theme = getCardTheme(card.type);

  function handleReveal() {
    setRevealed(true);
    onReveal?.();
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 shadow-md border-l-4 min-h-72 shrink-0 flex flex-col ${theme.accent} ${theme.cardBg}`}
    >
      <div className="px-9 pt-9 pb-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
        >
          <span>{theme.icon}</span>
          {theme.label}
        </span>
      </div>

      <div className="px-9 pb-10">
        <p className="text-xl font-semibold leading-snug text-gray-900">{card.front}</p>
      </div>

      {!revealed ? (
        <div className="mt-auto px-9 pb-7">
          <button
            onClick={handleReveal}
            className={`w-full rounded-xl px-4 py-4 text-sm font-semibold text-white transition-all duration-150 active:scale-95 ${theme.buttonBg} ${theme.buttonHover}`}
          >
            Voir la réponse
          </button>
        </div>
      ) : (
        <div className="mt-auto px-9 pb-7">
          <div className={`rounded-xl p-5 ${theme.answerBg}`}>
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-800">
              {card.back}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
