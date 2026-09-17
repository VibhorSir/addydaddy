import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import { partners } from "@/data/partners";

/**
 * "Backed by trusted partners" — a social-proof band listing official
 * platform partnerships. A subtle off-white strip keeps it distinct from
 * the client-logo marquee above it while staying within the black/white
 * + pastel system.
 */
export default function TrustedPartners() {
  return (
    <section className="border-y border-heading/10 bg-[#fafafa] py-16 md:py-20">
      <Container>
        <RevealOnScroll variant="up">
          <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-body/60">
            Backed by trusted partners
          </p>
        </RevealOnScroll>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {partners.map((partner, index) => (
            <RevealOnScroll key={partner.name} variant="up" delay={index * 100}>
              <div className="flex flex-col items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain"
                />
                <span className="text-[14px] font-semibold text-body">
                  {partner.label}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
