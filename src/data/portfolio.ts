export const site = {
  name: "Lameck Orengo",
  url: "https://lamecorengo.vercel.app",
  email: "elorengo26@gmail.com",
  phone: "+254 705 370 435",
  whatsapp: "https://wa.me/254705370435",
  github: "https://github.com/dirtydawkins",
  linkedin: "https://linkedin.com/in/lamecorengo",
  cv: "/assets/Lameck_Orengo_CV_updated.pdf",
};
export const whatsapp = (message: string) =>
  `${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const services = [
  {
    slug: "business-websites",
    title: "Business websites",
    description:
      "Clear, responsive websites that help customers understand your business and get in touch.",
    examples: [
      "Company and service websites",
      "Landing pages and portfolios",
      "Contact and enquiry pages",
      "Responsive layouts and clear calls to action",
    ],
    problem:
      "Customers need to understand what you offer and find an easy way to reach you.",
    message: "Hi Lameck, I'm interested in having a business website built.",
  },
  {
    slug: "booking-systems",
    title: "Booking & reservations",
    description:
      "Booking systems that help you manage appointments, availability, and customer reservations.",
    examples: [
      "Appointment and availability calendars",
      "Reservation management",
      "Customer notifications",
      "Booking conflict prevention",
    ],
    problem:
      "Manual calendars make it easy to miss appointments or reserve the same slot twice.",
    message: "Hi Lameck, I'd like to discuss building a booking system.",
  },
  {
    slug: "payment-integrations",
    title: "Payment integrations",
    description:
      "M-Pesa and Stripe integrations with clear payment status and confirmation flows.",
    examples: [
      "M-Pesa Daraja and STK Push",
      "Stripe integrations",
      "Idempotent webhook handling",
      "Transaction records and payment status",
    ],
    problem:
      "Payment status should be clear to customers and traceable within your application.",
    message: "Hi Lameck, I need help integrating payments into my website.",
  },
  {
    slug: "web-applications",
    title: "Custom web applications",
    description:
      "Web applications built around how your business actually operates.",
    examples: [
      "Customer portals and administrative dashboards",
      "Database-backed business systems",
      "Multi-tenant applications",
      "Role-based access and API integrations",
    ],
    problem:
      "When disconnected tools no longer fit, a focused application can bring the workflow together.",
    message: "Hi Lameck, I'd like to discuss a custom web application.",
  },
  {
    slug: "automation",
    title: "Automation & notifications",
    description:
      "Automations that reduce repetitive tasks and help you keep track of important work.",
    examples: [
      "SMS and WhatsApp reminders",
      "Background jobs and scheduled tasks",
      "Follow-up notifications",
      "Workflow integrations",
    ],
    problem:
      "Important follow-ups and recurring tasks can slip through a manual process.",
    message:
      "Hi Lameck, I'm interested in automating part of my business workflow.",
  },
  {
    slug: "ai-integrations",
    title: "Practical AI features",
    description:
      "AI features added to websites and applications where they solve a real problem.",
    examples: [
      "LLM-powered chat interfaces",
      "Website enquiry assistants",
      "Chatbots connected to application data",
      "Structured information retrieval and model APIs",
    ],
    problem:
      "Customers often need a quick answer grounded in the information your application already holds.",
    message:
      "Hi Lameck, I'd like to discuss adding an AI-powered feature to my application.",
  },
  {
    slug: "maintenance",
    title: "Maintenance & improvements",
    description:
      "Fixes and practical improvements for existing websites and applications.",
    examples: [
      "Bug fixes and responsive design repairs",
      "Database and query optimization",
      "API and deployment troubleshooting",
      "Performance improvements and monitoring",
    ],
    problem:
      "An existing application sometimes needs careful repair rather than a complete rebuild.",
    message:
      "Hi Lameck, I'd like help improving an existing website or application.",
  },
] as const;
export const engineering = [
  {
    title: "Avoiding double-bookings",
    label: "Database integrity",
    body: "PostgreSQL transactions and exclusion constraints help prevent overlapping reservations.",
    note: "Put the rule in the database, where concurrent requests meet.",
  },
  {
    title: "Handling payment events",
    label: "Payment reliability",
    body: "Idempotent webhook handling helps prevent duplicate processing when payment notifications arrive more than once.",
    note: "An event can arrive again. Its effect should happen once.",
  },
  {
    title: "Automating reminders",
    label: "Background work",
    body: "Redis and BullMQ handle background jobs for SMS and WhatsApp reminders.",
    note: "Keep scheduled work separate from the request a customer is waiting on.",
  },
  {
    title: "Protecting business data",
    label: "Access boundaries",
    body: "Tenant-aware queries and role-based permissions restrict access to each business’s information.",
    note: "Access rules belong in the application logic, beyond the interface.",
  },
  {
    title: "Building for slower connections",
    label: "Everyday performance",
    body: "Optimized assets, caching, and efficient queries help keep applications usable on slower networks.",
    note: "The useful version of fast is the one a customer actually experiences.",
  },
  {
    title: "Keeping deployments manageable",
    label: "Production habits",
    body: "Docker, GitHub Actions, and monitoring tools support repeatable deployments and troubleshooting.",
    note: "Make the release repeatable, and leave a way to understand failures.",
  },
] as const;
export const process = [
  [
    "Understand",
    "Start with the problem and how your business currently operates.",
  ],
  [
    "Plan",
    "Work out requirements, data, integrations, and the constraints that matter.",
  ],
  ["Build", "Develop the interface and the application underneath it."],
  ["Test", "Check the important workflows, failure states, and edge cases."],
  [
    "Deploy",
    "Prepare the application for production and verify the deployment.",
  ],
  ["Improve", "Make practical improvements based on feedback."],
] as const;
export const stack = [
  [
    "Frontend",
    "HTML, CSS, JavaScript, TypeScript, React, Next.js",
    "Interfaces that work across devices.",
  ],
  [
    "Backend",
    "Node.js, Express, FastAPI, REST APIs",
    "Application logic and integrations.",
  ],
  [
    "Databases & jobs",
    "PostgreSQL, Supabase, Redis, BullMQ, SQL, migrations, row-level security",
    "Data integrity, access, and background work.",
  ],
  [
    "Payments",
    "M-Pesa Daraja, STK Push, Stripe",
    "Provider integrations and payment event handling.",
  ],
  [
    "Infrastructure",
    "AWS, Docker, GitHub Actions, Vercel, Render, Linux, Sentry",
    "Repeatable releases and production monitoring.",
  ],
  [
    "Data & testing",
    "Python, pandas, NumPy, scikit-learn, Git, GitHub, automated testing",
    "Analysis, checks, and regression testing.",
  ],
] as const;
export const project = {
  title: "LOCKD",
  url: "https://lockd2.vercel.app/",
  description:
    "A Kenya-first rental marketplace for stays, vehicles, gaming, gadgets, and experiences.",
  images: [
    {
      src: "/projects/lockd-home.jpg",
      alt: "Genuine screenshot of the live LOCKD rental marketplace homepage.",
      caption: "01 / Homepage · live public interface",
    },
    {
      src: "/projects/lockd-categories.jpg",
      alt: "Genuine screenshot of rental categories on the live LOCKD website.",
      caption: "02 / Rental discovery · live public interface",
    },
  ],
};
