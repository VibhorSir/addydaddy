import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Blob from "@/components/Blob";
import Marquee from "@/components/Marquee";
import Button from "@/components/Button";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildFaqSchema, SITE_DESCRIPTION } from "@/lib/seo";
import { services } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";
import { generalFaqs } from "@/data/faqs";
import { clientLogos } from "@/data/clients";
import { getServiceIcon } from "@/lib/icons";
import { getPastelBg } from "@/lib/pastels";

export const metadata: Metadata = buildMetadata({
  title: "Addy Daddy: Performance Marketing Agency",
  description: SITE_DESCRIPTION,
  path: "/",
});

const STATS = [
  { label: "Avg. blended ROAS lift", value: "1.8x" },
  { label: "Avg. organic traffic growth", value: "4.1x" },
  { label: "Ad spend managed monthly", value: "₹2Cr+" },
  { label: "Client retention rate", value: "94%" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(generalFaqs)} />

      {/* Hero: full-bleed video background. The header sits transparent
          on top of it (see Header.tsx) via the negative margin below,
          which pulls this section up under the header's normal flow
          height, then re-pads by the same amount. */}
      <section className="relative -mt-16 overflow-hidden pt-16 md:-mt-20 md:pt-20">
        {/* Compressed, poster-backed, metadata-only preload. See README
            for how to swap this clip. */}
        <video
          className="absolute inset-0 -z-20 h-full w-full scale-125 object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* The video is black, so a dark scrim keeps white text at
            consistent contrast regardless of what's playing underneath. */}
        <div className="absolute inset-0 -z-10 bg-black/45" />

        <Container className="relative py-28 md:py-40">
          <div className="max-w-2xl">
            <RevealOnScroll variant="up">
              <span className="inline-block rounded-full border border-pastel-sky/50 bg-pastel-sky/10 px-3 py-1 text-[14px] font-bold text-header-fg backdrop-blur-sm">
                Performance Marketing Agency
              </span>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={100}>
              <h1 className="mt-4 text-header-fg">
                Marketing that&apos;s judged on revenue, not reach.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={200}>
              <p className="mt-6 max-w-xl text-header-muted">
                Addy Daddy plans, builds, and scales paid media, SEO, and
                content programs for D2C and growth-stage brands, with
                every engagement scoped against payback, not vanity metrics.
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" variant="glass">Book a Call</Button>
                <Button href="/portfolio" variant="outline-invert">
                  See Our Work
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Client marquee */}
      <section className="py-10">
        <Container>
          <RevealOnScroll variant="fade">
            <p className="text-center text-[14px] text-body/60">
              Brands we&apos;ve worked with
            </p>
          </RevealOnScroll>
        </Container>
        <div className="mt-6">
          <Marquee>
            {clientLogos.map((client) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={client.name}
                src={client.src}
                alt={client.name}
                className="h-8 w-auto object-contain md:h-10"
              />
            ))}
          </Marquee>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <Container>
          <RevealOnScroll variant="up">
            <h2>What we do</h2>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={100}>
            <p className="mt-4 max-w-xl text-body">
              Six disciplines, one team, all pointed at the same number:
              profitable revenue growth.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <RevealOnScroll key={service.slug} variant="up" delay={index * 80}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-heading/10 p-6 transition-colors duration-300 hover:border-heading/30"
                  >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full text-heading ${getPastelBg(index)}`}>
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 text-[16px]">{service.name}</h3>
                    <p className="mt-2 flex-1 text-body">{service.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-bold text-heading">
                      Learn more
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-heading/10 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, index) => (
              <RevealOnScroll key={stat.label} variant="up" delay={index * 80}>
                <p className="text-heading" style={{ fontSize: "36px", fontWeight: 700 }}>
                  {stat.value}
                </p>
                <p className="mt-2 text-body">{stat.label}</p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio preview */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <RevealOnScroll variant="up">
              <h2>Recent results</h2>
            </RevealOnScroll>
            <RevealOnScroll variant="up" delay={100}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1 text-[14px] font-bold text-heading underline-offset-4 hover:underline"
              >
                View all case studies <ArrowUpRight size={16} />
              </Link>
            </RevealOnScroll>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {portfolioItems.map((item, index) => (
              <RevealOnScroll key={item.slug} variant="up" delay={index * 100}>
                <Link href={`/portfolio/${item.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.heroImage.src}
                      alt={item.heroImage.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-[14px] text-body/60">{item.industry}</p>
                  <h3 className="mt-1 text-[18px]">{item.clientName}</h3>
                  <p className="mt-2 text-body">{item.summary}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <Container className="mx-auto max-w-3xl">
          <RevealOnScroll variant="up">
            <h2>Frequently asked</h2>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={100} className="mt-10">
            <FaqAccordion faqs={generalFaqs} />
          </RevealOnScroll>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="pb-24">
        <Container>
          <RevealOnScroll variant="up">
            <div className="relative overflow-hidden rounded-3xl bg-header-bg px-8 py-16 text-center md:px-16">
              <Blob className="-top-16 left-1/4 h-56 w-56 bg-pastel-butter/30" />
              <Blob className="-bottom-20 right-1/4 h-56 w-56 bg-pastel-mint/25" />
              <h2 className="relative text-header-fg">Ready to scale profitably?</h2>
              <p className="relative mx-auto mt-4 max-w-lg text-header-muted">
                Tell us about your brand and where growth has stalled, and
                we&apos;ll tell you honestly whether we can move the number.
              </p>
              <div className="relative mt-8 flex justify-center">
                <Button href="/contact" variant="invert">Book a Call</Button>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
