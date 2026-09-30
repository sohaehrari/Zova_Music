

type SearchResult = {
  id: string;
  title: string;
  artist: string;
  image: string;
  duration: string;
};

const results: SearchResult[] = [
  {
    id: "1",
    title: "Afghan Melody",
    artist: "Artist One",
    image: "/images/music-1.jpg",
    duration: "3:42",
  },
  {
    id: "2",
    title: "Golden Night",
    artist: "Artist Two",
    image: "/images/music-2.jpg",
    duration: "4:10",
  },
  {
    id: "3",
    title: "Herat Dreams",
    artist: "Artist Three",
    image: "/images/music-3.jpg",
    duration: "3:56",
  },
];

export default function SearchResults() {
  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-500">
          Results
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Music Results
        </h2>
      </div>

      <div className="grid gap-4">
        {results.map((song) => (
          <div
            key={song.id}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-amber-200 hover:shadow-lg"
          >
            {/* Image */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-amber-50">
              <img
                src={song.image}
                alt={song.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-gray-900">
                {song.title}
              </h3>

              <p className="mt-1 truncate text-sm text-gray-400">
                {song.artist}
              </p>
            </div>

            {/* Duration */}
            <span className="hidden text-sm text-gray-400 sm:block">
              {song.duration}
            </span>

            {/* Play */}
            <button
              aria-label={`Play ${song.title}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white"
            >
              ▶
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
