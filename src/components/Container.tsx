import type { ElementType, ReactNode } from "react";

/**
 * The one universal horizontal padding convention used on virtually every
 * top-level section: px-5 on mobile, md:px-[100px] on desktop.
 */
export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={`section-px ${className}`}>{children}</Tag>;
}
