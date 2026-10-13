"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Afghan music");
  const [searchTerm, setSearchTerm] = useState("Afghan music");

  async function loadVideos(search) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/videos?q=${encodeURIComponent(search)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load videos");
      }

      setVideos(data.videos || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVideos(searchTerm);
  }, []);

  return (
    <main className="min-h-screen bg-[#11110f] text-white">
      <header className="border-b border-[#d8b96f]/20 bg-gradient-to-r from-[#292318] to-[#11110f]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <Link href="/" className="text-xl font-semibold tracking-[0.2em] text-[#e4c783]">
            ZOVA <span className="text-xs text-white/60">MUSIC</span>
          </Link>

          <nav className="flex gap-5 text-sm text-white/70">
            <Link href="/search" className="hover:text-[#e4c783]">Search</Link>
            <Link href="/artists" className="hover:text-[#e4c783]">Artists</Link>
            <span className="text-[#e4c783]">Videos</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d8b96f]">
            Zova Music Cinema
          </p>
          <h1 className="mt-4 text-4xl font-light sm:text-6xl">
            Music in <span className="font-semibold text-[#e4c783]">every frame.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
            Discover music videos and performances from artists around the world.
          </p>

          <form
            className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setSearchTerm(query.trim() || "Afghan music");
              loadVideos(query.trim() || "Afghan music");
            }}
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Afghan music videos..."
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-black/30 px-5 py-3 text-sm outline-none placeholder:text-white/35 focus:border-[#d8b96f]"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#d8b96f] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#f0d99d] disabled:opacity-50"
            >
              Search videos
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d8b96f]">
              Discover
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Music videos
            </h2>
          </div>
          <p className="text-sm text-white/45">{videos.length} videos</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="aspect-video animate-pulse rounded-2xl bg-white/[0.06]" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
            <h3 className="font-semibold text-red-200">Could not load videos</h3>
            <p className="mt-2 break-words text-sm text-white/60">{error}</p>
            <button
              onClick={() => loadVideos(searchTerm)}
              className="mt-4 rounded-full border border-[#d8b96f]/50 px-5 py-2 text-sm text-[#e4c783]"
            >
              Try again
            </button>
          </div>
        ) : videos.length === 0 ? (
          <p className="rounded-2xl border border-white/10 p-8 text-center text-white/55">
            No videos found. Try another search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article key={video.id} className="group min-w-0">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#24231f]"
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl text-[#d8b96f]">♫</div>
                  )}

                  <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-2 text-xs">
                    ▶ Watch
                  </span>
                </a>

                <h3 className="mt-4 line-clamp-2 font-medium leading-6 group-hover:text-[#e4c783]">
                  {video.title}
                </h3>
                <p className="mt-1 truncate text-sm text-white/45">
                  {video.artist}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

