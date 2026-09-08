// Social Elite client-portal API discovery.
// The backend runs behind a rotating tunnel; its current base URL is published to GitHub Pages.
const POINTER = "https://boris148.github.io/se-portal/endpoint.json";
let cached: string | null = null;

export async function apiBase(): Promise<string> {
  if (cached) return cached;
  const r = await fetch(`${POINTER}?t=${Date.now()}`, { cache: "no-store" });
  if (!r.ok) throw new Error("Portal is temporarily unavailable.");
  const j = (await r.json()) as { api?: string };
  if (!j.api) throw new Error("Portal is temporarily unavailable.");
  cached = j.api;
  return cached;
}

export async function submitOnboarding(payload: Record<string, unknown>) {
  const base = await apiBase();
  const r = await fetch(`${base}/onboard`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Submission failed. Please try again.");
  return r.json();
}

export type Totals = { calls: number; answered: number; booked: number; messages: number; after_hours: number; secs: number; avg_secs: number };
export type RecentCall = {
  id: string; time: string; duration: number; caller: string; caller_name: string; service: string; outcome: string;
  appointment: string; summary: string; after_hours: boolean; has_audio: boolean;
};
export type PortalData = {
  client: { name: string; business: string; tz: string; agent_name: string; line: string; status: string };
  generated_at: string;
  totals: { today: Totals; week: Totals; month: Totals };
  daily: { date: string; calls: number; booked: number; after_hours: number }[];
  recent: RecentCall[];
};

export async function fetchPortal(token: string): Promise<PortalData> {
  const base = await apiBase();
  const r = await fetch(`${base}/portal/${encodeURIComponent(token)}`);
  if (r.status === 404) throw new Error("That portal link isn't valid. Check the link we sent you, or text Jeremy at (210) 442-9987.");
  if (!r.ok) throw new Error("Couldn't load your dashboard right now. Try again in a minute.");
  return r.json();
}

export async function audioUrl(token: string, convId: string) {
  const base = await apiBase();
  return `${base}/portal/${encodeURIComponent(token)}/audio/${convId}`;
}
