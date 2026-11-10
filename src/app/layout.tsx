import type { Metadata, Viewport } from "next";
import { Oxanium, JetBrains_Mono, Outfit, Silkscreen } from "next/font/google";
import BootScreen from "@/components/BootScreen";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
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

// The warm voice, against Oxanium's engineering one and the mono's captions:
// the sponsorship invitation and the footer. Variable, so every weight the two
// of them use costs a single file.
const invite = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-warm",
});

// Pixel voice for the robot garage only.
const pixel = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-pixel",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Vercel keeps serving the project's *.vercel.app host after a custom domain
  // is attached, so without this every page exists at two addresses and the
  // two compete. The canonical names andromedaundip.org as the real one.
  alternates: { canonical: "/" },
  title: {
    default: `${site.wordmark} — Tim Robot SAR Universitas Diponegoro`,
    template: `%s — ${site.wordmark}`,
  },
  description: site.description,
  applicationName: site.wordmark,
  authors: [{ name: `${site.name} Robotis Universitas Diponegoro`, url: site.url }],
  creator: `${site.name} Robotis Universitas Diponegoro`,
  publisher: "Universitas Diponegoro",
  category: "technology",
  keywords: [
    "Andromeda Undip",
    "Andromeda Robotis",
    "tim robot Undip",
    "robotik Universitas Diponegoro",
    "KSTI 2026",
    "KRSRI",
    "robot SAR",
    "robot search and rescue",
    "legged robot",
    "hexapod",
    "URDC Undip",
    site.name,
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: site.url,
    siteName: site.wordmark,
    title: `${site.wordmark} — Tim Robot SAR Universitas Diponegoro`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.wordmark} — Tim Robot SAR Universitas Diponegoro`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
      className={`${display.variable} ${invite.variable} ${mono.variable} ${pixel.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal animations only run when JS is on; without it content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <StructuredData />
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
