import Link from "next/link";
import { ProjectGallery } from "./ProjectGallery";
import { ContactActions } from "./Shared";
import { site } from "@/data/portfolio";
import type { PortfolioProject } from "@/lib/projects";

export function CaseStudy({ project }: { project: PortfolioProject }) {
  const notes = project.caseStudy;
  return (
    <main id="main">
      <section className="detail-hero shell">
        <Link className="back-link" href="/#work">
          ← Back to selected work
        </Link>
        <p className="mono champagne">Project notes / {project.category}</p>
        <h1>
          {project.title}
          <span className="period">.</span>
        </h1>
        <p className="lead">{project.description}</p>
        <a
          className="under-link"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Live Website ↗
        </a>
      </section>
      <div className="shell case-gallery">
        <ProjectGallery
          project={{
            id: project.id,
            title: project.title,
            url: project.url,
            images: project.images,
          }}
        />
      </div>
      <section className="shell detail-body">
        <aside className="detail-aside">
          {notes?.role ? (
            <>
              <p className="mono">Developer’s role</p>
              <p>{notes.role}</p>
            </>
          ) : null}
          {project.technologies.length ? (
            <>
              <p className="mono" style={{ marginTop: 28 }}>
                Technologies
              </p>
              <p>{project.technologies.join(" · ")}</p>
            </>
          ) : null}
          {project.status ? (
            <>
              <p className="mono" style={{ marginTop: 28 }}>
                Status
              </p>
              <p>{project.status}</p>
            </>
          ) : null}
        </aside>
        <div>
          {notes?.sections.map((section) => (
            <section className="case-study-part" key={section.title}>
              <h2>{section.title}</h2>
              {section.body ? <p>{section.body}</p> : null}
              {section.points?.length ? (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          {notes?.evidence.length ? (
            <>
              <h2>Architecture and delivery</h2>
              <dl className="case-evidence">
                {notes.evidence.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}
          <h2>Building something with similar requirements?</h2>
          <ContactActions
            message={`Hi Lameck, I saw ${project.title} in your portfolio and would like to discuss a web application.`}
          />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `${project.title} project notes`,
            description: project.description,
            url: `${site.url}${project.caseStudyUrl ?? "/#work"}`,
            creator: { "@type": "Person", name: site.name, url: site.url },
            about: {
              "@type": "WebSite",
              name: project.title,
              url: project.url,
            },
            image: project.images[0]
              ? `${site.url}${project.images[0].src}`
              : undefined,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
