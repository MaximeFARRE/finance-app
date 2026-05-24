"use client";

import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { getContentProvider } from "@/lib/content";
import { generateCardId } from "@/lib/import-export";
import { CardForm, type CardFormData } from "@/components/admin/CardForm";
import { CardPreview } from "@/components/admin/CardPreview";

export default function NewCardPage({
  params,
}: {
  params: Promise<{ trackId: string; lessonId: string }>;
}) {
  const { trackId, lessonId } = use(params);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState<CardFormData>({
    type: "definition",
    front: "",
    back: "",
    difficulty: 1,
    tags: [],
  });

  async function handleSave(data: CardFormData) {
    setIsSaving(true);
    try {
      const provider = getContentProvider();
      const allCards = await provider.getAllCards();
      const existingIds = new Set(allCards.map((c) => c.id));

      // Extraire le slug de la leçon depuis l'ID (ex: mf-l1-action → action)
      // Fallback: utiliser l'ID entier si pas de suffixe reconnaissable
      const lessonSlug = lessonId.split("-").pop() ?? lessonId;

      const id = generateCardId(trackId, lessonSlug, data.type, data.front, existingIds);
      const card = {
        id,
        type: data.type,
        front: data.front,
        back: data.back,
        ...(data.detail ? { detail: data.detail } : {}),
        difficulty: data.difficulty,
        tags: data.tags,
      };

      await provider.upsertCard(lessonId, card);
      router.push(`/admin/tracks/${trackId}/lessons/${lessonId}`);
    } finally {
      setIsSaving(false);
    }
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
        <span className="text-gray-700 font-medium">Nouvelle carte</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nouvelle carte</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <CardForm
            onSave={(data) => {
              setPreview(data);
              void handleSave(data);
            }}
            onChange={setPreview}
            onCancel={() => router.push(`/admin/tracks/${trackId}/lessons/${lessonId}`)}
            isSaving={isSaving}
          />
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-8 self-start">
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
      </div>
    </div>
  );
}
