/** Line glyphs for the mobile dock. Drawn here, so no icon dependency. */
const PATHS: Record<string, string> = {
  robot:
    "M12 3.2v2.6M7.4 5.8h9.2a2 2 0 0 1 2 2v7.4a2 2 0 0 1-2 2H7.4a2 2 0 0 1-2-2V7.8a2 2 0 0 1 2-2M9.4 10.2v1.8M14.6 10.2v1.8M9.6 14.4h4.8M4 10.4H2.6M20 10.4h1.4M8.4 17.2v3.6M15.6 17.2v3.6",
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
