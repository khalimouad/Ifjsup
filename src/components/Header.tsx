"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, site } from "@/lib/content";
import { Icon } from "./Icon";
import { ThemeToggle } from "./Theme";

/**
 * En-tête transparent superposé au héros, qui s'opacifie au défilement, et
 * menu plein écran déclenché à toutes les largeurs — comme le modèle.
 */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hdr = useRef<HTMLElement>(null);

  const base = `/${locale}`;
  const links = [
    { href: base, label: t(ui.nav.home, locale) },
    { href: `${base}/institut`, label: t(ui.nav.institute, locale) },
    { href: `${base}/formations`, label: t(ui.nav.programs, locale) },
    { href: `${base}/admission`, label: t(ui.nav.admission, locale) },
    { href: `${base}/galerie`, label: t(ui.nav.studentLife, locale) },
    { href: `${base}/actualites`, label: t(ui.nav.news, locale) },
    { href: `${base}/contact`, label: t(ui.nav.contact, locale) },
  ];

  useEffect(() => setOpen(false), [pathname]);

  /* Fond opaque dès que la page quitte le haut.
     Transparent, l'en-tête emprunte les jetons sombres du bandeau qu'il
     survole ; encore faut-il qu'il y en ait un. Sur les pages qui n'ouvrent
     pas sur un héros (fil d'Ariane, pages légales), il reste donc opaque —
     sinon son texte clair se poserait sur un fond clair. */
  useEffect(() => {
    const el = hdr.current;
    if (!el) return;
    // Le bandeau ne protège l'en-tête que s'il démarre à sa hauteur. Sur une
    // page qui ouvre par un fil d'Ariane, il arrive plus bas et l'en-tête
    // transparent se retrouverait clair sur clair. On compare au placement
    // naturel de l'en-tête dans le flux (`offsetTop`), pas au haut du document :
    // le bandeau d'annonce le décale, et le héros remonte sous lui.
    const band = document.querySelector("main .hero, main .phero");
    const covered =
      !!band &&
      band.getBoundingClientRect().top + window.scrollY <= el.offsetTop + 4;
    if (!covered) {
      el.dataset.stuck = "1";
      return;
    }
    const onScroll = () => {
      el.dataset.stuck = window.scrollY > 40 ? "1" : "0";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

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

  function current(href: string) {
    if (href === base) return pathname === base || pathname === `${base}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const other: Locale = locale === "fr" ? "ar" : "fr";
  const otherHref = pathname.replace(/^\/(fr|ar)/, `/${other}`) || `/${other}`;

  const socials: [string, string][] = [
    ["Instagram", site.social.instagram],
    ["Facebook", site.social.facebook],
    ["YouTube", site.social.youtube],
    ["LinkedIn", site.social.linkedin],
  ];

  const brand = (
    <span className="brand-mark" aria-hidden="true">
      IFJ<sup>SUP</sup>
    </span>
  );

  return (
    <>
      <header className="hdr" ref={hdr} data-stuck="0">
        <div className="hdr-in">
          <Link href={base} className="brand" aria-label="IFJ SUP">
            {brand}
            <span className="brand-sub">{t(ui.header.brandSub, locale)}</span>
          </Link>

          {/* Barre visible à partir de 1200 px : les rubriques restent
              repérables d'un coup d'œil sur grand écran. Le menu plein écran
              reste ouvert à toutes les largeurs. */}
          <nav className="nav" aria-label={t(ui.header.sections, locale)}>
            {links.slice(1, 6).map((l) => (
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
            <Link href={otherHref} className="lang" hrefLang={other} lang={other}>
              {t(ui.langSwitch, locale)}
            </Link>

            <ThemeToggle label={t(ui.header.theme, locale)} />

            <Link href={`${base}/admission`} className="btn btn-accent btn-sm">
              {t(ui.cta.apply, locale)}
              <Icon name="arrow" size={15} sw={2.2} className="arw" />
            </Link>

            <button
              type="button"
              className="menu-btn tap"
              aria-label={t(ui.header.menu, locale)}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="menu-bars" aria-hidden="true">
                <i />
                <i />
              </span>
              {t(ui.header.menuLabel, locale)}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t(ui.header.menu, locale)}
        >
          <div className="overlay-top">
            <Link href={base} className="brand" aria-label="IFJ SUP">
              {brand}
            </Link>
            <button
              type="button"
              className="menu-btn tap"
              aria-label={t(ui.header.close, locale)}
              onClick={() => setOpen(false)}
            >
              <Icon name="close" size={16} sw={2.2} />
              {t(ui.header.closeLabel, locale)}
            </button>
          </div>

          <div className="overlay-body">
            <nav className="overlay-nav" aria-label={t(ui.header.menu, locale)}>
              {links.map((l, i) => (
                <div className="overlay-item" key={l.href}>
                  <Link
                    href={l.href}
                    className="overlay-link"
                    aria-current={current(l.href) ? "page" : undefined}
                    style={{ animationDelay: `${0.06 + i * 0.055}s` }}
                  >
                    <span>{l.label}</span>
                    <Icon name="arrow" size={26} sw={2} className="arw" />
                  </Link>
                </div>
              ))}
            </nav>

            <div className="overlay-aside">
              <div>
                <h3>{t(ui.labels.chooseCampus, locale)}</h3>
                {campuses.map((c) => (
                  <Link key={c.slug} href={`${base}/campus/${c.slug}`}>
                    {t(c.city, locale)} — <span dir="ltr">{c.phones[0]}</span>
                  </Link>
                ))}
                <a href={`mailto:${site.email}`} dir="ltr">
                  {site.email}
                </a>
              </div>

              <div>
                {/* Sous 900 px l'en-tête masque la langue : elle vit ici. */}
                <h3>{t(ui.header.language, locale)}</h3>
                <Link
                  href={otherHref}
                  className="chip overlay-lang"
                  hrefLang={other}
                  lang={other}
                >
                  {t(ui.langSwitch, locale)}
                </Link>
              </div>

              <div>
                <h3>{t(ui.footer.followUs, locale)}</h3>
                <div className="overlay-socials">
                  {socials.map(([name, href]) => (
                    <a
                      key={name}
                      href={href}
                      className="chip"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              <Link href={`${base}/admission`} className="btn btn-accent">
                {t(ui.cta.applyNow, locale)}
                <Icon name="arrow" size={16} sw={2.2} className="arw" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
