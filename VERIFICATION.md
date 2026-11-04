# Verification

Checked on 5 November 2026 against the production static export.

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

## Limits

These were desktop browser tests at responsive widths, not tests on physical Android or iOS hardware. Reduced-motion CSS and motion checks are implemented and were reviewed in source; OS preference emulation was not available through the browser controls used. No Lighthouse scores or Core Web Vitals measurements are claimed. WhatsApp enquiry destinations were inspected without sending messages. LOCKD screenshots show its real public interface; completed payments, bookings, usage and revenue are not asserted.

Production deployment is verified separately in the delivery message after Vercel completes the build.
