import Link from "next/link";

/**
 * Lien de fin de page vers l’élément suivant (projet, expertise).
 * Même composant partout : on sait toujours où l’on va ensuite.
 */
export function NextLink({ href, eyebrow, title }: { href: string; eyebrow: string; title: string }) {
  return (
    <section className="border-t hairline">
      <Link href={href} className="shell group flex flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-24">
        <div>
          <p className="label text-mute">{eyebrow}</p>
          <p className="title-xl mt-4 transition-transform duration-700 ease-out group-hover:translate-x-4">{title}</p>
        </div>
        <span aria-hidden className="title-xl transition-transform duration-700 ease-out group-hover:translate-x-3">
          →
        </span>
      </Link>
    </section>
  );
}
