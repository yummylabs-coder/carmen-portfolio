import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/discord-messages
 *
 * Fetches the last 3 messages from the #introduce-yourself channel.
 * Requires DISCORD_BOT_TOKEN and DISCORD_CHANNEL_ID env vars.
 * Falls back gracefully to an empty array if not configured.
 */

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

interface RawReaction {
  count: number;
  emoji: { id: string | null; name: string };
}

export async function GET() {
  // If not configured, return empty — the UI will hide the messages section
  if (!BOT_TOKEN || !CHANNEL_ID) {
    return NextResponse.json(
      { messages: [] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  }

  try {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=3`,
      {
        headers: {
          Authorization: `Bot ${BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 120 }, // cache for 2 min
      },
    );

    if (!res.ok) {
      console.error("[discord-messages] API error:", res.status, await res.text());
      return NextResponse.json(
        { messages: [] },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        },
      );
    }

    const data = await res.json();

    const messages = data.map(
      (msg: {
        author: { username: string; global_name?: string; avatar?: string; id: string };
        content: string;
        timestamp: string;
        reactions?: RawReaction[];
      }) => ({
        author: msg.author.global_name || msg.author.username,
        avatar: msg.author.avatar
          ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png?size=64`
          : null,
        content:
          msg.content.length > 80
            ? msg.content.slice(0, 77) + "..."
            : msg.content,
        timestamp: msg.timestamp,
        reactions: (msg.reactions ?? [])
          .filter((r: RawReaction) => r.emoji.name)
          .slice(0, 3)
          .map((r: RawReaction) => ({
            emoji: r.emoji.name,
            count: r.count,
          })),
      }),
    );

    return NextResponse.json(
      { messages },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("[discord-messages] Failed to fetch:", error);
    return NextResponse.json({ messages: [] }, { status: 200 });
  }
}
