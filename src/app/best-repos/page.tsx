import type { Metadata } from "next";
import Header from "@/components/Header";
import repos from "@/data/best-repos.json";

export const metadata: Metadata = {
  title: "Best Repos to Use with OpenClaw — Top GitHub Projects",
  description:
    "The top 10 open-source repos where OpenClaw shines. From Next.js to FastAPI, find the best projects to build with OpenClaw.",
  alternates: { canonical: "/best-repos" },
  openGraph: {
    title: "Best Repos to Use with OpenClaw — Top GitHub Projects",
    description:
      "The top 10 open-source repos where OpenClaw shines.",
    url: "/best-repos",
  },
};

function formatStars(stars: number): string {
  if (stars >= 1000000) return `${(stars / 1000000).toFixed(1)}M`;
  return `${(stars / 1000).toFixed(0)}K`;
}

function getRankDisplay(rank: number): { color: string } {
  if (rank === 1) return { color: "bg-amber-400 text-white" };
  if (rank === 2) return { color: "bg-gray-300 text-white" };
  if (rank === 3) return { color: "bg-amber-600 text-white" };
  return { color: "bg-gray-100 text-gray-500" };
}

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Rust: "bg-orange-600",
};

const difficultyColors: Record<string, string> = {
  Beginner: "text-alive bg-alive/10",
  Intermediate: "text-amber-600 bg-amber-50",
  Advanced: "text-accent bg-accent/10",
};

export default function BestReposPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-[900px] mx-auto px-4 md:px-6 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-serif font-black text-3xl md:text-4xl mb-2 text-gray-900">
            Best Repos to Use with OpenClaw
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            The top open-source projects where OpenClaw shines. Clone one, point OpenClaw at it, and start building.
          </p>
        </div>

        <div className="space-y-2.5">
          {repos.map((repo) => {
            const rank = getRankDisplay(repo.rank);

            return (
              <a
                key={repo.fullName}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex items-start gap-4 p-5 md:p-6 cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${rank.color}`}
                >
                  {repo.rank}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900">
                      {repo.name}
                    </span>
                    <span className="text-[11px] text-gray-300">
                      {repo.fullName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${difficultyColors[repo.difficulty]}`}>
                      {repo.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${langColors[repo.language] || "bg-gray-300"}`} />
                      <span className="text-[11px] text-gray-400">{repo.language}</span>
                    </div>
                    {repo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] rounded-full border border-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right flex-shrink-0 pl-2">
                  <div className="flex items-center gap-1 text-gray-900">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-sm font-bold">{formatStars(repo.stars)}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
