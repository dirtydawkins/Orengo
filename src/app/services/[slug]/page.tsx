import { Disclosure } from "@/components/Disclosure";
import { LinkArrow } from "@/components/LinkArrow";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactActions } from "@/components/Shared";
import { processStages, services } from "@/data/portfolio";
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return {
    title: service?.title,
    description: service?.description,
    alternates: { canonical: `/services/${slug}/` },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return (
    <main id="main">
      <section className="detail-hero shell">
        <Link className="back-link" href="/#services">
          <span>
            <LinkArrow direction="left" /> Back to services
          </span>
        </Link>
        <p className="mono champagne">A service by Lameck Orengo</p>
        <h1>
          {service.title}
          <span className="period">.</span>
        </h1>
        <p className="lead">{service.description}</p>
      </section>
      <section className="shell detail-body">
        <aside className="detail-aside">
          <p className="mono">Nairobi, Kenya · Working worldwide</p>
          <p>
            Start with a conversation about what you need, the tools you already
            use, and the people using the system.
          </p>
        </aside>
        <div>
          <h2>What we can work on</h2>
          <ul>
            {service.examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <h2>Where it helps</h2>
          <p>{service.problem}</p>
          <h2>From the first conversation to a working application</h2>
          <p>
            We agree on the scope and important workflows, then build, check,
            and deploy the application. Requirements and constraints guide the
            implementation.
          </p>
          <div className="process-index">
            {processStages.map((stage, i) => (
              <Disclosure key={stage.title}>
                <summary>
                  <span className="mono">0{i + 1}</span>
                  <h3>{stage.title}</h3>
                  <span className="expand-mark">+</span>
                </summary>
                <p>
                  {stage.summary} {stage.detail}
                </p>
              </Disclosure>
            ))}
          </div>
          <h2>Tell me what you have in mind.</h2>
          <ContactActions message={service.message} />
        </div>
      </section>
    </main>
  );
}
