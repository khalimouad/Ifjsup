import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import Link from "next/link";
import { albumCount, galleryAlbums } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return { title: t(ui.gallery.title, l), description: t(ui.gallery.intro, l) };
}

export default async function GalleryPage({
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
        title={t(ui.gallery.title, l)}
        intro={t(ui.gallery.intro, l)}
        image="/images/regie-emission.webp"
      />

      <section className="sec" style={{ padding: "34px var(--gut) 60px" }}>
        <div className="g3" data-reveal>
          {galleryAlbums.map((a) => (
            <Link href={`/${l}/galerie/${a.slug}`} className="album" key={a.slug}>
              <div className="album-media">
                <Photo
                  src={a.image}
                  alt={t(a.title, l)}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <span className="album-count">
                  {albumCount(a)} {t(ui.labels.photos, l)}
                </span>
              </div>
              <div className="album-body">
                <h3 className="album-t">{t(a.title, l)}</h3>
                <div className="gcard-meta">{t(a.campus, l)}</div>
                <span className="lnk lnk-accent" style={{ marginTop: 14 }}>
                  {t(ui.gallery.viewAlbum, l)}
                  <Icon name="arrow" size={14} sw={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
