import { notFound } from "next/navigation";
import { expertises, getExpertise } from "@/content/expertises";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Netlink Solutions — Expertise";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return expertises.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expertise = getExpertise(slug);
  if (!expertise) notFound();
  const { headline } = expertise;

  return ogImage({
    title: [{ text: headline.before }, { text: headline.accent, accent: true }, { text: headline.after ?? "" }],
    topRight: `Expertise ${expertise.index} / 0${expertises.length}`,
    bottomLeft: expertise.title,
    bottomRight: "Paris — Djibouti",
  });
}
