"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getContentProvider } from "@/lib/content";
import { CardForm, type CardFormData } from "@/components/admin/CardForm";
import { CardPreview } from "@/components/admin/CardPreview";
import { CardHistory } from "@/components/admin/CardHistory";
import type { Card } from "@/lib/types";

export default function EditCardPage({
  params,
}: {
  params: Promise<{ trackId: string; lessonId: string; cardId: string }>;
}) {
  const { trackId, lessonId, cardId } = use(params);
  const router = useRouter();
  const [card, setCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);
  const [preview, setPreview] = useState<CardFormData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const provider = getContentProvider();
        const cards = await provider.getCardsByLesson(lessonId);
        const found = cards.find((c) => c.id === cardId);
        if (found) {
          setCard(found);
          setPreview({
            type: found.type,
            front: found.front,
            back: found.back,
            detail: found.detail,
            difficulty: found.difficulty,
            tags: found.tags,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [lessonId, cardId]);

  async function handleSave(data: CardFormData) {
    if (!card) return;
    setIsSaving(true);
    try {
      const provider = getContentProvider();
      const updated: Card = {
        ...card,
        type: data.type,
        front: data.front,
        back: data.back,
        difficulty: data.difficulty,
        tags: data.tags,
        detail: data.detail || undefined,
      };
      await provider.upsertCard(lessonId, updated);
      setCard(updated);
      setHistoryKey((k) => k + 1); // refresh history
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <div className="text-sm text-gray-400">Chargement…</div>;
  }

  if (!card || !preview) {
    return (
      <div className="text-sm text-gray-500">
        Carte introuvable.{" "}
        <Link
          href={`/admin/tracks/${trackId}/lessons/${lessonId}`}
          className="text-blue-600 underline"
        >
          Retour à la leçon
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/admin/tracks" className="hover:text-gray-600">Contenus</Link>
        <span>/</span>
        <Link href={`/admin/tracks/${trackId}`} className="hover:text-gray-600">{trackId}</Link>
        <span>/</span>
        <Link href={`/admin/tracks/${trackId}/lessons/${lessonId}`} className="hover:text-gray-600">
          {lessonId}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Modifier la carte</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Modifier la carte</h1>
        <button
          onClick={() => setShowHistory((v) => !v)}
          className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          {showHistory ? "Masquer l'historique" : "🕐 Historique"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <CardForm
            initialData={{
              type: card.type,
              front: card.front,
              back: card.back,
              detail: card.detail,
              difficulty: card.difficulty,
              tags: card.tags,
            }}
            onSave={(data) => {
              setPreview(data);
              void handleSave(data);
            }}
            onChange={setPreview}
            onCancel={() => router.push(`/admin/tracks/${trackId}/lessons/${lessonId}`)}
            isSaving={isSaving}
          />
        </div>

        {/* Right column: preview + history */}
        <div className="flex flex-col gap-6">
          <div className="lg:sticky lg:top-8 self-start w-full">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Prévisualisation
            </p>
            <CardPreview
              type={preview.type}
              front={preview.front}
              back={preview.back}
              detail={preview.detail}
              difficulty={preview.difficulty}
              tags={preview.tags}
            />
          </div>

          {showHistory && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Historique des versions
              </p>
              <CardHistory
                key={historyKey}
                cardId={cardId}
                onRestore={() => {
                  router.refresh();
                  setHistoryKey((k) => k + 1);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
