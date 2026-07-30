import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import type { Article, Program } from "@/lib/content";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

/** Date localisée, en clair. */
export function fmtDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-MA" : "fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ---------- formations ---------- */

/** Carte haute de la rangée d'accueil (photo, badge, flèche ronde). */
export function ProgramCard({
  program: p,
  locale,
}: {
  program: Program;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/formations/${p.slug}`} className="pcard">
      <div className="pcard-media">
        <Photo src={p.image} alt={t(p.name, locale)} sizes="(max-width: 900px) 100vw, 25vw" />
      </div>
      <div className="pcard-body">
        <span className="tag">{t(p.access, locale)}</span>
        <h3 className="pcard-t">{t(p.name, locale)}</h3>
        <div className="pcard-meta">{t(p.duration, locale)}</div>
        <p className="pcard-x">{t(p.excerpt, locale)}</p>
        <div className="grow" />
        <span className="pcard-arrow" aria-hidden="true">
          <Icon name="arrow" size={16} sw={2.2} />
        </span>
      </div>
    </Link>
  );
}

/** Carte de la grille de la page « Formations ». */
export function ProgramGridCard({
  program: p,
  locale,
}: {
  program: Program;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/formations/${p.slug}`} className="gcard">
      <div className="gcard-media">
        <Photo src={p.image} alt={t(p.name, locale)} sizes="(max-width: 900px) 100vw, 33vw" />
      </div>
      <div className="gcard-body">
        <h3 className="gcard-t">{t(p.name, locale)}</h3>
        <div className="gcard-meta">
          {t(p.degree, locale)} — {t(p.duration, locale)}
        </div>
        <p className="gcard-x">{t(p.excerpt, locale)}</p>
        <div className="grow" />
        <span className="lnk lnk-accent">
          {t(ui.cta.readMore, locale)}
          <Icon name="arrow" size={14} sw={2} />
        </span>
      </div>
    </Link>
  );
}

/* ---------- actualités ---------- */

/** Vignette compacte du panneau d'accueil. */
export function NewsMiniCard({
  article: a,
  locale,
  gold = false,
}: {
  article: Article;
  locale: Locale;
  gold?: boolean;
}) {
  return (
    <Link href={`/${locale}/actualites/${a.slug}`} className="ncard">
      <div className="ncard-media">
        <Photo src={a.image} alt={t(a.title, locale)} sizes="220px" />
        <span className={`tag${gold ? " tag-gold" : ""}`}>{t(a.category, locale)}</span>
      </div>
      <h4 className="ncard-t">{t(a.title, locale)}</h4>
      <div className="ncard-d">{fmtDate(a.date, locale)}</div>
    </Link>
  );
}

/** Article vedette de la page « Actualités ». */
export function FeaturedArticle({
  article: a,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/actualites/${a.slug}`} className="feat">
      <div className="feat-media">
        <Photo src={a.image} alt={t(a.title, locale)} priority sizes="(max-width: 1400px) 100vw, 55vw" />
      </div>
      <div className="feat-body">
        <div className="feat-d">{fmtDate(a.date, locale)}</div>
        <h2>{t(a.title, locale)}</h2>
        <span className="lnk-plain">
          {t(ui.cta.readMore, locale)}
          <Icon name="arrow" size={15} sw={2} />
        </span>
      </div>
    </Link>
  );
}

/** Ligne de la liste d'actualités (photo à gauche, texte à droite). */
export function ArticleRow({
  article: a,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/actualites/${a.slug}`} className="lcard">
      <div className="lcard-media">
        <Photo src={a.image} alt={t(a.title, locale)} sizes="200px" />
      </div>
      <div className="lcard-body">
        <div className="lcard-d">{fmtDate(a.date, locale)}</div>
        <h3>{t(a.title, locale)}</h3>
        <span className="lnk-plain lnk-sm">
          {t(ui.cta.readMore, locale)}
          <Icon name="arrow" size={13} sw={2} />
        </span>
      </div>
    </Link>
  );
}
