import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink, Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Manirajan is an AI engineer in computer vision, specialising in industrial AI and edge deployment, and a data scientist who mentors students.",
};

const highlights = [
  {
    eyebrow: "Industrial AI",
    value: "10+",
    label: "plants AI solution deployment",
  },
  {
    eyebrow: "Streaming",
    value: "50+",
    label: "camera streams handled in computer vision applications",
  },
  {
    eyebrow: "Edge AI",
    value: "Jetson",
    label: "edge device industrial deployments",
  },
  {
    eyebrow: "Creator",
    value: "Content creator",
    label: "Articles and posts on LinkedIn and this blog",
    href: "/blog",
    link: "Read my articles",
  },
  {
    eyebrow: "Mentor",
    value: "Mentoring",
    label: "FDP, student programs and online programs",
    href: "/events",
    link: "See workshops and talks",
  },
];
const intro = [
  "I take computer vision from the drawing board to reliable edge deployment on the plant floor.",
  "I am an **AI engineer** specialising in **industrial AI solutions**, and a **data scientist**. I build end-to-end vision systems, from fine-tuning detection and violation models to optimising real-time inference on **Linux edge environments**.",
  "My work in industrial safety and quality inspection spans **10+ plant environments**. I have architected systems handling **50+ camera streams** and taken projects from **on-site pain-point analysis all the way to production**, using RTSP streaming, custom vision pipelines, industrial networking and close collaboration with clients.",
  "Beyond engineering, **I mentor**. I run **online and in-person bootcamps and workshops** that bridge the gap between academic curricula and the practical demands of modern industry.",
  "I am always sharpening my skills in scaling vision pipelines, edge optimisation and hardware and software integration. If you are building the future of **computer vision, edge AI or industrial automation**, let's talk.",
];

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-bold text-fg">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
function Tile({
  h,
  big = false,
}: {
  h: (typeof highlights)[number];
  big?: boolean;
}) {
  const inner = (
    <>
      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
        {h.eyebrow}
      </span>
      <span
        className={`mt-2 font-bold leading-tight tracking-tight ${big ? "text-5xl" : "text-2xl"}`}
      >
        {h.value}
      </span>
      <span className="mt-1 grow text-[15px] leading-snug text-muted">
        {h.label}
      </span>
      {h.link && (
        <span className="mt-4 text-[14px] text-accent">{h.link} ›</span>
      )}
    </>
  );
  const cls = "flex h-full min-h-[150px] flex-col rounded-3xl bg-alt p-6";
  return h.href ? (
    <Link
      href={h.href}
      className={`${cls} transition-transform hover:-translate-y-1`}
    >
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
function Buttons() {
  return (
    <>
      <ButtonLink href="/contact">Get in touch</ButtonLink>
      <ButtonLink href={site.links.linkedin} variant="text" external>
        LinkedIn ›
      </ButtonLink>
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <Container className="rise pb-4 pt-8 md:pt-12">
        <div className="relative overflow-hidden rounded-[32px] bg-alt md:h-[580px]">
          <div className="relative h-[430px] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2">
            <div
              aria-hidden="true"
              className="absolute bottom-[10%] left-1/2 aspect-square w-[85%] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
            />
            <Image
              src="/about/portrait-half.webp"
              alt="Manirajan"
              width={460}
              height={900}
              priority
              className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_82%,transparent)] md:[mask-image:none]"
            />
          </div>
          <div className="p-7 md:absolute md:inset-y-0 md:left-0 md:flex md:w-1/2 md:flex-col md:justify-center md:p-14">
            <p className="text-lg font-semibold text-muted">
              Hi, I am Manirajan.
            </p>
            <p className="mt-2 text-3xl font-bold leading-[1.08] tracking-tight lg:text-5xl">
              AI Engineer <span className="text-accent">|</span>
              <br />
              Data Scientist
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Buttons />
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-6">
        <ul className="grid gap-4 md:grid-cols-6">
          {highlights.map((h, i) => (
            <li
              key={h.value}
              className={i < 2 ? "md:col-span-3" : "md:col-span-2"}
            >
              <Tile h={h} big={i < 2} />
            </li>
          ))}
        </ul>
      </Container>

      <section className="bg-alt py-10 font-[family-name:var(--font-roboto)]">
        <Container>
          <div className="rounded-[28px] bg-card p-8 md:p-14">
            <div className="max-w-[820px]">
              <h1 className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] md:text-4xl">
                About me
              </h1>
              <p className="mt-4 text-[20px] font-semibold leading-[1.4] md:text-[22px]">
                {intro[0]}
              </p>
              <div className="mt-5 space-y-4 text-[17px] leading-[1.6] text-fg">
                {intro.slice(1).map((t) => (
                  <p key={t}>
                    <Rich text={t} />
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Buttons />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
