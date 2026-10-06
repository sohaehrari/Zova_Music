import { NextResponse } from "next/server";

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Artist name is required." },
      { status: 400 }
    );
  }

  try {
    // 1. Find artist on MusicBrainz
    const searchUrl =
      `https://musicbrainz.org/ws/2/artist/` +
      `?query=${encodeURIComponent(`artist:"${query}"`)}` +
      `&fmt=json` +
      `&limit=5`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        "User-Agent": "ZovaMusic/1.0",
        Accept: "application/json",
      },
      next: {
        revalidate: 86400,
      },
    });

    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: "MusicBrainz request failed." },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();
    const artists = searchData.artists || [];

    if (!artists.length) {
      return NextResponse.json({
        artist: null,
        image: null,
      });
    }

    const normalizedQuery = normalizeName(query);

    const artist =
      artists.find(
        (item) => normalizeName(item.name) === normalizedQuery
      ) || artists[0];

    // 2. Get artist relationships
    const lookupUrl =
      `https://musicbrainz.org/ws/2/artist/${artist.id}` +
      `?inc=url-rels` +
      `&fmt=json`;

    const lookupResponse = await fetch(lookupUrl, {
      headers: {
        "User-Agent": "ZovaMusic/1.0",
        Accept: "application/json",
      },
      next: {
        revalidate: 86400,
      },
    });

    let image = null;
    let wikidataId = null;

    if (lookupResponse.ok) {
      const lookupData = await lookupResponse.json();

      const wikidataRelation = (lookupData.relations || []).find(
        (relation) =>
          relation.type === "wikidata" &&
          relation.url?.resource
      );

      if (wikidataRelation) {
        const resource = wikidataRelation.url.resource;

        const match = resource.match(
          /wikidata\.org\/wiki\/(Q\d+)/
        );

        if (match) {
          wikidataId = match[1];
        }
      }
    }

    // 3. Get image from Wikidata
    if (wikidataId) {
      const wikidataUrl =
        `https://www.wikidata.org/w/api.php` +
        `?action=wbgetentities` +
        `&ids=${wikidataId}` +
        `&props=claims` +
        `&format=json`;

      const wikidataResponse = await fetch(wikidataUrl, {
        next: {
          revalidate: 86400,
        },
      });

      if (wikidataResponse.ok) {
        const wikidataData = await wikidataResponse.json();

        const entity =
          wikidataData.entities?.[wikidataId];

        const imageClaims = entity?.claims?.P18;

        if (imageClaims?.length) {
          const imageName =
            imageClaims[0]?.mainsnak?.datavalue?.value;

          if (imageName) {
            image =
              `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(
                imageName
              )}`;
          }
        }
      }
    }

    return NextResponse.json({
      artist: {
        id: artist.id,
        name: artist.name,
        type: artist.type || null,
        country: artist.country || null,
        area: artist.area?.name || null,
        disambiguation: artist.disambiguation || null,
      },
      wikidataId,
      image,
    });
  } catch (error) {
    console.error("Artist profile error:", error);

    return NextResponse.json(
      { error: "Failed to find artist profile." },
      { status: 500 }
    );
  }
}
