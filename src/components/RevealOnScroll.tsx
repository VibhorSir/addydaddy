"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealVariant = "fade" | "up" | "left" | "right";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  fade: "animate-fade-in",
  up: "animate-slide-in-up",
  left: "animate-slide-in-left",
  right: "animate-slide-in-right",
};

/**
 * Single reusable scroll-reveal wrapper. Every entrance animation in the
 * site goes through this component rather than ad hoc per-component
 * IntersectionObserver code, keeping timing/easing consistent and the
 * animation set small.
 */
export default function RevealOnScroll({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Comp = Tag;

  return (
    <Comp
      ref={ref}
      className={`${visible ? VARIANT_CLASS[variant] : "opacity-0"} ${className}`}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
