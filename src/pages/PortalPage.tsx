import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { audioUrl, fetchPortal, PortalData, RecentCall } from "../lib/portalApi";

const KEY = "se_portal_token";
type Range = "today" | "week" | "month";

function fmtDur(s: number) { if (!s) return "0:00"; const m = Math.floor(s / 60); return `${m}:${String(s % 60).padStart(2, "0")}`; }
function fmtPhone(p: string) { const d = p.replace(/\D/g, "").slice(-10); return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p; }
function fmtTime(iso: string) { const d = new Date(iso); return d.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); }

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="glass-card p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-white/55">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      {sub ? <p className="mt-1 text-xs text-white/50">{sub}</p> : null}
    </div>
  );
}

function Bars({ daily }: { daily: PortalData["daily"] }) {
  const max = Math.max(1, ...daily.map((d) => d.calls));
  const W = 900, H = 180, pad = 8, bw = (W - pad * 2) / daily.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full" role="img" aria-label="Calls per day, last 30 days">
      {daily.map((d, i) => {
        const h = (d.calls / max) * H, hb = (d.booked / max) * H, x = pad + i * bw;
        return (
          <g key={d.date}>
            <rect x={x + 2} y={H - h} width={bw - 4} height={h} rx={3} fill="rgba(255,255,255,0.18)" />
            {hb > 0 ? <rect x={x + 2} y={H - hb} width={bw - 4} height={hb} rx={3} fill="#35a6db" /> : null}
            {i % 5 === 0 ? <text x={x + bw / 2} y={H + 20} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">{d.date.slice(5).replace("-", "/")}</text> : null}
          </g>
        );
      })}
    </svg>
  );
}

