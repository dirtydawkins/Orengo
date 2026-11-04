"use client";

import { useEffect, useRef, useState } from "react";
import { processStages } from "@/data/portfolio";

export function EngineeringTimeline() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!list.current || !("IntersectionObserver" in window)) return;
    const visible = new Map<Element, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target, entry);
          else visible.delete(entry.target);
        }
        const nearest = [...visible.keys()].sort(
          (a, b) =>
            Math.abs(a.getBoundingClientRect().top - innerHeight * 0.4) -
            Math.abs(b.getBoundingClientRect().top - innerHeight * 0.4),
        )[0];
        if (nearest) setActive(Number((nearest as HTMLElement).dataset.stage));
      },
      { rootMargin: "-28% 0px -38% 0px", threshold: [0, 0.25, 0.75] },
    );
    list.current
      .querySelectorAll("li")
      .forEach((stage) => observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  return (
    <ol
      ref={list}
      className="engineering-timeline"
      aria-label="Seven stages of a project"
    >
      {processStages.map((stage, index) => (
        <li
          key={stage.title}
          data-stage={index}
          className={`timeline-stage ${active === index ? "is-current" : ""} ${active > index ? "is-past" : ""}`}
        >
          <details
            onToggle={(event) => {
              if (event.currentTarget.open) setActive(index);
            }}
          >
            <summary aria-current={active === index ? "step" : undefined}>
              <span className="timeline-number mono" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="timeline-copy">
                <span className="timeline-title">{stage.title}</span>
                <span className="timeline-summary">{stage.summary}</span>
              </span>
              <span className="expand-mark" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="timeline-extra">{stage.detail}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
