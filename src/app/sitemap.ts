import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { expertises } from "@/content/expertises";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/expertises"), changeFrequency: "monthly", priority: 0.9 },
    ...expertises.map((e) => ({ url: url(`/expertises/${e.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: url("/realisations"), changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: url(`/realisations/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: p.cover.image ? [url(p.cover.image)] : undefined,
    })),
    { url: url("/agence"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/carrieres"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.7 },
  ];
}
