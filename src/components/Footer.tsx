import Link from "next/link";
import { navLinks } from "@/data/nav";
import { BUSINESS_INFO, SITE_NAME } from "@/lib/seo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-px border-t border-black/10 bg-background py-12 md:py-16">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="flex items-center gap-2 text-[18px] font-bold text-heading">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" aria-hidden="true" className="h-6 w-auto" />
            AdyDaddy
          </p>
          <p className="mt-3 text-body">
            Performance marketing agency helping D2C and growth-stage brands
            turn ad spend into predictable, profitable revenue.
          </p>
        </div>

        <div className="flex flex-wrap gap-10 md:gap-16">
          <div>
            <p className="text-[14px] font-bold text-heading">Sitemap</p>
            <ul className="mt-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-body transition-colors duration-300 hover:text-heading"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] font-bold text-heading">Contact</p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.contactPoint.email}`}
                  className="text-body transition-colors duration-300 hover:text-heading"
                >
                  {BUSINESS_INFO.contactPoint.email}
                </a>
              </li>
              <li className="text-body">{BUSINESS_INFO.contactPoint.telephone}</li>
            </ul>
          </div>

          <div>
            <p className="text-[14px] font-bold text-heading">Follow</p>
            <ul className="mt-3 flex flex-col gap-2">
              {BUSINESS_INFO.sameAs.map((href) => {
                const label = new URL(href).hostname.replace("www.", "").split(".")[0];
                return (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="capitalize text-body transition-colors duration-300 hover:text-heading"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-black/10 pt-6 text-[14px] text-body/70">
        © {year} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
