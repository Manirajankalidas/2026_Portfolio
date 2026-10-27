import Image from "next/image";
import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import { Container } from "@/components/ui";
import type { Area } from "@/content/expertise";

const bands = ["bg-alt", "bg-accent/10", "bg-bg"];

// One full-width, colour-coded band per expertise area: picture on one side, text on the other.
export default function AreaBand({
  area,
  index,
}: {
  area: Area;
  index: number;
}) {
  const flip = index % 2 === 1;
  const media = area.media;
  return (
    <div className={`${bands[index % bands.length]} py-14 md:py-16`}>
      <Container
        className={`grid max-w-[1240px] items-center gap-8 lg:gap-14 ${
          flip ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"
        }`}
      >
        <Link
          href={`/expertise/${area.slug}`}
          aria-label={`${area.title}: explore`}
          className={`block overflow-hidden rounded-3xl bg-black ${flip ? "lg:order-2" : ""}`}
        >
          {media?.clip ? (
            <AutoVideo
              src={`/cv/${media.clip}.mp4`}
              poster={`/cv/${media.clip}.webp`}
              label={`${area.title} sample`}
              className="aspect-video w-full object-cover"
            />
          ) : (
            media?.image && (
              <Image
                src={media.image}
                alt={`${area.title} illustration`}
                width={1000}
                height={563}
                className={`aspect-video w-full ${media.wide ? "bg-white object-contain" : "object-cover"}`}
              />
            )
          )}
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            0{index + 1}
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
            {area.title}
          </h3>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            {area.summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {area.topics.map((t) => (
              <li
                key={t.name}
                className="rounded-full bg-card px-3.5 py-1.5 text-[15px]"
              >
                {t.name}
              </li>
            ))}
          </ul>
          <Link
            href={`/expertise/${area.slug}`}
            className="mt-6 inline-block text-[17px] text-accent hover:underline"
          >
            Explore {area.title} ›
          </Link>
        </div>
      </Container>
    </div>
  );
}
