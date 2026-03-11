import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";

const heroImage = "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=1920&q=80";

const problemImage = "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1600&q=80";
const solutionImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80";

const offerPillars = [
  {
    title: "Funding pipelines",
    description: "Meta, Google, and TikTok campaigns engineered to deliver ready-to-fund applicants and SBA prospects.",
  },
  {
    title: "Credit repair demand",
    description: "Sequenced messaging that moves subprime prospects into your credit repair programs before funding re-engagement.",
  },
  {
    title: "Automation + CRM",
    description: "Follow-up cadences, call routing, and underwriting-ready data synced to your CRM within 48 hours.",
  },
];

const stats = [
  { value: "1000s", label: "Applications & credit repair leads generated" },
  { value: "48 hrs", label: "Launch timeline from onboarding" },
  { value: "50+", label: "Industries targeted for capital products" },
];

const howItWorks = [
  { step: "01", title: "Audit & compliance", copy: "Review offers, underwriter guardrails, and states/industries you can legally fund." },
  { step: "02", title: "Funnel build", copy: "Deploy funding + credit repair funnels with pre-approved copy blocks and form logic." },
  { step: "03", title: "Media launch", copy: "Push live across Meta, Google, TikTok, and YouTube with creative calibrated to each audience." },
  { step: "04", title: "Scale & report", copy: "Weekly optimization sprints, underwriting feedback loops, and source-of-truth dashboards." },
];

const deliverables = [
  "Full-funnel creatives for funding + credit repair offers",
  "Landing pages optimized for app completion",
  "CRM automation with speed-to-lead alerts",
  "Real-time underwriting & compliance coordination",
  "Performance dashboards segmented by product line",
  "Sales enablement scripts and objection handling",
];

const faqs = [
  {
    question: "Can you handle both funding and credit repair offers in one pipeline?",
    answer:
      "Yes. We design multi-path funnels where prospects are routed to credit repair or capital offers based on score, docs, and underwriting readiness. Both journeys roll up into shared dashboards for clarity.",
  },
  {
    question: "How fast can campaigns launch?",
    answer:
      "Most engagements go live within 48 hours once ad accounts, CRM access, and compliance approvals are in place. Creative and funnel templates are pre-built from our own funding company (AOS Funds).",
  },
  {
    question: "Do you only run paid ads?",
    answer:
      "Paid media is the core, but every package can include landing page builds, automation, sales enablement, and reporting. We prefer owning the full pipeline so nothing breaks between channels.",
  },
];

export function FundingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Funding + Credit Repair"
        title="Campaigns engineered for companies that fund and fix credit every single day."
        description="We operate our own funding company (AOS Funds), so every playbook here is battle-tested with real underwriting constraints, compliance workflows, and demand-gen pressure."
        backgroundImage={heroImage}
      />

      <section className="section-shell py-20">
        <article className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">The problem</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Funding teams can&apos;t rely on generic lead gen</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Underwriters reject messy leads. Credit repair reps need a different conversation than your capital closers. Agencies often
              bolt on templated funnels that ignore it all. We rebuild acquisition around your underwriting logic so sales only talks to
              applicants they can actually help.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {["Granular targeting by FICO, industry, and revenue", "Messaging pre-cleared with your compliance team", "Lead routing synced to loan officers and credit repair reps"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-elite-line/70">
            <img src={problemImage} alt="Funding operations" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-transparent to-black/65" />
          </div>
        </article>
      </section>

      <section className="section-shell py-20">
        <article className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-[32px] border border-elite-line/70 lg:order-2">
            <img src={solutionImage} alt="Solution workflow" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-transparent to-black/65" />
          </div>
          <div className="lg:order-1">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Our approach</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Funding + credit repair pipelines under one roof</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Because we run AOS Funds, we have the templates, automations, and creative angles ready to go. Your campaigns tap into the
              same infrastructure — only branded for your company.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {offerPillars.map((pillar) => (
                <div key={pillar.title} className="glass-card p-5">
                  <h3 className="text-lg font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card animate-fade-up p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <p className="text-2xl font-semibold text-elite-gold">{stat.value}</p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Launch to scale in four documented phases</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {howItWorks.map((phase, idx) => (
            <article
              key={phase.title}
              className="glass-card animate-fade-up p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-elite-gold">{phase.step}</span>
                <h3 className="text-xl font-semibold">{phase.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/75">{phase.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="glass-card p-8">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">What you get</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">All-in-one support for funding + credit repair teams</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Clarity before we launch</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-elite-line/60 bg-white/5 p-5">
              <summary className="flex cursor-pointer items-center justify-between text-left text-base font-semibold">
                {faq.question}
                <span className="ml-3 text-elite-gold">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-white/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Business Funding</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Apply for Business Funding</h2>
          <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
            See what you qualify for in minutes. Our trusted funding partner Trulli connects you with the right capital solution for your business.
          </p>
        </div>
        <div className="mt-10">
          <TrulliEmbed />
        </div>
      </section>

      <CTASection
        title="Need a partner who understands funding and credit repair?"
        copy="Book a strategy call to map your offers, underwriting requirements, and the launch plan for generating qualified applications plus credit repair demand."
      />
    </>
  );
}
