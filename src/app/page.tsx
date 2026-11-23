import type { Metadata } from "next";
import { site } from "@/content/site";
import { expertises } from "@/content/expertises";
import { featuredProjects, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { Object3D } from "@/components/three/Object3D";
import { Accent, LineReveal } from "@/components/ui/LineReveal";
import { Button } from "@/components/ui/Button";
import { Backdrop } from "@/components/ui/Backdrop";
import Image from "next/image";
import Link from "next/link";
import { LocalTime } from "@/components/ui/LocalTime";
import { Manifesto } from "@/components/home/Manifesto";
import { ExpertiseList } from "@/components/home/ExpertiseList";
import { ProjectCard } from "@/components/work/ProjectCard";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Agence IA, développement, réseau, cloud et matériel informatique",
    description: site.metaDescription,
    path: "/",
  }),
  title: { absolute: `${site.name} — Du code au câble` },
};

const steps = [
  {
    title: "Écouter",
    text: "Un premier échange pour comprendre votre activité, vos contraintes et ce qui vous coûte aujourd’hui. Vous repartez avec un avis clair, même si nous ne travaillons pas ensemble.",
  },
  {
    title: "Concevoir",
    text: "Un plan précis : périmètre, budget, calendrier. Sans jargon et sans surprise, ce qui est écrit est ce qui sera livré.",
  },
  {
    title: "Déployer",
    text: "Nous construisons, installons et testons avec des points d’étape réguliers. Les bascules se font sans interrompre votre activité.",
  },
  {
    title: "Maintenir",
    text: "Après la livraison, nous restons. Supervision, évolutions, support : votre système continue de s’améliorer avec le temps.",
  },
];

