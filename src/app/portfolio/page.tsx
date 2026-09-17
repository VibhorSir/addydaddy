import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { portfolioItems } from "@/data/portfolio";
import { getPastelBg } from "@/lib/pastels";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Case studies from AdyDaddy: real ROAS, traffic, and retention results delivered for D2C and growth-stage brands.",
  path: "/portfolio",
});

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <RevealOnScroll variant="up" className="mt-6">
            <h1>Results, not just relationships</h1>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={100} className="mt-4">
            <p className="max-w-xl text-body">
              A sample of the outcomes we&apos;ve driven for clients across
              beauty, apparel, and food & beverage.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                  <h2 className="mt-1 text-[18px]">{item.clientName}</h2>
                  <p className="mt-2 text-body">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.results.slice(0, 2).map((stat, statIndex) => (
                      <span
                        key={stat.label}
                        className={`rounded-full px-3 py-1 text-[14px] font-bold text-heading ${getPastelBg(statIndex)}`}
                      >
                        {stat.value} {stat.label}
                      </span>
                    ))}
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
