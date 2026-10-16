import type { CSSProperties, ReactNode } from "react";

/**
 * Types for the vendored React Bits Dock (Dock.jsx). Without them TypeScript
 * infers `items` as `never[]` from the component's own default value.
 */
export type DockItemData = {
  icon?: ReactNode;
  label?: string;
  active?: boolean;
  badge?: ReactNode | number | boolean;
  className?: string;
  separator?: boolean;
  onClick?: () => void;
  menu?: unknown[];
};

export type DockProps = {
  items?: DockItemData[];
  position?: "bottom" | "top" | "left" | "right";
  theme?: "dark" | "light";
  baseItemSize?: number;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  gap?: number;
  roundness?: number;
  spring?: { mass?: number; stiffness?: number; damping?: number };
  bounce?: boolean;
  autoHide?: boolean;
  tiles?: boolean;
  showLabels?: boolean;
  showIndicators?: boolean;
  showBadges?: boolean;
  badgeColor?: string;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Dock(props: DockProps): JSX.Element;
