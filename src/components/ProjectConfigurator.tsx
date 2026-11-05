"use client";
import { Disclosure } from "@/components/Disclosure";

import { LinkArrow } from "@/components/LinkArrow";

import { useState } from "react";
import { site, whatsapp } from "@/data/portfolio";
import {
  createEnquiry,
  detailLimit,
  projectStages,
  projectTypes,
  type ProjectStage,
  type ProjectType,
} from "@/lib/enquiry";

export function ProjectConfigurator() {
  const [type, setType] = useState<ProjectType>("website");
  const [stage, setStage] = useState<ProjectStage>("idea");
  const [details, setDetails] = useState("");
  const draft = createEnquiry(type, stage, details);
  const email = `mailto:${site.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.message)}`;

  return (
    <div
      className="project-configurator"
      role="group"
      aria-label="Prepare a project enquiry"
    >
      <fieldset className="enquiry-fieldset">
        <legend>
          <span className="mono">01</span> What are we building?
        </legend>
        <div className="enquiry-choices">
          {projectTypes.map((item) => (
            <label key={item.id} className="enquiry-choice">
              <input
                type="radio"
                name="project-type"
                value={item.id}
                checked={type === item.id}
                onChange={() => setType(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="enquiry-fieldset">
        <legend>
          <span className="mono">02</span> Where are you starting?
        </legend>
        <div className="enquiry-choices">
          {projectStages.map((item) => (
            <label key={item.id} className="enquiry-choice">
              <input
                type="radio"
                name="project-stage"
                value={item.id}
                checked={stage === item.id}
                onChange={() => setStage(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="enquiry-details">
        <label htmlFor="project-details">
          <span className="mono">03</span> Briefly describe what you need.{" "}
          <span className="subtle">Optional</span>
        </label>
        <textarea
          id="project-details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          maxLength={detailLimit}
          rows={3}
          placeholder="What should it help you or your customers do?"
          aria-describedby="enquiry-detail-hint"
        />
        <p id="enquiry-detail-hint" className="mono enquiry-hint">
          A few sentences are enough. {details.length}/{detailLimit}
        </p>
      </div>
      <Disclosure className="enquiry-preview">
        <summary>
          Review your draft{" "}
          <span className="expand-mark" aria-hidden="true">
            +
          </span>
        </summary>
        <p>{draft.message}</p>
      </Disclosure>
      <div className="enquiry-actions">
        <a
          className="button primary"
          href={whatsapp(draft.message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="enquiry-send-hint"
        >
          Continue on WhatsApp{" "}
          <span aria-hidden="true">
            <LinkArrow />
          </span>
        </a>
        <div className="contact-alternatives">
          <a href={email}>
            Use email instead <LinkArrow />
          </a>
          <a href="tel:+254705370435">
            Call me <LinkArrow />
          </a>
        </div>
        <p className="enquiry-hint" id="enquiry-send-hint">
          Your draft opens for you to review and send.
        </p>
      </div>
    </div>
  );
}
