"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Official Videos",
    "Live Performances",
    "Acoustic",
  ];

  useEffect(() => {
    async function loadVideos() {
      try {
        const response = await fetch(
          "/api/artists?q=Afghan%20music%20videos"
        );

        if (!response.ok) {
          throw new Error("Failed to load videos");
        }

        const data = await response.json();
        const results = Array.isArray(data)
          ? data
          : data.results || data.videos || [];

        const normalized = results
          .map((item) => {
            const videoId =
              typeof item.id === "object"
                ? item.id?.videoId
                : item.videoId || item.id;

            const thumbnails =
              item.snippet?.thumbnails || item.thumbnails;

            return {
              id: videoId,
              title:
                item.snippet?.title ||
                item.title ||
                item.name ||
                "Music video",
              artist:
                item.snippet?.channelTitle ||
                item.artist ||
                item.channelTitle ||
                "Music artist",
              image:
                thumbnails?.maxres?.url ||
                thumbnails?.high?.url ||
                thumbnails?.medium?.url ||
                item.thumbnail ||
                item.image ||
                "",
              category: item.category || "Official Videos",
            };
          })
          .filter((item) => item.id);

        setVideos(normalized);
      } catch (error) {
        console.error("Video loading error:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    if (category === "All") return videos;

    return videos.filter(
      (video) => video.category === category
    );
  }, [videos, category]);

  const featured = filteredVideos[0];
  const remainingVideos = filteredVideos.slice(1);

  return (
    <main className="min-h-screen bg-[#11110f] text-white">
      {/* Luxury Header */}
      <header className="relative overflow-hidden border-b border-[#c8a96a]/20 bg-gradient-to-br from-[#292318] via-[#171613] to-[#11110f]">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#c8a96a]/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="group">
            <span className="text-xl font-semibold tracking-[0.22em] text-[#e4c783] sm:text-2xl">
              ZOVA
            </span>
            <span className="ml-2 text-xs tracking-[0.2em] text-white/55">
              MUSIC
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-sm text-white/65 sm:gap-7">
            <Link href="/search" className="transition hover:text-[#e4c783]">
              Search
            </Link>
            <Link href="/artists" className="transition hover:text-[#e4c783]">
              Artists
            </Link>
            <span className="border-b border-[#d9bb79] pb-1 text-[#e4c783]">
              Videos
            </span>
          </nav>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12 lg:pb-20">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#d8b96f]">
            The visual experience
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-light leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Music in
            <span className="block font-semibold text-[#e2c47f]">
              every frame.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Discover unforgettable performances, official videos,
            and the artists behind the music.
          </p>

          <a
            href="#video-collection"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#d7b96f]/60 bg-[#d7b96f] px-6 py-3 text-sm font-semibold text-[#19160f] transition hover:bg-[#f0d99d]"
          >
            Explore videos <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Category filters */}
        <section className="py-8 sm:py-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs transition sm:px-5 sm:text-sm ${
                  category === item
                    ? "border-[#d8b96f] bg-[#d8b96f] text-[#17140d]"
                    : "border-white/10 bg-white/[0.03] text-white/65 hover:border-[#d8b96f]/50 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Featured video */}
        {loading ? (
          <div className="aspect-video animate-pulse rounded-3xl bg-white/[0.06]" />
        ) : featured ? (
          <section className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#1b1a17] lg:grid-cols-[1.4fr_1fr]">
            <a
              href={`https://www.youtube.com/watch?v=${featured.id}`}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-video overflow-hidden bg-black lg:aspect-auto lg:min-h-[390px]"
            >
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-64 items-center justify-center text-6xl text-[#d8b96f]">
                  ♫
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

              <span className="absolute left-5 top-5 rounded-full border border-[#e4c783]/50 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#f0d99d] backdrop-blur">
                Featured video
              </span>

              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/40 text-xl transition group-hover:scale-110 group-hover:bg-[#d8b96f] group-hover:text-black">
                ▶
              </span>
            </a>

            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d8b96f]">
                Featured selection
              </p>

              <h2 className="mt-5 text-2xl font-semibold leading-snug sm:text-3xl">
                {featured.title}
              </h2>

              <p className="mt-3 text-sm text-white/50">
                {featured.artist}
              </p>

              <p className="mt-6 text-sm leading-7 text-white/45">
                Experience the performance and discover more music
                from your favorite artists.
              </p>

              <a
                href={`https://www.youtube.com/watch?v=${featured.id}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#d8b96f] px-6 py-3 text-sm font-semibold text-[#17140d] transition hover:bg-[#f0d99d]"
              >
                Watch now <span>↗</span>
              </a>
            </div>
          </section>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-16 text-center">
            <p className="text-4xl text-[#d8b96f]">♫</p>
            <h2 className="mt-4 text-xl font-semibold">
              No videos available
            </h2>
            <p className="mt-2 text-sm text-white/45">
              Check your video API connection.
            </p>
          </div>
        )}

        {/* Collection */}
        <section id="video-collection" className="py-12 sm:py-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#d8b96f]">
                Curated for you
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Explore the collection
              </h2>
            </div>
            <span className="text-xs text-white/40 sm:text-sm">
              {filteredVideos.length} videos
            </span>
          </div>

          {!loading && remainingVideos.length > 0 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {remainingVideos.map((video) => (
                <article key={video.id} className="group min-w-0">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#24231f]"
                  >
                    {video.image ? (
                      <img
                        src={video.image}
                        alt={video.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl text-[#d8b96f]">
                        ♫
                      </div>
                    )}

                    <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-1.5 text-xs text-white">
                      ▶ Watch
                    </span>
                  </a>

                  <div className="mt-4 flex items-start gap-3">
                    <span className="mt-0.5 text-lg text-[#d8b96f]">
                      ♫
                    </span>
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-medium leading-6 text-white transition group-hover:text-[#e2c47f]">
                        {video.title}
                      </h3>
                      <p className="mt-1 truncate text-sm text-white/45">
                        {video.artist}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredVideos.length === 1 && (
            <p className="mt-6 text-sm text-white/45">
              More videos will appear here when the API returns additional results.
            </p>
          )}
        </section>

        <footer className="border-t border-white/10 py-7 text-center text-xs tracking-[0.2em] text-white/35">
          ZOVA MUSIC · YOUR WORLD OF SOUND
        </footer>
      </div>
    </main>
  );
}

