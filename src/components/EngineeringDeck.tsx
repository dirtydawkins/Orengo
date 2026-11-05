"use client";
import { useEffect, useRef, useState } from "react";
import { engineering } from "@/data/portfolio";
import { CardArtwork } from "./PlayingCardArt";
const faces = [
  {
    rank: "A",
    suit: "♠",
    name: "Ace of databases",
    tech: "PostgreSQL · transactions · constraints",
    example:
      "Two requests reach the same slot. The database rule prevents an overlap.",
  },
  {
    rank: "K",
    suit: "♦",
    name: "King of payments",
    tech: "M-Pesa · Stripe · webhooks",
    example:
      "A provider retries a payment notification. The event is processed once.",
  },
  {
    rank: "Q",
    suit: "♥",
    name: "Queen of automation",
    tech: "Redis · BullMQ · SMS / WhatsApp",
    example:
      "A scheduled job sends an appointment reminder without blocking the application.",
  },
  {
    rank: "J",
    suit: "♣",
    name: "Jack of security",
    tech: "Tenant-aware queries · role-based access",
    example:
      "A staff member can access the records allowed for their business and role.",
  },
  {
    rank: "★",
    suit: "★",
    name: "Joker of performance",
    tech: "Asset optimization · caching · indexing",
    example:
      "A smaller page and an indexed query make less work for a slower connection.",
  },
  {
    rank: "A",
    suit: "♠",
    name: "Ace of deployment",
    tech: "Docker · GitHub Actions · Sentry",
    example:
      "A repeatable release process and error reports make a failed release easier to investigate.",
  },
];
export function EngineeringDeck() {
  const [flipped, setFlipped] = useState<boolean[]>(faces.map(() => false));
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const rail = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );
  function flip(index: number) {
    setFlipped((previous) =>
      previous.map((value, i) => (i === index ? !value : value)),
    );
    setAnnouncement(
      `${faces[index].name}: ${flipped[index] ? "front face" : engineering[index].body}`,
    );
  }
  function browse(delta: number) {
    const next = Math.max(0, Math.min(faces.length - 1, active + delta));
    const card = rail.current?.children[next] as HTMLElement | undefined;
    if (rail.current && card) {
      rail.current.scrollTo({
        left:
          rail.current.scrollLeft +
          card.getBoundingClientRect().left -
          rail.current.getBoundingClientRect().left -
          8,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      setActive(next);
    }
  }
  function trackScroll() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!rail.current) return;
      const edge = rail.current.getBoundingClientRect().left;
      const cards = Array.from(rail.current.children) as HTMLElement[];
      const nearest = cards.reduce(
        (best, card, index) =>
          Math.abs(card.getBoundingClientRect().left - edge) <
          Math.abs(cards[best].getBoundingClientRect().left - edge)
            ? index
            : best,
        0,
      );
      setActive(nearest);
      frame.current = null;
    });
  }
  return (
    <div
      className="playing-deck"
      role="region"
      aria-label="Six engineering playing cards"
    >
      <div className="playing-deck-intro">
        <span className="mono">Select a card to turn it.</span>
      </div>
      <div className="playing-rail" ref={rail} onScroll={trackScroll}>
        {faces.map((face, index) => {
          const card = engineering[index];
          return (
            <button
              key={face.name}
              className={`playing-card ${flipped[index] ? "is-flipped" : ""}`}
              aria-pressed={flipped[index]}
              aria-label={`${face.name}. ${flipped[index] ? `${card.body} Technologies: ${face.tech}. Illustrative example: ${face.example}. Activate to return to the front.` : `${card.title}. Activate to reveal the engineering detail.`}`}
              onClick={() => flip(index)}
            >
              <span className="playing-inner">
                <span className="playing-face card-front" aria-hidden="true">
                  <span className="card-engraving" />
                  <span className="card-corner top">
                    <b>{face.rank}</b>
                    <span>{face.suit}</span>
                  </span>
                  <span className="card-corner bottom">
                    <b>{face.rank}</b>
                    <span>{face.suit}</span>
                  </span>
                  <CardArtwork index={index} />
                  <span className="card-face-name">{face.name}</span>
                  <span className="card-theme">{card.title}</span>
                </span>
                <span className="playing-face card-back" aria-hidden="true">
                  <span className="card-engraving" />
                  <span className="card-back-symbol">{face.suit}</span>
                  <span className="card-back-title">{card.label}</span>
                  <span className="card-explanation">{card.body}</span>
                  <span className="card-tech">
                    <span className="mono">Tools</span>
                    {face.tech}
                  </span>
                  <span className="card-example">
                    <span className="mono">Example</span>
                    {face.example}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="playing-deck-footer">
        <div className="deck-browse">
          <span className="mono" aria-live="polite">
            0{active + 1} / 06
          </span>
          <div className="arrow-controls">
            <button
              disabled={active === 0}
              onClick={() => browse(-1)}
              aria-label="Previous playing card"
            >
              ←
            </button>
            <button
              disabled={active === 5}
              onClick={() => browse(1)}
              aria-label="Next playing card"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
