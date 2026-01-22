import React from "react";
import {
  Package,
  Truck,
  Boxes,
  FileText,
  Scissors,
  type LucideIcon,
} from "lucide-react";

type IconName = "packaging" | "removals" | "storage" | "shredding";
type IconSet = "lucide" | "kxh";

type IconProps = {
  name: IconName;
  set?: IconSet;
  size?: number;
  className?: string;
  strokeWidth?: number;
  title?: string;
};

/** ---------- KXH custom angular icons (square caps & sharper joins) ---------- */
function KxhPackaging({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M3 7l9 5 9-5" />
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
      <path d="M12 12v9" />
      <path d="M7.5 5.5l9 5" opacity="0.4" />
    </svg>
  );
}

function KxhRemovals({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M2 8h12v8H2z" />
      <path d="M14 10h4l4 4v2h-8z" />
      <path d="M6 16a2 2 0 1 0 0 4a2 2 0 0 0 0-4z" />
      <path d="M18 16a2 2 0 1 0 0 4a2 2 0 0 0 0-4z" />
      <path d="M3 6h6" opacity="0.4" />
      <path d="M1 10h1" opacity="0.4" />
    </svg>
  );
}

function KxhStorage({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M3 4h18v16H3z" />
      <path d="M7 8h4v4H7z" />
      <path d="M13 8h4v4h-4z" />
      <path d="M7 14h10" opacity="0.5" />
      <path d="M3 20h18" opacity="0.4" />
    </svg>
  );
}

function KxhShredding({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v6h6" />
      <path d="M8 13v7M12 13v7M16 13v7" />
      {/* small “cut” hint */}
      <path d="M7.5 12l9 0" opacity="0.35" />
    </svg>
  );
}

/** ---------- Lucide mapping ---------- */
const lucideMap: Record<IconName, LucideIcon> = {
  packaging: Package,
  removals: Truck,
  storage: Boxes, // (Warehouse is not guaranteed in every Lucide version)
  shredding: FileText, // we’ll add a Scissors overlay for shredding
};

/** ---------- Component ---------- */
export function Icon({
  name,
  set = "lucide",
  size = 24,
  className = "",
  strokeWidth = 1.8,
  title,
}: IconProps) {
  const base =
    "inline-block transition-transform duration-200 ease-out will-change-transform";
  const hover = "group-hover:-translate-y-0.5 group-hover:scale-[1.04]";
  const spinHint = name === "removals" ? "group-hover:translate-x-0.5" : "";
  const classNames = `${base} ${hover} ${spinHint} ${className}`;

  // KXH angular style (matches your logo’s sharper geometry)
  if (set === "kxh") {
    const Kxh =
      name === "packaging"
        ? KxhPackaging
        : name === "removals"
        ? KxhRemovals
        : name === "storage"
        ? KxhStorage
        : KxhShredding;

    return (
      <span className="relative inline-flex" aria-label={title ?? name}>
        <Kxh size={size} className={classNames} />
      </span>
    );
  }

  // Lucide style (modern rounded outline)
  const Lucide = lucideMap[name];

  // For shredding, overlay scissors subtly (aligned + animated)
  if (name === "shredding") {
    return (
      <span className="relative inline-flex" aria-label={title ?? "Shredding"}>
        <Lucide
          size={size}
          strokeWidth={strokeWidth}
          className={classNames}
          aria-hidden="true"
        />
        <Scissors
          size={Math.round(size * 0.72)}
          strokeWidth={strokeWidth}
          className={
            "absolute -right-1 -bottom-1 text-current opacity-70 " +
            "transition-transform duration-200 ease-out group-hover:rotate-6"
          }
          aria-hidden="true"
        />
      </span>
    );
  }

  return (
    <Lucide
      size={size}
      strokeWidth={strokeWidth}
      className={classNames}
      aria-label={title ?? name}
    />
  );
}
