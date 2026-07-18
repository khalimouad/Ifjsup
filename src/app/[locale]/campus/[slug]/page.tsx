import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, programs } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { Arrow } from "@/components/Cards";
import { CampusContact, CampusMap } from "@/components/CampusContact";
import { ContactForm } from "@/components/ContactForm";
import { EditorialVisual } from "@/components/EditorialVisual";

export function generateStaticParams() {
  return locales.flatMap((locale) => campuses.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const campus = campuses.find((c) => c.slug === slug);
  if (!campus || !isLocale(locale)) return {};
  const isCasa = slug === "casablanca";
  return {
    title:
      locale === "ar"
        ? t(campus.name, "ar")
        : isCasa
          ? "École de journalisme à Casablanca — Campus IFJ Derb Omar"
          : "École de journalisme à Marrakech — Campus IFJ Guéliz",
    description: t(campus.intro, locale),
  };
}

export default async function CampusPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const campus = campuses.find((c) => c.slug === slug);
  if (!campus) notFound();
  const other = campuses.find((c) => c.slug !== slug)!;
  const tone = slug === "casablanca" ? 2 : 3;

  return (
    <>
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div className="absolute inset-0 opacity-40">
          <EditorialVisual tone={tone} src={campus.image} eager />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-accent-400">
            {t(ui.campus.kicker, l)}
          </p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">
            {t(campus.city, l)}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 sm:text-lg">{t(campus.intro, l)}</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {campus.highlights.map((h, i) => (
              <li key={i} className="rounded-sm border border-white/25 px-4 py-2 text-sm font-medium text-white/90">
                {t(h, l)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title={t(ui.campus.contactTitle, l)} />
            <div className="mt-8">
              <CampusContact campus={campus} locale={l} />
            </div>
          </div>
          <div>
            <SectionHeading title={t(ui.campus.mapTitle, l)} />
            <div className="mt-8">
              <CampusMap campus={campus} locale={l} />
            </div>
          </div>
        </div>
      </Section>

      {/* Formations proposées sur ce campus */}
      <Section tone="mist">
        <SectionHeading
          title={t(ui.programs.title, l)}
          text={
            l === "fr"
              ? `Toutes les filières de l'institut sont proposées au campus de ${t(campus.city, "fr")}.`
              : `جميع مسالك المعهد متاحة في حرم ${t(campus.city, "ar")}.`
          }
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {programs.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${l}/formations/${p.slug}`}
                className="tap group flex items-center justify-between gap-4 rounded-sm border border-primary-100 bg-white px-5 py-4 transition-colors hover:border-accent-400"
              >
                <span className="font-display font-bold text-primary-900 group-hover:text-accent-600">
                  {t(p.name, l)}
                </span>
                <span className="shrink-0 text-accent-500">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Formulaire local du campus */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            kicker={t(campus.city, l)}
            title={t(ui.campus.formTitle, l)}
          />
          <div className="mt-8">
            <ContactForm locale={l} fixedCampus={campus.slug} />
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <Link href={`/${l}/campus/${other.slug}`} className="group flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-accent-400">
              {t(ui.campus.otherCampus, l)}
            </p>
            <p className="mt-2 font-display text-3xl font-black text-white group-hover:text-accent-300 sm:text-4xl">
              {t(other.city, l)}
            </p>
          </div>
          <span className="text-accent-400">
            <Arrow />
          </span>
        </Link>
      </Section>
    </>
  );
}
