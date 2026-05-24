import type { LearningWorld, Lesson } from "@/lib/types";
import { isLessonUnlocked, isLessonCompleted, hasCompletedLearnSession } from "@/lib/unlock";

interface Props {
  lessons: Lesson[];
  worlds?: LearningWorld[];
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
  worlds,
  completedLessonIds,
  lessonStars,
  learnSessionIds,
  onLearn,
  onQuiz,
}: Props) {
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const groupedLessonIds = new Set(worlds?.flatMap((world) => world.lessonIds) ?? []);
  const orderedWorlds = [...(worlds ?? [])].sort((a, b) => a.order - b.order);
  const ungroupedLessons = lessons.filter((lesson) => !groupedLessonIds.has(lesson.id));

  function renderLesson(lesson: Lesson, index: number) {
    const unlocked = isLessonUnlocked(lessons, lesson.id, completedLessonIds);
    const completed = isLessonCompleted(lesson.id, completedLessonIds);
    const learnDone = hasCompletedLearnSession(lesson.id, learnSessionIds);
    const stars = (lessonStars[lesson.id] ?? 0) as 0 | 1 | 2 | 3;
    const isBoss = lesson.kind === "boss";
    const isBonus = lesson.kind === "bonus";

    return (
      <div
        key={lesson.id}
        className={`w-full rounded-2xl border-2 p-4 transition-all ${
          !unlocked
            ? "border-gray-100 bg-gray-50 opacity-50"
            : completed
              ? "border-green-200 bg-green-50"
              : isBoss
                ? "border-violet-200 bg-violet-50"
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
                  : isBoss
                    ? "bg-violet-600 text-white"
                    : "bg-blue-600 text-white"
            }`}
          >
            {!unlocked ? "🔒" : completed ? "✓" : isBoss ? "★" : index + 1}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p
                className={`font-semibold truncate ${!unlocked ? "text-gray-400" : "text-gray-900"}`}
              >
                {lesson.title}
              </p>
              {(isBoss || isBonus) && (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    isBoss ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {isBoss ? "Boss" : "Bonus"}
                </span>
              )}
            </div>
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
                  : learnDone || isBoss
                    ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                    : "bg-blue-100 text-blue-500 hover:bg-blue-200 active:scale-95"
              }`}
            >
              {isBoss ? "🏁 Boss" : "🎯 Quiz"}
            </button>
            {/* Tooltip when learn not done */}
            {unlocked && !learnDone && !isBoss && (
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                Commence par Apprendre
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (orderedWorlds.length > 0) {
    return (
      <div className="flex flex-col gap-7">
        {orderedWorlds.map((world) => {
          const worldLessons = world.lessonIds
            .map((lessonId) => lessonById.get(lessonId))
            .filter((lesson): lesson is Lesson => Boolean(lesson));

          if (worldLessons.length === 0) return null;

          return (
            <section key={world.id}>
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                  World {world.order}
                </p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">{world.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{world.description}</p>
              </div>
              <div className="flex flex-col gap-3">
                {worldLessons.map((lesson) => renderLesson(lesson, lessons.indexOf(lesson)))}
              </div>
            </section>
          );
        })}

        {ungroupedLessons.length > 0 && (
          <section>
            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-900">Autres leçons</h2>
            </div>
            <div className="flex flex-col gap-3">
              {ungroupedLessons.map((lesson) => renderLesson(lesson, lessons.indexOf(lesson)))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson, index) => renderLesson(lesson, index))}
    </div>
  );
}
