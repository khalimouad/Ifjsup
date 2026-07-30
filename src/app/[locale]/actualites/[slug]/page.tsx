import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { ArticleRow, fmtDate } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: t(a.title, l),
    description: t(a.excerpt, l),
    openGraph: { type: "article", publishedTime: a.date },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <section className="sec" style={{ padding: "26px 0 0" }}>
        <nav className="crumbs" aria-label={t(ui.cta.backTo, l)}>
          <Link href={base}>{t(ui.nav.home, l)}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`${base}/actualites`}>{t(ui.nav.news, l)}</Link>
          <span aria-hidden="true">/</span>
          <b>{t(a.category, l)}</b>
        </nav>
      </section>

      <article>
        <section className="sec" style={{ padding: "20px var(--gut) 0" }}>
          <div className="wrap" style={{ padding: 0 }}>
            <div className="feat-d">
              {fmtDate(a.date, l)} · {t(a.category, l)}
            </div>
            <h1 className="h1" style={{ marginTop: 12, maxWidth: 900 }}>
              {t(a.title, l)}
            </h1>
            <div className="detail-photo" style={{ marginTop: 26 }}>
              <Photo src={a.image} alt={t(a.title, l)} priority sizes="100vw" />
            </div>
          </div>
        </section>

        <section className="sec" style={{ padding: "34px var(--gut) 60px" }}>
          <div className="wrap" style={{ padding: 0 }}>
            <div className="prose">
              {a.archive && <p className="note">{t(ui.news.archiveNote, l)}</p>}
              <p style={{ fontWeight: 600, color: "var(--ink)" }}>{t(a.excerpt, l)}</p>
              {a.body.map((par, i) => (
                <p key={i}>{t(par, l)}</p>
              ))}
            </div>
            <Link href={`${base}/actualites`} className="lnk lnk-accent" style={{ marginTop: 12 }}>
              {t(ui.cta.allNews, l)}
              <Icon name="arrow" size={15} sw={2} />
            </Link>
          </div>
        </section>
      </article>

      <section className="sec-soft" style={{ padding: "46px var(--gut)" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="kicker kicker-accent">{t(ui.news.kicker, l)}</div>
          <h2 className="h2" style={{ marginBottom: 22 }}>
            {t(ui.cta.allNews, l)}
          </h2>
          <div className="news-list" data-reveal>
            {more.map((m) => (
              <ArticleRow key={m.slug} article={m} locale={l} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
