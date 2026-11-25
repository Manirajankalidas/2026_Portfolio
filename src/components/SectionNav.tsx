"use client";

import { useEffect, useRef, useState } from "react";

// Sticky in-page navigation under the main nav. Highlights the section in view; scrolls sideways on phones.
export default function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState("");
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  // Keep the active link visible in the strip without moving the page itself.
  useEffect(() => {
    const ul = list.current;
    const link = ul?.querySelector<HTMLElement>('[aria-current="true"]');
    if (ul && link) ul.scrollTo({ left: link.offsetLeft - (ul.clientWidth - link.offsetWidth) / 2 });
  }, [active]);

  return (
    <nav
      aria-label="Sections on this page"
      className="sticky top-[69px] z-40 border-b border-line bg-bg/80 backdrop-blur-xl"
    >
      <ul
        ref={list}
        className="relative mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] md:px-6"
      >
        {items.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`block rounded-full px-3 py-2 text-[14px] transition-colors ${
                active === id ? "bg-accent/10 font-semibold text-accent" : "text-muted hover:text-fg"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
