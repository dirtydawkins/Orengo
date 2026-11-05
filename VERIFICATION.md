# Verification

## Latest revision: SVG arrows and dropdown motion

Checked on 5 November 2026.

- Audited rendered source for Unicode arrows, emoji variation selectors, HTML entities, escaped arrow characters and CSS-generated arrow content. Replaced decorative external arrows with Lucide `ArrowUpRight` SVGs through `LinkArrow`; navigation, download and gallery arrows use the corresponding Lucide direction. SVGs use `stroke="currentColor"`, `fill="none"`, `aria-hidden="true"` and `focusable="false"`.
- Existing arrow containers and hover translations remain. Former inline-text arrows stay in a single text wrapper where necessary to avoid introducing the parent's flex gap. Icons size with the surrounding type; original layout breakpoints, fonts, colors, portrait and card artwork were not changed.
- Native `details`/`summary` markup is retained. `Disclosure` uses the same 0.7s CSS height transition for opening and closing, reverses from the current height on repeated activation and restores automatic sizing afterward. The user confirmed that closing animated but opening appeared instantly. Closed panels now explicitly start at zero instead of trusting hidden child metrics, and two animation frames separate the starting height from expansion. Reduced motion completes immediately. Animating panels temporarily suppress interaction during closing; final visibility and expanded semantics return to the native element. The mobile menu receives a 0.7s slide on opening.
- Production build and TypeScript passed with Next.js 16.4.5. All 19 existing automated tests passed. Export validation passed for 12 HTML pages, 371 internal references, 206 decorative SVG arrows and 77 native motion disclosures. Export checks reject Unicode/emoji arrow glyphs and CSS-generated arrow glyphs, and validate SVG presentation attributes.
- Browser verification was attempted but did not connect: binding the existing LOCKD tab and opening the live site both timed out and reset the browser kernel. No WebKit installation was available in the current environment. Fresh iPhone Safari/Android layout checks and real opening/closing interaction checks were not performed; the checks above do not claim them.
- The requested fresh LOCKD desktop screenshot refresh remains pending because capture was unavailable. The existing genuine desktop originals and their WebP variants remain in place for both mobile and desktop. No existing image was relabeled as a new capture.

## Project spotlight and complete theme coverage

Checked on 5 November 2026. This section describes the current revision; the later sections retain the checks performed on earlier revisions.

- Automated suite: 19 tests passed. These cover enquiry drafts, the actual project records and asset dimensions, safe URLs, project selection, gallery navigation and swipe thresholds, theme bootstrap preferences, and text/control contrast in both palettes.
- Production build and TypeScript passed with Next.js 16.4.5. Export validation passed for 12 HTML pages and 364 internal references, including all seven service routes, the LOCKD case study, responsive screenshot assets and the actual CV. Portrait and CV hashes still match the supplied originals.
- The dataset contains only LOCKD. Both screenshots are the existing 1425×891 desktop originals. Responsive WebP copies retain the same composition at phone and desktop widths. No mobile-specific capture or invented project is published.
- Source review: the spotlight follows the hero and precedes Services. The gallery uses reserved aspect ratios, `object-fit: contain`, accessible previous/next controls, native fullscreen dialog behavior, keyboard handlers, deliberate touch gestures and a missing-image fallback. Full-resolution viewer images mount on demand.
- Theme review: the paper sections inherit the active palette. Navigation, forms, controls, screenshot viewer, Skills typography, illustrations and both card faces use theme variables. Desktop theme switching is a single button; the mobile menu keeps its optional device preference. Light remains the first-visit default.
- Card review: redundant collection branding and detail indices are absent; useful explanations, technologies and examples remain. Back-face text stays centered, the original click/tap/keyboard flip remains, and carousel controls are available below the desktop spread breakpoint.
- Mobile menu review: one larger sticky Close control remains. Intentional outside taps and Escape dismiss it; no extra close buttons were added.
- LOCKD architecture was checked separately against its original source. Fifteen read-only source checks and eight local Python API tests passed; the live Render health endpoint returned HTTP 200. See `docs/LOCKD_ENGINEERING_REVIEW.md` for the exact scope and provider rollout evidence. This does not establish that every integration is operational.
- **Fresh interactive browser verification was not completed for this revision.** Browser-control calls repeatedly timed out after a runtime reset. The checks above are automated tests, build/export validation and source review; they do not replace new desktop/mobile visual and interaction checks. No fresh Lighthouse, physical-device or reduced-motion emulation results are claimed.

## Earlier production export

