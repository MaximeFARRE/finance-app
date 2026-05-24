import { z } from "zod";

// ---------------------------------------------------------------------------
// Schémas de base
// ---------------------------------------------------------------------------

export const CardTypeSchema = z.enum([
  "definition",
  "intuition",
  "example",
  "formula",
  "trap",
  "interview-question",
  "model-answer",
]);

export const DifficultySchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

// ---------------------------------------------------------------------------
// Carte à l'import
// L'id est optionnel — auto-généré s'il est absent.
// ---------------------------------------------------------------------------

export const CardImportSchema = z.object({
  id: z.string().min(1).optional(),
  type: CardTypeSchema,
  front: z.string().min(1, "Le front ne peut pas être vide"),
  back: z.string().min(1, "Le back ne peut pas être vide"),
  detail: z.string().optional(),
  difficulty: DifficultySchema,
  tags: z.array(z.string()).default([]),
});

// ---------------------------------------------------------------------------
// Leçon à l'import
// L'id est requis pour tracer les modifications (versioning).
// ---------------------------------------------------------------------------

export const LessonImportSchema = z.object({
  id: z.string().min(1, "L'id de la leçon est requis"),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().default(""),
  estimatedMinutes: z.number().int().positive().default(5),
  cards: z.array(CardImportSchema).min(1, "Une leçon doit avoir au moins une carte"),
});

// ---------------------------------------------------------------------------
// Track à l'import
// ---------------------------------------------------------------------------

export const TrackImportSchema = z.object({
  id: z.string().min(1, "L'id du track est requis"),
  title: z.string().min(1),
  description: z.string().default(""),
  emoji: z.string().default("📚"),
  color: z.string().default("blue"),
});

// ---------------------------------------------------------------------------
// Format "track complet" — YAML/JSON avec hiérarchie complète
// ---------------------------------------------------------------------------

export const FullImportSchema = z.object({
  track: TrackImportSchema,
  lessons: z.array(LessonImportSchema).min(1),
});

// ---------------------------------------------------------------------------
// Format "import rapide" — cartes ajoutées à une leçon existante
// ---------------------------------------------------------------------------

export const QuickImportSchema = z.object({
  target: z.object({
    track: z.string().min(1, "L'id du track cible est requis"),
    lesson: z.string().min(1, "L'id de la leçon cible est requis"),
  }),
  cards: z.array(CardImportSchema).min(1),
});

// ---------------------------------------------------------------------------
// Types inférés (usage interne au module import-export)
// ---------------------------------------------------------------------------

export type CardImportData = z.infer<typeof CardImportSchema>;
export type LessonImportData = z.infer<typeof LessonImportSchema>;
export type TrackImportData = z.infer<typeof TrackImportSchema>;
export type FullImportData = z.infer<typeof FullImportSchema>;
export type QuickImportData = z.infer<typeof QuickImportSchema>;
