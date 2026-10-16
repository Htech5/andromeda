import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.wordmark} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 10, color: "#FF0303" }}>
          {site.kicker}
        </div>
        <div style={{ fontSize: 150, letterSpacing: -6, lineHeight: 1 }}>
          {site.wordmark}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24 }}>
          <div style={{ width: 160, height: 6, background: "#FF0303" }} />
          <div style={{ fontSize: 34, letterSpacing: 6 }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
