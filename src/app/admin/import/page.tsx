"use client";

import { useRef, useState } from "react";
import { getContentProvider } from "@/lib/content";
import { analyzeImport, applyImport, type ImportFormat } from "@/lib/import-export";
import { ImportDiff } from "@/components/admin/ImportDiff";
import type { ImportResult } from "@/lib/types";
import type { NormalizedFullImport, NormalizedQuickImport } from "@/lib/import-export";

type Step = "idle" | "analyzing" | "preview" | "applying" | "done" | "error";

function detectFormat(fileName: string): ImportFormat | null {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "yaml" || ext === "yml") return "yaml";
  if (ext === "json") return "json";
  if (ext === "csv") return "csv";
  return null;
}

export default function AdminImportPage() {
  const [step, setStep] = useState<Step>("idle");
  const [fileName, setFileName] = useState("");
  const [diff, setDiff] = useState<ImportResult | null>(null);
  const [normalized, setNormalized] = useState<
    NormalizedFullImport | NormalizedQuickImport | null
  >(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    const fmt = detectFormat(file.name);
    if (!fmt) {
      setErrors([
        `Format non reconnu pour « ${file.name} ». Utilisez .yaml, .yml, .json ou .csv`,
      ]);
      setStep("error");
      return;
    }

    setFileName(file.name);
    setStep("analyzing");
    setErrors([]);

    try {
      const text = await file.text();
      const provider = getContentProvider();
      const result = await analyzeImport(text, fmt, provider);

      if (result.errors.length > 0) {
        setErrors(result.errors);
        setStep("error");
        return;
      }

      setDiff(result.diff);
      setNormalized(result.normalized);
      setStep("preview");
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "Erreur inconnue"]);
      setStep("error");
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) void processFile(file);
  }

  async function handleApply() {
    if (!diff || !normalized) return;
    setStep("applying");
    try {
      const provider = getContentProvider();
      await applyImport(diff, normalized, provider, `import:${fileName}`);
      setStep("done");
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "Erreur lors de l'import"]);
      setStep("error");
    }
  }

  function reset() {
    setStep("idle");
    setDiff(null);
    setNormalized(null);
    setErrors([]);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const totalChanges = diff
    ? diff.added.length + diff.modified.length
    : 0;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Import</h1>
      <p className="text-sm text-gray-500 mb-8">
        Importez des cartes depuis un fichier YAML, JSON ou CSV.
      </p>

      {/* Upload zone */}
      {(step === "idle" || step === "error") && (
        <div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-white hover:border-blue-300 hover:bg-gray-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".yaml,.yml,.json,.csv"
            onChange={handleFileInput}
            className="hidden"
          />
          <p className="text-4xl mb-3">📥</p>
          <p className="text-sm font-semibold text-gray-700">
            Glissez un fichier ici ou cliquez pour sélectionner
          </p>
          <p className="mt-1 text-xs text-gray-400">Formats acceptés : .yaml · .yml · .json · .csv</p>

          {/* Error message */}
          {step === "error" && errors.length > 0 && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-left">
              {errors.map((err, i) => (
                <p key={i} className="text-xs text-red-700">{err}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Analyzing */}
      {step === "analyzing" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-4xl mb-3 animate-pulse">🔍</p>
          <p className="text-sm text-gray-500">Analyse de {fileName}…</p>
        </div>
      )}

      {/* Preview diff */}
      {step === "preview" && diff && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">{fileName}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {totalChanges > 0
                  ? `${totalChanges} modification${totalChanges > 1 ? "s" : ""} à appliquer`
                  : "Aucune modification à appliquer"}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
            >
              Changer de fichier
            </button>
          </div>

          <ImportDiff result={diff} />

          {/* Actions */}
          <div className="flex gap-3">
            {totalChanges > 0 ? (
              <button
                onClick={() => void handleApply()}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Importer ({totalChanges} modification{totalChanges > 1 ? "s" : ""})
              </button>
            ) : (
              <span className="text-sm text-gray-400 self-center">
                Le contenu est déjà à jour.
              </span>
            )}
            <button
              onClick={reset}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Applying */}
      {step === "applying" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-4xl mb-3 animate-pulse">💾</p>
          <p className="text-sm text-gray-500">Import en cours…</p>
        </div>
      )}

      {/* Done */}
      {step === "done" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-sm font-semibold text-emerald-700">Import réussi !</p>
          <p className="text-xs text-emerald-600 mt-1">
            {totalChanges} carte{totalChanges > 1 ? "s" : ""} importée{totalChanges > 1 ? "s" : ""} depuis {fileName}
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-xl border border-emerald-300 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            Importer un autre fichier
          </button>
        </div>
      )}
    </div>
  );
}
