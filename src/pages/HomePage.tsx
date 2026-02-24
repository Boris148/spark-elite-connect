import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { resultCards, services } from "../lib/data";

const stats = [
  { label: "Active Clients", value: "13+" },
  { label: "Years Experience", value: "6+" },
  { label: "Industries Served", value: "Multiple" },
];

export function HomePage() {
  return (
    <>
      <section className="section-shell pb-10 pt-10 sm:pt-14 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-fade-up">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">
              Social Elite Marketing Group, LLC
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              <span className="block">Performance Marketing</span>
              <span className="mt-2 block bg-gold-gradient bg-clip-text text-transparent">
                Where Strategy Meets Results
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              We build and optimize growth systems for service businesses and brands that need more qualified leads,
              stronger conversion performance, and clear ROI from their marketing spend.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Book a Strategy Call
              </Link>
              <Link to="/results" className="btn-secondary">
                See Real Campaign Results
              </Link>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-3xl border border-elite-line bg-white/[0.03] p-4 shadow-gold sm:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,.14),transparent_45%)]" />
              <div className="relative">
                <div className="rounded-2xl border border-elite-line bg-black/40 p-4">
                  <img
                    src="/images/logos/logo-color.png"
                    alt="Social Elite Marketing Group logo"
                    className="h-16 w-auto sm:h-20"
                  />
                  <p className="mt-4 text-sm text-white/75">
                    Paid media, lead generation, websites, and growth strategy aligned around measurable business
                    outcomes.
                  </p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {resultCards.slice(0, 2).map((card) => (
                    <div key={card.image} className="overflow-hidden rounded-xl border border-elite-line bg-black/30">
                      <img src={card.image} alt={`${card.industry} ad example`} className="h-32 w-full object-cover" />
                      <div className="p-3">
                        <p className="text-xs uppercase tracking-wide text-elite-gold">{card.industry}</p>
                        <p className="mt-1 text-sm font-semibold">{card.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card animate-fade-up p-5"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <p className="text-2xl font-semibold text-elite-gold sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Services</p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Built for growth-focused businesses</h2>
          </div>
          <Link to="/services" className="hidden text-sm font-medium text-elite-gold hover:text-elite-gold/80 sm:block">
            View all services
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="glass-card animate-fade-up p-5"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-snug">{service.title}</h3>
                <span className="rounded-full border border-elite-line px-3 py-1 text-xs text-elite-gold">
                  {service.price}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{service.description}</p>
              <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-elite-gold hover:text-elite-gold/85">
                Book a Strategy Call →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Proof / Results</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Campaign examples across industries</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            Actual ad account screenshots and campaign examples from client work. We focus on performance decisions
            that improve lead quality, conversion efficiency, and scalability.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultCards.map((card, idx) => (
            <article
              key={card.image}
              className="glass-card animate-fade-up overflow-hidden"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <img src={card.image} alt={`${card.industry} campaign screenshot`} className="h-52 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-elite-gold">{card.industry}</p>
                <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-white/70">{card.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
