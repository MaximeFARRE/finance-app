import type { Lesson } from "@/lib/types";
import { isLessonUnlocked, isLessonCompleted, hasCompletedLearnSession } from "@/lib/unlock";

interface Props {
  lessons: Lesson[];
  completedLessonIds: string[];
  lessonStars: Record<string, 0 | 1 | 2 | 3>;
  learnSessionIds: string[];
  onLearn: (lessonId: string) => void;
  onQuiz: (lessonId: string) => void;
}

function StarRow({ count }: { count: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex gap-0.5">
      {([1, 2, 3] as const).map((i) => (
        <span key={i} className={`text-sm ${i <= count ? "text-yellow-400" : "text-gray-300"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export function LessonList({
  lessons,
  completedLessonIds,
  lessonStars,
  learnSessionIds,
  onLearn,
  onQuiz,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson, index) => {
        const unlocked = isLessonUnlocked(lessons, lesson.id, completedLessonIds);
        const completed = isLessonCompleted(lesson.id, completedLessonIds);
        const learnDone = hasCompletedLearnSession(lesson.id, learnSessionIds);
        const stars = (lessonStars[lesson.id] ?? 0) as 0 | 1 | 2 | 3;

        return (
          <div
            key={lesson.id}
            className={`w-full rounded-2xl border-2 p-4 transition-all ${
              !unlocked
                ? "border-gray-100 bg-gray-50 opacity-50"
                : completed
                  ? "border-green-200 bg-green-50"
                  : "border-blue-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  !unlocked
                    ? "bg-gray-200 text-gray-400"
                    : completed
                      ? "bg-green-500 text-white"
                      : "bg-blue-600 text-white"
                }`}
              >
                {!unlocked ? "🔒" : completed ? "✓" : index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold truncate ${!unlocked ? "text-gray-400" : "text-gray-900"}`}
                >
                  {lesson.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.estimatedMinutes} min</p>
              </div>

              {completed && stars > 0 && <StarRow count={stars} />}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2" role="group">
              <button
                disabled={!unlocked}
                onClick={() => onLearn(lesson.id)}
                className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                  !unlocked
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:scale-95"
                }`}
              >
                📖 Apprendre
              </button>

              <div className="relative flex-1 group">
                <button
                  disabled={!unlocked}
                  onClick={() => onQuiz(lesson.id)}
                  className={`w-full rounded-xl py-2 text-xs font-semibold transition-all ${
                    !unlocked
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : learnDone
                        ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                        : "bg-blue-100 text-blue-500 hover:bg-blue-200 active:scale-95"
                  }`}
                >
                  🎯 Quiz
                </button>
                {/* Tooltip when learn not done */}
                {unlocked && !learnDone && (
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Commence par Apprendre
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
