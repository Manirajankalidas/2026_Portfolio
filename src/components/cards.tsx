import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import type { Area } from "@/content/expertise";
import { eventTypeLabel, type EventItem } from "@/content/events";
import { formatDate, type Post } from "@/lib/post";
import { Chip, Eyebrow } from "@/components/ui";

export function ProjectCard({ project }: { project: Project }) {
  const dark = project.tone === "dark";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex min-h-[420px] flex-col gap-4 overflow-hidden rounded-[28px] p-8 transition-transform hover:-translate-y-1 md:p-10 ${
        dark ? "bg-[#1d1d1f] text-[#f5f5f7]" : "border border-line bg-card text-fg"
      }`}
    >
      {project.image && (
        <Image
          src={project.image}
          alt={`${project.title} in use`}
          style={{ objectPosition: project.imagePosition ?? "30% 40%" }}
          width={1000}
          height={647}
          className="-mx-8 -mt-8 mb-2 aspect-[16/10] w-[calc(100%+4rem)] max-w-none object-cover md:-mx-10 md:-mt-10 md:w-[calc(100%+5rem)]"
        />
      )}
      <Eyebrow className={dark ? "text-[#a1a1a6]" : "text-muted"}>{project.eyebrow}</Eyebrow>
      <h3 className="text-3xl font-bold leading-tight tracking-tight">{project.title}</h3>
      <p className={`text-[17px] leading-relaxed ${dark ? "text-[#a1a1a6]" : "text-muted"}`}>
        {project.summary}
      </p>
      <div className="grow" />
      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Chip key={t} dark={dark}>{t}</Chip>
        ))}
      </div>
      <span className={`text-[17px] ${dark ? "text-[#2997ff]" : "text-accent"} group-hover:underline`}>
        Learn more ›
      </span>
    </Link>
  );
}

export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/expertise/${area.slug}`}
      className="flex min-h-[220px] flex-col gap-2.5 rounded-3xl bg-alt p-8 transition-transform hover:-translate-y-1"
    >
      <span className="text-2xl font-bold">{area.title}</span>
      <span className="text-[17px] leading-relaxed text-muted">{area.summary}</span>
      <span className="grow" />
      <span className="text-[17px] text-accent">Explore ›</span>
    </Link>
  );
}

export function EventCard({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  const highlight = event.type === "teaching" || event.type === "speaking";
  const body = (
    <>
      <Image
        src={event.image}
        alt={`${event.title}, ${event.place}`}
        width={1000}
        height={667}
        className="h-44 w-full object-cover"
      />
      <div className="flex flex-col gap-2 p-6">
        <Eyebrow className={highlight ? "text-accent" : "text-muted"}>
          {eventTypeLabel[event.type]} · {event.place}
        </Eyebrow>
        <span className="text-xl font-bold leading-snug">{event.title}</span>
        {!compact && <span className="text-[15px] leading-relaxed text-muted">{event.summary}</span>}
        {!compact && event.link && (
          <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-[15px] text-accent hover:underline">
            LinkedIn ›
          </a>
        )}
      </div>
    </>
  );
  return compact ? (
    <Link href="/events" className="flex flex-col overflow-hidden rounded-3xl bg-alt">
      {body}
    </Link>
  ) : (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-alt">{body}</article>
  );
}

export function PostCard({ post }: { post: Post }) {
  const cls =
    "flex flex-col gap-2 overflow-hidden rounded-3xl border border-line bg-card p-6 transition-transform hover:-translate-y-1";
  const body = (
    <>
      {post.image && (
        <Image
          src={post.image}
          alt=""
          width={1000}
          height={563}
          className="-mx-6 -mt-6 mb-3 aspect-video w-[calc(100%+3rem)] max-w-none object-cover"
        />
      )}
      <Eyebrow>{post.tag}</Eyebrow>
      <span className="text-xl font-bold leading-snug">{post.title}</span>
      {post.summary && <span className="text-[15px] leading-relaxed text-muted">{post.summary}</span>}
      <span className="grow" />
      <span className="mt-1 text-[15px] text-muted">
        {formatDate(post.date)}
        {post.link ? "" : ` · ${post.minutes} min read`}
      </span>
      {post.link && <span className="text-[15px] text-accent">Read more ›</span>}
    </>
  );
  return (
    <Link href={`/blog/${post.slug}`} className={cls}>
      {body}
    </Link>
  );
}
