"use client";

import {
  Children,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";

type Turn = {
  open: boolean;
  frame: number;
  timer: ReturnType<typeof setTimeout> | null;
};

/** Native details when JS/motion is unavailable; a measured CSS slide otherwise. */
export function Disclosure({
  children,
  onClick,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"details">) {
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLDetailsElement>(null);
  const turn = useRef<Turn | null>(null);
  const nodes = Children.toArray(children);

  function cancel() {
    const current = turn.current;
    if (!current) return;
    cancelAnimationFrame(current.frame);
    if (current.timer !== null) clearTimeout(current.timer);
    turn.current = null;
  }

  function finish() {
    const current = turn.current;
    if (!current || !details.current || !panel.current) return;
    const open = current.open;
    cancel();
    details.current.open = open;
    panel.current.style.height = "";
    panel.current.style.overflow = "";
    panel.current.inert = false;
    panel.current.removeAttribute("aria-hidden");
    details.current.querySelector("summary")?.removeAttribute("aria-expanded");
  }

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const stopMotion = () => {
      if (preference.matches) finish();
    };
    preference.addEventListener("change", stopMotion);
    return () => {
      preference.removeEventListener("change", stopMotion);
      cancel();
    };
  }, []);

  function toggle(event: MouseEvent<HTMLDetailsElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !(event.target instanceof Element)) return;
    const summary = event.target.closest("summary");
    if (
      summary?.parentElement !== event.currentTarget ||
      event.target.closest("a, button, input, select, textarea")
    )
      return;
    const element = details.current,
      content = panel.current,
      inner = body.current;
    if (!element || !content || !inner) return;
    event.preventDefault();
    const open = !(turn.current?.open ?? element.open);
    const height = content.getBoundingClientRect().height;
    cancel();
    const time = getComputedStyle(content)
      .transitionDuration.split(",")[0]
      .trim();
    const duration = parseFloat(time) * (time.endsWith("ms") ? 1 : 1000);
    summary.setAttribute("aria-expanded", String(open));
    content.inert = !open;
    content.setAttribute("aria-hidden", String(!open));
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      element.open = open;
      content.style.height = "";
      content.style.overflow = "";
      content.inert = false;
      content.removeAttribute("aria-hidden");
      summary.removeAttribute("aria-expanded");
      return;
    }
    // Freeze the current height before retargeting, including a mid-turn click.
    content.style.transitionProperty = "none";
    content.style.height = `${height}px`;
    content.style.overflow = "hidden";
    element.open = true;
    void content.offsetHeight;
    content.style.transitionProperty = "";
    const current: Turn = { open, frame: 0, timer: null };
    turn.current = current;
    current.frame = requestAnimationFrame(() => {
      if (turn.current !== current) return;
      content.style.height = `${open ? inner.getBoundingClientRect().height : 0}px`;
      current.timer = setTimeout(finish, duration + 80);
    });
  }

  return (
    <details
      {...props}
      ref={details}
      className={`smooth-disclosure ${className}`}
      onClick={toggle}
    >
      {nodes[0]}
      <div
        className="disclosure-panel"
        ref={panel}
        onTransitionEnd={(event) => {
          if (event.target === panel.current && event.propertyName === "height")
            finish();
        }}
      >
        <div className="disclosure-body" ref={body}>
          {nodes.slice(1)}
        </div>
      </div>
    </details>
  );
}
