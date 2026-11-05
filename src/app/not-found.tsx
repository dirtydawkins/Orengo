import { LinkArrow } from "@/components/LinkArrow";
import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="shell not-found">
      <p className="mono champagne">404</p>
      <h1>Nothing here yet.</h1>
      <p>The page you’re looking for may have moved.</p>
      <Link className="under-link" href="/">
        <span>
          Back to the portfolio <LinkArrow direction="right" />
        </span>
      </Link>
    </main>
  );
}
