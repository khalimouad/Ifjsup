"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Couche de mouvement liée au défilement :
 *  - `data-reveal` et `data-stagger` basculent sur « in » à l'entrée à l'écran ;
 *  - la barre de progression suit l'avancement de la lecture ;
 *  - la photo du héros défile plus lentement que la page (parallaxe).
 *
 * Filet de sécurité à 2,6 s : si l'observateur ne se déclenche jamais, rien ne
 * reste invisible. Tout est coupé si le visiteur demande moins d'animation.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]")
    );
    const mark = (el: HTMLElement) => {
      if (el.hasAttribute("data-stagger")) el.setAttribute("data-stagger", "in");
      else el.setAttribute("data-reveal", "in");
    };

    if (reduce) {
      nodes.forEach(mark);
      return;
    }

    let io: IntersectionObserver | undefined;
    let raf = 0;
    let fallback = 0;

    if (nodes.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              mark(e.target as HTMLElement);
              io!.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
      );
      raf = requestAnimationFrame(() => nodes.forEach((el) => io!.observe(el)));
      fallback = window.setTimeout(() => nodes.forEach(mark), 2600);
    }

    // Barre de progression + parallaxe, regroupées dans une seule frame.
    const bar = document.querySelector<HTMLElement>(".progress");
    const photo = document.querySelector<HTMLElement>(".hero-photo");
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bar) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        }
        // La photo ne bouge que tant que le héros est à l'écran.
        if (photo && y < window.innerHeight) {
          photo.style.translate = `0 ${y * 0.22}px`;
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
