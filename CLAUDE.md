# OpenClaw Is Dead

A website tracking every time OpenClaw has been declared dead, dangerous, or obsolete. Inspired by bitcoindeaths.com.

## Stack

- Next.js 14 (App Router) + Tailwind CSS + Chart.js
- Data source: `src/data/obituaries.json`
- Deploy: Vercel

## Repo Structure

```
src/
├── app/
│   ├── page.tsx            # Chart page (home)
│   ├── layout.tsx          # Root layout + footer
│   ├── globals.css         # Tailwind + custom styles
│   ├── posts/
│   │   ├── page.tsx        # Timeline page
│   │   └── [id]/page.tsx   # Individual obituary
│   ├── critics/page.tsx    # Critics leaderboard
│   └── about/page.tsx      # About page
├── components/
│   ├── Header.tsx          # Shared header + nav tabs
│   ├── StarsChart.tsx      # Interactive chart + summary stats
│   └── TimelineClient.tsx  # Timeline with search/sort
└── data/
    └── obituaries.json     # ALL OBITUARY DATA LIVES HERE
```

## Obituary Data Format

Each entry in `src/data/obituaries.json` must follow this exact schema:

```json
{
  "id": "slug-from-title",
  "date": "YYYY-MM-DD",
  "title": "Short headline declaring OpenClaw dead",
  "source": "Twitter",
  "sourceUrl": "https://x.com/username/status/123456789",
  "author": "username or display name",
  "authorTitle": "Job title or bio line",
  "authorAvatar": "https://pbs.twimg.com/profile_images/.../photo.jpg",
  "authorUrl": "https://x.com/username",
  "quote": "The exact quote or key excerpt declaring OpenClaw dead/doomed/obsolete",
  "githubStars": 335000,
  "category": "security | hype | replaced | abandoned | technical | best-repo"
}
```

### Field Rules

- `id`: lowercase, hyphenated slug derived from title. Must be unique.
- `date`: ISO date of the original tweet.
- `title`: Short, punchy. Should clearly convey "OpenClaw is dead/doomed".
- `source`: Always "Twitter" (we only source from X/Twitter).
- `sourceUrl`: Direct link to the tweet. Use "#" if unavailable.
- `author`: Twitter display name or @handle (without @).
- `authorTitle`: Their bio line or role. Keep it short.
- `authorAvatar`: Twitter profile picture URL. Get from the tweet page. Use "" if unavailable.
- `authorUrl`: Link to the author's Twitter profile (https://x.com/username). Use "" if unavailable.
- `quote`: The most damning excerpt. 1-3 sentences max.
- `githubStars`: OpenClaw's GitHub star count on that date. Check https://github.com/open-claw/open-claw or star-history.com for historical data.
- `category`: Must be one of the 5 categories:
  - `security` — claims OpenClaw is dangerous/unsafe
  - `hype` — claims OpenClaw is overhyped/will fade
  - `replaced` — claims another tool makes OpenClaw obsolete
  - `abandoned` — claims project is dying/unmaintained
  - `technical` — claims OpenClaw is technically flawed
  - `best-repo` — praise or recognition of OpenClaw as top/best repo (positive, for contrast)

### Ordering

Entries in the JSON array should be ordered by date, **newest first**.

## Adding New Obituaries

1. Find the post/tweet/article declaring OpenClaw dead
2. Extract: date, title, source, sourceUrl, author, authorTitle, quote
3. Look up OpenClaw's GitHub star count on that date
4. Assign a category
5. Generate a unique slug ID
6. Add the entry to the TOP of `src/data/obituaries.json`
7. Run `npm run build` to verify no errors
8. Commit and push

## Scoring Criteria (for the Google Sheet staging)

When evaluating whether a post qualifies as an "obituary":

| Score | Criteria |
|-------|----------|
| 5     | Explicitly says "OpenClaw is dead/dying/doomed/over" |
| 4     | Says OpenClaw is "obsolete/irrelevant/pointless" |
| 3     | Says a competitor "kills/replaces" OpenClaw |
| 2     | Strong criticism implying OpenClaw won't survive |
| 1     | Mild criticism, not clearly a "death" claim |

**Only score 3+ qualifies for the website.**

## Google Sheet Structure

The staging Google Sheet should have these columns:

| Column | Description |
|--------|-------------|
| date | Date of the tweet (YYYY-MM-DD) |
| source | Always "Twitter" |
| source_url | Direct link to tweet |
| author | Display name or @handle |
| author_title | Bio line or role |
| author_avatar | Profile picture URL |
| author_url | Link to Twitter profile |
| quote | Key excerpt |
| title | Generated headline |
| category | security/hype/replaced/abandoned/technical |
| death_score | 1-5 scoring (see above) |
| github_stars | Star count on that date |
| status | pending / approved / rejected |
| notes | Any reviewer notes |

## Daily Agent Workflow

1. **Search** — Look for new "OpenClaw is dead" content on Twitter/X only:
   - Search: `"OpenClaw is dead" OR "OpenClaw is over" OR "RIP OpenClaw" OR "OpenClaw is dying" OR "OpenClaw is obsolete"`
   - X/Twitter is the sole data source. No Reddit, no Hacker News.

2. **Score** — Rate each finding 1-5 using the scoring criteria above

3. **Stage** — Add score 3+ entries to the Google Sheet with status "pending"

4. **Review** — Lorenzo validates in the Google Sheet, changes status to "approved" or "rejected"

5. **Publish** — For "approved" entries:
   - Add to `src/data/obituaries.json` (newest first)
   - Commit with message: `feat: add obituary — "{title}"`
   - Push to a branch `obituaries/YYYY-MM-DD`
   - Open a PR for review

## Commands

```bash
npm run dev    # Start dev server at localhost:3000
npm run build  # Production build (verify before pushing)
npm run start  # Start production server
```
