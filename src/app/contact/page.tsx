import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Manirajan for full-time roles or freelance projects.",
};

export default function ContactPage() {
  return (
    <Container className="flex flex-wrap gap-12 pb-16 pt-12 md:pt-16">
      <div className="rise min-w-0 flex-[1_1_380px]">
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">Let us talk.</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted md:text-[21px]">
          Open to full-time roles and freelance projects. Tell me what you are building.
        </p>
        <ul className="mt-10 flex flex-col gap-4 text-xl">
          <li><a className="text-accent hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><a className="text-accent hover:underline" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ›</a></li>
          <li><a className="text-accent hover:underline" href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub ›</a></li>
        </ul>
      </div>
      <div className="min-w-0 flex-[1_1_420px]">
        <ContactForm />
      </div>
    </Container>
  );
}
