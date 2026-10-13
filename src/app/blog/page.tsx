import type { Metadata } from "next";
import BlogBrowser from "@/components/BlogBrowser";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on computer vision, data science, IoT and more by Manirajan.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Blog" intro="Notes on what I am learning and building." />
      <Container className="pb-10">
        <BlogBrowser posts={getPosts()} />
      </Container>
      <Container className="pb-10">
        <div className="rounded-[32px] bg-[#1d1d1f] p-10 text-center text-[#f5f5f7] md:p-12">
          <h2 className="text-3xl font-bold tracking-tight">Follow along</h2>
          <p className="mb-6 mt-2 text-[17px] text-[#a1a1a6]">New posts are shared on LinkedIn too.</p>
          <ButtonLink href={site.links.linkedin} external>Follow on LinkedIn</ButtonLink>
        </div>
      </Container>
    </>
  );
}
