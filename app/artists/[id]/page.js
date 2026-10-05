import Link from "next/link";
import { notFound } from "next/navigation";

const artists = {
  "aryana-sayeed": {
    name: "Aryana Sayeed",
    image: "/artists/aryana-sayeed.jpg",
    bio: "Afghan singer and performer.",
  },

  "farhad-darya": {
    name: "Farhad Darya",
    image: "/artists/farhad-darya.jpg",
    bio: "Afghan singer, composer, and musician.",
  },

  hangama: {
    name: "Hangama",
    image: "/artists/hangama.jpg",
    bio: "Afghan singer known for her distinctive voice and classic music.",
  },

  "jawid-sharif": {
    name: "Jawid Sharif",
    image: "/artists/jawid-sharif.jpg",
    bio: "Afghan singer known for contemporary Afghan music.",
  },

  "qais-ul-ansari": {
    name: "Qais Ulfat",
    image: "/artists/qais-ulfat.jpg",
    bio: "Afghan singer and musician.",
  },

  "nasrat-parsa": {
    name: "Nasrat Parsa",
    image: "/artists/nasrat-parsa.jpg",
    bio: "Afghan singer known for his music and performances.",
  },
};

export default async function ArtistPage({ params }) {
  const { id } = await params;

  const artist = artists[id];

  if (!artist) {
    notFound();
  }

  const response = await fetch(
    `http://localhost:3000/api/artist?artist=${encodeURIComponent(
      artist.name
    )}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  const songs = data.results || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Artist Header */}
      <section className="overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Link
            href="/artists"
            className="text-sm font-medium text-amber-600 transition hover:text-amber-700"
          >
            ← Back to Artists
          </Link>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[320px_1fr]">
            <div className="overflow-hidden rounded-[2rem] border border-amber-100 shadow-xl">
              <img
                src={artist.image}
                alt={artist.name}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
                Zova Music
              </p>

              <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-6xl">
                {artist.name}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                {artist.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Songs */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-500">
            Music
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Music by {artist.name}
          </h2>
        </div>

        {songs.length > 0 ? (
          <div className="grid gap-4">
            {songs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-amber-200 hover:shadow-lg"
              >
                <img
                  src={song.image}
                  alt={song.title}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-900">
                    {song.title}
                  </h3>

                  <p className="mt-1 truncate text-sm text-gray-400">
                    {song.artist}
                  </p>
                </div>

                <Link
                  href={`/videos/${song.id}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                  aria-label={`Watch ${song.title}`}
                >
                  ▶
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/40 p-10 text-center">
            <div className="text-4xl text-amber-500">♪</div>

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              No music found
            </h3>

            <p className="mt-2 text-gray-500">
              We could not find music for this artist.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
