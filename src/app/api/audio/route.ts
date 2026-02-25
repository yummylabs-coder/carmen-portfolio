import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/audio?url=<encoded-deezer-preview-url>
 *
 * Proxies a Deezer 30-second MP3 preview through our own origin.
 * This eliminates CORS issues that prevent mobile browsers from
 * fetching the MP3 binary directly from the Deezer CDN.
 *
 * Only allows URLs from *.dzcdn.net (Deezer's CDN).
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing url query param" },
      { status: 400 }
    );
  }

  /* ── Security: only allow Deezer CDN URLs ── */
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!parsed.hostname.endsWith(".dzcdn.net")) {
    return NextResponse.json(
      { error: "Only Deezer CDN URLs are allowed" },
      { status: 403 }
    );
  }

  try {
    const upstream = await fetch(url);

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream returned " + upstream.status },
        { status: 502 }
      );
    }

    const audioData = await upstream.arrayBuffer();

    return new NextResponse(audioData, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioData.byteLength.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch audio from upstream" },
      { status: 500 }
    );
  }
}
