
const artists = [
  {
    id: 1,
    name: "Artist Name",
    songs: 24,
  },
  {
    id: 2,
    name: "Artist Name",
    songs: 18,
  },
  {
    id: 3,
    name: "Artist Name",
    songs: 31,
  },
  {
    id: 4,
    name: "Artist Name",
    songs: 15,
  },
  {
    id: 5,
    name: "Artist Name",
    songs: 27,
  },
];

export default function PopularArtists() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-amber-500">
              Artists
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Popular Artists
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Explore music from talented Afghan artists.
            </p>
          </div>

          <button className="hidden rounded-full border border-amber-500/30 px-5 py-2.5 text-sm font-medium text-amber-700 transition hover:bg-amber-50 sm:block">
            View All
          </button>
        </div>

        {/* Artists */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="group rounded-3xl border border-amber-500/10 bg-white p-5 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-2 hover:border-amber-400/30 hover:shadow-[0_20px_50px_rgba(180,130,30,0.12)]"
            >
              {/* Artist Image */}
              <div className="relative mx-auto h-32 w-32">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 opacity-20 blur-xl transition duration-500 group-hover:opacity-40" />

                <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-amber-400/30 bg-gradient-to-br from-amber-100 via-white to-yellow-50 shadow-lg">
                  <span className="text-4xl text-amber-500">
                    ♪
                  </span>
                </div>
              </div>

              {/* Artist Info */}
              <h3 className="mt-5 truncate font-semibold text-gray-900">
                {artist.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {artist.songs} songs
              </p>

              {/* View Artist */}
              <button className="mt-4 text-sm font-medium text-amber-600 transition group-hover:text-amber-700">
                View Artist →
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <button className="mt-8 w-full rounded-full border border-amber-500/30 px-5 py-3 text-sm font-medium text-amber-700 transition hover:bg-amber-50 sm:hidden">
          View All Artists
        </button>
      </div>
    </section>
  );
}