- Production build: passed with Next.js 16.4.5; TypeScript passed. Homepage, seven service pages, project notes, metadata image, sitemap and robots generated successfully.
- Export integrity: 12 HTML files and 331 internal file/anchor references passed `scripts/check-export.mjs`.
- Responsive browser checks: 320, 375, 390, 430, 768, 1024 and 1440 CSS pixels. No document overflow; the portrait loaded and all six card backs fit their fixed proportions at each size.
- Portrait and CV: bundled bytes match the supplied originals. A browser click downloaded the actual CV PDF.
- Services: all seven disclosures expanded and each WhatsApp URL contained its correctly encoded, service-specific enquiry message.
- Cards: each of the six cards toggled from front to back and back to front on click. Enter and Space were checked on the automation card. The 3D back face remained readable; carousel controls advanced to the next card. No automatic flips are used.
- Navigation: capsule measured 70px at page top and 60px after compaction. Sustained downward scrolling hid it; upward scrolling revealed it. The active indicator moved to Skills. Mobile dialog opened beneath the capsule, locked page scrolling, focused its close control, and restored focus and `aria-expanded=false` on Escape.
- Theme: light/dark switching and persistence after reload were checked. The portrait has no theme-dependent filter.
- Default theme: exported HTML starts in light mode. The actual head bootstrap was executed against first-visit, saved-light, saved-dark, invalid-storage and unavailable-storage cases; all selected the expected appearance and metadata color.
- Gallery: next/previous state, fullscreen dialog, ArrowRight and Escape were checked.
- Browser logs: no warnings or errors recorded in the isolated QA tab.

## Navigation and typography refinement

- Rebuilt the production export successfully; TypeScript and all 331 internal reference checks passed.
- Checked the sapphire capsule and single hero contact action in light and dark at 390px. The shortcut was absent at the top, appeared when the hero bottom passed 96px, and was removed on returning to the top. A service page retained the shortcut.
- Read the actual computed scroll-linked heading color before and after scrolling: the service phrase changed from `rgb(81, 89, 103)` near entry to sapphire `rgb(36, 89, 199)` in the reading area. About used the appropriate light/dark accent with unchanged text.
- Checked 320, 390, 768 and 1440px layouts for document overflow. No overflow occurred; social links retain 44px touch targets.
- GitHub and LinkedIn destinations, separate-tab behavior and safe link attributes were checked in About and the shared inner-page footer. The existing Contact links use the same shared component.
- Mobile navigation, Escape close, theme switching and keyboard activation of the desktop theme button remained functional. No browser warnings or errors were recorded.

## Master-prompt additions

- Production build and TypeScript: passed. The export check now covers seven timeline stages and the eight/four enquiry choices as well as all seven services, six cards, image assets, the CV and 368 internal references.
- Automated checks: 12 passed. All 32 project-type/stage combinations generate complete drafts. Tests cover optional whitespace, a bounded description, CRLF handling, punctuation/non-ASCII text, URL encoding and invalid choices. Eight head-bootstrap cases cover light-first behavior, explicit light/dark, device preference in both modes, invalid storage and unavailable storage.
- Browser enquiry checks: selected a booking system and an existing website, entered punctuation and line breaks, opened the draft preview, and confirmed the WhatsApp/email drafts matched exactly. Angle-bracket content stayed plain text. Native radio arrow keys changed selection. The mobile Something else/new system combination omitted empty optional details cleanly. No enquiry was sent.
- Responsive checks: 320, 375, 390, 430, 768, 1024 and 1440px in both themes. No document overflow; choice labels fit and touch targets were at least 44px. Existing card backs remained within their frames.
- Timeline: seven connected stages render, including Design. Enter and Space expanded/collapsed a stage; the current marker moved between stages as the reading area changed. Stage descriptions remain visible without expansion and all details use native disclosures.
- Appearance: the optional device selection matched the browser's current dark device preference and persisted after reload. Manual light/dark choices still worked. Light remained the first-visit default even with a dark device preference in the bootstrap checks.
- Mobile menu: opened beneath the capsule, locked background scrolling, displayed device controls, and restored focus, scrolling and `aria-expanded=false` after Escape. The hero still showed one primary WhatsApp action, with its original portrait loaded and no capsule contact duplicate at the top.
- Regression: all six cards flipped and returned with Enter/Space; a card also flipped on click. The genuine project gallery advanced, opened its fullscreen viewer, responded to ArrowRight and closed with Escape. No browser warnings/errors were recorded.
- LOCKD was opened directly in the browser. Its real public navigation, rental categories, linked CSS and JavaScript assets support the limited front-end description. No backend, payment or business-outcome claims were added.
- Before/after: no genuine matched pair exists. The typed comparison component and native range interaction are ready in source, but no comparison is rendered publicly. Browser verification with real comparison assets remains outstanding.

## Limits

These were desktop browser tests at responsive widths, not tests on physical Android or iOS hardware. Reduced-motion CSS and motion checks are implemented and were reviewed in source; OS preference emulation was not available through the browser controls used. No Lighthouse scores or Core Web Vitals measurements are claimed. WhatsApp enquiry destinations were inspected without sending messages. LOCKD screenshots show its real public interface; completed payments, bookings, usage and revenue are not asserted.

Production deployment is verified separately in the delivery message after Vercel completes the build.
