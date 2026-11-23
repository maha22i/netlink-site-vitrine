"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LocalTime } from "@/components/ui/LocalTime";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const [prevPath, setPrevPath] = useState(pathname);

  // Ferme le menu à chaque navigation (ajustement pendant le rendu, sans effet).
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Masque l’en-tête quand on descend, le révèle dès qu’on remonte.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-500 ease-out md:pt-4",
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0",
        )}
      >
        <div className="shell">
          {/* Barre flottante : verre dépoli léger, bord fin, ombre douce. */}
          <div
            className={cn(
              "flex h-14 items-center justify-between rounded-full pr-2 pl-4 transition-[background-color,box-shadow,border-color] duration-300 md:h-16 md:pl-5",
              open
                ? "border border-transparent bg-transparent"
                : cn(
                    "border border-navy/[0.07] bg-white/80 backdrop-blur-md",
                    scrolled ? "shadow-[0_10px_40px_-16px_rgba(2,33,82,0.35)]" : "shadow-[0_6px_24px_-16px_rgba(2,33,82,0.25)]",
                  ),
            )}
          >
            <Link href="/" aria-label={`${site.name}, accueil`} className="relative z-10">
              <Logo tone={open ? "light" : "color"} />
            </Link>

            <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[15px] tracking-[-0.01em] transition-colors duration-200",
                    isActive(item.href) ? "bg-brand/10 text-brand" : "text-ink/65 hover:bg-navy/[0.05] hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden md:block">
                <Button href="/contact" size="sm">
                  Démarrer un projet
                </Button>
              </span>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                className={cn(
                  "relative z-10 h-10 rounded-full px-4 text-[14px] font-medium transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97] md:hidden",
                  open ? "bg-white/10 text-paper" : "bg-navy text-white",
                )}
              >
                {open ? "Fermer" : "Menu"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile : un seul mouvement (le panneau), les liens sont déjà là. */}
      <div
        id="menu-mobile"
        aria-hidden={!open}
        inert={!open}
        className="fixed inset-0 z-40 flex flex-col bg-night text-paper transition-[clip-path] duration-500 ease-(--ease-drawer) md:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
      >
        <nav aria-label="Navigation mobile" className="shell flex flex-1 flex-col justify-center gap-2">
          {[{ label: "Accueil", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "title-lg py-1 transition-opacity duration-200",
                pathname === item.href || (item.href !== "/" && isActive(item.href)) ? "opacity-100" : "opacity-45",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="shell flex justify-between pb-10 text-paper/55">
          {site.locations.map((l) => (
            <p key={l.city} className="meta">
              {l.city} <LocalTime timeZone={l.timeZone} />
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
