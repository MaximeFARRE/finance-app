"use client";

import { useState } from "react";
import type { Card } from "@/lib/types";
import { normalizeLearningCard } from "@/lib/card-normalizer";
import { getCardTheme } from "@/lib/card-themes";
import { SuggestionButton } from "./SuggestionButton";

interface LearningCardProps {
  card: Card;
  onReveal?: () => void;
  onAnswer?: (correct: boolean) => void;
  trackId?: string;
  lessonId?: string;
}

export function LearningCard({ card, onReveal, onAnswer, trackId, lessonId }: LearningCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null);
  const [numericInput, setNumericInput] = useState("");
  const [numericState, setNumericState] = useState<"idle" | "correct" | "incorrect" | "invalid">("idle");
  const normalized = normalizeLearningCard(card);
  const theme = getCardTheme(normalized.themeKey);
  const isMcq = Array.isArray(card.choices) && card.choices.length > 0;
  const isTrueFalse = card.questionType === "true-false" && card.correctBool !== undefined;
  const isNumeric = card.answerMode === "numeric" && card.expectedAnswer !== undefined;

  function handleReveal() {
    setRevealed(true);
    onReveal?.();
  }

  function parseNumericInput(raw: string): number | null {
    const normalized = raw
      .trim()
      .replace(/\s/g, "")       // "375 000" → "375000"
      .replace(",", ".")         // "1,5" → "1.5"
      .replace("−", "-");        // typographic minus
    const value = parseFloat(normalized);
    return isNaN(value) ? null : value;
  }

  function isWithinTolerance(input: number, expected: number, tol: number): boolean {
    if (expected === 0) return Math.abs(input) <= 0.01;
    return Math.abs(input - expected) / Math.abs(expected) <= tol;
  }

  function handleNumericSubmit() {
    if (numericState !== "idle") return;
    const parsed = parseNumericInput(numericInput);
    if (parsed === null) {
      setNumericState("invalid");
      return;
    }
    const tol = card.tolerance ?? 0.05;
    const correct = isWithinTolerance(parsed, card.expectedAnswer!, tol);
    setNumericState(correct ? "correct" : "incorrect");
    setRevealed(true);
    onReveal?.();
    setTimeout(() => onAnswer?.(correct), 1000);
  }

  function handleTrueFalseClick(value: boolean) {
    if (selectedBool !== null) return;
    const correct = value === card.correctBool;
    setSelectedBool(value);
    setRevealed(true);
    onReveal?.();
    setTimeout(() => onAnswer?.(correct), 1000);
  }

  function handleChoiceClick(index: number) {
    if (selectedIndex !== null) return;
    const correct = index === card.correctIndex;
    setSelectedIndex(index);
    setRevealed(true);
    onReveal?.();
    setTimeout(() => onAnswer?.(correct), 1000);
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 shadow-md border-l-4 min-h-72 shrink-0 flex flex-col ${theme.accent} ${theme.cardBg}`}
    >
      <div className="px-9 pt-9 pb-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
        >
          <theme.icon size={13} />
          {theme.label}
        </span>
      </div>

      <div className="px-9 pb-6">
        <p className="text-xl font-semibold leading-snug text-gray-900">{normalized.question}</p>
      </div>

      {isNumeric ? (
        <div className="mt-auto px-9 pb-7 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <div className={`relative flex-1 rounded-xl border-2 transition-colors duration-150 ${
              numericState === "correct" ? "border-green-400 bg-green-50"
              : numericState === "incorrect" ? "border-red-300 bg-red-50"
              : numericState === "invalid" ? "border-amber-300 bg-amber-50"
              : "border-gray-200 bg-white focus-within:border-blue-400"
            }`}>
              <input
                type="text"
                inputMode="decimal"
                value={numericInput}
                onChange={(e) => {
                  setNumericInput(e.target.value);
                  if (numericState === "invalid") setNumericState("idle");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleNumericSubmit()}
                disabled={numericState === "correct" || numericState === "incorrect"}
                placeholder="Votre réponse…"
                className="w-full bg-transparent px-4 py-3 text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
              />
              {card.answerUnit && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400 pointer-events-none">
                  {card.answerUnit}
                </span>
              )}
            </div>
            <button
              onClick={handleNumericSubmit}
              disabled={numericState === "correct" || numericState === "incorrect" || numericInput.trim() === ""}
              className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-default ${theme.buttonBg} ${theme.buttonHover}`}
            >
              Vérifier
            </button>
          </div>
          {numericState === "invalid" && (
            <p className="text-xs text-amber-600 font-medium">Entrez un nombre valide (ex : 375 ou 1,5)</p>
          )}
          {revealed && (
            <>
              <div className={`rounded-xl p-5 ${numericState === "correct" ? "bg-green-50" : "bg-red-50"}`}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-gray-400">
                  {numericState === "correct" ? "Correct ✓" : "Réponse attendue"}
                </p>
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
            </>
          )}
        </div>
      ) : isTrueFalse ? (
        <div className="mt-auto px-9 pb-7 flex flex-col gap-3">
          <div className="flex gap-3">
            {([true, false] as const).map((value) => {
              const label = value ? "Vrai" : "Faux";
              const isCorrect = value === card.correctBool;
              const isSelected = value === selectedBool;
              const answered = selectedBool !== null;

              let btnStyle = "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
              if (answered) {
                if (isCorrect) btnStyle = "border-green-400 bg-green-50 text-green-800";
                else if (isSelected) btnStyle = "border-red-300 bg-red-50 text-red-700";
                else btnStyle = "border-gray-100 bg-gray-50 text-gray-400";
              }

              return (
                <button
                  key={label}
                  onClick={() => handleTrueFalseClick(value)}
                  disabled={answered}
                  className={`flex-1 rounded-xl border-2 px-5 py-4 text-sm font-semibold transition-all duration-150 ${btnStyle} ${!answered ? "active:scale-[0.98] cursor-pointer" : "cursor-default"}`}
                >
                  {label}
                  {answered && isCorrect && <span className="ml-2 text-green-600">✓</span>}
                  {answered && isSelected && !isCorrect && <span className="ml-2 text-red-500">✗</span>}
                </button>
              );
            })}
          </div>
          {revealed && (
            <>
              <div className={`rounded-xl p-5 ${theme.answerBg}`}>
                <p className="whitespace-pre-line text-base leading-relaxed text-gray-800">
                  {normalized.shortAnswer}
                </p>
              </div>
              {normalized.explanation && (
                <AnswerSection label="Explication" text={normalized.explanation} />
              )}
            </>
          )}
        </div>
      ) : isMcq ? (
        <div className="mt-auto px-9 pb-7 flex flex-col gap-2">
          {card.choices!.map((choice, i) => {
            const isCorrect = i === card.correctIndex;
            const isSelected = i === selectedIndex;
            const answered = selectedIndex !== null;

            let choiceStyle = "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
            if (answered) {
              if (isCorrect) choiceStyle = "border-green-400 bg-green-50 text-green-800";
              else if (isSelected) choiceStyle = "border-red-300 bg-red-50 text-red-700";
              else choiceStyle = "border-gray-100 bg-gray-50 text-gray-400";
            }

            return (
              <button
                key={i}
                onClick={() => handleChoiceClick(i)}
                disabled={answered}
                className={`w-full rounded-xl border-2 px-5 py-3 text-left text-sm font-medium transition-all duration-150 ${choiceStyle} ${!answered ? "active:scale-[0.98] cursor-pointer" : "cursor-default"}`}
              >
                <span className="mr-3 font-bold text-xs opacity-50">
                  {String.fromCharCode(65 + i)}.
                </span>
                {choice}
                {answered && isCorrect && <span className="float-right text-green-600">✓</span>}
                {answered && isSelected && !isCorrect && <span className="float-right text-red-500">✗</span>}
              </button>
            );
          })}
          {revealed && normalized.explanation && (
            <div className="mt-1">
              <AnswerSection label="Explication" text={normalized.explanation} />
            </div>
          )}
        </div>
      ) : !revealed ? (
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
