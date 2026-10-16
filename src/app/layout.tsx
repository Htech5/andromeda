import type { Metadata, Viewport } from "next";
import { Oxanium, JetBrains_Mono } from "next/font/google";
import BootScreen from "@/components/BootScreen";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/site";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./components.css";

const display = Oxanium({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.wordmark} — UNDIP SAR Team`,
  description: site.description,
  keywords: [
    "KSTI 2026",
    "KRSRI",
    "robot SAR",
    "legged robot",
    "hexapod",
    "Undip",
    site.name,
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.wordmark,
    title: `${site.wordmark} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.wordmark} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the inline script below adds a `js` class to
    // <html> before React hydrates, so server and client markup differ by design.
    <html
      lang="id"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal animations only run when JS is on; without it content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body
        style={
          {
            "--font-body":
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          } as React.CSSProperties
        }
      >
        <BootScreen />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
