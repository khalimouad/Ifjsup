import type { Metadata } from "next";
import { Archivo, Cairo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { dir, isLocale, locales, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { campuses } from "@/lib/content";
import { ui } from "@/lib/ui";
import { t } from "@/lib/i18n";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

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
        ? "IFJ — المعهد العالي للصحافة والإعلام | الدار البيضاء ومراكش"
        : "IFJ — Institut Supérieur de Journalisme et d'Information | Casablanca & Marrakech",
      template: isAr ? "%s | IFJ المعهد العالي للصحافة" : "%s | IFJ Sup",
    },
    description: isAr
      ? "المعهد الرائد في التكوين في مهن الصحافة والسمعي البصري بالمغرب منذ 1994. مسالك معتمدة في حرمين: الدار البيضاء ومراكش."
      : "Institut pionnier de la formation aux métiers du journalisme et de l'audiovisuel au Maroc depuis 1994. Filières accréditées sur deux campus : Casablanca et Marrakech.",
    alternates: {
      languages: { fr: "/fr", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_MA" : "fr_MA",
      siteName: "IFJ Sup",
    },
  };
}

/** Données structurées schema.org — EducationalOrganization + 2 campus (SEO local) */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Institut Supérieur de Journalisme et d'Information (IFJ)",
    foundingDate: "1994",
    url: "https://www.ifjsup.ma",
    email: "contact@ifjsup.ma",
    sameAs: [
      "https://www.facebook.com/ifjsup",
      "https://twitter.com/IfjGroupe",
    ],
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
  const isAr = l === "ar";

  return (
    <html
      lang={l}
      dir={dir(l)}
      className={`${archivo.variable} ${inter.variable} ${cairo.variable}`}
      style={
        {
          "--font-display": isAr ? "var(--font-cairo)" : "var(--font-archivo)",
          "--font-body": isAr ? "var(--font-cairo)" : "var(--font-inter)",
        } as React.CSSProperties
      }
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[60] focus:rounded-sm focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-white"
        >
          {t(ui.skipToContent, l)}
        </a>
        <Header locale={l} />
        <main id="main">{children}</main>
        <Footer locale={l} />
        <MobileActionBar locale={l} />
        <StructuredData />
      </body>
    </html>
  );
}
