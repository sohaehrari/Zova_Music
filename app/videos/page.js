"use client"





import { useEffect, useState } from "react";
import Link from "next/link";
import LibraryActions from "@/components/libraryActions";


export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Afghan music");
  const [searchTerm, setSearchTerm] = useState("Afghan music");
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVideos() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/videos?q=${encodeURIComponent(searchTerm)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load videos.");
        }

        setVideos(Array.isArray(data.videos) ? data.videos : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadVideos();

    return () => controller.abort();
  }, [searchTerm]);

  function handleSearch(event) {
    event.preventDefault();

    const cleanQuery = query.trim();

    if (!cleanQuery) return;

    setActiveVideo(null);
    setSearchTerm(cleanQuery);
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#29271f]">
      {/* Luxury header */}
      <header className="sticky top-0 z-40 border-b border-[#c5a45b]/25 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="shrink-0 text-xl font-bold tracking-[0.2em]">
            ZOVA <span className="text-[#b18b38]">MUSIC</span>
          </Link>

          
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#c5a45b]/20 bg-gradient-to-br from-white via-[#fbf5e8] to-[#eee0bd]">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a47c28]">
            The world of Afghan music
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-light leading-tight sm:text-6xl">
            Music that moves
            <span className="block font-serif italic text-[#a47c28]">
              your soul.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Discover Afghan artists, live performances, classic songs
            and music videos — all in one place.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search artist, song or music..."
              aria-label="Search music videos"
              className="min-w-0 flex-1 rounded-full border border-[#c5a45b]/40 bg-white/90 px-5 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#b18b38] focus:ring-4 focus:ring-amber-100"
            />

            <button
              type="submit"
              className="rounded-full bg-[#b18b38] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#967128]"
            >
              Discover videos
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Farhad Darya", "Hangama", "Jawid Sharif", "Qais Ulfat"].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setQuery(name);
                  setActiveVideo(null);
                  setSearchTerm(name);
                }}
                className="rounded-full border border-[#b18b38]/30 bg-white/60 px-4 py-2 text-xs text-stone-700 transition hover:border-[#b18b38] hover:bg-white"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video player */}
      {activeVideo && (
        <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#c5a45b]/30 bg-white shadow-xl">
            <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c28]">
                  Now playing in Zova
                </p>
                <h2 className="mt-2 line-clamp-2 font-semibold sm:text-lg">
                  {activeVideo.title}
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  {activeVideo.artist || "Afghan Music"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="shrink-0 rounded-full border border-amber-200 px-4 py-2 text-sm text-stone-600 hover:bg-amber-50"
              >
                Close ×
              </button>
            </div>

            <div className="aspect-video bg-black">
              <iframe
                key={activeVideo.id}
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(activeVideo.id)}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Videos */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c28]">
              Curated for you
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Explore music videos
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Results for “{searchTerm}”
            </p>
          </div>

          {!loading && !error && (
            <span className="rounded-full border border-amber-200 bg-white px-4 py-2 text-xs text-stone-600">
              {videos.length} videos
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-video rounded-2xl bg-[#e9e2d3]" />
                <div className="mt-4 h-4 w-4/5 rounded bg-[#e9e2d3]" />
                <div className="mt-2 h-3 w-2/5 rounded bg-[#e9e2d3]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-white p-7">
            <h3 className="font-semibold text-red-700">
              Could not load videos
            </h3>
            <p className="mt-2 break-words text-sm text-stone-600">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm(query.trim() || "Afghan music")}
              className="mt-5 rounded-full bg-[#b18b38] px-5 py-3 text-sm font-medium text-white hover:bg-[#967128]"
            >
              Try again
            </button>
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-amber-300 bg-white px-6 py-14 text-center">
            <p className="text-3xl text-[#b18b38]">♫</p>
            <h3 className="mt-4 text-xl font-semibold">
              No videos found
            </h3>
            <p className="mt-2 text-sm text-stone-500">
              Try another artist or search phrase.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article key={video.id} className="group min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveVideo(video);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  aria-label={`Play ${video.title}`}
                  className="relative block aspect-video w-full overflow-hidden rounded-2xl border border-[#c5a45b]/20 bg-[#eee5d2] text-left"
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl text-[#b18b38]">
                      ♫
                    </div>
                  )}

                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/15">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-black/50 text-xl text-white backdrop-blur transition group-hover:bg-[#b18b38]">
                      ▶
                    </span>
                  </span>
                </button>

                <div className="mt-4">
                  <h3 className="line-clamp-2 font-semibold leading-6 transition group-hover:text-[#a47c28]">
                    {video.title}
                  </h3>

                  <p className="mt-1 truncate text-sm text-stone-500">
                    {video.artist || "Afghan Music"}
                  </p>

                  <LibraryActions
                    item={{
                      id: video.id,
                      title: video.title,
                      artist: video.artist || "Afghan Music",
                      thumbnail: video.thumbnail,
                      url: video.url,
                      type: "video",
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-[#c5a45b]/20 bg-white px-5 py-8 text-center">
        <p className="text-sm font-semibold tracking-[0.2em]">
          ZOVA <span className="text-[#b18b38]">MUSIC</span>
        </p>
        <p className="mt-2 text-xs text-stone-400">
          Your world of sound.
        </p>
      </footer>
    </main>
  );
}

