import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PhotoCredit,
  Pills,
  TopicMedia,
  topicBands,
  topicNumber,
} from "@/components/expertise";
import SectionNav from "@/components/SectionNav";
import { Container, PageHeader } from "@/components/ui";
import { areas } from "@/content/expertise";

type Props = { params: Promise<{ area: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const found = areas.find((a) => a.slug === area);
  if (!found) return {};
  return {
    title: found.metaTitle ?? found.title,
    description: found.metaDescription ?? found.summary,
  };
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params;
  const found = areas.find((a) => a.slug === area);
  if (!found) notFound();

  const withMedia = found.topics.some((t) => t.clip || t.image || t.chart);

  if (withMedia) {
    const longTitle = found.title.length > 20;
    const sections = found.topics.flatMap((t) =>
      t.id ? [{ id: t.id, label: t.navLabel ?? t.name }] : [],
    );
    const hasNav = sections.length > 0;
    // Clear the main nav and the section nav when jumping to a section.
    const anchor = hasNav ? "scroll-mt-[120px] " : "";

    return (
      <>
        <section className="relative isolate overflow-hidden bg-[#1d1d1f] text-white">
          {found.banner && (
            <Image
              src={found.banner}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover object-[70%_50%]"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/10 max-md:bg-black/60"
          />
          <Container className="flex min-h-[460px] flex-col justify-center py-12 md:min-h-[560px]">
            <Link
              href="/expertise"
              className="mb-auto text-[17px] text-white/80 hover:text-white hover:underline"
            >
              ‹ Areas of Expertise
            </Link>
            {/* Long titles get a smaller size and wider box so they stay on one line like "Computer Vision". */}
            <div
              className={`rise my-auto py-10 ${longTitle ? "max-w-4xl" : "max-w-xl"}`}
            >
              <h1
                className={`text-balance font-bold leading-[1.05] tracking-tight ${
                  longTitle ? "text-4xl md:text-6xl" : "text-5xl md:text-7xl"
                }`}
              >
                {found.title}
              </h1>
              <ul
                className={`mt-6 flex flex-wrap gap-2 ${longTitle ? "max-w-2xl" : ""}`}
              >
                {found.topics.map((t) => (
                  <li
                    key={t.name}
                    className="rounded-full bg-white/15 px-3.5 py-1.5 text-[15px] backdrop-blur"
                  >
                    {t.id ? <a href={`#${t.id}`}>{t.name}</a> : t.name}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
          {found.banner && (
            <PhotoCredit
              src={found.banner}
              tone="text-white/60"
              className="absolute bottom-3 right-4 text-[11px]"
            />
          )}
        </section>

        {hasNav && <SectionNav items={sections} />}

        {found.topics.map((t, i) => {
          const band = topicBands[i % topicBands.length];
          return (
            <section
              key={t.name}
              id={t.id}
              className={`${anchor}${band.bg} py-16 md:py-20`}
            >
              <Container
                className={`grid max-w-[1240px] items-center gap-8 lg:gap-14 ${
                  i % 2
                    ? "lg:grid-cols-[1fr_1.5fr]"
                    : "lg:grid-cols-[1.5fr_1fr]"
                }`}
              >
                <TopicMedia
                  topic={t}
                  frame={band.frame}
                  className={i % 2 ? "lg:order-2" : ""}
                />
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${band.eyebrow}`}
                  >
                    {topicNumber(i)} — {t.name}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                    {t.name}
                  </h2>
                  {t.tagline && (
                    <p className="mt-3 text-xl font-semibold leading-snug md:text-2xl">
                      {t.tagline}
                    </p>
                  )}
                  {t.summary && (
                    <p
                      className={`mt-4 max-w-xl text-[17px] leading-relaxed ${band.muted}`}
                    >
                      {t.summary}
                    </p>
                  )}
                  {t.apps && (
                    <div className="mt-6">
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${band.muted}`}
                      >
                        {t.appsLabel ?? "Suggested applications"}
                      </p>
                      <Pills items={t.apps} />
                    </div>
                  )}
                  {t.href && (
                    <Link
                      href={t.href}
                      className="mt-5 inline-block text-[17px] underline-offset-4 hover:underline"
                    >
                      Read ›
                    </Link>
                  )}
                </div>
              </Container>
            </section>
          );
        })}
      </>
    );
  }

  return (
    <>
      <Container className="pt-12">
        <Link
          href="/expertise"
          className="text-[17px] text-accent hover:underline"
        >
          ‹ Areas of Expertise
        </Link>
      </Container>
      <PageHeader title={found.title} intro={found.summary} />
      <Container className="grid gap-5 pb-16 sm:grid-cols-2">
        {found.topics.map((t) => (
          <div
            key={t.name}
            className="flex min-h-44 flex-col justify-between rounded-3xl bg-alt p-8"
          >
            <div>
              <h2 className="text-2xl font-bold">{t.name}</h2>
              {t.summary && (
                <p className="mt-2 text-[17px] text-muted">{t.summary}</p>
              )}
            </div>
            {t.href ? (
              <Link
                href={t.href}
                className="text-[17px] text-accent hover:underline"
              >
                Read ›
              </Link>
            ) : (
              <span className="text-[15px] text-muted">Coming soon</span>
            )}
          </div>
        ))}
      </Container>
    </>
  );
}
