"use client";

import { useCallback, useEffect, useState } from "react";
import { allTracks as builtinTracks, BUILTIN_CONTENT_VERSION } from "@/content";
import { getContentProvider } from "./content";
import type { ContentProvider } from "./content-provider";
import type { Lesson, Track } from "./types";

// ---------------------------------------------------------------------------
// useContent — charge tous les tracks
// ---------------------------------------------------------------------------

interface UseContentReturn {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

async function ensureBuiltinContent(provider: ContentProvider): Promise<void> {
  await provider.syncBuiltinContent(builtinTracks, BUILTIN_CONTENT_VERSION);
}

export function useContent(): UseContentReturn {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = getContentProvider();

      await ensureBuiltinContent(provider);

      setTracks(await provider.getAllTracks());
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erreur de chargement du contenu";
      setError(message);
      // Fallback sur le contenu statique intégré
      setTracks(builtinTracks);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function run() { await load(); }
    void run();
  }, [load]);

  return { tracks, isLoading, error, refetch: load };
}

// ---------------------------------------------------------------------------
// useLesson — charge une leçon spécifique
// ---------------------------------------------------------------------------

interface UseLessonReturn {
  lesson: Lesson | undefined;
  isLoading: boolean;
  error: string | null;
}

export function useLesson(
  trackId: string,
  lessonId: string,
): UseLessonReturn {
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(Boolean(trackId && lessonId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trackId || !lessonId) return;

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const provider = getContentProvider();

        await ensureBuiltinContent(provider);

        const data = await provider.getLessonById(trackId, lessonId);
        if (!cancelled) setLesson(data);
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "Erreur de chargement de la leçon";
          setError(message);
          // Fallback statique
          const fallbackTrack = builtinTracks.find((t) => t.id === trackId);
          setLesson(fallbackTrack?.lessons.find((l) => l.id === lessonId));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [trackId, lessonId]);

  return { lesson, isLoading, error };
}
