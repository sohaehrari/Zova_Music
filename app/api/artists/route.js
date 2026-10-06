

import { NextResponse } from "next/server";

export async function GET(request) {
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
    `&type=channel` +
    `&maxResults=12` +
    `&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data.error?.message || "YouTube API request failed.",
        },
        { status: response.status }
      );
    }

    const results = (data.items || []).map((item) => ({
      id: item.id.channelId,
      name: item.snippet.channelTitle,
      image: item.snippet.thumbnails.high?.url,
      description: item.snippet.description,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Artists API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch artists." },
      { status: 500 }
    );
  }
}
