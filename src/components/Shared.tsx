import { LinkArrow } from "@/components/LinkArrow";
import { ChannelAction } from "@/components/ChannelAction";
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
      <ChannelAction
        channel="whatsapp"
        primary
        href={message ? whatsapp(message) : site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </ChannelAction>
      <div className="contact-alternatives">
        <ChannelAction channel="email" href={`mailto:${site.email}`}>
          Send an email
        </ChannelAction>
        <ChannelAction channel="phone" href="tel:+254705370435">
          Call me
        </ChannelAction>
      </div>
    </div>
  );
}
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav className={`social-links ${className}`} aria-label="Social profiles">
      <ChannelAction
        channel="github"
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </ChannelAction>
      <ChannelAction
        channel="linkedin"
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </ChannelAction>
    </nav>
  );
}
export function Footer() {
  return (
    <footer className="footer shell">
      <Link className="brand" href="/">
        Lameck Orengo.
      </Link>
      <p>Nairobi, Kenya · Working worldwide</p>
      <SocialLinks className="footer-socials" />
      <nav className="footer-navigation" aria-label="Footer navigation">
        <Link href="/#services">Services</Link>
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
      </nav>
      <a href="#top">
        Back to top <LinkArrow direction="up" />
      </a>
      <span className="mono">© {new Date().getFullYear()}</span>
    </footer>
  );
}
