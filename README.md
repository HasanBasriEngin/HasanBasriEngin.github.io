# hasanbasriengin.github.io

Personal profile site for **Hasan Basri Engin** — a short page that introduces
who I am, where I study, what I'm building, and where to find me online.

Live: <https://hasanbasriengin.github.io>

## Stack

- **React 18** + **TypeScript**
- **Vite 5** build
- **Motion** (`motion/react`) for entrance and micro-interactions
- Plain CSS (custom properties, dark theme)
- Deployed by **GitHub Actions** → **GitHub Pages**

## Editing content

Everything shown on the page lives in **`src/data.ts`**:

- `profile` — name, role, university, bio, "open to collaborations" text
- `socials` — GitHub / LinkedIn links
- `projects` — the project cards (first three are the "current work" featured set)
- `skillGroups` — the skills/tools tags

UI strings (section titles, buttons) are in **`src/i18n.ts`**, with `en` and `tr`
variants. The EN/TR toggle is top-right; the choice is stored in `localStorage`.

Profile photo: drop `avatar.jpg` into **`public/`**. Without it the page shows
initials.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the built site locally
npm run gen:qr     # regenerate public/qr.svg (points at the live URL)
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages.

One-time setup in the repo: **Settings → Pages → Build and deployment →
Source: GitHub Actions**.
