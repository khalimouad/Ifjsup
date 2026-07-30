import Link from "next/link";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { articles, keyFigures, partners, programs, testimonial } from "@/lib/content";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { Counter } from "@/components/Counter";
import { SplitWords } from "@/components/SplitWords";
import { Facilities } from "@/components/Strips";
import { NewsMiniCard } from "@/components/Cards";
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
  const ribbon = t(ui.home.ribbon, l);

  return (
    <>
      {/* ---------- héros pleine page, toujours sombre ---------- */}
      <section className="hero dark-scope">
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

            <a href="#manifeste" className="scroll-hint">
              <span className="scroll-mouse" aria-hidden="true">
                <i />
              </span>
              {t(ui.home.discover, l)}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- ruban défilant ---------- */}
      <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>{ribbon}</span>
          ))}
        </div>
      </div>

      {/* ---------- manifeste ---------- */}
      <section className="manifesto" id="manifeste">
        <span className="blob blob-b" aria-hidden="true" style={{ opacity: 0.16 }} />
        <div className="manifesto-in">
          <SplitWords as="h2" text={t(ui.home.manifesto, l)} className="manifesto-q" />
          <div className="manifesto-by">{t(ui.home.manifestoBy, l)}</div>
        </div>
      </section>

      {/* ---------- équipements ---------- */}
      <section className="sec" style={{ padding: "0 var(--gut) 64px" }}>
        <div className="wrap" style={{ padding: "0 0 24px" }}>
          <div className="kicker">{t(ui.home.facilitiesTitle, l)}</div>
        </div>
        <div className="wrap" style={{ padding: 0 }} data-reveal>
          <Facilities locale={l} />
          <div className="swipe-hint">
            <i aria-hidden="true" />
            {t(ui.home.swipe, l)}
          </div>
        </div>
      </section>

      {/* ---------- formations en panneaux empilés ---------- */}
      <section className="sec" id="formations" style={{ padding: "0 var(--gut) 80px" }}>
        <div className="wrap" style={{ padding: "0 0 34px" }} data-reveal>
          <div className="kicker">{t(ui.home.programsTitle, l)}</div>
          <h2 className="h2">{t(ui.home.progTitle, l)}</h2>
          <p className="lead" style={{ maxWidth: "58ch" }}>
            {t(ui.home.progText, l)}
          </p>
        </div>

        <div className="stack">
          {featured.map((p, i) => (
            <div
              className="stack-item"
              key={p.slug}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Link href={`${base}/formations/${p.slug}`} className="panel">
                <div className="panel-media">
                  <Photo
                    src={p.image}
                    alt={t(p.name, l)}
                    sizes="(max-width: 900px) 100vw, 46vw"
                  />
                </div>
                <div className="panel-body">
                  <div className="panel-n">
                    {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </div>
                  <h3>{t(p.name, l)}</h3>
                  <div className="panel-meta">
                    <span className="tag">{t(p.access, l)}</span>
                    <span className="muted" style={{ fontSize: 14 }}>
                      {t(p.duration, l)}
                    </span>
                  </div>
                  <p>{t(p.excerpt, l)}</p>
                  <span className="lnk" style={{ marginTop: 6 }}>
                    {t(ui.cta.readMore, l)}
                    <Icon name="arrow" size={15} sw={2} />
                  </span>
                </div>
                <span className="panel-ghost" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="wrap" style={{ padding: "40px 0 0" }} data-reveal>
          <Link href={`${base}/formations`} className="btn btn-line">
            {t(ui.cta.allPrograms, l)}
            <Icon name="arrow" size={16} sw={2.2} className="arw" />
          </Link>
        </div>
      </section>

      {/* ---------- visite en images ---------- */}
      <section className="sec" style={{ padding: "0 var(--gut) 80px" }}>
        <article className="vr" data-reveal>
          <span className="tag tag-gold">{t(ui.home.vrBadge, l)}</span>
          <h3>{t(ui.home.vrTitle, l)}</h3>
          <p>{t(ui.home.vrText, l)}</p>
          <Link href={`${base}/galerie`} className="btn btn-accent btn-sm">
            {t(ui.home.vrCta, l)}
            <Icon name="arrow" size={15} sw={2.2} className="arw" />
          </Link>
          <div className="vr-media" aria-hidden="true">
            <Photo src="/images/regie.webp" alt="" sizes="(max-width: 900px) 60vw, 620px" />
          </div>
          <div className="vr-360">360°</div>
        </article>
      </section>

      {/* ---------- témoignage + actualités ---------- */}
      <section className="sec" style={{ padding: "0 var(--gut) 80px" }}>
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
            <div className="swipe-hint">
              <i aria-hidden="true" />
              {t(ui.home.swipe, l)}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- partenaires ---------- */}
      <section className="sec" style={{ padding: "0 0 80px" }}>
        <div className="wrap" style={{ paddingBottom: 22 }} data-reveal>
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
