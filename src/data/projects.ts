import type { PortfolioProject } from "@/lib/projects";
const responsive = (name: string) =>
  [640, 960, 1425].map((width) => ({
    src: `/projects/${name}-${width}.webp`,
    width,
  }));
export const projects: PortfolioProject[] = [
  {
    id: "lockd",
    slug: "lockd",
    title: "LOCKD",
    category: "Rental Marketplace",
    url: "https://lockd2.vercel.app/",
    caseStudyUrl: "/work/lockd/",
    description:
      "A Kenya-first rental marketplace for stays, vehicles, gaming, gadgets, and experiences.",
    technologies: [
      "JavaScript",
      "Node.js",
      "Python",
      "SQL",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
    ],
    status: "Live project",
    images: [
      {
        id: "home",
        src: "/projects/lockd-home.jpg",
        alt: "The genuine LOCKD homepage, with rental search and category navigation.",
        caption: "Homepage",
        width: 1425,
        height: 891,
        sources: responsive("lockd-home"),
      },
      {
        id: "categories",
        src: "/projects/lockd-categories.jpg",
        alt: "Rental discovery and categories on the actual LOCKD website.",
        caption: "Rental discovery",
        width: 1425,
        height: 891,
        sources: responsive("lockd-categories"),
      },
    ],
    caseStudy: {
      role: "Full-stack developer",
      sections: [
        {
          title: "Project overview",
          body: "LOCKD is a Kenya-first rental marketplace for stays, vehicles, gaming equipment, gadgets, and experiences. The application brings together a web interface, authenticated APIs, SQL-based marketplace logic, and a Python service.",
        },
        {
          title: "Problem addressed",
          body: "People looking for different kinds of rentals need a clear starting point and a way to narrow the search by category and location.",
        },
        {
          title: "Intended users",
          body: "People looking for a stay, a vehicle, or equipment, alongside listers who have something available to rent.",
        },
        {
          title: "Technical architecture",
          body: "The HTML, CSS, and JavaScript front end and Node.js API layer run on Vercel. Supabase provides authentication, PostgreSQL and object storage. A Python/FastAPI service on Render handles authenticated advisory and provider-connection endpoints.",
        },
        {
          title: "Database and booking logic",
          body: "SQL migrations define listings, availability, bookings and booking-event records. Reservation functions calculate quotes and check availability, using transaction locks and customer-scoped idempotency keys to protect writes. Row-level policies and ownership checks restrict access to marketplace data.",
        },
        {
          title: "Location and discovery",
          body: "The application includes MapLibre-based discovery and PostGIS query definitions for geographic filtering. Public location projections are separated from private listing details.",
        },
        {
          title: "Provider connections",
          body: "The Python service includes M-Pesa Daraja and Paystack connection adapters, with server-side authentication, bounded requests and explicit capability settings. The project release notes record verified Daraja sandbox authorization.",
        },
        {
          title: "Python advisory service",
          body: "FastAPI exposes protected risk-assessment and rental-eligibility routes. The service applies versioned rules, validates input, limits request sizes and request rates, and produces sanitized logs. Advisory responses are kept separate from booking authorization.",
        },
        {
          title: "Important interface decisions",
          points: [
            "Separate category starting points for stays, vehicles, and equipment.",
            "Location and search controls before visitors explore rental details.",
            "Listing pages with room for the practical rental information.",
            "Responsive layouts for the same public website on smaller screens.",
          ],
        },
        {
          title: "Implementation details",
          body: "The public pages separate broad rental discovery from category and listing details. This showcase uses genuine desktop captures of those views, kept intact at every screen size.",
        },
        {
          title: "Interface challenges",
          body: "The interface needs to make categories, location, dates, and terms understandable before someone makes a request. Clear navigation and useful listing details support that journey.",
        },
        {
          title: "Lessons from the interface",
          body: "Categories guide the first decision. Location controls and listing details answer the practical questions that follow. Keeping those steps clear is more useful than presenting everything at once.",
        },
      ],
      evidence: [
        {
          label: "Architecture",
          detail:
            "Vercel web and API layers, Supabase PostgreSQL/Auth/Storage, and a Python/FastAPI service on Render.",
        },
        {
          label: "Engineering checks",
          detail:
            "The source review passed 15 read-only marketplace checks and 8 local Python API tests covering authentication, validation, request bounds, rate limits and safe logging.",
        },
        {
          label: "Delivery",
          detail:
            "The public Vercel website and Render service are deployed. Provider rollout is managed through server-side capability settings.",
        },
      ],
    },
  },
];
export const project = projects[0];
