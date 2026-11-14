# LOCKD desktop capture refresh

The current gallery uses two genuine 1425×891 desktop captures of the public LOCKD website. Both views were inspected before inclusion.

- Homepage: https://lockd2.vercel.app/ at the top of the page.
- Rental categories: https://lockd2.vercel.app/#categories, reached using the site's Explore link.
- Capture method: an isolated Firecrawl browser session, with no account signed in. The optional-cookie notice was dismissed with Reject, and the public location control was set to Anywhere.
- Images and fonts were loaded before capture. The website's HTML, CSS, photographs and text were not altered.
- The captures are viewport images, not full-page composites. No mobile screenshot is used. The same desktop composition appears at every portfolio viewport and in the fullscreen viewer.

The deployed files use the `20261115` revision in their names so cached earlier screenshots cannot be mistaken for these captures. Earlier unversioned assets remain available for existing links. JPEG encoding and responsive WebP resizing are the only processing applied.

| View       | Current JPEG                                    | Original PNG SHA-256                                               |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| Homepage   | `public/projects/lockd-home-20261115.jpg`       | `1118f1d45f9118f2a10ceb038c47172984ee0627d675782f2f7423589c907843` |
| Categories | `public/projects/lockd-categories-20261115.jpg` | `33774f76fe68bd0775d3e1fbc28564fa8b25123b73b41039d706c1e75d09c8ec` |

`npm run generate:projects` creates 640, 960 and 1425px WebP variants. Dimensions and local references are checked by the existing project tests and export validation.
