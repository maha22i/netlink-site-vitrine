import { jsonLd } from "@/lib/seo";

/** Données structurées schema.org, lues par les moteurs de recherche. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}
