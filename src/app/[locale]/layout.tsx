import type { Metadata } from "next";
import { Cairo, IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { dir, isLocale, locales, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { AnnounceBar } from "@/components/AnnounceBar";
import { Tilt } from "@/components/Tilt";
import { themeBootstrap } from "@/components/Theme";

/* IBM Plex : Sans pour le texte, Sans Condensed pour les titres en capitales,
   Mono pour les étiquettes. Cairo prend le relais pour l'arabe. */
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});
const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-plex-cond",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    metadataBase: new URL("https://www.ifjsup.ma"),
    title: {
      default: isAr
        ? "IFJ SUP — المعهد العالي للصحافة والإعلام | الدار البيضاء ومراكش"
        : "IFJ SUP — Institut Supérieur de Journalisme et d'Information | Casablanca & Marrakech",
      template: isAr ? "%s | IFJ SUP" : "%s | IFJ SUP",
    },
    description: isAr
      ? "المعهد الرائد في التكوين في مهن الصحافة والسمعي البصري بالمغرب منذ 1994. مسالك معتمدة في حرمين: الدار البيضاء ومراكش."
      : "Institut pionnier de la formation aux métiers du journalisme et de l'audiovisuel au Maroc depuis 1994. Filières accréditées sur deux campus : Casablanca et Marrakech.",
    alternates: { languages: { fr: "/fr", ar: "/ar" } },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_MA" : "fr_MA",
      siteName: "IFJ SUP",
    },
  };
}

/** schema.org — EducationalOrganization + les deux campus (SEO local). */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Institut Supérieur de Journalisme et d'Information (IFJ SUP)",
    foundingDate: "1994",
    url: "https://www.ifjsup.ma",
    email: "contact@ifjsup.ma",
    sameAs: ["https://www.facebook.com/ifjsup", "https://twitter.com/IfjGroupe"],
    department: campuses.map((c) => ({
      "@type": "EducationalOrganization",
      name: c.slug === "casablanca" ? "IFJ Sup Casablanca" : "IFJ Marrakech",
      url: `https://www.ifjsup.ma/fr/campus/${c.slug}`,
      email: c.email,
      telephone: `+212${c.phones[0].replace(/-/g, "").slice(1)}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.address.fr,
        addressLocality: c.city.fr,
        addressCountry: "MA",
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <html
      lang={l}
      dir={dir(l)}
      className={`no-js ${plex.variable} ${plexCondensed.variable} ${plexMono.variable} ${cairo.variable}`}
      style={
        {
          "--font-ui": l === "ar" ? "var(--font-cairo)" : "var(--font-plex)",
          "--font-head": l === "ar" ? "var(--font-cairo)" : "var(--font-plex-cond)",
          "--font-mono": l === "ar" ? "var(--font-cairo)" : "var(--font-plex-mono)",
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <body>
        {/* Pose le thème avant peinture pour éviter le clignotement. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <a href="#main" className="skip">
          {t(ui.skipToContent, l)}
        </a>
        <span className="progress" aria-hidden="true" />
        <AnnounceBar locale={l} />
        <Header locale={l} />
        <main id="main">{children}</main>
        <Footer locale={l} />
        <Reveal />
        <Tilt />
        <StructuredData />
      </body>
    </html>
  );
}
