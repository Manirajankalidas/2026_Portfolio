import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1080px] px-6 ${className}`}>{children}</div>;
}

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <Container className="rise pt-12 pb-8 md:pt-16">
      <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-tight md:text-6xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-xl leading-snug text-muted">{intro}</p>}
    </Container>
  );
}

export function SectionTitle({
  title,
  href,
  linkLabel,
  intro,
  points,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  intro?: string;
  points?: string[];
}) {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
          {title}
        </h2>
        {href && (
          <Link href={href} className="text-[17px] text-accent hover:underline">
            {linkLabel} ›
          </Link>
        )}
      </div>
      {intro && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{intro}</p>}
      {points && points.length > 0 && (
        <ul className="mt-6 grid max-w-3xl gap-x-10 gap-y-3 sm:grid-cols-2">
          {points.map((pt) => (
            <li key={pt} className="flex items-start gap-3 text-[17px] leading-snug">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "text";
  external?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "rounded-full bg-btn px-7 py-3.5 text-[17px] text-white transition-opacity hover:opacity-90"
      : "px-2 py-3.5 text-[17px] text-accent hover:underline";
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Chip({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`rounded-full px-3.5 py-1.5 text-[15px] ${dark ? "bg-[#2c2c2e] text-[#f5f5f7]" : "bg-chip"}`}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`text-xs font-semibold uppercase tracking-wider ${className || "text-muted"}`}>
      {children}
    </span>
  );
}
