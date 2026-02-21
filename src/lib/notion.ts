import "server-only";
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { CaseStudy, CaseStudyDetail, CaseStudySection, AboutPhoto, Favorite, ExperienceEntry, Experiment, YummyAsset, YummyAssetsMap } from "./types";

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

function getAllFiles(prop: Record<string, unknown> | undefined): string[] {
  if (!prop) return [];
  const files = (prop as Record<string, unknown[]>).files;
  if (!Array.isArray(files)) return [];
  return files
    .map((f) => {
      const file = f as Record<string, unknown>;
      if (file.type === "external") return (file.external as Record<string, string>).url;
      if (file.type === "file") return (file.file as Record<string, string>).url;
      return "";
    })
    .filter(Boolean);
}

function getFullRichText(prop: Record<string, unknown> | undefined): string {
  if (!prop) return "";
  const arr = (prop as Record<string, unknown[]>).rich_text;
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return arr.map((item) => (item as Record<string, string>).plain_text ?? "").join("");
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
  const isComingSoon = status !== "Published" && status !== "Featured";

  const sortOrder = getNumber(props.Order);

  return { id: page.id, title, summary, coverUrl, slug, tags, isFeatured, isComingSoon, sortOrder };
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

// ─── Case Study Detail ───
const sectionsDbId = "c1aa594eb0db4108a6eb1b65147b8e09";

function parseCaseStudyDetail(page: PageObjectResponse): CaseStudyDetail {
  const props = page.properties as Record<string, Record<string, unknown>>;

  const title = getPlainText(props.Name, "title") || "Untitled";
  const slug = getPlainText(props.Slug, "rich_text") || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const partner = getPlainText(props.Partner, "rich_text");
  const headline = getFullRichText(props.Headline);
  const summary = getFullRichText(props.Summary);
  const roleDescription = getFullRichText(props["Role Description"]);
  const services = getMultiSelect(props.Services);
  const platform = getMultiSelect(props.Platform);
  const industry = getSelect(props.Industry);
  const projectType = getSelect(props["Project Type"]);
  const websiteUrl = getUrl(props["Website URL"]);
  const order = getNumber(props.Order);
  const status = getSelect(props.Status);

  let coverUrl = "/cover-placeholder.svg";
  const coverFile = getFiles(props.Cover);
  if (coverFile) {
    coverUrl = coverFile;
  } else if (page.cover?.type === "external") {
    coverUrl = page.cover.external.url;
  } else if (page.cover?.type === "file") {
    coverUrl = page.cover.file.url;
  }

  const heroImages = getAllFiles(props["Hero Images"]);

  const outcomes: CaseStudyDetail["outcomes"] = [];
  for (let i = 1; i <= 4; i++) {
    const metric = getPlainText(props[`Outcome ${i} Metric`], "rich_text");
    const description = getPlainText(props[`Outcome ${i} Description`], "rich_text");
    if (metric) outcomes.push({ metric, description });
  }

  return {
    id: page.id,
    title,
    slug,
    partner,
    headline,
    summary,
    coverUrl,
    heroImages,
    roleDescription,
    services,
    platform,
    industry,
    projectType,
    websiteUrl,
    outcomes,
    order,
    status,
  };
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
      page_size: 1,
    });

    const page = response.results.find(
      (p): p is PageObjectResponse => "properties" in p
    );
    if (!page) return null;
    return parseCaseStudyDetail(page);
  } catch (error) {
    console.error("Failed to fetch case study by slug:", error);
    return null;
  }
}

export async function getCaseStudySections(caseStudyId: string): Promise<CaseStudySection[]> {
  try {
    const response = await notion.databases.query({
      database_id: sectionsDbId,
      filter: {
        property: "Case Study",
        relation: { contains: caseStudyId },
      },
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 20,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        const title = getPlainText(props["Section Title"], "title");
        const description = getFullRichText(props.Description);
        const images = getAllFiles(props.Images);
        const captions: string[] = [];
        for (let i = 1; i <= 6; i++) {
          captions.push(getPlainText(props[`Image ${i} Caption`], "rich_text"));
        }
        const order = getNumber(props.Order);
        return { id: page.id, title, description, images, captions, order };
      });
  } catch (error) {
    console.error("Failed to fetch case study sections:", error);
    return [];
  }
}

