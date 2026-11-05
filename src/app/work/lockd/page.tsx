import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";
import { project } from "@/data/projects";
export const metadata: Metadata = {
  title: "LOCKD project notes",
  description:
    "A closer look at the public rental discovery interface for LOCKD.",
  alternates: { canonical: "/work/lockd/" },
  openGraph: {
    title: "LOCKD project notes | Lameck Orengo",
    description:
      "The public rental discovery interface, genuine screenshots and verified scope of LOCKD.",
    url: "/work/lockd/",
    type: "article",
    images: [
      {
        url: project.images[0].src,
        width: project.images[0].width,
        height: project.images[0].height,
        alt: project.images[0].alt,
      },
    ],
  },
};
export default function Page() {
  return <CaseStudy project={project} />;
}
