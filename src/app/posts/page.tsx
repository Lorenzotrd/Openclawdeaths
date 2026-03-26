import Header from "@/components/Header";
import TimelineClient from "@/components/TimelineClient";
import obituaries from "@/data/obituaries.json";

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
