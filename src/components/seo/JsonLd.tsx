/**
 * Renders a JSON-LD structured-data script tag.
 * Server component — safe to embed schema.org objects for SEO rich results.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
