import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { areas } from "@/content/expertise";

export const metadata: Metadata = {
  title: "Areas of expertise",
  description: "Computer vision, data science and IoT: topics Manirajan works on.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHeader
        title="Areas of expertise"
        intro="Three areas I work in. Each topic page is added as I write it."
      />
      <Container className="pb-16">
        {areas.map((area) => (
          <section key={area.slug} className="mb-16" aria-labelledby={area.slug}>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={area.slug} className="text-4xl font-bold tracking-tight">{area.title}</h2>
              <Link href={`/expertise/${area.slug}`} className="text-[17px] text-accent hover:underline">
                All topics ›
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {area.topics.map((t) => (
                <div key={t.name} className="flex min-h-36 flex-col justify-between rounded-[20px] bg-alt p-6">
                  <span className="text-xl font-bold">{t.name}</span>
                  {t.href ? (
                    <Link href={t.href} className="text-[15px] text-accent hover:underline">Read ›</Link>
                  ) : (
                    <span className="text-[15px] text-muted">Coming soon</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
