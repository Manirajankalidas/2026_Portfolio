# Project context: Manirajan portfolio

Personal portfolio of Manirajan ("AI Engineer, Computer Vision | Data Scientist"). Goal: job search
and freelance. Standalone Next.js 16 + React 19 + TypeScript + Tailwind 4 project that exports to
static HTML (`output: "export"`, build output in `./out`). No server, no database. See README.md for
run, edit, push and deploy steps.

This replaces the older, template-grade site in the sibling folder `../2026_Portfolio`. Leave that
folder alone unless asked.

## Design (approved)

- Clean, professional, Apple-inspired: white and `#f5f5f7` sections, near-black text, one blue accent
  (`#0071e3`), system font, very large tight headlines, pill buttons, 24-32 px rounded cards, frosted
  sticky nav, gentle fade-in only (respect `prefers-reduced-motion`). Dark mode follows the system.
- Design canvas (private, owner only): https://claude.ai/artifact/Wy45kRCe1vcuTuPtVjznLx
  Boards: Home, Projects, Expertise, About, Contact, Events, Blog, Home on mobile.
- Nav: Projects, Expertise, Blog, Events, About, Contact (button).
- Home order: Hero, Projects, Areas of expertise, Latest writing, Events, Contact call to action.
- Projects order: Face Recognition Attendance first, Virtual Graffiti second.
- Expertise order: Computer Vision, Data Science, IoT (separate pages, topic cards, "Coming soon" until written).
- Events: teaching and speaking items are highlighted; attended items are lower priority.

## Decisions from the owner

- Title: "AI Engineer, Computer Vision | Data Scientist".
- No education or work-experience pages or sections. No Skills section on Home or About, and no Skills page (removed at the owner's request; data kept in `src/content/skills.ts`).
- Only two projects for now (Face Recognition Attendance System, Virtual Graffiti). More will be added later.
- The page is called "Expertise" everywhere (not "Research"). The owner wants it to show as "Areas of expertise".
- Blog is a hobby of the owner: Markdown files in `content/blog/`.
- No domain yet: launch on the free `*.vercel.app` address.
- Never invent metrics, claims or results. Use bracketed placeholders or omit.

## Where things live

| What | Where |
|---|---|
| Name, email, links, nav, resume link | `src/lib/site.ts` |
| Projects, expertise, events, skills data | `src/content/*.ts` |
| Blog posts | `content/blog/*.md` (front matter: title, date, tag, summary, draft) |
| Blog helpers (server) / client-safe helpers | `src/lib/blog.ts` / `src/lib/post.ts` |
| UI components | `src/components/` (client components must not import `src/lib/blog.ts`, it uses `node:fs`) |
| Event photos | `public/events/*.webp` (made with `npm run images -- <srcDir> <outDir>`) |

## Open items (waiting on the owner)

1. Profile photo: save as `public/profile.jpg` (initials show until then).
2. Resume PDF without the phone number: put in `public/`, then set `resume` in `src/lib/site.ts`.
3. About page (`src/app/about/page.tsx`) now uses the owner's own bio text (10+ plants, 50+ camera streams, mentoring); owner to confirm the final wording.
4. Virtual Graffiti: real description, stack and GitHub link. The demo video is https://youtu.be/B0BO7cWcv7c
   (titled "Virtual Graffiti (Wiimote) - Demo 1"); the owner first called it "Virtual Gravity".
5. GitHub links for both projects (commented out in `src/content/projects.ts`).
6. Web3Forms key for the contact form (`NEXT_PUBLIC_WEB3FORMS_KEY`).
7. Confirm in `src/content/events.ts`: Smart Bharat 2024 labelled "speaking" (was it a talk?); the 2023
   Bangalore workshop labelled "Hands-on IoT workshop" (old data titled it "Deep Learning Workshop").
8. Confirm email, LinkedIn and GitHub URLs in `src/lib/site.ts` (taken from the old site and resume).
9. Facts to confirm if employment ever returns to the site: the old site's dates differed from the resume
   (Quantic: 2024 vs Aug 2023; Mew: to May 2024 vs Aug 2023).

## Still to do

- Look at every page in a browser at 360, 768 and 1280 px and in dark mode (only the build, lint and
  typecheck have been verified so far), and fix layout differences from the canvas.
- Add Open Graph image and favicon.
- Commit, push to GitHub, deploy on Vercel, set `NEXT_PUBLIC_SITE_URL`.

## Known notes

- `npm audit` reports high-severity items that all come from dev tooling (ESLint chain); they do not ship.
- Do not run `npm audit fix --force`: it downgrades `eslint-config-next` and breaks lint.
- Commit only when the owner asks.
