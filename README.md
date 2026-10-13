# Manirajan: Portfolio

Personal portfolio: Next.js 16, React 19, TypeScript, Tailwind CSS 4. It builds to a static
site (no server, no database), so it deploys anywhere.

**Pages:** Home · Projects (+ detail pages) · Areas of expertise (Computer Vision, Data Science, IoT) · Blog · Events · About · Contact

## Run it locally

Requires Node 20 or newer (`nvm use` reads `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build -> ./out (plain HTML)
npm run preview    # serve ./out locally
npm run lint
npm run typecheck
```

## Edit your content

| What | Where |
|---|---|
| Name, email, LinkedIn/GitHub, nav, resume link | `src/lib/site.ts` |
| Projects (add an entry, a page is created) | `src/content/projects.ts` |
| Expertise topics (set `href` when you write about one) | `src/content/expertise.ts` |
| Events | `src/content/events.ts` (photos in `public/events/`) |
| Skills | `src/content/skills.ts` |
| About text | `src/app/about/page.tsx` |
| Blog posts | `content/blog/*.md`, see "Add a blog post" below |
| Profile photo | save as `public/profile.jpg` (initials show until you do) |
| Resume | put the PDF in `public/`, then set `resume` in `src/lib/site.ts` |

Optimise new photos before adding them: `npm run images -- <folder-with-originals> public/events`.

### Add a blog post

Create a file in `content/blog/`, for example `yolo-basics.md`. The file name becomes the address
(`/blog/yolo-basics/`). Start it with these lines between `---` markers:

- `title`: the post title
- `date`: `YYYY-MM-DD`
- `tag`: `Computer Vision`, `Data Science`, `IoT`, `Events and life` (or your own)
- `summary`: one or two sentences shown on the card
- `image`: optional. A 16:9 picture in `public/blog/`, for example `/blog/yolo-basics.webp`. It shows on the card and the post page.
- `link`: optional. A LinkedIn (or other) article URL. The post page then shows a "Read on LinkedIn" button; write a short preview in the body.
- `draft`: `true` hides the post on the live site (it still shows in `npm run dev`)

Then write the post in Markdown below the second `---`.

## Contact form

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY` (free key from
https://web3forms.com, which emails you the messages). Without a key, the form opens the visitor's
email app instead. On your host, add the same variable in its environment settings.

## Push to GitHub

```bash
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Deploy

**Vercel (recommended, free):**
1. Go to https://vercel.com/new and import the GitHub repo.
2. Framework preset: Next.js (detected). No build settings needed.
3. Add environment variables: `NEXT_PUBLIC_SITE_URL` (your site address) and `NEXT_PUBLIC_WEB3FORMS_KEY`.
4. Deploy. Every push to `main` redeploys; pull requests get preview links.

**Netlify / Cloudflare Pages / GitHub Pages / any server:** build command `npm run build`, publish
directory `out`. For GitHub Pages under a sub-path, add `basePath` in `next.config.ts`.

**Custom domain:** buy one anywhere, then add it in your host's Domains settings and follow the DNS
instructions it shows. Set `NEXT_PUBLIC_SITE_URL` to the new address afterwards.

## Project layout

```
content/blog/        Markdown posts
public/              Images and static files
scripts/             Image optimiser
src/app/             Pages (App Router)
src/components/      UI components
src/content/         Projects, expertise, events, skills data
src/lib/             Site config and blog helpers
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck and build on every push and pull request.
