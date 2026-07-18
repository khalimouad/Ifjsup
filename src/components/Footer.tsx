import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, site } from "@/lib/content";

export function Footer({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  const quick = [
    { href: `${base}/institut`, label: t(ui.nav.institute, locale) },
    { href: `${base}/formations`, label: t(ui.nav.programs, locale) },
    { href: `${base}/actualites`, label: t(ui.nav.news, locale) },
    { href: `${base}/galerie`, label: t(ui.nav.gallery, locale) },
    { href: `${base}/admission`, label: t(ui.nav.admission, locale) },
    { href: `${base}/contact`, label: t(ui.nav.contact, locale) },
  ];

  const socials = [
    { name: "Facebook", href: site.social.facebook },
    { name: "Instagram", href: site.social.instagram },
    { name: "YouTube", href: site.social.youtube },
    { name: "LinkedIn", href: site.social.linkedin },
    { name: "X", href: site.social.twitter },
  ];

  return (
    <footer className="bg-primary-950 pb-24 text-white lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-sm bg-white font-display text-lg font-black text-primary-800">
                IFJ
              </span>
              <span className="font-display font-bold">{t(site.shortName, locale)}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{t(ui.footer.about, locale)}</p>
          </div>

          <nav aria-label={t(ui.footer.quickLinks, locale)}>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-accent-400">
              {t(ui.footer.quickLinks, locale)}
            </h3>
            <ul className="mt-4 space-y-2">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="tap inline-flex items-center text-sm text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-accent-400">
              {t(ui.footer.campuses, locale)}
            </h3>
            <ul className="mt-4 space-y-5">
              {campuses.map((c) => (
                <li key={c.slug} className="text-sm">
                  <Link href={`${base}/campus/${c.slug}`} className="font-semibold text-white hover:text-accent-300">
                    {t(c.city, locale)}
                  </Link>
                  <p className="mt-1 text-white/60">{t(c.address, locale)}</p>
                  <p className="mt-1 text-white/80" dir="ltr">
                    {c.phones.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-accent-400">
              {t(ui.footer.followUs, locale)}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap inline-flex items-center rounded-sm border border-white/20 px-3 text-sm text-white/80 hover:border-accent-400 hover:text-white"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/60" dir="ltr">
              {site.email}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {t(site.name, locale)}. {t(ui.footer.rights, locale)}
          </p>
          <div className="flex gap-6">
            <Link href={`${base}/mentions-legales`} className="hover:text-white">
              {t(ui.footer.legal, locale)}
            </Link>
            <Link href={`${base}/confidentialite`} className="hover:text-white">
              {t(ui.footer.privacy, locale)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
