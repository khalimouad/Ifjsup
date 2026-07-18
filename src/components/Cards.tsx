import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import type { Article, Program } from "@/lib/content";
import { EditorialVisual } from "./EditorialVisual";

export function ProgramCard({ program, locale, tone }: { program: Program; locale: Locale; tone: number }) {
  return (
    <Link
      href={`/${locale}/formations/${program.slug}`}
      className="reveal group flex flex-col overflow-hidden rounded-sm border border-primary-100 bg-white transition-shadow hover:shadow-xl hover:shadow-primary-900/10"
    >
      <div className="relative aspect-[8/5] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <EditorialVisual tone={tone} />
        </div>
        {program.accredited && (
          <span className="absolute top-3 start-3 rounded-sm bg-gold px-2 py-1 text-xs font-bold text-primary-950">
            {t(ui.labels.accreditedShort, locale)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
          {t(program.access, locale)} · {t(program.duration, locale)}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-primary-900 group-hover:text-accent-600">
          {t(program.name, locale)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{t(program.excerpt, locale)}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:text-accent-600">
          {t(ui.cta.discover, locale)}
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

export function NewsCard({ article, locale, tone }: { article: Article; locale: Locale; tone: number }) {
  const date = new Date(article.date).toLocaleDateString(locale === "ar" ? "ar-MA" : "fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Link
      href={`/${locale}/actualites/${article.slug}`}
      className="reveal group flex flex-col overflow-hidden rounded-sm border border-primary-100 bg-white transition-shadow hover:shadow-xl hover:shadow-primary-900/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <EditorialVisual tone={tone} />
        </div>
        <span className="absolute top-3 start-3 rounded-sm bg-accent-500 px-2 py-1 text-xs font-bold text-white">
          {t(article.category, locale)}
        </span>
        {article.archive && (
          <span className="absolute top-3 end-3 rounded-sm bg-primary-900/80 px-2 py-1 text-xs font-semibold text-white">
            {t(ui.labels.archive, locale)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={article.date} className="text-xs text-ink/50">
          {date}
        </time>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-primary-900 group-hover:text-accent-600">
          {t(article.title, locale)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{t(article.excerpt, locale)}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:text-accent-600">
          {t(ui.cta.readMore, locale)}
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="rtl:-scale-x-100">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
