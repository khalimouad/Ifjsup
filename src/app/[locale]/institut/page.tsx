import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, partners, services } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { KeyFigures } from "@/components/Strips";
import { CtaBand } from "@/components/CtaBand";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return { title: t(ui.institute.title, l), description: t(ui.institute.intro, l) };
}

export default async function InstitutePage({
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
        title={t(ui.institute.title, l)}
        intro={t(ui.institute.intro, l)}
        index="01"
      />

      {/* ---------- chiffres ---------- */}
      <section className="sec" style={{ padding: "38px var(--gut) 0" }}>
        <div className="wrap" style={{ padding: "0 0 22px" }}>
          <div className="kicker">{t(ui.institute.kicker, l)}</div>
          <h2 className="h2">{t(ui.labels.keyFacts, l)}</h2>
        </div>
        <div className="wrap" style={{ padding: 0 }} data-reveal>
          <KeyFigures locale={l} row />
        </div>
      </section>

      {/* ---------- mot de la direction ---------- */}
      <section className="sec" style={{ padding: "46px var(--gut) 0" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <h2 className="h2">{t(ui.institute.wordTitle, l)}</h2>
          <div className="card" style={{ padding: 30, maxWidth: 900 }} data-reveal>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                margin: 0,
                color: "var(--ink)",
              }}
            >
              {t(ui.institute.word, l)}
            </p>
            <p className="kicker" style={{ marginTop: 18 }}>
              {t(ui.institute.wordAuthor, l)}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- histoire ---------- */}
      <section className="sec" style={{ padding: "46px var(--gut) 0" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <h2 className="h2">{t(ui.institute.historyTitle, l)}</h2>
          <div className="timeline" data-reveal>
            {ui.institute.history.map((h) => (
              <div className="tl" key={h.year}>
                <div className="tl-y">
                  <i aria-hidden="true" />
                  {h.year}
                </div>
                <div className="tl-t">{t(h.text, l)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- pourquoi l'IFJ ---------- */}
      <section className="sec-soft" style={{ padding: "46px var(--gut)" }}>
        <div className="wrap" style={{ padding: "0 0 26px" }}>
          <h2 className="h2">{t(ui.home.servicesTitle, l)}</h2>
        </div>
        <div className="g3" data-reveal>
          {services.map((s) => (
            <div className="tile" key={s.title.fr}>
              <span className="tile-ico">
                <Icon name="checkCircle" size={26} />
              </span>
              <h3>{t(s.title, l)}</h3>
              <p>{t(s.text, l)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- équipe ---------- */}
      <section className="sec" style={{ padding: "46px var(--gut) 0" }}>
        <div className="wrap" style={{ padding: "0 0 22px" }}>
          <h2 className="h2">{t(ui.institute.teamTitle, l)}</h2>
        </div>
        <div className="g4" data-reveal>
          {ui.institute.team.map((m) => (
            <div className="tile" key={m.role.fr}>
              <span className="tile-ico">
                <Icon name="users" size={26} />
              </span>
              <h3 style={{ fontSize: 14 }}>{t(m.role, l)}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- partenaires + campus ---------- */}
      <section className="sec" style={{ padding: "46px var(--gut) 60px" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <h2 className="h2">{t(ui.labels.ourPartners, l)}</h2>
          <div className="partners" data-reveal>
            {partners.map((p) => (
              <span className="partner" key={p.name}>
                {l === "ar" ? p.nameAr : p.name}
              </span>
            ))}
          </div>

          <h2 className="h2" style={{ marginTop: 46 }}>
            {t(ui.home.campusTitle, l)}
          </h2>
          <div className="chips">
            {campuses.map((c) => (
              <Link key={c.slug} href={`${base}/campus/${c.slug}`} className="chip">
                {t(c.city, l)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
