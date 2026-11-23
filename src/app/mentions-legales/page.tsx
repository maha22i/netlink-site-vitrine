import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Mentions légales",
    description: "Mentions légales, conditions d’utilisation et politique de confidentialité du site.",
    path: "/mentions-legales",
  }),
  robots: { index: false, follow: true },
};

const sections: { title: string; body: React.ReactNode[] }[] = [
  {
    title: "Objet",
    body: [
      "Les présentes mentions légales définissent les conditions d’accès et d’utilisation du site. En naviguant sur le site, l’utilisateur accepte sans réserve les conditions décrites ci-dessous.",
    ],
  },
  {
    title: "Éditeur et hébergement",
    body: [
      "Le site est édité par Netlink Solutions. Il est hébergé par un prestataire d’hébergement professionnel. Les informations d’identification de l’éditeur et de l’hébergeur sont communiquées sur simple demande adressée via le formulaire de contact.",
    ],
  },
  {
    title: "Accès au site",
    body: [
      "Le site est accessible gratuitement, en tout lieu, à tout utilisateur disposant d’un accès à Internet. L’éditeur s’efforce d’assurer un accès continu au site, sans pouvoir le garantir : l’accès peut être suspendu, notamment pour des opérations de maintenance ou de mise à jour, sans que cela ouvre droit à indemnisation.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    body: [
      "L’ensemble des éléments du site (textes, visuels, graphismes, logos, code source, architecture) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite.",
      "Les marques, logos et captures d’écran des réalisations présentées appartiennent à leurs titulaires respectifs et ne sont reproduits qu’à titre de références.",
    ],
  },
  {
    title: "Responsabilité",
    body: [
      "Les informations publiées sur le site sont fournies à titre indicatif et peuvent évoluer sans préavis. Malgré le soin apporté à leur rédaction, l’éditeur ne saurait être tenu responsable d’erreurs, d’omissions ou de l’usage qui pourrait en être fait.",
      "L’éditeur ne peut être tenu responsable des dommages résultant de l’utilisation du site, d’une indisponibilité de celui-ci ou de l’intrusion d’un tiers.",
    ],
  },
  {
    title: "Liens hypertextes",
    body: [
      "Le site peut contenir des liens vers d’autres sites. L’éditeur n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou à leurs pratiques en matière de données personnelles.",
    ],
  },
  {
    title: "Données personnelles",
    body: [
      "Les données transmises via les formulaires (nom, adresse e-mail, message, candidature) sont utilisées uniquement pour répondre à la demande de l’utilisateur. Elles ne sont ni vendues, ni cédées à des tiers, et sont conservées pour la durée strictement nécessaire à leur traitement.",
      <>
        Conformément à la réglementation applicable en matière de protection des données, notamment le Règlement général sur la protection des données (RGPD), chaque utilisateur dispose d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur les données le concernant. Ces droits s’exercent via le{" "}
        <Link href="/contact" className="link-line text-brand">
          formulaire de contact
        </Link>
        .
      </>,
    ],
  },
  {
    title: "Cookies",
    body: [
      "Le site n’utilise ni cookie publicitaire ni outil de suivi tiers. Seuls des éléments techniques strictement nécessaires à son fonctionnement peuvent être déposés. Les polices de caractères sont hébergées sur le site lui-même : aucune donnée de navigation n’est transmise à un service externe.",
    ],
  },
  {
    title: "Droit applicable",
    body: [
      "Les présentes mentions légales sont soumises au droit applicable au lieu d’établissement de l’éditeur. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents seront seuls saisis.",
    ],
  },
  {
    title: "Mise à jour",
    body: ["Les présentes mentions peuvent être modifiées à tout moment. Les utilisateurs sont invités à les consulter régulièrement."],
  },
];

export default function MentionsPage() {
  return (
    <>
      <PageHeader eyebrow="Informations légales" lines={["Mentions légales"]} />
      <section className="shell pt-4 pb-28 md:pb-36">
        {sections.map((s) => (
          <div key={s.title} className="grid gap-4 border-t hairline py-9 md:grid-cols-12 md:gap-6">
            <h2 className="text-[17px] font-medium tracking-[-0.02em] md:col-span-3">{s.title}</h2>
            <div className="space-y-4 text-[16px] leading-relaxed text-ink/70 md:col-span-8 md:col-start-5">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
