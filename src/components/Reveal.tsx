"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Apparition au défilement — reprise de `componentDidMount` du concept :
 * un IntersectionObserver bascule `data-reveal` sur « in », avec un filet
 * de sécurité à 2,6 s pour que rien ne reste invisible si l'observateur
 * n'entre jamais en jeu. Remonté à chaque changement de route.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (nodes.length === 0) return;

    const showAll = () =>
      nodes.forEach((el) => el.setAttribute("data-reveal", "in"));

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      showAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-reveal", "in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );

    const raf = requestAnimationFrame(() => nodes.forEach((el) => io.observe(el)));
    const fallback = window.setTimeout(showAll, 2600);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
