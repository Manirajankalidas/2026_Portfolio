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
      <Container className="grid gap-6 pb-16 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        <div className="flex min-h-[200px] items-center justify-center rounded-[28px] border-2 border-dashed border-line p-8 text-center text-xl text-muted md:col-span-2">
          More projects coming soon.
        </div>
      </Container>
    </>
  );
}
