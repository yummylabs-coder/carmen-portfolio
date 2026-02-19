import "server-only";
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { CaseStudy } from "./types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

function getPlainText(prop: Record<string, unknown> | undefined, type: "title" | "rich_text"): string {
  if (!prop) return "";
  const arr = (prop as Record<string, unknown[]>)[type];
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return (arr[0] as Record<string, string>).plain_text ?? "";
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Featured",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 6,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;

        const title =
          getPlainText(props.Name, "title") ||
          getPlainText(props.Title, "title") ||
          "Untitled";

        const summary =
          getPlainText(props.Summary, "rich_text") ||
          getPlainText(props.Description, "rich_text");

        const cover = page.cover;
        let coverUrl = "/cover-placeholder.svg";
        if (cover?.type === "external") coverUrl = cover.external.url;
        else if (cover?.type === "file") coverUrl = cover.file.url;

        const slug =
          getPlainText(props.Slug, "rich_text") ||
          title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        return { id: page.id, title, summary, coverUrl, slug };
      });
  } catch (error) {
    console.error("Failed to fetch case studies from Notion:", error);
    return [];
  }
}
