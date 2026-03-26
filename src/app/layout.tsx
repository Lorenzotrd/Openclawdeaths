import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenClaw Is Dead — Every OpenClaw Obituary Since 2025",
  description:
    "Tracking 17 obituaries for OpenClaw. Declared dead, dangerous, and overhyped. Still alive with 335,000+ GitHub stars.",
  openGraph: {
    title: "OpenClaw Is Dead — Every OpenClaw Obituary Since 2025",
    description:
      "Tracking 17 obituaries for OpenClaw. Declared dead, dangerous, and overhyped. Still alive with 335,000+ GitHub stars.",
    type: "website",
  },
  metadataBase: new URL("https://openclawdeaths.com"),
  icons: {
    icon: "/openclaw-logo.svg",
    apple: "/favicon.png",
  },
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