export async function getNextCaseStudy(currentOrder: number): Promise<CaseStudy | null> {
  try {
    // Get next project by order
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: "Order", number: { greater_than: currentOrder } },
          {
            or: [
              { property: "Status", select: { equals: "Published" } },
              { property: "Status", select: { equals: "Featured" } },
            ],
          },
        ],
      },
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 1,
    });

    let page = response.results.find(
      (p): p is PageObjectResponse => "properties" in p
    );

    // If no next, loop to first
    if (!page) {
      const firstResponse = await notion.databases.query({
        database_id: databaseId,
        filter: {
          or: [
            { property: "Status", select: { equals: "Published" } },
            { property: "Status", select: { equals: "Featured" } },
          ],
        },
        sorts: [{ property: "Order", direction: "ascending" }],
        page_size: 1,
      });
      page = firstResponse.results.find(
        (p): p is PageObjectResponse => "properties" in p
      );
    }

    if (!page) return null;
    return parsePage(page);
  } catch (error) {
    console.error("Failed to fetch next case study:", error);
    return null;
  }
}

// ─── About Photos ───
const photosDbId = process.env.NOTION_PHOTOS_DB_ID;

export async function getAboutPhotos(): Promise<AboutPhoto[]> {
  if (!photosDbId) return [];
  try {
    const response = await notion.databases.query({
      database_id: photosDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 20,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        const label = getPlainText(props.Label, "rich_text") || getPlainText(props.Name, "title");
        const imageUrl = getFiles(props.Image);
        const size = getSelect(props.Size) as AboutPhoto["size"] || "normal";
        const order = getNumber(props.Order);
        return { id: page.id, label, imageUrl, size, order };
      });
  } catch (error) {
    console.error("Failed to fetch about photos from Notion:", error);
    return [];
  }
}

// ─── Current Favorites ───
const favoritesDbId = process.env.NOTION_FAVORITES_DB_ID;

export async function getCurrentFavorites(): Promise<Favorite[]> {
  if (!favoritesDbId) return [];
  try {
    const response = await notion.databases.query({
      database_id: favoritesDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 10,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        const title = getPlainText(props.Name, "title");
        const category = getSelect(props.Category) as Favorite["category"] || "reading";
        const subtitle = getPlainText(props.Subtitle, "rich_text");
        const order = getNumber(props.Order);
        return { id: page.id, title, category, subtitle, order };
      });
  } catch (error) {
    console.error("Failed to fetch favorites from Notion:", error);
    return [];
  }
}

// ─── Experience ───
const experienceDbId = process.env.NOTION_EXPERIENCE_DB_ID;

function parseRoles(rolesStr: string): ExperienceEntry["roles"] {
  if (!rolesStr) return [];
  return rolesStr.split(";;").map((entry) => {
    const trimmed = entry.trim();
    const pipeIdx = trimmed.indexOf("|");
    if (pipeIdx === -1) return { title: trimmed, start: "", end: "" };
    const title = trimmed.slice(0, pipeIdx).trim();
    const datesPart = trimmed.slice(pipeIdx + 1).trim();
    const dashIdx = datesPart.indexOf(" - ");
    if (dashIdx === -1) return { title, start: datesPart, end: "" };
    return {
      title,
      start: datesPart.slice(0, dashIdx).trim(),
      end: datesPart.slice(dashIdx + 3).trim(),
    };
  });
}

