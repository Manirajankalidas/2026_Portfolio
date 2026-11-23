import Image from "next/image";
import AutoVideo from "@/components/AutoVideo";
import type { Topic } from "@/content/expertise";
import { photoCredits } from "@/content/photo-credits";

// Colour bands that alternate down an area page.
export const topicBands = [
  { bg: "bg-bg", muted: "text-muted", eyebrow: "text-accent", frame: "bg-alt" },
  {
    bg: "bg-alt",
    muted: "text-muted",
    eyebrow: "text-accent",
    frame: "bg-card",
  },
  {
    bg: "bg-accent/10",
    muted: "text-muted",
    eyebrow: "text-accent",
    frame: "bg-card",
  },
  {
    bg: "bg-alt",
    muted: "text-muted",
    eyebrow: "text-accent",
    frame: "bg-card",
  },
  {
    bg: "bg-accent/20",
    muted: "text-fg/70",
    eyebrow: "text-accent",
    frame: "bg-card",
  },
];

export const topicNumber = (i: number) => String(i + 1).padStart(2, "0");

// Required attribution for a third-party photo (see src/content/photo-credits.ts).
export function PhotoCredit({
  src,
  className = "",
  tone = "text-muted",
}: {
  src: string;
  className?: string;
  tone?: string;
}) {
  const c = photoCredits[src];
  if (!c) return null;
  return (
    <p className={`text-xs ${tone} ${className}`}>
      Photo:{" "}
      <a
        href={c.source}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {c.author}, {c.license}
      </a>
    </p>
  );
}

// The 16:9 picture of a topic: a looping clip from public/cv/, or a still image with its credit.
export function TopicMedia({
  topic,
  frame,
  className = "",
}: {
  topic: Topic;
  frame: string;
  className?: string;
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
  if (topic.cutout) {
    // Transparent product photo: no frame, so it sits directly on the band colour.
    return (
      <figure className={className}>
        <Image
          src={topic.image}
          alt={`${topic.name}: example hardware`}
          width={1000}
          height={563}
          className="aspect-video w-full object-contain"
        />
        <PhotoCredit src={topic.image} className="mt-2" />
      </figure>
    );
  }
  return (
    <figure className={className}>
      <div
        className={`aspect-video w-full overflow-hidden rounded-3xl ${frame}`}
      >
        <Image
          src={topic.image}
          alt={`${topic.name}: example hardware`}
          width={1000}
          height={563}
          className="size-full object-cover"
        />
      </div>
      <PhotoCredit src={topic.image} className="mt-2" />
    </figure>
  );
}

export function Pills({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-card px-3.5 py-1.5 text-[15px] text-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
