import Link from "next/link";
import { site, whatsapp } from "@/data/portfolio";
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span className="mono">{number}</span>
      {children}
    </p>
  );
}
export function ContactActions({
  message,
  label = "Let’s talk on WhatsApp",
}: {
  message?: string;
  label?: string;
}) {
  return (
    <div className="contact-action-set">
      <a
        className="button primary"
        href={message ? whatsapp(message) : site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label} <span aria-hidden="true">↗</span>
      </a>
      <div className="contact-alternatives">
        <a href={`mailto:${site.email}`}>Send an email ↗</a>
        <a href="tel:+254705370435">Call me ↗</a>
      </div>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer shell">
      <Link className="brand" href="/">
        Lameck Orengo.
      </Link>
      <p>Nairobi, Kenya · Working worldwide</p>
      <a href="#top">Back to top ↑</a>
      <span className="mono">© {new Date().getFullYear()}</span>
    </footer>
  );
}
