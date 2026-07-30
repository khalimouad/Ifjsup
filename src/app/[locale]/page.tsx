import Link from "next/link";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles, keyFigures, programs, testimonial } from "@/lib/content";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { KeyFigures, Facilities } from "@/components/Strips";
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
  const graduates = keyFigures[1].value;

  return (
    <>
      {/* ---------- héros ---------- */}
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-photo">
            <Photo
              src="/images/hero-plateau.webp"
              alt=""
              priority
              sizes="(max-width: 900px) 100vw, 74vw"
            />
          </div>
          <div className="hero-fade-x" />
          <div className="hero-fade-y" />
        </div>

        <div className="hero-grid">
          <div>
            <h1 className="hero-h1">
              {t(ui.home.heroLine1, l)}
              <br />
              <span>
                {t(ui.home.heroLine2, l)}
                <br />
                {t(ui.home.heroLine3, l)}
              </span>
            </h1>
            <div className="hero-rule" />
            <p className="hero-text">{t(ui.home.heroShort, l)}</p>

            <div className="hero-cta">
              <Link href={`${base}/admission`} className="btn btn-accent">
                {t(ui.cta.applyNow, l)}
                <Icon name="arrow" size={16} sw={2} className="arw" />
              </Link>
              <Link href={`${base}/formations`} className="btn btn-outline">
                {t(ui.cta.allPrograms, l)}
                <Icon name="play" size={14} fill className="arw" />
              </Link>
            </div>

            <div className="hero-proof">
              <div className="dots" aria-hidden="true">
                <span className="dot">S</span>
                <span className="dot dot-gold">Y</span>
                <span className="dot">N</span>
                <span className="dot dot-solid">+</span>
              </div>
              <div className="hero-proof-t">
                <b>
                  <span dir="ltr">{graduates}</span> {t(keyFigures[1].label, l)}
                </b>
                <br />
                <span className="muted">{t(ui.home.trustLine, l)}</span>
              </div>
            </div>
          </div>

          <KeyFigures locale={l} />
        </div>

        <div className="wrap hero-layer" style={{ padding: "34px var(--gut) 0" }}>
          <div className="scroll-hint">
            <span className="scroll-mouse" aria-hidden="true">
              <i />
            </span>
            {t(ui.home.discover, l)}
            <span className="credit">{t(ui.home.heroKicker, l)}</span>
          </div>
        </div>

        <div className="wrap hero-layer" style={{ padding: "26px var(--gut) 46px" }}>
          <h2 className="sr">{t(ui.home.facilitiesTitle, l)}</h2>
          <Facilities locale={l} />
        </div>
      </section>

      {/* ---------- formations ---------- */}
      <section className="sec-soft" style={{ padding: "34px var(--gut) 0" }}>
        <div className="prog-row" data-reveal>
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
              <Icon name="arrow" size={15} sw={2} className="arw" />
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
      <section className="sec-soft" style={{ padding: "18px var(--gut) 46px" }}>
        <div className="home-bottom" data-reveal>
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
                <div className="kicker kicker-accent">{t(ui.news.title, l)}</div>
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

      <CtaBand locale={l} />
    </>
  );
}
