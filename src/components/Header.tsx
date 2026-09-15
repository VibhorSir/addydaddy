"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/nav";

/**
 * Sitewide header, deliberately dark (bg-header-bg / fg-header-fg),
 * independent of the light --color-background used by the rest of the
 * site. Sticky at the top so the dark band reads as a consistent brand
 * element across every page.
 *
 * On the homepage only, it starts transparent (a white-tinted glass
 * strip) over the hero video, then swaps to the solid dark bar as soon
 * as the page scrolls past the hero. Everywhere else it's always solid.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        transparent
          ? "border-transparent bg-white/10 backdrop-blur-md"
          : "border-header-border bg-header-bg"
      }`}
    >
      <div className="section-px flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-[18px] font-bold tracking-tight text-header-fg"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" aria-hidden="true" className="h-7 w-auto" />
          Addy<span className="text-pastel-butter">Daddy</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-[14px] transition-colors duration-300 ${
                isActive(link.path)
                  ? "text-pastel-butter"
                  : "text-header-muted hover:text-header-fg"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-pastel-butter px-5 py-2 text-[14px] font-bold text-heading transition-transform duration-300 hover:scale-[1.03]"
          >
            Book a Call
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-header-fg md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="section-px flex flex-col gap-1 border-t border-header-border bg-header-bg pb-6 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-2 py-3 text-[14px] ${
                isActive(link.path)
                  ? "text-pastel-butter"
                  : "text-header-muted hover:text-header-fg"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-pastel-butter px-5 py-3 text-[14px] font-bold text-heading"
          >
            Book a Call
          </Link>
        </nav>
      )}
    </header>
  );
}
