"use client";

import { useEffect, useState } from "react";
import { BookMarked, GraduationCap, BookOpen, Upload } from "lucide-react";
import { getContentProvider } from "@/lib/content";
import { exportContent } from "@/lib/import-export";
import type { ExportFormat, ExportScope, Track } from "@/lib/types";

interface ExportState {
  format: ExportFormat;
  scope: ExportScope;
  trackId: string;
  lessonId: string;
  csvSeparator: ";" | ",";
}

function buildFilename(state: ExportState, tracks: Track[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const ext = state.format;

  if (state.scope === "all") return `finance-learning-all-${today}.${ext}`;

  if (state.scope === "track" && state.trackId) {
    return `track-${state.trackId}-${today}.${ext}`;
  }

  if (state.scope === "lesson" && state.lessonId) {
    const track = tracks.find((t) => t.id === state.trackId);
    const lesson = track?.lessons.find((l) => l.id === state.lessonId);
    return `lesson-${lesson?.slug ?? state.lessonId}-${today}.${ext}`;
  }

  return `export-${today}.${ext}`;
}

function buildMimeType(format: ExportFormat): string {
  if (format === "json") return "application/json";
  if (format === "csv") return "text/csv;charset=utf-8";
  return "text/yaml;charset=utf-8";
}

export default function AdminExportPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const [state, setState] = useState<ExportState>({
    format: "yaml",
    scope: "all",
    trackId: "",
    lessonId: "",
    csvSeparator: ";",
  });

  useEffect(() => {
    async function load() {
      try {
        const provider = getContentProvider();
        setTracks(await provider.getAllTracks());
      } finally {
        setIsLoadingTracks(false);
      }
    }
    void load();
  }, []);

  // Reset lessonId when track changes
  function handleTrackChange(trackId: string) {
    setState((prev) => ({ ...prev, trackId, lessonId: "" }));
  }

  function handleExport() {
    setIsExporting(true);
    try {
      const content = exportContent(tracks, {
        format: state.format,
        scope: state.scope,
        trackId: state.trackId || undefined,
        lessonId: state.lessonId || undefined,
        csvSeparator: state.csvSeparator,
      });

      const filename = buildFilename(state, tracks);
      const mime = buildMimeType(state.format);

      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  }

  const selectedTrack = tracks.find((t) => t.id === state.trackId);
  const canExport =
    (state.scope === "all") ||
    (state.scope === "track" && state.trackId) ||
    (state.scope === "lesson" && state.trackId && state.lessonId);

  const previewFilename = canExport ? buildFilename(state, tracks) : "—";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Export</h1>
      <p className="text-sm text-gray-500 mb-8">
        Téléchargez le contenu au format de votre choix.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-6">
        {/* Scope */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Contenu à exporter
          </label>
          <div className="flex flex-col gap-2">
            {(
              [
                { value: "all", label: "Tout le contenu", icon: BookMarked },
                { value: "track", label: "Un track", icon: GraduationCap },
                { value: "lesson", label: "Une leçon", icon: BookOpen },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="scope"
                  value={value}
                  checked={state.scope === value}
                  onChange={() => setState((prev) => ({ ...prev, scope: value }))}
                  className="accent-blue-600"
                />
                <span className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Icon size={14} />
                  {label}
                </span>
              </label>
            ))}
          </div>

          {/* Track selector */}
          {(state.scope === "track" || state.scope === "lesson") && (
            <div className="mt-3">
              <select
                value={state.trackId}
                onChange={(e) => handleTrackChange(e.target.value)}
                disabled={isLoadingTracks}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">— Choisir un track —</option>
                {tracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.emoji} {t.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Lesson selector */}
          {state.scope === "lesson" && selectedTrack && (
            <div className="mt-2">
              <select
                value={state.lessonId}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, lessonId: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">— Choisir une leçon —</option>
                {selectedTrack.lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Format */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Format
          </label>
          <div className="flex gap-3">
            {(
              [
                { value: "yaml", label: "YAML", desc: "Humain · IA-friendly" },
                { value: "json", label: "JSON", desc: "Programmatique" },
                { value: "csv", label: "CSV", desc: "Tableur Excel" },
              ] as const
            ).map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setState((prev) => ({ ...prev, format: value }))}
                className={`flex-1 rounded-xl border px-3 py-3 text-center transition ${
                  state.format === value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <p className={`text-sm font-semibold ${state.format === value ? "text-blue-700" : "text-gray-700"}`}>
                  {label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </button>
            ))}
          </div>

          {/* CSV separator toggle */}
          {state.format === "csv" && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-gray-500">Séparateur :</span>
              {([";", ","] as const).map((sep) => (
                <label key={sep} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="csvSeparator"
                    value={sep}
                    checked={state.csvSeparator === sep}
                    onChange={() => setState((prev) => ({ ...prev, csvSeparator: sep }))}
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-mono text-gray-700">{sep}</span>
                  <span className="text-xs text-gray-400">
                    {sep === ";" ? "(défaut, FR)" : "(EN)"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Preview filename */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Fichier généré</p>
          <p className="text-sm font-mono text-gray-700">{previewFilename}</p>
        </div>

        {/* Download button */}
        <button
          onClick={handleExport}
          disabled={!canExport || isExporting}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isExporting ? "Génération…" : <><Upload size={15} className="inline mr-1.5" />Télécharger</>}
        </button>
      </div>
    </div>
  );
}