function getCheckbox(prop: Record<string, unknown> | undefined): boolean {
  if (!prop) return false;
  return (prop as Record<string, boolean>).checkbox === true;
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  if (!experienceDbId) return [];
  try {
    const response = await notion.databases.query({
      database_id: experienceDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 20,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        const company = getPlainText(props.Company, "title");
        const slug = getPlainText(props.Slug, "rich_text") || company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const roleSummary = getPlainText(props["Role Summary"], "rich_text");
        const dateRange = getPlainText(props["Date Range"], "rich_text");
        const isCurrent = getCheckbox(props["Is Current"]);
        const rolesStr = getPlainText(props.Roles, "rich_text");
        const roles = parseRoles(rolesStr);
        const whatILearned = getPlainText(props["What I Learned"], "rich_text");
        const logoUrl = getFiles(props.Logo);
        const productImageUrl = getFiles(props["Product Image"]);
        const order = getNumber(props.Order);

        return {
          id: page.id,
          slug,
          company,
          logoUrl,
          productImageUrl,
          roleSummary,
          dateRange,
          isCurrent,
          roles,
          whatILearned,
          order,
        };
      });
  } catch (error) {
    console.error("Failed to fetch experience from Notion:", error);
    return [];
  }
}

// ─── Experiments ───
const experimentsDbId = process.env.NOTION_EXPERIMENTS_DB_ID;

function getUrl(prop: Record<string, unknown> | undefined): string {
  if (!prop) return "";
  return ((prop as Record<string, string>).url) ?? "";
}

export async function getExperiments(): Promise<Experiment[]> {
  if (!experimentsDbId) return [];
  try {
    const response = await notion.databases.query({
      database_id: experimentsDbId,
      filter: {
        property: "Status",
        select: { does_not_equal: "Archived" },
      },
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 20,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        const name = getPlainText(props.Name, "title");
        const description = getPlainText(props.Description, "rich_text");
        const type = getSelect(props.Type) || "Other";
        const statusRaw = getSelect(props.Status);
        const status: Experiment["status"] =
          statusRaw === "Live" ? "live" : statusRaw === "In Progress" ? "progress" : "archived";
        const statusLabel = statusRaw || "In Progress";
        const url = getUrl(props["URL"]);
        const coverUrl = getFiles(props.Cover);
        const order = getNumber(props.Order);

        return { id: page.id, name, description, type, status, statusLabel, url: url || undefined, coverUrl: coverUrl || undefined, order };
      });
  } catch (error) {
    console.error("Failed to fetch experiments from Notion:", error);
    return [];
  }
}

// ─── Yummy Labs Assets ───
const yummyAssetsDbId = process.env.NOTION_YUMMY_ASSETS_DB_ID;

export async function getYummyAssets(): Promise<YummyAssetsMap> {
  const empty: YummyAssetsMap = {
    branding: {},
    partnerLogos: {},
    toolLogos: {},
    avatars: {},
    gallery: [],
  };

  if (!yummyAssetsDbId) return empty;

  try {
    const response = await notion.databases.query({
      database_id: yummyAssetsDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 50,
    });

    const assets: YummyAsset[] = response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        return {
          id: page.id,
          name: getPlainText(props.Name, "title"),
          slug: getPlainText(props.Slug, "rich_text"),
          category: getSelect(props.Category) as YummyAsset["category"],
          imageUrl: getFiles(props.Image),
          order: getNumber(props.Order),
        };
      });

    // Organize into a map keyed by slug for easy lookup
    const result: YummyAssetsMap = { ...empty };

    for (const asset of assets) {
      switch (asset.category) {
        case "Branding":
          result.branding[asset.slug] = asset.imageUrl;
          break;
        case "Partner Logo":
          result.partnerLogos[asset.slug] = asset.imageUrl;
          break;
        case "Tool Logo":
          result.toolLogos[asset.slug] = asset.imageUrl;
          break;
        case "Designer Avatar":
          result.avatars[asset.slug] = asset.imageUrl;
          break;
        case "Gallery":
          result.gallery.push({ slug: asset.slug, imageUrl: asset.imageUrl, name: asset.name });
          break;
      }
    }

    return result;
  } catch (error) {
    console.error("Failed to fetch Yummy Labs assets from Notion:", error);
    return empty;
  }
}
