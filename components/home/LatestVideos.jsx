


const videos = [
  {
    id: 1,
    title: "New Afghan Music",
    artist: "Artist Name",
    duration: "4:12",
  },
  {
    id: 2,
    title: "Live Performance",
    artist: "Artist Name",
    duration: "3:48",
  },
  {
    id: 3,
    title: "Afghan Traditional",
    artist: "Artist Name",
    duration: "5:06",
  },
];

export default function LatestVideos() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-amber-500">
              Watch
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Latest Music Videos
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Watch the latest music videos from Afghan artists.
            </p>
          </div>

          <button className="hidden rounded-full border border-amber-500/30 px-5 py-2.5 text-sm font-medium text-amber-700 transition hover:bg-amber-50 sm:block">
            View All
          </button>
        </div>

        {/* Videos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group overflow-hidden rounded-3xl border border-amber-500/10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_20px_50px_rgba(180,130,30,0.14)]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-amber-100 via-yellow-50 to-white">

                {/* Decorative artwork */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />

                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-white/80 text-lg text-amber-600 shadow-xl backdrop-blur-md transition duration-300 group-hover:scale-110">
                    ▶
                  </div>
                </div>

                {/* Duration */}
                <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-md">
                  {video.duration}
                </span>

                {/* Video label */}
                <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-white/70 px-3 py-1 text-xs font-medium text-amber-700 backdrop-blur-md">
                  Music Video
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="truncate font-semibold text-gray-900">
                  {video.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {video.artist}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
                    Afghan Music
                  </span>

                  <button className="text-sm font-medium text-gray-700 transition hover:text-amber-600">
                    Watch →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <button className="mt-8 w-full rounded-full border border-amber-500/30 px-5 py-3 text-sm font-medium text-amber-700 transition hover:bg-amber-50 sm:hidden">
          View All Videos
        </button>
      </div>
    </section>
  );
}
