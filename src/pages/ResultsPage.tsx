import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { resultCards } from "../lib/data";

const resultsHeroImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80";

const headlineStats = [
  { label: "Industries Served", value: "50+" },
  { label: "Ad Spend Managed", value: "$12M+" },
  { label: "Years Operating", value: "Est. 2017" },
  { label: "Screenshots", value: "100% real" },
];

const proofNotes = [
  "Screenshots are pulled directly from Meta, Google, and TikTok manager views.",
  "Numbers are audited internally before publishing anywhere public-facing.",
  "Video testimonials and case studies are provided post-NDA for sensitive verticals.",
];

export function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Results"
        title="Proof first. Story second."
        description="We lead with metrics and verified screenshots, then layer in context. This page houses a small slice of the data we review with clients every week."
        backgroundImage={resultsHeroImage}
      />

      <section className="section-shell py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {headlineStats.map((metric, idx) => (
            <div
              key={metric.label}
              className="glass-card animate-fade-up p-6 text-center"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <p className="text-2xl font-semibold text-elite-gold">{metric.value}</p>
              <p className="mt-1 text-sm text-white/70">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-0 pb-20">
        <div className="mb-12 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Campaign snapshots</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Verified account performance</h2>
          <p className="mt-4 text-sm leading-7 text-white/75">
            Every screenshot is tied to a meeting-ready narrative: objective, media mix, creative shifts, and next steps. Here are a
            handful of the dashboards we share with clients each month.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resultCards.map((card, idx) => (
            <article
              key={card.image}
              className="glass-card animate-fade-up overflow-hidden"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="relative">
                <img src={card.image} alt={`${card.industry} ad account screenshot`} className="h-56 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-elite-gold">
                  {card.industry}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-1 text-sm font-semibold text-elite-gold">{card.metric}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{card.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="rounded-[32px] border border-white/5 bg-white/5 p-8 sm:p-10">
          <div className="mb-6">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Testimonials & Interviews</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Client stories are shared live, not as placeholders</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
              Most of our partners operate in competitive markets. We share testimonial videos, Loom breakdowns, and before/after KPI
              reviews privately once an NDA is in place. Expect curated stories, not filler content blocks.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-white/80">
            {proofNotes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Want results like these for your business?"
        copy="Book a strategy call and we’ll review your current marketing, identify quick wins, and outline a performance-first plan built on verifiable data."
      />
    </>
  );
}
