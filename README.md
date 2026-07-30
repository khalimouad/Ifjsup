# Site web IFJ SUP — Institut Supérieur de Journalisme et d'Information

Site institutionnel des deux campus, Casablanca et Marrakech. Bilingue
**français / arabe (RTL)**, **mobile first**, thèmes **sombre et clair**.
La structure des pages vient du concept « IFJ SUP 2027 » (Claude Design) ;
la charte visuelle a ensuite été refaite sur le modèle demandé (voir Charte).

## Stack

- **Next.js 15** (App Router) — toutes les pages sont prérendues en statique
- **CSS natif** — un seul fichier, `src/app/globals.css`, qui porte les jetons
  de la charte. Pas de Tailwind, pas de pré-processeur, aucune dépendance CSS.
- **Typographie** : IBM Plex Sans / Sans Condensed / Mono (FR) + Cairo (AR),
  via `next/font`
- Déployable sur **Vercel** sans configuration

## Charte

Langage visuel éditorial noir / blanc / rouge, dans l'esprit des écoles d'arts
visuels — repris du modèle de référence fourni (esavmarrakech.com) : palette,
échelle typographique et rythme de mise en page. Aucun code, visuel, logo ni
texte de ce site n'a été copié.

| Jeton | Sombre (identité) | Clair (variante) |
| --- | --- | --- |
| `--bg` | `#0A0A0A` | `#FFFFFF` |
| `--surface` | `#1A1A1A` | `#FFFFFF` |
| `--ink` | `#FFFFFF` | `#111111` |
| `--accent` | `#EB2D2E` | `#EB2D2E` |

- **Titres** : IBM Plex Sans Condensed 700, **en capitales**, interlignage 1.02
- **Texte** : IBM Plex Sans 17 px / 1.55
- **Étiquettes** : IBM Plex Mono, préfixées d'un tiret cadratin
- **Rayons** : pilules (`999rem`) pour boutons et puces, 48 px / 24 px / 16 px
- **Arabe** : Cairo remplace les trois familles latines

La police d'affichage du modèle (*Susanna*) est sous licence commerciale : elle
n'est pas utilisée. Les IBM Plex sont sous licence libre (SIL OFL).

Le **sombre porte l'identité** : c'est le défaut pour tout le monde, la variante
claire étant un choix explicite du visiteur (mémorisé). On ne suit donc pas
`prefers-color-scheme`, sinon la majorité des visiteurs verrait la variante.

## Fonctionnalités

- **Thème sombre / clair** : bascule dans l'en-tête, choix mémorisé
  (`localStorage`), sombre par défaut, aucun clignotement au chargement
  (script d'amorçage exécuté avant peinture)
- **Bilingue FR/AR** : routes `/fr/...` et `/ar/...`, bascule conservant la page
  courante, RTL complet (propriétés logiques, dégradés et flèches inversés,
  valeurs numériques isolées en LTR)
- **Filtres de formations** réellement fonctionnels (cycle, durée, niveau
  d'accès) — le concept ne montrait que des cases inertes
- **Galerie par album** : chaque album a sa page, en planche-contact, avec
  numérotation, légende par photo et navigation d'album à album
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
- **10 photographies** des plateaux, régies et studios dans `public/images/`
  (plus sept affiches de filière, non utilisées en galerie — voir plus bas)

## Développement

```bash
npm install
npm run dev    # http://localhost:3000 (redirige vers /fr)
npm run build  # build de production, 56 pages prérendues
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
│       ├── galerie/           # index + galerie/[slug] (planche-contact)
│       ├── admission/         # 4 étapes, documents, niveaux, FAQ, formulaire
│       ├── contact/           # les deux campus + formulaire
│       └── mentions-legales/, confidentialite/
├── components/                # Header, Footer, Cards, Strips, Icon, Photo…
└── lib/                       # i18n.ts, ui.ts (libellés FR/AR), content.ts
```

## Écarts assumés

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
- **Trois albums de galerie**, pas six : seules dix photographies réelles sont
  disponibles (voir « Reste à faire »). Mieux vaut trois albums pleins que six
  albums annonçant des photos qui n'existent pas.

## Reste à faire

1. **Formulaires** : l'envoi passe aujourd'hui par `mailto:` vers l'adresse du
   campus choisi. À remplacer par une API avec routage serveur.
2. **Back-office** : brancher un CMS headless (Supabase/Sanity) pour les
   actualités, la galerie et les contenus de pages.
3. **Photothèque** : le fonds ne contient que **10 vraies photographies**. Les
   sept fichiers `filiere-*.webp` sont des affiches de filière (texte et
   maquette), pas des photos — ils ne sont donc pas utilisés dans la galerie.
   Une séance photo professionnelle des plateaux, régies et studios reste la
   priorité : elle permettra d'étoffer les trois albums et d'en rouvrir
   d'autres (studios son, salles de montage, projets étudiants).
4. **Brochures PDF** par filière (le bouton pointe vers le contact).
5. **Visite 360°** annoncée par le concept : à produire, la carte renvoie
   aujourd'hui vers la galerie.
6. Fiches Google Business Profile, Search Console, redirections 301.
