import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 text-6xl">📈</div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Finance Learning</h1>
        <p className="mt-4 text-lg text-gray-600">
          Prépare tes entretiens techniques en finance. Micro-cartes, répétition espacée,
          progression gamifiée.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/tracks"
            className="rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Commencer →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          {[
            { emoji: "🃏", label: "Micro-cartes" },
            { emoji: "🔁", label: "Répétition espacée" },
            { emoji: "🏆", label: "XP & niveaux" },
          ].map(({ emoji, label }) => (
            <div key={label}>
              <div className="text-2xl">{emoji}</div>
              <p className="mt-1 text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
