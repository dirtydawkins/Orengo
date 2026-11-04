import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";
export const metadata: Metadata = {
  title: "LOCKD project notes",
  description:
    "A closer look at the public rental discovery interface for LOCKD.",
  alternates: { canonical: "/work/lockd/" },
};
export default function Page() {
  return <CaseStudy />;
}
