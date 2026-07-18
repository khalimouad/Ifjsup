import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/content";
import { Section } from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "سياسة الخصوصية" : "Politique de confidentialité" };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const fr = l === "fr";

  const sections = fr
    ? [
        {
          h: "Données collectées",
          p: "Les formulaires de ce site collectent uniquement les données nécessaires au traitement de votre demande : nom, téléphone, email, niveau d'études et filière souhaitée. Aucune donnée n'est vendue ni transmise à des tiers.",
        },
        {
          h: "Conformité à la loi 09-08",
          p: "Le traitement des données personnelles est effectué conformément à la loi marocaine 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
        },
        {
          h: "Vos droits",
          p: `Vous disposez d'un droit d'accès, de rectification et d'opposition sur vos données. Pour l'exercer, contactez-nous à ${site.email}.`,
        },
        {
          h: "Cookies et mesure d'audience",
          p: "Ce site peut utiliser un outil de mesure d'audience anonymisé. Le cas échéant, un bandeau de consentement vous permet d'accepter ou de refuser ces mesures.",
        },
      ]
    : [
        {
          h: "البيانات المجمّعة",
          p: "تجمع استمارات هذا الموقع فقط البيانات الضرورية لمعالجة طلبك: الاسم، الهاتف، البريد الإلكتروني، المستوى الدراسي والمسلك المرغوب. لا تُباع أي بيانات ولا تُنقل إلى أطراف ثالثة.",
        },
        {
          h: "المطابقة للقانون 09-08",
          p: "تُعالج البيانات الشخصية وفقًا للقانون المغربي 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي.",
        },
        {
          h: "حقوقك",
          p: `لديك حق الولوج إلى بياناتك وتصحيحها والاعتراض على معالجتها. لممارسة هذه الحقوق، راسلنا على ${site.email}.`,
        },
        {
          h: "ملفات الارتباط وقياس الجمهور",
          p: "قد يستعمل هذا الموقع أداة مجهولة لقياس الجمهور. عند الاقتضاء، يتيح لك شريط الموافقة قبول هذه القياسات أو رفضها.",
        },
      ];

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-black text-primary-900 sm:text-4xl">
          {fr ? "Politique de confidentialité" : "سياسة الخصوصية"}
        </h1>
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="mt-8 font-display text-xl font-bold text-primary-900">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-ink/80">{s.p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
