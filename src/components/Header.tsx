"use client";
import { LinkArrow } from "@/components/LinkArrow";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/data/portfolio";

const links = [
  ["Services", "services"],
  ["Work", "work"],
  ["Skills", "skills"],
  ["About", "about"],
] as const;
const mobileLinks = [
  ...links,
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;
type ThemePreference = "light" | "dark" | "system";

function applyDocumentTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#F2EEE6" : "#0B0D10");
}

export function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("light");
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(pathname !== "/");
  const [motion, setMotion] = useState({ compact: false, hidden: false });
  const flags = useRef({ compact: false, hidden: false });
  const header = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const backdropPointer = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lameck-theme");
      setThemePreference(
        saved === "dark" || saved === "system" ? saved : "light",
      );
    } catch {}
    function syncStorage(event: StorageEvent) {
      if (event.key !== "lameck-theme" && event.key !== null) return;
      const preference: ThemePreference =
        event.newValue === "dark" || event.newValue === "system"
          ? event.newValue
          : "light";
      const next =
        preference === "system"
          ? matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : preference;
      setThemePreference(preference);
      setTheme(next);
      applyDocumentTheme(next);
    }
    window.addEventListener("storage", syncStorage);
    return () => {
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  useEffect(() => {
    if (themePreference !== "system") return;
    const query = matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const next = query.matches ? "dark" : "light";
      setTheme(next);
      applyDocumentTheme(next);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [themePreference]);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) {
      setShowContact(true);
      return;
    }
    const update = () =>
      setShowContact(hero.getBoundingClientRect().bottom <= 96);
    update();
    const observer = new IntersectionObserver(update, {
      rootMargin: "-96px 0px 0px 0px",
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
    setActive(
      pathname.startsWith("/services/")
        ? "services"
        : pathname.startsWith("/work/")
          ? "work"
          : "",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-24% 0px -62% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useLayoutEffect(() => {
    function measure() {
      const link = nav.current?.querySelector<HTMLElement>("[aria-current]");
      if (!pill.current || !nav.current) return;
      const parent = nav.current.getBoundingClientRect();
      const rect = link?.getBoundingClientRect();
      pill.current.style.width = rect ? `${rect.width}px` : "0px";
      pill.current.style.transform = `translateX(${rect ? rect.left - parent.left : 0}px)`;
      pill.current.style.opacity = rect ? "1" : "0";
    }
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [active, pathname, showContact]);

  useEffect(() => {
    let last = window.scrollY,
      travel = 0,
      direction = 0,
      frame = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    function update() {
      frame = 0;
      const y = window.scrollY,
        delta = y - last,
        dir = Math.sign(delta);
      if (dir !== direction) {
        travel = 0;
        direction = dir;
      }
      travel += Math.abs(delta);
      const compact = y > 120;
      let hidden = flags.current.hidden;
      if (
        y < 80 ||
        menuOpen ||
        reduced.matches ||
        header.current?.contains(document.activeElement)
      )
        hidden = false;
      else if (dir > 0 && travel > 150 && y > 650) hidden = true;
      else if (dir < 0 && travel > 48) hidden = false;
      const next = { compact, hidden };
      if (
        next.compact !== flags.current.compact ||
        next.hidden !== flags.current.hidden
      ) {
        flags.current = next;
        setMotion(next);
      }
      last = y;
    }
    function scroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  function chooseTheme(preference: ThemePreference) {
    const next =
      preference === "system"
        ? matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : preference;
    setThemePreference(preference);
    setTheme(next);
    applyDocumentTheme(next);
    try {
      localStorage.setItem("lameck-theme", preference);
    } catch {}
  }
  function toggle() {
    chooseTheme(theme === "dark" ? "light" : "dark");
  }
  function close() {
    dialog.current?.close();
    setMenuOpen(false);
    document.body.style.overflow = "";
    trigger.current?.focus();
  }
  function open() {
    setMenuOpen(true);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function revealNavigation() {
    flags.current.hidden = false;
    setMotion((previous) =>
      previous.hidden ? { ...previous, hidden: false } : previous,
    );
  }
  const themeIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" />
    </svg>
  );

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header
        ref={header}
        className={`capsule ${motion.compact ? "is-compact" : ""} ${motion.hidden && !menuOpen ? "is-hidden" : ""}`}
        onFocusCapture={revealNavigation}
      >
        <Link
          href="/#top"
          className="lo-monogram"
          aria-label="Lameck Orengo, back to top"
        >
          L<span>O</span>
        </Link>
        {!showContact ? (
          <span className="capsule-identity">Lameck Orengo</span>
        ) : null}
        <nav ref={nav} className="capsule-links" aria-label="Main navigation">
          <span className="active-pill" ref={pill} aria-hidden="true" />
          {links.map(([label, id]) => (
            <Link
              key={id}
              href={`/#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="capsule-theme"
          onClick={toggle}
          data-mode={theme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {themeIcon}
          <span className="capsule-theme-label">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
        {showContact ? (
          <a
            className="capsule-cta"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Lameck on WhatsApp (opens in a new tab)"
          >
            Contact{" "}
            <span aria-hidden="true">
              <LinkArrow />
            </span>
          </a>
        ) : null}
        <button
          ref={trigger}
          className="capsule-menu-toggle"
          onClick={open}
          aria-expanded={menuOpen}
          aria-controls="capsule-menu"
          aria-haspopup="dialog"
        >
          Menu <span aria-hidden="true">+</span>
        </button>
      </header>
      <dialog
        ref={dialog}
        id="capsule-menu"
        className="capsule-menu"
        aria-label="Navigation menu"
        onPointerDown={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          backdropPointer.current =
            event.target === event.currentTarget &&
            (event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom);
        }}
        onPointerCancel={() => {
          backdropPointer.current = false;
        }}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            backdropPointer.current &&
            event.target === event.currentTarget &&
            (event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom)
          )
            close();
          backdropPointer.current = false;
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          setMenuOpen(false);
          document.body.style.overflow = "";
        }}
      >
        <div className="capsule-menu-top">
          <span className="mono">Navigation</span>
          <button className="text-button" onClick={close}>
            Close ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {mobileLinks.map(([label, id], i) => (
            <Link key={id} href={`/#${id}`} onClick={close}>
              <span className="mono">0{i + 1}</span>
              {label}
              <span aria-hidden="true">
                <LinkArrow />
              </span>
            </Link>
          ))}
        </nav>
        <button
          className="menu-appearance"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span>Appearance</span>
          <span>
            {theme === "dark" ? "Dark" : "Light"} {themeIcon}
          </span>
        </button>
        <button
          className="menu-system-theme"
          onClick={() =>
            chooseTheme(
              themePreference === "system"
                ? (theme as "light" | "dark")
                : "system",
            )
          }
          aria-pressed={themePreference === "system"}
        >
          Use device appearance{" "}
          <span>{themePreference === "system" ? "On" : "Off"}</span>
        </button>
        <a
          className="menu-whatsapp"
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let’s talk on WhatsApp <LinkArrow />
        </a>
      </dialog>
    </>
  );
}
