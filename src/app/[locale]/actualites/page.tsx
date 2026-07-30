import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { ArticleRow, FeaturedArticle } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return { title: t(ui.news.title, l), description: t(ui.news.intro, l) };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;

  return (
    <>
      <PageHero
        index="05"
        title={t(ui.news.title, l)}
        intro={t(ui.news.intro, l)}
        image="/images/news-saadni.webp"
      />

      <section className="sec" style={{ padding: "30px var(--gut) 20px" }}>
        <div className="news-page" data-reveal>
          <FeaturedArticle article={lead} locale={l} />
          <div className="news-list">
            {rest.slice(0, 3).map((a) => (
              <ArticleRow key={a.slug} article={a} locale={l} />
            ))}
          </div>
        </div>
      </section>

      {rest.length > 3 && (
        <section className="sec" style={{ padding: "0 var(--gut) 60px" }}>
          <div className="wrap" style={{ padding: 0 }}>
            <h2 className="h2">{t(ui.labels.archive, l)}</h2>
            <div className="news-list-2" data-reveal>
              {rest.slice(3).map((a) => (
                <ArticleRow key={a.slug} article={a} locale={l} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand locale={l} />
    </>
  );
}
