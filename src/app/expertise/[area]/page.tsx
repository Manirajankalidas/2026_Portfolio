import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoCredit, Pills, TopicMedia, topicBands, topicNumber, topicPills } from "@/components/expertise";
import { Container, PageHeader } from "@/components/ui";
import { areas, type Topic } from "@/content/expertise";
import { photoCredits } from "@/content/photo-credits";

type Props = { params: Promise<{ area: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const found = areas.find((a) => a.slug === area);
  return found ? { title: found.title, description: found.intro ?? found.summary } : {};
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params;
  const found = areas.find((a) => a.slug === area);
  if (!found) notFound();

  const withMedia = found.topics.some((t) => t.clip || t.image);

  if (withMedia) {
    const topicHref = (t: Topic) => (t.slug ? `/expertise/${found.slug}/${t.slug}` : undefined);
    const usesCreditedPhotos = [found.banner, ...found.topics.map((t) => t.image)].some(
      (src) => src && photoCredits[src],
    );

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
            <div className="rise my-auto max-w-xl py-10">
              <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                {found.title}
              </h1>
              {found.tagline && (
                <p className="mt-4 text-xl font-semibold leading-snug md:text-2xl">{found.tagline}</p>
              )}
              {found.intro && (
                <p className="mt-4 text-[17px] leading-relaxed text-white/80">{found.intro}</p>
              )}
              <ul className="mt-6 flex flex-wrap gap-2">
                {found.topics.map((t) => {
                  const href = topicHref(t);
                  const chip = "rounded-full bg-white/15 px-3.5 py-1.5 text-[15px] backdrop-blur";
                  return (
                    <li key={t.name} className={href ? "" : chip}>
                      {href ? (
                        <Link href={href} className={`${chip} inline-block transition-colors hover:bg-white/25`}>
                          {t.name}
                        </Link>
                      ) : (
                        t.name
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Container>
        </section>

        {found.topics.map((t, i) => {
          const band = topicBands[i % topicBands.length];
          const href = topicHref(t);
          const pills = topicPills(t);
          const content = (
            <Container
              className={`grid max-w-[1240px] items-center gap-8 lg:gap-14 ${
                i % 2 ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"
              }`}
            >
              <TopicMedia topic={t} frame={band.frame} className={i % 2 ? "lg:order-2" : ""} />
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${band.eyebrow}`}>
                  {topicNumber(i)} — {t.name}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{t.name}</h2>
                {t.tagline && (
                  <p className="mt-3 text-xl font-semibold leading-snug md:text-2xl">{t.tagline}</p>
                )}
                {t.summary && (
                  <p className={`mt-4 max-w-xl text-[17px] leading-relaxed ${band.muted}`}>{t.summary}</p>
                )}
                {pills.length > 0 && (
                  <div className="mt-6">
                    <p className={`text-xs font-semibold uppercase tracking-wider ${band.muted}`}>
                      {t.appsLabel ?? "Suggested applications"}
                    </p>
                    <Pills items={pills} />
                  </div>
                )}
                {href ? (
                  <span className="mt-6 inline-flex items-center gap-1 text-[17px] text-accent">
                    Explore {t.name}
                    <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1">
                      ›
                    </span>
                  </span>
                ) : (
                  t.href && (
                    <Link
                      href={t.href}
                      className="mt-5 inline-block text-[17px] underline-offset-4 hover:underline"
                    >
                      Read ›
                    </Link>
                  )
                )}
              </div>
            </Container>
          );

          return (
            <section key={t.name} className={`${band.bg} py-16 md:py-20`}>
              {href ? (
                <Link
                  href={href}
                  aria-label={`${t.name}: explore hardware and experience`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </section>
          );
        })}

        {usesCreditedPhotos && (
          <Container className="py-8">
            <p className="text-xs text-muted">
              Hardware photos from Wikimedia Commons contributors, used under their Creative Commons licences.
              Each photo is credited on its topic page.
            </p>
            {found.banner && <PhotoCredit src={found.banner} className="mt-1" />}
          </Container>
        )}
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
