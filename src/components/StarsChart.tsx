"use client";

import { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";

interface Obituary {
  id: string;
  date: string;
  title: string;
  githubStars: number;
  author: string;
  source: string;
}

ChartJS.register(
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

const timeFilters = [
  { label: "All", months: 0 },
  { label: "6M", months: 6 },
  { label: "3M", months: 3 },
  { label: "1M", months: 1 },
];

export default function StarsChart({
  obituaries,
  liveStars,
}: {
  obituaries: Obituary[];
  liveStars: number;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [scale, setScale] = useState<"linear" | "logarithmic">("linear");

  const currentStars = liveStars;
  const now = new Date();

  const filtered = useMemo(() => {
    const filter = timeFilters.find((f) => f.label === activeFilter)!;
    if (filter.months === 0) return obituaries;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - filter.months);
    return obituaries.filter((o) => new Date(o.date) >= cutoff);
  }, [activeFilter, obituaries]);

  const sorted = useMemo(
    () =>
      [...filtered].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [filtered]
  );

  const data = {
    datasets: [
      {
        label: "Stars Growth",
        data: sorted.map((o) => ({
          x: new Date(o.date).getTime(),
          y: o.githubStars,
        })),
        showLine: true,
        borderColor: "#e5e7eb",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.3,
        order: 2,
      },
      {
        label: "Obituaries",
        data: sorted.map((o) => ({
          x: new Date(o.date).getTime(),
          y: o.githubStars,
          title: o.title,
          author: o.author,
          source: o.source,
          dateStr: o.date,
        })),
        backgroundColor: "rgba(220, 38, 38, 0.85)",
        borderColor: "#ffffff",
        borderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointStyle: "circle",
        order: 1,
      },
      {
        label: "Current Stars",
        data: [{ x: now.getTime(), y: currentStars }],
        backgroundColor: "#16a34a",
        borderColor: "#ffffff",
        borderWidth: 2,
        pointRadius: 10,
        pointHoverRadius: 13,
        pointStyle: "circle",
        order: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "nearest" as const,
    },
    scales: {
      x: {
        type: "linear" as const,
        ticks: {
          callback: function (value: number | string) {
            const d = new Date(value as number);
            return d.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
          },
          maxTicksLimit: 8,
          color: "#d1d5db",
          font: { size: 11, family: "DM Sans" },
        },
        grid: { color: "rgba(0,0,0,0.03)", drawBorder: false },
        border: { display: false },
      },
      y: {
        type: scale as "linear" | "logarithmic",
        ticks: {
          callback: function (value: number | string) {
            const num = Number(value);
            if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
            return String(num);
          },
          color: "#d1d5db",
          font: { size: 11, family: "DM Sans" },
        },
        grid: { color: "rgba(0,0,0,0.03)", drawBorder: false },
        border: { display: false },
        min: scale === "logarithmic" ? 10000 : 0,
        max: Math.ceil(liveStars * 1.08 / 10000) * 10000,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (context: {
            raw: {
              title?: string;
              author?: string;
              source?: string;
              dateStr?: string;
              y?: number;
            };
            dataset: { label: string };
          }) {
            const raw = context.raw as {
              title?: string;
              author?: string;
              source?: string;
              dateStr?: string;
              y?: number;
            };
            if (context.dataset.label === "Current Stars") {
              return `Alive! ${(raw.y! / 1000).toFixed(0)}K stars today`;
            }
            if (raw.title) {
              return [
                raw.title,
                `${raw.source} — ${raw.author}`,
                `${(raw.y! / 1000).toFixed(0)}K stars on ${raw.dateStr}`,
              ];
            }
            return "";
          },
        },
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleFont: { size: 0 },
        bodyFont: { size: 12, family: "DM Sans" },
        padding: { x: 14, y: 10 },
        cornerRadius: 10,
        displayColors: false,
        bodySpacing: 4,
      },
    },
  };

  const count = obituaries.length;

  return (
    <div className="card p-5 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1.5">
          {timeFilters.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(f.label)}
              className={`btn-pill ${
                activeFilter === f.label
                  ? "btn-pill-active"
                  : "btn-pill-inactive"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {(["linear", "logarithmic"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`btn-pill ${
                scale === s ? "btn-pill-active" : "btn-pill-inactive"
              }`}
            >
              {s === "linear" ? "Linear" : "Log"}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[280px] md:h-[340px]">
        <Scatter data={data} options={options as never} />
      </div>

      <div className="border-t border-gray-100 mt-6 pt-8 pb-2 text-center space-y-2.5">
        <p className="text-base md:text-lg font-medium text-gray-800">
          OpenClaw has been declared dead{" "}
          <span className="font-bold text-accent">{count}</span> times.
        </p>
        <p className="text-base md:text-lg font-medium text-gray-800">
          If you mass-starred OpenClaw each time, you&apos;d have mass
          contributed to{" "}
          <span className="font-bold text-alive">{(liveStars / 1000).toFixed(0)}K+</span> stars today.
        </p>
        <p className="text-sm text-gray-400 pt-1">
          Updated daily by Lorenzo&apos;s OpenClaw AI Agent
        </p>
      </div>
    </div>
  );
}
