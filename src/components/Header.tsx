"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { Icon } from "./Icon";
import { ThemeToggle } from "./Theme";

/** Barre de navigation collante — reprise de l'en-tête 76 px du concept. */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const base = `/${locale}`;
  const links = [
    { href: base, label: t(ui.nav.home, locale) },
    { href: `${base}/institut`, label: t(ui.nav.institute, locale) },
    { href: `${base}/formations`, label: t(ui.nav.programs, locale) },
    { href: `${base}/admission`, label: t(ui.nav.admission, locale) },
    { href: `${base}/galerie`, label: t(ui.nav.studentLife, locale) },
    { href: `${base}/actualites`, label: t(ui.nav.news, locale) },
    { href: `${base}/campus/casablanca`, label: t(ui.nav.campuses, locale) },
    { href: `${base}/contact`, label: t(ui.nav.contact, locale) },
  ];

  // Le changement de route referme le panneau (liens, retour arrière).
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  /** Actif sur la page exacte, ou sur toute sous-page de la rubrique. */
  function current(href: string) {
    if (href === base) return pathname === base || pathname === `${base}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const other: Locale = locale === "fr" ? "ar" : "fr";
  const otherHref = pathname.replace(/^\/(fr|ar)/, `/${other}`) || `/${other}`;

  return (
    <>
      <header className="hdr">
        <div className="hdr-in">
          <Link href={base} className="brand" aria-label="IFJ SUP">
            <span className="brand-mark" aria-hidden="true">
              IFJ<sup>SUP</sup>
            </span>
            <span className="brand-sub">{t(ui.header.brandSub, locale)}</span>
          </Link>

          <nav className="nav" aria-label={t(ui.header.menu, locale)}>
            {links.slice(0, 6).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link"
                aria-current={current(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <span className="hdr-spacer" />

          <div className="hdr-actions">
            <button
              type="button"
              className="icon-box burger tap"
              aria-label={t(ui.header.menu, locale)}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" size={17} sw={2} />
            </button>

            <Link href={otherHref} className="lang" hrefLang={other} lang={other}>
              {t(ui.langSwitch, locale)}
            </Link>

            <ThemeToggle label={t(ui.header.theme, locale)} />

            <Link href={`${base}/admission`} className="btn btn-gold btn-sm">
              {t(ui.cta.apply, locale)}
            </Link>
          </div>
        </div>
      </header>

      {/* Rendu hors de `.hdr` : le `backdrop-filter` de l'en-tête en fait un bloc
          conteneur pour les descendants fixes, ce qui écraserait le panneau à
          76 px de haut. */}
      {open && (
        <div className="sheet" onClick={() => setOpen(false)} role="presentation">
          <div
            className="sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.header.menu, locale)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-head">
              <span className="brand-mark" aria-hidden="true">
                IFJ<sup>SUP</sup>
              </span>
              <button
                type="button"
                className="icon-box tap"
                aria-label={t(ui.header.close, locale)}
                onClick={() => setOpen(false)}
              >
                <Icon name="close" size={17} sw={2} />
              </button>
            </div>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="sheet-link"
                aria-current={current(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
            <Link href={`${base}/admission`} className="btn btn-gold sheet-cta">
              {t(ui.cta.applyNow, locale)}
              <Icon name="arrow" size={16} sw={2} className="arw" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
