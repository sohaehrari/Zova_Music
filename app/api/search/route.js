

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API key is missing." },
      { status: 500 }
    );
  }

  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet` +
    `&q=${encodeURIComponent(query)}` +
    `&type=video` +
    `&maxResults=12` +
    `&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.error?.message || "YouTube API request failed." },
      { status: response.status }
    );
  }

  const results = data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    image: item.snippet.thumbnails.high?.url,
    publishedAt: item.snippet.publishedAt,
  }));

  return NextResponse.json({ results });
}
