import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Seo } from "../components/Seo";
import { apiBase } from "../lib/portalApi";

// Client onboarding portal (/start). White-label media buying is the primary path.
// Submits to the SE portal relay: POST `${api}/onboard/client` (see projects/se-client-portal/relay.py).

// Social Elite's Meta Business Manager ID. Leave empty until confirmed; the page then tells
// clients we'll send the partner request from our side instead of showing an ID.
const SE_BUSINESS_ID = "";
const BOOKING_URL = "https://calendly.com/semg-jeremy";
const FALLBACK_EMAIL = "info@socialelitemarketinggroup.com";
const STORAGE_KEY = "se-start-onboarding-v1";

type Service = "wl" | "full";
type Answers = Record<string, string>;
type StepKey = "partner" | "business" | "access" | "leads" | "creative" | "review";

const STEP_META: Record<StepKey, { title: string; blurb: string }> = {
  partner: { title: "Your agency", blurb: "Who we're partnering with and how you like to work." },
  business: { title: "The business", blurb: "The business we'll be advertising, and what a win looks like." },
  access: { title: "Ad accounts & access", blurb: "Where the ads will run and how we get access." },
  leads: { title: "Leads & CRM", blurb: "Where leads go and how fast someone reaches them." },
  creative: { title: "Creative & brand", blurb: "What we build ads from, and what to stay away from." },
  review: { title: "Review & submit", blurb: "Check everything, then sign off." },
};

const INDUSTRIES = ["Legal / personal injury", "Home services", "Healthcare / med spa", "Business funding / finance", "Real estate", "E-commerce", "Events / music", "Other"];
const BUDGETS = ["Under $3K / mo", "$3K to $10K / mo", "$10K to $25K / mo", "$25K to $50K / mo", "$50K+ / mo", "Not sure yet"];
const GOALS = ["Leads", "Booked calls", "Sales", "Ticket sales", "App installs"];
const SPECIAL = ["Credit / finance", "Employment", "Housing", "Legal or health-sensitive", "None of these"];

function fieldsFor(step: StepKey, service: Service): [string, string][] {
  switch (step) {
    case "partner":
      return [["agencyName", "Agency"], ["contactName", "Contact name"], ["email", "Email"], ["phone", "Phone"], ["agencyWebsite", "Agency website"], ["accountsNow", "Client accounts to onboard now"], ["reportingBrand", "Reporting branding"], ["commsChannel", "Preferred channel"]];
    case "business":
      return [
        ...(service === "full" ? ([["contactName", "Your name"], ["email", "Email"], ["phone", "Phone"]] as [string, string][]) : []),
        ["business", "Business name"], ["industry", "Industry"], ["industryOther", "Industry (other)"], ["website", "Website"], ["serviceArea", "Service area / locations"],
        ["offer", "Main offer to advertise"], ["avgTicket", "Average ticket / customer value"], ["budget", "Monthly ad budget"], ["goals", "Goals"], ["targetCpa", "Target CPL / CPA"], ["history", "What has / hasn't worked"],
      ];
    case "access":
      return [["hasBM", "Has Meta Business Manager"], ["bmId", "Business Manager ID"], ["adAccountId", "Ad account ID"], ["fbPage", "Facebook page"], ["igHandle", "Instagram"], ["pixelId", "Pixel / dataset ID"], ["setupForMe", "Set up BM for me"], ["googleAdsId", "Google Ads customer ID"], ["tiktok", "TikTok"], ["billing", "Ad spend billing"], ["billingOther", "Billing details"]];
    case "leads":
      return [["crm", "Leads go to"], ["crmOther", "CRM (other)"], ["notifyEmails", "Lead alert emails"], ["notifyPhones", "Lead alert phones"], ["speedToLead", "Speed to lead"], ["aiVoice", "AI voice agent interest"], ["landing", "Landing page vs lead forms"]];
    case "creative":
      return [["brandLink", "Logo / brand guidelines"], ["mediaLink", "Photos & videos"], ["testimonialsLink", "Testimonials / reviews"], ["competitors", "Competitors they admire"], ["avoidWords", "Words / claims to avoid"], ["specialCategories", "Special ad categories"]];
    case "review":
      return [["agree", "Ad spend acknowledgement"], ["signature", "Signed (typed name)"]];
  }
}

const inputCls = "w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-elite-gold/50 sm:text-sm";
const labelCls = "mb-2 block text-sm font-medium text-white/85";

