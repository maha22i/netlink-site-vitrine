"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Un seul observateur pour toute la page : les composants serveur
 * déclarent simplement `data-reveal` et éventuellement `--delay`.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => io.observe(el));

    scan();
    // Les contenus filtrés côté client (réalisations) apparaissent après coup.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
