import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses } from "@/lib/content";
import { Section, SectionHeading } from "@/components/Section";
import { CampusContact, CampusMap } from "@/components/CampusContact";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "اتصل بنا" : "Contact",
    description:
      locale === "ar"
        ? "تواصل مع حرم الدار البيضاء أو مراكش: هاتف، واتساب، استمارة وخرائط."
        : "Contactez le campus de Casablanca ou de Marrakech : téléphone, WhatsApp, formulaire et plans d'accès.",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <Section tone="dark">
        <SectionHeading dark kicker={t(ui.contact.kicker, l)} title={t(ui.contact.title, l)} text={t(ui.contact.intro, l)} />
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          {campuses.map((c) => (
            <div key={c.slug} className="reveal flex flex-col gap-6">
              <CampusContact campus={c} locale={l} />
              <CampusMap campus={c} locale={l} />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="mx-auto max-w-2xl">
          <SectionHeading title={t(ui.campus.formTitle, l)} />
          <div className="mt-8">
            <ContactForm locale={l} />
          </div>
        </div>
      </Section>
    </>
  );
}
