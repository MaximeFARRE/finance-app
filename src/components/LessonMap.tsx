"use client";

import { useState, useRef, useEffect } from "react";
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

const SLOT_HEIGHT = 140;
const NODE_R = 36;
const LEFT_PCT = 0.22;
const RIGHT_PCT = 0.78;
const LABEL_WIDTH = 120;

function StarRow({ count, align }: { count: 0 | 1 | 2 | 3; align: "left" | "right" }) {
  return (
    <div className={`flex gap-0.5 mt-0.5 ${align === "right" ? "justify-end" : "justify-start"}`}>
      {([1, 2, 3] as const).map((s) => (
        <span key={s} className={s <= count ? "text-yellow-400" : "text-gray-300"} style={{ fontSize: 10 }}>
          ★
        </span>
      ))}
    </div>
  );
}

export function LessonMap({
  lessons,
  worlds,
  completedLessonIds,
  lessonStars,
  learnSessionIds,
  onLearn,
  onQuiz,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(380);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Ordered lessons: worlds first (by world order, then lessonIds order), then ungrouped
  const lessonById = new Map(lessons.map((l) => [l.id, l]));
  const orderedWorlds = [...(worlds ?? [])].sort((a, b) => a.order - b.order);
  const seen = new Set<string>();
  const orderedLessons: Lesson[] = [];

  for (const world of orderedWorlds) {
    for (const id of world.lessonIds) {
      const l = lessonById.get(id);
      if (l && !seen.has(l.id)) { orderedLessons.push(l); seen.add(l.id); }
    }
  }
  for (const l of lessons) {
    if (!seen.has(l.id)) orderedLessons.push(l);
  }

  // Compute node metadata
  let regularCount = 0;
  const nodes = orderedLessons.map((lesson, i) => {
    const isRight = i % 2 === 1;
    const x = width * (isRight ? RIGHT_PCT : LEFT_PCT);
    const y = SLOT_HEIGHT * i + SLOT_HEIGHT / 2;
    const unlocked = isLessonUnlocked(lessons, lesson.id, completedLessonIds);
    const completed = isLessonCompleted(lesson.id, completedLessonIds);
    const learnDone = hasCompletedLearnSession(lesson.id, learnSessionIds);
    const stars = (lessonStars[lesson.id] ?? 0) as 0 | 1 | 2 | 3;
    const isBoss = lesson.kind === "boss";
    const isBonus = lesson.kind === "bonus";
    const r = isBoss ? 44 : NODE_R;
    const displayIndex = !isBoss && !isBonus ? ++regularCount : 0;
    return { lesson, x, y, r, isRight, unlocked, completed, learnDone, stars, isBoss, isBonus, displayIndex };
  });

  const totalHeight = orderedLessons.length * SLOT_HEIGHT + 60;
  const nextAvailableIndex = nodes.findIndex((n) => n.unlocked && !n.completed);

  // SVG path between two nodes (S-curve)
  function curvePath(ax: number, ay: number, bx: number, by: number) {
    const midY = (ay + by) / 2;
    return `M ${ax} ${ay} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${by}`;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: totalHeight }}
      onClick={() => setSelectedId(null)}
    >
      {/* SVG connection paths */}
      <svg
        className="pointer-events-none absolute inset-0"
        width={width}
        height={totalHeight}
        aria-hidden
      >
        {nodes.slice(0, -1).map((node, i) => {
          const next = nodes[i + 1];
          if (!next) return null;
          const d = curvePath(node.x, node.y + node.r, next.x, next.y - next.r);
          const bothDone = node.completed && next.completed;
          const partialProgress = node.completed && !next.completed;
          return (
            <g key={node.lesson.id + "-path"}>
              <path d={d} fill="none" stroke="#e5e7eb" strokeWidth={5} strokeLinecap="round" />
              {bothDone && (
                <path d={d} fill="none" stroke="#22c55e" strokeWidth={5} strokeLinecap="round" />
              )}
              {partialProgress && (
                <path
                  d={d}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeDasharray="10 8"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const { lesson, x, y, r, isRight, unlocked, completed, learnDone, stars, isBoss, isBonus, displayIndex } = node;
        const isNext = i === nextAvailableIndex;
        const isSelected = selectedId === lesson.id;
        const labelAlign = isRight ? "right" : "left";

        const nodeBg = !unlocked
          ? "bg-gray-200"
          : completed
            ? "bg-green-500"
            : isBoss
              ? "bg-violet-600"
              : isBonus
                ? "bg-amber-500"
                : "bg-blue-600";

        const nodeIcon = !unlocked
          ? "🔒"
          : completed
            ? "✓"
            : isBoss
              ? "★"
              : isBonus
                ? "✦"
                : String(displayIndex);

        const labelStyle: React.CSSProperties = {
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: LABEL_WIDTH,
          textAlign: labelAlign,
          pointerEvents: "none",
          ...(isRight
            ? { right: r * 2 + 10 }
            : { left: r * 2 + 10 }),
        };

        return (
          <div
            key={lesson.id}
            style={{
              position: "absolute",
              left: x - r,
              top: y - r,
              width: r * 2,
              height: r * 2,
              zIndex: isSelected ? 20 : 10,
            }}
          >
            {/* Pulse ring for next available lesson */}
            {isNext && (
              <span
                className="absolute inset-0 rounded-full bg-blue-400 opacity-25 animate-ping"
                aria-hidden
              />
            )}

            {/* Node button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!unlocked) return;
                setSelectedId(isSelected ? null : lesson.id);
              }}
              disabled={!unlocked}
              aria-label={lesson.title}
              className={[
                `relative flex h-full w-full items-center justify-center rounded-full font-bold ${isBoss ? "shadow-lg" : "shadow-md"}`,
                "transition-transform duration-150 ease-out",
                nodeBg,
                unlocked ? "cursor-pointer text-white hover:scale-110 active:scale-95" : "cursor-not-allowed text-gray-400 opacity-50",
                isSelected ? "scale-110 ring-4 ring-blue-400 ring-offset-2" : "",
              ].join(" ")}
              style={{ fontSize: isBoss ? 22 : !unlocked ? 18 : 14 }}
            >
              {nodeIcon}
            </button>

            {/* Label to the side */}
            <div style={labelStyle}>
              <p
                className="text-xs font-semibold leading-tight"
                style={{
                  color: unlocked ? "#111827" : "#9ca3af",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {lesson.title}
              </p>
              {completed && stars > 0 && <StarRow count={stars} align={labelAlign} />}
              {isBoss && (
                <span className="mt-0.5 inline-block text-[10px] font-bold uppercase tracking-wide text-violet-600">
                  Boss
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Action popup */}
      {selectedId && (() => {
        const node = nodes.find((n) => n.lesson.id === selectedId);
        if (!node) return null;
        const { lesson, x, y, r, learnDone, isBoss } = node;

        const popupWidth = 220;
        const leftClamped = Math.max(8, Math.min(x - popupWidth / 2, width - popupWidth - 8));
        const showAbove = y > totalHeight * 0.6;

        const popupStyle: React.CSSProperties = {
          position: "absolute",
          left: leftClamped,
          width: popupWidth,
          zIndex: 30,
          ...(showAbove
            ? { bottom: totalHeight - (y - r) + 10 }
            : { top: y + r + 10 }),
        };

        return (
          <div
            className="rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl"
            style={popupStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-0.5 text-sm font-bold text-gray-900 leading-snug">{lesson.title}</p>
            <p className="mb-3 text-xs text-gray-400">{lesson.estimatedMinutes} min</p>
            <div className="flex gap-2">
              <button
                onClick={() => onLearn(lesson.id)}
                className="flex-1 rounded-xl py-2 text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:scale-95 transition-all"
              >
                📖 Apprendre
              </button>
              <div className="relative flex-1 group">
                <button
                  onClick={() => onQuiz(lesson.id)}
                  className={[
                    "w-full rounded-xl py-2 text-xs font-semibold transition-all active:scale-95",
                    learnDone || isBoss
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-500 hover:bg-blue-200",
                  ].join(" ")}
                >
                  {isBoss ? "🏁 Boss" : "🎯 Quiz"}
                </button>
                {!learnDone && !isBoss && (
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Commence par Apprendre
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
