#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOPICS_FILE = path.join(ROOT, "src/content/topics.json");
const ARTICLES_FILE = path.join(ROOT, "src/content/articles.json");
const SITEMAP_FILE = path.join(ROOT, "public/sitemap.xml");
const RSS_FILE = path.join(ROOT, "public/rss.xml");
const ROBOTS_FILE = path.join(ROOT, "public/robots.txt");

const SITE_URL = "https://socialelitemarketinggroup.com";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY env var.");
  process.exit(1);
}

const PHOTO_BANK = {
  default: "1486312338219-ce68d2c6f44d",
  ai: "1677442136019-21780ecad995",
  marketing: "1432888622747-4eb9a8efeb07",
  ads: "1432888622747-4eb9a8efeb07",
  meta: "1611605698335-8b1569810432",
  google: "1573164574572-cb89e39749b4",
  data: "1551288049-bebda4e38f71",
  analytics: "1551288049-bebda4e38f71",
  agency: "1497366216548-37526070297c",
  team: "1497366216548-37526070297c",
  funding: "1554224155-6726b3ff858f",
  loan: "1554224155-6726b3ff858f",
  credit: "1556742502-ec7c0e9f34b1",
  automation: "1518770660439-4636190af475",
  workflow: "1518770660439-4636190af475",
  outreach: "1556761175-5973dc0f32e7",
  email: "1596526131083-e8c633c948d2",
  social: "1611162617213-7d7a39e9b1d7",
  tiktok: "1611162617213-7d7a39e9b1d7",
  growth: "1551836022-d5d88e9218df",
  scale: "1551836022-d5d88e9218df",
  lead: "1521791136064-7986c2920216",
  conversion: "1559526324-4b87b5e36e44",
  voice: "1590650046871-92c887180603",
  call: "1590650046871-92c887180603",
  reporting: "1542744173-8e7e53415bb0",
  dashboard: "1542744173-8e7e53415bb0",
  local: "1571171637578-41bc2dd41cd2",
  business: "1497366811353-6870744d04b2",
};

function pickPhotoId(query) {
  const q = (query || "").toLowerCase();
  for (const [k, v] of Object.entries(PHOTO_BANK)) {
    if (k !== "default" && q.includes(k)) return v;
  }
  return PHOTO_BANK.default;
}

function unsplashUrl(query) {
  return `https://images.unsplash.com/photo-${pickPhotoId(query)}?w=1600&q=80&auto=format&fit=crop`;
}

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, "utf8"));
}
async function writeJson(p, v) {
  await fs.writeFile(p, JSON.stringify(v, null, 2) + "\n", "utf8");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-$/, "");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function callGemini(systemPrompt, userPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API ${res.status}: ${text.slice(0, 800)}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty Gemini response: " + JSON.stringify(data).slice(0, 600));
  }
  return JSON.parse(text);
}

function buildPrompts(site, topic) {
  const system = `You are a senior marketing strategist writing for ${site.brand}.
Voice: ${site.voice}
You write SEO-optimized blog articles aimed at founders, CMOs, and agency owners.
You are opinionated, specific, ROI-focused, and reference real tools/numbers.
You never use generic AI filler ("In today's fast-paced world", "leveraging synergies", etc.).
Always output STRICT JSON matching the requested schema. No markdown code fences around the JSON. No commentary outside the JSON.`;

  const user = `Write an SEO blog article on this topic.

Keyword: "${topic.keyword}"
Search intent: ${topic.intent}
Editorial angle: ${topic.angle}
Category: ${topic.category}

Output JSON exactly matching this schema:
{
  "title": "compelling H1, 55-65 chars, contains the keyword naturally, no clickbait but specific",
  "description": "meta description, 150-160 chars, sells the click",
  "introduction": "2-3 paragraph hook in markdown. Open with a strong claim, specific stat, or contrarian observation. State who this is for. End with a one-line preview of what the article delivers.",
  "sections": [
    {
      "heading": "H2 heading (sentence case, no period)",
      "body": "Section body in markdown. Use **bold** sparingly, short paragraphs (2-4 sentences), bullet lists where useful, numbered lists for steps. Be specific and tactical. Include numbers, examples, frameworks. Reference real tools by name (GoHighLevel, Meta Ads Manager, Google Analytics, HubSpot, Calendly, etc.) where relevant."
    }
  ],
  "conclusion": "1-2 paragraph close in markdown. Restate the main argument, give a clear next action. Do NOT include a 'book a call' CTA — the page handles that.",
  "faq": [
    {"question": "Real searcher question (no marketing speak)", "answer": "Direct answer in 2-3 sentences."}
  ],
  "heroImageQuery": "2-4 word phrase to pick a stock photo (categories: ai, marketing, ads, meta, google, data, agency, team, funding, loan, credit, automation, outreach, email, social, growth, lead, conversion, voice, reporting, local, business)",
  "readingTime": 7
}

Constraints:
- 6-8 sections. Each section 150-300 words.
- Total article length 1500-2500 words.
- 3-5 FAQs.
- Use markdown ONLY inside the body/introduction/conclusion strings — never wrap the JSON.
- Don't use H1 inside body (the title is the H1).
- Don't reference today's date or the year unless ${new Date().getFullYear()} is contextually correct.`;

  return { system, user };
}

