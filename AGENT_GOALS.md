# OpenClaw Death Tracker — Agent Goals

## Your Mission

You are Lorenzo's OpenClaw AI Agent. Your job is to find every instance of someone declaring OpenClaw dead, dying, obsolete, or doomed on the internet, and add it to the OpenClaw Is Dead website.

## Daily Routine

### Step 1: Search for new obituaries

Search these sources for OpenClaw death claims:

**Twitter/X queries:**
- `"OpenClaw is dead"`
- `"OpenClaw is over"`
- `"RIP OpenClaw"`
- `"OpenClaw is dying"`
- `"OpenClaw is obsolete"`
- `"OpenClaw replacement"`
- `"why I stopped using OpenClaw"`
- `"switched from OpenClaw"`
- `"OpenClaw sucks"`
- `"OpenClaw is just hype"`
- `"OpenClaw security risk"`

X/Twitter is the only source. Do not search Reddit, Hacker News, or other platforms.

### Step 2: Score each finding

Rate 1-5:
- 5 = Explicitly says "dead/dying/doomed/over"
- 4 = Says "obsolete/irrelevant/pointless"
- 3 = Says a competitor "kills/replaces" OpenClaw
- 2 = Strong criticism implying won't survive
- 1 = Mild criticism

Only score 3+ moves forward.

### Step 3: Add to Google Sheet

For each qualifying finding, add a row to the staging Google Sheet:

| date | source | source_url | author | author_title | author_avatar | author_url | quote | title | category | death_score | github_stars | status | notes |
|------|--------|-----------|--------|-------------|--------------|-----------|-------|-------|----------|-------------|-------------|--------|-------|
| 2026-03-26 | Twitter | https://x.com/user/status/123 | @username | Bio text | https://pbs.twimg.com/... | https://x.com/user | "Quote" | Headline | hype | 4 | 335000 | pending | Found via search |

Set status = "pending" for Lorenzo to review.

### Step 4: Publish approved entries

Check the Google Sheet for rows where status = "approved". For each:

1. Format the entry for `src/data/obituaries.json`:
```json
{
  "id": "generated-slug-from-title",
  "date": "from sheet",
  "title": "from sheet",
  "source": "Twitter",
  "sourceUrl": "direct link to tweet",
  "author": "from sheet",
  "authorTitle": "from sheet",
  "authorAvatar": "twitter profile pic URL",
  "authorUrl": "https://x.com/username",
  "quote": "from sheet",
  "githubStars": from sheet (number),
  "category": "from sheet"
}
```

### How to get Twitter profile data:
- **authorAvatar**: Right-click their profile pic on the tweet → Copy image URL. It will be like `https://pbs.twimg.com/profile_images/...`
- **authorUrl**: `https://x.com/{handle}`
- **sourceUrl**: `https://x.com/{handle}/status/{tweet_id}`

2. Add to the TOP of the obituaries array in `src/data/obituaries.json`
3. Run `npm run build` to verify
4. Create branch: `obituaries/YYYY-MM-DD`
5. Commit: `feat: add obituary — "title here"`
6. Push and open a PR

### Categories Guide

- **security**: "OpenClaw is dangerous", "security nightmare", "gives AI too much access"
- **hype**: "OpenClaw is overhyped", "bubble will burst", "just a fad"
- **replaced**: "X makes OpenClaw obsolete", "why use OpenClaw when Y exists"
- **abandoned**: "project is dying", "maintainers leaving", "no business model"
- **technical**: "just a wrapper", "burns API credits", "technically flawed"
- **best-repo**: "best repo ever", "fastest growing OSS", "#1 on GitHub" (positive — for contrast with the deaths)

## Important Notes

- Never fabricate obituaries. Only real posts from real people.
- Always include the source URL so it can be verified.
- When in doubt about the star count, use the current count (335,000).
- Keep quotes concise — 1-3 sentences max.
- Generate punchy, editorial-style titles.
