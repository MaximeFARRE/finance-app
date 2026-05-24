"use client";

import { useState } from "react";
import type { CardType, Difficulty, SuggestionCategory } from "@/lib/types";
import { getContentProvider } from "@/lib/content";

const CATEGORIES: { value: SuggestionCategory; icon: string; label: string }[] = [
  { value: "error", icon: "🐛", label: "Erreur dans le contenu" },
  { value: "missing-detail", icon: "📝", label: "Détail manquant" },
  { value: "wording", icon: "✏️", label: "Formulation confuse" },
  { value: "new-card", icon: "➕", label: "Proposer une nouvelle carte" },
  { value: "other", icon: "💬", label: "Autre" },
];

const CARD_TYPES: { value: CardType; label: string }[] = [
  { value: "definition", label: "Définition" },
  { value: "intuition", label: "Intuition" },
  { value: "example", label: "Exemple" },
  { value: "formula", label: "Formule" },
  { value: "trap", label: "Piège" },
  { value: "interview-question", label: "Question entretien" },
  { value: "model-answer", label: "Réponse modèle" },
];

interface Props {
  cardId: string | null;
  trackId: string;
  lessonId: string;
  cardFront?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function SuggestionModal({
  cardId,
  trackId,
  lessonId,
  cardFront,
  onClose,
  onSuccess,
}: Props) {
  const [category, setCategory] = useState<SuggestionCategory>("error");
  const [message, setMessage] = useState("");
  const [proposedType, setProposedType] = useState<CardType>("definition");
  const [proposedFront, setProposedFront] = useState("");
  const [proposedBack, setProposedBack] = useState("");
  const [proposedDifficulty, setProposedDifficulty] = useState<Difficulty>(1);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const isNewCard = category === "new-card";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) {
      setError("Veuillez écrire un message.");
      return;
    }
    if (isNewCard && (!proposedFront.trim() || !proposedBack.trim())) {
      setError("Veuillez remplir le front et le back de la carte proposée.");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const provider = getContentProvider();
      await provider.submitSuggestion({
        cardId: isNewCard ? null : cardId,
        trackId,
        lessonId,
        category,
        message: message.trim(),
        ...(isNewCard
          ? {
              proposedCard: {
                type: proposedType,
                front: proposedFront.trim(),
                back: proposedBack.trim(),
                difficulty: proposedDifficulty,
              },
            }
          : {}),
      });
      onSuccess();
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-0 sm:pb-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h2 className="text-base font-bold text-gray-900">Faire une suggestion</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
          {/* Context */}
          {cardFront && (
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
              <p className="text-xs text-gray-400 mb-0.5">Carte concernée</p>
              <p className="text-sm text-gray-700 font-medium line-clamp-2">{cardFront}</p>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Type de suggestion
            </label>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(({ value, icon, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 cursor-pointer rounded-xl border px-3 py-2.5 transition ${
                    category === value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={value}
                    checked={category === value}
                    onChange={() => setCategory(value)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    {icon} {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {isNewCard ? "Contexte / Motivation" : "Description"}{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError("");
              }}
              placeholder={
                isNewCard
                  ? "Pourquoi cette carte serait utile ?"
                  : "Décrivez le problème ou l'amélioration souhaitée…"
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* New card fields */}
          {isNewCard && (
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Carte proposée
              </p>

              {/* Type */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Type</label>
                <select
                  value={proposedType}
                  onChange={(e) => setProposedType(e.target.value as CardType)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CARD_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Front */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  Front <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={2}
                  value={proposedFront}
                  onChange={(e) => setProposedFront(e.target.value)}
                  placeholder="La question ou notion…"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Back */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  Back <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={proposedBack}
                  onChange={(e) => setProposedBack(e.target.value)}
                  placeholder="La réponse complète…"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Difficulté</label>
                <div className="flex gap-4">
                  {([1, 2, 3] as const).map((d) => (
                    <label key={d} className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
                      <input
                        type="radio"
                        name="proposedDifficulty"
                        value={d}
                        checked={proposedDifficulty === d}
                        onChange={() => setProposedDifficulty(d)}
                        className="accent-blue-600"
                      />
                      {d === 1 ? "Facile" : d === 2 ? "Moyen" : "Difficile"}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSending}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSending ? "Envoi…" : "Envoyer la suggestion"}
          </button>
        </form>
      </div>
    </div>
  );
}
