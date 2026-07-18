/**
 * Visuel éditorial vectoriel (duotone bleu/orange) utilisé en attendant
 * la séance photo professionnelle recommandée par le cahier des charges.
 * Chaque "tone" donne une composition différente pour éviter la répétition.
 */
export function EditorialVisual({
  tone = 0,
  className = "",
  label,
}: {
  tone?: number;
  className?: string;
  label?: string;
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
  const id = `ev-${tone}`;

  return (
    <svg
      viewBox="0 0 800 500"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`h-full w-full object-cover ${className}`}
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
      <rect width="800" height="500" fill={`url(#${id}-bg)`} />
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
}
