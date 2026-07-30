import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { admissionDocs, faq } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return { title: t(ui.admission.title, l), description: t(ui.admission.intro, l) };
}

/** Teintes des pastilles d'étapes, dans l'ordre du concept. */
const STEP_TONE = ["", " step-n-gold", " step-n-ink", ""];

export default async function AdmissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  return (
    <>
      <PageHero
        title={t(ui.admission.title, l)}
        intro={t(ui.admission.intro, l)}
        index="04"
      />

      {/* ---------- les 4 étapes ---------- */}
      <section className="sec" style={{ padding: "38px var(--gut) 0" }}>
        <div className="wrap" style={{ padding: "0 0 22px" }}>
          <div className="kicker">{t(ui.admission.kicker, l)}</div>
          <h2 className="h2">{t(ui.admission.stepsTitle, l)}</h2>
        </div>
        <div className="steps steps-4" data-reveal>
          {ui.admission.steps.map((s, i) => (
            <div className="step" key={s.title.fr}>
              <span className={`step-n${STEP_TONE[i] ?? ""}`}>{i + 1}</span>
              <h3>{t(s.title, l)}</h3>
              <p>{t(s.text, l)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- documents + aide ---------- */}
      <section className="sec" style={{ padding: "22px var(--gut) 0" }}>
        <div className="adm-bottom" data-reveal>
          <div className="card card-r14" style={{ padding: 28 }}>
            <h3 style={{ fontSize: 18, margin: "0 0 20px" }}>
              {t(ui.admission.docsTitle, l)}
            </h3>
            <div className="docs">
              {admissionDocs.map((d) => (
                <div className="doc" key={d.fr}>
                  <Icon name="check" size={15} sw={2.6} />
                  {t(d, l)}
                </div>
              ))}
            </div>
          </div>

          <div className="help">
            <h3>{t(ui.admission.helpTitle, l)}</h3>
            <p>{t(ui.admission.helpText, l)}</p>
            <Link href={`${base}/contact`} className="btn btn-invert btn-sm">
              {t(ui.nav.contact, l)}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- niveaux acceptés ---------- */}
      <section className="sec" style={{ padding: "46px var(--gut) 0" }} id="niveaux">
        <div className="wrap" style={{ padding: "0 0 22px" }}>
          <h2 className="h2">{t(ui.admission.levelsTitle, l)}</h2>
        </div>
        <div className="g3" data-reveal>
          {ui.admission.levels.map((lv) => (
            <div className="tile" key={lv.level.fr}>
              <span className="tile-ico">
                <Icon name="cap" size={26} />
              </span>
              <h3>{t(lv.level, l)}</h3>
              <p>{t(lv.detail, l)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="sec" style={{ padding: "46px var(--gut) 0" }} id="faq">
        <div className="wrap" style={{ padding: 0 }}>
          <h2 className="h2">{t(ui.admission.faqTitle, l)}</h2>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q.fr}>
                <summary>{t(f.q, l)}</summary>
                <p>{t(f.a, l)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- formulaire ---------- */}
      <section className="sec-soft" style={{ padding: "46px var(--gut) 60px", marginTop: 46 }}>
        <div className="wrap" style={{ padding: 0, maxWidth: 820 }}>
          <div className="kicker">{t(ui.admission.kicker, l)}</div>
          <h2 className="h2" style={{ marginBottom: 24 }}>
            {t(ui.cta.applyNow, l)}
          </h2>
          <div className="card" style={{ padding: 28 }}>
            <ContactForm locale={l} />
          </div>
        </div>
      </section>
    </>
  );
}
