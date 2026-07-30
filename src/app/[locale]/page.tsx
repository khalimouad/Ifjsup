import Link from "next/link";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles, keyFigures, partners, programs, testimonial } from "@/lib/content";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { Counter } from "@/components/Counter";
import { Facilities } from "@/components/Strips";
import { NewsMiniCard, ProgramCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const base = `/${l}`;

  const featured = programs.slice(0, 4);
  const latest = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      {/* ---------- héros pleine page ---------- */}
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-photo">
            <Photo src="/images/hero-plateau.webp" alt="" priority sizes="100vw" />
          </div>
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <span className="blob blob-a" aria-hidden="true" />
        <span className="blob blob-b" aria-hidden="true" />

        <div className="hero-in">
          <div className="hero-copy">
            <div className="kicker hero-fade hero-fade-1">
              {t(ui.home.heroKicker, l)}
            </div>

            <h1 className="hero-h1">
              <span className="hero-line">
                <span>{t(ui.home.heroLine1, l)}</span>
              </span>
              <span className="hero-line">
                <span>
                  <em>{t(ui.home.heroLine2, l)}</em>
                </span>
              </span>
              <span className="hero-line">
                <span>{t(ui.home.heroLine3, l)}</span>
              </span>
            </h1>

            <p className="hero-text hero-fade hero-fade-1">{t(ui.home.heroShort, l)}</p>

            <div className="hero-cta hero-fade hero-fade-2">
              <Link href={`${base}/admission`} className="btn btn-accent">
                {t(ui.cta.applyNow, l)}
                <Icon name="arrow" size={16} sw={2.2} className="arw" />
              </Link>
              <Link href={`${base}/formations`} className="btn btn-line">
                {t(ui.cta.allPrograms, l)}
                <Icon name="arrowNe" size={16} sw={2.2} className="arw-ne" />
              </Link>
            </div>
          </div>

          <div className="hero-foot hero-fade hero-fade-3">
            <div className="hero-figs">
              {keyFigures.map((f) => (
                <div className="hero-fig" key={f.value + f.label.fr}>
                  <div className="hero-fig-v">
                    <Counter value={f.value} />
                  </div>
                  <div className="hero-fig-l">{t(f.label, l)}</div>
                </div>
              ))}
            </div>

            <a href="#formations" className="scroll-hint">
              <span className="scroll-mouse" aria-hidden="true">
                <i />
              </span>
              {t(ui.home.discover, l)}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- équipements ---------- */}
      <section className="sec" style={{ padding: "56px var(--gut) 0" }}>
        <div className="wrap" style={{ padding: 0 }}>
          <h2 className="sr">{t(ui.home.facilitiesTitle, l)}</h2>
          <div data-reveal>
            <Facilities locale={l} />
          </div>
        </div>
      </section>

      {/* ---------- formations ---------- */}
      <section className="sec" id="formations" style={{ padding: "56px var(--gut) 0" }}>
        <div className="prog-row" data-stagger>
          <div className="prog-intro">
            <div className="kicker">{t(ui.home.programsTitle, l)}</div>
            <h2 className="h2">{t(ui.home.progTitle, l)}</h2>
            <p>{t(ui.home.progText, l)}</p>
            <Link href={`${base}/formations`} className="lnk">
              {t(ui.cta.allPrograms, l)}
              <Icon name="arrow" size={15} sw={2} />
            </Link>
          </div>

          {featured.map((p) => (
            <ProgramCard key={p.slug} program={p} locale={l} />
          ))}

          <article className="vr">
            <span className="tag tag-gold">{t(ui.home.vrBadge, l)}</span>
            <h3>{t(ui.home.vrTitle, l)}</h3>
            <p>{t(ui.home.vrText, l)}</p>
            <Link href={`${base}/galerie`} className="btn btn-accent btn-sm">
              {t(ui.home.vrCta, l)}
              <Icon name="arrow" size={15} sw={2.2} className="arw" />
            </Link>
            <div className="vr-media" aria-hidden="true">
              <Photo src="/images/regie.webp" alt="" sizes="200px" />
            </div>
            <div className="vr-grow" />
            <div className="vr-360">360°</div>
          </article>
        </div>
      </section>

      {/* ---------- témoignage + actualités ---------- */}
      <section className="sec" style={{ padding: "56px var(--gut) 0" }}>
        <div className="home-bottom" data-stagger>
          <div className="card testi">
            <div>
              <div className="kicker">{t(ui.home.testiKicker, l)}</div>
              <h2>{t(ui.home.testiTitle, l)}</h2>
              <p>{t(testimonial.quote, l)}</p>
              <div className="testi-who">
                <b>{t(testimonial.author, l)}</b>
                <span className="muted"> · {t(testimonial.meta, l)}</span>
              </div>
            </div>
            <div className="testi-media">
              <Photo src={testimonial.image} alt="" sizes="180px" />
              <span className="testi-quote" aria-hidden="true">
                ”
              </span>
            </div>
          </div>

          <div className="card news-panel">
            <div className="news-row">
              <div>
                <div className="kicker">{t(ui.news.title, l)}</div>
                <h2>{t(ui.home.newsPanelTitle, l)}</h2>
                <Link href={`${base}/actualites`} className="lnk-plain">
                  {t(ui.cta.allNews, l)}
                  <Icon name="arrow" size={15} sw={2} />
                </Link>
              </div>
              <div className="news-mini">
                {latest.map((a, i) => (
                  <NewsMiniCard key={a.slug} article={a} locale={l} gold={i > 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- partenaires en bande défilante ---------- */}
      <section className="sec" style={{ padding: "56px 0" }}>
        <div className="wrap" style={{ paddingBottom: 22 }}>
          <div className="kicker">{t(ui.labels.ourPartners, l)}</div>
        </div>
        <div className="marquee">
          <div className="marquee-track" aria-hidden="true">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <span className="partner" key={i}>
                {l === "ar" ? p.nameAr : p.name}
              </span>
            ))}
          </div>
          <p className="sr">
            {partners.map((p) => (l === "ar" ? p.nameAr : p.name)).join(", ")}
          </p>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}
