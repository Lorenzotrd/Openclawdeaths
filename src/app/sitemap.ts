import { MetadataRoute } from "next";
import obituaries from "@/data/obituaries.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://openclawdeaths.xyz";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/posts`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/critics`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/best-repos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const obituaryPages = obituaries.map((o) => ({
    url: `${baseUrl}/posts/${o.id}`,
    lastModified: new Date(o.date + "T00:00:00"),
    changeFrequency: "never" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...obituaryPages];
}
