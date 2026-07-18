import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { galleryAlbums } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { EditorialVisual } from "@/components/EditorialVisual";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "المعرض" : "Galerie & médiathèque" };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <Section tone="mist">
      <SectionHeading kicker={t(ui.gallery.kicker, l)} title={t(ui.gallery.title, l)} text={t(ui.gallery.intro, l)} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryAlbums.map((album) => (
          <figure
            key={album.slug}
            className="reveal group overflow-hidden rounded-sm border border-primary-100 bg-white"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                <EditorialVisual tone={album.tone} label={t(album.title, l)} />
              </div>
              <span className="absolute bottom-3 end-3 rounded-sm bg-primary-950/80 px-2 py-1 text-xs font-semibold text-white">
                {album.count} {t(ui.labels.photos, l)}
              </span>
            </div>
            <figcaption className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">{t(album.campus, l)}</p>
              <h2 className="mt-1 font-display text-lg font-bold text-primary-900">{t(album.title, l)}</h2>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
