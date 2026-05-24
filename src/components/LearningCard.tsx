"use client";

import { useState } from "react";
import type { Card } from "@/lib/types";
import { normalizeLearningCard } from "@/lib/card-normalizer";
import { getCardTheme } from "@/lib/card-themes";
import { SuggestionButton } from "./SuggestionButton";

interface LearningCardProps {
  card: Card;
  onReveal?: () => void;
  trackId?: string;
  lessonId?: string;
}

export function LearningCard({ card, onReveal, trackId, lessonId }: LearningCardProps) {
  const [revealed, setRevealed] = useState(false);
  const normalized = normalizeLearningCard(card);
  const theme = getCardTheme(normalized.themeKey);

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
        <p className="text-xl font-semibold leading-snug text-gray-900">{normalized.question}</p>
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
        <div className="mt-auto px-9 pb-7 flex flex-col gap-2">
          <div className={`rounded-xl p-5 ${theme.answerBg}`}>
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-800">
              {normalized.shortAnswer}
            </p>
          </div>
          {normalized.formula && (
            <AnswerSection label="Formule" text={normalized.formula} />
          )}
          {normalized.explanation && (
            <AnswerSection label="Explication" text={normalized.explanation} />
          )}
          {normalized.example && (
            <AnswerSection label="Exemple" text={normalized.example} />
          )}
          {normalized.commonMistake && (
            <AnswerSection label="Erreur fréquente" text={normalized.commonMistake} />
          )}
          {trackId && lessonId && (
            <div className="flex justify-end">
              <SuggestionButton
                cardId={card.id}
                trackId={trackId}
                lessonId={lessonId}
                cardFront={normalized.question}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AnswerSection({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{text}</p>
    </div>
  );
}
