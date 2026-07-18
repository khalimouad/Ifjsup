import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { programs } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { ProgramCard } from "@/components/Cards";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "التكوينات" : "Formations",
    description:
      locale === "ar"
        ? "ستة مسالك معتمدة في الصحافة والسمعي البصري والإعلام الرقمي، بالدار البيضاء ومراكش."
        : "Six filières accréditées en journalisme, audiovisuel et médias numériques, à Casablanca et Marrakech.",
  };
}

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <Section tone="mist">
      <SectionHeading
        kicker={t(ui.programs.kicker, l)}
        title={t(ui.programs.title, l)}
        text={t(ui.programs.intro, l)}
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => (
          <ProgramCard key={p.slug} program={p} locale={l} tone={i} />
        ))}
      </div>
    </Section>
  );
}
