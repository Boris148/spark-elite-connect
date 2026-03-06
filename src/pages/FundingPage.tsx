import { Link } from "react-router-dom";

const proofPoints = [
  "We generate qualified leads for funding companies",
  "Battle-tested strategies from our own funding company (AOS Funds)",
  "50+ industries we can target for your funding products",
  "48-hour campaign launch from onboarding",
  "Creative, media buying, and automation handled under one roof",
];

const offerItems = [
  "Full-funnel ad campaigns that attract ready-to-fund prospects",
  "Landing pages and funnels optimized for funding applications",
  "Sales enablement and CRM automation built for high-volume follow-up",
  "Messaging compliant with your underwriter requirements",
  "Weekly optimization sprints with transparent reporting",
];

const fundingHeroImage = "https://images.unsplash.com/photo-1556740772-1a741367b93e?w=1200&q=80";

export function FundingPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-10 sm:pt-14">
        <div className="absolute inset-0 -z-10">
          <img src={fundingHeroImage} alt="Funding industry workspace" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/70" />
        </div>
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-3xl border border-elite-line bg-black/60 p-5 shadow-gold sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="animate-fade-up">
                <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Funding Growth Partners</p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Marketing That Funding Companies Trust
                </h1>
                <p className="mt-3 text-base font-semibold text-elite-gold sm:text-lg">
                  We don&apos;t just run ads for funding companies — we ARE a funding company. Every strategy you get has been
                  battle-tested with real money on our own deals.
                </p>
                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                  Jeremy owns AOS Funds, so we build campaigns from the inside out: faster launch cycles, cleaner
                  compliance, and leads that underwriters actually want to see.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link to="/contact" className="btn-primary">
                    Book a Strategy Call →
                  </Link>
                  <Link to="/results" className="btn-secondary">
                    See Case Studies →
                  </Link>
                </div>
              </div>

              <div className="glass-card animate-fade-up p-5 [animation-delay:100ms] sm:p-6">
                <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Why Funding Teams Pick Us</p>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  We operate as your in-house growth team with proven funnels, creative, and CRM automation purpose-built
                  for funding offers.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-white/90">
                  {proofPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 text-elite-gold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card p-5">
            <p className="text-2xl font-semibold text-elite-gold">100s</p>
            <p className="mt-2 text-sm text-white/70">Funding businesses worked with</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-2xl font-semibold text-elite-gold">1000s</p>
            <p className="mt-2 text-sm text-white/70">Qualified leads generated</p>
          </div>
          <div className="glass-card p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-2xl font-semibold text-elite-gold">50+</p>
            <p className="mt-2 text-sm text-white/70">Industries targeted for funding offers</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="glass-card p-6 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">What We Offer Funding Companies</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Built for speed, scale, and funded deals</h2>
          <ul className="mt-6 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
            {offerItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell py-10 sm:py-14">
        <div className="relative overflow-hidden rounded-3xl border border-elite-line bg-black/40 p-6 sm:p-8">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(5,126,193,.2),transparent)] bg-[length:200%_100%] animate-shimmer" />
          </div>
          <div className="relative text-center">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Ready to Scale?</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl lg:text-4xl">
              Launch funding lead campaigns in 48 hours.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              If you want a partner who already runs a funding company, book a call and we&apos;ll map your offer,
              target industries, and launch plan.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Book a Strategy Call →
              </Link>
              <Link to="/results" className="btn-secondary">
                See Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
