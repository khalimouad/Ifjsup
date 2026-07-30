/**
 * Jeu d'icônes du concept « IFJ SUP 2027 » — tracés repris tels quels.
 * Contour sur `currentColor`, jamais de remplissage sauf `play`.
 */

export type IconName =
  | "chevron"
  | "search"
  | "menu"
  | "close"
  | "arrow"
  | "play"
  | "playLg"
  | "cap"
  | "users"
  | "trophy"
  | "handshake"
  | "tv"
  | "newsroom"
  | "mic"
  | "film"
  | "monitor"
  | "ai"
  | "check"
  | "globe"
  | "clock"
  | "pin"
  | "calendar"
  | "download"
  | "building"
  | "checkCircle"
  | "books"
  | "phone"
  | "mail"
  | "whatsapp"
  | "theme"
  | "scissors";

const PATHS: Record<IconName, React.ReactNode> = {
  chevron: <path d="M6 9l6 6 6-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  play: <path d="M7 4l13 8-13 8z" />,
  playLg: <path d="M8 5l12 7-12 7z" />,
  cap: (
    <>
      <path d="M2 8l10-4 10 4-10 4z" />
      <path d="M6 10.5V15c0 1.8 2.7 3 6 3s6-1.2 6-3v-4.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19c0-3.3 2.7-5.2 6-5.2s6 1.9 6 5.2" />
      <circle cx="17.5" cy="9.5" r="2.3" />
      <path d="M16.5 14.2c2.9 0 4.5 1.7 4.5 4.8" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5.5a4 4 0 0 1-8 0z" />
      <path d="M8 5.5H5V7a3 3 0 0 0 3 3M16 5.5h3V7a3 3 0 0 1-3 3M12 13.5V17M9 20h6" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.5 12.5l4-4 5.5 5.5-4 4z" />
      <path d="M21.5 12.5l-4-4L12 14l4 4z" />
    </>
  ),
  tv: (
    <>
      <rect x="2" y="7" width="20" height="13" rx="2.5" />
      <path d="M8.5 3.5L12 7l3.5-3.5" />
    </>
  ),
  newsroom: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M7 9h10M7 12.5h10M7 16h6" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="10.5" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M3 8l2.5-4h13L21 8M9 8l2.5-4M15 8l2.5-4" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 17v3.5" />
    </>
  ),
  ai: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="9.4" cy="10" r="1.2" />
      <circle cx="14.6" cy="10" r="1.2" />
      <path d="M9 14.6h6" />
    </>
  ),
  check: <path d="M4 12.5l5 5L20 6.5" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14 0 17M12 3.5c-2.5 2.5-2.5 14 0 17" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  download: <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />,
  building: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M7 8V5h10v3M9 20v-4h6v4" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12.5l2.5 2.5L16 10" />
    </>
  ),
  books: (
    <>
      <path d="M4 5.5h7v14H4zM13 5.5h7v14h-7z" />
      <path d="M7 9h1M16 9h1" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a10 10 0 0 0 4.5 4.5L15 11l4 1.5v3a2 2 0 0 1-2.2 2A15 15 0 0 1 4 6.2 2 2 0 0 1 6 4z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
      <path d="M8.6 8.2c-.3.6-.2 1.6.6 2.7.8 1.1 2 2 3 2.3.7.2 1.3 0 1.6-.5l.3-.6-1.7-.9-.6.6a5.4 5.4 0 0 1-1.8-1.8l.6-.6-.9-1.7-.6.3z" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 7.5L20 18M8 16.5L20 6" />
    </>
  ),
  theme: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  sw = 1.6,
  className,
  fill = false,
}: {
  name: IconName;
  /** côté du carré, en px */
  size?: number;
  /** épaisseur du tracé */
  sw?: number;
  className?: string;
  /** vrai pour les glyphes pleins (play) */
  fill?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={fill ? undefined : sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
