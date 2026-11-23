import type { ObjectVariant } from "@/components/three/types";

export type Capability = { title: string; text: string };

export type Expertise = {
  slug: string;
  index: string;
  title: string;
  /** Titre court pour les listes et la navigation. */
  short: string;
  /** Phrase d’accroche affichée dans les index. */
  line: string;
  /** Titre éditorial de la page détail — le fragment `accent` est composé en italique. */
  headline: { before: string; accent: string; after?: string };
  intro: string;
  capabilities: Capability[];
  approach: { title: string; text: string }[];
  stack: string[];
  deliverables: string[];
  object: ObjectVariant;
  seo: { title: string; description: string };
};

export const expertises: Expertise[] = [
  {
    slug: "intelligence-artificielle",
    index: "01",
    title: "Intelligence artificielle & automatisation",
    short: "IA & automatisation",
    line: "Des agents qui travaillent pour vos équipes, pas l’inverse.",
    headline: { before: "L’IA qui ", accent: "travaille", after: " vraiment." },
    intro:
      "Nous concevons des agents IA et des automatisations qui s’insèrent dans vos outils existants : votre messagerie, votre CRM, vos documents, votre téléphonie. L’objectif n’est jamais la démonstration technologique, mais des heures rendues à vos équipes, chaque semaine, de façon mesurable.",
    capabilities: [
      {
        title: "Agents IA métiers",
        text: "Assistant commercial, agent marketing, secrétariat juridique, planification d’auto-école : des agents spécialisés, entraînés sur vos règles et vos documents, qui exécutent des tâches complètes de bout en bout.",
      },
      {
        title: "Automatisation des processus",
        text: "Relances, saisie, rapprochements, publication sur les réseaux sociaux, tri des candidatures : nous relions vos applications entre elles pour supprimer les tâches répétitives et les erreurs de recopie.",
      },
      {
        title: "Assistants conversationnels",
        text: "Agents disponibles par e-mail, SMS ou WhatsApp, capables de répondre à vos clients, de qualifier une demande et de transmettre le dossier à la bonne personne avec tout le contexte.",
      },
      {
        title: "IA sur vos propres données",
        text: "Recherche intelligente dans vos contrats, procédures et archives. Vos documents restent les vôtres : hébergement maîtrisé, accès contrôlés, traçabilité des réponses.",
      },
    ],
    approach: [
      {
        title: "On part du temps perdu",
        text: "Avant toute ligne de code, nous cartographions où partent les heures de vos équipes. On automatise ce qui coûte, pas ce qui est à la mode.",
      },
      {
        title: "Un pilote en quelques semaines",
        text: "Un premier agent en production sur un périmètre restreint, mesuré sur des indicateurs simples, avant d’étendre.",
      },
      {
        title: "L’humain garde la main",
        text: "Validation des actions sensibles, journal de chaque décision, possibilité de reprendre la main à tout moment.",
      },
    ],
    stack: ["Claude", "OpenAI", "n8n", "Twilio", "WhatsApp Cloud API", "Python", "Node.js", "PostgreSQL / pgvector"],
    deliverables: ["Audit des processus", "Agents IA sur mesure", "Workflows automatisés", "Intégrations API", "Tableau de bord de suivi", "Formation des équipes"],
    object: "ai",
    seo: {
      title: "Intelligence artificielle & automatisation pour les entreprises",
      description:
        "Agents IA métiers, automatisation des processus, assistants par e-mail, SMS et WhatsApp, IA sur vos données internes. Netlink Solutions intègre l’IA dans vos outils existants.",
    },
  },
  {
    slug: "developpement",
    index: "02",
    title: "Développement sur mesure",
    short: "Développement",
    line: "Sites, e-commerce, ERP, CRM : des outils taillés pour votre façon de travailler.",
    headline: { before: "Des logiciels ", accent: "à votre mesure", after: "." },
    intro:
      "Du site vitrine qui convertit à la plateforme métier qui structure toute une activité, nous développons des produits rapides, sobres et durables. Chaque projet est livré avec son code source : vous êtes propriétaire de ce que vous payez.",
    capabilities: [
      {
        title: "Sites vitrines & corporate",
        text: "Des sites éditoriaux rapides, pensés pour le référencement naturel dès la première ligne, avec une administration simple pour faire vivre vos contenus sans dépendre de nous.",
      },
      {
        title: "E-commerce",
        text: "Boutiques en ligne sur mesure : catalogue, paiement, livraison, gestion des stocks et des promotions, adaptées aux réalités de votre marché, en France comme en Afrique de l’Est.",
      },
      {
        title: "ERP & CRM",
        text: "Facturation, devis, suivi client, pointage, trésorerie : des outils de gestion multi-sociétés ou des intégrations Odoo, connectés à votre messagerie et à votre comptabilité.",
      },
      {
        title: "Applications métier & SaaS",
        text: "Portails internes, espaces clients, plateformes multi-utilisateurs avec gestion fine des rôles et authentification unique Microsoft ou Google.",
      },
    ],
    approach: [
      {
        title: "Un cahier des charges lisible",
        text: "Un document court, sans jargon, qui fixe le périmètre, le budget et le calendrier. Ce qui est écrit est ce qui est livré.",
      },
      {
        title: "Des livraisons régulières",
        text: "Vous voyez le produit avancer chaque semaine sur un environnement de recette, et vous corrigez la trajectoire avant qu’il ne soit tard.",
      },
      {
        title: "Un code qui vous appartient",
        text: "Dépôt Git, documentation et accès d’hébergement remis à la livraison. Aucune dépendance cachée à l’agence.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Spring Boot", "PostgreSQL", "Strapi", "Odoo", "Docker", "Keycloak"],
    deliverables: ["Cahier des charges", "Maquettes & design", "Développement", "Référencement naturel", "Mise en production", "Maintenance évolutive"],
    object: "code",
    seo: {
      title: "Développement web sur mesure : sites, e-commerce, ERP et CRM",
      description:
        "Sites vitrines, e-commerce, ERP, CRM, applications métier et SaaS développés en Next.js, Node.js et PostgreSQL. Code source remis, référencement naturel intégré.",
    },
  },
  {
    slug: "reseau-infrastructure",
    index: "03",
    title: "Réseau & infrastructure",
    short: "Réseau & infrastructure",
    line: "Des fondations solides, invisibles quand tout va bien.",
    headline: { before: "Des fondations ", accent: "qu’on oublie", after: "." },
    intro:
      "Une bonne infrastructure ne se remarque pas : le Wi-Fi tient, les sauvegardes tournent, les accès sont maîtrisés. Nous concevons, installons et maintenons les réseaux et serveurs des PME, des cabinets et des sites multi-agences.",
    capabilities: [
      {
        title: "Réseaux d’entreprise",
        text: "Câblage, baies, commutateurs, Wi-Fi professionnel, segmentation en VLAN, VPN entre sites. Un réseau documenté, dimensionné pour les années à venir.",
      },
      {
        title: "Serveurs & annuaire",
        text: "Windows Server, Active Directory, stratégies de groupe, partages de fichiers et droits d’accès : une gestion centralisée des postes et des utilisateurs.",
      },
      {
        title: "Sécurité & sauvegarde",
        text: "Pare-feu, antivirus managé, sauvegardes externalisées et plan de reprise testé. Le jour où un incident arrive, on restaure, on ne négocie pas.",
      },
      {
        title: "Infogérance",
        text: "Supervision, mises à jour, support aux utilisateurs et téléphonie IP : un forfait clair pour que votre informatique soit suivie, pas seulement réparée.",
      },
    ],
    approach: [
      {
        title: "Un audit sur site",
        text: "Inventaire du matériel, des flux et des risques. Vous repartez avec un état des lieux clair, même si vous ne nous confiez rien ensuite.",
      },
      {
        title: "Une intervention planifiée",
        text: "Les bascules se font hors des heures de travail, avec un plan de retour arrière prêt à l’emploi.",
      },
      {
        title: "Une documentation vivante",
        text: "Schéma réseau, mots de passe en coffre-fort, procédures : tout est consigné et vous est transmis.",
      },
    ],
    stack: ["Windows Server", "Active Directory", "Fortinet", "Ubiquiti", "Cisco", "Acronis", "VPN WireGuard", "Téléphonie IP"],
    deliverables: ["Audit d’infrastructure", "Conception réseau", "Installation & câblage", "Sauvegarde & PRA", "Supervision", "Infogérance"],
    object: "network",
    seo: {
      title: "Réseau, infrastructure et infogérance pour les PME",
      description:
        "Conception et installation de réseaux d’entreprise, Windows Server et Active Directory, sécurité, sauvegarde et infogérance. Audit sur site et documentation complète.",
    },
  },
  {
    slug: "cloud",
    index: "04",
    title: "Cloud computing",
    short: "Cloud",
    line: "Vos outils accessibles partout, sécurisés, sans mauvaise surprise sur la facture.",
    headline: { before: "Le cloud, ", accent: "sans le brouillard", after: "." },
    intro:
      "Migrer vers le cloud ne devrait jamais être un saut dans le vide. Nous accompagnons les entreprises vers Microsoft 365, Azure et des hébergements maîtrisés, en gardant trois priorités : la continuité de service, la sécurité des accès et la maîtrise des coûts.",
    capabilities: [
      {
        title: "Migration Microsoft 365",
        text: "Messagerie, agendas, fichiers et Teams migrés depuis votre ancien hébergeur sans perte de données ni coupure perceptible pour vos équipes.",
      },
      {
        title: "Identité & accès",
        text: "Entra ID, authentification multifacteur, connexion unique à vos applications métier : un seul compte par collaborateur, révocable en un clic.",
      },
      {
        title: "Hébergement & serveurs virtuels",
        text: "Déploiement de vos applications sur des serveurs privés virtuels ou des plateformes managées, conteneurisées, surveillées et sauvegardées.",
      },
      {
        title: "Optimisation des coûts",
        text: "Revue des licences et des ressources inutilisées. Vous payez ce que vous utilisez, et vous savez pourquoi.",
      },
    ],
    approach: [
      {
        title: "Une bascule sans rupture",
        text: "Migration progressive, double fonctionnement le temps nécessaire, bascule finale un vendredi soir.",
      },
      {
        title: "La sécurité par défaut",
        text: "Authentification forte, droits minimaux et journalisation activés dès le premier jour, pas en option.",
      },
      {
        title: "Une facture lisible",
        text: "Un tableau simple de vos abonnements et de vos ressources, mis à jour à chaque évolution.",
      },
    ],
    stack: ["Microsoft 365", "Azure", "Entra ID", "OVHcloud", "Hostinger VPS", "Firebase", "Docker", "Cloudflare"],
    deliverables: ["Étude de migration", "Migration de messagerie", "Authentification unique", "Hébergement d’applications", "Sauvegarde cloud", "Revue des coûts"],
    object: "cloud",
    seo: {
      title: "Cloud computing : migration Microsoft 365, Azure et hébergement",
      description:
        "Migration vers Microsoft 365, gestion des identités Entra ID, authentification unique, hébergement d’applications et optimisation des coûts cloud.",
    },
  },
  {
    slug: "materiel-informatique",
    index: "05",
    title: "Fourniture de matériel informatique",
    short: "Matériel",
    line: "Le bon équipement, configuré et prêt à l’emploi le jour de sa livraison.",
    headline: { before: "Le bon matériel, ", accent: "prêt", after: " le premier jour." },
    intro:
      "Ordinateurs, serveurs, stockage, réseau, impression : nous sélectionnons l’équipement adapté à votre usage réel, nous le configurons avant livraison et nous l’installons. Vos collaborateurs allument, se connectent, travaillent.",
    capabilities: [
      {
        title: "Postes de travail",
        text: "Ordinateurs portables et fixes professionnels, écrans, stations d’accueil, préparés avec vos logiciels et vos comptes avant d’arriver sur le bureau.",
      },
      {
        title: "Serveurs & stockage",
        text: "Serveurs, baies de stockage et NAS dimensionnés selon vos volumes et votre croissance, avec garantie constructeur et contrat d’intervention.",
      },
      {
        title: "Réseau & téléphonie",
        text: "Commutateurs, bornes Wi-Fi, pare-feux, téléphones IP : du matériel professionnel compatible avec votre infrastructure existante.",
      },
      {
        title: "Impression & bureautique",
        text: "Copieurs multifonctions et solutions d’impression, en achat ou en location, avec maintenance incluse.",
      },
    ],
    approach: [
      {
        title: "Un conseil indépendant",
        text: "Nous recommandons ce qui sert votre usage, pas ce qui nous rapporte le plus. Chaque proposition est justifiée.",
      },
      {
        title: "Une préparation en atelier",
        text: "Mise à jour, installation des logiciels, enrôlement dans votre annuaire : tout est fait avant la livraison.",
      },
      {
        title: "Un suivi du parc",
        text: "Inventaire, dates de garantie et renouvellements anticipés. Plus de matériel oublié au fond d’un placard.",
      },
    ],
    stack: ["Dell", "HP", "Lenovo", "Apple", "Synology", "Ubiquiti", "Canon", "Yealink"],
    deliverables: ["Étude des besoins", "Devis comparatif", "Préparation en atelier", "Livraison & installation", "Gestion du parc", "Garantie & SAV"],
    object: "hardware",
    seo: {
      title: "Fourniture de matériel informatique : PC, serveurs, réseau",
      description:
        "Ordinateurs, serveurs, stockage, matériel réseau et impression pour les entreprises, configurés avant livraison et installés sur site, en France et à Djibouti.",
    },
  },
];

export function getExpertise(slug: string) {
  return expertises.find((e) => e.slug === slug);
}
