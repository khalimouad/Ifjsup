import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { site, type Campus } from "@/lib/content";

function toIntl(phone: string) {
  return `+212${phone.replace(/-/g, "").slice(1)}`;
}

/** Bloc coordonnées + actions 1 clic (appel, WhatsApp, itinéraire) d'un campus */
export function CampusContact({ campus, locale }: { campus: Campus; locale: Locale }) {
  const whatsapp = campus.mobile ? toIntl(campus.mobile) : site.whatsapp;
  return (
    <div className="rounded-sm border border-primary-100 bg-white p-6">
      <h3 className="font-display text-xl font-bold text-primary-900">{t(campus.city, locale)}</h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-primary-800">{t(ui.labels.address, locale)}</dt>
          <dd className="mt-0.5 text-ink/70">{t(campus.address, locale)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-primary-800">{t(ui.labels.phone, locale)}</dt>
          <dd className="mt-0.5 space-x-2 text-ink/70" dir="ltr">
            {[...campus.phones, ...(campus.mobile ? [campus.mobile] : [])].map((p) => (
              <a key={p} href={`tel:${toIntl(p)}`} className="underline decoration-accent-300 underline-offset-2 hover:text-accent-600">
                {p}
              </a>
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-primary-800">{t(ui.labels.email, locale)}</dt>
          <dd className="mt-0.5 text-ink/70" dir="ltr">
            <a href={`mailto:${campus.email}`} className="underline decoration-accent-300 underline-offset-2 hover:text-accent-600">
              {campus.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-primary-800">{t(ui.labels.hours, locale)}</dt>
          <dd className="mt-0.5 text-ink/70">{t(campus.hours, locale)}</dd>
        </div>
      </dl>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <a
          href={`tel:${toIntl(campus.phones[0])}`}
          className="tap flex items-center justify-center rounded-sm bg-primary-700 px-2 py-3 text-sm font-bold text-white hover:bg-primary-600"
        >
          {t(ui.cta.call, locale)}
        </a>
        <a
          href={`https://wa.me/${whatsapp.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tap flex items-center justify-center rounded-sm bg-[#25D366] px-2 py-3 text-sm font-bold text-white hover:brightness-95"
        >
          {t(ui.cta.whatsapp, locale)}
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${campus.mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tap flex items-center justify-center rounded-sm bg-accent-500 px-2 py-3 text-sm font-bold text-white hover:bg-accent-600"
        >
          {t(ui.cta.directions, locale)}
        </a>
      </div>
    </div>
  );
}

/** Carte Google Maps intégrée */
export function CampusMap({ campus, locale }: { campus: Campus; locale: Locale }) {
  return (
    <div className="overflow-hidden rounded-sm border border-primary-100">
      <iframe
        title={`${t(ui.campus.mapTitle, locale)} — ${t(campus.city, locale)}`}
        src={`https://www.google.com/maps?q=${campus.mapQuery}&output=embed&hl=${locale}`}
        className="h-72 w-full border-0 sm:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
