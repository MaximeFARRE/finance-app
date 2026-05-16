"use client";

import { useState } from "react";
import type { Card } from "@/lib/types";

interface LearningCardProps {
  card: Card;
  onReveal?: () => void;
}

interface CardTheme {
  label: string;
  icon: string;
  cardBg: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  answerBg: string;
  buttonBg: string;
  buttonHover: string;
}

const THEMES: Record<string, CardTheme> = {
  definition: {
    label: "Définition",
    icon: "📖",
    cardBg: "bg-blue-50",
    accent: "border-l-blue-500",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    answerBg: "bg-white",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
  },
  intuition: {
    label: "Intuition",
    icon: "💡",
    cardBg: "bg-purple-50",
    accent: "border-l-purple-500",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
    answerBg: "bg-white",
    buttonBg: "bg-purple-600",
    buttonHover: "hover:bg-purple-700",
  },
  example: {
    label: "Exemple",
    icon: "🔍",
    cardBg: "bg-emerald-50",
    accent: "border-l-emerald-500",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    answerBg: "bg-white",
    buttonBg: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700",
  },
  formula: {
    label: "Formule",
    icon: "🔢",
    cardBg: "bg-amber-50",
    accent: "border-l-amber-500",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    answerBg: "bg-white",
    buttonBg: "bg-amber-500",
    buttonHover: "hover:bg-amber-600",
  },
  trap: {
    label: "Piège",
    icon: "⚠️",
    cardBg: "bg-red-50",
    accent: "border-l-red-500",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    answerBg: "bg-white",
    buttonBg: "bg-red-600",
    buttonHover: "hover:bg-red-700",
  },
  "interview-question": {
    label: "Question entretien",
    icon: "🎯",
    cardBg: "bg-orange-50",
    accent: "border-l-orange-500",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-700",
    answerBg: "bg-white",
    buttonBg: "bg-orange-500",
    buttonHover: "hover:bg-orange-600",
  },
  "model-answer": {
    label: "Réponse modèle",
    icon: "✅",
    cardBg: "bg-teal-50",
    accent: "border-l-teal-500",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    answerBg: "bg-white",
    buttonBg: "bg-teal-600",
    buttonHover: "hover:bg-teal-700",
  },
};

const DEFAULT_THEME: CardTheme = {
  label: "Carte",
  icon: "📄",
  cardBg: "bg-gray-50",
  accent: "border-l-gray-400",
  badgeBg: "bg-gray-100",
  badgeText: "text-gray-700",
  answerBg: "bg-white",
  buttonBg: "bg-gray-600",
  buttonHover: "hover:bg-gray-700",
};

export function LearningCard({ card, onReveal }: LearningCardProps) {
  const [revealed, setRevealed] = useState(false);
  const theme = THEMES[card.type] ?? DEFAULT_THEME;

  function handleReveal() {
    setRevealed(true);
    onReveal?.();
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 shadow-md border-l-4 min-h-72 flex flex-col ${theme.accent} ${theme.cardBg}`}
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
