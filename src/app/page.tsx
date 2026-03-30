import Header from "@/components/Header";
import StarsChart from "@/components/StarsChart";
import Newsletter from "@/components/Newsletter";
import obituaries from "@/data/obituaries.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 pb-16">
        <h1 className="sr-only">OpenClaw Is Dead — Obituary Tracker</h1>
        <StarsChart obituaries={obituaries} />

        <div className="mt-14">
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
