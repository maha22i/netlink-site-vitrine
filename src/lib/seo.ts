import type { Metadata } from "next";
import { site } from "@/content/site";
import { expertises, type Expertise } from "@/content/expertises";
import type { Project } from "@/content/projects";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Chemin d’une image de partage propre à la page (sinon l’image par défaut du site). */
  image?: { url: string; alt: string };
};

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

/** Image de partage par défaut (app/opengraph-image.tsx). */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

/**
 * Métadonnées homogènes pour chaque page : canonical, Open Graph, Twitter.
 * `openGraph` d’une page remplace entièrement celui du layout, et l’emporte sur un fichier
 * `opengraph-image` du segment : l’image doit donc toujours être donnée ici.
 */
export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const images = [image ? { ...defaultOgImage, ...image } : defaultOgImage];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images,
    },
  };
}

/** Organisation et site web (schema.org), injectés dans le layout sur toutes les pages. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORGANIZATION_ID,
        name: site.name,
        alternateName: site.shortName,
        slogan: site.tagline,
        url: site.url,
        logo: { "@type": "ImageObject", url: absoluteUrl(site.logo), width: 2172, height: 724 },
        image: absoluteUrl(defaultOgImage.url),
        description: site.description,
        email: site.contact.email,
        telephone: site.contact.phones[0].phone,
        contactPoint: site.contact.phones.map((p) => ({
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: p.phone,
          email: site.contact.email,
          areaServed: p.label === "France" ? "FR" : "DJ",
          availableLanguage: ["French"],
        })),
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:00",
        },
        sameAs: site.social.map((s) => s.href),
        areaServed: [
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Djibouti" },
        ],
        address: [
          { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
          { "@type": "PostalAddress", addressLocality: "Djibouti", addressCountry: "DJ" },
        ],
        knowsAbout: [
          "Intelligence artificielle",
          "Automatisation",
          "Développement web",
          "E-commerce",
          "ERP",
          "CRM",
          "Réseaux informatiques",
          "Cloud computing",
          "Microsoft 365",
          "Matériel informatique",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Expertises",
          itemListElement: expertises.map((e) => ({
            "@type": "Offer",
            itemOffered: { "@id": serviceId(e.slug) },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        description: site.metaDescription,
        inLanguage: "fr-FR",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

const serviceId = (slug: string) => absoluteUrl(`/expertises/${slug}#service`);

/** Une expertise décrite comme un service proposé par l’agence. */
export function serviceJsonLd(expertise: Expertise) {
  const url = absoluteUrl(`/expertises/${expertise.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(expertise.slug),
    name: expertise.title,
    serviceType: expertise.short,
    description: expertise.seo.description,
    url,
    image: absoluteUrl(`/expertises/${expertise.slug}/opengraph-image`),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: ["FR", "DJ"],
    availableLanguage: "fr",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: expertise.title,
      itemListElement: expertise.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.text },
      })),
    },
  };
}

/** Une réalisation décrite comme une étude de cas signée par l’agence. */
export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/realisations/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#projet`,
    name: `${project.name} — ${project.kind}`,
    headline: project.name,
    description: project.summary,
    url,
    inLanguage: "fr-FR",
    dateCreated: project.year,
    image: project.cover.image ? absoluteUrl(project.cover.image) : `${url}/opengraph-image`,
    creator: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "Organization",
      name: project.client,
      url: project.restricted ? undefined : project.url,
      address: { "@type": "PostalAddress", addressLocality: project.location },
    },
    keywords: [...project.services, ...project.stack].join(", "),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Sérialisation sûre pour <script type="application/ld+json">. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
