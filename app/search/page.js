

"use client";

import { useState } from "react";
import SearchResults from "@/components/search/SearchResults";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
            Zova Music
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Search Music
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Find songs, artists, and music videos from Afghan music.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-3xl">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a song or artist..."
            className="w-full rounded-2xl border border-amber-500/20 bg-white px-5 py-4 pr-14 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          />

          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-amber-500">
            ⌕
          </span>
        </div>

        {/* Search Status */}
        {query && (
          <div className="mt-10">
            <p className="text-sm text-gray-400">
              Searching for:
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-gray-900">
              {query}
            </h2>
          </div>
        )}
{query &&<SearchResults   query={query}/>}
        {/* Empty State */}
        {!query && (
          <div className="mt-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-3xl text-amber-500">
              ♪
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Search for music
            </h2>

            <p className="mt-2 text-gray-500">
              Enter a song or artist name to discover music.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
