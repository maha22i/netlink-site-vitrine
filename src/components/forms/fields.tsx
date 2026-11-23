"use client";

import { useEffect, useRef } from "react";
import { SubmitButtonBase } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const control =
  "mt-2 w-full rounded-none border-b hairline bg-transparent py-3 text-[18px] tracking-[-0.015em] text-ink outline-none transition-[border-color] duration-200 placeholder:text-ink/30 focus:border-ink focus-visible:outline-none";

export function TextField({
  label,
  optional,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; optional?: boolean }) {
  return (
    <label className={cn("block", className)}>
      <span className="label text-mute">
        {label}
        {optional && <span className="text-ink/35"> — facultatif</span>}
      </span>
      <input {...props} className={control} />
    </label>
  );
}

export function TextArea({
  label,
  optional,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; optional?: boolean }) {
  return (
    <label className={cn("block", className)}>
      <span className="label text-mute">
        {label}
        {optional && <span className="text-ink/35"> — facultatif</span>}
      </span>
      <textarea {...props} className={cn(control, "min-h-28 resize-none leading-relaxed")} />
    </label>
  );
}

/** Choix unique présenté en pastilles : plus rapide qu’une liste déroulante. */
export function ChoiceField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <fieldset>
      <legend className="label text-mute">{label}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" name={name} value={option} defaultChecked={option === defaultValue} className="peer sr-only" />
            <span className="block rounded-full border hairline px-4 py-2 text-[15px] tracking-[-0.01em] text-ink/70 transition-[background-color,color,border-color,transform] duration-200 ease-out select-none peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-offset-2 hover:text-ink active:scale-[0.97]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Anti-robots : heure d’affichage du formulaire, vérifiée par le serveur.
 * Un champ caché n’est jamais rempli par l’autocomplétion du navigateur.
 */
export function Honeypot() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = String(Date.now());
  }, []);
  return <input ref={ref} type="hidden" name="started_at" defaultValue="" />;
}

export type FormStatus = "idle" | "sending" | "sent" | "error";

/** Bouton d’envoi, avec transition floutée entre les états. */
export function SubmitButton({ status, label = "Envoyer" }: { status: FormStatus; label?: string }) {
  const text = status === "sending" ? "Envoi en cours" : label;
  return (
    <SubmitButtonBase disabled={status === "sending"}>
      <span key={text} className="inline-block animate-[blur-in_260ms_var(--ease-out)_both]">
        {text}
      </span>
    </SubmitButtonBase>
  );
}

/** Confirmation ou erreur, pleine largeur, qui se referme seule. */
export function FormNotice({
  status,
  success,
  error,
  onDismiss,
}: {
  status: FormStatus;
  success: string;
  error: React.ReactNode;
  onDismiss: () => void;
}) {
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;
  const visible = status === "sent" || status === "error";

  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => dismissRef.current(), status === "error" ? 8000 : 5000);
    return () => window.clearTimeout(id);
  }, [status, visible]);

  if (!visible) return null;

  const isError = status === "error";
  return (
    <div
      role="status"
      className={cn(
        "flex items-start justify-between gap-6 rounded-2xl px-5 py-4 text-[15px] leading-snug text-white shadow-[0_18px_40px_-24px_rgba(2,18,48,0.85)] animate-[fade-in_240ms_var(--ease-out)_both]",
        isError ? "bg-ink" : "bg-navy",
      )}
    >
      <p className="max-w-[46ch]">{isError ? error : success}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="label shrink-0 text-white/70 transition-colors duration-200 hover:text-white"
      >
        Fermer
      </button>
    </div>
  );
}
