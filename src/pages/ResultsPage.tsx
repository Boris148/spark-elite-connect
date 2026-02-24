import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { resultCards } from "../lib/data";

const roiMetrics = [
  { label: "Industries Served", value: "50+" },
  { label: "In Business", value: "Est. 2017" },
  { label: "Ad Spend Managed", value: "Millions" },
  { label: "Proof Standard", value: "Real Screenshots" },
];

export function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Results"
        title="The Numbers Dont Lie."
        description="We let the results speak. Every screenshot is real. Every metric is verified. Use the placeholder blocks below for the final screenshot grid, video testimonials, and before/after metrics content."
      />

      <section className="section-shell py-10 sm:py-14">
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <div className="glass-card rounded-2xl border-dashed p-6">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Placeholder</p>
            <h2 className="mt-2 text-xl font-semibold">Screenshot Grid</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Replace this area with a larger grid of Meta Ads Manager screenshots showing ROAS, CPL, spend, and
              conversions from verified accounts.
            </p>
          </div>
          <div className="glass-card rounded-2xl border-dashed p-6">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Placeholder</p>
            <h2 className="mt-2 text-xl font-semibold">Video Testimonials</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Embed real client video testimonials here to pair outcomes with client experience and retention proof.
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resultCards.map((card, idx) => (
            <article
              key={card.image}
              className="glass-card animate-fade-up overflow-hidden"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="relative">
                <img src={card.image} alt={`${card.industry} ad account screenshot`} className="h-56 w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full border border-elite-line bg-black/70 px-3 py-1 text-xs font-medium text-elite-gold">
                  {card.industry}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="mt-2 text-sm font-medium text-elite-gold">{card.metric}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{card.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-6 sm:py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roiMetrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="glass-card animate-fade-up p-5 text-center"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <p className="text-xl font-semibold text-elite-gold">{metric.value}</p>
              <p className="mt-1 text-sm text-white/70">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Before / After</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Key account metrics placeholder</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            Add before/after metrics for top accounts here (CPL, booked calls, close rate, ROAS, revenue impact).
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {["Account A", "Account B", "Account C"].map((label, idx) => (
            <div
              key={label}
              className="glass-card animate-fade-up rounded-2xl border-dashed p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <p className="text-sm font-semibold text-elite-gold">{label}</p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Placeholder for verified before/after metrics and a short summary of performance improvements.
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Want results like these for your business?"
        copy="Book a strategy call and we’ll break down your current marketing, identify quick wins, and outline a performance-first growth plan built around verified numbers."
      />
    </>
  );
}
