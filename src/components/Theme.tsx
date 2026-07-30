"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export const THEME_KEY = "ifj-theme";

/**
 * Le sombre porte l'identité : il est le défaut pour tout le monde, et
 * `data-theme="light"` est la variante que le visiteur choisit lui-même.
 * On ne suit donc pas `prefers-color-scheme` — sinon la majorité des
 * visiteurs verraient la variante plutôt que l'identité de l'école.
 * Script exécuté avant le premier rendu pour éviter le clignotement.
 */
export const themeBootstrap = `(function(){try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.dataset.theme="light";}catch(e){}})();`;

export function ThemeToggle({ label }: { label: string }) {
  const [light, setLight] = useState(false);

  // Le thème est posé par `themeBootstrap` : on se cale dessus au montage.
  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    const root = document.documentElement;
    if (next) root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next ? "light" : "dark");
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
      aria-pressed={light}
      title={label}
    >
      <Icon name="theme" size={16} sw={1.7} />
    </button>
  );
}
