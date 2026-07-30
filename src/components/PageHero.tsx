import { Photo } from "./Photo";

/**
 * Héros de page intérieure : titre à gauche, photo fondue à droite.
 * Reprise des sections `isProg` / `isAdm` / `isCampus` / `isNews` du concept.
 */
export function PageHero({
  title,
  intro,
  image,
  light = false,
  children,
}: {
  title: string;
  intro?: string;
  image: string;
  /** vrai pour poser le héros sur `--bg` au lieu de `--soft` */
  light?: boolean;
  /** puces de filtre, boutons… rendus sous l'accroche */
  children?: React.ReactNode;
}) {
  return (
    <section className={`phero${light ? " phero-light" : ""}`}>
      <div className="phero-media" aria-hidden="true">
        <div className="phero-photo">
          <Photo src={image} alt="" priority sizes="60vw" />
        </div>
        <div className="phero-fade" />
      </div>
      <div className="phero-in">
        <h1 className="h1">{title}</h1>
        {intro && <p className="lead">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
