

"use client";

import { useState } from "react";
import Link from "next/link";

const artists = [
  {
    id: "aryana-sayeed",
    name: "Aryana Sayeed",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "farhad-darya",
    name: "Farhad Darya",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hangama",
    name: "Hangama",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "jawid-sharif",
    name: "Jawid Sharif",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "qais-ul-ansari",
    name: "Qais Ulfat",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "nasrat-parsa",
    name: "Nasrat Parsa",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ArtistsPage() {
  const [search, setSearch] = useState("");

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
            Zova Music
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Afghan Artists
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Discover talented Afghan artists and explore their music.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12 max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search artists..."
            className="w-full rounded-2xl border border-amber-500/20 bg-white px-5 py-4 pr-12 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          />

          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-amber-500">
            ⌕
          </span>
        </div>

        {/* Artists */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {filteredArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-amber-200 group-hover:shadow-xl">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h2 className="truncate font-semibold text-gray-900 transition group-hover:text-amber-600">
                      {artist.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Afghan Artist
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-4xl text-amber-400">♪</div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              No artists found
            </h2>

            <p className="mt-2 text-gray-500">
              Try searching for another artist.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

