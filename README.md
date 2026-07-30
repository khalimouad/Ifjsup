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

Langage visuel éditorial sombre, dans l'esprit des écoles d'arts visuels —
structure et rythme repris du modèle de référence fourni (esavmarrakech.com) :
héros pleine page, menu plein écran, titres condensés en capitales, angles très
arrondis. Aucun code, visuel, logo ni texte de ce site n'a été copié. Les
couleurs restent celles de l'IFJ : **orange porteur, bleu en accent**.

| Jeton | Sombre (identité) | Clair (variante) |
| --- | --- | --- |
| `--bg` | `#0A0A0A` | `#FFFFFF` |
| `--surface` | `#1A1A1A` | `#FFFFFF` |
| `--ink` | `#FFFFFF` | `#111111` |
| `--accent` (orange) | `#F0801A` | `#B85400` |
| `--accent-2` (bleu) | `#1B5FE3` | `#1B5FE3` |

- **Titres** : IBM Plex Sans Condensed 700, **en capitales**, interlignage 0.94
  à 1.02 ; le héros monte à `clamp(44px, 7.4vw, 108px)`
- **Texte** : IBM Plex Sans 17 px / 1.55
- **Étiquettes** : IBM Plex Mono, préfixées d'un tiret cadratin
- **Rayons** : pilules (`999rem`) pour boutons et puces, 48 px / 24 px / 16 px
- **Arabe** : Cairo remplace les trois familles latines

**Contrastes vérifiés** (l'accent porte des étiquettes et des liens de 12 px,
qui relèvent donc du seuil AA « texte normal », 4,5:1) :

| Paire | Ratio | |
| --- | --- | --- |
| `#F0801A` sur `#0A0A0A` (sombre) | 7,36:1 | AA |
| `#0A0A0A` sur `#F0801A` (bandeau) | 7,36:1 | AA |
| `#B85400` sur blanc (clair) | 4,88:1 | AA |
| `#1B5FE3` sur `#0A0A0A` | 3,58:1 | AA grands caractères — réservé aux chiffres 44 px et aux icônes |

L'orange du thème sombre ne descend pas tel quel en thème clair : `#F0801A` sur
blanc ne donne que 2,69:1.

La police d'affichage du modèle (*Susanna*) est sous licence commerciale : elle
n'est pas utilisée. Les IBM Plex sont sous licence libre (SIL OFL).

Le **sombre porte l'identité** : c'est le défaut pour tout le monde, la variante
claire étant un choix explicite du visiteur (mémorisé). On ne suit donc pas
`prefers-color-scheme`, sinon la majorité des visiteurs verrait la variante.

## Héros et navigation

- **Héros pleine page** : la photo couvre tout l'écran (`92vh`), l'en-tête
  transparent la survole et s'opacifie au défilement, le contenu est calé en
  bas à gauche. Deux halos flous — orange et bleu — flottent en arrière-plan.
- **Bandeau d'annonce défilant** au-dessus de l'en-tête (piste dupliquée,
  translation de -50 % : boucle sans saut ; pause au survol).
- **Menu plein écran** ouvrable à toutes les largeurs, comme le modèle :
  entrées en très grandes capitales qui montent en cascade, campus, langue,
  réseaux et appel à candidature.
- **Barre de rubriques** visible à partir de 1200 px, en complément du menu :
  le parti « menu seul » du modèle rendait les rubriques invisibles d'un coup
  d'œil sur grand écran, ce qui pénalise un site d'école où l'on vient d'abord
  parcourir les formations.

## Mouvement

Tout est en CSS ou en `IntersectionObserver` — aucune bibliothèque d'animation.

