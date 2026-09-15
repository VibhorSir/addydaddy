import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildServiceSchema, buildFaqSchema } from "@/lib/seo";
import { services, getServiceBySlug } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";
import { getPastelBg } from "@/lib/pastels";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    ogImage: service.heroImage.src,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedCaseStudies = portfolioItems.filter((item) =>
    item.servicesUsed.includes(service.name)
  );

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: service.name,
          description: service.seoDescription,
          path: `/services/${service.slug}`,
          image: service.heroImage.src,
        })}
      />
      <JsonLd data={buildFaqSchema(service.faqs)} />

      <section className="py-16 md:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <RevealOnScroll variant="up">
                <h1>{service.name}</h1>
              </RevealOnScroll>
              <RevealOnScroll variant="up" delay={100}>
                <p className="mt-4 text-body">{service.overview}</p>
              </RevealOnScroll>
              <RevealOnScroll variant="up" delay={200}>
                <div className="mt-8">
                  <Button href="/contact">Book a Call</Button>
                </div>
              </RevealOnScroll>
            </div>
            <RevealOnScroll variant="fade" delay={100}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.heroImage.src}
                alt={service.heroImage.alt}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="border-t border-heading/10 py-16 md:py-24">
        <Container>
          <RevealOnScroll variant="up">
            <h2>What&apos;s included</h2>
          </RevealOnScroll>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {service.deliverables.map((item, index) => (
              <RevealOnScroll key={item} variant="up" delay={index * 60}>
                <div className="flex items-start gap-3 rounded-xl border border-heading/10 p-5">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-heading ${getPastelBg(index)}`}>
                    <Check size={14} />
                  </span>
                  <span className="text-body">{item}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {relatedCaseStudies.length > 0 && (
        <section className="border-t border-heading/10 py-16 md:py-24">
          <Container>
            <RevealOnScroll variant="up">
              <h2>Results from this service</h2>
            </RevealOnScroll>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedCaseStudies.map((item, index) => (
                <RevealOnScroll key={item.slug} variant="up" delay={index * 80}>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="block rounded-2xl border border-heading/10 p-6 transition-colors duration-300 hover:border-heading/30"
                  >
                    <p className="text-[14px] text-body/60">{item.industry}</p>
                    <h3 className="mt-1 text-[16px]">{item.clientName}</h3>
                    <p className="mt-2 text-body">{item.summary}</p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-heading/10 py-16 md:py-24">
        <Container className="mx-auto max-w-3xl">
          <RevealOnScroll variant="up">
            <h2>Common questions</h2>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={100} className="mt-10">
            <FaqAccordion faqs={service.faqs} />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
