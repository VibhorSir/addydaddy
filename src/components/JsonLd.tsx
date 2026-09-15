/**
 * Renders a JSON-LD object as a <script type="application/ld+json"> tag.
 * Always feed it output from one of the builders in `src/lib/seo.ts`.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
