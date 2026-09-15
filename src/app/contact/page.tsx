import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/Container";
import RevealOnScroll from "@/components/RevealOnScroll";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { buildMetadata, BUSINESS_INFO } from "@/lib/seo";
import { getPastelBg } from "@/lib/pastels";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Addy Daddy to talk about performance marketing, SEO, or content for your brand.",
  path: "/contact",
});

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const address = BUSINESS_INFO.address;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />
        <RevealOnScroll variant="up" className="mt-6">
          <h1>Let&apos;s talk about your growth</h1>
        </RevealOnScroll>
        <RevealOnScroll variant="up" delay={100} className="mt-4">
          <p className="max-w-xl text-body">
            Tell us about your brand and current numbers, and we&apos;ll
            follow up within one business day.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.4fr]">
          <RevealOnScroll variant="left" className="flex flex-col gap-6">
            <ContactDetail icon={Mail} label="Email" index={0}>
              <a href={`mailto:${BUSINESS_INFO.contactPoint.email}`} className="hover:text-heading">
                {BUSINESS_INFO.contactPoint.email}
              </a>
            </ContactDetail>
            <ContactDetail icon={Phone} label="Phone" index={1}>
              {BUSINESS_INFO.contactPoint.telephone}
            </ContactDetail>
            <ContactDetail icon={MapPin} label="Office" index={2}>
              {address.streetAddress}, {address.addressLocality},{" "}
              {address.addressRegion} {address.postalCode}
            </ContactDetail>
          </RevealOnScroll>

          <RevealOnScroll variant="right" delay={100}>
            <ContactForm />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  index,
  children,
}: {
  icon: typeof Mail;
  label: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-heading ${getPastelBg(index)}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="text-[14px] font-bold text-heading">{label}</p>
        <p className="mt-1 text-body">{children}</p>
      </div>
    </div>
  );
}