function CallRow({ c, token }: { c: RecentCall; token: string }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const tone = c.outcome === "Booked" ? "text-elite-gold" : c.outcome === "Message" ? "text-sky-300" : c.outcome.startsWith("Missed") ? "text-white/40" : "text-white/80";
  return (
    <div className="border-t border-white/10 py-4">
      <button type="button" onClick={() => setOpen(!open)} className="grid w-full grid-cols-[1fr_auto] gap-3 text-left sm:grid-cols-[170px_1fr_120px_70px]">
        <span className="text-sm text-white/70">{fmtTime(c.time)}{c.after_hours ? <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">after hours</span> : null}</span>
        <span className="hidden text-sm text-white sm:block">{c.caller_name || fmtPhone(c.caller) || "Unknown caller"}{c.service ? <span className="text-white/50"> · {c.service}</span> : null}</span>
        <span className={`text-sm font-medium ${tone}`}>{c.outcome}</span>
        <span className="hidden text-right text-sm text-white/50 sm:block">{fmtDur(c.duration)}</span>
      </button>
      {open ? (
        <div className="mt-3 rounded-xl bg-white/5 p-4 text-sm text-white/75">
          <p className="sm:hidden mb-2 text-white">{c.caller_name || fmtPhone(c.caller) || "Unknown caller"} · {fmtDur(c.duration)}</p>
          {c.appointment ? <p className="mb-2 text-elite-gold">Appointment: {c.appointment}</p> : null}
          <p>{c.summary || "No summary available for this call."}</p>
          {c.has_audio ? (
            src ? <audio controls preload="none" src={src} className="mt-3 w-full" /> :
            <button type="button" className="btn-secondary mt-3 !px-4 !py-2 text-xs" onClick={() => audioUrl(token, c.id).then(setSrc)}>Play recording</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function PortalPage() {
  const [params, setParams] = useSearchParams();
  const [token, setToken] = useState<string>(() => params.get("c") || localStorage.getItem(KEY) || "");
  const [entry, setEntry] = useState("");
  const [data, setData] = useState<PortalData | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [range, setRange] = useState<Range>("week");

  useEffect(() => {
    if (!token) return;
    localStorage.setItem(KEY, token);
    if (params.get("c")) setParams({}, { replace: true });
    let live = true;
    const load = () => fetchPortal(token).then((d) => live && (setData(d), setErr(null))).catch((e: Error) => live && setErr(e.message));
    load();
    const t = setInterval(load, 120000);
    return () => { live = false; clearInterval(t); };
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const totals = useMemo(() => data?.totals[range], [data, range]);

  if (!token) {
    return (
      <>
        <PageHeader eyebrow="Client Portal" title="Your receptionist's dashboard" description="Open the private link we sent you, or paste it below." />
        <section className="section-shell py-16">
          <form className="glass-card mx-auto max-w-xl p-8" onSubmit={(e) => { e.preventDefault(); const m = entry.match(/[?&]c=([A-Za-z0-9_-]+)/); setToken(m ? m[1] : entry.trim()); }}>
            <label className="mb-2 block text-sm font-medium text-white/85">Portal link or access code</label>
            <input value={entry} onChange={(e) => setEntry(e.target.value)} className="w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-elite-gold/50" placeholder="https://socialelitemarketinggroup.com/portal?c=..." />
            <button type="submit" className="btn-primary mt-6 w-full">Open dashboard</button>
            <p className="mt-4 text-xs text-white/45">Lost your link? Text Jeremy at (210) 442-9987.</p>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Client Portal" title={data ? data.client.business : "Loading your dashboard..."} description={data ? `${data.client.agent_name || "Your receptionist"} on ${data.client.line}${data.client.status === "demo" ? " · demo line, placeholder services" : ""}. Live data, refreshes every two minutes.` : " "} />
      <section className="section-shell py-12">
        {err ? <div className="glass-card p-6 text-sm text-red-200">{err} <button type="button" className="ml-3 underline" onClick={() => { localStorage.removeItem(KEY); setToken(""); }}>Use a different link</button></div> : null}
        {data && totals ? (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {(["today", "week", "month"] as Range[]).map((r) => (
                  <button key={r} type="button" onClick={() => setRange(r)} className={`rounded-full border px-4 py-2 text-sm transition ${range === r ? "border-elite-gold bg-elite-gold/15 text-white" : "border-elite-line bg-white/5 text-white/70"}`}>
                    {r === "today" ? "Today" : r === "week" ? "Last 7 days" : "Last 30 days"}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/45">Updated {new Date(data.generated_at).toLocaleTimeString()}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Stat label="Calls answered" value={totals.answered} sub={`${totals.calls} total calls`} />
              <Stat label="Appointments booked" value={totals.booked} sub={totals.answered ? `${Math.round((totals.booked / totals.answered) * 100)}% of answered` : undefined} />
              <Stat label="Messages taken" value={totals.messages} />
              <Stat label="After-hours calls" value={totals.after_hours} sub="Would have gone to voicemail" />
              <Stat label="Avg call length" value={fmtDur(totals.avg_secs)} sub={`${Math.round(totals.secs / 60)} min on the phone`} />
            </div>
            <div className="glass-card mt-8 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Calls per day, last 30 days</h2>
                <p className="text-xs text-white/55"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-white/25 align-middle" /> calls <span className="ml-3 inline-block h-2.5 w-2.5 rounded-sm bg-elite-gold align-middle" /> booked</p>
              </div>
              <Bars daily={data.daily} />
            </div>
            <div className="glass-card mt-8 p-6">
              <h2 className="text-lg font-semibold">Recent calls</h2>
              <p className="mt-1 text-xs text-white/50">Tap a call for the summary and recording.</p>
              <div className="mt-4">
                {data.recent.length ? data.recent.map((c) => <CallRow key={c.id} c={c} token={token} />) : <p className="py-6 text-sm text-white/55">No calls yet. Call {data.client.line} to try it.</p>}
              </div>
            </div>
          </>
        ) : !err ? <div className="glass-card p-8 text-sm text-white/60">Loading...</div> : null}
      </section>
    </>
  );
}
