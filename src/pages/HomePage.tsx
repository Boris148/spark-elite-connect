import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { industriesServed, resultCards, services } from "../lib/data";

const proofBar = [
  { primary: "50+ Industries Served", secondary: "" },
  { primary: "Nearly a Decade in Business", secondary: "Est. 2017" },
  { primary: "Millions in Ad Spend Managed", secondary: "" },
  { primary: "Real Screenshots. Real Results.", secondary: "" },
];

const serviceHighlights = [
  { title: "Paid Media", detail: "Meta, Google, TikTok" },
  { title: "Websites", detail: "High-converting builds" },
  { title: "Full-Service", detail: "Strategy + execution" },
  { title: "White-Label", detail: "Plug-in media buying" },
];

const heroImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80";
const servicesImage = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80";

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-10 sm:pt-14 lg:pt-20">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt="Modern marketing workspace" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/80 to-black/60" />
        </div>
        <div className="section-shell">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-fade-up">
              <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">
                Social Elite Marketing Group, LLC
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                <span className="block">We Turn Ad Spend</span>
                <span className="mt-2 block bg-gold-gradient bg-clip-text text-transparent">Into Revenue. Period.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Social Elite has spent nearly a decade helping businesses across 50+ industries generate leads, close
                deals, and scale profitably through paid media.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary">
                  Book a Strategy Call →
                </Link>
                <Link to="/results" className="btn-secondary">
                  See Our Results →
                </Link>
              </div>
            </div>

            <div className="animate-fade-up [animation-delay:120ms]">
              <div className="relative overflow-hidden rounded-3xl border border-elite-line bg-white/[0.05] p-4 shadow-gold sm:p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(5,126,193,.18),transparent_50%)]" />
                <div className="relative">
                  <div className="rounded-2xl border border-elite-line bg-black/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-elite-gold">Core Disciplines</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {serviceHighlights.map((item) => (
                        <div key={item.title} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-elite-gold">
                            •
                          </span>
                          <div>
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="text-xs text-white/60">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {resultCards.slice(0, 2).map((card) => (
                      <div key={card.image} className="overflow-hidden rounded-xl border border-elite-line bg-black/40">
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
        </div>
      </section>

      <section className="section-shell pb-8">
        <div className="mb-6">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Proof Bar</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofBar.map((item, idx) => (
            <div
              key={item.primary}
              className="glass-card animate-fade-up p-5"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <p className="text-lg font-semibold text-elite-gold sm:text-xl">{item.primary}</p>
              {item.secondary && <p className="mt-1 text-sm text-white/70">{item.secondary}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-10 sm:py-14">
        <div className="absolute inset-0 -z-10">
          <img src={servicesImage} alt="Team reviewing marketing data" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/85" />
        </div>
        <div className="section-shell">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Services</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">What We Do</h2>
            </div>
            <Link to="/services" className="hidden text-sm font-medium text-elite-gold hover:text-elite-gold/80 sm:block">
              View all services
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="glass-card animate-fade-up p-5"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug">{service.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/75">{service.description}</p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex text-sm font-semibold text-elite-gold hover:text-elite-gold/85"
                >
                  Book a Strategy Call →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-10 sm:py-14">
        <div className="glass-card animate-fade-up p-6 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Who We Serve</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Built for businesses across 50+ industries</h2>
          <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
            {industriesServed.join(" · ")} + more
          </p>
        </div>
      </section>

      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Social Proof</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Real screenshots. Real results.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            Placeholder sections below are ready for Google Drive assets and video testimonial embeds. Current example
            screenshots remain in place so the layout stays production-ready while assets are finalized.
          </p>
        </div>
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <div className="glass-card rounded-2xl border-dashed p-5">
            <p className="text-sm font-semibold text-elite-gold">Video Testimonials (Placeholder)</p>
            <p className="mt-2 text-sm text-white/70">
              Embed real client video testimonials here to support the screenshot proof grid.
            </p>
          </div>
          <div className="glass-card rounded-2xl border-dashed p-5">
            <p className="text-sm font-semibold text-elite-gold">Screenshot Grid (Placeholder)</p>
            <p className="mt-2 text-sm text-white/70">
              Replace/expand with Meta Ads Manager screenshots showing ROAS, spend, CPL, and conversions.
            </p>
          </div>
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
