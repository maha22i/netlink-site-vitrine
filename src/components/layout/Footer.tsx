import Link from "next/link";
import { nav, site } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { Logo } from "@/components/ui/Logo";

/** Pied de page sobre : l’essentiel, une signature, rien de plus. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-paper">
      <div className="shell pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-8 md:col-span-5">
            <Link href="/" aria-label="Netlink Solutions, accueil" className="inline-block">
              <Logo tone="light" />
            </Link>
            <p className="title-md max-w-[19ch] text-paper/90">
              Du code au câble, <span className="accent">une équipe</span> à vos côtés.
            </p>
          </div>

          <nav aria-label="Pied de page" className="md:col-span-2 md:col-start-7">
            <ul className="space-y-2 text-[15px]">
              {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line text-paper/60 transition-colors duration-200 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6 text-[15px] md:col-span-3 md:col-start-10">
            <div className="space-y-2">
              <a href={`mailto:${site.contact.email}`} className="link-line block w-fit">
                {site.contact.email}
              </a>
              {site.contact.phones.map((p) => (
                <a key={p.tel} href={p.tel} suppressHydrationWarning className="link-line block w-fit text-paper/60 hover:text-paper">
                  {p.phone} <span className="text-paper/35">· {p.label}</span>
                </a>
              ))}
            </div>
            <ul className="meta space-y-1 text-paper/45">
              {site.locations.map((l) => (
                <li key={l.city} className="flex justify-between gap-6">
                  <span>{l.city}</span>
                  <LocalTime timeZone={l.timeZone} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="shell flex flex-col gap-3 py-6 text-[13px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.year} {site.name}
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="link-line hover:text-paper">
              Mentions légales
            </Link>
            {site.social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="link-line hover:text-paper">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
