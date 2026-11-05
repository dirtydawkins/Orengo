import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";

const arrows = {
  "up-right": ArrowUpRight,
  down: ArrowDown,
  left: ArrowLeft,
  right: ArrowRight,
  up: ArrowUp,
};

/** Decorative Lucide SVGs, sized like the text arrows they replace. */
export function LinkArrow({
  direction = "up-right",
}: {
  direction?: keyof typeof arrows;
}) {
  const Icon = arrows[direction];
  return (
    <Icon
      className="link-arrow"
      size="1em"
      viewBox={direction === "up-right" ? "4 4 16 16" : "2 2 20 20"}
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
    />
  );
}
