import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getPastelBg } from "@/lib/pastels";

const STEPS = [
  {
    title: "Audit the numbers",
    body: "We start from your funnel and account data to find where revenue is leaking — before proposing a single channel.",
  },
  {
    title: "Plan for payback",
    body: "Every campaign is scoped against a payback target, with creative and tracking set up to measure it honestly.",
  },
  {
    title: "Launch & test",
    body: "We ship fast and run a structured testing pipeline so winners and losers are decided by data, not opinion.",
  },
  {
    title: "Scale what works",
    body: "Budget flows to what's compounding; we cut what isn't and keep reporting pointed at profit, not vanity metrics.",
  },
];

/**
 * "How we work" — a four-step engagement process. Same visual language as
 * the services grid (pastel number badges + reveal on scroll).
 */
export default function Process() {
  return (
    <section className="border-y border-heading/10 py-20 md:py-28">
      <Container>
        <RevealOnScroll variant="up">
          <h2>How we work</h2>
        </RevealOnScroll>
        <RevealOnScroll variant="up" delay={100}>
          <p className="mt-4 max-w-xl text-body">
            Four steps, no black boxes — from first audit to scaling what
            pays for itself.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <RevealOnScroll key={step.title} variant="up" delay={index * 80}>
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-bold text-heading ${getPastelBg(index)}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[16px]">{step.title}</h3>
              <p className="mt-2 text-body">{step.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
