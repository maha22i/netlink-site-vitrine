export type Role = {
  slug: string;
  title: string;
  location: string;
  contract: string;
  summary: string;
  missions: string[];
  profile: string[];
};

export const roles: Role[] = [
  {
    slug: "conseiller-telephonique",
    title: "Conseiller·ère téléphonique",
    location: "Djibouti",
    contract: "Temps plein",
    summary:
      "Vous êtes la première voix que nos clients entendent : accueil, qualification des demandes et prise de rendez-vous pour des entreprises françaises.",
    missions: [
      "Prendre en charge les appels entrants et le standard de nos clients",
      "Qualifier les demandes et organiser les rendez-vous commerciaux",
      "Mener des campagnes d’appels sortants avec un argumentaire préparé",
      "Consigner chaque échange avec précision dans nos outils",
    ],
    profile: [
      "Un français oral excellent, clair et chaleureux",
      "Le goût du contact et une vraie capacité d’écoute",
      "De la rigueur dans le suivi et la prise de notes",
      "Disponible du lundi au vendredi, en journée",
    ],
  },
  {
    slug: "candidature-spontanee",
    title: "Candidature spontanée",
    location: "Paris · Djibouti · À distance",
    contract: "Tous contrats",
    summary:
      "Développement, infrastructure, intelligence artificielle : vous ne trouvez pas votre poste mais vous pensez avoir votre place chez nous ? Écrivez-nous.",
    missions: [
      "Développement web et applicatif",
      "Administration systèmes, réseaux et cloud",
      "Conception d’agents IA et d’automatisations",
      "Support et accompagnement des clients",
    ],
    profile: [
      "Une curiosité technique qui ne s’éteint pas",
      "Le souci du travail bien fini, même invisible",
      "L’envie d’apprendre et de transmettre",
    ],
  },
];
