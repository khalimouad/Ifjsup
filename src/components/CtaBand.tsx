import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

/** Bandeau d'appel à candidature — le bloc accent arrondi du concept. */
export function CtaBand({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  return (
    <section className="sec-soft" style={{ padding: "0 var(--gut) 60px" }}>
      <div className="cta" data-reveal>
        <div className="cta-blob" aria-hidden="true" />
        <div className="cta-in">
          <h2>{t(ui.home.finalCtaTitle, locale)}</h2>
          <p>{t(ui.home.finalCtaText, locale)}</p>
        </div>
        <div className="cta-btns">
          <Link href={`${base}/admission`} className="btn btn-gold">
            {t(ui.cta.applyNow, locale)}
          </Link>
          <Link href={`${base}/contact`} className="btn btn-onaccent">
            {t(ui.nav.contact, locale)}
          </Link>
        </div>
      </div>
    </section>
  );
}
