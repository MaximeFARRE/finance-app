import { TrendingUp, Building2, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TRACK_ICONS: Record<string, LucideIcon> = {
  "market-finance": TrendingUp,
  "corporate-finance": Building2,
};

const TRACK_COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  green: { bg: "bg-emerald-100", text: "text-emerald-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
};

export function getTrackIcon(trackId: string): LucideIcon {
  return TRACK_ICONS[trackId] ?? BookOpen;
}

export function getTrackColorClasses(color: string): { bg: string; text: string } {
  return TRACK_COLOR_CLASSES[color] ?? { bg: "bg-gray-100", text: "text-gray-600" };
}
