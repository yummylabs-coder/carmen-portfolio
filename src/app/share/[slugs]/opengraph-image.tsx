import { ImageResponse } from "next/og";
import { getAllProjects } from "@/lib/notion";
import { fallbackProjects } from "@/lib/fallback-projects";

export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

function parseSlugs(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => decodeURIComponent(s.trim()))
    .filter(Boolean);
}

export default async function OgImage({
  params,
  searchParams,
}: {
  params: Promise<{ slugs: string }>;
  searchParams: Promise<{ for?: string }>;
}) {
  const { slugs: rawSlugs } = await params;
  const { for: companyName } = await searchParams;
  const slugs = parseSlugs(rawSlugs);

  let allProjects = await getAllProjects();
  if (allProjects.length === 0) allProjects = fallbackProjects;
  const projects = slugs
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof allProjects;

  const heading = companyName ? `Curated for ${companyName}` : "Selected Work";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ display: "flex", flex: 1, gap: 0 }}>
          {projects.slice(0, 3).map((project, i) => (
            <div key={project.id} style={{ flex: 1, display: "flex", position: "relative", overflow: "hidden" }}>
              {project.coverUrl && !project.coverUrl.includes("placeholder") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.coverUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${["#EEEDFF","#FFF5E6","#E6F6F8"][i%3]} 0%, ${["#D4D1FF","#FECB3A","#B6D7DB"][i%3]} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#300101" }}>
                  {project.title}
                </div>
              )}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))", display: "flex", alignItems: "flex-end", padding: "20px" }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>{project.title}</span>
              </div>
            </div>
          ))}
          {projects.length < 3 && Array.from({ length: 3 - Math.min(projects.length, 3) }).map((_, i) => (
            <div key={`empty-${i}`} style={{ flex: 1, background: "linear-gradient(135deg, #F5F5F3 0%, #E8E8E4 100%)" }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 40px", borderTop: "1px solid #E8E8E4" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#300101" }}>{heading}</span>
            <span style={{ fontSize: 16, color: "#878784" }}>{projects.length} case {projects.length === 1 ? "study" : "studies"} by Carmen Rincon</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, color: "#2216FF" }}>carmenrincon.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
