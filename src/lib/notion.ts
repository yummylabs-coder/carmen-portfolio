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

function getSelect(prop: Record<string, unknown> | undefined): string {
  if (!prop) return "";
  const sel = (prop as Record<string, Record<string, string>>).select;
  return sel?.name ?? "";
}

function getNumber(prop: Record<string, unknown> | undefined): number {
  if (!prop) return 0;
  return (prop as Record<string, number>).number ?? 0;
}

function getFiles(prop: Record<string, unknown> | undefined): string {
  if (!prop) return "";
  const files = (prop as Record<string, unknown[]>).files;
  if (!Array.isArray(files) || files.length === 0) return "";
  const first = files[0] as Record<string, unknown>;
  if (first.type === "external") return (first.external as Record<string, string>).url;
  if (first.type === "file") return (first.file as Record<string, string>).url;
  return "";
}

function parsePage(page: PageObjectResponse): CaseStudy {
  const props = page.properties as Record<string, Record<string, unknown>>;

  const title = getPlainText(props.Name, "title") || "Untitled";
  const summary = getPlainText(props.Summary, "rich_text");
  const slug =
    getPlainText(props.Slug, "rich_text") ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Cover: check the "Cover" file property first, then fall back to page cover
  let coverUrl = "/cover-placeholder.svg";
  const coverFile = getFiles(props.Cover);
  if (coverFile) {
    coverUrl = coverFile;
  } else if (page.cover?.type === "external") {
    coverUrl = page.cover.external.url;
  } else if (page.cover?.type === "file") {
    coverUrl = page.cover.file.url;
  }

  // Tags: combine Services + Platform multi-selects
  const services = getMultiSelect(props.Services);
  const platform = getMultiSelect(props.Platform);
  const tags = [...services, ...platform];

  // Featured = Status select equals "Featured"
  const status = getSelect(props.Status);
  const isFeatured = status === "Featured";

  const sortOrder = getNumber(props.Order);

  return { id: page.id, title, summary, coverUrl, slug, tags, isFeatured, sortOrder };
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        select: { equals: "Featured" },
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
      filter: {
        or: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Status", select: { equals: "Featured" } },
        ],
      },
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
