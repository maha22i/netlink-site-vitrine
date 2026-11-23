import type { Metadata } from "next";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accent } from "@/components/ui/LineReveal";
import { LocalTime } from "@/components/ui/LocalTime";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Un projet d’IA, de site, de réseau, de cloud ou de matériel informatique ? Écrivez-nous : réponse sous un jour ouvré, depuis Paris ou Djibouti.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHeader eyebrow="Contact" meta="Réponse sous un jour ouvré" lines={["Parlons de", <>votre <Accent>projet.</Accent></>]} />

      <section className="shell grid gap-20 pb-28 md:grid-cols-12 md:pb-40">
        <aside className="fade-in space-y-12 md:col-span-4" style={{ "--delay": "420ms" } as React.CSSProperties}>
          <div>
            <p className="label text-mute">Écrire</p>
            <a href={`mailto:${site.contact.email}`} className="link-line mt-3 inline-block text-[clamp(1.25rem,1.8vw,1.6rem)] tracking-[-0.025em]">
              {site.contact.email}
            </a>
          </div>
          <div>
            <p className="label text-mute">Appeler ou écrire sur WhatsApp</p>
            <ul className="mt-3 space-y-4">
              {site.contact.phones.map((p) => (
                <li key={p.tel}>
                  <span className="meta block text-mute">{p.label}</span>
                  <span className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <a href={p.tel} suppressHydrationWarning className="link-line text-[clamp(1.2rem,1.6vw,1.45rem)] tracking-[-0.025em]">
                      {p.phone}
                    </a>
                    <a href={p.whatsapp} target="_blank" rel="noopener noreferrer" className="link-line text-[14px] font-medium text-brand">
                      WhatsApp ↗
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-mute">Où nous trouver</p>
            <ul className="mt-3 space-y-2 text-[17px]">
              {site.locations.map((l) => (
                <li key={l.city} className="flex items-baseline justify-between gap-6 border-b hairline pb-2">
                  <span>
                    {l.city} <span className="text-ink/45">— {l.label}</span>
                  </span>
                  <span className="meta text-mute">
                    <LocalTime timeZone={l.timeZone} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-mute">{site.contact.hours}</p>
          </div>
        </aside>

        <div className="fade-in md:col-span-7 md:col-start-6" style={{ "--delay": "520ms" } as React.CSSProperties}>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
