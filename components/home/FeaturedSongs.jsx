


const songs = [
  {
    id: 1,
    title: "Afghan Melody",
    artist: "Afghan Artist",
    duration: "3:42",
  },
  {
    id: 2,
    title: "Golden Night",
    artist: "Afghan Artist",
    duration: "4:05",
  },
  {
    id: 3,
    title: "Herat Dreams",
    artist: "Afghan Artist",
    duration: "3:28",
  },
  {
    id: 4,
    title: "Kabul Lights",
    artist: "Afghan Artist",
    duration: "4:16",
  },
];

export default function FeaturedSongs() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-amber-500">
              Featured
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Featured Songs
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Discover some of the latest and most loved Afghan songs.
            </p>
          </div>

          <button className="hidden rounded-full border border-amber-500/30 px-5 py-2.5 text-sm font-medium text-amber-700 transition hover:bg-amber-50 sm:block">
            View All
          </button>
        </div>

        {/* Songs */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="group rounded-3xl border border-amber-500/10 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_20px_50px_rgba(180,130,30,0.12)]"
            >
              {/* Artwork */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-yellow-50 to-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,179,8,0.35),transparent_35%)]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border border-amber-400/30 bg-white/60 shadow-xl backdrop-blur-md">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 text-3xl text-white shadow-lg">
                      ♪
                    </div>
                  </div>
                </div>

                {/* Play */}
                <button className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm text-amber-600 shadow-lg opacity-0 transition duration-300 group-hover:scale-105 group-hover:opacity-100">
                  ▶
                </button>
              </div>

              {/* Info */}
              <div className="flex items-center justify-between gap-3 px-1 pt-5">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-gray-900">
                    {song.title}
                  </h3>

                  <p className="mt-1 truncate text-sm text-gray-500">
                    {song.artist}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-gray-400">
                  {song.duration}
                </span>
              </div>

              {/* Bottom line */}
              <div className="mt-4 h-px bg-gradient-to-r from-amber-400/40 via-amber-200/20 to-transparent" />

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
                  Afghan Music
                </span>

                <span className="text-lg text-amber-500 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <button className="mt-8 w-full rounded-full border border-amber-500/30 px-5 py-3 text-sm font-medium text-amber-700 transition hover:bg-amber-50 sm:hidden">
          View All Songs
        </button>
      </div>
    </section>
  );
}
