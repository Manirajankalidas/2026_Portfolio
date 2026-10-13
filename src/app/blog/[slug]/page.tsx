import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { getPost, getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/post";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const posts = getPosts();
  // `output: "export"` needs at least one param; unknown slugs still 404.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post
    ? {
        title: post.title,
        description: post.summary,
        ...(post.image && { openGraph: { title: post.title, description: post.summary, images: [post.image] } }),
      }
    : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Container className="max-w-[740px] pb-16 pt-10 md:pt-12">
      <Link href="/blog" className="text-[17px] text-accent hover:underline">‹ Blog</Link>
      <header className="rise mb-8 mt-8">
        <Eyebrow>{post.tag}</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-[17px] text-muted">
          {formatDate(post.date)}
          {post.link ? " · Published on LinkedIn" : ` · ${post.minutes} min read`}
        </p>
        {post.link && (
          <div className="mt-6">
            <ButtonLink href={post.link} external>Read the full article on LinkedIn</ButtonLink>
          </div>
        )}
      </header>
      {post.image && (
        <Image
          src={post.image}
          alt=""
          width={1000}
          height={563}
          priority
          className="mb-10 aspect-video w-full rounded-3xl object-cover"
        />
      )}
      <article className="prose-lite">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </article>
      {post.link && (
        <div className="mt-12 rounded-[28px] bg-alt p-8 text-center">
          <p className="text-xl font-semibold">Want the full story?</p>
          <p className="mt-1 text-[17px] text-muted">The complete article is on LinkedIn.</p>
          <div className="mt-5">
            <ButtonLink href={post.link} external>Read on LinkedIn</ButtonLink>
          </div>
        </div>
      )}
    </Container>
  );
}
