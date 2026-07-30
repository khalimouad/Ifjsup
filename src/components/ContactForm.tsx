"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, programs } from "@/lib/content";

/**
 * Demande d'information / candidature.
 * Sans backend : la demande part par `mailto:` vers l'adresse du campus
 * choisi — à raccorder à une API en phase 2 (voir README).
 */
export function ContactForm({
  locale,
  fixedCampus,
}: {
  locale: Locale;
  /** slug de campus imposé (page campus) — masque le sélecteur */
  fixedCampus?: string;
}) {
  const [campus, setCampus] = useState(fixedCampus ?? campuses[0].slug);
  const [sent, setSent] = useState(false);

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
    // La demande va au campus concerné, pas à l'adresse générique.
    window.location.href = `mailto:${target.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="g2" style={{ gap: 16, maxWidth: "none" }}>
        <div className="field">
          <label htmlFor="f-name">{t(ui.form.name, locale)} *</label>
          <input id="f-name" name="name" required autoComplete="name" className="input" />
        </div>
        <div className="field">
          <label htmlFor="f-phone">{t(ui.form.phone, locale)} *</label>
          <input
            id="f-phone"
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            dir="ltr"
            className="input"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-email">{t(ui.form.email, locale)}</label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          className="input"
        />
      </div>

      <div className="g2" style={{ gap: 16, maxWidth: "none" }}>
        <div className="field">
          <label htmlFor="f-level">{t(ui.form.level, locale)} *</label>
          <select id="f-level" name="level" required className="input">
            {ui.admission.levels.map((l) => (
              <option key={l.level.fr} value={t(l.level, locale)}>
                {t(l.level, locale)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-program">{t(ui.form.program, locale)} *</label>
          <select id="f-program" name="program" required className="input">
            {programs.map((p) => (
              <option key={p.slug} value={t(p.name, locale)}>
                {t(p.name, locale)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!fixedCampus && (
        <div className="field">
          <label htmlFor="f-campus">{t(ui.form.campus, locale)} *</label>
          <select
            id="f-campus"
            name="campus"
            required
            className="input"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
          >
            {campuses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {t(c.city, locale)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor="f-message">{t(ui.form.message, locale)}</label>
        <textarea id="f-message" name="message" rows={4} className="input" />
      </div>

      <label className="consent">
        <input type="checkbox" required />
        <span>{t(ui.form.consent, locale)}</span>
      </label>

      <button type="submit" className="btn btn-accent" style={{ justifySelf: "start" }}>
        {t(ui.cta.send, locale)}
      </button>

      {sent && (
        <p role="status" className="note" style={{ margin: 0 }}>
          {t(ui.form.successNote, locale)}
        </p>
      )}
    </form>
  );
}
