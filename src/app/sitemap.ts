import type { MetadataRoute } from "next";

const base = "https://zeinkhalid.com";
const pages = ["", "about", "projects", "experience", "education", "stacks", "services", "resources", "gallery", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: p ? `${base}/${p}` : base,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
