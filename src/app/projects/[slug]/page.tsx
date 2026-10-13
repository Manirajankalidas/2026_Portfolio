import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Chip, Container, Eyebrow } from "@/components/ui";
import Flowchart from "@/components/Flowchart";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const dark = project.tone === "dark";
  const section = "mt-14";
  const h2 = "text-3xl font-bold tracking-tight md:text-4xl";

  return (
    <Container className="pb-16 pt-8 md:pt-10">
      <Link href="/projects" className="text-[17px] text-accent hover:underline">
        ‹ Projects
      </Link>

      <header
        className={`rise mt-6 rounded-[32px] p-8 md:p-14 ${dark ? "bg-[#1d1d1f] text-[#f5f5f7]" : "bg-alt text-fg"}`}
      >
        <Eyebrow className={dark ? "text-[#a1a1a6]" : "text-muted"}>{project.eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          {project.title}
        </h1>
        {project.tagline && (
          <p className={`mt-5 max-w-2xl text-xl leading-snug md:text-2xl ${dark ? "text-[#a1a1a6]" : "text-muted"}`}>
            {project.tagline}
          </p>
        )}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Chip key={t} dark={dark}>{t}</Chip>
          ))}
        </div>
        {(project.links?.length || project.github) && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {project.links?.map((l) => (
              <ButtonLink key={l.href} href={l.href} external>{l.label}</ButtonLink>
            ))}
            {project.github && <ButtonLink href={project.github} variant="text" external>Source on GitHub ›</ButtonLink>}
          </div>
        )}
        {project.facts && (
          <dl className={`mt-10 grid gap-6 border-t pt-8 sm:grid-cols-3 ${dark ? "border-[#2c2c2e]" : "border-line"}`}>
            {project.facts.map((f) => (
              <div key={f.label}>
                <dt className={`text-xs font-semibold uppercase tracking-wider ${dark ? "text-[#a1a1a6]" : "text-muted"}`}>{f.label}</dt>
                <dd className="mt-1 text-lg font-semibold leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {project.youtubeId && (
        <div className="mx-auto mt-12 aspect-video max-w-[820px] overflow-hidden rounded-3xl bg-alt">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
            title={`${project.title} demo video`}
            loading="lazy"
            allowFullScreen
            className="size-full"
          />
        </div>
      )}

      <section className="mx-auto mt-12 max-w-[820px] space-y-5 text-xl leading-relaxed text-muted">
        {project.overview.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      {project.why && (
        <section className={section}>
          <h2 className={h2}>The problem</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {project.why.map((w) => (
              <div key={w.title} className="rounded-3xl bg-alt p-7">
                <p className="text-xl font-semibold leading-snug">{w.title}</p>
                <p className="mt-2 text-[17px] leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.flow && (
        <section className={section}>
          <h2 className={h2}>How it works</h2>
          <div className="mt-8">
            <Flowchart lanes={project.flow} />
          </div>
        </section>
      )}

      {project.stack && (
        <section className={section}>
          <h2 className={h2}>Technology</h2>
          <dl className="mt-8 divide-y divide-line rounded-3xl border border-line">
            {project.stack.map((row) => (
              <div key={row.layer} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:gap-8">
                <dt className="font-semibold sm:w-60 sm:shrink-0">{row.layer}</dt>
                <dd className="flex flex-wrap gap-2">
                  {row.items.map((i) => (
                    <Chip key={i}>{i}</Chip>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {project.results && (
        <section className={section}>
          <h2 className={h2}>Results and notes</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {project.results.map((r) => (
              <li key={r} className="rounded-3xl bg-alt p-7 text-[17px] leading-relaxed">
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
