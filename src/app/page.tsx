import Header from "@/components/Header";
import StarsChart from "@/components/StarsChart";
import Newsletter from "@/components/Newsletter";
import obituaries from "@/data/obituaries.json";

async function getLiveStars(): Promise<number> {
  try {
    const res = await fetch("https://api.github.com/repos/openclaw/openclaw", {
      headers: { "User-Agent": "OpenClaw-Death-Tracker", Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.stargazers_count || 340000;
  } catch {
    return 340000;
  }
}

function formatStars(stars: number): string {
  return `${(stars / 1000).toFixed(0)}K`;
}

export default async function Home() {
  const liveStars = await getLiveStars();
  const count = obituaries.length;
  const categories = obituaries.reduce((acc, o) => {
    acc[o.category] = (acc[o.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const top10 = obituaries.slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "OpenClaw Death Declarations Tracker",
    description: `A dataset of ${count} public declarations that OpenClaw is dead, dying, or obsolete. Sourced exclusively from Twitter/X, scored on severity, and tracked against GitHub star count.`,
    creator: { "@type": "Person", name: "Lorenzo Trichard" },
    dateModified: new Date().toISOString().split("T")[0],
    measurementTechnique:
      "Manual curation of Twitter/X posts, scored 1-5 on severity. Only score 3+ published.",
    variableMeasured: "GitHub star count at time of death declaration",
    url: "https://www.openclawdeaths.xyz",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OpenClaw Is Dead",
    url: "https://www.openclawdeaths.xyz",
    description: `Tracking ${count} obituaries for OpenClaw. Declared dead, dangerous, and overhyped. Still alive with 335,000+ GitHub stars.`,
    creator: { "@type": "Person", name: "Lorenzo Trichard" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <Header />
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 pb-16">
          <h1 className="sr-only">OpenClaw Is Dead — Obituary Tracker</h1>
          <StarsChart obituaries={obituaries} liveStars={liveStars} />

          {/* Static data table for AI crawlers */}
          <div className="card p-5 md:p-8 mt-6">
            <h2 className="font-serif font-bold text-lg mb-1 text-gray-900">
              Recent Death Declarations
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              {count} total obituaries tracked &middot; {Object.keys(categories).length} categories &middot; Updated daily
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="pb-2 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Date</th>
                    <th className="pb-2 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Title</th>
                    <th className="pb-2 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Critic</th>
                    <th className="pb-2 text-[11px] text-gray-400 font-semibold uppercase tracking-wider text-right">Stars</th>
                    <th className="pb-2 text-[11px] text-gray-400 font-semibold uppercase tracking-wider text-right">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {top10.map((o) => (
                    <tr key={o.id} className="border-b border-gray-50">
                      <td className="py-2.5 text-xs text-gray-400 whitespace-nowrap">{o.date}</td>
                      <td className="py-2.5 text-xs text-gray-700 font-medium max-w-[300px] truncate">{o.title}</td>
                      <td className="py-2.5 text-xs text-gray-500">{o.author}</td>
                      <td className="py-2.5 text-xs text-accent font-bold text-right">{formatStars(o.githubStars)}</td>
                      <td className="py-2.5 text-right">
                        <span className="inline-block px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] rounded-full border border-gray-100 capitalize">
                          {o.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-300 mt-3 text-center">
              Showing 10 of {count} obituaries &middot;{" "}
              {Object.entries(categories).map(([cat, n], i) => (
                <span key={cat}>
                  {i > 0 && " · "}
                  <span className="capitalize">{cat}</span>: {n}
                </span>
              ))}
            </p>
          </div>

          <div className="mt-14">
            <Newsletter />
          </div>
        </div>
      </main>
    </>
  );
}
