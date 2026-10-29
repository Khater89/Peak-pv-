import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/projects", "/about", "/contact", ...projects.map((p) => `/projects/${p.slug}`)].map((path) => ({
    url: `${siteUrl()}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
