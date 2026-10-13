
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const artists = [
  {
    id: "aryana-sayeed",
    name: "Aryana Sayeed",
    initials: "AS",
    genre: "Pop · Afghan Music",
    description: "Contemporary Afghan music and powerful performances.",
    tone: "from-rose-200 via-amber-100 to-orange-200",
  },
  {
    id: "farhad-darya",
    name: "Farhad Darya",
    initials: "FD",
    genre: "Pop · World Music",
    description: "Songs and performances from a renowned Afghan musician.",
    tone: "from-amber-200 via-yellow-100 to-stone-200",
  },
  {
    id: "hangama",
    name: "Hangama",
    initials: "H",
    genre: "Classic · Afghan Pop",
    description: "Classic Afghan songs and memorable melodies.",
    tone: "from-purple-200 via-rose-100 to-amber-100",
  },
  {
    id: "jawid-sharif",
    name: "Jawid Sharif",
    initials: "JS",
    genre: "Pop · Afghan Music",
    description: "Afghan pop songs and music videos.",
    tone: "from-sky-200 via-stone-100 to-amber-200",
  },
  {
    id: "qais-ul-ansari",
    name: "Qais Ulfat",
    initials: "QU",
    genre: "Pop · Afghan Music",
    description: "Songs and performances from Qais Ulfat.",
    tone: "from-emerald-200 via-amber-100 to-stone-200",
  },
  {
    id: "nasrat-parsa",
    name: "Nasrat Parsa",
    initials: "NP",
    genre: "Pop · Classic",
    description: "Discover songs and performances by Nasrat Parsa.",
    tone: "from-indigo-200 via-violet-100 to-amber-100",
  },
];

export default function ArtistsPage() {
  const [query, setQuery] = useState("");

  const filteredArtists = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return artists;

    return artists.filter((artist) =>
      `${artist.name} ${artist.genre}`.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#24231f]">
      <header className="border-b border-[#b99a53]/20 bg-white/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-[0.2em]">
            ZOVA <span className="text-[#b18b38]">MUSIC</span>
          </Link>

          <nav className="flex flex-wrap gap-5 text-sm text-[#77736a]">
            <Link href="/search" className="transition hover:text-[#a47c28]">
              Search
            </Link>
            <span className="font-semibold text-[#a47c28]">Artists</span>
            <Link href="/videos" className="transition hover:text-[#a47c28]">
              Videos
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#b99a53]/20 bg-gradient-to-br from-white via-[#f8f2e5] to-[#eee2c8]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-[#b99a53]/20 sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -right-8 -top-12 h-56 w-56 rounded-full border border-[#b99a53]/25 sm:h-72 sm:w-72" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a47c28]">
            The voices of music
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-light leading-tight sm:text-6xl">
            Meet the artists.
            <span className="block font-semibold text-[#a47c28]">
              Discover their sound.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#77736a] sm:text-base">
            Explore Afghan artists, discover their music, and find videos
            from the voices you love.
          </p>

          <label className="mt-8 flex max-w-xl items-center gap-3 rounded-full border border-[#b99a53]/30 bg-white px-5 py-3 shadow-sm focus-within:border-[#a47c28]">
            <span aria-hidden="true" className="text-xl text-[#a47c28]">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search artists by name..."
              aria-label="Search artists by name"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a7a197]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-[#a47c28] hover:text-black"
              >
                Clear
              </button>
            )}
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a47c28]">
              Artist collection
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Explore artists
            </h2>
          </div>

          <p className="text-sm text-[#8b867c]">
            {filteredArtists.length}{" "}
            {filteredArtists.length === 1 ? "artist" : "artists"}
          </p>
        </div>

        {filteredArtists.length === 0 ? (
          <div className="rounded-3xl border border-[#b99a53]/20 bg-white px-6 py-16 text-center">
            <p className="text-lg font-medium">No artists found</p>
            <p className="mt-2 text-sm text-[#8b867c]">
              Try another artist name.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-5 rounded-full bg-[#b18b38] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#967128]"
            >
              Show all artists
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArtists.map((artist, index) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="group overflow-hidden rounded-3xl border border-[#b99a53]/20 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b99a53]/60 hover:shadow-xl hover:shadow-[#5c4615]/10"
              >
                <div
                  className={`relative flex aspect-[1.35/1] items-center justify-center overflow-hidden bg-gradient-to-br ${artist.tone}`}
                >
                  <div className="absolute inset-4 rounded-[40%] border border-white/50" />
                  <div className="absolute inset-8 rounded-[40%] border border-white/40" />

                  <span className="relative font-serif text-7xl font-medium tracking-tight text-[#4d3b1b]/75 transition duration-500 group-hover:scale-110 sm:text-8xl">
                    {artist.initials}
                  </span>

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6d5525] backdrop-blur">
                    Featured artist
                  </span>

                  <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#fffdf8] text-lg text-[#a47c28] shadow-sm transition group-hover:bg-[#b18b38] group-hover:text-white">
                    ↗
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a47c28]">
                    {artist.genre}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold transition group-hover:text-[#a47c28]">
                    {artist.name}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[#817c72]">
                    {artist.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#eee8dc] pt-4 text-sm">
                    <span className="text-[#77736a]">Explore artist</span>
                    <span className="font-medium text-[#a47c28]">
                      Discover →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-[#b99a53]/20 bg-white px-5 py-7 text-center text-xs tracking-[0.2em] text-[#999184]">
        ZOVA MUSIC · YOUR WORLD OF SOUND
      </footer>
    </main>
  );
}

