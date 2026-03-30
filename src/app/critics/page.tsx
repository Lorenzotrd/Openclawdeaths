import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import obituaries from "@/data/obituaries.json";

export const metadata: Metadata = {
  title: "Critics Leaderboard — Who Declared OpenClaw Dead the Most",
  description:
    "Ranked leaderboard of critics who declared OpenClaw dead the most times. See who leads the death count.",
  alternates: { canonical: "/critics" },
  openGraph: {
    title: "Critics Leaderboard — Who Declared OpenClaw Dead the Most",
    description:
      "Ranked leaderboard of critics who declared OpenClaw dead the most times.",
    url: "/critics",
  },
};

interface CriticData {
  author: string;
  authorTitle: string;
  authorAvatar: string;
  authorUrl: string;
  count: number;
  latestQuote: string;
  obituaryIds: string[];
}

function getCritics(): CriticData[] {
  const map = new Map<string, CriticData>();
  for (const o of obituaries) {
    const existing = map.get(o.author);
    if (existing) {
      existing.count++;
      existing.obituaryIds.push(o.id);
      if (!existing.latestQuote) existing.latestQuote = o.quote;
    } else {
      map.set(o.author, {
        author: o.author,
        authorTitle: o.authorTitle,
        authorAvatar: o.authorAvatar || "",
        authorUrl: o.authorUrl || "",
        count: 1,
        latestQuote: o.quote,
        obituaryIds: [o.id],
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

function getRankDisplay(rank: number): {
  badge: string;
  color: string;
} {
  if (rank === 1) return { badge: "1", color: "bg-amber-400 text-white" };
  if (rank === 2) return { badge: "2", color: "bg-gray-300 text-white" };
  if (rank === 3) return { badge: "3", color: "bg-amber-600 text-white" };
  return { badge: String(rank), color: "bg-gray-100 text-gray-500" };
}

function Avatar({ src, name, size = 40 }: { src: string; name: string; size?: number }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 uppercase flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {name.charAt(0)}
    </div>
  );
}

export default function CriticsPage() {
  const critics = getCritics();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-[800px] mx-auto px-4 md:px-6 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-serif font-black text-3xl md:text-4xl mb-2 text-gray-900">
            Critics Leaderboard
          </h1>
          <p className="text-gray-400 text-sm">
            The top critics who have declared OpenClaw dead the most times.
          </p>
          <p className="text-[11px] text-gray-300 mt-2 tracking-wide">
            {critics.length} critics tracked &middot; Last updated: Mar 26,
            2026
          </p>
        </div>

        <div className="space-y-2.5">
          {critics.map((critic, i) => {
            const rank = getRankDisplay(i + 1);
            const Wrapper = critic.authorUrl ? "a" : "div";
            const wrapperProps = critic.authorUrl
              ? { href: critic.authorUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <div
                key={critic.author}
                className="card card-hover flex items-center gap-4 p-4 md:p-5"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${rank.color}`}
                >
                  {rank.badge}
                </div>

                <Wrapper
                  {...wrapperProps}
                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                >
                  <Avatar src={critic.authorAvatar} name={critic.author} />

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 flex items-center gap-1.5">
                      {critic.author}
                      {critic.authorUrl && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      )}
                    </div>
                    {critic.authorTitle && (
                      <div className="text-[11px] text-gray-300">
                        {critic.authorTitle}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 italic mt-1 truncate leading-relaxed">
                      &ldquo;{critic.latestQuote}&rdquo;
                    </p>
                  </div>
                </Wrapper>

                <Link
                  href={`/posts/${critic.obituaryIds[0]}`}
                  className="text-right flex-shrink-0 pl-4 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="text-2xl font-black text-accent leading-none">
                    {critic.count}
                  </div>
                  <div className="text-[10px] font-semibold text-gray-300 uppercase tracking-widest mt-0.5">
                    {critic.count === 1 ? "Death" : "Deaths"}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
