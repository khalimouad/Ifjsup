import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { site } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return { title: t(ui.footer.privacy, l) };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const isAr = l === "ar";

  return (
    <section className="sec" style={{ padding: "46px var(--gut) 60px" }}>
      <div className="wrap" style={{ padding: 0 }}>
        <h1 className="h1">{t(ui.footer.privacy, l)}</h1>
        <div className="prose">
          <p>
            {isAr
              ? "تخضع معالجة المعطيات الشخصية عبر هذا الموقع للقانون 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي."
              : "Les traitements de données personnelles réalisés via ce site sont soumis à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel."}
          </p>

          <h2>{isAr ? "المعطيات المجمَّعة" : "Données collectées"}</h2>
          <p>
            {isAr
              ? "لا يجمع الموقع سوى المعطيات التي تُدخلها بنفسك في استمارة طلب المعلومات: الاسم، الهاتف، البريد الإلكتروني (اختياري)، المستوى الدراسي، المسلك المرغوب، الحرم المختار، والرسالة."
              : "Le site ne collecte que les données que vous saisissez vous-même dans le formulaire de demande d'information : nom, téléphone, email (optionnel), niveau d'études, filière souhaitée, campus choisi et message."}
          </p>

          <h2>{isAr ? "الغاية" : "Finalité"}</h2>
          <p>
            {isAr
              ? "تُستعمل هذه المعطيات حصريًا لمعالجة طلبك ومواكبتك في مسطرة التسجيل. لا تُفوَّت لأي طرف ثالث لأغراض تجارية."
              : "Ces données servent exclusivement à traiter votre demande et à vous accompagner dans la procédure d'inscription. Elles ne sont cédées à aucun tiers à des fins commerciales."}
          </p>

          <h2>{isAr ? "الإرسال" : "Transmission"}</h2>
          <p>
            {isAr
              ? "تُرسَل الاستمارة عبر تطبيق البريد الإلكتروني الخاص بك إلى عنوان الحرم الذي اخترته. لا يخزّن الموقع أي معطى على خادم."
              : "Le formulaire est transmis via votre propre application de messagerie vers l'adresse du campus que vous avez choisi. Le site ne stocke aucune donnée sur un serveur."}
          </p>

          <h2>{isAr ? "حقوقك" : "Vos droits"}</h2>
          <p>
            {isAr
              ? "لك حق الولوج إلى معطياتك وتصحيحها والاعتراض على معالجتها. لممارسة هذه الحقوق، اكتب إلينا على العنوان أدناه."
              : "Vous disposez d'un droit d'accès, de rectification et d'opposition sur vos données. Pour l'exercer, écrivez-nous à l'adresse ci-dessous."}
          </p>
          <p>
            <span dir="ltr">{site.email}</span>
          </p>

          <h2>{isAr ? "ملفات تعريف الارتباط" : "Cookies"}</h2>
          <p>
            {isAr
              ? "لا يستعمل هذا الموقع أي ملف تعريف ارتباط للتتبع أو الإشهار. يُحفظ اختيارك للمظهر (فاتح/داكن) محليًا في متصفحك فقط."
              : "Ce site n'utilise aucun cookie de suivi ni de publicité. Votre choix de thème (clair/sombre) est conservé localement dans votre navigateur, et nulle part ailleurs."}
          </p>
        </div>
      </div>
    </section>
  );
}
