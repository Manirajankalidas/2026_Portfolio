"use client";

import { useState } from "react";
import { EventCard } from "@/components/cards";
import { events, type EventType } from "@/content/events";

const filters: { label: string; types: EventType[] | null }[] = [
  { label: "All", types: null },
  { label: "Speaking and teaching", types: ["speaking", "teaching"] },
  { label: "Exhibited", types: ["exhibited"] },
  { label: "Attended", types: ["attended"] },
];

export default function EventsBrowser() {
  const [active, setActive] = useState(0);
  const types = filters[active].types;
  const shown = events.filter((e) => !types || types.includes(e.type));
  const years = [...new Set(shown.map((e) => e.year))].sort((a, b) => b - a);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter events">
        {filters.map((f, i) => (
          <button
            key={f.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2.5 text-[15px] transition-colors ${
              i === active ? "bg-fg text-bg" : "bg-alt hover:opacity-80"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {years.map((year) => (
        <section key={year} className="mb-14" aria-label={String(year)}>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-muted">{year}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown
              .filter((e) => e.year === year)
              .map((e) => (
                <EventCard key={e.title} event={e} />
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
