

const songs = [
    {
      id: "1",
      title: "Afghan Melody",
      artist: "Artist One",
      duration: "3:42",
    },
    {
      id: "2",
      title: "Golden Night",
      artist: "Artist Two",
      duration: "4:10",
    },
    {
      id: "3",
      title: "Herat Dreams",
      artist: "Artist Three",
      duration: "3:56",
    },
    {
      id: "4",
      title: "Kabul Lights",
      artist: "Artist Four",
      duration: "4:21",
    },
    {
      id: "5",
      title: "Afghan Heart",
      artist: "Artist Five",
      duration: "3:35",
    },
    {
      id: "6",
      title: "Mountain Voice",
      artist: "Artist Six",
      duration: "4:05",
    },
  ];
  
  export default function SongsPage() {
    return (
      <main className="min-h-screen bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
  
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
              Zova Music
            </p>
  
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              All Songs
            </h1>
  
            <p className="mt-4 max-w-2xl text-gray-500">
              Discover songs from Afghan artists and explore different sounds
              and styles.
            </p>
          </div>
  
          {/* Search */}
          <div className="mb-10 max-w-xl">
            <input
              type="text"
              placeholder="Search songs or artists..."
              className="w-full rounded-2xl border border-amber-500/20 bg-white px-5 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>
  
          {/* Songs */}
          <div className="space-y-3">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
              >
                {/* Number */}
                <span className="w-7 text-sm text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
  
                {/* Artwork */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 via-white to-yellow-50 text-2xl text-amber-500 shadow-sm">
                  ♪
                </div>
  
                {/* Song Info */}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-gray-900">
                    {song.title}
                  </h2>
  
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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white"
                  aria-label={`Play ${song.title}`}
                >
                  ▶
                </button>
              </div>
            ))}
          </div>
  
        </div>
      </main>
    );
  }
  