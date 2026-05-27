"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { SuggestionModal } from "./SuggestionModal";

interface Props {
  cardId: string;
  trackId: string;
  lessonId: string;
  cardFront?: string;
}

type UIState = "idle" | "open" | "success";

export function SuggestionButton({ cardId, trackId, lessonId, cardFront }: Props) {
  const [uiState, setUiState] = useState<UIState>("idle");

  if (uiState === "success") {
    return (
      <span className="text-xs text-emerald-600 font-medium animate-fade-in">
        Merci ! ✓
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setUiState("open")}
        className="rounded-full px-2.5 py-1 text-xs text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        aria-label="Signaler un problème ou faire une suggestion"
        title="Faire une suggestion"
      >
        <Flag size={12} className="inline mr-1" />
        Suggérer
      </button>

      {uiState === "open" && (
        <SuggestionModal
          cardId={cardId}
          trackId={trackId}
          lessonId={lessonId}
          cardFront={cardFront}
          onClose={() => setUiState("idle")}
          onSuccess={() => {
            setUiState("success");
            setTimeout(() => setUiState("idle"), 3000);
          }}
        />
      )}
    </>
  );
}
