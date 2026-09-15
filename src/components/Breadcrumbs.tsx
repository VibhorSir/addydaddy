import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, type BreadcrumbItem } from "@/lib/seo";

/**
 * Renders the visible breadcrumb trail and its BreadcrumbList JSON-LD from
 * the same `items` array: one source of truth for both.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[14px] text-body/70">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.path} className="flex items-center gap-1">
              {index > 0 && <ChevronRight size={14} className="text-body/40" />}
              {isLast ? (
                <span aria-current="page" className="text-heading">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors duration-300 hover:text-heading">
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
