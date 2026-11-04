import Link from "next/link";
import { ProjectGallery } from "./ProjectGallery";
import { ContactActions } from "./Shared";
import { project } from "@/data/portfolio";
export function CaseStudy() {
  return (
    <main id="main">
      <section className="detail-hero shell">
        <Link className="back-link" href="/#work">
          ← Back to selected work
        </Link>
        <p className="mono champagne">Project notes / Public interface</p>
        <h1>
          LOCKD<span className="period">.</span>
        </h1>
        <p className="lead">{project.description}</p>
        <a
          className="under-link"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the live website ↗
        </a>
      </section>
      <div className="shell case-gallery">
        <ProjectGallery />
      </div>
      <section className="shell detail-body">
        <aside className="detail-aside">
          <p className="mono">Role</p>
          <p>Developer</p>
          <p className="mono" style={{ marginTop: 28 }}>
            Scope of these notes
          </p>
          <p>
            The public rental discovery experience visible on the live website.
          </p>
        </aside>
        <div>
          <h2>A place to start looking</h2>
          <p>
            LOCKD brings stays, cars, technology, gaming equipment, and
            experiences into one rental discovery interface. Visitors can browse
            categories, choose a location, and inspect listing details.
          </p>
          <h2>The people using it</h2>
          <p>
            People looking for a stay, a vehicle, or equipment, alongside
            listers who have something available to rent.
          </p>
          <h2>Interface and architecture</h2>
          <p>
            The public site uses HTML, CSS, and JavaScript, with category and
            discovery pages connected through clear navigation. Search controls
            collect the item, category, and location before visitors explore
            rental details.
          </p>
          <h2>Decisions visible in the interface</h2>
          <ul>
            <li>
              Categories provide different starting points for stays, vehicles,
              and equipment.
            </li>
            <li>
              Location controls help visitors narrow the discovery experience.
            </li>
            <li>
              Separate listing details give space for availability and rental
              terms.
            </li>
            <li>
              Responsive layouts make the public interface usable across screen
              sizes.
            </li>
          </ul>
          <h2>Questions worth getting right</h2>
          <p>
            A rental interface needs to make categories, dates, location, and
            availability understandable before a customer makes a request. The
            portfolio’s engineering notes explain related practices from my
            wider work, including booking constraints and payment events.
          </p>
          <h2>Current status</h2>
          <p className="case-status">
            The public interface is deployed at lockd2.vercel.app. Screenshots
            in this gallery were captured from that live site. A live interface
            does not by itself verify completed bookings, payment processing,
            customer activity, or revenue; those claims are not made here.
          </p>
          <h2>Building something with similar requirements?</h2>
          <ContactActions message="Hi Lameck, I saw LOCKD in your portfolio and would like to discuss a web application." />
        </div>
      </section>
    </main>
  );
}
