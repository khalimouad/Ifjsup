import { t, type Locale } from "@/lib/i18n";
import { campusFeatures, facilities, keyFigures } from "@/lib/content";
import { Icon, type IconName } from "./Icon";

/** Les quatre cartes chiffres du héros d'accueil. */
export function KeyFigures({
  locale,
  row = false,
}: {
  locale: Locale;
  /** vrai hors héros : force une rangée de quatre à toute largeur */
  row?: boolean;
}) {
  return (
    <div className={`stats${row ? " stats-row" : ""}`}>
      {keyFigures.map((f) => (
        <div className="stat" key={f.value + f.label.fr}>
          <span className={`stat-ico${f.gold ? " stat-ico-gold" : ""}`}>
            <Icon name={f.icon as IconName} size={26} />
          </span>
          <div>
            {/* `dir=ltr` isole la valeur : « 3 250+ » se lirait « +250 3 » en RTL. */}
            <div className="stat-v">
              <span dir="ltr">{f.value}</span>
            </div>
            <div className="stat-l">{t(f.label, locale)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Bandeau horizontal des équipements, sous le héros. */
export function Facilities({ locale }: { locale: Locale }) {
  return (
    <div className="facilities">
      {facilities.map((f) => (
        <div className="facility" key={f.title.fr}>
          <span className={`facility-ico${f.accent ? " facility-ico-accent" : ""}`}>
            <Icon name={f.icon as IconName} size={27} />
          </span>
          <div>
            <div className="facility-t">{t(f.title, locale)}</div>
            <div className="facility-s">{t(f.sub, locale)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Bandeau centré des atouts du campus. */
export function CampusFeatures({
  locale,
  city,
}: {
  locale: Locale;
  /** ville injectée dans le premier libellé */
  city?: string;
}) {
  return (
    <div className="campus-feat" data-reveal>
      {campusFeatures.map((f, i) => (
        <div key={f.title.fr}>
          <span className={`cfeat-ico${f.gold ? " cfeat-ico-gold" : ""}`}>
            <Icon name={f.icon as IconName} size={28} />
          </span>
          <div className="cfeat-t">{t(f.title, locale)}</div>
          <div className="cfeat-s">
            {i === 0 && city ? city : t(f.sub, locale)}
          </div>
        </div>
      ))}
    </div>
  );
}
