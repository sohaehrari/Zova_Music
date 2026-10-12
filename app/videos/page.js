
"use client";

import { useEffect, useState } from "react"; import Link from "next/link";

export default function VideosPage() { const [videos, setVideos] = useState([]); const [loading, setLoading] = useState(true); const [category, setCategory] = useState("All");

const categories = [ "All", "Official Videos", "Live Performances", "Acoustic", ];

useEffect(() => { async function loadVideos() { try { setLoading(true);

    const response = await fetch(
      "/api/artists?q=Afghan music videos"
    );

    if (!response.ok) {
      throw new Error("Could not load videos");
    }

    const data = await response.json();

    const results = Array.isArray(data)
      ? data
      : data.results || data.videos || [];

    setVideos(
      results.map((item) => ({
        id: item.id?.videoId || item.id,
        title: item.title || item.name || "Music video",
        artist:
          item.artist ||
          item.channelTitle ||
          item.channelTitle ||
          "Unknown artist",
        image:
          item.thumbnail ||
          item.image ||
          item.thumbnails?.high?.url ||
          item.thumbnails?.medium?.url ||
          "",
        videoId: item.id?.videoId || item.videoId || item.id,
      }))
    );
  } catch (error) {
    console.error("Videos loading error:", error);
    setVideos([]);
  } finally {
    setLoading(false);
  }
}

loadVideos();
}, []);

const featured = videos[0]; const remainingVideos = videos.slice(1);

return (
<main>
    {/* Header */}
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d6b46a]">
          ZOVA MUSIC
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Music Cinema
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
          Discover performances, official music videos, and sounds
          worth watching.
        </p>
      </div>

      <Link
        href="/search"
        className="rounded-full border border-[#d6b46a]/40 px-5 py-3 text-sm text-[#e7cc8d] transition hover:bg-[#d6b46a] hover:text-black"
      >
        Search music ↗
      </Link>
    </header>

    {/* Categories */}
    <nav className="flex gap-3 overflow-x-auto py-7">
      {categories.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setCategory(item)}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm transition ${
            category === item
              ? "bg-[#d6b46a] font-semibold text-black"
              : "border border-white/10 bg-white/[0.03] text-white/65 hover:border-[#d6b46a]/50 hover:text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </nav>

    {/* Featured Video */}
    {featured && (
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1b1b1b]">
        <div className="grid md:grid-cols-[1.35fr_1fr]">
          <div className="relative aspect-video overflow-hidden bg-[#242424] md:aspect-auto md:min-h-[360px]">
            {featured.image && (
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <a
              href={
                featured.videoId
                  ? `https://www.youtube.com/watch?v=${featured.videoId}`
                  : "https://www.youtube.com"
              }
              target="_blank"
              rel="noreferrer"
              aria-label={`Watch ${featured.title}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/35 text-2xl text-white backdrop-blur transition hover:scale-110 hover:border-[#d6b46a]">
                ▶
              </span>
            </a>

            <div className="absolute bottom-5 left-5">
              <span className="rounded-full bg-[#d6b46a] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                Featured
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b46a]">
              Editor's selection
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
              {featured.title}
            </h2>

            <p className="mt-3 text-white/55">
              {featured.artist}
            </p>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
              Explore music performances and discover artists through
              their videos.
            </p>

            <a
              href={
                featured.videoId
                  ? `https://www.youtube.com/watch?v=${featured.videoId}`
                  : "https://www.youtube.com"
              }
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#d6b46a] px-6 py-3 font-semibold text-black transition hover:bg-[#ead39b]"
            >
              Watch video <span>↗</span>
            </a>
          </div>
        </div>
      </section>
    )}

    {/* Video Collection */}
    <section className="pb-16 pt-12">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#d6b46a]">
            The collection
          </p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Discover videos
          </h2>
        </div>
        <span className="text-sm text-white/40">
          {videos.length} videos
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="aspect-video animate-pulse rounded-2xl bg-white/[0.06]"
            />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <p className="text-4xl text-[#d6b46a]">♫</p>
          <h3 className="mt-4 text-xl font-semibold">
            No videos available
          </h3>
          <p className="mt-2 text-sm text-white/45">
            Check the video API connection and try again.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {remainingVideos.map((video, index) => (
            <article key={video.id || index} className="group">
              <a
                href={
                  video.videoId
                    ? `https://www.youtube.com/watch?v=${video.videoId}`
                    : "https://www.youtube.com"
                }
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-video overflow-hidden rounded-2xl bg-[#222] ring-1 ring-white/10"
              >
                {video.image ? (
                  <img
                    src={video.image}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl text-[#d6b46a]">
                    ♫
                  </div>
                )}

                <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-3 py-1.5 text-xs">
                  ▶ Watch
                </span>
              </a>

              <div className="mt-4 flex gap-3">
                <span className="mt-0.5 text-lg text-[#d6b46a]">
                  ♫
                </span>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-medium leading-6 text-white transition group-hover:text-[#e5c77d]">
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
    </section>

    {/* Footer */}
    <footer className="border-t border-white/10 py-6 text-center text-xs tracking-wider text-white/35">
      ZOVA MUSIC · DISCOVER YOUR NEXT FAVORITE
    </footer>
</main>

)
}

