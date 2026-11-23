"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { ChoiceField, FormNotice, Honeypot, SubmitButton, TextArea, TextField, type FormStatus } from "./fields";

const needs = ["IA & automatisation", "Site ou application", "Réseau", "Cloud", "Matériel", "Autre chose"];

/** Quatre champs, pas un de plus. */
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
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
        <TextField label="E-mail" name="email" type="email" autoComplete="email" required placeholder="vous@entreprise.fr" />
      </div>
      <ChoiceField label="Votre besoin" name="need" options={needs} defaultValue={needs[0]} />
      <TextArea label="Votre message" name="message" required rows={4} placeholder="Quelques lignes sur votre projet, votre contexte, vos délais." />

      <div className="space-y-5 pt-2">
        <FormNotice
          status={status}
          onDismiss={() => setStatus("idle")}
          success="Message envoyé. Nous revenons vers vous sous un jour ouvré."
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
        <SubmitButton status={status} label="Envoyer la demande" />
      </div>
    </form>
  );
}
