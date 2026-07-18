/**
 * Visuel éditorial duotone bleu/orange.
 * - Avec `src` : photo réelle (reprise d'ifjsup.ma) sous les calques
 *   graphiques — dégradé duotone, grille, ondes broadcast, point focal.
 * - Sans `src` : fond dégradé vectoriel (placeholder en attendant la
 *   séance photo professionnelle du CDC).
 * Chaque "tone" varie la composition pour éviter la répétition.
 */
export function EditorialVisual({
  tone = 0,
  src,
  className = "",
  label,
  eager = false,
}: {
  tone?: number;
  src?: string;
  className?: string;
  label?: string;
  eager?: boolean;
}) {
  const palettes = [
    ["#1b3a6b", "#0d1f3c", "#e8720c"],
    ["#142c52", "#081428", "#f2b705"],
    ["#234a87", "#0d1f3c", "#e8720c"],
    ["#0d1f3c", "#1b3a6b", "#f08a30"],
    ["#1b3a6b", "#142c52", "#f2b705"],
    ["#081428", "#234a87", "#e8720c"],
  ];
  const [c1, c2, accent] = palettes[tone % palettes.length];
  const id = `ev-${tone}${src ? "-p" : ""}`;

  const overlay = (
    <svg
      viewBox="0 0 800 500"
      role={label && !src ? "img" : "presentation"}
      aria-label={!src ? label : undefined}
      aria-hidden={label && !src ? undefined : true}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="75%" cy="25%" r="70%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="60%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      {!src && <rect width="800" height="500" fill={`url(#${id}-bg)`} />}
      <rect width="800" height="500" fill={`url(#${id}-glow)`} />
      {/* grille éditoriale discrète */}
      <g stroke="#ffffff" strokeOpacity="0.08">
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="500" />
        ))}
        {[100, 200, 300, 400].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} />
        ))}
      </g>
      {/* motif "onde" — clin d'œil broadcast */}
      <g fill="none" stroke={accent} strokeOpacity="0.7" strokeWidth="3">
        <path d={`M0 ${380 + (tone % 3) * 20} Q 200 ${300 - (tone % 2) * 40} 400 ${380} T 800 ${360}`} />
      </g>
      <g fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2">
        <path d={`M0 ${410 + (tone % 3) * 12} Q 200 ${340} 400 ${410} T 800 ${395}`} />
      </g>
      {/* point focal caméra */}
      <circle cx={620 - (tone % 3) * 60} cy={140 + (tone % 2) * 40} r="46" fill="none" stroke={accent} strokeWidth="3" />
      <circle cx={620 - (tone % 3) * 60} cy={140 + (tone % 2) * 40} r="8" fill={accent} />
    </svg>
  );

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {src && (
        <>
          <img
            src={src}
            alt={label ?? ""}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* teinte duotone : le dégradé de la charte par-dessus la photo */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: `linear-gradient(135deg, ${c1}cc, ${c2}d9)` }}
          />
        </>
      )}
      {overlay}
    </div>
  );
}