type FP = { label: string; name: string; hint?: string; required?: boolean; value: string; onChange: (k: string, v: string) => void; placeholder?: string };

function Field({ type = "text", inputMode, ...p }: FP & { type?: string; inputMode?: "text" | "tel" | "email" | "numeric" | "url" }) {
  return (
    <div>
      <label htmlFor={p.name} className={labelCls}>{p.label}{p.required ? <span className="text-elite-gold"> *</span> : null}</label>
      <input id={p.name} name={p.name} type={type} inputMode={inputMode} value={p.value} placeholder={p.placeholder} onChange={(e) => p.onChange(p.name, e.target.value)} className={inputCls} />
      {p.hint ? <p className="mt-1.5 text-xs text-white/45">{p.hint}</p> : null}
    </div>
  );
}

function Area({ rows = 3, ...p }: FP & { rows?: number }) {
  return (
    <div>
      <label htmlFor={p.name} className={labelCls}>{p.label}{p.required ? <span className="text-elite-gold"> *</span> : null}</label>
      <textarea id={p.name} name={p.name} rows={rows} value={p.value} placeholder={p.placeholder} onChange={(e) => p.onChange(p.name, e.target.value)} className={inputCls} />
      {p.hint ? <p className="mt-1.5 text-xs text-white/45">{p.hint}</p> : null}
    </div>
  );
}

function Select({ options, ...p }: FP & { options: string[] }) {
  return (
    <div>
      <label htmlFor={p.name} className={labelCls}>{p.label}{p.required ? <span className="text-elite-gold"> *</span> : null}</label>
      <select id={p.name} name={p.name} value={p.value} onChange={(e) => p.onChange(p.name, e.target.value)} className={`${inputCls} appearance-none`}>
        <option value="" className="bg-[#0b1020]">Choose one</option>
        {options.map((o) => <option key={o} value={o} className="bg-[#0b1020]">{o}</option>)}
      </select>
      {p.hint ? <p className="mt-1.5 text-xs text-white/45">{p.hint}</p> : null}
    </div>
  );
}

function Choice({ label, name, options, value, onChange, hint, required, multi }: { label: string; name: string; options: string[]; value: string; onChange: (k: string, v: string) => void; hint?: string; required?: boolean; multi?: boolean }) {
  const selected = multi ? value.split(", ").filter(Boolean) : [value];
  const pick = (o: string) => {
    if (!multi) return onChange(name, o);
    const next = selected.includes(o) ? selected.filter((x) => x !== o) : [...selected, o];
    onChange(name, next.join(", "));
  };
  return (
    <div>
      <p className={labelCls}>{label}{required ? <span className="text-elite-gold"> *</span> : null}{multi ? <span className="ml-2 text-xs font-normal text-white/45">Pick all that apply</span> : null}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={selected.includes(o)} onClick={() => pick(o)}
            className={`rounded-full border px-4 py-2.5 text-sm transition ${selected.includes(o) ? "border-elite-gold bg-elite-gold/15 text-white" : "border-elite-line bg-white/5 text-white/75 hover:border-white/30"}`}>
            {o}
          </button>
        ))}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-white/45">{hint}</p> : null}
    </div>
  );
}

