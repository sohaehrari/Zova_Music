
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const artists = {
  "aryana-sayeed": {
    name: "Aryana Sayeed",
    initials: "AS",
    genre: "Afghan Pop",
    bio: "Explore music videos and performances associated with Aryana Sayeed.",
    tone: "from-rose-200 via-amber-100 to-orange-200",
  },
  "farhad-darya": {
    name: "Farhad Darya",
    initials: "FD",
    genre: "Pop · World Music",
    bio: "Discover songs, performances, and music videos associated with Farhad Darya.",
    tone: "from-amber-200 via-yellow-100 to-stone-200",
  },
  hangama: {
    name: "Hangama",
    initials: "H",
    genre: "Classic Afghan Music",
    bio: "Explore classic songs and performances associated with Hangama.",
    tone: "from-purple-200 via-rose-100 to-amber-100",
  },
  "jawid-sharif": {
    name: "Jawid Sharif",
    initials: "JS",
    genre: "Afghan Pop",
    bio: "Discover music videos and performances associated with Jawid Sharif.",
    tone: "from-sky-200 via-stone-100 to-amber-200",
  },
  "qais-ul-ansari": {
    name: "Qais Ulfat",
    initials: "QU",
    genre: "Afghan Pop",
    bio: "Explore songs and music videos associated with Qais Ulfat.",
    tone: "from-emerald-200 via-amber-100 to-stone-200",
  },
  "nasrat-parsa": {
    name: "Nasrat Parsa",
    initials: "NP",
    genre: "Classic Afghan Pop",
    bio: "Discover songs and performances associated with Nasrat Parsa.",
    tone: "from-indigo-200 via-violet-100 to-amber-100",
  },
};

export default function ArtistDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const artist = artists[id];

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (!artist) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadArtistVideos() {
      setLoading(true);
      setError("");
      setActiveVideo(null);

      try {
        const search = `${artist.name} Afghan music`;
        const response = await fetch(
          `/api/videos?q=${encodeURIComponent(search)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load artist videos.");
        }

        setVideos(Array.isArray(data.videos) ? data.videos : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
          setVideos([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadArtistVideos();

    return () => controller.abort();
  }, [artist]);

  if (!artist) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5 text-[#24231f]">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a47c28]">
            Zova Music
          </p>
          <h1 className="mt-4 text-3xl font-semibold">Artist not found</h1>
          <p className="mt-3 text-sm leading-6 text-[#77736a]">
            This artist page is not available. Return to the artist collection
            and choose an artist from the list.
          </p>
          <Link
            href="/artists"
            className="mt-6 inline-flex rounded-full bg-[#b18b38] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#967128]"
          >
            Browse artists
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#24231f]">
      <header className="border-b border-[#b99a53]/20 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-[0.2em]">
            ZOVA <span className="text-[#b18b38]">MUSIC</span>
          </Link>

          <nav className="flex gap-5 text-sm text-[#77736a]">
            <Link href="/search" className="hover:text-[#a47c28]">
              Search
            </Link>
            <Link
              href="/artists"
              className="font-semibold text-[#a47c28]"
            >
              Artists
            </Link>
            <Link href="/videos" className="hover:text-[#a47c28]">
              Videos
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#b99a53]/20 bg-gradient-to-br from-white via-[#f8f2e5] to-[#eee2c8]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1fr_0.75fr]">
          <div>
            <Link
              href="/artists"
              className="text-sm text-[#8b7650] transition hover:text-[#a47c28]"
            >
              ← All artists
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#a47c28]">
              Artist profile
            </p>

            <h1 className="mt-4 text-4xl font-light leading-tight sm:text-6xl">
              {artist.name}
            </h1>

            <p className="mt-4 text-sm font-medium uppercase tracking-[0.15em] text-[#a47c28]">
              {artist.genre}
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#77736a] sm:text-base">
              {artist.bio}
            </p>

            <a
              href="#artist-videos"
              className="mt-7 inline-flex rounded-full bg-[#b18b38] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#967128]"
            >
              Explore music videos ↓
            </a>
          </div>

          <div
            className={`relative flex aspect-square w-full max-w-sm items-center justify-center justify-self-center overflow-hidden rounded-[2rem] bg-gradient-to-br ${artist.tone}`}
          >
            <div className="absolute inset-5 rounded-[40%] border border-white/60" />
            <div className="absolute inset-10 rounded-[40%] border border-white/50" />
            <span className="relative font-serif text-8xl text-[#4d3b1b]/75 sm:text-9xl">
              {artist.initials}
            </span>
            <span className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/65 p-4 text-center text-xs uppercase tracking-[0.2em] text-[#6d5525] backdrop-blur">
              The sound of {artist.name}
            </span>
          </div>
        </div>
      </section>

      <section
        id="artist-videos"
        className="mx-auto max-w-7xl scroll-mt-6 px-5 py-12 sm:px-8 sm:py-16"
      >
        {activeVideo && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-[#b99a53]/30 bg-white shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c28]">
                  Now playing
                </p>
                <h2 className="mt-2 text-lg font-semibold sm:text-xl">
                  {activeVideo.title}
                </h2>
                <p className="mt-1 text-sm text-[#77736a]">
                  {activeVideo.artist}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="rounded-full border border-[#b99a53]/40 px-5 py-2 text-sm text-[#8d6a25] hover:bg-[#f8f2e5]"
              >
                Close player ✕
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
        )}

        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a47c28]">
              Watch and discover
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Music videos
            </h2>
            <p className="mt-2 text-sm text-[#817c72]">
              Videos found for {artist.name}
            </p>
          </div>

          <span className="text-sm text-[#8b867c]">
            {videos.length} videos
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-video animate-pulse rounded-2xl bg-[#eae5da]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-white p-6">
            <h3 className="font-semibold text-red-700">
              Could not load videos
            </h3>
            <p className="mt-2 break-words text-sm text-[#77736a]">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full border border-[#b99a53]/50 px-5 py-2 text-sm text-[#8d6a25]"
            >
              Try again
            </button>
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-3xl border border-[#b99a53]/20 bg-white p-8 text-center">
            <p className="font-medium">No videos found for this artist.</p>
            <p className="mt-2 text-sm text-[#817c72]">
              Try again later or check your YouTube API configuration.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              const isPlaying = activeVideo?.id === video.id;

              return (
                <article key={video.id} className="group min-w-0">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    aria-label={`Play ${video.title}`}
                    className={`relative block aspect-video w-full overflow-hidden rounded-2xl border bg-[#eee8dc] text-left ${
                      isPlaying
                        ? "border-[#b18b38]"
                        : "border-[#b99a53]/20 hover:border-[#b18b38]"
                    }`}
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                          isPlaying ? "opacity-60" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl text-[#a47c28]">
                        ♫
                      </div>
                    )}

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-black/55 text-xl text-white backdrop-blur transition group-hover:bg-[#b18b38]">
                        {isPlaying ? "Ⅱ" : "▶"}
                      </span>
                    </span>
                  </button>

                  <h3 className="mt-4 line-clamp-2 font-semibold leading-6 transition group-hover:text-[#a47c28]">
                    {video.title}
                  </h3>
                  <p className="mt-1 truncate text-sm text-[#817c72]">
                    {video.artist}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-[#b99a53]/20 bg-white px-5 py-7 text-center text-xs tracking-[0.2em] text-[#999184]">
        ZOVA MUSIC · YOUR WORLD OF SOUND
      </footer>
    </main>
  );
}

