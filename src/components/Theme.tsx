"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export const THEME_KEY = "ifj-theme";

/**
 * Script exécuté avant le premier rendu pour éviter le clignotement :
 * choix mémorisé s'il existe, sinon préférence du système.
 * Rendu tel quel dans le document — voir `layout.tsx`.
 */
export const themeBootstrap = `(function(){try{var s=localStorage.getItem("${THEME_KEY}");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.dataset.theme="dark";}catch(e){}})();`;

export function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState(false);

  // Le thème est posé par `themeBootstrap` : on se cale dessus au montage.
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    if (next) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* navigation privée : le choix ne survit pas au rechargement */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-box"
      aria-label={label}
      aria-pressed={dark}
      title={label}
    >
      <Icon name="theme" size={16} sw={1.7} />
    </button>
  );
}
