import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles, campuses, programs, services, stats } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { NewsCard, ProgramCard, Arrow } from "@/components/Cards";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { EditorialVisual } from "@/components/EditorialVisual";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  return (
    <>
      {/* ===== Héro éditorial ===== */}
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div className="absolute inset-0 opacity-60">
          <EditorialVisual tone={0} src="/images/hero-plateau.webp" eager />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/70 to-primary-950/30" />
        <div className="relative mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent-400">
            {t(ui.home.heroKicker, l)}
          </p>
          <h1 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {t(ui.home.heroTitle1, l)}
            <br />
            <span className="text-accent-500">{t(ui.home.heroTitle2, l)}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t(ui.home.heroText, l)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`${base}/admission`}
              className="tap flex items-center gap-2 rounded-sm bg-accent-500 px-6 py-4 font-display font-bold text-white transition-colors hover:bg-accent-600"
            >
              {t(ui.cta.applyNow, l)}
              <Arrow />
            </Link>
            <Link
              href={`${base}/formations`}
              className="tap flex items-center rounded-sm border border-white/30 px-6 py-4 font-display font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {t(ui.cta.allPrograms, l)}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Chiffres clés ===== */}
      <section aria-label={t(ui.labels.keyFacts, l)} className="border-b border-white/10 bg-primary-900">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.value} className="reveal flex flex-col items-center gap-1 px-4 py-8 text-center">
              <dd className="font-display text-4xl font-black text-white lg:text-5xl">{s.value}</dd>
              <dt className="text-sm font-medium text-white/60">{t(s.label, l)}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ===== Bandeau accréditation ===== */}
      <div className="bg-gold">
        <p className="mx-auto max-w-7xl px-4 py-3 text-center font-display text-sm font-bold text-primary-950 sm:px-6 sm:text-base lg:px-8">
          ★ {t(ui.home.accreditBanner, l)}
        </p>
      </div>

      {/* ===== Formations ===== */}
      <Section tone="dark">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            dark
            kicker={t(ui.programs.kicker, l)}
            title={t(ui.home.programsTitle, l)}
            text={t(ui.home.programsText, l)}
          />
          <Link
            href={`${base}/formations`}
            className="tap hidden items-center gap-2 font-display font-bold text-accent-400 hover:text-accent-300 sm:flex"
          >
            {t(ui.cta.allPrograms, l)}
            <Arrow />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <ProgramCard key={p.slug} program={p} locale={l} tone={i} />
          ))}
        </div>
      </Section>

      {/* ===== Deux campus ===== */}
      <Section tone="dark">
        <SectionHeading dark kicker={t(ui.labels.chooseCampus, l)} title={t(ui.home.campusTitle, l)} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {campuses.map((c, i) => (
            <Link
              key={c.slug}
              href={`${base}/campus/${c.slug}`}
              className="reveal group relative overflow-hidden rounded-sm"
            >
              <div className="aspect-[16/9] transition-transform duration-500 group-hover:scale-105">
                <EditorialVisual tone={i + 2} src={c.image} label={t(c.name, l)} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-3xl font-black text-white">{t(c.city, l)}</h3>
                <p className="mt-1 text-sm text-white/70">{t(c.address, l)}</p>
                <span className="mt-3 inline-flex items-center gap-2 font-display text-sm font-bold text-accent-400">
                  {t(ui.cta.discover, l)}
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== Pourquoi l'IFJ ===== */}
      <Section tone="dark">
        <SectionHeading dark kicker={t(ui.labels.since1994, l)} title={t(ui.home.servicesTitle, l)} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={i} className="reveal bg-primary-900 p-6">
              <span className="font-display text-sm font-black text-accent-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-white">{t(s.title, l)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t(s.text, l)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Actualités ===== */}
      <Section tone="dark">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading dark kicker={t(ui.news.kicker, l)} title={t(ui.home.newsTitle, l)} />
          <Link
            href={`${base}/actualites`}
            className="tap hidden items-center gap-2 font-display font-bold text-accent-400 hover:text-accent-300 sm:flex"
          >
            {t(ui.cta.allNews, l)}
            <Arrow />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <NewsCard key={a.slug} article={a} locale={l} tone={i + 3} />
          ))}
        </div>
      </Section>

      {/* ===== Partenaires ===== */}
      <div className="bg-primary-900 pt-10">
        <p className="text-center font-display text-sm font-bold uppercase tracking-widest text-white/40">
          {t(ui.labels.ourPartners, l)}
        </p>
        <div className="mt-6">
          <PartnerMarquee locale={l} />
        </div>
      </div>

      {/* ===== CTA final ===== */}
      <Section tone="dark" className="relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl">
            {t(ui.home.finalCtaTitle, l)}
          </h2>
          <p className="mt-4 text-white/75 sm:text-lg">{t(ui.home.finalCtaText, l)}</p>
          <Link
            href={`${base}/admission`}
            className="tap mt-8 inline-flex items-center gap-2 rounded-sm bg-accent-500 px-8 py-4 font-display text-lg font-bold text-white transition-colors hover:bg-accent-600"
          >
            {t(ui.cta.applyNow, l)}
            <Arrow />
          </Link>
        </div>
      </Section>
    </>
  );
}
