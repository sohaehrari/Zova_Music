export async function GET(request){
    const{searchParams}=new URL(request.url)
    const artist=searchParams.get("artist")
    if(!artist){
        return NextResponse.Json(
        {error:"artist name not found"},
        {status:400}
        )
    }

    const apiKey=process.env.YOUTUBE_API_KEY;

    if(apiKey){
        return NextResponse.Json(
            {error:"api key not found"},
            {status:500}
        )
    }
    const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet` +
    `&q=${encodeURIComponent(artist)}` +
    `&type=video` +
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

    const results = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      image: item.snippet.thumbnails.high?.url,
      publishedAt: item.snippet.publishedAt,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Artist API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch artist music." },
      { status: 500 }
    );
  }
}