function Check({ name, value, onChange, children }: { name: string; value: string; onChange: (k: string, v: string) => void; children: ReactNode }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${value ? "border-elite-gold/60 bg-elite-gold/10" : "border-elite-line bg-white/5"}`}>
      <input type="checkbox" checked={!!value} onChange={(e) => onChange(name, e.target.checked ? "Yes" : "")} className="mt-0.5 h-5 w-5 shrink-0 accent-elite-gold" />
      <span className="text-white/85">{children}</span>
    </label>
  );
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 10;

function validate(step: StepKey, a: Answers, service: Service): string | null {
  const need = (keys: [string, string][]) => {
    const miss = keys.filter(([k]) => !(a[k] || "").trim()).map(([, l]) => l);
    return miss.length ? `Please fill in: ${miss.join(", ")}.` : null;
  };
  const contact = () => need([["contactName", "your name"], ["email", "email"], ["phone", "phone"]])
    || (!emailOk(a.email || "") ? "That email doesn't look right." : null)
    || (!phoneOk(a.phone || "") ? "Please enter a full phone number with area code." : null);
  switch (step) {
    case "partner":
      return need([["agencyName", "agency name"]]) || contact() || need([["accountsNow", "how many client accounts"]]);
    case "business":
      return (service === "full" ? contact() : null)
        || need([["business", "business name"], ["industry", "industry"], ["offer", "main offer"], ["budget", "monthly ad budget"], ["goals", "at least one goal"]]);
    case "access":
      return need([["hasBM", "whether you have a Business Manager"], ["billing", "how ad spend is billed"]]);
    case "leads":
      return need([["crm", "where leads should go"], ["aiVoice", "AI voice agent interest"]]);
    case "creative":
      return need([["specialCategories", "special ad categories (pick None if none apply)"]]);
    case "review":
      if (!a.agree) return "Please check the ad spend acknowledgement.";
      if ((a.signature || "").trim().length < 3) return "Please type your full name to sign.";
      return null;
  }
}

function load(): { service: Service | null; step: number; a: Answers } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const j = JSON.parse(raw);
      if (j && typeof j === "object") return { service: j.service === "wl" || j.service === "full" ? j.service : null, step: Number(j.step) || 0, a: j.a || {} };
    }
  } catch { /* ignore */ }
  return { service: null, step: 0, a: {} };
}

function asText(a: Answers, service: Service, steps: StepKey[]) {
  const out = [`SOCIAL ELITE CLIENT ONBOARDING (${service === "wl" ? "White-Label Media Buying" : "Full-Service Paid Ads"})`, `Submitted: ${new Date().toLocaleString()}`, ""];
  steps.forEach((s) => {
    const rows = fieldsFor(s, service).filter(([k]) => (a[k] || "").trim());
    if (!rows.length) return;
    out.push(`== ${STEP_META[s].title.toUpperCase()} ==`);
    rows.forEach(([k, l]) => out.push(`${l}: ${a[k]}`));
    out.push("");
  });
  return out.join("\n");
}

const SERVICES = [
  { id: "wl", title: "White-Label Media Buying", tag: "For agencies & partners", copy: "We run Meta ads for your clients under your brand. You own the relationship, we do the fulfillment.", featured: true },
  { id: "full", title: "Full-Service Paid Ads", tag: "For business owners", copy: "We plan, launch and optimize your Meta and Google campaigns, and report straight to you." },
  { id: "voice", title: "AI Receptionist / Voice Agent", tag: "Never miss a call", copy: "An AI receptionist that answers, books and follows up 24/7.", to: "/onboarding" },
  { id: "other", title: "Website / Funnel / Other", tag: "Something else", copy: "Websites, funnels, landing pages and anything not listed here.", to: "/contact" },
] as const;

export function StartOnboardingPage() {
  const init = useMemo(load, []);
  const [params] = useSearchParams();
  const qType = params.get("type");
  const [service, setService] = useState<Service | null>(init.service ?? (qType === "wl" || qType === "full" ? qType : null));
  const [step, setStep] = useState(init.service ? init.step : 0);
  const [a, setA] = useState<Answers>({ landing: "Meta lead forms are fine", ...init.a });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);

  const steps: StepKey[] = useMemo(() => (service === "wl" ? ["partner", "business", "access", "leads", "creative", "review"] : ["business", "access", "leads", "creative", "review"]), [service]);
  const cur = steps[Math.min(step, steps.length - 1)];
  const pct = Math.round(((Math.min(step, steps.length - 1) + 1) / steps.length) * 100);

  useEffect(() => {
    if (done) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ service, step, a })); } catch { /* storage full or blocked */ }
  }, [service, step, a, done]);

  const set = (k: string, v: string) => setA((s) => ({ ...s, [k]: v }));
  const go = (i: number) => { setErr(null); setStep(i); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const choose = (s: Service) => { setService(s); setStep(0); setErr(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => {
    if (!window.confirm("Start over? This clears your saved answers on this device.")) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setA({}); setService(null); setStep(0); setErr(null); setFailed(false);
  };

  const text = service ? asText(a, service, steps) : "";
  const subjectName = service === "wl" ? `${a.agencyName || ""} / ${a.business || ""}` : a.business || "";
  const mailto = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(`Client onboarding: ${subjectName}`)}&body=${encodeURIComponent(text.length > 1800 ? text.slice(0, 1800) + "\n\n[Truncated. Full answers attached as the downloaded file.]" : text)}`;
  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const el = document.createElement("a");
    el.href = url; el.download = `social-elite-onboarding-${(a.business || "answers").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    document.body.appendChild(el); el.click(); el.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const submit = async () => {
    setBusy(true); setErr(null); setFailed(false);
    try {
      const base = await apiBase();
      const r = await fetch(`${base}/onboard/client`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...a, service, submittedAt: new Date().toISOString(), page: "start" }) });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Submission failed.");
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  const next = (e: FormEvent) => {
    e.preventDefault();
    if (!service) return;
    const v = validate(cur, a, service);
    if (v) { setErr(v); return; }
    if (step < steps.length - 1) return go(step + 1);
    void submit();
  };

  const seo = <Seo title="Client Onboarding | Social Elite" description="Start your Social Elite onboarding: white-label media buying, paid ads, AI receptionist and more." path="/start" />;

  if (done) {
    const first = (a.contactName || "").split(" ")[0] || "there";
    return (
      <>
        {seo}
        <PageHeader eyebrow="Client Onboarding" title="You're in. Let's launch." description={`Thanks, ${first}. We have everything we need to get ${a.business || "your account"} moving.`} />
        <section className="section-shell py-12 sm:py-16">
          <div className="glass-card max-w-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">What happens next</h2>
            <ol className="mt-6 space-y-5 text-white/80">
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elite-gold/20 font-semibold text-elite-gold">1</span><span><b className="text-white">We review within 1 business day.</b> Your media buyer goes through every answer and flags anything we need.</span></li>
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elite-gold/20 font-semibold text-elite-gold">2</span><span><b className="text-white">Approve our partner request.</b> Watch for a Meta Business Manager request from Social Elite and approve it. {a.setupForMe ? "Since you asked us to set things up, we'll walk you through it instead." : ""}</span></li>
              <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elite-gold/20 font-semibold text-elite-gold">3</span><span><b className="text-white">Kickoff call.</b> We lock in the strategy, creative and launch date.</span></li>
            </ol>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Book your kickoff call</a>
              <Link to="/" className="btn-secondary">Back to home</Link>
            </div>
            <p className="mt-6 text-sm text-white/60">Questions? Text Jeremy at (210) 442-9987.</p>
          </div>
        </section>
      </>
    );
  }

  if (!service) {
    return (
      <>
        {seo}
        <PageHeader eyebrow="Client Onboarding" title="Welcome to Social Elite. Let's get you launched." description="Pick what we're building together. It takes about ten minutes, works on your phone, and saves as you go." />
        <section className="section-shell py-12 sm:py-16">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {SERVICES.map((s) => {
              const featured = "featured" in s && s.featured;
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-xs uppercase tracking-[0.25em] text-elite-gold">{s.tag}</p>
                    {featured ? <span className="rounded-full bg-elite-gold/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-elite-gold">Most requested</span> : null}
                  </div>
                  <h2 className={`mt-3 font-semibold ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{s.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/70">{s.copy}</p>
                  <span className={`mt-6 ${featured ? "btn-primary" : "btn-secondary"} text-sm`}>{"to" in s ? "Continue" : "Start onboarding"} →</span>
                </>
              );
              const cls = `glass-card block p-6 text-left transition hover:-translate-y-0.5 sm:p-8 ${featured ? "border-elite-gold/60 md:col-span-2" : ""}`;
              return "to" in s ? (
                <Link key={s.id} to={s.to} className={cls}>{inner}</Link>
              ) : (
                <button key={s.id} type="button" onClick={() => choose(s.id as Service)} className={cls}>{inner}</button>
              );
            })}
          </div>
          <p className="mt-8 text-center text-xs text-white/45">Already a client? <Link to="/portal" className="text-elite-gold hover:underline">Open your client portal</Link>.</p>
        </section>
      </>
    );
  }

  const wl = service === "wl";
  const meta = STEP_META[cur];
  return (
    <>
      {seo}
      <PageHeader eyebrow={wl ? "White-Label Onboarding" : "Paid Ads Onboarding"} title={wl ? "Let's launch your client." : "Let's get your ads launched."} description="About ten minutes. Your answers save on this device as you go, so you can come back any time." />
      <section className="section-shell py-10 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-white/55 sm:text-xs sm:tracking-[0.25em]">
            <span>Step {step + 1} of {steps.length} · {meta.title}</span><span>{pct}%</span>
          </div>
          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full bg-elite-gold transition-all" style={{ width: `${pct}%` }} /></div>
          <div className="mb-6 flex items-center justify-between text-xs text-white/50">
            <button type="button" onClick={() => { setService(null); setStep(0); setErr(null); }} className="hover:text-elite-gold">← {wl ? "White-Label Media Buying" : "Full-Service Paid Ads"} · change</button>
            <button type="button" onClick={reset} className="hover:text-elite-gold">Start over</button>
          </div>

          <form onSubmit={next} noValidate className="glass-card p-5 sm:p-8">
            <h2 className="text-2xl font-semibold">{meta.title}</h2>
            <p className="mt-2 text-sm text-white/60">{meta.blurb}</p>
            <div className="mt-8 grid gap-5">
              {cur === "partner" && (<>
                <Field label="Agency name" name="agencyName" required value={a.agencyName || ""} onChange={set} placeholder="Your agency" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" name="contactName" required value={a.contactName || ""} onChange={set} placeholder="First and last" />
                  <Field label="Email" name="email" type="email" inputMode="email" required value={a.email || ""} onChange={set} placeholder="you@agency.com" />
                  <Field label="Mobile" name="phone" type="tel" inputMode="tel" required value={a.phone || ""} onChange={set} placeholder="(210) 555-0100" />
                  <Field label="Agency website" name="agencyWebsite" inputMode="url" value={a.agencyWebsite || ""} onChange={set} placeholder="youragency.com" />
                </div>
                <Choice label="How many client accounts are you onboarding now?" name="accountsNow" required options={["1", "2", "3+", "5+"]} value={a.accountsNow || ""} onChange={set} hint="Fill this form once per client account. We'll send you the link for the rest." />
                <Choice label="How should reporting be branded?" name="reportingBrand" options={["White-label under my agency name", "Co-branded"]} value={a.reportingBrand || ""} onChange={set} />
                <Choice label="Best way to reach you day to day" name="commsChannel" options={["Slack", "WhatsApp", "Email", "Text"]} value={a.commsChannel || ""} onChange={set} />
              </>)}

              {cur === "business" && (<>
                {!wl && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" name="contactName" required value={a.contactName || ""} onChange={set} placeholder="First and last" />
                    <Field label="Email" name="email" type="email" inputMode="email" required value={a.email || ""} onChange={set} placeholder="you@business.com" />
                    <Field label="Mobile" name="phone" type="tel" inputMode="tel" required value={a.phone || ""} onChange={set} placeholder="(210) 555-0100" />
                  </div>
                )}
                {wl ? <p className="rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white/70">Tell us about your client, the business we'll be running ads for.</p> : null}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Business name" name="business" required value={a.business || ""} onChange={set} placeholder="Business name" />
                  <Select label="Industry" name="industry" required options={INDUSTRIES} value={a.industry || ""} onChange={set} />
                  {a.industry === "Other" ? <Field label="Which industry?" name="industryOther" value={a.industryOther || ""} onChange={set} /> : null}
                  <Field label="Website" name="website" inputMode="url" value={a.website || ""} onChange={set} placeholder="business.com" />
                  <Field label="Service area / locations" name="serviceArea" value={a.serviceArea || ""} onChange={set} placeholder="San Antonio + 30 miles, or nationwide" />
                  <Field label="Average ticket / customer value" name="avgTicket" value={a.avgTicket || ""} onChange={set} placeholder="What a typical customer is worth" />
                </div>
                <Area label="Main offer or service to advertise" name="offer" required value={a.offer || ""} onChange={set} placeholder="The one thing we should lead with, and any promo or guarantee." />
                <Choice label="Monthly ad budget (paid to Meta / Google)" name="budget" required options={BUDGETS} value={a.budget || ""} onChange={set} />
                <Choice label="Goals" name="goals" required multi options={GOALS} value={a.goals || ""} onChange={set} />
                <Field label="Target cost per lead / acquisition, if known" name="targetCpa" value={a.targetCpa || ""} onChange={set} placeholder="e.g. under $40 per lead" />
                <Area label="What has worked, or not worked, before?" name="history" value={a.history || ""} onChange={set} placeholder="Past agencies, offers, platforms, results. Honest is best." />
              </>)}

              {cur === "access" && (<>
                <Choice label="Does the business already have a Meta Business Manager?" name="hasBM" required options={["Yes", "No", "Not sure"]} value={a.hasBM || ""} onChange={set} />
                {a.hasBM === "Yes" && (<>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Business Manager ID" name="bmId" inputMode="numeric" value={a.bmId || ""} onChange={set} placeholder="15 to 16 digits" hint="Business Settings → Business info." />
                    <Field label="Ad account ID" name="adAccountId" inputMode="numeric" value={a.adAccountId || ""} onChange={set} placeholder="act_ number or digits" />
                    <Field label="Facebook page URL" name="fbPage" inputMode="url" value={a.fbPage || ""} onChange={set} placeholder="facebook.com/yourpage" />
                    <Field label="Instagram handle" name="igHandle" value={a.igHandle || ""} onChange={set} placeholder="@handle" />
                    <Field label="Pixel / dataset ID (if known)" name="pixelId" inputMode="numeric" value={a.pixelId || ""} onChange={set} />
                  </div>
                  <div className="rounded-2xl border border-elite-gold/40 bg-elite-gold/10 p-5">
                    <p className="font-semibold text-white">Give Social Elite partner access</p>
                    {SE_BUSINESS_ID ? null : <p className="mt-2 text-sm text-white/80">We'll send your partner request from our Business Manager. Just approve it when it arrives.</p>}
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/55">{SE_BUSINESS_ID ? "How to add us" : "Prefer to add us yourself?"}</p>
                    <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-white/80">
                      <li>Open <b>business.facebook.com</b> → <b>Business Settings</b>.</li>
                      <li>Go to <b>Users → Partners</b> and click <b>Add</b>.</li>
                      <li>Choose <b>"Give a partner access to your assets"</b>.</li>
                      <li>Enter our Business ID: {SE_BUSINESS_ID ? <b className="text-elite-gold">{SE_BUSINESS_ID}</b> : <span>we'll send it with your request</span>}.</li>
                      <li>Assign the <b>ad account</b> (Manage campaigns), the <b>Facebook Page</b>, and the <b>Pixel / dataset</b>, then save.</li>
                    </ol>
                  </div>
                </>)}
                {(a.hasBM === "No" || a.hasBM === "Not sure") && (
                  <Check name="setupForMe" value={a.setupForMe || ""} onChange={set}><b>Set it up for me.</b> We build the Business Manager, ad account and pixel from scratch and walk you through approving it.</Check>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Google Ads customer ID (optional)" name="googleAdsId" value={a.googleAdsId || ""} onChange={set} placeholder="123-456-7890" />
                  <Field label="TikTok ads account or handle (optional)" name="tiktok" value={a.tiktok || ""} onChange={set} />
                </div>
                <Choice label="How is ad spend billed?" name="billing" required options={["Client's own card in the ad account (recommended)", "Other"]} value={a.billing || ""} onChange={set} hint="Ad spend is charged by Meta / Google directly to the card on the ad account." />
                {a.billing === "Other" ? <Field label="Tell us how billing should work" name="billingOther" value={a.billingOther || ""} onChange={set} /> : null}
              </>)}

              {cur === "leads" && (<>
                <Choice label="Where should leads go?" name="crm" required options={["GoHighLevel", "HubSpot", "Salesforce", "Other", "None, set one up for me"]} value={a.crm || ""} onChange={set} />
                {a.crm === "Other" ? <Field label="Which CRM?" name="crmOther" value={a.crmOther || ""} onChange={set} /> : null}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Lead alerts go to (emails)" name="notifyEmails" inputMode="email" value={a.notifyEmails || ""} onChange={set} placeholder="one or more, comma separated" />
                  <Field label="Lead alerts go to (mobile numbers)" name="notifyPhones" inputMode="tel" value={a.notifyPhones || ""} onChange={set} placeholder="one or more, comma separated" />
                </div>
                <Area label="Speed to lead: who calls new leads, and how fast?" name="speedToLead" value={a.speedToLead || ""} onChange={set} placeholder="e.g. Front desk calls within 15 minutes during business hours. Nights and weekends wait until morning." />
                <Choice label="Want an AI voice agent that calls every new lead within seconds?" name="aiVoice" required options={["Yes", "Maybe", "No"]} value={a.aiVoice || ""} onChange={set} hint="Leads called in the first minute convert far better than leads called an hour later." />
                <Choice label="Landing page or Meta lead forms?" name="landing" options={["Meta lead forms are fine", "I need a landing page", "I already have a landing page"]} value={a.landing || ""} onChange={set} hint="Lead forms are our default. They're fast to launch and convert well on mobile." />
              </>)}

              {cur === "creative" && (<>
                <Field label="Logo / brand guidelines link" name="brandLink" inputMode="url" value={a.brandLink || ""} onChange={set} placeholder="Drive, Dropbox or website link" />
                <Field label="Photos and videos (Drive / Dropbox link)" name="mediaLink" inputMode="url" value={a.mediaLink || ""} onChange={set} placeholder="Real photos of the team, work and customers perform best" />
                <Field label="Testimonials / reviews link" name="testimonialsLink" inputMode="url" value={a.testimonialsLink || ""} onChange={set} placeholder="Google reviews, Yelp, video testimonials" />
                <Area label="Competitors or brands you admire" name="competitors" value={a.competitors || ""} onChange={set} rows={2} />
                <Area label="Words or claims to avoid" name="avoidWords" value={a.avoidWords || ""} onChange={set} rows={2} placeholder="Anything legal, compliance or the owner doesn't want said." />
                <Choice label="Does the business fall into a Meta special ad category?" name="specialCategories" required multi options={SPECIAL} value={a.specialCategories || ""} onChange={(k, v) => {
                  const parts = v.split(", ").filter(Boolean);
                  const prev = (a.specialCategories || "").split(", ").filter(Boolean);
                  const added = parts.find((x) => !prev.includes(x));
                  set(k, (added === "None of these" ? ["None of these"] : added ? parts.filter((x) => x !== "None of these") : parts).join(", "));
                }} hint="These change how we can target. Being upfront keeps the ad account safe." />
              </>)}

              {cur === "review" && (<>
                <div className="grid gap-4">
                  {steps.filter((s) => s !== "review").map((s) => {
                    const rows = fieldsFor(s, service).filter(([k]) => (a[k] || "").trim());
                    const idx = steps.indexOf(s);
                    return (
                      <div key={s} className="rounded-2xl border border-elite-line bg-white/[0.03] p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-white">{STEP_META[s].title}</p>
                          <button type="button" onClick={() => go(idx)} className="text-sm text-elite-gold hover:underline">Edit</button>
                        </div>
                        {rows.length ? (
                          <dl className="mt-3 grid gap-2 text-sm">
                            {rows.map(([k, l]) => (
                              <div key={k} className="grid gap-0.5 sm:grid-cols-[200px_1fr] sm:gap-4">
                                <dt className="text-white/50">{l}</dt>
                                <dd className="whitespace-pre-wrap break-words text-white/90">{a[k]}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : <p className="mt-2 text-sm text-white/45">Nothing entered.</p>}
                      </div>
                    );
                  })}
                </div>
                <Check name="agree" value={a.agree || ""} onChange={set}>I understand ad spend is billed directly by Meta/Google and is separate from management fees.</Check>
                <Field label="Type your full name to sign" name="signature" required value={a.signature || ""} onChange={set} placeholder="Full name" />
                {a.signature ? <p className="-mt-2 font-display text-2xl italic text-elite-gold/90">{a.signature}</p> : null}
              </>)}
            </div>

            {err ? <p role="alert" className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</p> : null}

            {failed ? (
              <div role="alert" className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 text-sm text-amber-100">
                <p className="font-semibold text-white">We couldn't reach our server just now.</p>
                <p className="mt-1">Your answers are saved on this device. Try again in a minute, or send them to us directly so nothing is lost.</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button type="button" onClick={() => void submit()} disabled={busy} className="btn-primary text-sm disabled:opacity-60">{busy ? "Sending..." : "Try again"}</button>
                  <a href={mailto} className="btn-secondary text-sm">Email my answers</a>
                  <button type="button" onClick={download} className="btn-secondary text-sm">Download my answers</button>
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-4">
              <button type="button" disabled={busy} onClick={() => (step === 0 ? setService(null) : go(step - 1))} className="btn-secondary disabled:opacity-30">Back</button>
              <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">{busy ? "Sending..." : cur === "review" ? "Submit onboarding" : "Continue"}</button>
            </div>
          </form>
          <p className="mt-6 text-center text-xs text-white/45">Your answers go straight to Jeremy and the media buying team. Nothing here is shared or sold.</p>
        </div>
      </section>
    </>
  );
}
