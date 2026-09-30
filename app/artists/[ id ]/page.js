
Soha Ahrari
3:44 PM (1 minute ago)
to me

type ArtistPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const artists = [
  {
    id: "1",
    name: "Artist One",
    bio: "Afghan artist and musician.",
    songs: 24,
  },
  {
    id: "2",
    name: "Artist Two",
    bio: "Afghan artist and musician.",
    songs: 18,
  },
  {
    id: "3",
    name: "Artist Three",
    bio: "Afghan artist and musician.",
    songs: 31,
  },
];

export default async function ArtistPage({
  params,
}: ArtistPageProps) {
  const { id } = await params;

  const artist = artists.find((item) => item.id === id);

  if (!artist) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Artist Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            We couldn't find this artist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Artist Hero */}
      <section className="relative overflow-hidden border-b border-amber-500/10">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-amber-300/20 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col items-center gap-10 md:flex-row">

            {/* Artist Image */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-3xl" />

              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-4 border-amber-400/30 bg-gradient-to-br from-amber-100 via-white to-yellow-50 shadow-2xl sm:h-64 sm:w-64">
                <span className="text-7xl text-amber-500">
                  ♪
                </span>
              </div>
            </div>

            {/* Artist Info */}
            <div className="text-center md:text-left">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
                Artist
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {artist.name}
              </h1>

              <p className="mt-5 max-w-xl text-gray-500">
                {artist.bio}
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start">
                <button className="rounded-full bg-amber-500 px-7 py-3 font-medium text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600">
                  ▶ Play Songs
                </button>

                <button className="rounded-full border border-amber-500/20 bg-white px-7 py-3 font-medium text-gray-700 transition hover:border-amber-400 hover:bg-amber-50">
                  Follow
                </button>
              </div>

              <div className="mt-8 flex justify-center gap-8 md:justify-start">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {artist.songs}
                  </p>

                  <p className="text-sm text-gray-500">
                    Songs
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    8
                  </p>

                  <p className="text-sm text-gray-500">
                    Videos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Songs */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-500">
            Music
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Popular Songs
          </h2>
        </div>

        <div className="space-y-3">
          {["Song One", "Song Two", "Song Three"].map(
            (song, index) => (
              <div
                key={song}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-amber-200 hover:shadow-md"
              >
                <span className="w-6 text-sm text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-xl text-amber-500">
                  ♪
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {song}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {artist.name}
                  </p>
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-sm text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
                  ▶
                </button>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
