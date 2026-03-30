import type { Metadata } from "next";
import Header from "@/components/Header";
import TimelineClient from "@/components/TimelineClient";
import obituaries from "@/data/obituaries.json";

export const metadata: Metadata = {
  title: "Timeline — Every OpenClaw Obituary",
  description:
    "Browse every time OpenClaw was declared dead, in chronological order. Search by critic, quote, or category.",
  alternates: { canonical: "/posts" },
  openGraph: {
    title: "Timeline — Every OpenClaw Obituary",
    description:
      "Browse every time OpenClaw was declared dead, in chronological order.",
    url: "/posts",
  },
};

export default function PostsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-[1100px] mx-auto px-4 pb-16">
        <TimelineClient obituaries={obituaries} />
      </div>
    </main>
  );
}
