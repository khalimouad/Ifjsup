import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { programs } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { ProgramGridCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    programs.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  const p = programs.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: t(p.name, l), description: t(p.excerpt, l) };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  const p = programs.find((x) => x.slug === slug);
  if (!p) notFound();

  const others = programs.filter((x) => x.slug !== p.slug).slice(0, 3);

  const meta: { icon: IconName; label: string; value: string; gold?: boolean }[] = [
    { icon: "cap", label: t(ui.detail.level, l), value: t(p.access, l) },
    { icon: "globe", label: t(ui.detail.language, l), value: t(ui.detail.languageValue, l) },
    { icon: "clock", label: t(ui.detail.pace, l), value: t(ui.detail.paceValue, l), gold: true },
    { icon: "pin", label: t(ui.detail.campus, l), value: t(ui.detail.campusValue, l) },
    {
      icon: "calendar",
      label: t(ui.detail.intake, l),
      value: t(ui.detail.intakeValue, l),
      gold: true,
    },
  ];

  const tabs = [
    { href: "#apercu", label: t(ui.tabs.overview, l), on: true },
    { href: "#debouches", label: t(ui.tabs.careers, l) },
    { href: "#admission", label: t(ui.tabs.admission, l) },
  ];

  return (
    <>
      <section className="sec" style={{ padding: "26px 0 0" }}>
        <nav className="crumbs" aria-label={t(ui.cta.backTo, l)}>
          <Link href={base}>{t(ui.nav.home, l)}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`${base}/formations`}>{t(ui.nav.programs, l)}</Link>
          <span aria-hidden="true">/</span>
          <b>{t(p.name, l)}</b>
        </nav>
      </section>

      {/* ---------- héros de la fiche ---------- */}
      <section className="sec" style={{ padding: "20px var(--gut) 0" }}>
        <div className="detail-hero">
          <div>
            <h1>{t(p.name, l)}</h1>
            <div className="detail-tags">
              <span className="tag">{t(p.access, l)}</span>
              <span className="muted" style={{ fontSize: 13, fontWeight: 600 }}>
                {t(p.duration, l)}
              </span>
              {p.accredited && (
                <span className="tag tag-gold">{t(ui.labels.accreditedShort, l)}</span>
              )}
            </div>
            <p className="lead">{t(p.excerpt, l)}</p>
            <div className="hero-cta" style={{ marginTop: 0 }}>
              <Link href={`${base}/admission`} className="btn btn-accent btn-sm">
                {t(ui.cta.apply, l)}
              </Link>
              <Link href={`${base}/contact`} className="btn btn-line btn-sm">
                {t(ui.detail.brochure, l)}
                <Icon name="download" size={14} sw={2} />
              </Link>
            </div>
          </div>
          <div className="detail-photo">
            <Photo
              src={p.image}
              alt={t(p.name, l)}
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>

      {/* ---------- bandeau méta ---------- */}
      <section className="sec" style={{ padding: "30px var(--gut) 0" }}>
        <div className="detail-meta">
          {meta.map((m) => (
            <div className="dmeta" key={m.label}>
              <span style={{ color: m.gold ? "var(--gold)" : "var(--accent)" }}>
                <Icon name={m.icon} size={22} />
              </span>
              <div>
                <div className="dmeta-t">{m.label}</div>
                <div className="dmeta-v">{m.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- corps ---------- */}
      <section className="sec" style={{ padding: "34px var(--gut) 60px" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="tabs">
            {tabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className={`tab${tab.on ? " tab-on" : ""}`}
              >
                {tab.label}
              </a>
            ))}
          </div>

          <div className="detail-body">
            <div id="apercu">
              <p>{t(p.description, l)}</p>

              <h2 className="h2" style={{ fontSize: 19, marginTop: 0 }}>
                {t(ui.labels.degree, l)}
              </h2>
              <div className="checks">
                <div className="check">
                  <Icon name="check" size={16} sw={2.4} />
                  {t(p.degree, l)}
                </div>
                <div className="check">
                  <Icon name="check" size={16} sw={2.4} />
                  {t(ui.labels.access, l)} : {t(p.access, l)}
                </div>
                <div className="check">
                  <Icon name="check" size={16} sw={2.4} />
                  {t(ui.labels.duration, l)} : {t(p.duration, l)}
                </div>
                {p.accredited && (
                  <div className="check">
                    <Icon name="check" size={16} sw={2.4} />
                    {t(ui.labels.accredited, l)}
                  </div>
                )}
              </div>

              <h2 className="h2" style={{ fontSize: 19 }} id="admission">
                {t(ui.tabs.admission, l)}
              </h2>
              <p>{t(ui.detail.admissionText, l)}</p>
              <Link href={`${base}/admission`} className="btn btn-accent btn-sm">
                {t(ui.cta.applyNow, l)}
                <Icon name="arrow" size={15} sw={2} className="arw" />
              </Link>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <div className="aside-card" id="debouches">
                <h3>{t(ui.labels.careers, l)}</h3>
                <div className="rows">
                  {p.careers.map((c) => (
                    <div className="row-i" key={c.fr}>
                      <span className="bx" aria-hidden="true">
                        <Icon name="check" size={13} sw={2.6} />
                      </span>
                      {t(c, l)}
                    </div>
                  ))}
                </div>
              </div>

              {/* L'affiche officielle de la filière : un document, présenté
                  comme tel plutôt que recadré en photo d'illustration. */}
              <figure className="poster">
                <div className="poster-media">
                  <Photo
                    src={p.poster}
                    alt={`${t(ui.detail.posterAlt, l)} — ${t(p.name, l)}`}
                    sizes="(max-width: 900px) 100vw, 360px"
                  />
                </div>
                <figcaption>{t(ui.detail.posterAlt, l)}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- autres formations ---------- */}
      <section className="sec-soft" style={{ padding: "46px var(--gut)" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="kicker">{t(ui.programs.kicker, l)}</div>
          <h2 className="h2" style={{ marginBottom: 24 }}>
            {t(ui.detail.otherPrograms, l)}
          </h2>
          <div className="prog-grid" data-reveal>
            {others.map((o) => (
              <ProgramGridCard key={o.slug} program={o} locale={l} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
