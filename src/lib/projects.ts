export type ImageSource = { src: string; width: number };
export type ProjectImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sources?: ImageSource[];
  mobile?: {
    src: string;
    webp?: string;
    alt: string;
    width: number;
    height: number;
  };
};
export type ProjectCaseStudy = {
  role: string;
  sections: { title: string; body?: string; points?: string[] }[];
  evidence: { label: string; detail: string }[];
};
export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  url: string;
  caseStudyUrl?: string;
  status?: string;
  images: ProjectImage[];
  caseStudy?: ProjectCaseStudy;
};
const localImage = (src: string) =>
  /^\/projects\/[a-z0-9][a-z0-9-]*\.(jpg|jpeg|png|webp|avif)$/i.test(src);
const dimensions = (width: number, height: number) =>
  Number.isInteger(width) &&
  width > 0 &&
  Number.isInteger(height) &&
  height > 0;

export function projectIssues(project: PortfolioProject): string[] {
  const issues: string[] = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id))
    issues.push("Invalid project identifier");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug))
    issues.push("Invalid project slug");
  if (
    !project.title.trim() ||
    !project.description.trim() ||
    !project.category.trim()
  )
    issues.push("Missing project information");
  try {
    const url = new URL(project.url);
    if (url.protocol !== "https:" || url.username || url.password)
      issues.push("Invalid live URL");
  } catch {
    issues.push("Invalid live URL");
  }
  if (
    project.caseStudyUrl &&
    !/^\/work\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(project.caseStudyUrl)
  )
    issues.push("Invalid case study route");
  const imageIds = new Set<string>();
  for (const image of project.images) {
    if (!image.id || imageIds.has(image.id))
      issues.push("Missing or duplicate screenshot identifier");
    imageIds.add(image.id);
    if (
      !localImage(image.src) ||
      !image.alt.trim() ||
      !image.caption.trim() ||
      !dimensions(image.width, image.height)
    )
      issues.push("Invalid screenshot reference");
    for (const source of image.sources ?? [])
      if (
        !localImage(source.src) ||
        !Number.isInteger(source.width) ||
        source.width <= 0
      )
        issues.push("Invalid responsive source");
    if (
      image.mobile &&
      (!localImage(image.mobile.src) ||
        !image.mobile.alt.trim() ||
        !dimensions(image.mobile.width, image.mobile.height) ||
        (image.mobile.webp && !localImage(image.mobile.webp)))
    )
      issues.push("Invalid mobile screenshot");
  }
  return issues;
}
export function selectedProject(projects: PortfolioProject[], id: string) {
  return projects.find((project) => project.id === id) ?? projects[0];
}
export function screenshotIndex(current: number, delta: number, count: number) {
  return count > 0 ? (((current + delta) % count) + count) % count : 0;
}
export function swipeDirection(dx: number, dy: number): -1 | 0 | 1 {
  return Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy) * 1.5
    ? dx < 0
      ? 1
      : -1
    : 0;
}
