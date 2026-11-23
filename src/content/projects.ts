import covers from "./covers.json";

export type ProjectCategory = "Site" | "Plateforme" | "E-commerce" | "IA";

export type Project = {
  slug: string;
  name: string;
  client: string;
  year: string;
  location: string;
  category: ProjectCategory;
  /** Type de projet affiché en sous-titre. */
  kind: string;
  url: string;
  /** Domaine affiché (sans protocole). */
  domain: string;
  /** Application protégée par une connexion : on l’indique plutôt que de promettre une visite. */
  restricted?: boolean;
  summary: string;
  context: string;
  approach: string;
  result: string;
  services: string[];
  stack: string[];
  /** Expertises associées (slugs). */
  expertises: string[];
  cover: {
    /** Fond de la couverture. */
    bg: string;
    /** Couleur du texte sur la couverture. */
    fg: string;
    /**
     * Capture d’écran optionnelle dans /public/work/<slug>.jpg.
     * Génère-les avec `npm run capture` (voir scripts/capture-screenshots.mjs).
     */
    image?: string;
  };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "groupe-innov",
    name: "Groupe Innov",
    client: "Groupe Innov",
    year: "2025",
    location: "Noisy-le-Grand",
    category: "Site",
    kind: "Site corporate",
    url: "https://groupe-innov.fr/",
    domain: "groupe-innov.fr",
    summary:
      "Le site d’un intégrateur bureautique et télécom qui veut parler aux PME comme un partenaire, pas comme un catalogue.",
    context:
      "Groupe Innov accompagne les PME d’Île-de-France sur l’impression, la téléphonie IP, le support informatique et la sécurité. L’enjeu : une offre très large, qu’un dirigeant devait pouvoir comprendre en quelques secondes.",
    approach:
      "Nous avons restructuré l’offre en cinq univers de solutions et construit le parcours autour d’une promesse simple : un interlocuteur unique et un audit offert. Direction artistique inspirée des codes de l’imprimerie, témoignages, marques partenaires et prise de rendez-vous directe.",
    result:
      "Un site rapide et lisible, pensé pour le référencement local, qui transforme une visite en demande d’audit qualifiée.",
    services: ["Direction artistique", "Développement", "Référencement naturel"],
    stack: ["Next.js", "Tailwind CSS", "TypeScript"],
    expertises: ["developpement"],
    cover: { bg: "#241C33", fg: "#EDE7F6" },
    featured: true,
  },
  {
    slug: "orkiva",
    name: "Orkiva",
    client: "Produit Netlink",
    year: "2026",
    location: "Paris · Djibouti",
    category: "IA",
    kind: "Plateforme d’agents IA",
    url: "https://app.getorkiva.com/",
    domain: "getorkiva.com",
    restricted: true,
    summary:
      "Une plateforme où chaque agent IA a un métier : prospection par e-mail, marketing, assistanat. Ils collaborent comme une vraie équipe.",
    context:
      "Les PME veulent profiter de l’IA mais n’ont ni le temps ni les compétences pour assembler des outils disparates. Elles ont besoin d’agents qui comprennent leur activité et produisent un travail utilisable, pas d’un simple chatbot.",
    approach:
      "Nous avons conçu Orkiva comme une équipe d’agents spécialisés, chacun doté d’un rôle, d’outils et d’une mémoire propres : un agent de prospection qui rédige et envoie des campagnes personnalisées, un agent marketing qui produit visuels et publications, un assistant personnel. Les agents se passent le relais sur des tâches communes.",
    result:
      "Un produit en exploitation, qui sert aussi de socle aux agents métiers que nous déployons pour nos clients.",
    services: ["Conception produit", "Ingénierie IA", "Développement SaaS"],
    stack: ["Next.js", "Python", "Claude API", "PostgreSQL", "Docker"],
    expertises: ["intelligence-artificielle", "developpement"],
    cover: { bg: "#111111", fg: "#F2F0EA" },
    featured: true,
  },
  {
    slug: "cabinet-guibere",
    name: "Cabinet Guibère",
    client: "Maître Jean-Claude Guibère",
    year: "2025",
    location: "Bobigny",
    category: "Site",
    kind: "Site d’avocat & ventes aux enchères",
    url: "https://guibere.fr/",
    domain: "guibere.fr",
    summary:
      "Un cabinet spécialisé en droit immobilier dont le site devient un véritable outil de ventes aux enchères.",
    context:
      "Avocat au Barreau de la Seine-Saint-Denis, Maître Guibère intervient en droit immobilier et en saisie immobilière. Les acheteurs potentiels cherchaient les biens mis en vente par commune, sans trouver d’information claire sur le déroulement d’une enchère.",
    approach:
      "Nous avons conçu une section dédiée aux ventes judiciaires : une fiche par bien, des pages par commune pour le référencement local, une FAQ pédagogique et un formulaire de dépôt d’offre. Une écriture sobre, en noir et blanc, à la hauteur de la profession.",
    result:
      "Chaque vente dispose de sa vitrine en ligne, et les questions récurrentes trouvent leur réponse avant même l’appel au cabinet.",
    services: ["Stratégie de contenu", "Développement", "Référencement local"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    expertises: ["developpement"],
    cover: { bg: "#DCD8CE", fg: "#151A2B" },
    featured: true,
  },
  {
    slug: "optimacrm",
    name: "OptimaCRM",
    client: "Groupe Innov",
    year: "2025",
    location: "France",
    category: "Plateforme",
    kind: "SaaS de facturation & CRM",
    url: "https://facturationgroupinnov.optimacrm.fr/login",
    domain: "optimacrm.fr",
    restricted: true,
    summary:
      "Devis, factures, prélèvements et suivi client réunis dans un outil multi-sociétés hébergé en France.",
    context:
      "La facturation de Groupe Innov reposait sur des tableurs et des saisies manuelles, entre plusieurs sociétés et plusieurs outils, avec un risque d’erreur à chaque prélèvement.",
    approach:
      "Nous avons développé OptimaCRM, une plateforme multi-sociétés : devis et factures en quelques clics, génération des fichiers de prélèvement SEPA, fiches clients complètes et tableaux de bord en temps réel. Connexion avec les comptes Microsoft des collaborateurs.",
    result:
      "La facturation mensuelle se pilote depuis un seul écran, prélèvements compris.",
    services: ["Conception fonctionnelle", "Développement SaaS", "Hébergement"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Microsoft Entra ID"],
    expertises: ["developpement", "cloud"],
    cover: { bg: "#0F3A36", fg: "#E4F1EC" },
    featured: true,
  },
  {
    slug: "cnbd",
    name: "CNBD",
    client: "CNBD",
    year: "2025",
    location: "Les Pavillons-sous-Bois",
    category: "Site",
    kind: "Site corporate",
    url: "https://cnbd.fr/",
    domain: "cnbd.fr",
    summary:
      "Matériel informatique, bureautique Canon, téléphonie et GED : une offre large rendue simple à parcourir.",
    context:
      "CNBD accompagne les entreprises d’Île-de-France sur l’ensemble de leur équipement informatique et bureautique. L’étendue de l’offre était sa force, mais aussi ce qui rendait son site difficile à lire.",
    approach:
      "Nous avons organisé le site par lignes de services (informatique, bureautique, GED, téléphonie, audit, financement, maintenance) avec un parcours commun qui mène toujours à l’audit gratuit. Une page dédiée valorise l’offre Canon.",
    result:
      "Un site corporate clair, prêt à accompagner la prospection de CNBD auprès des cabinets et des PME.",
    services: ["Architecture de l’information", "Développement", "Référencement"],
    stack: ["Next.js", "Tailwind CSS"],
    expertises: ["developpement", "materiel-informatique"],
    cover: { bg: "#7E1F1A", fg: "#FBEDEA" },
  },
  {
    slug: "optimacall",
    name: "OptimaCall",
    client: "OptimaCall",
    year: "2025",
    location: "France",
    category: "Site",
    kind: "Site de centre d’appels",
    url: "https://www.optimacall.fr/",
    domain: "optimacall.fr",
    summary:
      "Le site d’un centre d’appels externalisé qui promet qu’aucun appel ne sera plus jamais manqué.",
    context:
      "OptimaCall prend en charge l’accueil téléphonique des entreprises : prise de messages, support client, prise de rendez-vous. Il fallait inspirer confiance à des secteurs exigeants comme la santé ou l’immobilier.",
    approach:
      "Une page d’accueil portée par une vidéo plein écran, des services présentés étape par étape et des témoignages clients. Le discours met en avant la continuité de service et la qualité d’accueil.",
    result:
      "Une vitrine professionnelle qui rassure dès le premier écran.",
    services: ["Direction artistique", "Développement", "Rédaction"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    expertises: ["developpement"],
    cover: { bg: "#13283B", fg: "#E3ECF4" },
  },
  {
    slug: "pixel-nomade",
    name: "Pixel Nomade",
    client: "Pixel Nomade",
    year: "2025",
    location: "Djibouti",
    category: "Site",
    kind: "Studio créatif & média",
    url: "https://pixel-nomade.com/",
    domain: "pixel-nomade.com",
    summary:
      "La vitrine d’un studio créatif djiboutien : vidéo, événementiel, marketing digital et services assistés par l’IA.",
    context:
      "Pixel Nomade réunit plusieurs pôles (PixEvent pour l’événementiel, PixTV pour la vidéo) et s’adresse aussi bien aux restaurants et hôtels qu’aux familles qui préparent un mariage.",
    approach:
      "Un site guidé par l’image, qui présente chaque division comme une marque à part entière tout en gardant une identité commune. Mise en avant du matériel de tournage, des réalisations et des partenaires.",
    result:
      "Une présence en ligne à la hauteur des productions du studio, et un point d’entrée unique pour ses différentes activités.",
    services: ["Identité numérique", "Développement", "Automatisation des réseaux sociaux"],
    stack: ["Next.js", "n8n", "Claude API"],
    expertises: ["developpement", "intelligence-artificielle"],
    cover: { bg: "#C2502B", fg: "#FFF3EC" },
  },
  {
    slug: "pixel-nomade-gestion",
    name: "Pointer",
    client: "Pixel Nomade",
    year: "2026",
    location: "Djibouti",
    category: "Plateforme",
    kind: "Gestion financière & pointage",
    url: "https://gestion.pixel-nomade.com/",
    domain: "gestion.pixel-nomade.com",
    restricted: true,
    summary:
      "Devis, factures, paiements, dépenses et pointage des équipes : la trésorerie lisible à chaque instant.",
    context:
      "En pleine croissance, Pixel Nomade suivait sa trésorerie et la présence de ses équipes sur des supports éparpillés. Impossible d’avoir une vision fiable de la situation financière d’un coup d'œil.",
    approach:
      "Une application interne centrée sur trois promesses : la vision (flux de trésorerie à jour), la vitesse (actions courantes en quelques clics) et la fiabilité (données centralisées). Un module de pointage et de journée de travail complète l’outil.",
    result:
      "Les associés pilotent l’activité depuis un tableau de bord unique, sur ordinateur comme sur téléphone.",
    services: ["Conception fonctionnelle", "Développement", "Hébergement"],
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    expertises: ["developpement", "cloud"],
    cover: { bg: "#26302A", fg: "#E8EFE6" },
  },
  {
    slug: "pixstudio",
    name: "PixStudio",
    client: "Pixel Nomade",
    year: "2026",
    location: "Djibouti",
    category: "IA",
    kind: "Studio de retouche en ligne",
    url: "https://pixstudio.pixel-nomade.com/",
    domain: "pixstudio.pixel-nomade.com",
    restricted: true,
    summary:
      "Retouche photo par lot, looks professionnels et export pleine résolution, directement dans le navigateur.",
    context:
      "Après chaque événement, des centaines de photos devaient être retouchées une à une avant d’être livrées aux clients.",
    approach:
      "Nous avons développé un studio de production en ligne : import en masse, application de looks cohérents sur toute une série, ajustements assistés et export en pleine résolution.",
    result:
      "Une série complète se traite en une seule passe, avec un rendu homogène d’une photo à l’autre.",
    services: ["Conception produit", "Développement", "Traitement d’image"],
    stack: ["Next.js", "TypeScript", "WebGL"],
    expertises: ["intelligence-artificielle", "developpement"],
    cover: { bg: "#2E2622", fg: "#F3E9E1" },
  },
  {
    slug: "pixmemoire",
    name: "PixMémoire",
    client: "Pixel Nomade",
    year: "2026",
    location: "Djibouti",
    category: "Plateforme",
    kind: "Annuaire patrimonial",
    url: "https://pixmemoire.netlinksolutions.pro/",
    domain: "pixmemoire.netlinksolutions.pro",
    summary:
      "Un annuaire des figures qui ont marqué Djibouti, en politique, en culture, en sport et dans la vie intellectuelle.",
    context:
      "Les biographies des personnalités djiboutiennes étaient dispersées entre archives, articles de presse et mémoire orale. Pixel Nomade souhaitait les réunir dans un lieu ouvert à tous.",
    approach:
      "Une plateforme de recherche par nom et par thème, des fiches biographiques structurées, une sélection des derniers ajouts et un formulaire pour proposer de nouvelles personnalités.",
    result:
      "Une ressource patrimoniale ouverte à tous, pensée pour les étudiants, les journalistes et la diaspora.",
    services: ["Conception éditoriale", "Développement", "Moteur de recherche"],
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    expertises: ["developpement"],
    cover: { bg: "#E7DDCB", fg: "#2D2416" },
  },
  {
    slug: "silalo",
    name: "Silalo",
    client: "Silalo",
    year: "2025",
    location: "Djibouti",
    category: "E-commerce",
    kind: "E-commerce mode & beauté",
    url: "https://silalo.online/",
    domain: "silalo.online",
    summary:
      "Mode, beauté, parfums et accessoires : une boutique en ligne pensée pour Djibouti, avec paiement à la livraison.",
    context:
      "Trouver à Djibouti des produits de beauté, des parfums et des vêtements de marques européennes restait compliqué : prix opaques, délais incertains, peu de choix.",
    approach:
      "Une boutique pensée pour le mobile : catalogue par univers (mode, beauté, soin, parfum, électronique), prix affichés en francs djiboutiens frais d’import compris, paiement à la livraison et commande en quelques gestes.",
    result:
      "Un canal de vente direct, sans intermédiaire, adapté aux habitudes d’achat locales.",
    services: ["E-commerce", "Développement", "Hébergement"],
    stack: ["React", "Firebase", "Node.js"],
    expertises: ["developpement", "cloud"],
    cover: { bg: "#EBD3C7", fg: "#3A1F18" },
  },
];

/* Captures générées par `npm run capture` : ajoutées automatiquement aux couvertures. */
for (const project of projects) {
  const image = (covers as Record<string, string>)[project.slug];
  if (image && !project.cover.image) project.cover.image = image;
}

export const categories: { label: string; value: ProjectCategory | "Tous" }[] = [
  { label: "Tous", value: "Tous" },
  { label: "Sites", value: "Site" },
  { label: "Plateformes", value: "Plateforme" },
  { label: "Intelligence artificielle", value: "IA" },
  { label: "E-commerce", value: "E-commerce" },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
