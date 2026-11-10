/** M31 Enterprise 2026/2027. Sumber: proposal sponsorship, halaman spesifikasi robot. */
export const robot = {
  model: "M31 ENTERPRISE",
  generation: "2026 / 2027 MODEL",
  dimensions: "± 30 × 30 × 30 cm",
  weight: "± 3,7 kg",
} as const;

export type Unit = {
  id: string;
  name: string;
  /** Short tag under the name, game-menu style. */
  tag: string;
  src: string;
  width: number;
  height: number;
  /** Not built yet: the stage stamps it "coming soon". */
  soon?: boolean;
};

/** Garage order = generation order, oldest first. */
export const garage: Unit[] = [
  { id: "fun-bot", name: "Fun Bot", tag: "Gen 01", src: "/images/robot/fun-bot.png", width: 954, height: 1200 },
  { id: "perseus-1-0", name: "Perseus 1.0", tag: "Gen 02", src: "/images/robot/perseus-1-0.png", width: 1118, height: 1200 },
  { id: "perseus-1-1", name: "Perseus 1.1", tag: "Gen 03", src: "/images/robot/perseus-1-1.png", width: 1187, height: 1200 },
  { id: "perseus-2-0", name: "Perseus 2.0", tag: "Gen 04", src: "/images/robot/perseus-2-0.png", width: 1200, height: 1174 },
  { id: "perseus-3-0", name: "Perseus 3.0", tag: "Gen 05", src: "/images/robot/perseus-3-0.png", width: 1200, height: 1125 },
  { id: "perseus-ultimate", name: "Perseus Ultimate", tag: "Gen 06", src: "/images/robot/perseus-ultimate.png", width: 1123, height: 1200 },
  { id: "m31", name: "M31 Enterprise", tag: "Gen 07 · 2026", src: "/images/m31-iso.webp", width: 930, height: 1200, soon: true },
];
