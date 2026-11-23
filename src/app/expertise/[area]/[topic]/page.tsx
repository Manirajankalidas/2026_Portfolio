import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards";
import {
  Breadcrumbs,
  HardwareCard,
  PhotoCredit,
  Pills,
  TopicMedia,
  topicBands,
  topicNumber,
} from "@/components/expertise";
import { Container } from "@/components/ui";
import { areas } from "@/content/expertise";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ area: string; topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.flatMap((a) =>
    a.topics.filter((t) => t.slug).map((t) => ({ area: a.slug, topic: t.slug as string })),
  );
}

function find(area: string, topic: string) {
  const a = areas.find((x) => x.slug === area);
  const linked = a?.topics.filter((t) => t.slug) ?? [];
  const index = linked.findIndex((t) => t.slug === topic);
  if (!a || index < 0) return null;
  return { area: a, topic: linked[index], index, linked };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area, topic } = await params;
  const f = find(area, topic);
  return f ? { title: `${f.topic.name} | ${f.area.title}`, description: f.topic.summary } : {};
}

const sectionTitle = "text-3xl font-bold tracking-tight md:text-4xl";

export default async function TopicPage({ params }: Props) {
  const { area: areaSlug, topic: topicSlug } = await params;
  const f = find(areaSlug, topicSlug);
  if (!f) notFound();
  const { area, topic: t, index, linked } = f;

  const band = topicBands[index % topicBands.length];
  const areaHref = `/expertise/${area.slug}`;
  const prev = linked[index - 1];
  const next = linked[index + 1];
  const related = (t.projects ?? [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <>
      <Container className="max-w-[1240px] pt-10">
        <Breadcrumbs
          trail={[
            { href: "/expertise", label: "Areas of Expertise" },
            { href: areaHref, label: area.title },
            { label: t.name },
          ]}
        />
      </Container>

      {/* Header: same band layout as the topic on the area page */}
      <section className={`${band.bg} mt-6 py-14 md:py-16`}>
        <Container className="grid max-w-[1240px] items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <TopicMedia topic={t} frame={band.frame} priority />
            {t.image && <PhotoCredit src={t.image} className="mt-2" />}
          </div>
          <div className="rise">
            <p className={`text-xs font-semibold uppercase tracking-wider ${band.eyebrow}`}>
              {topicNumber(index)} — {area.title}
            </p>
            <h1 className="mt-2 text-balance text-4xl font-bold tracking-tight md:text-6xl">{t.name}</h1>
            {t.tagline && <p className="mt-3 text-xl font-semibold leading-snug md:text-2xl">{t.tagline}</p>}
            {t.summary && (
              <p className={`mt-4 max-w-xl text-[17px] leading-relaxed ${band.muted}`}>{t.summary}</p>
            )}
          </div>
        </Container>
      </section>

      <Container className="max-w-[1240px] space-y-16 py-16 md:space-y-20 md:py-20">
        {t.hardware && t.hardware.length > 0 && (
          <section aria-labelledby="hardware">
            <h2 id="hardware" className={sectionTitle}>
              {t.appsLabel ?? "Hardware"}
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.hardware.map((h) => (
                <HardwareCard key={`${h.name}-${h.detail ?? ""}`} item={h} />
              ))}
            </ul>
          </section>
        )}

        {t.technologies && t.technologies.length > 0 && (
          <section aria-labelledby="technologies">
            <h2 id="technologies" className={sectionTitle}>
              Technologies
            </h2>
            <Pills items={t.technologies} tone="bg-alt" />
          </section>
        )}

        {((t.experience?.length ?? 0) > 0 || related.length > 0) && (
          <section aria-labelledby="experience">
            <h2 id="experience" className={sectionTitle}>
              Experience and projects
            </h2>
            {t.experience?.map((p) => (
              <p key={p} className="mt-4 max-w-3xl text-xl leading-relaxed text-muted">
                {p}
              </p>
            ))}
            {related.length > 0 && (
              <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
                {related.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            )}
          </section>
        )}

        <nav aria-label={`${area.title} topics`} className="border-t border-line pt-8">
          <Link href={areaHref} className="text-[17px] text-accent hover:underline">
            ‹ Back to {area.title}
          </Link>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`${areaHref}/${prev.slug}`}
                className="group rounded-3xl bg-alt p-6 transition-colors hover:bg-accent/10"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">‹ Previous</span>
                <span className="mt-1 block text-xl font-bold tracking-tight">{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`${areaHref}/${next.slug}`}
                className="group rounded-3xl bg-alt p-6 text-right transition-colors hover:bg-accent/10"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Next ›</span>
                <span className="mt-1 block text-xl font-bold tracking-tight">{next.name}</span>
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </>
  );
}
