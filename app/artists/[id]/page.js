"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ArtistPage() {
  const searchParams = useSearchParams();
  const artistName = searchParams.get("name");

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getArtist() {
      if (!artistName) {
        setArtist(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `/api/artist-profile?q=${encodeURIComponent(artistName)}`
        );

        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error("Artist page error:", error);
        setArtist(null);
      } finally {
        setLoading(false);
      }
    }

    getArtist();
  }, [artistName]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f3] px-6 py-20 text-center text-gray-500">
        Loading artist...
      </main>
    );
  }

  if (!artistName || !artist?.artist) {
    return (
      <main className="min-h-screen bg-[#faf8f3] px-6 py-20 text-center">
        <div className="text-5xl text-amber-500">♪</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Artist not found
        </h1>
        <p className="mt-2 text-gray-500">
          We could not find this artist.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">
          Zova Music
        </p>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-sm">
          <div className="grid items-center gap-8 p-7 sm:p-12 md:grid-cols-[260px_1fr]">
            <div className="mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-amber-100 bg-amber-50 shadow-lg">
              {artist.image ? (
                <img
                  src={artist.image}
                  alt={artist.artist.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-7xl text-amber-500">
                  ♪
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                Artist Profile
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {artist.artist.name}
              </h1>

              {artist.artist.country && (
                <p className="mt-4 text-gray-500">
                  Country: {artist.artist.country}
                </p>
              )}

              {artist.artist.area && (
                <p className="mt-1 text-gray-500">
                  Area: {artist.artist.area}
                </p>
              )}

              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <button
                  type="button"
                  className="rounded-full bg-amber-500 px-7 py-3 font-semibold text-white transition hover:bg-amber-600"
                  onClick={() =>
                    document
                      .getElementById("artist-music")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Music
                </button>

                <button
                  type="button"
                  className="rounded-full border border-amber-200 px-7 py-3 font-semibold text-gray-800 transition hover:bg-amber-50"
                  onClick={() =>
                    document
                      .getElementById("artist-videos")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Videos
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="artist-music" className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900">
            Music
          </h2>
          <p className="mt-2 text-gray-500">
            Songs by {artist.artist.name} will appear here.
          </p>
        </section>

        <section id="artist-videos" className="mt-10 pb-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Music Videos
          </h2>
          <p className="mt-2 text-gray-500">
            Music videos by {artist.artist.name} will appear here.
          </p>
        </section>
      </div>
    </main>
  );
}
