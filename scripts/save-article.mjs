#!/usr/bin/env node
// Pure save-and-publish script. Takes a generated article JSON via stdin.
// Renders HTML, appends to articles.json, marks topic published, regenerates
// sitemap + RSS + robots.txt, then git-commits and pushes.
//
// Usage:  cat article.json | node scripts/save-article.mjs
// Or:     echo '{"title":"...", "sections":[...]}' | node scripts/save-article.mjs

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

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function main() {
  const raw = await readStdin();
  if (!raw.trim()) {
    console.error("No article JSON received on stdin.");
    process.exit(1);
  }
  let result;
  try {
    result = JSON.parse(raw);
  } catch (e) {
    console.error("Invalid JSON on stdin:", e.message);
    console.error("First 400 chars of stdin:", raw.slice(0, 400));
    process.exit(1);
  }

  if (!result.title || !result.sections || !Array.isArray(result.sections)) {
    console.error("Article missing required fields (title, sections[]):", JSON.stringify(result).slice(0, 400));
    process.exit(1);
  }

  const topicsData = await readJson(TOPICS_FILE);
  const articlesData = await readJson(ARTICLES_FILE);

  // Find the topic this article was for. Prefer explicit `result.keyword`, else first pending.
  let topic = null;
  if (result.keyword) {
    topic = topicsData.queue.find((t) => t.status === "pending" && t.keyword === result.keyword);
  }
  if (!topic) topic = topicsData.queue.find((t) => t.status === "pending");
  if (!topic) {
    console.error("No pending topic found in queue.");
    process.exit(1);
  }

  let slug = slugify(result.title);
  if (articlesData.articles.find((a) => a.slug === slug)) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  const heroImage = unsplashUrl(result.heroImageQuery || topic.keyword);
  const contentHtml = renderHtml(result);

  const article = {
    slug,
    title: result.title,
    description: result.description,
    category: topic.category,
    keyword: topic.keyword,
    date: new Date().toISOString(),
    readingTime: Math.max(3, Math.min(20, result.readingTime || 8)),
    author: "Social Elite Editorial",
    heroImage,
    contentHtml,
    faq: Array.isArray(result.faq) ? result.faq : [],
  };

  articlesData.articles.unshift(article);
  await writeJson(ARTICLES_FILE, articlesData);

  topic.status = "published";
  topic.slug = slug;
  topic.publishedAt = article.date;
  await writeJson(TOPICS_FILE, topicsData);

  await writeSitemap(articlesData.articles);
  await writeRss(articlesData.articles);
  await writeRobots();

  console.log(`[save-article] Published /blog/${slug}`);

  await gitPushIfRequested();
}

main().catch((e) => {
  console.error("[save-article] FAILED:", e);
  process.exit(1);
});
