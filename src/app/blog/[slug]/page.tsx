import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBlogPostSchema } from "@/lib/seo";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={buildBlogPostSchema(post)} />

      <article className="py-16 md:py-24">
        <Container className="mx-auto max-w-3xl">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mt-8">
            <div className="flex items-center gap-2 text-[13px] text-body/60">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="mt-4">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-heading/10 px-2.5 py-0.5 text-[12px] text-body/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="blog-body mt-10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-16 rounded-2xl border border-heading/10 p-8">
            <h2 className="text-[18px]">Want us to look at your numbers?</h2>
            <p className="mt-2 text-body">
              Tell us where growth has stalled and we&apos;ll tell you honestly
              whether we can move it.
            </p>
            <div className="mt-4">
              <Button href="/contact">Book a Call</Button>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
