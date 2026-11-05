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
export const processStages = [
  {
    title: "Understand",
    summary: "Start with the problem and how your business works.",
    detail:
      "Talk through who will use the product, what happens today, and where work gets stuck. Agree on the problem before choosing a solution.",
  },
  {
    title: "Plan",
    summary: "Define requirements, data, integrations, and constraints.",
    detail:
      "Map the essential workflows, external services, access rules, and practical limits. Use these to agree on a manageable scope.",
  },
  {
    title: "Design",
    summary: "Work out the interface and the important user journeys.",
    detail:
      "Organise the information and key screens around real tasks. Consider mobile layouts, empty states, and recovery when something goes wrong.",
  },
  {
    title: "Build",
    summary: "Connect the frontend, backend, database, and integrations.",
    detail:
      "Build the agreed workflows in useful increments. Keep access checks and data rules close to the operations they protect.",
  },
  {
    title: "Test",
    summary: "Check the workflows, edge cases, accessibility, and behavior.",
    detail:
      "Verify successful and failed requests, input validation, keyboard access, and responsive layouts. Check critical integrations before release.",
  },
  {
    title: "Deploy",
    summary: "Prepare for production and verify the release.",
    detail:
      "Build the production version, check configuration and assets, and confirm the deployed routes and important workflows actually work.",
  },
  {
    title: "Improve",
    summary: "Refine the software using real feedback.",
    detail:
      "Review what people find difficult and what the application needs next. Prioritise practical fixes and improvements over unnecessary features.",
  },
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
export const skillEmphasis: Record<string, string[]> = {
  Frontend: ["TypeScript", "React", "Next.js"],
  Backend: ["Node.js", "Express", "REST APIs"],
  "Databases & jobs": ["PostgreSQL", "Supabase", "Redis", "BullMQ"],
  Payments: ["M-Pesa Daraja", "Stripe"],
  Infrastructure: ["AWS", "Docker", "Vercel"],
  "Data & testing": ["Python", "pandas", "scikit-learn"],
};
export { project } from "./projects";
