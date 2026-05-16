import type { LevelInfo } from "@/lib/types";

interface XPBarProps {
  levelInfo: LevelInfo;
  xp: number;
  className?: string;
}

export function XPBar({ levelInfo, xp, className = "" }: XPBarProps) {
  const currentLevelXp = xp - levelInfo.xpRequired;
  const nextLevelXp = levelInfo.xpForNext - levelInfo.xpRequired;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-700">
        {levelInfo.level}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-700">{levelInfo.title}</span>
          <span className="text-xs text-gray-500">
            {currentLevelXp} / {nextLevelXp} XP
          </span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-yellow-400 transition-all duration-500"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
      </div>
      <span className="shrink-0 text-xs font-semibold text-gray-600">{xp} XP</span>
    </div>
  );
}
