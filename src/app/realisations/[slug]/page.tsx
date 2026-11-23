import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/content/projects";
import { getExpertise } from "@/content/expertises";
import { breadcrumbJsonLd, pageMetadata, projectJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { NextLink } from "@/components/ui/NextLink";
import { ProjectCover } from "@/components/work/ProjectCover";
import { visitLabel } from "@/components/work/ProjectCard";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — ${project.kind}`,
    description: project.summary,
    path: `/realisations/${slug}`,
    image: { url: `/realisations/${slug}/opengraph-image`, alt: `${project.name}, ${project.kind} réalisé par Netlink Solutions` },
  });
}

/**
 * Les paramètres sont lus dans une frontière <Suspense> : toutes les pages
 * sont prérendues au build (generateStaticParams), la navigation reste instantanée.
 */
export default function ProjectPage({ params }: PageProps<"/realisations/[slug]">) {
  return <Suspense fallback={null}>{params.then(({ slug }) => <ProjectContent slug={slug} />)}</Suspense>;
}

function ProjectContent({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  const story = [
    { label: "Contexte", text: project.context },
    { label: "Approche", text: project.approach },
    { label: "Ce que ça change", text: project.result },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
          { name: project.name, path: `/realisations/${slug}` },
        ])}
      />
      <JsonLd data={projectJsonLd(project)} />

      <PageHeader
        eyebrow={`Réalisations — ${project.kind}`}
        meta={project.year}
        lines={[project.name]}
        intro={<p>{project.summary}</p>}
      >
        <dl
          className="fade-in mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t hairline pt-6 md:mt-20 md:grid-cols-4"
          style={{ "--delay": "520ms" } as React.CSSProperties}
        >
          <div>
            <dt className="label text-mute">Client</dt>
            <dd className="mt-2 text-[16px]">{project.client}</dd>
          </div>
          <div>
            <dt className="label text-mute">Lieu</dt>
            <dd className="mt-2 text-[16px]">{project.location}</dd>
          </div>
          <div>
            <dt className="label text-mute">Expertises</dt>
            <dd className="mt-2 text-[16px]">
              {project.expertises.map((e, i) => {
                const ex = getExpertise(e);
                if (!ex) return null;
                return (
                  <span key={e}>
                    <Link href={`/expertises/${e}`} className="link-line">
                      {ex.short}
                    </Link>
                    {i < project.expertises.length - 1 && ", "}
                  </span>
                );
              })}
            </dd>
          </div>
          <div>
            <dt className="label text-mute">En ligne</dt>
            <dd className="mt-2 text-[16px]">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-line text-brand">
                {project.domain} ↗
              </a>
            </dd>
          </div>
        </dl>
      </PageHeader>

      <div className="shell">
        <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor={visitLabel(project)} className="group mx-auto block max-w-[1180px]">
          <ProjectCover project={project} size="hero" priority className="aspect-[4/3] w-full rounded-[8px] md:aspect-[16/10]" />
        </a>
        <div className="mx-auto mt-6 flex max-w-[1180px] flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-mute">
            {project.restricted ? "Application en ligne, accès réservé à ses utilisateurs." : "Le site est en ligne : allez le voir par vous-même."}
          </p>
          <Button href={project.url}>{visitLabel(project)}</Button>
        </div>
      </div>

      <section className="shell py-24 md:py-36">
        {story.map((block, i) => (
          <div
            key={block.label}
            data-reveal suppressHydrationWarning
            className="grid gap-6 border-t hairline py-12 md:grid-cols-12 md:py-16"
            style={{ "--delay": `${i === 0 ? 0 : 40}ms` } as React.CSSProperties}
          >
            <h2 className="label text-mute md:col-span-3">{block.label}</h2>
            <p className="lead max-w-[56ch] text-ink/85 md:col-span-8 md:col-start-5">{block.text}</p>
          </div>
        ))}

        <div data-reveal suppressHydrationWarning className="grid gap-6 border-t hairline pt-12 md:grid-cols-12 md:pt-16">
          <h2 className="label text-mute md:col-span-3">Prestations & outils</h2>
          <div className="flex flex-wrap gap-2 md:col-span-8 md:col-start-5">
            {[...project.services, ...project.stack].map((t) => (
              <span key={t} className="meta rounded-full border hairline px-3.5 py-1.5 text-ink/75">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <NextLink href={`/realisations/${next.slug}`} eyebrow="Projet suivant" title={next.name} />
    </>
  );
}
