import { Photo } from "./Photo";

/**
 * Héros de page intérieure.
 *
 * Deux variantes :
 *  - photo de fond, quand une vraie photographie du fonds correspond au sujet ;
 *  - typographique (`image` omis), sur fond d'aplat et de halos. Le fonds ne
 *    compte que dix photographies : mieux vaut un héros assumé sans image
 *    qu'une photo qui ne parle pas du sujet.
 *
 * Le bandeau reste sombre dans les deux thèmes (`dark-scope`) : les en-têtes
 * font une bande noire constante au-dessus du contenu.
 */
export function PageHero({
  title,
  intro,
  image,
  index,
  light = false,
  children,
}: {
  title: string;
  intro?: string;
  /** omis pour la variante typographique */
  image?: string;
  /** numéro de rubrique affiché en monospace (« 03 ») */
  index?: string;
  /** vrai pour poser le héros sur `--bg` au lieu de `--soft` */
  light?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`phero dark-scope${light ? " phero-light" : ""}${image ? "" : " phero-type"}`}
    >
      {image ? (
        <div className="phero-media" aria-hidden="true">
          <div className="phero-photo">
            <Photo src={image} alt="" priority sizes="70vw" />
          </div>
          <div className="phero-fade" />
        </div>
      ) : (
        <>
          <span className="blob blob-a" aria-hidden="true" />
          <span className="blob blob-b" aria-hidden="true" />
        </>
      )}

      <div className="phero-in">
        {index && (
          <span className="phero-index" aria-hidden="true">
            {index}
          </span>
        )}
        <h1 className="h1">{title}</h1>
        {intro && <p className="lead">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