function renderHtml(article) {
  const parts = [];
  if (article.introduction) parts.push(marked.parse(article.introduction));
  for (const s of article.sections || []) {
    if (s.heading) parts.push(`<h2>${escapeHtml(s.heading)}</h2>`);
    if (s.body) parts.push(marked.parse(s.body));
  }
  if (article.conclusion) {
    parts.push(`<h2>The bottom line</h2>`);
    parts.push(marked.parse(article.conclusion));
  }
  return parts.join("\n");
}

async function writeSitemap(articles) {
  const staticUrls = [
    { path: "", priority: "1.0" },
    { path: "/services", priority: "0.8" },
    { path: "/white-label", priority: "0.7" },
    { path: "/results", priority: "0.7" },
    { path: "/funding", priority: "0.7" },
    { path: "/data", priority: "0.6" },
    { path: "/evergreen", priority: "0.6" },
    { path: "/about", priority: "0.5" },
    { path: "/contact", priority: "0.5" },
    { path: "/blog", priority: "0.8" },
  ];
  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    ...staticUrls.map(
      (u) =>
        `  <url><loc>${SITE_URL}${u.path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`
    ),
    ...articles.map(
      (a) =>
        `  <url><loc>${SITE_URL}/blog/${a.slug}</loc><lastmod>${a.date.slice(0, 10)}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    ),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join("\n")}\n</urlset>\n`;
  await fs.mkdir(path.dirname(SITEMAP_FILE), { recursive: true });
  await fs.writeFile(SITEMAP_FILE, xml);
}

async function writeRss(articles) {
  const items = articles
    .slice(0, 20)
    .map(
      (a) => `  <item>
    <title><![CDATA[${a.title}]]></title>
    <link>${SITE_URL}/blog/${a.slug}</link>
    <guid isPermaLink="true">${SITE_URL}/blog/${a.slug}</guid>
    <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    <category>${escapeHtml(a.category)}</category>
    <description><![CDATA[${a.description}]]></description>
  </item>`
    )
    .join("\n");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Social Elite Marketing Group — Insights</title>
  <link>${SITE_URL}/blog</link>
  <description>Operator-grade marketing playbooks from Social Elite Marketing Group.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel></rss>
`;
  await fs.writeFile(RSS_FILE, rss);
}

async function writeRobots() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await fs.writeFile(ROBOTS_FILE, txt);
}

async function gitPushIfRequested() {
  if (process.env.GIT_PUSH === "false") return;
  try {
    execSync(
      `git add src/content/articles.json src/content/topics.json public/sitemap.xml public/rss.xml public/robots.txt`,
      { cwd: ROOT, stdio: "inherit" }
    );
    const msg = process.env.GIT_COMMIT_MSG || `blog: publish ${new Date().toISOString().slice(0, 10)} article`;
    execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT, stdio: "inherit" });
    execSync(`git push origin main`, { cwd: ROOT, stdio: "inherit" });
  } catch (e) {
    console.error("Git push step failed (non-fatal):", e.message);
  }
}

async function main() {
  const topicsData = await readJson(TOPICS_FILE);
  const articlesData = await readJson(ARTICLES_FILE);

  const next = topicsData.queue.find((t) => t.status === "pending");
  if (!next) {
    console.log("No pending topics. Queue empty.");
    process.exit(0);
  }

  console.log(`[generate-article] Topic: ${next.keyword}`);
  const { system, user } = buildPrompts(topicsData.site, next);
  const result = await callGemini(system, user);

  if (!result.title || !result.sections || !Array.isArray(result.sections)) {
    throw new Error("Gemini response missing required fields: " + JSON.stringify(result).slice(0, 400));
  }

  let slug = slugify(result.title);
  if (articlesData.articles.find((a) => a.slug === slug)) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  const heroImage = unsplashUrl(result.heroImageQuery || next.keyword);
  const contentHtml = renderHtml(result);

  const article = {
    slug,
    title: result.title,
    description: result.description,
    category: next.category,
    keyword: next.keyword,
    date: new Date().toISOString(),
    readingTime: Math.max(3, Math.min(20, result.readingTime || 8)),
    author: "Social Elite Editorial",
    heroImage,
    contentHtml,
    faq: Array.isArray(result.faq) ? result.faq : [],
  };

  articlesData.articles.unshift(article);
  await writeJson(ARTICLES_FILE, articlesData);

  next.status = "published";
  next.slug = slug;
  next.publishedAt = article.date;
  await writeJson(TOPICS_FILE, topicsData);

  await writeSitemap(articlesData.articles);
  await writeRss(articlesData.articles);
  await writeRobots();

  console.log(`[generate-article] Published /blog/${slug}`);

  await gitPushIfRequested();
}

main().catch((e) => {
  console.error("[generate-article] FAILED:", e);
  process.exit(1);
});
