import type { Metadata } from "next";
import { expertises } from "@/content/expertises";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accent } from "@/components/ui/LineReveal";
import { ExpertiseList } from "@/components/home/ExpertiseList";

export const metadata: Metadata = pageMetadata({
  title: "Expertises",
  description:
    "Intelligence artificielle et automatisation, développement sur mesure, réseau et infrastructure, cloud computing, fourniture de matériel informatique : cinq expertises, une équipe d’experts dédiée.",
  path: "/expertises",
});

export default function ExpertisesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Expertises", path: "/expertises" }])} />
      <PageHeader
        eyebrow="Expertises"
        meta={`${expertises.length} métiers`}
        lines={["Cinq expertises,", <>une seule <Accent>équipe.</Accent></>]}
        intro={
          <p>
            Une entreprise ne vit pas en silos : son site dépend de son hébergement, ses logiciels de son
            réseau, ses équipes de leur matériel. Nous couvrons toute la chaîne pour que chaque pièce
            s’emboîte. Chaque domaine est porté par ses experts, et toute l’équipe partage votre dossier.
          </p>
        }
      />

      <section className="shell pb-28 md:pb-40">
        <ExpertiseList
          tone="light"
          detailed
          items={expertises.map(({ slug, index, short, line, object, deliverables }) => ({
            slug,
            index,
            short,
            line,
            object,
            deliverables,
          }))}
        />
      </section>

      <section className="bg-ink text-paper">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-36">
          <p className="label text-paper/50 md:col-span-3">Ce qui ne change pas</p>
          <div className="grid gap-12 md:col-span-9 md:grid-cols-3 md:gap-8">
            {[
              {
                title: "Une équipe dédiée",
                text: "Des experts dans chaque domaine, un chef de projet qui coordonne, et une équipe qui connaît votre dossier du devis à la maintenance.",
              },
              {
                title: "Un code qui vous appartient",
                text: "Sources, accès et documentation vous sont remis. Vous restez libre de vos choix, avec ou sans nous.",
              },
              {
                title: "Des prix annoncés",
                text: "Chaque proposition détaille ce qui est inclus et ce qui ne l’est pas. Aucun supplément découvert en cours de route.",
              },
            ].map((item, i) => (
              <div key={item.title} data-reveal suppressHydrationWarning style={{ "--delay": `${[0, 80, 130][i]}ms` } as React.CSSProperties} className="border-t border-paper/12 pt-6">
                <h2 className="title-md">{item.title}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-paper/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
