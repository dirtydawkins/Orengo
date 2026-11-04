# Lameck Orengo portfolio

A customer-focused portfolio for https://lamecorengo.vercel.app. Built with Next.js, React, TypeScript, Tailwind CSS and custom CSS. It exports static HTML, so no database, authentication, API keys or contact-form service is required.

## Run and build

Use Node.js 22 or newer.

1. `npm ci`
2. `npm run dev` and open http://127.0.0.1:3000.
3. `npm run typecheck` checks TypeScript.
4. `npm run build` generates the static site in `out/`.

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
- Design tokens, spacing and responsive rules: `src/app/globals.css`.
- Service pages use `src/app/services/[slug]/page.tsx`; add a data entry to generate another page.
- The reusable case study component is `src/components/CaseStudy.tsx`. Project notes distinguish the deployed public interface from unverified business outcomes.

## Theme and interactions

Theme initialization runs in the document head, follows the system preference on first visit and then respects `localStorage['lameck-theme']`. The header control updates the selection and theme metadata. The portrait has no color filters. Both themes share the layout and use separate readable neutral and accent colors.

Services, process steps, experience and the dedicated Skills & Technologies index use native disclosures. Six illustrated engineering cards have original SVG artwork, ivory fronts, dark explanatory backs, and a 640ms CSS 3D flip. Each card flips on click, tap, Enter or Space. Desktop uses a subtly overlapping spread; mobile uses native horizontal scrolling, scroll snapping and previous/next controls. Reduced motion shows the selected face instantly.

The fixed LO navigation capsule compacts after 120px of scrolling, hides after sustained downward travel beyond 650px and returns on upward travel. It remains visible while focused or when reduced motion is requested. IntersectionObserver drives a neutral moving active indicator. The mobile panel includes all destinations and appearance controls, traps focus through a native dialog, supports Escape, and restores scrolling and focus when closed. The screenshot viewer supports previous/next controls, arrow keys, Escape and touch navigation in the inline gallery.

Contact uses WhatsApp, email and phone directly. Service messages are encoded with `encodeURIComponent`. WhatsApp and social links open a separate tab. No customer data is collected by this site.

## Sources

Professional content is based on the supplied updated CV. The actual supplied portrait and PDF are bundled. Local Manrope and DM Mono fonts include their license files in `public/fonts/`. No invented clients, testimonials, performance figures or extra projects are included.
