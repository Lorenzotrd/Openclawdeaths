"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status === "duplicate") {
        setStatus("duplicate");
      } else if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="card p-8 md:p-10 text-center max-w-[600px] mx-auto">
      <div className="text-4xl mb-4">&#x1FAA6;</div>

      <h3 className="font-serif font-black text-xl md:text-2xl text-gray-900 mb-2">
        Every time OpenClaw dies... it gets stronger.
      </h3>
      <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
        Weekly death declarations, top new repos, and the updates that matter in
        the OpenClaw ecosystem.
      </p>

      {status === "success" ? (
        <p className="text-sm font-medium text-alive py-3">
          You&apos;re in. See you Monday. &#x1F99E;
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm
                         placeholder:text-gray-300
                         focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 focus:bg-white
                         transition-all duration-200"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg
                         hover:bg-red-700 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-1
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>

          {status === "duplicate" && (
            <p className="text-xs text-gray-400 mt-3">
              You&apos;re already subscribed!
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-accent mt-3">
              Something went wrong. Try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}
