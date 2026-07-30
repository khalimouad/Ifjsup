/**
 * Squelette affiché pendant la navigation, avant que le segment ne soit prêt.
 * Toutes les pages étant prérendues, il n'apparaît qu'en connexion lente ou
 * au tout premier chargement d'une route non préchargée — mais il évite alors
 * l'écran figé entre deux pages.
 */
export default function Loading() {
  return (
    <div className="sk-page" aria-busy="true" aria-live="polite">
      <span className="sr">Chargement…</span>

      <div className="sk-hero">
        <span className="sk sk-kicker" />
        <span className="sk sk-title" />
        <span className="sk sk-title sk-title-short" />
        <span className="sk sk-line" />
        <span className="sk sk-line sk-line-short" />
      </div>

      <div className="sk-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="sk-card" key={i}>
            <span className="sk sk-media" />
            <span className="sk sk-line" />
            <span className="sk sk-line sk-line-short" />
          </div>
        ))}
      </div>
    </div>
  );
}
