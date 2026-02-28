import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

/**
 * POST /api/upload-video
 * Accepts an MP4 file upload and stores it in Vercel Blob.
 * Protected by a simple token check (UPLOAD_SECRET env var).
 * Returns the permanent CDN URL.
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.UPLOAD_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Upload to Vercel Blob — addRandomSuffix prevents caching stale versions
  const blob = await put(`videos/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({
    url: blob.url,
    pathname: blob.pathname,
  });
}
