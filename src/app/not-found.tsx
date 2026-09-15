import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="py-24 text-center md:py-32">
      <Container>
        <h1>Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-body">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Back to home</Button>
        </div>
      </Container>
    </section>
  );
}
