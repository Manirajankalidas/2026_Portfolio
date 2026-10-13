import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import type { Area } from "@/content/expertise";
import { eventTypeLabel, type EventItem } from "@/content/events";
import { formatDate, type Post } from "@/lib/post";
import { Eyebrow } from "@/components/ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-alt">
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title} in use`}
            fill
            sizes="(min-width: 640px) 454px, 100vw"
            style={{ objectPosition: project.imagePosition ?? "30% 40%" }}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <h3 className="mt-6 text-[29px] font-bold leading-snug tracking-tight">{project.title}</h3>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="min-w-0 text-[19px] leading-snug">
          <p className="text-muted">{project.tags.join(" · ")}</p>
          <p className="mt-0.5 font-medium text-accent">{project.eyebrow}</p>
        </div>
        <span
          aria-hidden="true"
          className="flex size-[61px] shrink-0 items-center justify-center rounded-2xl bg-btn text-white transition-transform group-hover:translate-x-0.5"
        >
          <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
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
          <span className="text-[15px] text-accent group-hover:underline">LinkedIn ›</span>
        )}
      </div>
    </>
  );
  return compact ? (
    <Link href="/events" className="flex flex-col overflow-hidden rounded-3xl bg-alt">
      {body}
    </Link>
  ) : event.link ? (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-3xl bg-alt transition-transform hover:-translate-y-1"
    >
      {body}
    </a>
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
