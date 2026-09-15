import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "invert" | "outline-invert" | "glass";
  className?: string;
}

/**
 * Strict black/white system: "primary"/"outline" are for light surfaces
 * (almost every CTA on the site). "invert"/"outline-invert"/"glass" are
 * dark-surface counterparts (header, dark CTA bands) where black text/
 * borders would disappear. "invert" is the one place pastel is
 * load-bearing rather than decorative. "glass" is the all-white-text pair
 * (solid + outline) used over the hero video, where even pastel-on-button
 * black text isn't wanted.
 */
export default function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-bold transition-transform duration-300 hover:scale-[1.03]";
  const styles = {
    primary: "bg-heading text-background",
    outline: "border border-heading/15 text-heading hover:border-heading/30",
    invert: "bg-pastel-butter text-heading",
    "outline-invert": "border border-white/30 text-white hover:border-white/60",
    glass: "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  }[variant];

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
