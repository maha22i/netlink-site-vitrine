/**
 * Configuration globale du site.
 * Toutes les coordonnées et liens partagés vivent ici : une seule source de vérité.
 */

export const site = {
  name: "Netlink Solutions",
  shortName: "Netlink",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://netlinksolutions.pro",
  tagline: "Du code au câble.",
  description:
    "Netlink Solutions conçoit, déploie et maintient l’informatique des entreprises : intelligence artificielle et automatisation, développement sur mesure (sites, e-commerce, ERP, CRM), réseaux et infrastructure, cloud computing et fourniture de matériel. Une équipe d’experts dédiée, de Paris à Djibouti.",
  /** Version courte pour la balise meta description (Google tronque au-delà de ~160 caractères). */
  metaDescription:
    "Agence informatique à Paris et Djibouti : IA et automatisation, sites et e-commerce, ERP et CRM, réseau, cloud et matériel. Une seule équipe, du code au câble.",
  logo: "/logo-netlink-solutions.png",
  locale: "fr_FR",
  year: 2026,

  contact: {
    // ⚠️ Vérifie que cette adresse existe avant la mise en ligne.
    email: "contact@netlinksolutions.pro",
    /** Lignes directes, joignables aussi sur WhatsApp. */
    phones: [
      { label: "Djibouti", phone: "+253 77 36 06 07", tel: "tel:+25377360607", whatsapp: "https://wa.me/25377360607" },
      { label: "France", phone: "+33 7 75 84 09 62", tel: "tel:+33775840962", whatsapp: "https://wa.me/33775840962" },
    ],
    hours: "Du lundi au vendredi, 9 h – 19 h",
  },

  locations: [
    { city: "Paris", label: "France", timeZone: "Europe/Paris" },
    { city: "Djibouti", label: "Afrique de l’Est", timeZone: "Africa/Djibouti" },
  ],

  social: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/netlink-solutions-djibouti/" }],

  /** Clients affichés dans « Ils nous font confiance » (logos dans /public/clients). */
  clients: [
    { name: "Groupe Innov", logo: "/clients/groupe-innov.webp", project: "groupe-innov", height: 52 },
    { name: "CNBD", logo: "/clients/cnbd.webp", project: "cnbd", height: 38 },
    { name: "Cabinet Guibère", logo: "/clients/cabinet-guibere.webp", project: "cabinet-guibere", height: 26 },
    { name: "OptimaCall", logo: "/clients/optimacall.webp", project: "optimacall", height: 62 },
    { name: "Pixel Nomade", logo: "/clients/pixel-nomade.webp", project: "pixel-nomade", height: 46 },
    { name: "Silalo", logo: "/clients/silalo.webp", project: "silalo", height: 32 },
  ],
} as const;

export const nav = [
  { label: "Expertises", href: "/expertises" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Agence", href: "/agence" },
  { label: "Carrières", href: "/carrieres" },
] as const;
