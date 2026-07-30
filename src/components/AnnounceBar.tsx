import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

/**
 * Bandeau d'annonce défilant, au-dessus de l'en-tête.
 * La piste est dupliquée : l'animation la translate de -50 %, si bien que la
 * seconde copie prend exactement la place de la première — boucle sans saut.
 */
export function AnnounceBar({ locale }: { locale: Locale }) {
  const items = [
    t(ui.announce.intake, locale),
    t(ui.announce.campuses, locale),
    t(ui.announce.accredited, locale),
    t(ui.announce.open, locale),
  ];
  const track = [...items, ...items];

  return (
    <div className="announce">
      <div className="announce-in">
        <div className="ticker" aria-hidden="true">
          {track.map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      </div>
      {/* Le texte défilant est décoratif : on en donne une version lisible. */}
      <Link href={`/${locale}/admission`} className="sr">
        {items.join(" — ")}
      </Link>
    </div>
  );
}
