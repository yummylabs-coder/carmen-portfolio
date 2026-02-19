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

function getMultiSelect(prop: Record<string, unknown> | undefined): string[] {
  if (!prop) return [];
  const arr = (prop as Record<string, unknown[]>).multi_select;
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => (item as Record<string, string>).name);
}

function getCheckbox(prop: Record<string, unknown> | undefined): boolean {
  if (!prop) return false;
  return (prop as Record<string, boolean>).checkbox ?? false;
}

function getNumber(prop: Record<string, unknown> | undefined): number {
  if (!prop) return 0;
  return (prop as Record<string, number>).number ?? 0;
}

function parsePage(page: PageObjectResponse): CaseStudy {
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

  const tags = getMultiSelect(props.tags) || getMultiSelect(props.Tags);
  const isFeatured = getCheckbox(props.isFeatured) || getCheckbox(props.Featured);
  const sortOrder = getNumber(props.sortOrder) || getNumber(props.Order);

  return { id: page.id, title, summary, coverUrl, slug, tags, isFeatured, sortOrder };
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
      .map(parsePage);
  } catch (error) {
    console.error("Failed to fetch case studies from Notion:", error);
    return [];
  }
}

export async function getAllProjects(): Promise<CaseStudy[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 100,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map(parsePage);
  } catch (error) {
    console.error("Failed to fetch projects from Notion:", error);
    return [];
  }
}
