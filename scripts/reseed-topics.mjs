#!/usr/bin/env node
// Auto-reseed the SEO topic queue so the daily publisher never runs dry.
// No-op (cheap, no API call) when pending >= THRESHOLD. When low, asks Claude
// for fresh long-tail, intent-mapped keywords, deduped against everything
// already used, and appends them as pending.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOPICS_FILE = path.join(ROOT, "src/content/topics.json");

const THRESHOLD = Number(process.env.RESEED_THRESHOLD || 8); // reseed when pending dips below this
const TARGET = Number(process.env.RESEED_TARGET || 24); // top pending back up to here
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-7";

const CATEGORIES = [
  "Paid Media",
  "Lead Generation",
  "Marketing Automation",
  "AI in Marketing",
  "Funding & AOS",
  "Agency Growth",
];

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, "utf8"));
}
async function writeJson(p, v) {
  await fs.writeFile(p, JSON.stringify(v, null, 2) + "\n", "utf8");
}

function extractJson(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {}
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return JSON.parse(fenced[1].trim());
  const objMatch = trimmed.match(/\{[\s\S]*\}/);
  if (objMatch) return JSON.parse(objMatch[0]);
  throw new Error("Could not locate JSON in Claude response: " + trimmed.slice(0, 400));
}

async function callClaude(systemPrompt, userPrompt) {
  const url = "https://api.anthropic.com/v1/messages";
  const hardenedSystem =
    systemPrompt +
    "\n\nCRITICAL: Output ONLY a single valid JSON object. No prose, no preamble, no markdown code fences, no commentary. Begin your response with { and end with }.";
  const body = {
    model: MODEL,
    max_tokens: 4000,
    system: hardenedSystem,
    messages: [{ role: "user", content: userPrompt }],
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Claude API ${res.status}: ${t.slice(0, 800)}`);
  }
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (!text) throw new Error("Empty Claude response: " + JSON.stringify(data).slice(0, 600));
  return extractJson(text);
}

function buildPrompts(site, count, usedKeywords) {
  const system = `You are a senior SEO strategist for ${site.brand}.
Voice: ${site.voice}
You design blog topic queues that build topical authority and rank in Google for a young, low-authority domain.

Professional SEO rules you ALWAYS follow:
- Target long-tail, specific, intent-clear keywords a low-authority site can realistically rank for. AVOID broad head terms ("marketing", "Facebook ads", "SEO") with no modifier.
- Use real phrasing people actually type into Google (questions, "best X for Y", "X vs Y", "how much does X cost", "X for [vertical]").
- Map each keyword to one search intent: informational (top-funnel how/why), commercial (best/compare/for-a-vertical research), or transactional (cost/pricing/hire/near-me).
- Modify with service verticals where it fits (HVAC, roofing, plumbing, dental, med spa, law firms, contractors, restaurants, home services) and the lender/funding audience.
- Build clusters that reinforce each other, not random one-offs.
- NEVER duplicate or trivially reword a keyword already in the used list.`;

  const user = `Generate ${count} NEW blog topics for the queue.

Allowed categories (use these EXACT strings): ${CATEGORIES.map((c) => `"${c}"`).join(", ")}
Allowed intents: "informational", "commercial", "transactional"

Spread topics across all six categories and all three intents (favor commercial + transactional, which convert). Each topic must be a distinct, rankable long-tail keyword.

These keywords are ALREADY USED — do NOT repeat or trivially reword any of them:
${usedKeywords.map((k) => `- ${k}`).join("\n")}

Output JSON exactly matching this schema:
{
  "topics": [
    {
      "category": "one of the allowed categories",
      "keyword": "the long-tail target keyword, lowercase, how a searcher types it",
      "intent": "informational | commercial | transactional",
      "angle": "1 sentence editorial angle: the specific, opinionated take or framework the article delivers. Reference real numbers/tools/verticals where natural."
    }
  ]
}

Return exactly ${count} topics.`;

  return { system, user };
}

async function main() {
  const data = await readJson(TOPICS_FILE);
  const queue = data.queue || [];
  const pending = queue.filter((t) => t.status === "pending").length;

  if (pending >= THRESHOLD) {
    console.log(`[reseed] pending=${pending} >= threshold=${THRESHOLD}; no reseed needed.`);
    return;
  }
  if (!ANTHROPIC_API_KEY) {
    console.error("[reseed] pending low but ANTHROPIC_API_KEY missing; cannot reseed.");
    process.exit(1);
  }

  const need = Math.max(TARGET - pending, 6);
  const used = queue.map((t) => t.keyword);
  const usedLower = new Set(used.map((k) => k.trim().toLowerCase()));
  console.log(`[reseed] pending=${pending} < ${THRESHOLD}; requesting ${need} new topics...`);

  const { system, user } = buildPrompts(data.site, need, used);
  const result = await callClaude(system, user);
  const topics = Array.isArray(result?.topics) ? result.topics : [];
  if (!topics.length) throw new Error("Claude returned no topics");

  let added = 0;
  for (const t of topics) {
    const kw = (t.keyword || "").trim();
    const cat = (t.category || "").trim();
    const intent = (t.intent || "").trim();
    if (!kw || !cat || !intent) continue;
    if (!CATEGORIES.includes(cat)) continue;
    if (usedLower.has(kw.toLowerCase())) continue;
    queue.push({ status: "pending", category: cat, keyword: kw, intent, angle: (t.angle || "").trim() });
    usedLower.add(kw.toLowerCase());
    added++;
  }

  if (!added) {
    console.log("[reseed] no new unique topics to add (all duplicates).");
    return;
  }
  data.queue = queue;
  await writeJson(TOPICS_FILE, data);
  const nowPending = queue.filter((t) => t.status === "pending").length;
  console.log(`[reseed] added ${added} topics; pending now ${nowPending}.`);
}

main().catch((e) => {
  console.error("[reseed] FAILED:", e.message);
  process.exit(1);
});
