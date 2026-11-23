import Image from "next/image";
import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import type { Hardware, Topic } from "@/content/expertise";
import { photoCredits } from "@/content/photo-credits";

// Colour bands that alternate down an area page (and colour each topic's detail page header).
export const topicBands = [
  { bg: "bg-bg", muted: "text-muted", eyebrow: "text-accent", frame: "bg-alt" },
  { bg: "bg-alt", muted: "text-muted", eyebrow: "text-accent", frame: "bg-card" },
  { bg: "bg-accent/10", muted: "text-muted", eyebrow: "text-accent", frame: "bg-card" },
  { bg: "bg-alt", muted: "text-muted", eyebrow: "text-accent", frame: "bg-card" },
  { bg: "bg-accent/20", muted: "text-fg/70", eyebrow: "text-accent", frame: "bg-card" },
];

export const topicNumber = (i: number) => String(i + 1).padStart(2, "0");

// Chip labels for a topic band: its `apps`, or else its hardware names (each once).
export function topicPills(t: Topic) {
  return t.apps ?? [...new Set(t.hardware?.map((h) => h.name) ?? [])];
}

// The 16:9 picture of a topic: a looping clip from public/cv/, or a still image.
export function TopicMedia({
  topic,
  frame,
  className = "",
  priority = false,
}: {
  topic: Topic;
  frame: string;
  className?: string;
  priority?: boolean;
}) {
  if (topic.clip) {
    return (
      <AutoVideo
        src={`/cv/${topic.clip}.mp4`}
        poster={`/cv/${topic.clip}.webp`}
        label={`${topic.name} sample`}
        className={`aspect-video w-full rounded-3xl object-cover ${frame} ${className}`}
      />
    );
  }
  if (!topic.image) return null;
  return (
    <div className={`aspect-video w-full overflow-hidden rounded-3xl ${frame} ${className}`}>
      <Image
        src={topic.image}
        alt={`${topic.name}: example hardware`}
        width={1000}
        height={563}
        priority={priority}
        className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function Pills({ items, tone = "bg-card" }: { items: string[]; tone?: string }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className={`rounded-full px-3.5 py-1.5 text-[15px] text-fg ${tone}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PhotoCredit({ src, className = "" }: { src: string; className?: string }) {
  const c = photoCredits[src];
  if (!c) return null;
  return (
    <p className={`text-xs text-muted ${className}`}>
      Photo:{" "}
      <a href={c.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
        {c.author}, {c.license}
      </a>
    </p>
  );
}

// Neutral tile for hardware without a free-to-use photo.
function HardwarePlaceholder({ name }: { name: string }) {
  return (
    <div
      role="img"
      aria-label={`${name} (no photo)`}
      className="flex size-full items-center justify-center bg-gradient-to-br from-alt to-accent/10 text-accent/70"
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
      </svg>
    </div>
  );
}

export function HardwareCard({ item }: { item: Hardware }) {
  return (
    <li className="overflow-hidden rounded-3xl bg-alt">
      <div className="aspect-[4/3] overflow-hidden bg-card">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.detail ? `${item.name}, ${item.detail}` : item.name}
            width={600}
            height={450}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <HardwarePlaceholder name={item.name} />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
        {item.detail && <p className="mt-1 text-[17px] text-muted">{item.detail}</p>}
        {item.note && <p className="mt-3 text-[13px] text-muted">{item.note}</p>}
        {item.image && <PhotoCredit src={item.image} className="mt-2" />}
      </div>
    </li>
  );
}

export function Breadcrumbs({ trail }: { trail: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[15px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {c.href ? (
              <Link href={c.href} className="text-accent hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
