/**
 * Line glyphs for the mobile dock. Drawn here, so no icon dependency.
 *
 * `robot` is the M31 seen from above, traced to the real silhouette: oval body,
 * six legs, sensor box on the right. A trace of the CAD mesh turns to mush at
 * 26px, so it is redrawn as strokes that stay crisp at any size.
 */
const PATHS: Record<string, string> = {
  robot:
    "M17.4 12a6 4.5 0 0 1-12 0 6 4.5 0 0 1 12 0M19.2 10.3h2.3v3.4h-2.3M6.9 8.8 4.3 6.2M3.3 7.2l2-2M11.4 7.5v-3M10.1 4h2.6M15.9 8.8l2.6-2.6M17.5 5.2l2 2M6.9 15.2l-2.6 2.6M3.3 16.8l2 2M11.4 16.5v3M10.1 20h2.6M15.9 15.2l2.6 2.6M17.5 18.8l2-2",
  team: "M9 11.4a3 3 0 1 0 0-6 3 3 0 0 0 0 6M3.4 19.6a5.6 5.6 0 0 1 11.2 0M15.8 5.8a3 3 0 0 1 0 5.6M17.2 14.6a5.6 5.6 0 0 1 3.4 5",
  award:
    "M12 14.2a4.6 4.6 0 1 0 0-9.2 4.6 4.6 0 0 0 0 9.2M8.6 13.4 7 21l5-2.6L17 21l-1.6-7.6",
  deal: "M3 9.4 6.6 6l3.4 2.8 2.6-1 3.2 1.4M21 9.4 17.4 6M7.4 13.2l2.4 2.2M10.4 11.4l3 2.8M13.6 10.2l3.2 3M6.6 6v9.6M17.4 6v9.6M9.6 17.6l1.6 1.4a1.6 1.6 0 0 0 2.2-2.3",
};

export default function NavIcon({ name }: { name: string }) {
  return (
    <svg
      className="dock__glyph"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
