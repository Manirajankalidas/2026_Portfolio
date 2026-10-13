import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards";
import { Container, PageHeader } from "@/components/ui";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Computer vision and interactive projects by Manirajan.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" intro="Things I have built. More will be added here." />
      <Container className="pb-16">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-[repeat(auto-fill,minmax(min(100%,454px),454px))]">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <p className="mt-12 text-[17px] text-muted">More projects coming soon.</p>
      </Container>
    </>
  );
}
