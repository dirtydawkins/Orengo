# Lameck Orengo portfolio

A customer-focused portfolio for https://lamecorengo.vercel.app. Built with Next.js, React, TypeScript, Tailwind CSS and custom CSS. It exports static HTML, so no database, authentication, API keys or contact-form service is required.

## Run and build

Use Node.js 22.22 or newer.

1. `npm ci`
2. `npm run dev` and open http://127.0.0.1:3000.
3. `npm run typecheck` checks TypeScript.
4. `npm test` checks enquiry generation, URL encoding and the early theme bootstrap.
5. `npm run build` generates the static site in `out/`.

After building, `npm run check` verifies exported routes, internal file and anchor references, the six cards, genuine image assets and the PDF download. See `VERIFICATION.md` for the checks performed during this build and their limits.

To preview the production export locally, run `npm start` after building. The included static server serves `out/` at http://127.0.0.1:3000.

## Deploy to Vercel

Import `dirtydawkins/Orengo`, select the Next.js preset, and name the project `lamecorengo`. Use the repository root and the normal `npm run build` command. Vercel handles the static export. The intended production address is https://lamecorengo.vercel.app. Pushes to the production branch trigger deployments once the Git integration is connected.

## Update content and assets

- Services, contact information, WhatsApp messages, technical notes and project gallery entries: `src/data/portfolio.ts`.
- Homepage content: `src/app/page.tsx`.
- Portrait: `public/images/lameck-orengo.jpg`. Keep the original natural colors; update dimensions if the source changes.
- CV: `public/assets/Lameck_Orengo_CV_updated.pdf`.
- Real project screenshots: `public/projects/`. The current gallery contains captures of the live LOCKD website. Do not replace these with invented mockups.
- Social preview: `src/app/opengraph-image.png`. Its original typography artwork is defined in `scripts/generate-social.mjs`; run `npm run generate:social` after editing that source, then build.
- Design tokens, spacing and responsive rules: `src/app/globals.css`.
- Timeline, enquiry builder and optional comparison styles: `src/app/interactions.css`.
- Enquiry choices and draft composition: `src/lib/enquiry.ts`. The builder holds selections and optional text in component memory only. It generates WhatsApp and mailto links without a backend, tracking or draft storage.
- Seven timeline stages: `processStages` in `src/data/portfolio.ts`.
- Service pages use `src/app/services/[slug]/page.tsx`; add a data entry to generate another page.
- The reusable case study component is `src/components/CaseStudy.tsx`. Project notes distinguish the deployed public interface from unverified business outcomes.

## Theme and interactions

Theme initialization runs in the document head. Light mode is the first-visit default, including when storage is unavailable. An explicit saved choice in `localStorage['lameck-theme']` takes precedence on later visits. Appearance controls offer Light, Dark and an optional device setting. The device option follows changes to `prefers-color-scheme` only after the visitor chooses it. The early bootstrap resolves that saved choice before paint and updates browser theme metadata. The portrait has no color filters. Both themes share the layout and use separate readable neutral and accent colors.

Services, process steps, experience and the dedicated Skills & Technologies index use native disclosures. Six illustrated engineering cards have original SVG artwork, ivory fronts, dark explanatory backs, and a 640ms CSS 3D flip. Each card flips on click, tap, Enter or Space. Desktop uses a subtly overlapping spread; mobile uses native horizontal scrolling, scroll snapping and previous/next controls. Reduced motion shows the selected face instantly.

The fixed LO navigation capsule uses a solid sapphire-navy finish in both themes. It compacts after 120px of scrolling, hides after sustained downward travel beyond 650px and returns on upward travel. It remains visible while focused or when reduced motion is requested. Its contact shortcut appears after the homepage hero leaves the reading area, keeping the hero's WhatsApp action as the sole prominent contact button on arrival. Inner pages retain the shortcut. IntersectionObserver drives the moving active indicator. The mobile panel includes all destinations and appearance controls, traps focus through a native dialog, supports Escape, and restores scrolling and focus when closed. The screenshot viewer supports previous/next controls, arrow keys, Escape and touch navigation in the inline gallery.

Selected heading phrases shift from slate to sapphire with CSS scroll timelines as they enter the reading area. Their content, size and position stay fixed. Browsers without scroll-timeline support and visitors requesting reduced motion receive static accent colors. GitHub and LinkedIn profiles are available in About, Contact and the shared footer on every page.

Contact uses WhatsApp, email and phone directly. Service messages are encoded with `encodeURIComponent`. WhatsApp and social links open a separate tab. No customer data is collected by this site.

The project enquiry builder provides eight project types, four starting stages, optional details, a draft preview, and matching WhatsApp/email drafts. It opens a draft; it does not send a message or quote a price. The seven-stage engineering timeline uses native disclosures and IntersectionObserver for reading emphasis. Its content is readable without scroll animations. The existing single-project LOCKD showcase, screenshot viewer, six card flips and direct contact actions remain available.

## Before-and-after evidence

`src/components/BeforeAfter.tsx` contains the optional native range comparison, with mouse, touch and keyboard controls. `src/data/comparisons.ts` is deliberately empty, so no comparison section is published. Before adding an entry, supply two genuine screenshots of the same interface at identical pixel dimensions, describe their provenance in `evidence`, and review the pair before setting `verified: true`. The homepage renders only those reviewed entries. Do not use the two existing LOCKD screenshots as a before/after pair: they show different views.

The optional slider has not been browser-tested with a genuine pair because none was supplied. The public layout is complete without it. Backend architecture, completed transactions, client outcomes and planned LOCKD features are not inferred from its public screenshots.

## Sources

Professional content is based on the supplied updated CV. The actual supplied portrait and PDF are bundled. Local Manrope and DM Mono fonts include their license files in `public/fonts/`. No invented clients, testimonials, performance figures or extra projects are included.
