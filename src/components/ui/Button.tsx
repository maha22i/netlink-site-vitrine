import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light";
type Size = "md" | "sm";

type Common = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** "out" pour un lien externe (flèche diagonale). */
  arrow?: "next" | "out" | "none";
  className?: string;
};

const base =
  "group/btn relative inline-flex shrink-0 items-center gap-3 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] focus-visible:outline-offset-4 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[0_10px_30px_-12px_rgba(2,33,82,0.55)] hover:bg-[#0b2f6b] hover:shadow-[0_14px_34px_-12px_rgba(0,144,244,0.5)]",
  secondary: "border border-navy/15 bg-white/70 text-navy hover:border-navy/30 hover:bg-white",
  light: "bg-white text-navy shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] hover:bg-[#eef6ff]",
};

const sizes: Record<Size, { box: string; chip: string; noChip: string }> = {
  md: { box: "h-12 pl-6 pr-1.5 text-[15px]", chip: "size-9", noChip: "h-12 px-6 text-[15px]" },
  sm: { box: "h-10 pl-5 pr-1 text-[14px]", chip: "size-8", noChip: "h-10 px-5 text-[14px]" },
};

/** Pastille ronde avec une flèche qui glisse : sobre, lisible, jamais criarde. */
function Chip({ variant, size, arrow }: { variant: Variant; size: Size; arrow: "next" | "out" }) {
  const glyph = arrow === "out" ? "↗" : "→";
  const move =
    arrow === "out"
      ? "group-hover/btn:translate-x-[140%] group-hover/btn:-translate-y-[140%]"
      : "group-hover/btn:translate-x-[160%]";
  const enter =
    arrow === "out"
      ? "-translate-x-[140%] translate-y-[140%] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
      : "-translate-x-[160%] group-hover/btn:translate-x-0";
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full text-[15px] transition-colors duration-200",
        sizes[size].chip,
        variant === "secondary" ? "bg-navy/[0.06] text-navy group-hover/btn:bg-brand group-hover/btn:text-white" : "bg-brand text-white",
      )}
    >
      <span className={cn("transition-transform duration-300 ease-out", move)}>{glyph}</span>
      <span className={cn("absolute transition-transform duration-300 ease-out", enter)}>{glyph}</span>
    </span>
  );
}

function classes({ variant = "primary", size = "md", arrow = "next", className }: Common) {
  return cn(base, variants[variant], arrow === "none" ? sizes[size].noChip : sizes[size].box, className);
}

export function Button(props: Common & { href: string }) {
  const { href, children, variant = "primary", size = "md", arrow = "next" } = props;
  const external = href.startsWith("http");
  const inner = (
    <>
      <span>{children}</span>
      {arrow !== "none" && <Chip variant={variant} size={size} arrow={external ? "out" : arrow} />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes(props)}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(props)}>
      {inner}
    </Link>
  );
}

/** Même apparence, pour les formulaires. */
export function SubmitButtonBase(
  props: Common & { disabled?: boolean; type?: "submit" | "button"; onClick?: () => void },
) {
  const { children, variant = "primary", size = "md", arrow = "next", disabled, type = "submit", onClick } = props;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes(props)}>
      <span>{children}</span>
      {arrow !== "none" && <Chip variant={variant} size={size} arrow={arrow === "out" ? "out" : "next"} />}
    </button>
  );
}
