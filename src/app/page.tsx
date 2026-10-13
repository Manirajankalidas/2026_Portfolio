import { AreaCard, EventCard, PostCard, ProjectCard } from "@/components/cards";
import ProfilePhoto from "@/components/ProfilePhoto";
import { ButtonLink, Container, SectionTitle } from "@/components/ui";
import { areas } from "@/content/expertise";
import { events } from "@/content/events";
import { projects } from "@/content/projects";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getPosts().slice(0, 3);
  const highlights = events.filter((e) => e.type === "speaking" || e.type === "teaching").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Container className="flex flex-wrap items-center justify-center min-h-[calc(100svh-68px)] gap-12 py-10">
        <div className="rise min-w-0 flex-[1_1_440px]">
          <p className="mb-4 text-xl font-semibold text-muted">Hi, I&apos;m Manirajan.</p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            AI Engineer <span className="text-accent">|</span>
            <br />
            Data Scientist
          </h1>
          <p className="mt-6 max-w-xl text-2xl font-semibold leading-snug tracking-tight">
            Building intelligent systems. Leading innovative ideas. Creating real-world impact.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-[17px]">
            I develop practical AI solutions, drive ideas from concept to deployment, and believe
            that great engineering is built through curiosity, collaboration, and purposeful
            leadership.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">Contact me</ButtonLink>
            {site.resume && (
              <ButtonLink href={site.resume} variant="text" external>Resume ›</ButtonLink>
            )}
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {[
              ["10+", "plant environments"],
              ["50+", "camera streams"],
              ["Jetson", "edge deployments"],
            ].map(([value, label]) => (
              <div key={value}>
                <dt className="text-3xl font-bold tracking-tight">{value}</dt>
                <dd className="mt-0.5 text-[15px] text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rise h-[min(80svh,780px)] min-h-[420px] w-full max-w-[440px] flex-[0_1_440px]">
          <ProfilePhoto className="size-full" />
        </div>
      </Container>

      {/* Projects */}
      <section className="bg-alt py-16">
        <Container>
          <SectionTitle title="Engineering in Action" href="/projects" linkLabel="All projects" intro="More coming soon." />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Expertise */}
      <section className="py-16">
        <Container>
          <SectionTitle title="Areas of expertise" />
          <div className="grid gap-6 md:grid-cols-3">
            {areas.map((a) => (
              <AreaCard key={a.slug} area={a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="bg-alt py-16">
          <Container>
            <SectionTitle title="Latest writing" href="/blog" linkLabel="All posts" />
            <div className="grid gap-5 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Events */}
      <section className="py-16">
        <Container>
          <SectionTitle
            title="Events"
            href="/events"
            linkLabel="All events"
            intro="Workshops taught, expos exhibited, communities joined."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((e) => (
              <EventCard key={e.title} event={e} compact />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          One conversation can spark an idea. One idea can inspire change.
        </h2>
        <p className="mx-auto mb-9 mt-5 max-w-2xl text-xl text-muted md:text-2xl">
          Let&apos;s connect, explore, and make things happen.
        </p>
        <ButtonLink href="/contact">Get in touch</ButtonLink>
      </section>
    </>
  );
}
