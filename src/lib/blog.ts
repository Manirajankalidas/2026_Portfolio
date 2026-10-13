import fs from "node:fs";
import path from "node:path";

import type { Post } from "@/lib/post";

const dir = path.join(process.cwd(), "content", "blog");

// Minimal front matter parser: lines of `key: value` between two `---` lines.
function parse(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  const showDrafts = process.env.NODE_ENV !== "production";
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file): Post & { draft: boolean } => {
      const { data, body } = parse(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? file,
        date: data.date ?? "",
        tag: data.tag ?? "General",
        summary: data.summary ?? "",
        minutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
        body,
        link: data.link || undefined,
        image: data.image || undefined,
        draft: data.draft === "true",
      };
    })
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
