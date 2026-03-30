"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Chart", href: "/" },
  { label: "Timeline", href: "/posts" },
  { label: "Critics", href: "/critics" },
  { label: "Best Repos", href: "/best-repos" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="pt-10 md:pt-14 pb-8">
      <div className="max-w-[1100px] mx-auto px-4">
        <p className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 md:gap-4 font-serif font-black text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] text-gray-900 leading-tight tracking-tight hover:no-underline"
          >
            <Image
              src="/openclaw-logo.svg"
              alt="OpenClaw logo"
              width={56}
              height={56}
              className="w-11 h-11 md:w-14 md:h-14 animate-bounce-slow"
            />
            OpenClaw Is Dead
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2 mb-8">
          ...but it keeps coming back.
        </p>
        <nav className="flex justify-center gap-1 border-b border-gray-100">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative px-5 pb-3 pt-1 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-accent"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
