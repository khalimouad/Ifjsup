/**
 * En-tête de section numéroté, commun à toutes les pages intérieures :
 * un numéro en monospace, le titre condensé, une accroche facultative.
 * Donne aux pages le même rythme éditorial que l'accueil.
 */
export function SectionHead({
  n,
  title,
  intro,
  id,
}: {
  /** numéro affiché à gauche du titre (« 02 ») */
  n: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="sec-head" id={id} data-reveal>
      <span className="sec-head-n" aria-hidden="true">
        {n}
      </span>
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}
