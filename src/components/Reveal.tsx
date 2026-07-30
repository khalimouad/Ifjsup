"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Couche de mouvement liée au défilement :
 *  - `data-reveal`, `data-stagger` et `data-words` basculent sur « in » quand
 *    l'élément est franchement entré dans l'écran ;
 *  - la barre de progression suit l'avancement de la lecture ;
 *  - la photo du héros défile plus lentement que la page, et le contenu du
 *    héros s'efface à mesure qu'on le quitte.
 *
 * Le déclenchement est volontairement tardif — 22 % du bas de l'écran — pour
 * que l'animation se joue sous les yeux du visiteur plutôt qu'en dehors.
 *
 * Filet de sécurité : au bout de 4 s, seuls les blocs *déjà atteints par le
 * défilement* sont révélés d'office. Un blanc-seing sur toute la page ferait
 * apparaître d'un coup des sections jamais atteintes, et l'animation ne serait
 * plus jamais vue. Le cas « sans JavaScript » est traité en CSS (`.no-js`).
 */
const SEL = "[data-reveal], [data-stagger], [data-words]";

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SEL));
    const mark = (el: HTMLElement) => {
      for (const a of ["data-stagger", "data-words", "data-reveal"]) {
        if (el.hasAttribute(a)) {
          el.setAttribute(a, "in");
          return;
        }
      }
    };

    if (reduce || typeof IntersectionObserver === "undefined") {
      nodes.forEach(mark);
      return;
    }

    let raf = 0;
    let fallback = 0;
    let io: IntersectionObserver | undefined;

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
        // L'élément doit avoir dépassé le bas de l'écran de 22 % pour s'animer.
        { rootMargin: "0px 0px -22% 0px", threshold: 0.01 }
      );
      raf = requestAnimationFrame(() => nodes.forEach((el) => io!.observe(el)));

      fallback = window.setTimeout(() => {
        nodes.forEach((el) => {
          // Seulement ce que le visiteur a déjà eu l'occasion de voir.
          if (el.getBoundingClientRect().top < window.innerHeight) mark(el);
        });
      }, 4000);
    }

    const bar = document.querySelector<HTMLElement>(".progress");
    const photo = document.querySelector<HTMLElement>(".hero-photo");
    const heroIn = document.querySelector<HTMLElement>(".hero-in");
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        if (bar) {
          const max = document.documentElement.scrollHeight - vh;
          bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        }
        if (y < vh) {
          // Parallaxe de la photo et effacement du contenu du héros.
          if (photo) photo.style.translate = `0 ${y * 0.22}px`;
          if (heroIn) {
            const p = Math.min(1, y / (vh * 0.72));
            heroIn.style.opacity = String(1 - p);
            heroIn.style.translate = `0 ${p * -60}px`;
          }
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