| Effet | Où |
| --- | --- |
| Lignes du titre qui montent derrière un masque | héros |
| Entrée en cascade du reste du héros | héros |
| Zoom lent de la photo, puis parallaxe au défilement | héros |
| Halos orange et bleu en dérive | héros |
| Compteurs qui s'incrémentent à l'apparition | chiffres clés |
| Cascade des cartes à l'entrée à l'écran | `[data-stagger]` |
| Bandes défilantes | annonce, partenaires |
| Zoom des vignettes, soulignement des liens, flèches | cartes et boutons |
| Inclinaison vers le curseur, lueur d'accent qui le suit | cartes (pointeur fin) |
| Balayage d'accent sur la photo, filet qui se déploie, flèche qui pivote | cartes de contenu |
| Barre de progression de lecture | haut de page |
| Aperçu flou, lueur de chargement puis fondu montant | toutes les photos |
| Squelette scintillant pendant la navigation | `loading.tsx` |

`prefers-reduced-motion: reduce` coupe l'ensemble : animations désactivées,
compteurs figés sur leur valeur finale, barre de progression masquée,
inclinaison et lueurs neutralisées. L'inclinaison ne s'active de toute façon
que sur pointeur fin (`hover: hover and pointer: fine`) — jamais au tactile.
Vérifié en test, survol compris : aucun élément ne reste invisible ni décalé.

## Chargement des images

Les photos ne surgissent pas : elles se construisent.

1. Un **aperçu flou de 12 px** encodé en base64 tient la place dès le HTML
   (`placeholder="blur"` de `next/image`, données dans `src/lib/blur.ts`).
2. Une **lueur d'accent balaie le cadre** tant que rien n'est arrivé.
3. La photo **monte en fondu** depuis une légère surdimension.

Les dix-huit aperçus pèsent **2,9 Kio au total** et sont versionnés ; ils se
régénèrent avec `node scripts/gen-blur.mjs` après tout ajout de photo.

**Chargement différé** — vérifié sur le HTML servi, pas supposé : sur l'accueil,
9 des 10 images portent `loading="lazy"`. La dixième est la photo du héros, qui
reçoit un `<link rel="preload" as="image">` : c'est le seul visuel du premier
écran, il ne doit pas attendre. Même règle sur les autres pages — une seule
image prioritaire, tout le reste différé.

Le squelette de `loading.tsx` reprend la même lueur : un seul vocabulaire
visuel pour tout ce qui n'est pas encore là.

### Sans JavaScript

Le fondu des photos repose sur `onLoad`, et l'apparition au défilement sur un
`IntersectionObserver` : ni l'un ni l'autre ne se déclenche sans JavaScript. La
classe `no-js`, posée sur `<html>` puis retirée par le script d'amorçage,
rétablit dans ce cas l'opacité pleine des photos **et des blocs animés** — sans
quoi une partie de la page resterait invisible. Les quatre combinaisons
(JavaScript actif ou non × mouvement normal ou réduit) sont vérifiées en test.

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
- **6 affiches de filière** (`filiere-*.webp`) : ce sont des documents, pas des
  photos. Elles sont affichées comme telles sur chaque fiche filière, en entier
  (`object-fit: contain`) et légendées « Affiche de la filière » — une par
  filière, la correspondance est exacte.

### Emploi des images

Deux fichiers ne sont plus employés comme photographies :

- `background.webp` est un bandeau-collage : il servait de visuel à la filière
  Diplomatie Sportive et à l'article de une.
- `presentation.webp` est un portrait personnel : il servait de héros aux pages
  Institut **et** Admission.

Ces deux pages passent au **héros typographique** — sans photo, sur aplat et
halos. Avec dix photographies pour douze pages, un héros assumé sans image vaut
mieux qu'une photo qui ne parle pas du sujet. Les pages Formations, Galerie,
Actualités, Contact et Campus gardent une vraie photo, chacune distincte.

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
- **Navigation à deux niveaux**, là où le modèle n'a que le menu plein écran :
  une barre de rubriques apparaît à partir de 1200 px. Écart assumé — la
  découvrabilité des formations prime ici sur la pureté du parti pris.
- **Sous 900 px**, l'en-tête ne garde que le logo, le thème et le menu :
  « Candidater » et le sélecteur de langue passaient le bouton de menu hors
  écran. Les deux sont dans le menu plein écran.
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
