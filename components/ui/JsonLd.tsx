/** Inlines a JSON-LD structured-data block. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted (built from our own content).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
