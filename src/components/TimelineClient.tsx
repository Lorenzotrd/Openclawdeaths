"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface Obituary {
  id: string;
  date: string;
  title: string;
  source: string;
  sourceUrl: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  authorUrl: string;
  quote: string;
  githubStars: number;
  category: string;
}

function formatStars(stars: number): string {
  return `${(stars / 1000).toFixed(0)}K`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMonthYear(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    year: d.getFullYear().toString(),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    key: `${d.getFullYear()}-${d.getMonth()}`,
  };
}

function Avatar({ src, name }: { src: string; name: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={24}
        height={24}
        className="rounded-full object-cover inline-block"
        style={{ width: 24, height: 24 }}
      />
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[10px] font-bold text-gray-400 uppercase">
      {name.charAt(0)}
    </span>
  );
}

export default function TimelineClient({
  obituaries,
}: {
  obituaries: Obituary[];
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(50);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const list = obituaries.filter(
      (o) =>
        !q ||
        o.title.toLowerCase().includes(q) ||
        o.author.toLowerCase().includes(q) ||
        o.quote.toLowerCase().includes(q) ||
        o.source.toLowerCase().includes(q)
    );
    return list.sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });
  }, [search, sortOrder, obituaries]);

  let lastMonthKey = "";

  return (
    <div>
      <div className="mb-6 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search obituaries, critics, or quotes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm
                     placeholder:text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 focus:bg-white
                     transition-all duration-200"
        />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-1.5">
          {(["newest", "oldest"] as const).map((order) => (
            <button
              key={order}
              onClick={() => setSortOrder(order)}
              className={`btn-pill capitalize ${
                sortOrder === order ? "btn-pill-active" : "btn-pill-inactive"
              }`}
            >
              {order}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-gray-300 font-medium tracking-widest uppercase">
          {filtered.length} obituaries found
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-[4.75rem] top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent hidden md:block" />

        {filtered.slice(0, visibleCount).map((obit, i) => {
          const { year, month, key } = getMonthYear(obit.date);
          const showMarker = key !== lastMonthKey;
          lastMonthKey = key;

          return (
            <div
              key={obit.id}
              className="flex gap-4 md:gap-6 mb-4"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="w-14 md:w-16 flex-shrink-0 text-right pt-5 hidden md:block">
                {showMarker && (
                  <div>
                    <div className="text-xs font-bold text-gray-900 leading-tight">
                      {year}
                    </div>
                    <div className="text-[10px] font-semibold text-gray-300 uppercase">
                      {month}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative flex-shrink-0 w-px hidden md:block">
                <div className="absolute top-5 -left-[4px] w-[9px] h-[9px] rounded-full bg-accent ring-[3px] ring-white" />
              </div>

              <Link
                href={`/posts/${obit.id}`}
                className="flex-1 card card-hover p-5 md:p-6 block cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] text-gray-300 font-medium">
                    {formatDate(obit.date)}
                  </span>
                  <span className="text-xs font-bold text-accent tabular-nums">
                    {formatStars(obit.githubStars)} stars
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base md:text-lg text-gray-900 mb-2 leading-snug">
                  {obit.title}
                </h3>
                <span className="inline-block px-2.5 py-0.5 bg-gray-50 text-gray-500 text-[11px] rounded-full font-medium mb-3 border border-gray-100">
                  {obit.source}
                </span>
                <blockquote className="border-l-2 border-accent/40 pl-4 italic text-sm text-gray-500 mb-3 leading-relaxed">
                  &ldquo;{obit.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2">
                  <Avatar src={obit.authorAvatar || ""} name={obit.author} />
                  <p className="text-xs text-gray-400">
                    <span className="font-medium text-gray-600">{obit.author}</span>
                    {obit.authorTitle && (
                      <span className="text-gray-300">
                        {" "}&mdash; {obit.authorTitle}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {filtered.length > visibleCount && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((c) => c + 50)}
            className="px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg
                       hover:bg-red-700 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-1"
          >
            Show more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
