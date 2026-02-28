import "server-only";
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { CaseStudy, CaseStudyDetail, CaseStudySection, RichTextSpan, SectionLayout, AboutPhoto, Favorite, ExperienceEntry, Experiment, ExperimentPreviewMap, CaseStudyPreviewMap, YummyAsset, YummyAssetsMap, ProcessPhaseImages, TravelDestination, Track, RadarTopic } from "./types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID!;

function getPlainText(prop: Record<string, unknown> | undefined, type: "title" | "rich_text"): string {
  if (!prop) return "";
  const arr = (prop as Record<string, unknown[]>)[type];
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return arr.map((item) => (item as Record<string, string>).plain_text ?? "").join("");
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

/** Reads Notion rich_text with formatting annotations (bold, italic, etc.) */
function getRichTextSegments(prop: Record<string, unknown> | undefined): RichTextSpan[] {
  if (!prop) return [];
  const arr = (prop as Record<string, unknown[]>).rich_text;
  if (!Array.isArray(arr) || arr.length === 0) return [];
  return arr.map((item) => {
    const richItem = item as Record<string, unknown>;
    const annotations = (richItem.annotations ?? {}) as Record<string, unknown>;
    return {
      text: (richItem.plain_text as string) ?? "",
      bold: (annotations.bold as boolean) ?? false,
      italic: (annotations.italic as boolean) ?? false,
    };
  });
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
const sectionsDbId = "7df160d01ee44eccb000a937954ce594";

function parseCaseStudyDetail(page: PageObjectResponse): CaseStudyDetail {
  const props = page.properties as Record<string, Record<string, unknown>>;

  const title = getPlainText(props.Name, "title") || "Untitled";
  const slug = getPlainText(props.Slug, "rich_text") || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const partner = getPlainText(props.Partner, "rich_text");
  const headline = getFullRichText(props.Headline);
  const summary = getFullRichText(props.Summary);
  const overview = getFullRichText(props.Overview);
  const challenge = getFullRichText(props.Challenge);
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
  const mainHeroImage = getFiles(props["Main Hero Image"]);

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
    overview,
    challenge,
    coverUrl,
    heroImages,
    mainHeroImage,
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
        const label = getFullRichText(props.Label);
        const introText = getRichTextSegments(props["Intro Text"]);
        const description = getFullRichText(props.Description);
        const images = getAllFiles(props.Images);
        const captions: string[] = [];
        for (let i = 1; i <= 6; i++) {
          captions.push(getPlainText(props[`Image ${i} Caption`], "rich_text"));
        }
        const layoutRaw = getSelect(props.Layout);
        const validLayouts: SectionLayout[] = ["default", "phone-pair", "laptop", "desktop", "full-bleed", "phone-single", "side-by-side"];
        const layout: SectionLayout = validLayouts.includes(layoutRaw as SectionLayout) ? (layoutRaw as SectionLayout) : "default";
        const order = getNumber(props.Order);
        return { id: page.id, title, label, introText, description, images, captions, layout, order };
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
      page_size: 100,
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        const label = getPlainText(props.Label, "rich_text") || getPlainText(props.Name, "title");
        const imageUrl = getFiles(props.Image);
        const size = getSelect(props.Size) as AboutPhoto["size"] || "normal";
        const caption = getPlainText(props.Caption, "rich_text") || "";
        const order = getNumber(props.Order);
        return { id: page.id, label, caption: caption || undefined, imageUrl, size, order };
      })
      .filter((photo) => photo.imageUrl);
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
        const categoryRaw = getSelect(props.Category);
        const category: Experiment["category"] =
          (categoryRaw || "").toLowerCase().trim() === "toolkit" ? "toolkit" : "experiment";
        const statusRaw = getSelect(props.Status);
        const statusNorm = (statusRaw || "").toLowerCase().trim();
        const status: Experiment["status"] =
          statusNorm === "live" || statusNorm === "finished" || statusNorm === "done"
            ? "live"
            : statusNorm === "in progress" || statusNorm === "wip"
              ? "progress"
              : "archived";
        const statusLabel = statusRaw || "In Progress";
        const url = getUrl(props["URL"]);
        const coverUrl = getFiles(props.Cover);
        const galleryUrls = getAllFiles(props["Gallery Images"]);
        const galleryCaptionsRaw = getPlainText(props["Gallery Captions"], "rich_text");
        const galleryCaptions = galleryCaptionsRaw
          ? galleryCaptionsRaw.split("\n").map((c) => c.trim()).filter(Boolean)
          : [];
        const videoUrl = getUrl(props["Video URL"]);
        const order = getNumber(props.Order);
        const coverFocusPoint = getPlainText(props["Cover Focus Point"], "rich_text");
        const galleryFitRaw = getSelect(props["Gallery Fit"]);
        const galleryFit: Experiment["galleryFit"] =
          galleryFitRaw === "contain" ? "contain" : galleryFitRaw === "cover" ? "cover" : undefined;

        return {
          id: page.id, name, description, type, category, status, statusLabel,
          url: url || undefined,
          coverUrl: coverUrl || undefined,
          coverFocusPoint: coverFocusPoint || undefined,
          galleryFit,
          galleryUrls: galleryUrls.length > 0 ? galleryUrls : undefined,
          galleryCaptions: galleryCaptions.length > 0 ? galleryCaptions : undefined,
          videoUrl: videoUrl || undefined,
          order,
        };
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
    videos: {},
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
        case "Video":
          result.videos[asset.slug] = asset.imageUrl;
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

// ─── Process Phase Images ───
const processImagesDbId = process.env.NOTION_PROCESS_IMAGES_DB_ID;

export async function getProcessPhaseImages(): Promise<ProcessPhaseImages> {
  if (!processImagesDbId) return {};
  try {
    const response = await notion.databases.query({
      database_id: processImagesDbId,
      page_size: 20,
    });

    const map: ProcessPhaseImages = {};
    for (const page of response.results) {
      if (!("properties" in page)) continue;
      const props = (page as PageObjectResponse).properties as Record<string, Record<string, unknown>>;
      const phaseKey = getPlainText(props["Phase Key"], "rich_text");
      const imageUrl = getFiles(props.Image);
      if (phaseKey && imageUrl) {
        map[phaseKey] = imageUrl;
      }
    }
    return map;
  } catch (error) {
    console.error("Failed to fetch process phase images from Notion:", error);
    return {};
  }
}

// ─── Experiment Previews ───
const previewsDbId = process.env.NOTION_EXPERIMENT_PREVIEWS_DB_ID;

export async function getExperimentPreviews(): Promise<ExperimentPreviewMap> {
  if (!previewsDbId) return {};
  try {
    const response = await notion.databases.query({
      database_id: previewsDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 50,
    });

    const map: ExperimentPreviewMap = {};

    for (const page of response.results) {
      if (!("properties" in page)) continue;
      const props = (page as PageObjectResponse).properties as Record<string, Record<string, unknown>>;
      const experimentName = getPlainText(props["Experiment Name"], "rich_text");
      if (!experimentName) continue;

      const imageUrls = getAllFiles(props["Preview Images"]);
      const captionsRaw = getPlainText(props["Preview Captions"], "rich_text");
      const captions = captionsRaw
        ? captionsRaw.split("\n").map((c) => c.trim()).filter(Boolean)
        : [];
      const videoUrl = getUrl(props["Video URL"]);

      map[experimentName.toLowerCase()] = {
        experimentName,
        imageUrls,
        captions,
        videoUrl: videoUrl || undefined,
      };
    }

    return map;
  } catch (error) {
    console.error("Failed to fetch experiment previews from Notion:", error);
    return {};
  }
}

// ─── Case Study Previews ───
const caseStudyPreviewsDbId = process.env.NOTION_CASESTUDY_PREVIEWS_DB_ID;

export async function getCaseStudyPreviews(): Promise<CaseStudyPreviewMap> {
  if (!caseStudyPreviewsDbId) return {};
  try {
    const response = await notion.databases.query({
      database_id: caseStudyPreviewsDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 50,
    });

    const map: CaseStudyPreviewMap = {};

    for (const page of response.results) {
      if (!("properties" in page)) continue;
      const props = (page as PageObjectResponse).properties as Record<string, Record<string, unknown>>;
      const caseStudyTitle = getPlainText(props["Case Study Title"], "rich_text");
      if (!caseStudyTitle) continue;

      const imageUrls = getAllFiles(props["Preview Images"]);
      const captionsRaw = getPlainText(props["Preview Captions"], "rich_text");
      const captions = captionsRaw
        ? captionsRaw.split("\n").map((c) => c.trim()).filter(Boolean)
        : [];
      const videoUrl = getUrl(props["Video URL"]);

      map[caseStudyTitle.toLowerCase()] = {
        caseStudyTitle,
        imageUrls,
        captions,
        videoUrl: videoUrl || undefined,
      };
    }

    return map;
  } catch (error) {
    console.error("Failed to fetch case study previews from Notion:", error);
    return {};
  }
}

/* ─── Tracks (On Rotation) ─── */
const tracksDbId = process.env.NOTION_TRACKS_DB_ID;

export async function getTracks(): Promise<Track[]> {
  if (!tracksDbId) return [];
  try {
    const response = await notion.databases.query({
      database_id: tracksDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 10,
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        return {
          id: page.id,
          title: getPlainText(props["Name"], "title"),
          artist: getPlainText(props["Artist"], "rich_text"),
          coverUrl: getFiles(props["Cover"]) || undefined,
          previewUrl: getUrl(props["Preview URL"]) || undefined,
          order: getNumber(props["Order"]),
        };
      })
      .filter((t) => t.title);
  } catch (error) {
    console.error("Failed to fetch tracks from Notion:", error);
    return [];
  }
}

/* ─── Travel Destinations ─── */
const travelDbId = process.env.NOTION_TRAVEL_DB_ID;

export async function getTravelDestinations(): Promise<TravelDestination[]> {
  if (!travelDbId) return [];
  try {
    const response = await notion.databases.query({
      database_id: travelDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 50,
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        return {
          id: page.id,
          name: getPlainText(props["Name"], "title"),
          code: getPlainText(props["Code"], "rich_text"),
          stampUrl: getFiles(props["Stamp"]) || undefined,
          seat: getPlainText(props["Seat"], "rich_text") || "—",
          departure: getPlainText(props["Departure"], "rich_text") || "—",
          highlight: getPlainText(props["Highlight"], "rich_text") || undefined,
          order: getNumber(props["Order"]),
        };
      })
      .filter((d) => d.name && d.code);
  } catch (error) {
    console.error("Failed to fetch travel destinations from Notion:", error);
    return [];
  }
}

/* ─── Radar Topics ─── */
const radarDbId = process.env.NOTION_RADAR_DB_ID;

export async function getRadarTopics(): Promise<RadarTopic[]> {
  if (!radarDbId) return [];
  try {
    const response = await notion.databases.query({
      database_id: radarDbId,
      sorts: [{ property: "Order", direction: "ascending" }],
      page_size: 12,
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => {
        const props = page.properties as Record<string, Record<string, unknown>>;
        return {
          id: page.id,
          topic: getPlainText(props["Topic"], "title"),
          oneLiner: getPlainText(props["One-liner"], "rich_text"),
          expandedCopy: getPlainText(props["Expanded Copy"], "rich_text") || undefined,
          imageUrl: getFiles(props["Image"]) || undefined,
          interest: getNumber(props["Interest"]) || 3,
          color: getPlainText(props["Color"], "rich_text") || "#2216ff",
          order: getNumber(props["Order"]),
        };
      })
      .filter((t) => t.topic);
  } catch (error) {
    console.error("Failed to fetch radar topics from Notion:", error);
    return [];
  }
}
