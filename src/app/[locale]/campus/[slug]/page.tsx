import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { CampusFeatures } from "@/components/Strips";
import { ContactForm } from "@/components/ContactForm";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/SectionHead";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    campuses.map((c) => ({ locale, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  const c = campuses.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: t(c.name, l), description: t(c.intro, l) };
}

export default async function CampusPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  const c = campuses.find((x) => x.slug === slug);
  if (!c) notFound();
  const other = campuses.find((x) => x.slug !== c.slug)!;

  return (
    <>
      <PageHero
        title={`${t(ui.campus.title, l)} — ${t(c.city, l)}`}
        intro={t(c.intro, l)}
        image={c.image}
      >
        <div className="chips">
          <Link href={`${base}/galerie`} className="chip chip-on">
            {t(ui.campus.galleryCta, l)}
          </Link>
          <a href={`tel:${c.phones[0].replace(/-/g, "")}`} className="chip">
            {t(ui.cta.call, l)}
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${c.mapQuery}`}
            className="chip"
            target="_blank"
            rel="noreferrer"
          >
            {t(ui.cta.directions, l)}
          </a>
        </div>
      </PageHero>

      {/* ---------- visuel large du campus ---------- */}
      <section className="sec" style={{ padding: "26px var(--gut) 0" }}>
        <Link href={`${base}/galerie`} className="campus-video" aria-label={t(ui.campus.galleryCta, l)}>
          {/* Une seconde vue, distincte de la photo du héros. */}
          <Photo src="/images/plateau-tav.webp" alt={t(c.name, l)} sizes="1180px" />
          <span className="play" aria-hidden="true">
            <span>
              <Icon name="playLg" size={26} fill />
            </span>
          </span>
          <span className="campus-cap">{t(ui.campus.galleryCta, l)}</span>
        </Link>
      </section>

      {/* ---------- atouts ---------- */}
      <section className="sec" style={{ padding: "34px var(--gut) 60px" }}>
        <SectionHead n="01" title={t(ui.campus.featuresTitle, l)} intro={t(ui.campus.intro, l)} />
        <CampusFeatures locale={l} city={t(c.city, l)} />
      </section>

      {/* ---------- coordonnées + formulaire ---------- */}
      <section className="sec-soft" style={{ padding: "46px var(--gut) 60px" }}>
        <div className="g2" data-stagger style={{ alignItems: "start" }}>
          <div className="contact-card">
            <h3>{t(ui.campus.contactTitle, l)}</h3>
            <p className="lead" style={{ marginBottom: 12 }}>
              {t(c.name, l)}
            </p>

            <div className="cinfo">
              <Icon name="pin" size={18} />
              <div>
                <b>{t(ui.labels.address, l)}</b>
                {t(c.address, l)}
              </div>
            </div>

            <div className="cinfo">
              <Icon name="phone" size={18} sw={1.7} />
              <div>
                <b>{t(ui.labels.phone, l)}</b>
                {c.phones.map((ph) => (
                  <div key={ph}>
                    <a href={`tel:${ph.replace(/-/g, "")}`} dir="ltr">
                      {ph}
                    </a>
                  </div>
                ))}
                {c.mobile && (
                  <div>
                    <a href={`tel:${c.mobile.replace(/-/g, "")}`} dir="ltr">
                      {c.mobile}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="cinfo">
              <Icon name="mail" size={18} />
              <div>
                <b>{t(ui.labels.email, l)}</b>
                <a href={`mailto:${c.email}`} dir="ltr">
                  {c.email}
                </a>
              </div>
            </div>

            <div className="cinfo">
              <Icon name="clock" size={18} />
              <div>
                <b>{t(ui.labels.hours, l)}</b>
                {t(c.hours, l)}
              </div>
            </div>

            <div className="checks" style={{ marginTop: 20 }}>
              {c.highlights.map((h) => (
                <div className="check" key={h.fr}>
                  <Icon name="check" size={16} sw={2.4} />
                  {t(h, l)}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-card">
            <h3>{t(ui.campus.formTitle, l)}</h3>
            <p className="lead" style={{ marginBottom: 20 }}>
              {t(c.city, l)}
            </p>
            <ContactForm locale={l} fixedCampus={c.slug} />
          </div>
        </div>
      </section>

      {/* ---------- carte ---------- */}
      <section className="sec" style={{ padding: "46px var(--gut)" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="sec-head" style={{ padding: 0 }} data-reveal>
            <span className="sec-head-n" aria-hidden="true">02</span>
            <div><h2>{t(ui.campus.mapTitle, l)}</h2></div>
          </div>
          <iframe
            className="map"
            title={t(ui.campus.mapTitle, l)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${c.mapQuery}&output=embed`}
          />
          <p style={{ marginTop: 22 }}>
            <Link href={`${base}/campus/${other.slug}`} className="lnk lnk-accent">
              {t(ui.campus.otherCampus, l)} — {t(other.city, l)}
              <Icon name="arrow" size={15} sw={2} />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
