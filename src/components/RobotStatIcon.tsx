/**
 * One glyph per stat concept (hexapod gets a hexapod, a capit gets a claw),
 * not one generic icon reused everywhere. Same stroke language as NavIcon:
 * 24x24, currentColor, round caps/joins.
 */
const ICONS: Record<string, React.ReactNode> = {
  quadruped: (
    <>
      <circle cx="12" cy="12" r="2.1" />
      <line x1="12" y1="10" x2="7" y2="5" />
      <line x1="12" y1="10" x2="17" y2="5" />
      <line x1="12" y1="14" x2="7" y2="19" />
      <line x1="12" y1="14" x2="17" y2="19" />
    </>
  ),
  hexapod: (
    <>
      <polygon points="12,7 16,9.5 16,14.5 12,17 8,14.5 8,9.5" />
      <line x1="8" y1="9.5" x2="3" y2="7" />
      <line x1="8" y1="12" x2="2.3" y2="12" />
      <line x1="8" y1="14.5" x2="3" y2="17" />
      <line x1="16" y1="9.5" x2="21" y2="7" />
      <line x1="16" y1="12" x2="21.7" y2="12" />
      <line x1="16" y1="14.5" x2="21" y2="17" />
    </>
  ),
  sonar: (
    <>
      <line x1="5" y1="4" x2="5" y2="20" />
      <path d="M9 8a8 8 0 0 1 0 8" />
      <path d="M13 5a13 13 0 0 1 0 14" />
    </>
  ),
  flame: (
    <path d="M12 3c2 3-2 5-2 8a2 2 0 0 0 4 0c0-1-1-2-1-3 1 1 2 3 2 5a4 4 0 0 1-8 0c0-4 3-6 3-10z" />
  ),
  extinguisher: (
    <>
      <rect x="9" y="7" width="6" height="13" rx="1.3" />
      <rect x="10.5" y="3" width="3" height="4" rx="0.5" />
      <line x1="12" y1="3" x2="12" y2="1.5" />
      <line x1="9" y1="11" x2="6" y2="9" />
    </>
  ),
  "dual-mission": (
    <>
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M9 7l1.5-2.5h3L15 7" />
    </>
  ),
  frame: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9c-4-1.5-7-4.5-7-9V6z" />,
  laser: (
    <>
      <circle cx="4" cy="7" r="1.5" />
      <line x1="6" y1="7" x2="20" y2="7" />
      <circle cx="4" cy="17" r="1.5" />
      <line x1="6" y1="17" x2="20" y2="17" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.9" y1="4.9" x2="7" y2="7" />
      <line x1="17" y1="17" x2="19.1" y2="19.1" />
      <line x1="19.1" y1="4.9" x2="17" y2="7" />
      <line x1="7" y1="17" x2="4.9" y2="19.1" />
    </>
  ),
  servo: (
    <>
      <rect x="4" y="9" width="8" height="6" rx="1" />
      <path d="M16 12a4 4 0 1 1-1.2-2.9" />
      <path d="M16 7v3h-3" />
    </>
  ),
  claw: (
    <>
      <path d="M8 4c-3 2-4 6-2 10" />
      <path d="M16 4c3 2 4 6 2 10" />
      <path d="M6 14c2 3 4 5 6 6c2-1 4-3 6-6" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.3" />
      <line x1="9" y1="3" x2="9" y2="6" />
      <line x1="15" y1="3" x2="15" y2="6" />
      <line x1="9" y1="18" x2="9" y2="21" />
      <line x1="15" y1="18" x2="15" y2="21" />
      <line x1="3" y1="9" x2="6" y2="9" />
      <line x1="3" y1="15" x2="6" y2="15" />
      <line x1="18" y1="9" x2="21" y2="9" />
      <line x1="18" y1="15" x2="21" y2="15" />
    </>
  ),
  "mini-pc": (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.3" />
      <circle cx="9" cy="10.5" r="2" />
      <line x1="13" y1="8" x2="17" y2="8" />
      <line x1="13" y1="11" x2="17" y2="11" />
      <line x1="7" y1="16" x2="7" y2="19" />
      <line x1="17" y1="16" x2="17" y2="19" />
    </>
  ),
  star: <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />,
};

export default function RobotStatIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] ?? null}
    </svg>
  );
}
