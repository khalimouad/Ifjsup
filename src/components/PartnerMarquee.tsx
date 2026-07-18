import type { Locale } from "@/lib/i18n";
import { partners } from "@/lib/content";

export function PartnerMarquee({ locale }: { locale: Locale }) {
  const names = partners.map((p) => (locale === "ar" ? p.nameAr : p.name));
  const loop = [...names, ...names];
  return (
    <div className="overflow-hidden border-y border-primary-100 bg-white py-6" dir="ltr">
      <div className="animate-marquee flex w-max items-center gap-12 px-6">
        {loop.map((n, i) => (
          <span
            key={i}
            aria-hidden={i >= names.length}
            className="whitespace-nowrap font-display text-lg font-bold uppercase tracking-wide text-primary-300"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
