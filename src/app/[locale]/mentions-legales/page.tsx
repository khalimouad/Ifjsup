import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { campuses, site } from "@/lib/content";
import { Section } from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "إشعارات قانونية" : "Mentions légales" };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const fr = l === "fr";

  return (
    <Section>
      <div className="prose mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-black text-primary-900 sm:text-4xl">
          {fr ? "Mentions légales" : "إشعارات قانونية"}
        </h1>

        <h2 className="mt-8 font-display text-xl font-bold text-primary-900">{fr ? "Éditeur du site" : "ناشر الموقع"}</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          {t(site.name, l)}
          <br />
          {t(campuses[0].address, l)}
          <br />
          <span dir="ltr">{campuses[0].phones.join(" / ")}</span> — <span dir="ltr">{site.email}</span>
        </p>

        <h2 className="mt-8 font-display text-xl font-bold text-primary-900">{fr ? "Propriété intellectuelle" : "الملكية الفكرية"}</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          {fr
            ? "L'ensemble des contenus de ce site (textes, images, logos, vidéos) est la propriété exclusive de l'IFJ, sauf mention contraire. Toute reproduction sans autorisation écrite préalable est interdite."
            : "جميع محتويات هذا الموقع (نصوص، صور، شعارات، فيديوهات) ملكية حصرية للمعهد، ما لم يُذكر خلاف ذلك. يُمنع أي استنساخ دون إذن كتابي مسبق."}
        </p>

        <h2 className="mt-8 font-display text-xl font-bold text-primary-900">{fr ? "Hébergement" : "الاستضافة"}</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          {fr
            ? "Site hébergé sur une infrastructure cloud avec CDN. Les coordonnées complètes de l'hébergeur sont disponibles sur demande auprès de l'éditeur."
            : "الموقع مستضاف على بنية سحابية مع شبكة توزيع المحتوى. تفاصيل المستضيف متاحة عند الطلب من الناشر."}
        </p>
      </div>
    </Section>
  );
}
