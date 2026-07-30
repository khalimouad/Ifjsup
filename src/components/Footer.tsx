import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, programs, site } from "@/lib/content";

/** Pied de page sombre à quatre colonnes — reprise du concept. */
export function Footer({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="ftr">
      <div className="ftr-grid">
        <div>
          <Link href={base} className="ftr-mark" aria-label="IFJ SUP">
            IFJ<sup>SUP</sup>
          </Link>
          <p className="ftr-about">{t(ui.footer.about, locale)}</p>
        </div>

        <div className="ftr-col">
          <b>{t(ui.nav.programs, locale)}</b>
          {programs.slice(0, 4).map((p) => (
            <Link key={p.slug} href={`${base}/formations/${p.slug}`}>
              {t(p.name, locale)}
            </Link>
          ))}
        </div>

        <div className="ftr-col">
          <b>{t(ui.nav.admission, locale)}</b>
          <Link href={`${base}/admission`}>{t(ui.admission.stepsTitle, locale)}</Link>
          <Link href={`${base}/admission#niveaux`}>{t(ui.admission.levelsTitle, locale)}</Link>
          <Link href={`${base}/admission#faq`}>{t(ui.admission.faqTitle, locale)}</Link>
          <Link href={`${base}/galerie`}>{t(ui.gallery.title, locale)}</Link>
        </div>

        <div className="ftr-col">
          <b>{t(ui.nav.contact, locale)}</b>
          <a href={`mailto:${site.email}`} dir="ltr">
            {site.email}
          </a>
          {campuses.map((c) => (
            <Link key={c.slug} href={`${base}/campus/${c.slug}`}>
              {t(c.city, locale)} — <span dir="ltr">{c.phones[0]}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="ftr-bot">
        <span>
          © {year} IFJ SUP — {t(ui.footer.rights, locale)}
        </span>
        <span>
          <Link href={`${base}/mentions-legales`}>{t(ui.footer.legal, locale)}</Link>
          {" · "}
          <Link href={`${base}/confidentialite`}>{t(ui.footer.privacy, locale)}</Link>
        </span>
      </div>
    </footer>
  );
}
