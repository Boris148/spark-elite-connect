import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { resultCards, testimonials } from "../lib/data";

const roiMetrics = [
  { label: "Client Relationships", value: "13+ Active" },
  { label: "Experience", value: "6+ Years" },
  { label: "Industries", value: "Multiple Verticals" },
  { label: "Approach", value: "Strategy + Execution" },
];

export function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Results"
        title="Campaign results and proof across multiple industries"
        description="These examples showcase the kind of paid media execution and performance thinking Social Elite Marketing Group brings to each account. The goal is not vanity metrics, but revenue-focused outcomes and dependable lead generation."
      />

      <section className="section-shell py-10 sm:py-14">
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
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Testimonials</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">What clients and partners value</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <blockquote
              key={testimonial.name + testimonial.role}
              className="glass-card animate-fade-up p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <p className="text-sm leading-7 text-white/85">“{testimonial.quote}”</p>
              <footer className="mt-5">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-white/60">{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <CTASection
        title="Want results like these for your business?"
        copy="Book a free strategy call and we’ll break down your current marketing, identify quick wins, and outline a performance-first growth plan."
      />
    </>
  );
}
