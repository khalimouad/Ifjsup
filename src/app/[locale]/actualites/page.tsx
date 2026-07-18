import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { NewsCard } from "@/components/Cards";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "الأخبار" : "Actualités" };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <Section tone="mist">
      <SectionHeading kicker={t(ui.news.kicker, l)} title={t(ui.news.title, l)} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <NewsCard key={a.slug} article={a} locale={l} tone={i} />
        ))}
      </div>
    </Section>
  );
}
