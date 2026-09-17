import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/data/services";
import { getServiceIcon } from "@/lib/icons";
import { getPastelBg } from "@/lib/pastels";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Performance marketing, SEO, social media, content, CRM, and CRO services from AdyDaddy, each built around one goal: profitable revenue growth.",
  path: "/services",
});

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <RevealOnScroll variant="up" className="mt-6">
            <h1>Services built around revenue, not deliverables</h1>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={100} className="mt-4">
            <p className="max-w-xl text-body">
              Every service below can run standalone or as part of a
              full-funnel program. Pick what your growth stage needs.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <RevealOnScroll key={service.slug} variant="up" delay={index * 80}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-heading/10 p-8 transition-colors duration-300 hover:border-heading/30"
                  >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full text-heading ${getPastelBg(index)}`}>
                      <Icon size={22} />
                    </span>
                    <h2 className="mt-5 text-[18px]">{service.name}</h2>
                    <p className="mt-3 flex-1 text-body">{service.shortDescription}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-bold text-heading">
                      View service
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>

          <RevealOnScroll variant="up" className="mt-16 text-center">
            <h2>Not sure where to start?</h2>
            <p className="mx-auto mt-3 max-w-md text-body">
              Tell us your growth bottleneck and we&apos;ll recommend the
              right starting point.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/contact">Book a Call</Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
