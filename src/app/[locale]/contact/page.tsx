import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { campuses, site } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return { title: t(ui.contact.title, l), description: t(ui.contact.intro, l) };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  return (
    <>
      <PageHero
        index="06"
        title={t(ui.contact.title, l)}
        intro={t(ui.contact.intro, l)}
        image="/images/partenariat.webp"
      />

      {/* ---------- les deux campus ---------- */}
      <section className="sec" style={{ padding: "34px var(--gut) 0" }}>
        <div className="wrap" style={{ padding: "0 0 22px" }}>
          <div className="kicker">{t(ui.contact.kicker, l)}</div>
          <h2 className="h2">{t(ui.labels.chooseCampus, l)}</h2>
        </div>
        <div className="g2" data-reveal style={{ alignItems: "start" }}>
          {campuses.map((c) => (
            <div className="contact-card" key={c.slug}>
              <h3>{t(c.city, l)}</h3>
              <p className="lead" style={{ marginBottom: 12 }}>
                {t(c.name, l)}
              </p>

              <div className="cinfo">
                <Icon name="pin" size={18} />
                <div>
                  <b>{t(ui.labels.address, l)}</b>
                  {t(c.address, l)}
                </div>
              </div>

              <div className="cinfo">
                <Icon name="phone" size={18} sw={1.7} />
                <div>
                  <b>{t(ui.labels.phone, l)}</b>
                  {c.phones.map((ph) => (
                    <div key={ph}>
                      <a href={`tel:${ph.replace(/-/g, "")}`} dir="ltr">
                        {ph}
                      </a>
                    </div>
                  ))}
                  {c.mobile && (
                    <div>
                      <a href={`tel:${c.mobile.replace(/-/g, "")}`} dir="ltr">
                        {c.mobile}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="cinfo">
                <Icon name="mail" size={18} />
                <div>
                  <b>{t(ui.labels.email, l)}</b>
                  <a href={`mailto:${c.email}`} dir="ltr">
                    {c.email}
                  </a>
                </div>
              </div>

              <div className="cinfo">
                <Icon name="clock" size={18} />
                <div>
                  <b>{t(ui.labels.hours, l)}</b>
                  {t(c.hours, l)}
                </div>
              </div>

              <div className="chips" style={{ marginTop: 18 }}>
                <a href={`tel:${c.phones[0].replace(/-/g, "")}`} className="chip">
                  {t(ui.cta.call, l)}
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                  className="chip"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(ui.cta.whatsapp, l)}
                </a>
                <Link href={`${base}/campus/${c.slug}`} className="chip">
                  {t(ui.cta.discover, l)}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- formulaire ---------- */}
      <section className="sec-soft" style={{ padding: "46px var(--gut) 60px", marginTop: 46 }}>
        <div className="wrap" style={{ padding: 0, maxWidth: 820 }}>
          <h2 className="h2" style={{ marginBottom: 24 }}>
            {t(ui.campus.formTitle, l)}
          </h2>
          <div className="card" style={{ padding: 28 }}>
            <ContactForm locale={l} />
          </div>
        </div>
      </section>
    </>
  );
}
