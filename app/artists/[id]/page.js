import Link from "next/link";
import { notFound } from "next/navigation";

const artists = {
  "aryana-sayeed": {
    name: "Aryana Sayeed",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    bio: "Aryana Sayeed is one of Afghanistan's well-known contemporary singers and performers.",
  },

  "farhad-darya": {
    name: "Farhad Darya",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    bio: "Farhad Darya is a renowned Afghan singer, composer, and musician.",
  },

  hangama: {
    name: "Hangama",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    bio: "Hangama is a celebrated Afghan singer known for her distinctive voice and classic music.",
  },

  "jawid-sharif": {
    name: "Jawid Sharif",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    bio: "Jawid Sharif is an Afghan singer known for contemporary Afghan music.",
  },
};

export default async function ArtistPage({ params }) {
  const { id } = await params;

  const artist = artists[id];

  if (!artist) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white">
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
              </div>
              </div>
              </div>
              </section>
              </main>
  )
}











