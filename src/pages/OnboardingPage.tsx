import { FormEvent, useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { submitOnboarding } from "../lib/portalApi";

type Answers = Record<string, string>;

const STEPS = [
  { key: "business", title: "Your business", blurb: "Who we're building for and how to reach you." },
  { key: "hours", title: "Hours & services", blurb: "What your receptionist needs to know to answer questions and quote correctly." },
  { key: "team", title: "Team & booking", blurb: "Who does what, and where appointments live." },
  { key: "phone", title: "Phone & notifications", blurb: "How calls reach her, and how you hear about them." },
  { key: "voice", title: "Voice & rules", blurb: "How she should sound, and what she should never say." },
] as const;

const BOOKING = ["Vagaro", "Square Appointments", "GlossGenius", "Booksy", "StyleSeat", "Fresha", "Acuity", "Calendly", "Google Calendar", "Paper book", "Phone / text only", "Other"];
const inputCls = "w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-elite-gold/50";
const labelCls = "mb-2 block text-sm font-medium text-white/85";

function Field({ label, name, hint, type = "text", required, value, onChange, placeholder }: { label: string; name: string; hint?: string; type?: string; required?: boolean; value: string; onChange: (k: string, v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>{label}{required ? <span className="text-elite-gold"> *</span> : null}</label>
      <input id={name} name={name} type={type} required={required} value={value} placeholder={placeholder} onChange={(e) => onChange(name, e.target.value)} className={inputCls} />
      {hint ? <p className="mt-1.5 text-xs text-white/45">{hint}</p> : null}
    </div>
  );
}

function Area({ label, name, hint, required, value, onChange, placeholder, rows = 4 }: { label: string; name: string; hint?: string; required?: boolean; value: string; onChange: (k: string, v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div>
      <label htmlFor={name} className={labelCls}>{label}{required ? <span className="text-elite-gold"> *</span> : null}</label>
      <textarea id={name} name={name} rows={rows} required={required} value={value} placeholder={placeholder} onChange={(e) => onChange(name, e.target.value)} className={inputCls} />
      {hint ? <p className="mt-1.5 text-xs text-white/45">{hint}</p> : null}
    </div>
  );
}

function Choice({ label, name, options, value, onChange, hint }: { label: string; name: string; options: string[]; value: string; onChange: (k: string, v: string) => void; hint?: string }) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(name, o)}
            className={`rounded-full border px-4 py-2 text-sm transition ${value === o ? "border-elite-gold bg-elite-gold/15 text-white" : "border-elite-line bg-white/5 text-white/75 hover:border-white/30"}`}>
            {o}
          </button>
        ))}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-white/45">{hint}</p> : null}
    </div>
  );
}

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({ language: "English", numberPreference: "Forward my current number", tone: "Warm & upbeat" });
  const [photos, setPhotos] = useState<{ name: string; data: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const set = (k: string, v: string) => setA((s) => ({ ...s, [k]: v }));
  const pct = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 8).forEach((f) => {
      if (f.size > 8 * 1024 * 1024) { setErr(`${f.name} is over 8MB. Please send a smaller photo.`); return; }
      const rd = new FileReader();
      rd.onload = () => setPhotos((p) => [...p, { name: f.name, data: String(rd.result) }]);
      rd.readAsDataURL(f);
    });
  };

  const next = (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (step < STEPS.length - 1) { setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setBusy(true);
    submitOnboarding({ ...a, photos, submittedAt: new Date().toISOString(), page: "onboarding" })
      .then(() => setDone(true))
      .catch((ex: Error) => setErr(ex.message))
      .finally(() => setBusy(false));
  };

  if (done) {
    return (
      <>
        <PageHeader eyebrow="AI Receptionist" title="You're all set." description={`Thanks, ${a.owner?.split(" ")[0] || "there"}. We have everything we need to start building ${a.business}'s receptionist.`} />
        <section className="section-shell py-16">
          <div className="glass-card max-w-3xl p-8">
            <h2 className="text-2xl font-semibold">What happens next</h2>
            <ol className="mt-6 space-y-4 text-white/80">
              <li><span className="text-elite-gold">Days 1 to 3.</span> We build your receptionist from these answers.</li>
              <li><span className="text-elite-gold">Days 4 to 5.</span> You call her, test her, and we adjust anything you want changed.</li>
              <li><span className="text-elite-gold">Days 6 to 7.</span> We turn her on. Every call gets answered from that day forward.</li>
            </ol>
            <p className="mt-8 text-sm text-white/60">Questions? Text Jeremy at (210) 442-9987.</p>
          </div>
        </section>
      </>
    );
  }

  const s = STEPS[step];
  return (
    <>
      <PageHeader eyebrow="AI Receptionist Onboarding" title="Let's build your receptionist." description="About ten minutes. Answer what you can. Anything you skip, we'll cover on your kickoff call." />
      <section className="section-shell py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/55">
            <span>Step {step + 1} of {STEPS.length} · {s.title}</span><span>{pct}%</span>
          </div>
          <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full bg-elite-gold transition-all" style={{ width: `${pct}%` }} /></div>

          <form onSubmit={next} className="glass-card p-8">
            <h2 className="text-2xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-white/60">{s.blurb}</p>
            <div className="mt-8 grid gap-5">
              {step === 0 && (<>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Business name" name="business" required value={a.business || ""} onChange={set} placeholder="Your business name" />
                  <Field label="Your name" name="owner" required value={a.owner || ""} onChange={set} placeholder="First and last" />
                  <Field label="Your mobile" name="phone" type="tel" required value={a.phone || ""} onChange={set} placeholder="(210) 555-0100" />
                  <Field label="Email" name="email" type="email" required value={a.email || ""} onChange={set} placeholder="you@business.com" />
                </div>
                <Field label="Business phone clients call today" name="businessPhone" type="tel" value={a.businessPhone || ""} onChange={set} hint="The number on your Google listing. We can forward it or leave it alone." />
                <Field label="Address" name="address" value={a.address || ""} onChange={set} placeholder="Street, suite, city, zip" />
                <Field label="Website and social links" name="website" value={a.website || ""} onChange={set} placeholder="yoursite.com, instagram.com/yourshop" />
              </>)}

              {step === 1 && (<>
                <Area label="Hours" name="hours" required value={a.hours || ""} onChange={set} rows={3} placeholder={"Mon to Sat 10am to 8pm\nClosed Sunday\nClosed Thanksgiving, Christmas"} hint="Include days you're closed and any holiday rules." />
                <Area label="Services and prices" name="services" value={a.services || ""} onChange={set} rows={7} placeholder={"Gel manicure $40\nSpa pedicure $55\nAcrylic full set from $55\n..."} hint="Type them, or upload a photo of your menu below. Both is best." />
                <div>
                  <label className={labelCls}>Upload your menu or price list (photos or PDF)</label>
                  <input type="file" accept="image/*,.pdf" multiple onChange={(e) => onFiles(e.target.files)} className="block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-elite-gold/20 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-elite-gold/30" />
                  {photos.length ? <p className="mt-2 text-xs text-white/60">{photos.length} file{photos.length > 1 ? "s" : ""} attached: {photos.map((p) => p.name).join(", ")}</p> : null}
                </div>
                <Area label="Questions clients ask most" name="faq" value={a.faq || ""} onChange={set} rows={3} placeholder="Do you take walk-ins? Do you do kids? Where do I park? Do you have gift cards?" hint="She'll have the right answer ready for each one." />
              </>)}

              {step === 2 && (<>
                <Area label="Your team" name="staff" value={a.staff || ""} onChange={set} rows={4} placeholder={"Reshma – owner, acrylics, gel, nail art\nMaria – gel and dip\nAna – pedicures"} hint="Names and what each person does. Clients often ask for someone by name." />
                <Choice label="How do you book appointments today?" name="bookingSystem" options={BOOKING} value={a.bookingSystem || ""} onChange={set} />
                <Field label="Booking system login or link" name="bookingLogin" value={a.bookingLogin || ""} onChange={set} placeholder="Your booking page link. We'll ask for access on the kickoff call." hint="Never put passwords here. A link is enough." />
              </>)}

              {step === 3 && (<>
                <Choice label="Phone number" name="numberPreference" options={["Forward my current number", "Give me a new number", "Not sure, let's talk"]} value={a.numberPreference || ""} onChange={set} hint="Forwarding means nothing changes for your clients. We can forward only when you don't pick up, or all the time." />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Text booking alerts to" name="notifyPhone" type="tel" value={a.notifyPhone || ""} onChange={set} placeholder="One or more mobile numbers" />
                  <Field label="Email daily summary to" name="notifyEmail" type="email" value={a.notifyEmail || ""} onChange={set} placeholder="you@business.com" />
                </div>
                <Choice label="Languages" name="language" options={["English", "English + Spanish"]} value={a.language || ""} onChange={set} />
              </>)}

              {step === 4 && (<>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name for your receptionist" name="greetingName" value={a.greetingName || ""} onChange={set} placeholder="Bella, Ava, Sofia..." hint="Leave blank and we'll suggest one." />
                  <Choice label="Tone" name="tone" options={["Warm & upbeat", "Calm & polished", "Fun & casual"]} value={a.tone || ""} onChange={set} />
                </div>
                <Area label="Policies" name="policies" value={a.policies || ""} onChange={set} rows={3} placeholder="24-hour cancellation. Deposits for sets over $80. Cash, card, Zelle." />
                <Area label="Things she should never say or promise" name="neverSay" value={a.neverSay || ""} onChange={set} rows={3} placeholder="Never quote a final price for custom work. Never promise a same-day appointment. Never give medical advice." />
                <Area label="Anything else we should know" name="notes" value={a.notes || ""} onChange={set} rows={3} />
              </>)}
            </div>

            {err ? <p className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</p> : null}

            <div className="mt-8 flex items-center justify-between gap-4">
              <button type="button" disabled={step === 0 || busy} onClick={() => { setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn-secondary disabled:opacity-30">Back</button>
              <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">{busy ? "Sending..." : step === STEPS.length - 1 ? "Submit onboarding" : "Continue"}</button>
            </div>
          </form>
          <p className="mt-6 text-center text-xs text-white/45">Your answers go straight to Jeremy and the build team. Nothing here is shared or sold.</p>
        </div>
      </section>
    </>
  );
}
