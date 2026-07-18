import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { faq } from "@/lib/content";

/** FAQ en accordéon natif (details/summary) — accessible clavier, zéro JS */
export function FaqList({ locale }: { locale: Locale }) {
  return (
    <div className="divide-y divide-primary-100 rounded-sm border border-primary-100 bg-white">
      {faq.map((item, i) => (
        <details key={i} className="faq group" {...(i === 0 ? { open: true } : {})}>
          <summary className="tap flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-display text-base font-bold text-primary-900 hover:text-accent-600">
            {t(item.q, locale)}
            <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary-200 text-primary-700" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70">{t(item.a, locale)}</p>
        </details>
      ))}
    </div>
  );
}
