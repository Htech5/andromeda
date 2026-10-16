# Andromeda

Single-page website for the Andromeda KRSRI robotics team. Built with Next.js (App Router) and TypeScript, deployed on Vercel.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
src/
  app/        layout, page, global + component CSS, icon, robots, sitemap, OG image
  components/ Navbar, Hero, AsciiRobot, MissionProfile, RobotArchitecture,
              Achievements, TeamDevelopment, PartnerWall, Footer, Reveal, SectionHead
  data/       site, achievements, team, partners, robot  (static content lives here)
```

All copy and content live in `src/data/*.ts`. Edit those files to update the site; no CMS, database, or backend is involved.

## Content placeholders

Entries marked `PLACEHOLDER` must be replaced with confirmed team data before publishing:

- `src/data/site.ts` — contact email, affiliation, social links
- `src/data/achievements.ts` — competitions, years, results
- `src/data/team.ts` — member names and roles
- `src/data/partners.ts` — sponsors and media partners (empty arrays render a contact message instead of fake logos)

Do not invent awards, members, or partnerships.

## Design constraints

- Colors: `#FF0303`, `#080808`, `#FFFFFF` only. No gradients, glow, or glassmorphism.
- Editorial layout driven by rules, section numbers, and whitespace — not cards.
- The hero robot is real text inside `<pre>`, not an image.
- Animation is CSS transitions plus one `IntersectionObserver` wrapper (`Reveal`), and respects `prefers-reduced-motion`. Without JavaScript, all content renders visible.

## Deploy

Push to GitHub and import the repository in Vercel. No environment variables are required. Update `site.url` in `src/data/site.ts` to the production domain so metadata, sitemap, and `robots.txt` point at the right host.
