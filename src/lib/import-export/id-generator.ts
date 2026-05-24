import type { CardType } from "../types";

// ---------------------------------------------------------------------------
// Abréviations des types de cartes pour les IDs générés
// ---------------------------------------------------------------------------

const TYPE_ABBREV: Record<CardType, string> = {
  definition: "def",
  intuition: "int",
  example: "ex",
  formula: "form",
  trap: "trap",
  "interview-question": "iq",
  "model-answer": "ma",
};

// ---------------------------------------------------------------------------
// Préfixe de track : initiales de chaque mot ("market-finance" → "mf")
// ---------------------------------------------------------------------------

function trackPrefix(trackId: string): string {
  return trackId
    .split("-")
    .map((word) => word[0] ?? "")
    .join("");
}

// ---------------------------------------------------------------------------
// Hash court (4 caractères hex) sur le texte du front
// Algorithme djb2 — déterministe, léger, pas besoin de cryptographie
// ---------------------------------------------------------------------------

function hash4(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h) ^ (text.charCodeAt(i) ?? 0);
    h = h >>> 0; // 32-bit unsigned
  }
  return h.toString(16).padStart(8, "0").slice(0, 4);
}

// ---------------------------------------------------------------------------
// Génération d'ID de carte
// Pattern : {trackPrefix}-{lessonSlug}-{typeAbbrev}-{hash4(front)}
// Exemples :
//   generateCardId("market-finance", "action", "definition", "Qu'est-ce...")
//   → "mf-action-def-3a2f"
// ---------------------------------------------------------------------------

export function generateCardId(
  trackId: string,
  lessonSlug: string,
  cardType: CardType,
  front: string,
  existingIds: Set<string>,
): string {
  const prefix = trackPrefix(trackId);
  const abbrev = TYPE_ABBREV[cardType];
  const base = `${prefix}-${lessonSlug}-${abbrev}-${hash4(front)}`;

  if (!existingIds.has(base)) return base;

  // Collision : ajouter un suffixe numérique croissant
  let counter = 2;
  while (existingIds.has(`${base}-${counter}`)) {
    counter++;
  }
  return `${base}-${counter}`;
}
