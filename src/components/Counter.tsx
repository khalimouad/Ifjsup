"use client";

import { useEffect, useRef, useState } from "react";

/** Vrai si le visiteur demande à réduire les animations. */
function reduced() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Compteur qui s'incrémente une fois visible.
 * `value` est la chaîne d'affichage telle quelle (« 3 250+ », « 1994 ») : on en
 * extrait les chiffres pour animer, et on restitue le préfixe et le suffixe.
 * Le texte final est rendu côté serveur, donc lisible sans JavaScript.
 */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digits = value.replace(/[^\d]/g, "");
    // Rien à animer, ou année : on laisse la valeur telle quelle.
    if (!digits || digits.length > 6) return;
    const target = Number(digits);
    if (!Number.isFinite(target) || target === 0) return;

    const i = value.indexOf(digits[0]);
    const prefix = value.slice(0, i);
    const suffix = value.slice(value.lastIndexOf(digits[digits.length - 1]) + 1);
    // Conserve le séparateur de milliers d'origine (espace insécable inclus).
    const grouped = /[\s  ]/.test(value);
    const fmt = (n: number) => {
      const raw = String(n);
      const withSep = grouped ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : raw;
      return prefix + withSep + suffix;
    };

    if (reduced()) return;

    let raf = 0;
    let started = false;
    const DURATION = 1400;

    const run = (t0: number) => {
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / DURATION);
        // easeOutExpo : démarrage vif, arrivée douce sur la valeur exacte.
        const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setShown(fmt(Math.round(target * e)));
        if (p < 1) raf = requestAnimationFrame(step);
        else setShown(value);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !started) {
            started = true;
            io.disconnect();
            setShown(fmt(0));
            run(performance.now());
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} dir="ltr">
      {shown}
    </span>
  );
}
