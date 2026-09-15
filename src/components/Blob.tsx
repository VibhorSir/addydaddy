/**
 * Purely decorative, low-opacity drifting blob used sparingly behind hero
 * sections. CSS-only animation (no JS, no video), negligible page-speed
 * cost.
 */
export default function Blob({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute animate-blob-drift rounded-full blur-3xl ${className}`}
    />
  );
}
