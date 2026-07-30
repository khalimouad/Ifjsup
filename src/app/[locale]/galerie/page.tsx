import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { galleryAlbums } from "@/lib/content";
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
            <div className="album" key={a.slug}>
              <div className="album-media">
                <Photo
                  src={a.image}
                  alt={t(a.title, l)}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <div className="album-body">
                <h3 className="album-t">{t(a.title, l)}</h3>
                <div className="gcard-meta">
                  {t(a.campus, l)} · {a.count} {t(ui.labels.photos, l)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
