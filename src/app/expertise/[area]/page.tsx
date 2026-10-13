import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/ui";
import { areas } from "@/content/expertise";

type Props = { params: Promise<{ area: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const found = areas.find((a) => a.slug === area);
  return found ? { title: found.title, description: found.summary } : {};
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params;
  const found = areas.find((a) => a.slug === area);
  if (!found) notFound();

  return (
    <>
      <Container className="pt-12">
        <Link href="/expertise" className="text-[17px] text-accent hover:underline">‹ Areas of Expertise</Link>
      </Container>
      <PageHeader title={found.title} intro={found.summary} />
      <Container className="grid gap-5 pb-16 sm:grid-cols-2">
        {found.topics.map((t) => (
          <div key={t.name} className="flex min-h-44 flex-col justify-between rounded-3xl bg-alt p-8">
            <div>
              <h2 className="text-2xl font-bold">{t.name}</h2>
              {t.summary && <p className="mt-2 text-[17px] text-muted">{t.summary}</p>}
            </div>
            {t.href ? (
              <Link href={t.href} className="text-[17px] text-accent hover:underline">Read ›</Link>
            ) : (
              <span className="text-[15px] text-muted">Coming soon</span>
            )}
          </div>
        ))}
      </Container>
    </>
  );
}