export default function HomePage() {
  const [a, b, c, d] = featuredProjects;

  return (
    <>
      {/* ─── Ouverture ─────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        <Backdrop variant="hero" />
        <div
          aria-hidden
          className="fade-in pointer-events-none relative mt-20 h-[36svh] w-full lg:absolute lg:top-[6%] lg:right-[-4%] lg:left-auto lg:mt-0 lg:h-[88%] lg:w-[62%]"
          style={{ "--delay": "250ms" } as React.CSSProperties}
        >
          <Object3D variant="link" className="size-full" tilt={[0.32, -0.55, 0.12]} />
        </div>

        <div className="shell relative flex flex-1 flex-col justify-end pt-4 pb-8 md:pb-10 lg:pt-28">
          <LineReveal
            className="display text-[clamp(3.6rem,12.5vw,13.5rem)]"
            lines={["Du code", <>au <Accent>câble.</Accent></>]}
          />

          <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12">
            <p className="fade-in lead max-w-[36ch] text-ink/75 md:col-span-6 lg:col-span-5" style={{ "--delay": "500ms" } as React.CSSProperties}>
              Netlink Solutions conçoit, déploie et maintient l’informatique des entreprises. De
              l’intelligence artificielle au serveur, du site web au réseau&nbsp;: une équipe d’experts dédiée à votre projet.
            </p>
            <div className="fade-in md:col-span-4 md:col-start-9 md:justify-self-end" style={{ "--delay": "620ms" } as React.CSSProperties}>
              <div className="flex flex-wrap gap-3">
                <Button href="/realisations">Voir nos réalisations</Button>
                
              </div>
            </div>
          </div>

          <div
            className="fade-in meta mt-12 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t hairline pt-4 text-mute md:mt-16"
            style={{ "--delay": "760ms" } as React.CSSProperties}
          >
            <p className="flex gap-6">
              {site.locations.map((l) => (
                <span key={l.city}>
                  {l.city} <LocalTime timeZone={l.timeZone} />
                </span>
              ))}
            </p>
            <p className="hidden sm:block">IA · Développement · Réseau · Cloud · Matériel</p>
          </div>
        </div>
      </section>

      {/* ─── Manifeste ─────────────────────────────────────────── */}
      <section className="shell py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label text-mute md:col-span-3">Pourquoi Netlink</p>
          <div className="md:col-span-9">
            <Manifesto
              segments={[
                { text: "Un prestataire pour le site, un autre pour le réseau, un troisième pour les logiciels, et personne pour faire tenir l’ensemble. Netlink est né pour être" },
                { text: "ce lien :", accent: true },
                { text: "une seule équipe qui comprend votre activité de bout en bout, et qui en répond." },
              ]}
            />
            {/* <div data-reveal suppressHydrationWarning className="mt-14 md:mt-20">
              <Button href="/agence" variant="secondary">Découvrir l’agence</Button>
            </div> */}
          </div>
        </div>
      </section>

      {/* ─── Expertises ────────────────────────────────────────── */}
      <section className="bg-ink text-paper">
        <div className="shell py-24 md:py-36">
          <div data-reveal suppressHydrationWarning className="grid gap-8 pb-12 md:grid-cols-12 md:pb-20">
            <p className="label text-paper/50 md:col-span-3">Expertises</p>
            <h2 className="title-xl md:col-span-9">
              Cinq métiers, <Accent>une seule</Accent> exigence.
            </h2>
          </div>
          <ExpertiseList
            tone="dark"
            items={expertises.map(({ slug, index, short, line, object }) => ({ slug, index, short, line, object }))}
          />
        </div>
      </section>

      {/* ─── Réalisations ──────────────────────────────────────── */}
      <section className="shell py-12 md:py-20">
        <div data-reveal suppressHydrationWarning className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="label text-mute">Réalisations</p>
            <h2 className="title-xl mt-6">
              Des projets <Accent>en production</Accent>, pas en vitrine.
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button href="/realisations" variant="secondary">{`Les ${projects.length} projets`}</Button>
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-y-20">
          <ProjectCard project={a} />
          <ProjectCard project={b} className="md:mt-20" />
          <ProjectCard project={c} />
          <ProjectCard project={d} className="md:mt-20" />
        </div>

        <div data-reveal suppressHydrationWarning className="mt-24 md:mt-36">
          <div className="flex items-baseline justify-between gap-6 border-b hairline pb-4">
            <p className="label text-mute">Ils nous font confiance</p>
            <p className="meta hidden text-mute sm:block">France · Djibouti</p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {site.clients.map((client) => (
              <li key={client.name} className="border-b hairline sm:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:last:border-r-0 max-sm:odd:border-r">
                <Link
                  href={`/realisations/${client.project}`}
                  aria-label={client.name}
                  className="group/logo flex h-28 items-center justify-center px-6 transition-colors duration-300 hover:bg-white md:h-32"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={Math.round(client.height * 4)}
                    height={client.height}
                    className="w-auto max-w-full object-contain opacity-55 transition-[opacity,transform] duration-300 ease-out group-hover/logo:scale-[1.04] group-hover/logo:opacity-100"
                    style={{ height: client.height }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Méthode ───────────────────────────────────────────── */}
      <section className="border-t hairline">
        <div className="shell grid gap-14 py-28 md:grid-cols-12 md:py-40">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="label text-mute">Méthode</p>
              <h2 data-reveal suppressHydrationWarning className="title-lg mt-6 max-w-[14ch]">
                Simple à suivre, <Accent>tenue</Accent> de bout en bout.
              </h2>
            </div>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {steps.map((step, i) => (
              <li key={step.title} data-reveal suppressHydrationWarning className="grid grid-cols-[3rem_1fr] gap-4 border-t hairline py-10 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr] md:py-14">
                <span className="accent text-[2.4rem] leading-none text-ink/35 md:text-[3.2rem]">{i + 1}</span>
                <div>
                  <h3 className="title-md">{step.title}</h3>
                  <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink/65">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Fin de page ───────────────────────────────────────── */}
      {/* <section className="border-t hairline">
        <div className="shell py-28 md:py-44">
          <p data-reveal suppressHydrationWarning className="display max-w-[14ch] text-[clamp(2.8rem,8vw,9rem)]">
            Un projet, une question, un serveur <Accent>qui chauffe&nbsp;?</Accent>
          </p>
          <div data-reveal suppressHydrationWarning style={{ "--delay": "120ms" } as React.CSSProperties} className="mt-12 md:mt-16">
            <Button href="/contact">Parlons-en</Button>
          </div>
        </div>
      </section> */}
    </>
  );
}
