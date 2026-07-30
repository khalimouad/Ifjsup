# Site web IFJ SUP — Institut Supérieur de Journalisme et d'Information

Implémentation du concept **« IFJ SUP 2027 »** (Claude Design) pour le site
institutionnel des deux campus, Casablanca et Marrakech. Bilingue
**français / arabe (RTL)**, **mobile first**, thèmes **clair et sombre**.

## Stack

- **Next.js 15** (App Router) — toutes les pages sont prérendues en statique
- **CSS natif** — un seul fichier, `src/app/globals.css`, qui porte les jetons
  du concept. Pas de Tailwind, pas de pré-processeur, aucune dépendance CSS.
- **Typographie** : Manrope (FR) + Cairo (AR), via `next/font`
- Déployable sur **Vercel** sans configuration

## Charte (transcrite du concept)

| Jeton | Clair | Sombre |
| --- | --- | --- |
| `--bg` | `#FFFFFF` | `#080E1B` |
| `--ink` | `#0E1729` | `#F2F5FB` |
| `--accent` | `#1B5FE3` (bleu) | `#E3B45C` (or) |
| `--gold` | `#F0801A` (orange) | `#E3B45C` |
| `--surface` | `#FFFFFF` | `#111A2C` |

En thème sombre, l'accent et l'or fusionnent en un seul or — c'est le
comportement du concept, pas un raccourci. Les points de rupture reprennent
ceux du concept : **1400 / 1080 / 900 / 620 px**.

## Fonctionnalités

- **Thème clair / sombre** : bascule dans l'en-tête, choix mémorisé
  (`localStorage`), préférence système par défaut, aucun clignotement au
  chargement (script d'amorçage exécuté avant peinture)
- **Bilingue FR/AR** : routes `/fr/...` et `/ar/...`, bascule conservant la page
  courante, RTL complet (propriétés logiques, dégradés et flèches inversés,
  valeurs numériques isolées en LTR)
- **Filtres de formations** réellement fonctionnels (cycle, durée, niveau
  d'accès) — le concept ne montrait que des cases inertes
- **SEO local double** : pages campus dédiées, JSON-LD
  `EducationalOrganization` à deux entités, sitemap + robots
- **Accessibilité** : skip-link, `aria-current` sur la navigation, focus
  visible, zones tactiles ≥ 44 px, `prefers-reduced-motion` respecté
- **Apparition au défilement** avec filet de sécurité : si l'observateur ne se
  déclenche pas, tout redevient visible au bout de 2,6 s

## Contenus

Les textes et les photos sont ceux de l'institut, repris de l'ancien site
`ifjsup.ma` — et non les libellés de démonstration du concept :

- **6 filières réelles** (Journalisme, Ingénierie A.V., Médias Numériques,
  Diplomatie Sportive, Technicien en Journalisme, Technicien en Audiovisuel)
  avec diplômes et accréditations exacts
- **Chiffres réels** : 1994, 3 250+ lauréats, 132 unités, 33 formateurs.
  Les « 5000+ diplômés / 95 % d'insertion / 40+ partenaires » du concept
  étaient des valeurs de remplissage et n'ont pas été reprises.
- **Coordonnées réelles** des deux campus (adresses, téléphones, emails)
- **19 photos** des plateaux, régies et studios dans `public/images/`

## Développement

```bash
npm install
npm run dev    # http://localhost:3000 (redirige vers /fr)
npm run build  # build de production, 50 pages prérendues
```

## Structure

```
src/
├── app/
│   ├── globals.css            # jetons + composants, tout le style du site
│   └── [locale]/              # pages FR + AR
│       ├── page.tsx           # accueil
│       ├── institut/          # présentation, histoire, équipe, partenaires
│       ├── formations/        # liste filtrable + fiche par filière
│       ├── campus/[slug]/     # Casablanca & Marrakech (SEO local)
│       ├── actualites/        # index + article
│       ├── galerie/           # albums par thème et campus
│       ├── admission/         # 4 étapes, documents, niveaux, FAQ, formulaire
│       ├── contact/           # les deux campus + formulaire
│       └── mentions-legales/, confidentialite/
├── components/                # Header, Footer, Cards, Strips, Icon, Photo…
└── lib/                       # i18n.ts, ui.ts (libellés FR/AR), content.ts
```

## Écarts assumés par rapport au concept

- **Admission en 4 étapes**, pas 3 : le processus réel de l'institut compte
  quatre étapes. Le traitement visuel des cartes est celui du concept.
- **Onglets de fiche filière** réduits à trois (Aperçu, Débouchés, Admission) :
  ce sont les sections pour lesquelles il existe du contenu réel. Ils pointent
  vers les ancres de la page au lieu d'être décoratifs.
- **Barre d'actions mobile supprimée** (Appeler / WhatsApp de l'ancien site) :
  le concept garde « Candidater » visible dans l'en-tête à toutes les largeurs.
  Téléphone et WhatsApp restent au pied de page et sur les pages campus.
- **Pas de crédits photo Unsplash** : les visuels du concept étaient des
  photos de banque, remplacées ici par les photos de l'institut.

## Reste à faire

1. **Formulaires** : l'envoi passe aujourd'hui par `mailto:` vers l'adresse du
   campus choisi. À remplacer par une API avec routage serveur.
2. **Back-office** : brancher un CMS headless (Supabase/Sanity) pour les
   actualités, la galerie et les contenus de pages.
3. **Galerie** : les albums affichent une photo de couverture et un compteur ;
   la visionneuse par album reste à faire.
4. **Brochures PDF** par filière (le bouton pointe vers le contact).
5. **Visite 360°** annoncée par le concept : à produire, la carte renvoie
   aujourd'hui vers la galerie.
6. Fiches Google Business Profile, Search Console, redirections 301.
