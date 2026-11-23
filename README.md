# Netlink Solutions — site vitrine

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · React Three Fiber

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigne la clé Resend
npm run dev                  # http://localhost:3000
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` puis `npm start` | Production (Vercel, VPS Node, Docker…) |
| `npm run build:static` | Export 100 % statique dans `out/` (sans formulaires serveur) |
| `npm run capture` | Captures d'écran des réalisations pour les couvertures du portfolio |
| `npm run typecheck` / `npm run lint` | Vérifications |

## Organisation

```
src/
├─ app/                     Pages (une par dossier) + API des formulaires
│  ├─ page.tsx              Accueil
│  ├─ expertises/           Index + [slug] (5 pages générées)
│  ├─ realisations/         Index filtrable + [slug] (études de cas)
│  ├─ agence/  contact/  carrieres/  mentions-legales/
│  ├─ api/contact, api/candidature   Envoi d'e-mails via Resend
│  ├─ sitemap.ts  robots.ts  opengraph-image.tsx
│  └─ globals.css           Design tokens + utilitaires (shell, display, label…)
├─ content/                 ✏️ TOUT LE CONTENU ÉDITABLE
│  ├─ site.ts               Coordonnées, navigation, villes
│  ├─ expertises.ts         Les 5 expertises (textes, livrables, technos, objet 3D)
│  ├─ projects.ts           Les réalisations (textes, couleurs de couverture)
│  ├─ covers.json           Captures générées par `npm run capture`
│  └─ careers.ts            Postes ouverts
├─ components/
│  ├─ layout/               Header, Footer, SmoothScroll
│  ├─ ui/                   PageHeader, LineReveal, ArrowLink, NextLink, CursorLabel…
│  ├─ home/                 Manifesto, ExpertiseList
│  ├─ work/                 ProjectCard, ProjectCover, WorkIndex
│  ├─ forms/                ContactForm, CareerForm, champs partagés
│  └─ three/                Objets 3D (une forme par expertise, même matière)
└─ lib/                     SEO (métadonnées, JSON-LD), polices, e-mail, hooks
```

## Modifier le contenu

- **Ajouter une réalisation** : un objet de plus dans `src/content/projects.ts`. La page détail, le sitemap et le filtre se mettent à jour seuls.
- **Captures des sites** : déjà fournies dans `public/work/` (800 px). Pour des versions haute définition : `npm i -D playwright && npx playwright install chromium`, puis `npm run capture` (remplace les captures existantes).
- **Logo** : `src/components/ui/Logo.tsx` (SVG), favicon `src/app/icon.svg`, version PNG transparente dans `public/logo-netlink-solutions.png`.
- **Coordonnées, WhatsApp, LinkedIn, logos clients** : `src/content/site.ts` (logos dans `public/clients/`, en marine monochrome pour un rendu homogène).
- **Boutons** : `src/components/ui/Button.tsx` (variantes `primary`, `secondary`, `light`). Les liens texte restent `ArrowLink`.
- **Mentions légales** : texte générique dans `src/app/mentions-legales/page.tsx`.

## Principes de design (à garder pour rester cohérent)

- Les couleurs du logo : marine `#022152` / `#081a3d` (texte, sections sombres), bleu `#0090f4` (accents, liens), bleu ciel `#08a6fb` (accents sur fond marine), fond clair `#f5f7fa`.
- Une typographie : Schibsted Grotesk pour tout, Instrument Serif *italique* pour un seul mot-accent par titre (`<Accent>`), JetBrains Mono pour les données (heures, domaines, années).
- Boutons en pilule : marine avec pastille bleue pour l'action principale, contour fin pour l'action secondaire. Jamais plus de deux boutons côte à côte.
- Fond doux aux couleurs du logo (`Backdrop`) en haut de l'accueil et de chaque page.
- Pas d'icônes décoratives. Les flèches sont des caractères (→ ↗).
- Chaque page commence par `PageHeader` : même grille, même entrée animée.
- Animations : courbes `--ease-out`, une seule entrée par conteneur, `prefers-reduced-motion` respecté partout. Défilement natif (pas de smooth-scroll JS) et 3D chargée seulement quand elle est visible, pour une navigation légère.
- La 3D partage une seule matière (chrome irisé) et un seul éclairage ; seule la forme change selon l'expertise.

Les skills d'Emil Kowalski (animation et design engineering) sont installés dans `.agents/skills` (Cursor) et `.claude/skills` (Claude Code) : demande par exemple à ton agent `review-animations` après une modification.
