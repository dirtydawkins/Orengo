export const projectTypes = [
  { id: "website", label: "Business website", phrase: "a business website" },
  { id: "booking", label: "Booking system", phrase: "a booking system" },
  {
    id: "payments",
    label: "Payment integration",
    phrase: "a payment integration",
  },
  {
    id: "application",
    label: "Custom web application",
    phrase: "a custom web application",
  },
  { id: "automation", label: "Automation", phrase: "an automation workflow" },
  { id: "ai", label: "AI-powered feature", phrase: "an AI-powered feature" },
  {
    id: "improvements",
    label: "Website improvements",
    phrase: "improvements to an existing website",
  },
  { id: "other", label: "Something else", phrase: "a project" },
] as const;

export const projectStages = [
  { id: "idea", label: "I have an idea", phrase: "I’m starting from an idea." },
  {
    id: "existing",
    label: "I have an existing website",
    phrase: "I have an existing website.",
  },
  {
    id: "improve",
    label: "I need improvements",
    phrase: "I’d like to improve an existing website or application.",
  },
  { id: "new", label: "I need a new system", phrase: "I need a new system." },
] as const;

export type ProjectType = (typeof projectTypes)[number]["id"];
export type ProjectStage = (typeof projectStages)[number]["id"];
export const detailLimit = 600;

export function createEnquiry(
  type: ProjectType,
  stage: ProjectStage,
  details = "",
) {
  const selectedType = projectTypes.find((item) => item.id === type);
  const selectedStage = projectStages.find((item) => item.id === stage);
  if (!selectedType || !selectedStage)
    throw new Error("Choose a valid project type and stage.");
  const description = details
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, detailLimit);
  const message = `Hi Lameck, I’d like to discuss ${selectedType.phrase}.\n${selectedStage.phrase}${description ? `\n\n${description}` : ""}`;
  return { subject: `Project enquiry: ${selectedType.label}`, message };
}
