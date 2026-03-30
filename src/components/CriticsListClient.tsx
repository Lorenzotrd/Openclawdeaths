"use client";

import { useState } from "react";

const INITIAL_COUNT = 50;

export default function CriticsListClient({
  children,
  total,
}: {
  children: React.ReactNode[];
  total: number;
}) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? children : children.slice(0, INITIAL_COUNT);
  const hasMore = total > INITIAL_COUNT && !showAll;

  return (
    <>
      <div className="space-y-2.5">{visible}</div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg
                       hover:bg-red-700 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-1"
          >
            Show all {total} critics
          </button>
        </div>
      )}
    </>
  );
}
