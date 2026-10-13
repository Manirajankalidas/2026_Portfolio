// Client-safe post types and helpers (no filesystem access here).
export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
  minutes: number;
  body: string;
  link?: string;
  image?: string;
};

export function formatDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
