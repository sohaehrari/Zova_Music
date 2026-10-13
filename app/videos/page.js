"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Afghan music");
  const [searchTerm, setSearchTerm] = useState("Afghan music");
  const [activeVideo, setActiveVideo] = useState(null);

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
    loadVideos("Afghan music");
  }, []);

  function playVideo(video) {
    setActiveVideo(video);
  }

  function closePlayer() {
    setActiveVideo(null);
  }

  return (
    <main className="min-h-screen bg-[#11110f] text-white">
      {/* Luxury Header */}
      <header className="border-b border-[#d8b96f]/20 bg-gradient-to-r from-[#292318] to-[#11110f]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.2em] text-[#e4c783]"
          >
            ZOVA <span className="text-xs text-white/60">MUSIC</span>
          </Link>

          <nav className="flex gap-5 text-sm text-white/70">
            <Link href="/search" className="hover:text-[#e4c783]">
              Search
            </Link>
            <Link href="/artists" className="hover:text-[#e4c783]">
              Artists
            </Link>
            <span className="text-[#e4c783]">Videos</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d8b96f]">
            Zova Music Cinema
          </p>

          <h1 className="mt-4 text-4xl font-light sm:text-6xl">
            Music in{" "}
            <span className="font-semibold text-[#e4c783]">
              every frame.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
            Discover music videos and performances from artists around
            the world.
          </p>

          <form
            className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              const term = query.trim() || "Afghan music";
              setSearchTerm(term);
              setActiveVideo(null);
              loadVideos(term);
            }}
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search music videos..."
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-black/30 px-5 py-3 text-sm outline-none placeholder:text-white/35 focus:border-[#d8b96f]"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#d8b96f] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#f0d99d] disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search videos"}
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* In-app video player */}
        {activeVideo && (
          <section
            className="mb-12 overflow-hidden rounded-3xl border border-[#d8b96f]/30 bg-[#1b1a17] shadow-2xl shadow-black/30"
            aria-label="Video player"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d8b96f]">
                  Now playing
                </p>
                <h2 className="mt-2 line-clamp-2 text-lg font-semibold sm:text-2xl">
                  {activeVideo.title}
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  {activeVideo.artist}
                </p>
              </div>

              <button
                type="button"
                onClick={closePlayer}
                className="shrink-0 rounded-full border border-[#d8b96f]/40 px-5 py-2.5 text-sm text-[#e4c783] transition hover:bg-[#d8b96f] hover:text-black"
              >
                ✕ Close player
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                key={activeVideo.id}
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                  activeVideo.id
                )}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <p className="px-5 py-4 text-xs leading-5 text-white/40 sm:px-6">
              Video playback is provided by YouTube and may be restricted
              for some videos.
            </p>
          </section>
        )}

        {/* Heading */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d8b96f]">
              Discover
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              {activeVideo ? "More music videos" : "Music videos"}
            </h2>
          </div>
          <p className="text-sm text-white/45">
            {videos.length} videos
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-video animate-pulse rounded-2xl bg-white/[0.06]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
            <h3 className="font-semibold text-red-200">
              Could not load videos
            </h3>
            <p className="mt-2 break-words text-sm text-white/60">
              {error}
            </p>
            <button
              type="button"
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
            {videos.map((video) => {
              const isPlaying = activeVideo?.id === video.id;

              return (
                <article key={video.id} className="group min-w-0">
                  <button
                    type="button"
                    onClick={() => playVideo(video)}
                    aria-label={`Play ${video.title} inside Zova Music`}
                    className={`relative block aspect-video w-full overflow-hidden rounded-2xl border bg-[#24231f] text-left transition ${
                      isPlaying
                        ? "border-[#d8b96f]"
                        : "border-white/10 hover:border-[#d8b96f]/60"
                    }`}
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                          isPlaying ? "opacity-50" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl text-[#d8b96f]">
                        ♫
                      </div>
                    )}

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-black/50 text-xl text-white backdrop-blur transition group-hover:scale-110 group-hover:border-[#d8b96f] group-hover:bg-[#d8b96f] group-hover:text-black">
                        {isPlaying ? "Ⅱ" : "▶"}
                      </span>
                    </span>
                  </button>

                  <h3 className="mt-4 line-clamp-2 font-medium leading-6 transition group-hover:text-[#e4c783]">
                    {video.title}
                  </h3>

                  <p className="mt-1 truncate text-sm text-white/45">
                    {video.artist}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 py-7 text-center text-xs tracking-[0.2em] text-white/35">
        ZOVA MUSIC · YOUR WORLD OF SOUND
      </footer>
    </main>
  );
}

