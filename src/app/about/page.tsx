import type { Metadata } from "next";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Addy Daddy is a performance marketing agency built by media buyers and growth marketers who treat ad spend as an investment, not a budget line.",
  path: "/about",
});

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const VALUES = [
  {
    title: "Revenue over reach",
    body: "Every recommendation is weighed against payback period and profitable revenue, not impressions or follower counts.",
  },
  {
    title: "Show the work",
    body: "You get the same dashboards and raw numbers we look at internally. No black-box reporting.",
  },
  {
    title: "Test in public",
    body: "We tell you what we're testing and why before results come in, not just the wins after the fact.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <RevealOnScroll variant="up" className="mt-6">
            <h1>Built by people who&apos;ve run the ad accounts</h1>
          </RevealOnScroll>
          <RevealOnScroll variant="up" delay={100} className="mt-4">
            <p className="max-w-2xl text-body">
              Addy Daddy started because too many brands were paying agency
              fees for reporting decks instead of results. We&apos;re a small,
              senior team that runs performance marketing, SEO, and content
              the way we&apos;d want it run for our own brand.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-heading/10 py-16 md:py-24">
        <Container>
          <RevealOnScroll variant="up">
            <h2>What we believe</h2>
          </RevealOnScroll>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <RevealOnScroll key={value.title} variant="up" delay={index * 100}>
                <p className="text-heading" style={{ fontSize: "20px", fontWeight: 700 }}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-[16px]">{value.title}</h3>
                <p className="mt-2 text-body">{value.body}</p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-heading/10 py-16 md:py-24">
        <Container className="text-center">
          <RevealOnScroll variant="up">
            <h2>Let&apos;s see if we&apos;re a fit</h2>
            <p className="mx-auto mt-3 max-w-md text-body">
              A short call is usually enough to know whether we can move
              your numbers.
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
