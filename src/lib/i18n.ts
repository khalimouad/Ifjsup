export const locales = ["fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Chaîne localisée : français (langue principale) + arabe */
export type L = { fr: string; ar: string };

export function t(l: L, locale: Locale): string {
  return l[locale];
}
