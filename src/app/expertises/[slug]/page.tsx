import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { expertises, getExpertise } from "@/content/expertises";
import { projects } from "@/content/projects";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accent } from "@/components/ui/LineReveal";
import { NextLink } from "@/components/ui/NextLink";
import { Object3D } from "@/components/three/Object3D";
import { ProjectCard } from "@/components/work/ProjectCard";

export function generateStaticParams() {
  return expertises.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/expertises/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertise(slug);
  if (!expertise) return {};
  return pageMetadata({
    ...expertise.seo,
    path: `/expertises/${slug}`,
    image: { url: `/expertises/${slug}/opengraph-image`, alt: `${expertise.title} — Netlink Solutions` },
  });
}

/**
 * Les paramètres sont lus dans une frontière <Suspense> : toutes les pages
 * sont prérendues au build (generateStaticParams), la navigation reste instantanée.
 */
export default function ExpertisePage({ params }: PageProps<"/expertises/[slug]">) {
  return <Suspense fallback={null}>{params.then(({ slug }) => <ExpertiseContent slug={slug} />)}</Suspense>;
}

function ExpertiseContent({ slug }: { slug: string }) {
  const expertise = getExpertise(slug);
  if (!expertise) notFound();

  const i = expertises.findIndex((e) => e.slug === slug);
  const next = expertises[(i + 1) % expertises.length];
  const related = projects.filter((p) => p.expertises.includes(slug)).slice(0, 2);
  const { headline } = expertise;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Expertises", path: "/expertises" },
          { name: expertise.title, path: `/expertises/${slug}` },
        ])}
      />
      <JsonLd data={serviceJsonLd(expertise)} />

      <PageHeader
        eyebrow={`Expertises — ${expertise.title}`}
        meta={`${expertise.index} / 0${expertises.length}`}
        lines={[
          headline.before.trim(),
          <>
            <Accent>{headline.accent}</Accent>
            {headline.after}
          </>,
        ]}
        aside={<Object3D variant={expertise.object} className="size-full" />}
        intro={<p>{expertise.intro}</p>}
      />

      {/* Ce que nous faisons */}
      <section className="shell pb-24 md:pb-36">
        <div className="grid gap-8 border-t hairline pt-6 md:grid-cols-12">
          <p className="label text-mute md:col-span-3">Ce que nous faisons</p>
          <div className="grid gap-x-10 gap-y-14 md:col-span-9 md:grid-cols-2">
            {expertise.capabilities.map((c, n) => (
              <div key={c.title} data-reveal suppressHydrationWarning style={{ "--delay": `${[0, 90, 40, 120][n] ?? 0}ms` } as React.CSSProperties}>
                <h2 className="title-md">{c.title}</h2>
                <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-ink/65">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre façon de faire */}
      <section className="bg-ink text-paper">
        <div className="shell py-24 md:py-36">
          <div data-reveal suppressHydrationWarning className="grid gap-8 md:grid-cols-12">
            <p className="label text-paper/50 md:col-span-3">Notre façon de faire</p>
            <h2 className="title-xl md:col-span-9">
              Peu de promesses, <Accent>beaucoup</Accent> de rigueur.
            </h2>
          </div>
          <ol className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
            {expertise.approach.map((step, n) => (
              <li key={step.title} data-reveal suppressHydrationWarning style={{ "--delay": `${[0, 80, 130][n] ?? 0}ms` } as React.CSSProperties} className="border-t border-paper/12 pt-6">
                <span className="accent text-[2.4rem] leading-none text-paper/35">{n + 1}</span>
                <h3 className="title-md mt-6">{step.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-paper/60">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Livrables & technologies */}
      <section className="shell grid gap-16 py-24 md:grid-cols-12 md:py-36">
        <div data-reveal suppressHydrationWarning className="md:col-span-5">
          <p className="label text-mute">Livrables</p>
          <ul className="mt-6 border-t hairline">
            {expertise.deliverables.map((d) => (
              <li key={d} className="border-b hairline py-4 text-[19px] tracking-[-0.02em]">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal suppressHydrationWarning style={{ "--delay": "100ms" } as React.CSSProperties} className="md:col-span-5 md:col-start-8">
          <p className="label text-mute">Technologies</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {expertise.stack.map((t) => (
              <li key={t} className="meta rounded-full border hairline px-3.5 py-1.5 text-ink/75">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Réalisations liées */}
      {related.length > 0 && (
        <section className="shell pb-24 md:pb-36">
          <div className="border-t hairline pt-6">
            <p className="label text-mute">Réalisations liées</p>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <NextLink href={`/expertises/${next.slug}`} eyebrow="Expertise suivante" title={next.short} />
    </>
  );
}
