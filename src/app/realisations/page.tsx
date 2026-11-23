import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accent } from "@/components/ui/LineReveal";
import { WorkIndex } from "@/components/work/WorkIndex";

export const metadata: Metadata = pageMetadata({
  title: "Réalisations",
  description:
    "Sites corporate, plateformes SaaS, e-commerce et agents IA : une sélection de projets conçus et mis en production par Netlink Solutions en France et à Djibouti.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Réalisations", path: "/realisations" }])} />
      <PageHeader
        eyebrow="Réalisations"
        meta={`${projects.length} projets`}
        lines={["Aperçu de nos réalisations", <><Accent>en production.</Accent></>]}
        intro={
          <p>
            Des sites qui font connaître, des plateformes qui font tourner, des agents qui font gagner du
            temps. Tous sont en ligne aujourd’hui.
          </p>
        }
      />
      <section className="shell pb-28 md:pb-40">
        <WorkIndex />
      </section>
    </>
  );
}
