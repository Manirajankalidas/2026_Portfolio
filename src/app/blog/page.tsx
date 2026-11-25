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
        <div className="rounded-[28px] bg-alt p-8 text-center">
          <h2 className="text-xl font-semibold">Follow along</h2>
          <p className="mt-1 text-[17px] text-muted">New posts are shared on LinkedIn too.</p>
          <div className="mt-5">
            <ButtonLink href={site.links.linkedin} external>Follow on LinkedIn</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
