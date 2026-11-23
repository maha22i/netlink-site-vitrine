import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accent } from "@/components/ui/LineReveal";
import { Button } from "@/components/ui/Button";
import { Object3D } from "@/components/three/Object3D";

export const metadata: Metadata = pageMetadata({
  title: "L’agence",
  description:
    "Netlink Solutions est née d’un constat simple : les entreprises jonglent avec trop de prestataires informatiques. Notre parti pris : maîtriser toute la chaîne, entre Paris et Djibouti.",
  path: "/agence",
});

const chapters = [
  {
    title: "Le constat",
    body: [
      "Tout commence par une scène que nous avons vue des dizaines de fois. Une entreprise qui fonctionne bien, des équipes compétentes, et une informatique éclatée entre cinq prestataires qui ne se parlent pas. Le site chez l’un, le réseau chez un autre, les licences chez un troisième.",
      "Quand quelque chose casse, chacun renvoie la balle. Et le dirigeant passe ses soirées à jouer les chefs d’orchestre d’un métier qui n’est pas le sien.",
    ],
  },
  {
    title: "Le parti pris",
    body: [
      "Nous avons fait un choix simple, et exigeant : maîtriser toute la chaîne. Du code d’une application au câble qui la relie au serveur. De l’agent IA qui répond à vos clients à l’ordinateur sur lequel votre équipe travaille chaque matin.",
      "Pour cela, nous avons réuni une équipe pluridisciplinaire : développeurs, ingénieurs réseau et cloud, spécialistes de l’intelligence artificielle, techniciens. Chaque projet est piloté par un chef de projet qui coordonne les bons experts au bon moment.",
      "Ce n’est pas de la dispersion. C’est la seule manière de garantir que l’ensemble fonctionne, et d’en répondre sans détour.",
    ],
  },
  {
    title: "Deux rives",
    body: [
      "Netlink travaille entre la France et Djibouti. Ce double ancrage n’est pas un argument, c’est une façon de travailler : des clients exigeants en Île-de-France, un marché est-africain en pleine transformation numérique, et des savoir-faire qui circulent de l’un à l’autre.",
      "Le décalage horaire joue même en votre faveur : quand Paris ouvre ses bureaux, Djibouti est déjà au travail.",
    ],
  },
];

const principles = [
  {
    title: "La clarté avant la technique",
    text: "Des devis lisibles, des explications sans jargon, des décisions que vous comprenez avant de les signer.",
  },
  {
    title: "La propriété de ce que vous payez",
    text: "Code source, accès, documentation : tout vous est remis. Vous restez libre, avec ou sans nous.",
  },
  {
    title: "La durabilité plutôt que la mode",
    text: "Des technologies éprouvées, maintenues, qui tiendront encore dans dix ans. Le spectaculaire ne nous intéresse que s’il est utile.",
  },
  {
    title: "La responsabilité de bout en bout",
    text: "Une équipe dédiée, avec un chef de projet qui coordonne nos experts : votre dossier ne passe jamais d’un prestataire à l’autre.",
  },
];

export default function AgencePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "L’agence", path: "/agence" }])} />
      <PageHeader
        eyebrow="L’agence"
        meta="Paris — Djibouti"
        lines={["Née entre", <>deux <Accent>rives.</Accent></>]}
        aside={<Object3D variant="link" tilt={[1.1, 0.4, 0.5]} className="size-full" />}
        intro={
          <p>
            Paris et Djibouti. Le logiciel et le matériel. L’idée et sa mise en service. Netlink
            Solutions s’est construite sur ce qui relie, et c’est encore ce qui guide chacun de nos
            projets.
          </p>
        }
      />

      {/* Récit en chapitres */}
      <section className="shell pb-16 md:pb-24">
        {chapters.map((chapter, i) => (
          <article key={chapter.title} className="grid gap-8 border-t hairline py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <span className="accent text-[2.6rem] leading-none text-ink/30">{["I", "II", "III"][i]}</span>
                <h2 className="title-lg mt-4">{chapter.title}</h2>
              </div>
            </div>
            <div data-reveal suppressHydrationWarning className="space-y-8 md:col-span-7 md:col-start-6">
              {chapter.body.map((p, j) => (
                <p key={j} className={j === 0 ? "lead text-ink/85" : "text-[18px] leading-relaxed text-ink/65"}>
                  {p}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Chiffres qui comptent */}
      <section className="bg-ink text-paper">
        <div className="shell grid gap-y-14 py-24 sm:grid-cols-3 md:py-36">
          {[
            { n: "5", label: "expertises maîtrisées", sub: "de l’IA au matériel" },
            { n: "2", label: "pays", sub: "France et Djibouti" },
            { n: "1", label: "équipe dédiée", sub: "des experts dans chaque domaine" },
          ].map((item, i) => (
            <div key={item.label} data-reveal suppressHydrationWarning style={{ "--delay": `${[0, 90, 150][i]}ms` } as React.CSSProperties} className="sm:border-l sm:border-paper/12 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
              <p className="display text-[clamp(5rem,13vw,12rem)] leading-[0.8]">{item.n}</p>
              <p className="mt-6 text-[19px] tracking-[-0.02em]">{item.label}</p>
              <p className="mt-1 text-[15px] text-paper/50">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principes */}
      <section className="shell py-24 md:py-36">
        <div data-reveal suppressHydrationWarning className="grid gap-8 md:grid-cols-12">
          <p className="label text-mute md:col-span-3">Ce que nous défendons</p>
          <h2 className="title-xl md:col-span-9">
            Quatre principes, <Accent>non négociables.</Accent>
          </h2>
        </div>
        <div className="mt-16 grid gap-x-10 md:mt-24 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} data-reveal suppressHydrationWarning style={{ "--delay": `${i % 2 ? 80 : 0}ms` } as React.CSSProperties} className="border-t hairline py-10">
              <h3 className="title-md">{p.title}</h3>
              <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-ink/65">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phrase de clôture */}
      <section className="border-t hairline">
        <div className="shell py-28 md:py-44">
          <blockquote data-reveal suppressHydrationWarning className="title-xl max-w-[22ch]">
            Nous ne vendons pas de la technologie. Nous vendons le fait de <Accent>ne plus avoir à y penser.</Accent>
          </blockquote>
          <div data-reveal suppressHydrationWarning style={{ "--delay": "120ms" } as React.CSSProperties} className="mt-12">
            <Button href="/realisations" variant="secondary">Voir ce que nous avons construit</Button>
          </div>
        </div>
      </section>
    </>
  );
}
