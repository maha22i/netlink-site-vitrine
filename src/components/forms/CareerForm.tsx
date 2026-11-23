"use client";

import { useState } from "react";
import { roles } from "@/content/careers";
import { site } from "@/content/site";
import { ChoiceField, FormNotice, Honeypot, SubmitButton, TextArea, TextField, type FormStatus } from "./fields";

const MAX_CV = 5 * 1024 * 1024;

/** Candidature en une minute : identité, poste, un lien ou un CV, un mot. */
export function CareerForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    const file = data.get("cv");
    if (file instanceof File && file.size > 0 && (file.size > MAX_CV || (file.type && file.type !== "application/pdf"))) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/candidature", { method: "POST", body: data });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setFileName(null);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-10">
      <Honeypot />
      <div className="grid gap-10 sm:grid-cols-2">
        <TextField label="Nom" name="name" autoComplete="name" required placeholder="Votre nom" />
        <TextField label="E-mail" name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" />
      </div>
      <ChoiceField label="Poste" name="role" options={roles.map((r) => r.title)} defaultValue={roles[0].title} />

      <div className="grid gap-10 sm:grid-cols-2">
        <TextField label="LinkedIn ou portfolio" name="link" type="url" optional placeholder="https://" />
        <label className="block">
          <span className="label text-mute">
            CV <span className="text-ink/35">— PDF, 5 Mo max.</span>
          </span>
          <span className="mt-2 flex cursor-pointer items-center justify-between border-b hairline py-3 text-[18px] tracking-[-0.015em] transition-colors duration-200 hover:border-ink">
            <span className={fileName ? "truncate text-ink" : "text-ink/30"}>{fileName ?? "Joindre un fichier"}</span>
            <span aria-hidden className="text-ink/50">+</span>
          </span>
          <input
            type="file"
            name="cv"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
      </div>

      <TextArea label="Un mot sur vous" name="message" optional rows={3} placeholder="Ce qui vous anime, ce que vous aimeriez construire avec nous." />

      <div className="space-y-5 pt-2">
        <FormNotice
          status={status}
          onDismiss={() => setStatus("idle")}
          success="Candidature envoyée. Nous lisons chaque dossier avec attention."
          error={
            <>
              L’envoi n’a pas abouti. Écrivez-nous à{" "}
              <a className="underline decoration-white/50 underline-offset-4" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </>
          }
        />
        <SubmitButton status={status} label="Envoyer ma candidature" />
      </div>
    </form>
  );
}
