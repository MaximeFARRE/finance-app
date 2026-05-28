"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bug, FileText, Pencil, Plus, MessageCircle, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getContentProvider } from "@/lib/content";
import type { Suggestion, SuggestionStatus } from "@/lib/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CATEGORY_META: Record<
  string,
  { label: string; icon: LucideIcon; colorClass: string }
> = {
  error: { label: "Erreur", icon: Bug, colorClass: "bg-red-100 text-red-700" },
  "missing-detail": { label: "Détail manquant", icon: FileText, colorClass: "bg-amber-100 text-amber-700" },
  wording: { label: "Formulation", icon: Pencil, colorClass: "bg-blue-100 text-blue-700" },
  "new-card": { label: "Nouvelle carte", icon: Plus, colorClass: "bg-emerald-100 text-emerald-700" },
  other: { label: "Autre", icon: MessageCircle, colorClass: "bg-gray-100 text-gray-600" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TABS: { value: SuggestionStatus | "all"; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "pending", label: "En attente" },
  { value: "accepted", label: "Acceptées" },
  { value: "rejected", label: "Rejetées" },
];

// ---------------------------------------------------------------------------
// Reject modal
// ---------------------------------------------------------------------------

function RejectModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: (note: string) => void;
  onCancel: () => void;
}) {
  const [note, setNote] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-base font-bold text-gray-900 mb-3">Rejeter la suggestion</h2>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note optionnelle (visible par l'admin uniquement)…"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
        />
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onConfirm(note)}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Rejeter
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminSuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<SuggestionStatus | "all">("pending");
  const [rejectTarget, setRejectTarget] = useState<Suggestion | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    try {
      const provider = getContentProvider();
      const data = await provider.getSuggestions();
      setSuggestions(data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function run() { await load(); }
    void run();
  }, []);

  async function accept(suggestion: Suggestion) {
    setActionInProgress(suggestion.id);
    try {
      const provider = getContentProvider();
      await provider.updateSuggestionStatus(suggestion.id, "accepted");
      setSuggestions((prev) =>
        prev.map((s) => (s.id === suggestion.id ? { ...s, status: "accepted" } : s)),
      );
    } finally {
      setActionInProgress(null);
    }
  }

  async function reject(suggestion: Suggestion, note: string) {
    setRejectTarget(null);
    setActionInProgress(suggestion.id);
    try {
      const provider = getContentProvider();
      await provider.updateSuggestionStatus(suggestion.id, "rejected", note || undefined);
      setSuggestions((prev) =>
        prev.map((s) => (s.id === suggestion.id ? { ...s, status: "rejected", adminNote: note || undefined } : s)),
      );
    } finally {
      setActionInProgress(null);
    }
  }

  const filtered = suggestions.filter(
    (s) => tab === "all" || s.status === tab,
  );

  const pendingCount = suggestions.filter((s) => s.status === "pending").length;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suggestions</h1>
          {pendingCount > 0 && (
            <p className="text-sm text-amber-600 mt-0.5">
              {pendingCount} en attente de traitement
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map(({ value, label }) => {
          const count =
            value === "all"
              ? suggestions.length
              : suggestions.filter((s) => s.status === value).length;
          return (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${
                tab === value
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
              {count > 0 && (
                <span className="ml-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-white border border-gray-200 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-gray-400">
          Aucune suggestion dans cette catégorie.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((suggestion) => {
            const meta = CATEGORY_META[suggestion.category] ?? CATEGORY_META.other!;
            const isPending = suggestion.status === "pending";
            const isProcessing = actionInProgress === suggestion.id;

            return (
              <div
                key={suggestion.id}
                className={`rounded-2xl border bg-white p-5 transition ${
                  isPending ? "border-gray-200" : "border-gray-100 opacity-75"
                }`}
              >
                {/* Header row */}
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.colorClass}`}
                  >
                    <meta.icon size={11} />
                    {meta.label}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {formatDate(suggestion.createdAt)}
                  </span>
                  {suggestion.status !== "pending" && (
                    <span
                      className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        suggestion.status === "accepted"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {suggestion.status === "accepted" ? "Acceptée" : "Rejetée"}
                    </span>
                  )}
                </div>

                {/* Card ref */}
                {suggestion.cardId ? (
                  <p className="text-xs text-gray-400 mb-1">
                    Carte :{" "}
                    <Link
                      href={`/admin/tracks/${suggestion.trackId}/lessons/${suggestion.lessonId}/cards/${suggestion.cardId}/edit`}
                      className="text-blue-500 hover:underline font-mono"
                    >
                      {suggestion.cardId}
                    </Link>
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mb-1">Nouvelle carte proposée</p>
                )}

                {/* Lesson ref */}
                <p className="text-xs text-gray-400 mb-3">
                  Leçon :{" "}
                  <Link
                    href={`/admin/tracks/${suggestion.trackId}/lessons/${suggestion.lessonId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {suggestion.lessonId}
                  </Link>
                </p>

                {/* Message */}
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {suggestion.message}
                </p>

                {/* Proposed card preview */}
                {suggestion.proposedCard && (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 mb-3 text-xs">
                    <p className="font-semibold text-emerald-700 mb-1">Carte proposée</p>
                    <p className="text-gray-700">
                      <span className="font-medium">Type :</span> {suggestion.proposedCard.type}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-medium">Front :</span> {suggestion.proposedCard.front}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-medium">Back :</span>{" "}
                      <span className="line-clamp-2">{suggestion.proposedCard.back}</span>
                    </p>
                  </div>
                )}

                {/* Admin note */}
                {suggestion.adminNote && (
                  <p className="text-xs text-gray-400 italic mb-3">
                    Note admin : {suggestion.adminNote}
                  </p>
                )}

                {/* Actions */}
                {isPending && (
                  <div className="flex gap-2 flex-wrap">
                    {/* Accept → mark + link to edit/new */}
                    {suggestion.category === "new-card" ? (
                      <Link
                        href={`/admin/tracks/${suggestion.trackId}/lessons/${suggestion.lessonId}/cards/new`}
                        onClick={() => void accept(suggestion)}
                        className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                      >
                        <CheckCircle2 size={13} className="inline mr-1" />Créer la carte
                      </Link>
                    ) : suggestion.cardId ? (
                      <Link
                        href={`/admin/tracks/${suggestion.trackId}/lessons/${suggestion.lessonId}/cards/${suggestion.cardId}/edit`}
                        onClick={() => void accept(suggestion)}
                        className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                      >
                        <CheckCircle2 size={13} className="inline mr-1" />Modifier la carte
                      </Link>
                    ) : (
                      <button
                        onClick={() => void accept(suggestion)}
                        disabled={isProcessing}
                        className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <CheckCircle2 size={13} className="inline mr-1" />Accepter
                      </button>
                    )}

                    <button
                      onClick={() => setRejectTarget(suggestion)}
                      disabled={isProcessing}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      ❌ Rejeter
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <RejectModal
          onConfirm={(note) => void reject(rejectTarget, note)}
          onCancel={() => setRejectTarget(null)}
        />
      )}
    </div>
  );
}
