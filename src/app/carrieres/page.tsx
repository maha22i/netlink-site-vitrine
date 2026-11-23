import type { Metadata } from "next";
import { roles } from "@/content/careers";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accent } from "@/components/ui/LineReveal";
import { CareerForm } from "@/components/forms/CareerForm";

export const metadata: Metadata = pageMetadata({
  title: "Carrières",
  description:
    "Rejoindre Netlink Solutions : postes ouverts à Djibouti et candidatures spontanées en développement, infrastructure et intelligence artificielle.",
  path: "/carrieres",
});

export default function CarrieresPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Carrières", path: "/carrieres" }])} />
      <PageHeader
        eyebrow="Carrières"
        meta={`${roles.length} ouvertures`}
        lines={["Construire", <>ce qui <Accent>tient.</Accent></>]}
        intro={
          <p>
            Nous cherchons des personnes qui aiment le travail bien fait, même quand personne ne le voit.
            Des profils curieux, exigeants avec eux-mêmes, et attentifs à ceux qu’ils servent.
          </p>
        }
      />

      <section className="shell pb-24 md:pb-36">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="label text-mute md:col-span-3">Postes ouverts</p>
          <div className="border-t hairline md:col-span-9">
            {roles.map((role) => (
              <details key={role.slug} data-reveal suppressHydrationWarning className="group border-b hairline">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-8 md:py-10 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="title-md block transition-transform duration-500 ease-out group-hover:translate-x-2">{role.title}</span>
                    <span className="meta mt-2 block text-mute">
                      {role.location} · {role.contract}
                    </span>
                  </span>
                  <span aria-hidden className="text-2xl transition-transform duration-300 ease-out group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="grid gap-10 pb-12 md:grid-cols-2">
                  <p className="text-[17px] leading-relaxed text-ink/75 md:col-span-2 md:max-w-[60ch]">{role.summary}</p>
                  <div>
                    <p className="label text-mute">Vos missions</p>
                    <ul className="mt-4 space-y-2 text-[16px] text-ink/75">
                      {role.missions.map((m) => (
                        <li key={m}>— {m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="label text-mute">Votre profil</p>
                    <ul className="mt-4 space-y-2 text-[16px] text-ink/75">
                      {role.profile.map((p) => (
                        <li key={p}>— {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="postuler" className="border-t hairline">
        <div className="shell grid gap-12 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-4">
            <h2 data-reveal suppressHydrationWarning className="title-lg">
              Postuler en <Accent>une minute.</Accent>
            </h2>
            <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-mute">
              Pas de lettre de motivation imposée. Un lien ou un CV suffit, nous revenons vers chaque
              candidat.
            </p>
          </div>
          <div data-reveal suppressHydrationWarning className="md:col-span-7 md:col-start-6">
            <CareerForm />
          </div>
        </div>
      </section>
    </>
  );
}
