import Image from "next/image";
import Link from "next/link";
import { ContactActions, SectionLabel, SocialLinks } from "@/components/Shared";
import { EngineeringDeck } from "@/components/EngineeringDeck";
import { ProjectSpotlight } from "@/components/ProjectSpotlight";
import { EngineeringTimeline } from "@/components/EngineeringTimeline";
import { ProjectConfigurator } from "@/components/ProjectConfigurator";
import { BeforeAfter } from "@/components/BeforeAfter";
import { comparisons } from "@/data/comparisons";
import {
  services,
  site,
  stack,
  skillEmphasis,
  whatsapp,
} from "@/data/portfolio";
import { projects } from "@/data/projects";
export default function Home() {
  return (
    <main id="main">
      <section className="hero shell" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-line">
              <span>Websites and</span>
            </span>
            <span className="hero-line">
              <span>systems built</span>
            </span>
            <span className="hero-line">
              <span className="accent-text">
                to work<span className="period">.</span>
              </span>
            </span>
          </h1>
          <p className="hero-intro">
            I’m <span className="accent-text">Lameck</span>, a full-stack
            developer based in Nairobi. I build websites, web applications, and
            business systems that make everyday work easier.
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let’s talk on WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <a className="under-link" href="#services">
              Explore my services <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-photo">
            <Image
              src="/images/lameck-orengo.jpg"
              alt="Lameck Orengo, full-stack developer based in Nairobi."
              width={288}
              height={387}
              priority
              sizes="(max-width: 760px) 70vw, 350px"
            />
          </div>
          <figcaption>
            <span>Lameck Orengo</span>
            <span className="mono">Full-stack developer</span>
          </figcaption>
          <span className="portrait-corner" aria-hidden="true">
            LO.
          </span>
        </figure>
        <div className="hero-foot mono">
          <p>
            Nairobi, Kenya <span>↗ Working worldwide</span>
          </p>
          <a href="#services">
            A practical approach, from interface to infrastructure.{" "}
            <span>↓</span>
          </a>
        </div>
      </section>
      <section
        className="section spotlight-section shell"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="section-head">
          <div>
            <SectionLabel number="01">Selected work</SectionLabel>
            <h2 id="work-title">
              Selected <span className="adaptive-ink">Work</span>
            </h2>
          </div>
          <p>Real projects. Built with purpose.</p>
        </div>
        <ProjectSpotlight
          projects={projects.map(
            ({ caseStudy: _notes, ...summary }) => summary,
          )}
        />
        {comparisons.map((comparison) => (
          <BeforeAfter key={comparison.id} comparison={comparison} />
        ))}
      </section>
      <section
        className="paper section"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="shell">
          <div className="section-head">
            <div>
              <SectionLabel number="02">Services</SectionLabel>
              <h2 id="services-title">
                What I can
                <br />
                <span className="adaptive-ink">build for you</span>
                <span className="period">.</span>
              </h2>
            </div>
            <p>
              A clear website. A better booking flow.
              <br />
              Software that fits the way you work.
            </p>
          </div>
          <div className="service-index">
            {services.map((s, i) => (
              <details className="service-row" key={s.slug}>
                <summary>
                  <span className="row-number mono">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <span className="service-description">{s.description}</span>
                  <span className="expand-mark" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="service-expanded">
                  <ul>
                    {s.examples.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <div>
                    <a
                      className="under-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={whatsapp(s.message)}
                    >
                      Discuss this project ↗
                    </a>
                    <Link
                      className="service-page-link"
                      href={`/services/${s.slug}/`}
                    >
                      About this service →
                    </Link>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section
        className="section shell problems"
        aria-labelledby="problems-title"
      >
        <div>
          <SectionLabel number="03">The everyday problems</SectionLabel>
          <h2 id="problems-title">
            Less manual work.
            <br />
            <span className="adaptive-ink">Fewer things missed.</span>
          </h2>
          <p className="section-copy">
            Start with the friction. Then work out what software can usefully
            do.
          </p>
        </div>
        <div className="problem-list">
          {[
            [
              "Customers forget appointments.",
              "Automated reminders and scheduling workflows.",
            ],
            [
              "Two people reserve the same slot.",
              "Availability checks and transaction-safe booking logic.",
            ],
            [
              "Customers struggle to pay online.",
              "Suitable payment integrations and clear confirmation flows.",
            ],
            [
              "Enquiries get lost.",
              "Structured enquiries, notifications, and follow-up workflows.",
            ],
            [
              "Spreadsheets do all the heavy lifting.",
              "A focused application designed around the actual workflow.",
            ],
          ].map(([problem, approach], i) => (
            <details key={problem}>
              <summary>
                <span className="mono">0{i + 1}</span>
                {problem}
                <span className="expand-mark">+</span>
              </summary>
              <p>{approach}</p>
            </details>
          ))}
        </div>
      </section>
      <section
        className="section engineering"
        aria-labelledby="engineering-title"
      >
        <div className="shell">
          <div className="section-head">
            <div>
              <SectionLabel number="04">Engineering notes</SectionLabel>
              <h2 id="engineering-title">
                Behind the <span className="adaptive-ink">build.</span>
              </h2>
            </div>
            <p>
              Some of the details that matter
              <br />
              when software needs to work reliably.
            </p>
          </div>
          <EngineeringDeck />
        </div>
      </section>
      <section
        className="paper section"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="shell split-section">
          <div className="timeline-intro">
            <SectionLabel number="05">The process</SectionLabel>
            <h2 id="process-title">
              How I <span className="adaptive-ink">work.</span>
            </h2>
            <p className="section-copy">
              From the first conversation to a working product.
            </p>
          </div>
          <EngineeringTimeline />
        </div>
      </section>
      <section
        className="section shell"
        id="experience"
        aria-labelledby="experience-title"
      >
        <SectionLabel number="06">Experience</SectionLabel>
        <div className="experience-entry">
          <div>
            <p className="mono champagne">Jan 2024 to present</p>
            <h2 id="experience-title">
              Full-stack
              <br />
              <span className="adaptive-ink">developer.</span>
            </h2>
            <p className="subtle">
              Self-employed / Freelance
              <br />
              Nairobi, Kenya
            </p>
          </div>
          <div>
            <p className="experience-lead">
              Websites, booking platforms, payment flows, and the application
              logic that keeps them connected.
            </p>
            <details className="experience-details">
              <summary>
                Read about the work <span className="expand-mark">+</span>
              </summary>
              <ul>
                <li>
                  Business websites and mobile-first interfaces with clear
                  enquiry and booking flows.
                </li>
                <li>
                  LLM-powered chatbots, SMS and WhatsApp reminders, and
                  background jobs using Redis and BullMQ.
                </li>
                <li>
                  PostgreSQL transactions, multi-tenant access, M-Pesa Daraja
                  and Stripe webhook handling.
                </li>
                <li>
                  Query optimization, Docker, GitHub Actions, AWS hosting, and
                  Sentry monitoring.
                </li>
              </ul>
            </details>
          </div>
        </div>
      </section>
      <section
        className="skills-section section"
        id="skills"
        aria-labelledby="skills-title"
      >
        <div className="shell split-section">
          <div>
            <SectionLabel number="07">The technical index</SectionLabel>
            <h2 id="skills-title">
              Skills <span className="champagne">&amp;</span>
              <br />
              <span className="adaptive-ink">Technologies.</span>
            </h2>
            <p className="section-copy">
              The tools I use, and where they fit in the work.
            </p>
          </div>
          <div className="stack-index">
            {stack.map(([title, tools, usage]) => (
              <details key={title}>
                <summary>
                  {title}
                  <span className="expand-mark">+</span>
                </summary>
                <ul className="skill-tools" aria-label={`${title} tools`}>
                  {tools.split(", ").map((tool) => (
                    <li
                      key={tool}
                      className={
                        skillEmphasis[title]?.includes(tool)
                          ? "skill-emphasis"
                          : undefined
                      }
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
                <p className="subtle">{usage}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section
        className="about-section section shell"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="about-portrait">
          <Image
            src="/images/lameck-orengo.jpg"
            alt="Portrait of Lameck Orengo."
            width={288}
            height={387}
            sizes="(max-width:760px) 50vw, 260px"
          />
          <p className="mono">Nairobi, Kenya</p>
        </div>
        <div>
          <SectionLabel number="08">A little about me</SectionLabel>
          <h2 id="about-title">
            I like the part
            <br />
            <span className="adaptive-ink">where it clicks.</span>
          </h2>
          <p>
            I work on websites and applications that help businesses manage
            bookings, payments, enquiries, and everyday operations.
          </p>
          <p className="subtle">
            I enjoy the parts that need careful thinking: database design,
            application logic, performance, and making software easier to use.
          </p>
          <SocialLinks className="about-socials" />
          <div className="education">
            <span className="mono">2019–2022 / Education</span>
            <h3>BSc in Data Science and Analytics</h3>
            <p>Jomo Kenyatta University of Agriculture and Technology</p>
            <details>
              <summary>
                Academic foundations <span className="expand-mark">+</span>
              </summary>
              <p>
                Python and SQL data analysis; regression and classification
                model evaluation.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section
        className="section enquiry-section"
        id="project-enquiry"
        aria-labelledby="enquiry-title"
      >
        <div className="shell enquiry-layout">
          <div className="enquiry-intro">
            <SectionLabel number="09">Your project</SectionLabel>
            <h2 id="enquiry-title">
              Tell me what
              <br />
              you need <span className="adaptive-ink">built.</span>
            </h2>
            <p>A few details help us start the conversation.</p>
          </div>
          <ProjectConfigurator />
        </div>
      </section>
      <section
        className="contact-section section paper"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="shell">
          <SectionLabel number="10">Let’s talk</SectionLabel>
          <h2 id="contact-title">
            Have something
            <br />
            that <span className="adaptive-ink">needs building</span>
            <span className="period">?</span>
          </h2>
          <div className="contact-layout">
            <p>
              Tell me what you’re working on. I build websites, web
              applications, and business systems for customers in Kenya and
              beyond.
            </p>
            <div>
              <ContactActions label="Message me on WhatsApp" />
              <div className="contact-details">
                <a href="tel:+254705370435">{site.phone}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
          <div className="contact-bottom">
            <SocialLinks />
            <a
              className="under-link"
              href={site.cv}
              download="Lameck_Orengo_CV_updated.pdf"
            >
              Download CV ↓
            </a>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            url: site.url,
            jobTitle: "Full-Stack Developer",
            email: site.email,
            telephone: "+254705370435",
            sameAs: [site.github, site.linkedin],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
          }),
        }}
      />
    </main>
  );
}
