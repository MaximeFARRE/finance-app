"use client";

import { useState } from "react";
import {
  BookOpen, Lightbulb, Layers, Sigma, AlertTriangle,
  MessageSquare, CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CardType, Difficulty } from "@/lib/types";

const CARD_TYPES: { value: CardType; label: string; icon: LucideIcon }[] = [
  { value: "definition", label: "Définition", icon: BookOpen },
  { value: "intuition", label: "Intuition", icon: Lightbulb },
  { value: "example", label: "Exemple", icon: Layers },
  { value: "formula", label: "Formule", icon: Sigma },
  { value: "trap", label: "Piège", icon: AlertTriangle },
  { value: "interview-question", label: "Question entretien", icon: MessageSquare },
  { value: "model-answer", label: "Réponse modèle", icon: CheckCircle2 },
];

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: 1, label: "Facile" },
  { value: 2, label: "Moyen" },
  { value: 3, label: "Difficile" },
];

export interface CardFormData {
  type: CardType;
  front: string;
  back: string;
  detail?: string;
  difficulty: Difficulty;
  tags: string[];
}

interface CardFormErrors {
  front?: string;
  back?: string;
}

interface Props {
  initialData?: Partial<CardFormData>;
  onSave: (data: CardFormData) => void;
  onChange?: (data: CardFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

function validate(data: CardFormData): CardFormErrors {
  const errors: CardFormErrors = {};
  if (!data.front.trim()) errors.front = "Le front ne peut pas être vide.";
  if (!data.back.trim()) errors.back = "Le back ne peut pas être vide.";
  return errors;
}

export function CardForm({ initialData, onSave, onChange, onCancel, isSaving }: Props) {
  const [formData, setFormData] = useState<CardFormData>({
    type: initialData?.type ?? "definition",
    front: initialData?.front ?? "",
    back: initialData?.back ?? "",
    detail: initialData?.detail ?? "",
    difficulty: initialData?.difficulty ?? 1,
    tags: initialData?.tags ?? [],
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<CardFormErrors>({});
  const [detailOpen, setDetailOpen] = useState(Boolean(initialData?.detail));

  function handleChange<K extends keyof CardFormData>(key: K, value: CardFormData[K]) {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      onChange?.(next);
      return next;
    });
    if (key === "front" || key === "back") {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => {
        const next = { ...prev, tags: [...prev.tags, trimmed] };
        onChange?.(next);
        return next;
      });
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setFormData((prev) => {
      const next = { ...prev, tags: prev.tags.filter((t) => t !== tag) };
      onChange?.(next);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const data = { ...formData, detail: formData.detail?.trim() || undefined };
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Type */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Type de carte
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CARD_TYPES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleChange("type", value)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                formData.type === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Front */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Front <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          value={formData.front}
          onChange={(e) => handleChange("front", e.target.value)}
          placeholder="La question ou la notion à retenir…"
          className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            errors.front ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.front && <p className="mt-1 text-xs text-red-500">{errors.front}</p>}
      </div>

      {/* Back */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Back <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={5}
          value={formData.back}
          onChange={(e) => handleChange("back", e.target.value)}
          placeholder="La réponse complète…"
          className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            errors.back ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.back && <p className="mt-1 text-xs text-red-500">{errors.back}</p>}
      </div>

      {/* Detail (pliable) */}
      <div>
        <button
          type="button"
          onClick={() => setDetailOpen((v) => !v)}
          className="text-xs font-medium text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
        >
          {detailOpen ? "▲ Masquer le détail" : "▼ Ajouter un détail (optionnel)"}
        </button>
        {detailOpen && (
          <textarea
            rows={4}
            value={formData.detail ?? ""}
            onChange={(e) => handleChange("detail", e.target.value)}
            placeholder="Explication approfondie, contexte, nuances…"
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        )}
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Difficulté
        </label>
        <div className="flex gap-3">
          {DIFFICULTIES.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="difficulty"
                value={value}
                checked={formData.difficulty === value}
                onChange={() => handleChange("difficulty", value)}
                className="accent-blue-600"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Tags
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 text-blue-400 hover:text-blue-600 transition-colors"
                aria-label={`Supprimer le tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag(tagInput);
            }
          }}
          onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
          placeholder="Tapez un tag + Entrée"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? "Enregistrement…" : "Sauvegarder"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
