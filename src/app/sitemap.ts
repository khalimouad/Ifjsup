import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { articles, campuses, programs } from "@/lib/content";

const BASE = "https://www.ifjsup.ma";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/institut",
    "/formations",
    "/actualites",
    "/galerie",
    "/admission",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ];
  const dynamicPaths = [
    ...campuses.map((c) => `/campus/${c.slug}`),
    ...programs.map((p) => `/formations/${p.slug}`),
    ...articles.map((a) => `/actualites/${a.slug}`),
  ];

  return locales.flatMap((locale) =>
    [...staticPaths, ...dynamicPaths].map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/campus") ? 0.9 : 0.7,
    }))
  );
}
