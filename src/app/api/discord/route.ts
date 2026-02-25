import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/discord
 *
 * Proxies the Discord invite API to return the approximate member count
 * for Carmen's design community server. No auth needed — the invite
 * endpoint is public when `with_counts=true`.
 *
 * Response: { memberCount: number, onlineCount: number }
 *
 * Cached for 5 minutes via Cache-Control to avoid hammering Discord.
 */

const INVITE_CODE = "7GnFfQuZ3m";

export async function GET() {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`,
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 300 }, // cache for 5 min
      },
    );

    if (!res.ok) {
      console.error("[discord] Invite API error:", res.status, await res.text());
      return NextResponse.json(
        { memberCount: 0, onlineCount: 0 },
        {
          status: 200,
          headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
        },
      );
    }

    const data = await res.json();

    return NextResponse.json(
      {
        memberCount: data.approximate_member_count ?? 0,
        onlineCount: data.approximate_presence_count ?? 0,
      },
      {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
      },
    );
  } catch (error) {
    console.error("[discord] Failed to fetch invite:", error);
    return NextResponse.json(
      { memberCount: 0, onlineCount: 0 },
      { status: 200 },
    );
  }
}
