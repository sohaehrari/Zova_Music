import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    // No search query
    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Get API key from environment variables
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "YouTube API key is missing." },
        { status: 500 }
      );
    }

    const url = new URL(
      "https://www.googleapis.com/youtube/v3/search"
    );

    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", query);
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "12");
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "YouTube API request failed.",
        },
        { status: response.status }
      );
    }

    const results = (data.items || [])
      .filter((item) => item?.id?.videoId)
      .map((item) => ({
        id: item.id.videoId,
        title: item.snippet?.title || "Untitled",
        artist: item.snippet?.channelTitle || "Unknown Artist",
        image:
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url ||
          item.snippet?.thumbnails?.default?.url ||
          null,
        publishedAt: item.snippet?.publishedAt || null,
      }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("YouTube API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch YouTube videos." },
      { status: 500 }
    );
  }
}
