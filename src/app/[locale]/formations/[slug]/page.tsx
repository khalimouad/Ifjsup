import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { programs } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Arrow, ProgramCard } from "@/components/Cards";
import { EditorialVisual } from "@/components/EditorialVisual";

export function generateStaticParams() {
  return locales.flatMap((locale) => programs.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program || !isLocale(locale)) return {};
  return {
    title: t(program.name, locale),
    description: t(program.excerpt, locale),
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const index = programs.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const program = programs[index];
  const others = programs.filter((p) => p.slug !== slug).slice(0, 3);

  const facts = [
    { label: ui.labels.access, value: program.access },
    { label: ui.labels.degree, value: program.degree },
    { label: ui.labels.duration, value: program.duration },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div className="absolute inset-0 opacity-40">
          <EditorialVisual tone={index} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-accent-400">
            {t(ui.nav.programs, l)}
            {program.accredited && <span className="ms-3 rounded-sm bg-gold px-2 py-0.5 text-xs text-primary-950">{t(ui.labels.accredited, l)}</span>}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t(program.name, l)}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 sm:text-lg">{t(program.excerpt, l)}</p>
          <Link
            href={`/${l}/admission`}
            className="tap mt-8 inline-flex items-center gap-2 rounded-sm bg-accent-500 px-6 py-4 font-display font-bold text-white hover:bg-accent-600"
          >
            {t(ui.cta.apply, l)}
            <Arrow />
          </Link>
        </div>
      </section>

      {/* Fiche synthétique */}
      <section className="border-b border-primary-100 bg-white">
        <dl className="mx-auto grid max-w-7xl divide-y divide-primary-100 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {facts.map((f, i) => (
            <div key={i} className="px-2 py-6 text-center sm:px-6">
              <dt className="text-xs font-bold uppercase tracking-widest text-accent-600">{t(f.label, l)}</dt>
              <dd className="mt-2 font-display text-lg font-bold text-primary-900">{t(f.value, l)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-black text-primary-900 sm:text-3xl">
              {l === "fr" ? "La formation" : "التكوين"}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">{t(program.description, l)}</p>
          </div>
          <aside className="rounded-sm bg-mist p-6">
            <h2 className="font-display text-lg font-bold text-primary-900">{t(ui.labels.careers, l)}</h2>
            <ul className="mt-4 space-y-3">
              {program.careers.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-500" aria-hidden />
                  {t(c, l)}
                </li>
              ))}
            </ul>
            <Link
              href={`/${l}/admission`}
              className="tap mt-6 flex items-center justify-center gap-2 rounded-sm bg-primary-700 px-4 py-3 font-display font-bold text-white hover:bg-primary-600"
            >
              {t(ui.cta.applyNow, l)}
            </Link>
          </aside>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading title={l === "fr" ? "Autres formations" : "تكوينات أخرى"} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProgramCard key={p.slug} program={p} locale={l} tone={programs.indexOf(p)} />
          ))}
        </div>
      </Section>
    </>
  );
}
