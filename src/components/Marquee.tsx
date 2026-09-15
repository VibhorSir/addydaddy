import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee. Duplicates its children once so the
 * looping 50% translateX in the `marquee` keyframe is seamless.
 */
export default function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-16">
        <div className="flex items-center gap-16">{children}</div>
        <div className="flex items-center gap-16" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
