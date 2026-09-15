import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildServiceReviewSchema } from "@/lib/seo";
import { portfolioItems, getPortfolioItemBySlug } from "@/data/portfolio";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) return {};

  return buildMetadata({
    title: item.seoTitle,
    description: item.seoDescription,
    path: `/portfolio/${item.slug}`,
    ogImage: item.heroImage.src,
  });
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) notFound();

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: item.clientName, path: `/portfolio/${item.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={buildServiceReviewSchema({
          name: `${item.servicesUsed.join(" + ")} for ${item.clientName}`,
          description: item.seoDescription,
          path: `/portfolio/${item.slug}`,
          image: item.heroImage.src,
          reviews: item.reviews,
        })}
      />

      <section className="py-16 md:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <RevealOnScroll variant="up" className="mt-6">
            <span className="inline-block rounded-full bg-pastel-blush px-3 py-1 text-[14px] font-bold text-heading">
              {item.industry}
            </span>
            <h1 className="mt-3">{item.clientName}</h1>
            <p className="mt-4 max-w-2xl text-body">{item.summary}</p>
          </RevealOnScroll>

          <RevealOnScroll variant="fade" delay={100} className="mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.heroImage.src}
              alt={item.heroImage.alt}
              className="aspect-[16/9] w-full rounded-2xl object-cover"
            />
          </RevealOnScroll>

          <div className="mt-10 flex flex-wrap gap-3">
            {item.servicesUsed.map((service) => (
              <span
                key={service}
                className="rounded-full border border-heading/15 px-4 py-1.5 text-[14px] text-body"
              >
                {service}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-heading/10 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <RevealOnScroll variant="up">
              <h2>The challenge</h2>
              <p className="mt-4 text-body">{item.challenge}</p>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={100}>
              <h2>Our approach</h2>
              <p className="mt-4 text-body">{item.approach}</p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="border-t border-heading/10 py-16 md:py-24">
        <Container>
          <RevealOnScroll variant="up">
            <h2>The results</h2>
          </RevealOnScroll>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {item.results.map((stat, index) => (
              <RevealOnScroll key={stat.label} variant="up" delay={index * 80}>
                <div className="rounded-2xl border border-heading/10 p-6">
                  <p className="text-heading" style={{ fontSize: "32px", fontWeight: 700 }}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-body">{stat.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {item.reviews.length > 0 && (
            <RevealOnScroll variant="up" delay={200} className="mt-12">
              {item.reviews.map((review) => (
                <blockquote
                  key={review.authorName}
                  className="relative rounded-2xl bg-header-bg p-8 text-header-fg md:p-12"
                >
                  <Quote size={28} className="text-pastel-butter" />
                  <p className="mt-4 max-w-2xl text-[18px] leading-relaxed">
                    {review.reviewBody}
                  </p>
                  <cite className="mt-6 block text-[14px] not-italic text-header-muted">
                    {review.authorName}
                  </cite>
                </blockquote>
              ))}
            </RevealOnScroll>
          )}
        </Container>
      </section>

      <section className="border-t border-heading/10 py-16 md:py-24">
        <Container className="text-center">
          <RevealOnScroll variant="up">
            <h2>Want results like this?</h2>
            <div className="mt-6 flex justify-center">
              <Button href="/contact">Book a Call</Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
