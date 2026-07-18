import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { Section, SectionHeading } from "@/components/Section";
import { FaqList } from "@/components/FaqList";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "القبول والتسجيل" : "Admission & inscription",
    description:
      locale === "ar"
        ? "مسطرة قبول بسيطة في 4 خطوات. أودع طلبك وسيتصل بك فريق الحرم خلال 24 ساعة."
        : "Un processus d'admission simple en 4 étapes. Déposez votre demande, l'équipe du campus vous rappelle sous 24h.",
  };
}

export default async function AdmissionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <Section tone="dark">
        <SectionHeading dark kicker={t(ui.admission.kicker, l)} title={t(ui.admission.title, l)} text={t(ui.admission.intro, l)} />
      </Section>

      {/* Étapes */}
      <Section>
        <SectionHeading title={t(ui.admission.stepsTitle, l)} />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ui.admission.steps.map((s, i) => (
            <li key={i} className="reveal relative rounded-sm border border-primary-100 bg-white p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-500 font-display text-lg font-black text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-primary-900">{t(s.title, l)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{t(s.text, l)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Niveaux acceptés */}
      <Section tone="mist">
        <SectionHeading title={t(ui.admission.levelsTitle, l)} />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {ui.admission.levels.map((lev, i) => (
            <div key={i} className="reveal rounded-sm border-t-4 border-accent-500 bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-black text-primary-900">{t(lev.level, l)}</h3>
              <p className="mt-2 text-sm text-ink/70">{t(lev.detail, l)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Formulaire de candidature */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading kicker={t(ui.admission.kicker, l)} title={t(ui.cta.applyNow, l)} />
            <div className="mt-8">
              <ContactForm locale={l} />
            </div>
          </div>
          <div>
            <SectionHeading title={t(ui.admission.faqTitle, l)} />
            <div className="mt-8">
              <FaqList locale={l} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
