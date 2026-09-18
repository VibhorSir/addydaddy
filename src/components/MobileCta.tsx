"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Sticky bottom "Book a Call" bar, mobile only. Appears after the visitor
 * scrolls past the hero and hides itself on the contact page (where the
 * form already is). Fills the gap left by the header CTA being hidden on
 * small screens.
 */
export default function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-header-border bg-header-bg/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/contact"
        className="flex items-center justify-center rounded-full bg-pastel-butter px-6 py-3 text-[14px] font-bold text-heading"
      >
        Book a Call
      </Link>
    </div>
  );
}
