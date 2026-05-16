import type { LevelInfo } from "./types";

const LEVEL_THRESHOLDS: { xp: number; title: string }[] = [
  { xp: 0, title: "Stagiaire" },
  { xp: 50, title: "Analyste Junior" },
  { xp: 150, title: "Analyste" },
  { xp: 350, title: "Analyste Senior" },
  { xp: 700, title: "Associate" },
  { xp: 1200, title: "VP" },
  { xp: 2000, title: "Director" },
  { xp: 3500, title: "Managing Director" },
  { xp: 6000, title: "Partner" },
];

export function getLevelInfo(xp: number): LevelInfo {
  let currentLevel = 0;

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    const threshold = LEVEL_THRESHOLDS[i];
    if (threshold && xp >= threshold.xp) {
      currentLevel = i;
      break;
    }
  }

  const current = LEVEL_THRESHOLDS[currentLevel]!;
  const next = LEVEL_THRESHOLDS[currentLevel + 1];
  const xpForNext = next ? next.xp : current.xp;
  const progressPercent =
    xpForNext === current.xp
      ? 100
      : Math.round(((xp - current.xp) / (xpForNext - current.xp)) * 100);

  return {
    level: currentLevel + 1,
    title: current.title,
    xpRequired: current.xp,
    xpForNext,
    progressPercent,
  };
}
