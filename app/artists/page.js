
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ArtistsPage() {
  const [query, setQuery] = useState("Afghan singers");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchArtists = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setArtists([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/artists?q=${encodeURIComponent(searchQuery)}`
      );

      const data = await response.json();

      setArtists(data.results || []);
    } catch (error) {
      console.error("Artist search error:", error);
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchArtists("Afghan singers");
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    searchArtists(query);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
            Zova Music
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Artists
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Discover artists and explore their music.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mb-12 flex max-w-3xl gap-3"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search artists..."
            className="flex-1 rounded-2xl border border-amber-500/20 bg-white px-5 py-4 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          />

          <button
            type="submit"
            className="rounded-2xl bg-amber-500 px-6 py-4 font-semibold text-white transition hover:bg-amber-600"
          >
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-gray-500">
            Finding artists...
          </div>
        )}

        {/* Artists */}
        {!loading && artists.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-amber-200 group-hover:shadow-xl">
                  <div className="aspect-square overflow-hidden bg-amber-50">
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
                      Artist
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && artists.length === 0 && (
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
