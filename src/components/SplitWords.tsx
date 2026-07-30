/**
 * Découpe un texte en mots, chacun monté derrière son propre masque.
 * Le parent porte `data-words` : l'observateur le bascule sur « in » et les
 * mots se lèvent en cascade, l'index servant de retard.
 *
 * Le texte reste un seul nœud lisible pour les lecteurs d'écran — les mots ne
 * sont découpés que visuellement. L'espacement vient d'une marge sur `.word`
 * et non d'un espace textuel : `overflow: hidden` sur un `inline-block`
 * escamote les espaces de bord, et les mots se colleraient.
 */
export function SplitWords({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3";
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag className={className} data-words>
      <span className="sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span className="word" key={i}>
            <span style={{ transitionDelay: `${i * 42}ms` }}>{w}</span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
