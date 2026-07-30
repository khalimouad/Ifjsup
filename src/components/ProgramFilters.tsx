"use client";

import { useMemo, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import type { Program } from "@/lib/content";
import { ProgramGridCard } from "./Cards";

type Cycle = Program["cycle"] | "all";
type Entry = Program["entry"];

/**
 * Liste filtrable des formations : puces de cycle en tête, filtres durée et
 * niveau en colonne. Le concept montrait des cases inertes — elles filtrent ici
 * réellement, sur les données de `content.ts`.
 */
export function ProgramFilters({
  programs,
  locale,
}: {
  programs: Program[];
  locale: Locale;
}) {
  const [cycle, setCycle] = useState<Cycle>("all");
  const [years, setYears] = useState<number[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

  const shown = useMemo(
    () =>
      programs.filter(
        (p) =>
          (cycle === "all" || p.cycle === cycle) &&
          (years.length === 0 || years.includes(p.years)) &&
          (entries.length === 0 || entries.includes(p.entry))
      ),
    [programs, cycle, years, entries]
  );

  function toggle<T>(list: T[], set: (v: T[]) => void, value: T) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function reset() {
    setCycle("all");
    setYears([]);
    setEntries([]);
  }

  const cycles: { key: Cycle; label: string }[] = [
    { key: "all", label: t(ui.filters.all, locale) },
    { key: "superieur", label: t(ui.filters.superieur, locale) },
    { key: "professionnel", label: t(ui.filters.professionnel, locale) },
  ];

  const entryOpts: { key: Entry; label: string }[] = [
    { key: "niveau-bac", label: t(ui.filters.entryNiveauBac, locale) },
    { key: "bac", label: t(ui.filters.entryBac, locale) },
    { key: "bac3", label: t(ui.filters.entryBac3, locale) },
  ];

  return (
    <>
      <div className="chips" style={{ marginBottom: 26 }}>
        {cycles.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`chip${cycle === c.key ? " chip-on" : ""}`}
            aria-pressed={cycle === c.key}
            onClick={() => setCycle(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="prog-page">
        <aside className="filters">
          <div className="filters-h">{t(ui.filters.duration, locale)}</div>
          <div className="filters-g">
            {[3, 2].map((y) => (
              <label key={y}>
                <input
                  type="checkbox"
                  checked={years.includes(y)}
                  onChange={() => toggle(years, setYears, y)}
                />
                {t(y === 3 ? ui.filters.years3 : ui.filters.years2, locale)}
              </label>
            ))}
          </div>

          <div className="filters-h">{t(ui.filters.entry, locale)}</div>
          <div className="filters-g">
            {entryOpts.map((e) => (
              <label key={e.key}>
                <input
                  type="checkbox"
                  checked={entries.includes(e.key)}
                  onChange={() => toggle(entries, setEntries, e.key)}
                />
                {e.label}
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={reset}
            style={{
              width: "100%",
              border: "1px solid var(--gold)",
              background: "none",
              color: "var(--gold)",
              padding: 10,
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            {t(ui.filters.reset, locale)}
          </button>
        </aside>

        <div>
          {shown.length > 0 ? (
            <div className="prog-grid">
              {shown.map((p) => (
                <ProgramGridCard key={p.slug} program={p} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="lead" role="status">
              {t(ui.filters.none, locale)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
