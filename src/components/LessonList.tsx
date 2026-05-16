import type { Lesson } from "@/lib/types";
import { isLessonUnlocked, isLessonCompleted } from "@/lib/unlock";

interface Props {
  lessons: Lesson[];
  completedLessonIds: string[];
  lessonStars: Record<string, 0 | 1 | 2 | 3>;
  onStart: (lessonId: string) => void;
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

export function LessonList({ lessons, completedLessonIds, lessonStars, onStart }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson, index) => {
        const unlocked = isLessonUnlocked(lessons, lesson.id, completedLessonIds);
        const completed = isLessonCompleted(lesson.id, completedLessonIds);
        const stars = (lessonStars[lesson.id] ?? 0) as 0 | 1 | 2 | 3;

        return (
          <button
            key={lesson.id}
            disabled={!unlocked}
            onClick={() => onStart(lesson.id)}
            className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
              !unlocked
                ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-50"
                : completed
                  ? "border-green-200 bg-green-50 hover:bg-green-100"
                  : "border-blue-200 bg-white hover:border-blue-400 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-3">
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
                  className={`font-semibold truncate ${
                    !unlocked ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {lesson.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{lesson.estimatedMinutes} min</p>
              </div>

              {completed && stars > 0 && <StarRow count={stars} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
