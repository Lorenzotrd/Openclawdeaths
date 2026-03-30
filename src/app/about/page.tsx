import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import obituaries from "@/data/obituaries.json";

export const metadata: Metadata = {
  title: "About — OpenClaw Is Dead",
  description:
    "What is OpenClaw Is Dead? How we track every obituary, methodology, and why we built this site.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — OpenClaw Is Dead",
    description:
      "What is OpenClaw Is Dead? How we track every obituary and why we built this site.",
    url: "/about",
  },
};

export default function AboutPage() {
  const count = obituaries.length;
  const sources = new Set(obituaries.map((o) => o.source));
  const critics = new Set(obituaries.map((o) => o.author));
  const dates = obituaries.map((o) => new Date(o.date).getTime());
  const earliest = new Date(Math.min(...dates));
  const latest = new Date(Math.max(...dates));
  const months = Math.ceil(
    (latest.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-[720px] mx-auto px-4 md:px-6 pb-16">
        <div className="text-center mb-12">
          <h1 className="font-serif font-black text-3xl md:text-4xl mb-2 text-gray-900">
            About OpenClaw Is Dead
          </h1>
          <p className="text-sm text-gray-300">
            Last updated: March 26, 2026 &middot; Database contains {count}{" "}
            obituaries
          </p>
        </div>

        <div className="card p-5 md:p-6 mb-12 border-l-[3px] border-accent/40">
          <p className="text-sm font-medium text-gray-700 leading-relaxed">
            <strong>TL;DR:</strong> OpenClaw has been declared dead {count} times
            since January 2026. It now has 335,000+ GitHub stars. This site
            documents every death declaration, the critic who made it, and how
            many stars OpenClaw had at the time. Data is sourced exclusively from
            Twitter/X and updated daily by an AI agent.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-serif font-bold text-xl mb-4 text-gray-900">
            What is OpenClaw Is Dead?
          </h2>
          <p className="text-gray-500 mb-4 leading-[1.75]">
            OpenClaw Is Dead is a comprehensive tracker of every time OpenClaw
            &mdash; the open-source AI agent framework &mdash; has been declared
            dead, irrelevant, dangerous, or doomed. From security researchers to
            tech columnists, from Hacker News commenters to VC partners, everyone
            has had their turn burying OpenClaw.
          </p>
          <p className="text-gray-500 leading-[1.75]">
            Browse the{" "}
            <Link href="/posts" className="text-accent hover:underline font-medium">
              timeline
            </Link>{" "}
            to read every obituary, view the{" "}
            <Link href="/" className="text-accent hover:underline font-medium">
              chart
            </Link>{" "}
            to see deaths plotted against GitHub stars, or check the{" "}
            <Link href="/critics" className="text-accent hover:underline font-medium">
              critics leaderboard
            </Link>{" "}
            to see who&apos;s declared OpenClaw dead the most.
          </p>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { value: count, label: "Obituaries" },
            { value: months, label: "Months" },
            { value: critics.size, label: "Critics" },
            { value: sources.size, label: "Publications" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card p-5 text-center"
            >
              <div className="text-3xl font-black text-accent leading-none">
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-300 font-semibold mt-2 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="font-serif font-bold text-xl mb-4 text-gray-900">
            Why track OpenClaw deaths?
          </h2>
          <p className="text-gray-500 mb-4 leading-[1.75]">
            OpenClaw crossed 335,000 GitHub stars faster than almost any project
            in open-source history. Despite this, it has been relentlessly
            declared dead &mdash; for security flaws, lack of enterprise
            adoption, competition from commercial tools, and plain old hype
            fatigue.
          </p>
          <p className="text-gray-500 leading-[1.75]">
            The pattern is clear: OpenClaw keeps getting declared dead, and it
            keeps growing. This site exists to document that pattern and to
            celebrate the resilience of open-source communities.
          </p>
        </section>

        <section>
          <h2 className="font-serif font-bold text-xl mb-4 text-gray-900">
            Methodology
          </h2>
          <p className="text-gray-500 mb-4 leading-[1.75]">
            <strong className="text-gray-700">Inclusion criteria:</strong> An
            article, post, or comment qualifies as an &quot;obituary&quot; if it
            explicitly declares OpenClaw dead, dying, doomed, obsolete, or
            irrelevant &mdash; not merely critical of a specific feature or bug.
          </p>
          <p className="text-gray-500 leading-[1.75]">
            <strong className="text-gray-700">Data collection:</strong>{" "}
            Obituaries are sourced from Twitter/X. Each entry is
            manually verified and linked to the original source where possible.
            Updated daily by an AI agent.
          </p>
        </section>
      </div>
    </main>
  );
}
