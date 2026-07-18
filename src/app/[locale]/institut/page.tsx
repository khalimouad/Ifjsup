import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { partners, services, stats } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { EditorialVisual } from "@/components/EditorialVisual";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "المعهد" : "L'Institut",
    description:
      locale === "ar"
        ? "معهد خاص مغربي رائد في التكوين في مهن الصحافة والسمعي البصري منذ 1994."
        : "Institut privé marocain pionnier de la formation aux métiers du journalisme et de l'audiovisuel depuis 1994.",
  };
}

export default async function InstitutePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <Section tone="dark" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <EditorialVisual tone={1} />
        </div>
        <div className="relative">
          <SectionHeading dark kicker={t(ui.institute.kicker, l)} title={t(ui.institute.title, l)} text={t(ui.institute.intro, l)} />
        </div>
      </Section>

      {/* Chiffres */}
      <section className="border-b border-primary-100 bg-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-primary-100 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1 px-4 py-8 text-center">
              <dd className="font-display text-4xl font-black text-primary-800">{s.value}</dd>
              <dt className="text-sm text-ink/60">{t(s.label, l)}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Mot de la direction */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="reveal overflow-hidden rounded-sm">
            <div className="aspect-[4/3]">
              <EditorialVisual tone={4} />
            </div>
          </div>
          <div className="reveal">
            <SectionHeading kicker={t(ui.labels.since1994, l)} title={t(ui.institute.wordTitle, l)} />
            <blockquote className="mt-6 border-s-4 border-accent-500 ps-5 text-lg leading-relaxed text-ink/80">
              {t(ui.institute.word, l)}
              <footer className="mt-4 font-display text-sm font-bold text-primary-800">
                — {t(ui.institute.wordAuthor, l)}
              </footer>
            </blockquote>
          </div>
        </div>
      </Section>

      {/* Histoire */}
      <Section tone="mist">
        <SectionHeading title={t(ui.institute.historyTitle, l)} />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ui.institute.history.map((h) => (
            <li key={h.year} className="reveal rounded-sm border border-primary-100 bg-white p-6">
              <span className="font-display text-3xl font-black text-accent-500">{h.year}</span>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{t(h.text, l)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Équipe */}
      <Section>
        <SectionHeading title={t(ui.institute.teamTitle, l)} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ui.institute.team.map((m, i) => (
            <div key={i} className="reveal overflow-hidden rounded-sm border border-primary-100 bg-white">
              <div className="aspect-square">
                <EditorialVisual tone={i} />
              </div>
              <p className="p-4 font-display text-sm font-bold text-primary-900">{t(m.role, l)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Atouts + partenaires */}
      <Section tone="mist">
        <SectionHeading title={t(ui.home.servicesTitle, l)} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-primary-100 bg-primary-100 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-6">
              <h3 className="font-display text-lg font-bold text-primary-900">{t(s.title, l)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{t(s.text, l)}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-14 font-display text-sm font-bold uppercase tracking-widest text-ink/40">
          {t(ui.labels.ourPartners, l)}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-3">
          {partners.map((p) => (
            <li key={p.name} className="rounded-sm border border-primary-200 bg-white px-4 py-2 font-display text-sm font-bold text-primary-700">
              {l === "ar" ? p.nameAr : p.name}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
