"use client";

import { useId, useState, type CSSProperties } from "react";

export type VerifiedComparison = {
  id: string;
  title: string;
  description: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  width: number;
  height: number;
  verified: true;
  evidence: string;
};

export function BeforeAfter({
  comparison,
}: {
  comparison: VerifiedComparison;
}) {
  const [position, setPosition] = useState(50);
  const id = useId();
  if (!comparison.verified) return null;

  return (
    <figure className="before-after" aria-labelledby={id}>
      <figcaption>
        <h3 id={id}>{comparison.title}</h3>
        <p>{comparison.description}</p>
      </figcaption>
      <div
        className="comparison-frame"
        style={
          {
            aspectRatio: `${comparison.width} / ${comparison.height}`,
            "--comparison-position": `${position}%`,
          } as CSSProperties
        }
      >
        <img
          src={comparison.after.src}
          alt={comparison.after.alt}
          width={comparison.width}
          height={comparison.height}
          loading="lazy"
        />
        <img
          className="comparison-before"
          src={comparison.before.src}
          alt={comparison.before.alt}
          width={comparison.width}
          height={comparison.height}
          loading="lazy"
        />
        <span className="comparison-label comparison-label-before">Before</span>
        <span className="comparison-label comparison-label-after">After</span>
        <span className="comparison-divider" aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Compare before and after: ${comparison.title}`}
          aria-valuetext={`${position}% of the original interface visible`}
        />
      </div>
      <p className="comparison-help">
        Drag to compare. Use the arrow keys when the slider is focused.
      </p>
    </figure>
  );
}
