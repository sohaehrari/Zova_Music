

const videos = [
  {
    id: "1",
    title: "Afghan Music Video",
    artist: "Artist One",
    duration: "4:12",
    description:
      "Discover Afghan music and enjoy this music video on Zova Music.",
  },
  {
    id: "2",
    title: "New Afghan Song",
    artist: "Artist Two",
    duration: "3:48",
    description:
      "Enjoy another Afghan music video and discover more music on Zova Music.",
  },
  {
    id: "3",
    title: "Afghan Traditional Music",
    artist: "Artist Three",
    duration: "5:01",
    description:
      "Explore Afghan traditional music and discover new artists.",
  },
];

export default async function VideoPage({ params }) {
  const { id } = await params;

  const video = videos.find((item) => item.id === id);

  if (!video) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Video Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            We couldn't find this video.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-amber-500/10 bg-white shadow-xl">
          {/* Video Area */}
          <div className="relative aspect-video bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-2xl text-white shadow-xl transition hover:scale-110 hover:bg-amber-600">
                ▶
              </button>
            </div>
          </div>

          {/* Video Information */}
          <div className="p-8">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
              Music Video
            </p>

            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-5xl">
              {video.title}
            </h1>

            <p className="mt-4 text-lg text-gray-500">
              {video.artist}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-amber-50 px-4 py-2 text-sm text-amber-700">
                Afghan Music
              </span>

              <span className="rounded-full border border-gray-100 px-4 py-2 text-sm text-gray-500">
                {video.duration}
              </span>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                About this video
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-500">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
