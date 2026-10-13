"use client";

import { useState } from "react";
import { PostCard } from "@/components/cards";
import type { Post } from "@/lib/post";

export default function BlogBrowser({ posts }: { posts: Post[] }) {
  const tags = ["All", ...new Set(posts.map((p) => p.tag))];
  const [tag, setTag] = useState("All");
  const shown = posts.filter((p) => tag === "All" || p.tag === tag);

  if (posts.length === 0) {
    return (
      <div className="rounded-[28px] border-2 border-dashed border-line p-12 text-center text-xl text-muted">
        First posts are on the way.
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter posts">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={t === tag}
            onClick={() => setTag(t)}
            className={`rounded-full px-4 py-2.5 text-[15px] transition-colors ${
              t === tag ? "bg-fg text-bg" : "bg-alt hover:opacity-80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}
