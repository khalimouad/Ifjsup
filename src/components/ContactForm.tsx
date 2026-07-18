"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, programs, site } from "@/lib/content";

/**
 * Formulaire de demande d'information / candidature.
 * Sans backend pour l'instant : la demande part par email (mailto) vers
 * l'adresse du campus choisi — à raccorder au CMS/API en phase 2.
 */
export function ContactForm({
  locale,
  fixedCampus,
}: {
  locale: Locale;
  fixedCampus?: string;
}) {
  const [campus, setCampus] = useState(fixedCampus ?? campuses[0].slug);
  const [sent, setSent] = useState(false);

  const inputCls =
    "w-full rounded-sm border border-primary-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30";
  const labelCls = "mb-1.5 block text-sm font-semibold text-primary-900";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const target = campuses.find((c) => c.slug === campus) ?? campuses[0];
    const subject =
      locale === "fr"
        ? `Demande d'information — ${data.get("name")}`
        : `طلب معلومات — ${data.get("name")}`;
    const lines = [
      `${t(ui.form.name, locale)}: ${data.get("name")}`,
      `${t(ui.form.phone, locale)}: ${data.get("phone")}`,
      `${t(ui.form.email, locale)}: ${data.get("email") || "—"}`,
      `${t(ui.form.level, locale)}: ${data.get("level")}`,
      `${t(ui.form.program, locale)}: ${data.get("program")}`,
      `${t(ui.form.campus, locale)}: ${t(target.city, locale)}`,
      "",
      `${data.get("message") || ""}`,
    ];
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={labelCls}>
            {t(ui.form.name, locale)} *
          </label>
          <input id="f-name" name="name" required autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="f-phone" className={labelCls}>
            {t(ui.form.phone, locale)} *
          </label>
          <input id="f-phone" name="phone" required type="tel" autoComplete="tel" dir="ltr" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="f-email" className={labelCls}>
          {t(ui.form.email, locale)}
        </label>
        <input id="f-email" name="email" type="email" autoComplete="email" dir="ltr" className={inputCls} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="f-level" className={labelCls}>
            {t(ui.form.level, locale)} *
          </label>
          <select id="f-level" name="level" required className={inputCls}>
            {ui.admission.levels.map((l) => (
              <option key={l.level.fr} value={t(l.level, locale)}>
                {t(l.level, locale)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-program" className={labelCls}>
            {t(ui.form.program, locale)} *
          </label>
          <select id="f-program" name="program" required className={inputCls}>
            {programs.map((p) => (
              <option key={p.slug} value={t(p.name, locale)}>
                {t(p.name, locale)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!fixedCampus && (
        <fieldset>
          <legend className={labelCls}>{t(ui.form.campus, locale)} *</legend>
          <div className="grid grid-cols-2 gap-3">
            {campuses.map((c) => (
              <label
                key={c.slug}
                className={`tap flex cursor-pointer items-center justify-center rounded-sm border-2 px-4 py-3 text-sm font-bold transition-colors ${
                  campus === c.slug
                    ? "border-accent-500 bg-accent-50 text-accent-700"
                    : "border-primary-200 text-primary-800 hover:border-primary-400"
                }`}
              >
                <input
                  type="radio"
                  name="campus"
                  value={c.slug}
                  checked={campus === c.slug}
                  onChange={() => setCampus(c.slug)}
                  className="sr-only"
                />
                {t(c.city, locale)}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div>
        <label htmlFor="f-message" className={labelCls}>
          {t(ui.form.message, locale)}
        </label>
        <textarea id="f-message" name="message" rows={4} className={inputCls} />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink/70">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-accent-500" />
        <span>{t(ui.form.consent, locale)}</span>
      </label>

      <button
        type="submit"
        className="tap rounded-sm bg-accent-500 px-6 py-4 font-display text-base font-bold text-white transition-colors hover:bg-accent-600"
      >
        {t(ui.cta.send, locale)}
      </button>
      {sent && (
        <p role="status" className="rounded-sm bg-primary-50 px-4 py-3 text-sm font-medium text-primary-800">
          {t(ui.form.successNote, locale)}
        </p>
      )}
    </form>
  );
}
