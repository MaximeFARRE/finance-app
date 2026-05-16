import Link from "next/link";
import { allTracks } from "@/content";

export const metadata = { title: "Parcours — Finance Learning" };

export default function TracksPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Accueil
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Choisissez votre parcours</h1>
          <p className="mt-2 text-gray-600">
            Chaque parcours couvre un domaine de la finance. Progressez à votre rythme.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {allTracks.map((track) => (
            <Link
              key={track.id}
              href={`/tracks/${track.id}`}
              className="block rounded-2xl border-2 border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{track.emoji}</span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{track.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">{track.description}</p>
                  <p className="mt-2 text-xs font-medium text-blue-600">
                    {track.lessons.length} leçons
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
