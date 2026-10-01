


const videos = [
  {
    id: "1",
    title: "Afghan Music Video",
    artist: "Artist One",
    duration: "4:12",
  },
  {
    id: "2",
    title: "New Afghan Song",
    artist: "Artist Two",
    duration: "3:48",
  },
  {
    id: "3",
    title: "Afghan Traditional Music",
    artist: "Artist Three",
    duration: "5:01",
  },
  {
    id: "4",
    title: "Beautiful Afghan Song",
    artist: "Artist Four",
    duration: "4:25",
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
            Zova Music
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Music Videos
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Watch music videos from Afghan artists and discover new music.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl"
            >
              <div className="relative aspect-video bg-gradient-to-br from-amber-100 via-white to-yellow-50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition group-hover:scale-110">
                    ▶
                  </button>
                </div>

                <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                  {video.duration}
                </span>
              </div>

              <div className="p-5">
                <h2 className="truncate font-semibold text-gray-900">
                  {video.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {video.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
