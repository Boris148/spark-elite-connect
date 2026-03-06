import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { industriesServed } from "../lib/data";

const heroBackground = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80";

const approachSteps = [
  { title: "Audit", description: "We study your offers, historical data, and sales process to uncover leverage." },
  { title: "Strategy", description: "A rigorously-prioritized plan built around your budget, timeline, and capacity." },
  { title: "Execute", description: "Campaigns launch with QA checklists, creative matrices, and automation hooks." },
  { title: "Report", description: "Transparent dashboards and Loom breakdowns keep leadership informed." },
];

const milestones = [
  {
    year: "2017",
    title: "Agency founded",
    description: "Social Elite Marketing Group launches in San Antonio, TX to bring enterprise-level media buying to service brands.",
  },
  {
    year: "2020",
    title: "White-label division",
    description: "Agencies across the U.S. adopt our fulfillment systems to scale retainers without hiring.",
  },
  {
    year: "2024",
    title: "Funding infrastructure",
    description: "Jeremy launches AOS Funds, applying the same acquisition framework to in-house funding + credit repair.",
  },
];

const values = [
  "Strategy paired with action",
  "Automation + AI woven into daily ops",
  "Communication that feels like in-house",
  "Numbers over narratives",
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Nearly a decade of disciplined growth operations."
        description="Built in San Antonio. Operating nationwide. Social Elite blends senior media buying, automation, and systems thinking to keep revenue engines compounding."
        backgroundImage={heroBackground}
      />

      <section className="section-shell py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Who we are</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Strategy operators, not just marketers</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Social Elite Marketing Group started as a boutique media buying shop and evolved into a full operating partner for founders,
              CMOs, and agencies. We obsess over revenue infrastructure: ads, landing experiences, automations, and reporting.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Today we support clients in {industriesServed.length}+ industries and still run campaigns for our own ventures, keeping every
              playbook grounded in reality.
            </p>
            <a
              href="https://calendly.com/semg-jeremy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 text-sm"
            >
              Book a Strategy Call
            </a>
          </div>
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold">Operating principles</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                  {value}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              Based in San Antonio, TX — serving clients across the U.S. & Canada.
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass-card p-8">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Industries</p>
            <h2 className="mt-3 text-2xl font-semibold">{industriesServed.length}+ verticals served</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">{industriesServed.join(" · ")} + more</p>
          </div>
          <div className="glass-card p-8">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Approach</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {approachSteps.map((step) => (
                <div key={step.title}>
                  <h3 className="text-lg font-semibold text-elite-gold">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-8 max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Milestones</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">A timeline of building Social Elite</h2>
        </div>
        <div className="space-y-6">
          {milestones.map((milestone, idx) => (
            <div
              key={milestone.year}
              className="glass-card animate-fade-up flex flex-col gap-4 p-6"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.35em] text-elite-gold">{milestone.year}</div>
              <h3 className="text-xl font-semibold">{milestone.title}</h3>
              <p className="text-sm leading-6 text-white/75">{milestone.description}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Looking for a marketing partner with a proven process?"
        copy="If you need a team that can audit, strategize, execute, and report with full transparency, book a strategy call to discuss your goals."
      />
    </>
  );
}
