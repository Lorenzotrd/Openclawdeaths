import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenClaw Is Dead — Declared Dead Many Times. Still 335K Stars.",
  description:
    "Every time someone declared OpenClaw dead, it kept growing. Track every obituary, every critic, and watch the stars go up. Updated daily by an AI agent.",
  openGraph: {
    title: "OpenClaw Is Dead — Declared Dead Many Times. Still 335K Stars.",
    description:
      "Every time someone declared OpenClaw dead, it kept growing. Track every obituary, every critic, and watch the stars go up.",
    type: "website",
    siteName: "OpenClaw Is Dead",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw Is Dead — Declared dead 17 times, still alive with 335K stars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Is Dead — Declared Dead Many Times. Still 335K Stars.",
    description:
      "Every time someone declared OpenClaw dead, it kept growing. Track every obituary, every critic, and watch the stars go up.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://www.openclawdeaths.xyz"),
  icons: {
    icon: "/openclaw-logo.svg",
    apple: "/favicon.png",
  },
  keywords: [
    "OpenClaw",
    "OpenClaw is dead",
    "AI agent",
    "GitHub stars",
    "open source",
    "obituary tracker",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <footer className="py-6 mt-8">
          <div className="max-w-[1100px] mx-auto px-4 text-center">
            <p className="text-xs text-gray-400 tracking-widest uppercase">
              Made with <span className="text-red-500">&hearts;</span> by Lorenzo Trichard
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
