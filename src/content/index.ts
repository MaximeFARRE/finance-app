import type { Track, Lesson } from "@/lib/types";
import { marketFinanceTrack } from "./market-finance";
import { corporateFinanceTrack } from "./corporate-finance";

export const allTracks: Track[] = [marketFinanceTrack, corporateFinanceTrack];

export function getTrackById(id: string): Track | undefined {
  return allTracks.find((t) => t.id === id);
}

export function getLessonById(trackId: string, lessonId: string): Lesson | undefined {
  return getTrackById(trackId)?.lessons.find((l) => l.id === lessonId);
}
