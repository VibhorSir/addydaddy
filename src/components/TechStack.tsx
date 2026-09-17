import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import { techStack } from "@/data/techStack";
import { getPastelBg } from "@/lib/pastels";

/**
 * "Our tech stack" — the platforms the agency buys, builds, and automates
 * on. Rendered as a grid of circular badges (white, with a soft pastel
 * halo echoing the site's pastel palette) so the brand marks read as the
 * focal point, matching the reference layout without breaking the design
 * system.
 */
export default function TechStack() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <RevealOnScroll variant="up">
          <h2>Our tech stack</h2>
        </RevealOnScroll>
        <RevealOnScroll variant="up" delay={100}>
          <p className="mt-4 max-w-xl text-body">
            From customer acquisition to retention and automation, we leverage
            best-in-class platforms to deliver measurable business outcomes.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {techStack.map((tool, index) => (
            <RevealOnScroll key={tool.name} variant="up" delay={index * 60}>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
                  {/* Soft pastel halo behind the badge */}
                  <span
                    aria-hidden="true"
                    className={`absolute -top-2 left-1/2 h-[74px] w-[74px] -translate-x-1/2 rounded-full ${getPastelBg(index)}`}
                  />
                  {/* White circular badge */}
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tool.logo}
                      alt=""
                      aria-hidden="true"
                      className="h-8 w-8 object-contain"
                    />
                  </span>
                </div>
                <p className="text-[15px] font-bold text-heading">{tool.name}</p>
                <p className="mt-0.5 text-[13px] text-body/70">{tool.role}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
