"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [open, setOpen] = useState(false);
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `text-[16px] transition-opacity hover:opacity-70 ${active(href) ? "font-bold" : "font-medium"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[68px] max-w-[1080px] items-center gap-8 px-6"
      >
        <Link
          href="/"
          className="flex grow items-center gap-3 text-[21px] font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true" className="logo-mark" />
          <span className="translate-y-[3px]">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
        <Link
          href="/contact"
          className="hidden rounded-full bg-btn px-5 py-2 text-[16px] font-semibold text-white transition-opacity hover:opacity-90 md:block"
        >
          Contact
        </Link>

        <button
          type="button"
          className="-mr-3 flex size-11 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <ul className="mx-auto flex max-w-[1080px] flex-col px-6 py-2">
            {[...site.nav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-xl ${active(item.href) ? "font-semibold" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
