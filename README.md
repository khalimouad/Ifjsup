# Site web IFJ — Institut Supérieur de Journalisme et d'Information

Refonte complète du site institutionnel (Casablanca & Marrakech), conforme au
cahier des charges v1.0 (juillet 2026) : design « média corporate » premium,
**mobile first**, bilingue **français / arabe (RTL)**.

## Stack

- **Next.js 15** (App Router, pages 100 % statiques — Core Web Vitals au vert)
- **Tailwind CSS 4** — charte : bleu profond `#1B3A6B`, orange `#E8720C`, or `#F2B705`
- **Typographie** : Archivo (titres) + Inter (texte) pour le FR, Cairo pour l'AR
- Déployable sur **Vercel** (option A du CDC) sans configuration

## Fonctionnalités clés

- **Mobile first** : barre d'actions fixe (Appeler / WhatsApp / Candidater),
  zones tactiles ≥ 44 px, menu plein écran au pouce
- **Bilingue FR/AR** : routes `/fr/...` et `/ar/...`, bascule de langue
  conservant la page courante, RTL complet
- **SEO local double** : pages campus dédiées (`/campus/casablanca`,
  `/campus/marrakech`), JSON-LD `EducationalOrganization` à deux entités,
  sitemap + robots
- **Contenus repris d'ifjsup.ma** : 6 filières (fiches complètes), chiffres
  clés actualisés, FAQ, coordonnées des deux campus, articles d'archives,
  partenaires
- **Accessibilité WCAG AA** : contrastes, skip-link, navigation clavier,
  `prefers-reduced-motion` respecté

## Développement

```bash
npm install
npm run dev    # http://localhost:3000 (redirige vers /fr)
npm run build  # build de production, tout est prérendu
```

## Structure

```
src/
├── app/[locale]/         # Pages FR + AR (layout racine par langue)
│   ├── page.tsx          # Accueil
│   ├── institut/         # Présentation, histoire, équipe
│   ├── formations/       # Index + fiche par filière
│   ├── campus/[slug]/    # Casablanca & Marrakech (SEO local)
│   ├── actualites/       # Style magazine + archives ifjsup.ma
│   ├── galerie/          # Albums par thème et campus
│   ├── admission/        # Processus 4 étapes + FAQ + formulaire
│   └── contact/          # Sélecteur de campus, cartes, 1-clic
├── components/           # Header, Footer, cartes, formulaires…
└── lib/                  # i18n, contenus éditoriaux FR/AR
```

## Prochaines étapes (phases CDC)

1. **Photos réelles** : remplacer les visuels vectoriels (`EditorialVisual`)
   par la séance photo professionnelle des plateaux et studios
2. **Back-office 3 fonctions** : brancher un CMS headless (Supabase/Sanity)
   pour actualités, photos et contenus de pages
3. **Formulaires** : remplacer l'envoi `mailto:` par une API + routage
   par campus (casablanca@ / marrakech@)
4. Fiches Google Business Profile, Search Console, redirections 301
