import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { NewsCard } from "@/components/Cards";
import { EditorialVisual } from "@/components/EditorialVisual";

export function generateStaticParams() {
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article || !isLocale(locale)) return {};
  return { title: t(article.title, locale), description: t(article.excerpt, locale) };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();
  const article = articles[index];
  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const date = new Date(article.date).toLocaleDateString(l === "ar" ? "ar-MA" : "fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-primary-950 text-white">
          <div className="absolute inset-0 opacity-40">
            <EditorialVisual tone={index} src={article.image} eager />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent" />
          <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-24 sm:px-6 lg:pb-20 lg:pt-32">
            <p className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-sm bg-accent-500 px-2 py-1 font-bold">{t(article.category, l)}</span>
              {article.archive && (
                <span className="rounded-sm bg-white/15 px-2 py-1 font-semibold">{t(ui.labels.archive, l)}</span>
              )}
              <time dateTime={article.date} className="text-white/70">
                {date}
              </time>
            </p>
            <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {t(article.title, l)}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <p className="font-display text-lg font-bold leading-relaxed text-primary-900 sm:text-xl">
            {t(article.excerpt, l)}
          </p>
          {article.body.map((p, i) => (
            <p key={i} className="mt-6 text-base leading-relaxed text-ink/80 sm:text-lg">
              {t(p, l)}
            </p>
          ))}
          {article.archive && (
            <p className="mt-8 rounded-sm bg-mist px-4 py-3 text-sm text-ink/60">{t(ui.news.archiveNote, l)}</p>
          )}
          <Link
            href={`/${l}/actualites`}
            className="tap mt-10 inline-flex items-center gap-2 font-display font-bold text-accent-600 hover:text-accent-700"
          >
            ← {t(ui.cta.allNews, l)}
          </Link>
        </div>
      </article>

      <Section tone="mist">
        <SectionHeading title={l === "fr" ? "À lire aussi" : "اقرأ أيضًا"} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((a) => (
            <NewsCard key={a.slug} article={a} locale={l} tone={articles.indexOf(a)} />
          ))}
        </div>
      </Section>
    </>
  );
}
