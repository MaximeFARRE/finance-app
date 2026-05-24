"use client";

import { useState } from "react";
import { getCardTheme } from "@/lib/card-themes";
import type { ImportResult } from "@/lib/types";

interface Props {
  result: ImportResult;
}

const DIFFICULTY_LABEL: Record<number, string> = { 1: "Facile", 2: "Moyen", 3: "Difficile" };

export function ImportDiff({ result }: Props) {
  const [unchangedOpen, setUnchangedOpen] = useState(false);

  const total =
    result.added.length +
    result.modified.length +
    result.unchanged.length +
    result.errors.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Summary bar */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3">
        <Pill count={result.added.length} label="nouvelles" color="green" />
        <Pill count={result.modified.length} label="modifiées" color="orange" />
        <Pill count={result.unchanged.length} label="identiques" color="gray" />
        {result.errors.length > 0 && (
          <Pill count={result.errors.length} label="erreurs" color="red" />
        )}
        <span className="ml-auto text-xs text-gray-400 self-center">
          {total} carte{total > 1 ? "s" : ""} au total
        </span>
      </div>

      {/* Errors */}
      {result.errors.length > 0 && (
        <Section title="Erreurs" icon="🚫" colorClass="border-red-300 bg-red-50">
          <ul className="flex flex-col gap-1">
            {result.errors.map((err, i) => (
              <li key={i} className="text-xs text-red-700">
                {err.line ? (
                  <span className="font-semibold mr-1">Ligne {err.line} :</span>
                ) : null}
                {err.message}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Added cards */}
      {result.added.length > 0 && (
        <Section title={`${result.added.length} nouvelle${result.added.length > 1 ? "s" : ""} carte${result.added.length > 1 ? "s" : ""}`} icon="✅" colorClass="border-emerald-300 bg-emerald-50">
          <div className="flex flex-col gap-2">
            {result.added.map(({ card }) => {
              const theme = getCardTheme(card.type);
              return (
                <div key={card.id} className="rounded-xl border border-gray-200 bg-white p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}>
                      {theme.icon} {theme.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {DIFFICULTY_LABEL[card.difficulty] ?? card.difficulty}
                    </span>
                    {card.tags.length > 0 && (
                      <span className="text-xs text-gray-400">· {card.tags.join(", ")}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{card.front}</p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Modified cards */}
      {result.modified.length > 0 && (
        <Section title={`${result.modified.length} carte${result.modified.length > 1 ? "s" : ""} modifiée${result.modified.length > 1 ? "s" : ""}`} icon="✏️" colorClass="border-amber-300 bg-amber-50">
          <div className="flex flex-col gap-3">
            {result.modified.map(({ before, after }) => (
              <div key={after.id} className="rounded-xl border border-gray-200 bg-white p-3">
                <p className="text-xs text-gray-400 mb-2 font-mono">{after.id}</p>
                <div className="grid grid-cols-2 gap-2">
                  <DiffField label="Avant" text={before.front} faint />
                  <DiffField label="Après" text={after.front} />
                </div>
                {before.back !== after.back && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <DiffField label="Back avant" text={before.back} faint />
                    <DiffField label="Back après" text={after.back} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Unchanged cards (collapsed by default) */}
      {result.unchanged.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <button
            onClick={() => setUnchangedOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-400">⚪</span>
            <span className="text-sm font-medium text-gray-600">
              {result.unchanged.length} carte{result.unchanged.length > 1 ? "s" : ""} identique{result.unchanged.length > 1 ? "s" : ""} (inchangées)
            </span>
            <span className="ml-auto text-xs text-gray-400">{unchangedOpen ? "▲" : "▼"}</span>
          </button>
          {unchangedOpen && (
            <div className="border-t border-gray-100 px-4 py-3 flex flex-col gap-1.5">
              {result.unchanged.map((card) => (
                <p key={card.id} className="text-xs text-gray-500 truncate">
                  {card.front}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Pill({
  count,
  label,
  color,
}: {
  count: number;
  label: string;
  color: "green" | "orange" | "gray" | "red";
}) {
  const cls = {
    green: "bg-emerald-100 text-emerald-700",
    orange: "bg-amber-100 text-amber-700",
    gray: "bg-gray-100 text-gray-600",
    red: "bg-red-100 text-red-700",
  }[color];

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      {count} {label}
    </span>
  );
}

function Section({
  title,
  icon,
  colorClass,
  children,
}: {
  title: string;
  icon: string;
  colorClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-4 ${colorClass}`}>
      <p className="text-sm font-semibold text-gray-700 mb-3">
        {icon} {title}
      </p>
      {children}
    </div>
  );
}

function DiffField({
  label,
  text,
  faint,
}: {
  label: string;
  text: string;
  faint?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p
        className={`text-xs leading-relaxed line-clamp-3 ${
          faint ? "text-gray-400 line-through" : "text-gray-800"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
