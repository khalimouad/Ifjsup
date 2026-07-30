import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { programs } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { ProgramFilters } from "@/components/ProgramFilters";
import { CtaBand } from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return {
    title: t(ui.programs.title, l),
    description: t(ui.programs.intro, l),
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <PageHero
        light
        title={t(ui.programs.title, l)}
        intro={t(ui.programs.intro, l)}
        image="/images/plateau-tav.webp"
      />

      <section className="sec-soft" style={{ padding: "34px var(--gut) 60px" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <ProgramFilters programs={programs} locale={l} />
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
