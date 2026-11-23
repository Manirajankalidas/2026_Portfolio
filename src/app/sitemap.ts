import type { MetadataRoute } from "next";
import { areas } from "@/content/expertise";
import { projects } from "@/content/projects";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/expertise",
    "/blog",
    "/events",
    "/about",
    "/contact",
    ...projects.map((p) => `/projects/${p.slug}`),
    ...areas.map((a) => `/expertise/${a.slug}`),
    ...getPosts().map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}${p ? "/" : ""}` }));
}
