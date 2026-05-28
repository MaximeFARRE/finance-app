"use client";

import { normalizeLearningCard } from "@/lib/card-normalizer";
import type { Card, CardType, Difficulty, QuestionType } from "@/lib/types";
import { getCardTheme } from "@/lib/card-themes";

interface Props {
  type: CardType;
  front: string;
  back: string;
  detail?: string;
  difficulty: Difficulty;
  tags: string[];
  questionType?: QuestionType;
  question?: string;
  shortAnswer?: string;
  explanation?: string;
  formula?: string;
  example?: string;
  commonMistake?: string;
  topics?: string[];
  skills?: string[];
  choices?: string[];
  correctIndex?: number;
  correctBool?: boolean;
  answerMode?: "numeric";
  expectedAnswer?: number;
  answerUnit?: string;
  tolerance?: number;
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: "Facile",
  2: "Moyen",
  3: "Difficile",
};

export function CardPreview(props: Props) {
  const previewCard: Card = {
    id: "preview",
    type: props.type,
    front: props.front,
    back: props.back,
    detail: props.detail,
    difficulty: props.difficulty,
    tags: props.tags,
    questionType: props.questionType,
    question: props.question,
    shortAnswer: props.shortAnswer,
    explanation: props.explanation,
    formula: props.formula,
    example: props.example,
    commonMistake: props.commonMistake,
    topics: props.topics,
    skills: props.skills,
    choices: props.choices,
    correctIndex: props.correctIndex,
    correctBool: props.correctBool,
    answerMode: props.answerMode,
    expectedAnswer: props.expectedAnswer,
    answerUnit: props.answerUnit,
    tolerance: props.tolerance,
  };
  const normalized = normalizeLearningCard(previewCard);
  const theme = getCardTheme(normalized.themeKey);

  const isEmpty = !normalized.question.trim() && !normalized.shortAnswer.trim();

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
          <theme.icon size={13} />
          {theme.label}
        </span>
        <span className="text-xs text-gray-400">{DIFFICULTY_LABEL[props.difficulty]}</span>
      </div>

      {/* Front */}
      {normalized.question.trim() && (
        <div className="px-6 pb-3">
          <p className="text-lg font-semibold leading-snug text-gray-900 whitespace-pre-line">
            {normalized.question}
          </p>
        </div>
      )}

      {/* Back */}
      {normalized.shortAnswer.trim() && (
        <div className={`mx-6 mb-4 rounded-xl p-4 ${theme.answerBg}`}>
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {normalized.shortAnswer}
          </p>
        </div>
      )}

      {normalized.formula && (
        <PreviewSection label="Formule" text={normalized.formula} />
      )}

      {normalized.explanation && (
        <PreviewSection label="Explication" text={normalized.explanation} />
      )}

      {normalized.example && (
        <PreviewSection label="Exemple" text={normalized.example} />
      )}

      {normalized.commonMistake && (
        <PreviewSection label="Erreur fréquente" text={normalized.commonMistake} />
      )}

      {/* Tags */}
      {normalized.topics.length > 0 && (
        <div className="px-6 pb-4 flex flex-wrap gap-1.5">
          {normalized.topics.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Answer mode preview */}
      <div className="px-6 pb-5">
        {props.answerMode === "numeric" ? (
          <div className="flex gap-2 items-center">
            <div className="relative flex-1 rounded-xl border-2 border-gray-200 bg-gray-50">
              <span className="block px-4 py-3 text-sm text-gray-400 italic">
                {props.expectedAnswer ?? "…"}
              </span>
              {props.answerUnit && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                  {props.answerUnit}
                </span>
              )}
            </div>
            <div className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white opacity-40 ${theme.buttonBg}`}>
              Vérifier
            </div>
          </div>
        ) : props.questionType === "true-false" ? (
          <div className="flex gap-3">
            {([true, false] as const).map((value) => {
              const label = value ? "Vrai" : "Faux";
              const isCorrect = value === props.correctBool;
              return (
                <div
                  key={label}
                  className={`flex-1 rounded-xl border-2 px-5 py-3 text-center text-sm font-semibold ${
                    isCorrect
                      ? "border-green-400 bg-green-50 text-green-800"
                      : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {label}
                  {isCorrect && <span className="ml-1.5 text-green-600">✓</span>}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`w-full rounded-xl py-2.5 text-center text-sm font-semibold text-white ${theme.buttonBg} opacity-40`}
          >
            Voir la réponse
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewSection({ label, text }: { label: string; text: string }) {
  return (
    <div className="mx-6 mb-4 rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{text}</p>
    </div>
  );
}
