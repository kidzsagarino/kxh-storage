import React from "react";
import {
  Package,
  Truck,
  Boxes,
  FileText,
  Scissors,
  type LucideIcon,
} from "lucide-react";

type IconName =
  | "packaging"
  | "removals"
  | "businessStorage"
  | "inventory"
  | "pallet"
  | "commercial"
  | "shredding"
  | "warehouseStorage";

type IconSet = "lucide" | "kxh";

type IconProps = {
  name: IconName;
  set?: IconSet;
  size?: number;
  className?: string;
  strokeWidth?: number;
  title?: string;
};

/** ---------- KXH ICONS ---------- */

function KxhPackaging(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M3 7l9 5 9-5" />
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
      <path d="M12 12v9" />
    </svg>
  );
}

function KxhRemovals(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M2 8h12v8H2z" />
      <path d="M14 10h4l4 4v2h-8z" />
      <path d="M6 16a2 2 0 1 0 0 4a2 2 0 0 0 0-4z" />
      <path d="M18 16a2 2 0 1 0 0 4a2 2 0 0 0 0-4z" />
    </svg>
  );
}

function KxhStorage(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M3 4h18v16H3z" />
      <path d="M7 8h4v4H7z" />
      <path d="M13 8h4v4h-4z" />
    </svg>
  );
}

function KxhShredding(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M8 13v7M12 13v7M16 13v7" />
    </svg>
  );
}

function KxhBusinessStorage(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function KxhInventory(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M4 7h16v14H4z" />
      <path d="M4 7l8-4 8 4" />
    </svg>
  );
}

function KxhPallet(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M3 18h18" />
      <path d="M5 18V9h14v9" />
    </svg>
  );
}

function KxhCommercial(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M3 21h18" />
      <path d="M5 21V5h14v16" />
    </svg>
  );
}

/** ---------- LUCIDE MAP ---------- */
const lucideMap: Record<IconName, LucideIcon> = {
  packaging: Package,
  removals: Truck,
  businessStorage: Boxes,
  inventory: Boxes,
  pallet: Boxes,
  commercial: Boxes,
  shredding: FileText,
  warehouseStorage: Boxes,
};

/** ---------- COMPONENT ---------- */
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

  /** ---------- KXH MODE ---------- */
  if (set === "kxh") {
    const Kxh =
      name === "packaging"
        ? KxhPackaging
        : name === "removals"
        ? KxhRemovals
        : name === "businessStorage"
        ? KxhBusinessStorage
        : name === "inventory"
        ? KxhInventory
        : name === "pallet"
        ? KxhPallet
        : name === "commercial"
        ? KxhCommercial
        : KxhShredding;

    return (
      <span className="relative inline-flex" aria-label={title ?? name}>
        <Kxh size={size} className={classNames} />
      </span>
    );
  }

  /** ---------- LUCIDE MODE ---------- */
  const Lucide = lucideMap[name];

  if (!Lucide) return null;

  /** shredding special */
  if (name === "shredding") {
    return (
      <span className="relative inline-flex" aria-label={title ?? "Shredding"}>
        <Lucide
          size={size}
          strokeWidth={strokeWidth}
          className={classNames}
        />
        <Scissors
          size={Math.round(size * 0.72)}
          strokeWidth={strokeWidth}
          className="absolute -right-1 -bottom-1 text-current opacity-70 transition-transform duration-200 ease-out group-hover:rotate-6"
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