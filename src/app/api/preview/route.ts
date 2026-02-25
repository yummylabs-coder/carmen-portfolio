import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/preview?artist=Khruangbin&title=Todav%C3%ADa
 *
 * Searches Deezer's free public API for a track and returns its
 * 30-second MP3 preview URL. No API key needed.
 *
 * IMPORTANT: Deezer preview URLs are signed with expiration tokens
 * (~2-4 hours). We must NOT cache this response for longer than that,
 * or clients receive expired URLs that fail silently on <audio>.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const artist = searchParams.get("artist")?.trim();
  const title = searchParams.get("title")?.trim();

  if (!artist || !title) {
    return NextResponse.json(
      { error: "Missing artist or title query params" },
      { status: 400 }
    );
  }

  try {
    const query = encodeURIComponent(`${artist} ${title}`);
    const res = await fetch(
      `https://api.deezer.com/search?q=${query}&limit=5`,
      { cache: "no-store" } // Always fresh — Deezer URLs expire in ~2h
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Deezer API error" },
        { status: 502 }
      );
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json({ previewUrl: null });
    }

    // Try to find an exact-ish match (case-insensitive title contains)
    const titleLower = title.toLowerCase();
    const artistLower = artist.toLowerCase();

    const match =
      data.data.find(
        (t: { title: string; artist: { name: string }; preview: string }) =>
          t.title.toLowerCase().includes(titleLower) &&
          t.artist.name.toLowerCase().includes(artistLower) &&
          t.preview
      ) ||
      data.data.find(
        (t: { title: string; preview: string }) =>
          t.title.toLowerCase().includes(titleLower) && t.preview
      ) ||
      data.data.find(
        (t: { preview: string }) => t.preview
      );

    return NextResponse.json(
      { previewUrl: match?.preview || null },
      {
        headers: {
          // Edge cache for 10 min — well within Deezer URL validity (~2h)
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch from Deezer" },
      { status: 500 }
    );
  }
}
