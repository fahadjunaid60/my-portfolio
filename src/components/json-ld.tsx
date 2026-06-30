// Renders a schema.org JSON-LD block. Pass one object or an array of them.
// Server component — emits a plain <script> with no client JS.
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(Array.isArray(data) ? data : [data]);
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; we only guard the </script> sequence.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
