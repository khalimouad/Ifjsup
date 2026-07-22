"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/lib/ui";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const base = `/${locale}`;
  const links = [
    { href: base, label: t(ui.nav.home, locale) },
    { href: `${base}/institut`, label: t(ui.nav.institute, locale) },
    { href: `${base}/formations`, label: t(ui.nav.programs, locale) },
    { href: `${base}/campus/casablanca`, label: t(ui.nav.campusCasa, locale) },
    { href: `${base}/campus/marrakech`, label: t(ui.nav.campusMrk, locale) },
    { href: `${base}/actualites`, label: t(ui.nav.news, locale) },
    { href: `${base}/galerie`, label: t(ui.nav.gallery, locale) },
    { href: `${base}/admission`, label: t(ui.nav.admission, locale) },
    { href: `${base}/contact`, label: t(ui.nav.contact, locale) },
  ];

  // Bascule de langue en conservant la page courante
  const otherLocale: Locale = locale === "fr" ? "ar" : "fr";
  const switchedPath = pathname.replace(new RegExp(`^/${locale}`), `/${otherLocale}`) || `/${otherLocale}`;

  const isActive = (href: string) =>
    href === base ? pathname === base : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href={base} className="tap flex items-center gap-3" aria-label="IFJ">
          <span className="grid h-10 w-10 place-items-center rounded-sm bg-primary-700 font-display text-lg font-black text-white">
            IFJ
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-bold tracking-wide text-primary-800">
              {locale === "fr" ? "Institut Supérieur de Journalisme" : "المعهد العالي للصحافة والإعلام"}
            </span>
            <span className="text-xs text-ink/60">
              {locale === "fr" ? "Casablanca · Marrakech" : "الدار البيضاء · مراكش"}
            </span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {links.slice(0, 7).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`tap flex items-center rounded-sm px-3 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "text-accent-600"
                  : "text-primary-800 hover:bg-primary-50 hover:text-primary-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchedPath}
            className="tap flex items-center rounded-sm border border-primary-200 px-3 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-400"
            lang={otherLocale}
            aria-label={otherLocale === "ar" ? "النسخة العربية" : "Version française"}
          >
            {t(ui.langSwitch, locale)}
          </Link>
          <Link
            href={`${base}/admission`}
            className="tap hidden items-center rounded-sm bg-accent-500 px-4 text-sm font-bold text-white transition-colors hover:bg-accent-600 md:flex"
          >
            {t(ui.cta.apply, locale)}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="tap grid place-items-center rounded-sm border border-primary-200 text-primary-800 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Menu mobile sliding panel */}
      <nav
        aria-label="Navigation mobile"
        className={`fixed left-0 top-16 bottom-0 z-50 w-80 overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-8">
          <ul className="flex flex-col gap-1">
            {links.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`tap flex items-center border-b border-primary-100 py-4 font-display text-lg font-bold ${
                    isActive(l.href) ? "text-accent-600" : "text-primary-800"
                  }`}
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`${base}/admission`}
            className="tap mt-8 flex items-center justify-center rounded-sm bg-accent-500 py-4 font-bold text-white"
          >
            {t(ui.cta.applyNow, locale)}
          </Link>
        </div>
      </nav>
    </header>
  );
}
