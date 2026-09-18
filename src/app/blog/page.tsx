import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Original writing on D2C performance marketing: ROAS, paid media, creative, retention, and CRO. No recycled playbooks.",
  path: "/blog",
});

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />
        <RevealOnScroll variant="up" className="mt-6">
          <h1>Notes on performance marketing</h1>
        </RevealOnScroll>
        <RevealOnScroll variant="up" delay={100} className="mt-4">
          <p className="max-w-xl text-body">
            What we&apos;re seeing in real ad accounts, funnels, and P&amp;Ls.
            No recycled playbooks.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <RevealOnScroll key={post.slug} variant="up" delay={index * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-heading/10 p-6 transition-colors duration-300 hover:border-heading/30"
              >
                <div className="flex items-center gap-2 text-[13px] text-body/60">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-3 text-[18px]">{post.title}</h2>
                <p className="mt-2 flex-1 text-body">{post.description}</p>
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
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
