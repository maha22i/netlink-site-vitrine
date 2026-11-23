import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Netlink Solutions — Réalisation";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return ogImage({
    title: [{ text: project.name }],
    topRight: `Réalisation · ${project.year}`,
    bottomLeft: project.kind,
    bottomRight: project.location,
    background: project.cover.bg,
    color: project.cover.fg,
    accent: project.cover.fg,
  });
}
