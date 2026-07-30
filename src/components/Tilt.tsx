"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Inclinaison légère des cartes vers le curseur, et suivi de la position de la
 * souris pour la lueur d'accent (`--mx` / `--my`).
 *
 * Branché sur les cartes déjà présentes plutôt que sur un composant dédié :
 * aucune page n'a besoin d'être modifiée. Le pointeur grossier (tactile) et
 * `prefers-reduced-motion` désactivent l'effet.
 */
const SELECTOR = ".pcard, .gcard, .album, .tile, .stat, .step, .shot";

export function Tilt() {
  const pathname = usePathname();

  useEffect(() => {
    const fine =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!cards.length) return;

    const MAX = 5; // degrés

    const onMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--ry", `${((px - 0.5) * MAX * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - py) * MAX * 2).toFixed(2)}deg`);
    };

    const onLeave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };

    cards.forEach((c) => {
      c.dataset.tilt = "";
      c.addEventListener("pointermove", onMove as EventListener);
      c.addEventListener("pointerleave", onLeave as EventListener);
    });

    return () => {
      cards.forEach((c) => {
        delete c.dataset.tilt;
        c.removeEventListener("pointermove", onMove as EventListener);
        c.removeEventListener("pointerleave", onLeave as EventListener);
        c.style.removeProperty("--rx");
        c.style.removeProperty("--ry");
      });
    };
  }, [pathname]);

  return null;
}
