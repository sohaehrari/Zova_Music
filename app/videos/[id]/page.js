

import { notFound } from "next/navigation";

export default async function VideoPage({ params }) {
  const { id } = await params;

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return <p>YouTube API key is missing.</p>;
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=${apiKey}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok || !data.items?.length) {
    notFound();
  }

  const video = data.items[0];
  const { snippet, contentDetails } = video;

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Video */}
        <div className="aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${id}`}
            title={snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Information */}
        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
            Zova Music
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {snippet.title}
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            {snippet.channelTitle}
          </p>

          <div className="mt-6 h-px bg-gray-100" />

          <p className="mt-6 max-w-3xl leading-8 text-gray-600">
            {snippet.description}
          </p>
        </div>
      </div>
    </main>
  );
}
