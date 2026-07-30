import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { albumCount, galleryAlbums } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    galleryAlbums.map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  const a = galleryAlbums.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: `${t(a.title, l)} — ${t(ui.gallery.title, l)}`,
    description: t(a.intro, l),
    openGraph: { images: [a.image] },
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  const i = galleryAlbums.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const album = galleryAlbums[i];
  const prev = galleryAlbums[(i - 1 + galleryAlbums.length) % galleryAlbums.length];
  const next = galleryAlbums[(i + 1) % galleryAlbums.length];

  return (
    <>
      <section className="sec" style={{ padding: "26px 0 0" }}>
        <nav className="crumbs" aria-label={t(ui.cta.backTo, l)}>
          <Link href={base}>{t(ui.nav.home, l)}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`${base}/galerie`}>{t(ui.gallery.title, l)}</Link>
          <span aria-hidden="true">/</span>
          <b>{t(album.title, l)}</b>
        </nav>
      </section>

      <PageHero
        light
        title={t(album.title, l)}
        intro={t(album.intro, l)}
        image={album.image}
      >
        <div className="chips">
          <span className="chip chip-on">{t(album.campus, l)}</span>
          <span className="chip">
            {albumCount(album)} {t(ui.labels.photos, l)}
          </span>
        </div>
      </PageHero>

      {/* ---------- planche-contact ---------- */}
      <section className="sec" style={{ padding: "40px var(--gut) 60px" }}>
        <div className="sheetgrid" data-reveal>
          {album.photos.map((ph, n) => (
            <figure className="shot" key={ph.src}>
              <div className="shot-media">
                <Photo
                  src={ph.src}
                  alt={t(ph.caption, l)}
                  priority={n === 0}
                  sizes={n === 0 ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 33vw"}
                />
              </div>
              <figcaption>
                <b>
                  {t(ui.gallery.photoOf, l)} {String(n + 1).padStart(2, "0")} /{" "}
                  {String(albumCount(album)).padStart(2, "0")}
                </b>
                {t(ph.caption, l)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- navigation entre albums ---------- */}
      <section className="sec" style={{ padding: "0 var(--gut) 60px" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="album-nav">
            <Link href={`${base}/galerie/${prev.slug}`} className="lnk">
              <Icon name="arrow" size={15} sw={2} className="arw-back" />
              {t(ui.gallery.prevAlbum, l)} — {t(prev.title, l)}
            </Link>
            <Link href={`${base}/galerie`} className="lnk-plain">
              {t(ui.gallery.allAlbums, l)}
            </Link>
            <Link href={`${base}/galerie/${next.slug}`} className="lnk">
              {t(ui.gallery.nextAlbum, l)} — {t(next.title, l)}
              <Icon name="arrow" size={15} sw={2} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
