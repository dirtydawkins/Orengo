"use client";
import { LinkArrow } from "@/components/LinkArrow";

import Link from "next/link";
import { useId, useState } from "react";
import { ProjectGallery } from "./ProjectGallery";
import {
  projectIssues,
  selectedProject,
  type PortfolioProject,
} from "@/lib/projects";
export function ProjectSpotlight({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const available = projects.filter(
    (project) => projectIssues(project).length === 0,
  );
  const [activeId, setActiveId] = useState(available[0]?.id ?? "");
  const id = useId();
  const active = selectedProject(available, activeId);
  if (!active)
    return (
      <p className="subtle">
        Project previews are currently unavailable.{" "}
        <Link href="/#contact">
          Get in touch <LinkArrow />
        </Link>
      </p>
    );
  const multiple = available.length > 1;
  return (
    <div className={`spotlight-layout ${multiple ? "has-selector" : ""}`}>
      {multiple ? (
        <div
          className="spotlight-selector"
          role="group"
          aria-label="Choose a project"
        >
          {available.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveId(project.id)}
              aria-pressed={active.id === project.id}
              aria-controls={`${id}-details`}
            >
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong>{project.title}</strong>
                <small>{project.category}</small>
              </span>
              <span className="selector-mark" aria-hidden="true">
                <LinkArrow />
              </span>
            </button>
          ))}
        </div>
      ) : null}
      <div
        className="spotlight-details"
        id={`${id}-details`}
        role="region"
        aria-labelledby={`${id}-title`}
      >
        <div key={active.id} className="spotlight-information">
          <p className="mono spotlight-category">
            <span>
              {String(available.indexOf(active) + 1).padStart(2, "0")}
            </span>{" "}
            {active.category}
          </p>
          <h3 id={`${id}-title`}>
            {active.title}
            <span className="period">.</span>
          </h3>
          <p className="spotlight-description">{active.description}</p>
          {active.technologies.length ? (
            <p className="spotlight-technologies">
              <span className="mono">Technologies</span>
              {active.technologies.join(" / ")}
            </p>
          ) : null}
          <div className="spotlight-actions">
            <a
              className="button primary"
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Live Website{" "}
              <span aria-hidden="true">
                <LinkArrow />
              </span>
            </a>
            {active.caseStudyUrl ? (
              <Link className="under-link" href={active.caseStudyUrl}>
                View Case Study{" "}
                <span aria-hidden="true">
                  <LinkArrow />
                </span>
              </Link>
            ) : null}
          </div>
          {active.status ? (
            <p className="mono spotlight-status">{active.status}</p>
          ) : null}
        </div>
      </div>
      <div className="spotlight-preview">
        <ProjectGallery
          key={active.id}
          project={active}
          priority
          sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1440px) 55vw, 780px"
        />
      </div>
    </div>
  );
}
