"use client";

import { useEffect, useState } from "react";

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query?.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const searchMusic = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Failed to search music");
        }

        const data = await response.json();

        setResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchMusic();
  }, [query]);

  if (loading) {
    return (
      <div className="mt-12 text-center text-gray-500">
        Searching for music...
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="mt-12 text-center text-gray-500">
        No music found.
      </div>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-500">
          Results
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Music Results
        </h2>
      </div>

      <div className="grid gap-4">
        {results.map((song) => (
          <div
            key={song.id}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-amber-200 hover:shadow-lg"
          >
            {/* Song Image */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-amber-50">
              {song.image ? (
                <img
                  src={song.image}
                  alt={song.title || "Song"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl text-amber-500">
                  ♪
                </div>
              )}
            </div>

            {/* Song Information */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-gray-900">
                {song.title}
              </h3>

              <p className="mt-1 truncate text-sm text-gray-400">
                {song.artist}
              </p>
            </div>

            {/* YouTube Button */}
            <a
              href={`/videos/${song.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white"
              aria-label={`Play ${song.title}`}
            >
              ▶
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}