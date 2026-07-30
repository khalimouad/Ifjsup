import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, site } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return { title: t(ui.footer.legal, l) };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const isAr = l === "ar";

  return (
    <section className="sec" style={{ padding: "46px var(--gut) 60px" }}>
      <div className="wrap" style={{ padding: 0 }}>
        <h1 className="h1">{t(ui.footer.legal, l)}</h1>
        <div className="prose">
          <h2>{isAr ? "ناشر الموقع" : "Éditeur du site"}</h2>
          <p>
            {t(site.name, l)} — {isAr ? "معهد خاص للتعليم العالي" : "institut privé d'enseignement supérieur"}.
          </p>
          <ul>
            {campuses.map((c) => (
              <li key={c.slug}>
                <strong>{t(c.city, l)}</strong> — {t(c.address, l)} ·{" "}
                <span dir="ltr">{c.phones.join(" / ")}</span> ·{" "}
                <span dir="ltr">{c.email}</span>
              </li>
            ))}
          </ul>

          <h2>{isAr ? "التواصل" : "Contact"}</h2>
          <p>
            <span dir="ltr">{site.email}</span>
          </p>

          <h2>{isAr ? "الملكية الفكرية" : "Propriété intellectuelle"}</h2>
          <p>
            {isAr
              ? "جميع عناصر هذا الموقع — نصوص وصور وشعارات — محمية بموجب قانون الملكية الفكرية. يُمنع أي استعمال أو إعادة نشر دون إذن مسبق."
              : "L'ensemble des éléments de ce site — textes, photographies, logos — est protégé au titre du droit de la propriété intellectuelle. Toute reproduction ou réutilisation sans autorisation préalable est interdite."}
          </p>

          <h2>{isAr ? "الاستضافة" : "Hébergement"}</h2>
          <p>
            {isAr
              ? "الموقع مستضاف لدى مزود خدمة سحابية. تُقدَّم التفاصيل عند الطلب."
              : "Le site est hébergé chez un prestataire d'infrastructure cloud. Les coordonnées de l'hébergeur sont communiquées sur simple demande."}
          </p>

          <h2>{isAr ? "المسؤولية" : "Responsabilité"}</h2>
          <p>
            {isAr
              ? "يحرص المعهد على دقة المعلومات المنشورة. غير أن المعطيات المتعلقة بالمسالك والرسوم ومواعيد الدخول قابلة للتغيير؛ يُرجى التأكد منها لدى الحرم المعني."
              : "L'institut veille à l'exactitude des informations publiées. Les données relatives aux filières, aux frais et aux calendriers de rentrée sont toutefois susceptibles d'évoluer : elles doivent être confirmées auprès du campus concerné."}
          </p>
        </div>
      </div>
    </section>
  );
}
