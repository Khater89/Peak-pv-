import type { MetadataRoute } from "next";
import { contents } from "@/content";
import { locales } from "@/lib/locales";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/projects", "/about", "/contact", ...contents.en.projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({
    url: `${siteUrl()}/en${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl()}/${l}${path}`])) },
  }));
}
