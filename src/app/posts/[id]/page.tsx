import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import obituaries from "@/data/obituaries.json";

function formatStars(stars: number): string {
  return `${(stars / 1000).toFixed(0)}K`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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
      className="rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 uppercase flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {name.charAt(0)}
    </div>
  );
}

export function generateStaticParams() {
  return obituaries.map((o) => ({ id: o.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const obit = obituaries.find((o) => o.id === params.id);
  if (!obit) return {};
  return {
    title: `${obit.title} — OpenClaw Is Dead`,
    description: obit.quote,
    openGraph: {
      title: obit.title,
      description: obit.quote,
      type: "article",
      publishedTime: obit.date,
      authors: [obit.author],
    },
  };
}

export default function PostPage({ params }: { params: { id: string } }) {
  const idx = obituaries.findIndex((o) => o.id === params.id);
  if (idx === -1) notFound();

  const obit = obituaries[idx];
  const prev = idx > 0 ? obituaries[idx - 1] : null;
  const next = idx < obituaries.length - 1 ? obituaries[idx + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: obit.title,
    datePublished: obit.date,
    author: {
      "@type": "Person",
      name: obit.author,
      ...(obit.authorUrl ? { url: obit.authorUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "OpenClaw Is Dead",
      url: "https://www.openclawdeaths.xyz",
    },
    description: obit.quote,
    mainEntityOfPage: `https://www.openclawdeaths.xyz/posts/${obit.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <Header />
        <div className="max-w-[680px] mx-auto px-4 md:px-6 pb-16">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-gray-900 transition-colors mb-10 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Timeline
        </Link>

        <article>
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-gray-400">{formatDate(obit.date)}</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-accent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {formatStars(obit.githubStars)} stars
            </span>
          </div>

          <h1 className="font-serif font-black text-2xl md:text-[2.25rem] leading-tight text-gray-900 mb-5 text-balance">
            {obit.title}
          </h1>

          <span className="inline-block px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full font-medium mb-8 border border-gray-100">
            {obit.source}
          </span>

          <blockquote className="border-l-[3px] border-accent/50 pl-6 py-3 italic text-lg md:text-xl text-gray-500 mb-8 leading-relaxed">
            &ldquo;{obit.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3 mb-4">
            <Avatar src={obit.authorAvatar || ""} name={obit.author} size={42} />
            <div>
              {obit.authorUrl ? (
                <a
                  href={obit.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gray-900 hover:text-accent transition-colors flex items-center gap-1"
                >
                  {obit.author}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <p className="text-sm font-semibold text-gray-900">{obit.author}</p>
              )}
              {obit.authorTitle && (
                <p className="text-xs text-gray-400">{obit.authorTitle}</p>
              )}
            </div>
          </div>

          {obit.sourceUrl && obit.sourceUrl !== "#" && (
            <a
              href={obit.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-2"
            >
              View original post
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
        </article>

        <hr className="my-12 border-gray-100" />

        <div className="flex justify-between items-center">
          {prev ? (
            <Link
              href={`/posts/${prev.id}`}
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/posts/${next.id}`}
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors"
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
        </div>
      </main>
    </>
  );
}
