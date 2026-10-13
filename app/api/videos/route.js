
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query =
      searchParams.get("q") || "Afghan music official video";

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "YouTube API key is missing." },
        { status: 500 }
      );
    }

    const url = new URL(
      "https://www.googleapis.com/youtube/v3/search"
    );

    url.searchParams.set("part", "snippet");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "20");
    url.searchParams.set("q", query);
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "YouTube request failed." },
        { status: response.status }
      );
    }

    const videos = (data.items || [])
      .filter((item) => item.id?.videoId)
      .map((item) => ({
        id: item.id.videoId,
        title: item.snippet?.title || "Untitled video",
        artist: item.snippet?.channelTitle || "Unknown artist",
        thumbnail:
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url ||
          item.snippet?.thumbnails?.default?.url ||
          "",
        description: item.snippet?.description || "",
        publishedAt: item.snippet?.publishedAt || "",
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));

    return Response.json({ videos });
  } catch (error) {
    console.error("Videos API error:", error);

    return Response.json(
      { error: "Could not load videos." },
      { status: 500 }
    );
  }
}

