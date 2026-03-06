import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { industriesServed, resultCards, services } from "../lib/data";

const heroImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80";
const splitShowcase = [
  {
    title: "Strategy married to execution",
    description:
      "We pair rigorous account architecture with daily optimization so every dollar deployed is measured, protected, and reallocated toward what moves the needle.",
    bullets: ["Offer + funnel alignment", "Creative built from insights", "Real-time reporting"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80",
  },
  {
    title: "A partner across the entire journey",
    description:
      "From paid media to landing page builds and white-label fulfillment, Social Elite plugs into every layer of your revenue engine.",
    bullets: ["Meta · Google · TikTok", "CRO + site builds", "White-label media buying"],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80",
  },
];

const performanceStats = [
  { value: "50+", label: "Industries Served" },
  { value: "Est. 2017", label: "Nearly a decade operating" },
  { value: "$12M+", label: "Ad Spend Managed" },
  { value: "92%", label: "Client retention on retainers" },
];

const industriesCopy =
  "From home services and med spas to SaaS, legal, and funding companies, Social Elite builds campaigns that respect the nuances of each market while applying proven acquisition infrastructure.";

export function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden py-24 sm:py-28 lg:py-32">
        <div className="absolute inset-0 -z-20">
          <img src={heroImage} alt="Modern marketing workspace" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/70 to-[#05060c]/85" />
        <div className="absolute inset-0 -z-[5] opacity-70 blur-3xl">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(245,200,120,0.25),_transparent_55%)]" />
        </div>
        <div className="section-shell text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Social Elite Marketing Group</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Paid media, websites, and white-label fulfillment built for brands that expect proof.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
            We run disciplined acquisition systems for brands that need more than hype: clean reporting, proactive strategy,
            and operators who have scaled across 50+ industries.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://calendly.com/semg-jeremy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Strategy Call →
            </a>
            <Link to="/results" className="btn-secondary">
              See Results →
            </Link>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {performanceStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left">
                <p className="text-2xl font-semibold text-elite-gold">{stat.value}</p>
                <p className="mt-2 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Proof Points</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Operators trusted by founders, CMOs, and agencies</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {["50+ Industries", "Est. 2017", "Millions Managed", "White-Label Ready"].map((item, idx) => (
            <div
              key={item}
              className="glass-card animate-fade-up p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <p className="text-lg font-semibold text-white">{item}</p>
              <p className="mt-2 text-sm text-white/70">
                {idx === 0 && "Vertical experience that shortens the learning curve."}
                {idx === 1 && "Nearly a decade refining the same operating system."}
                {idx === 2 && "Every campaign tied to accountable metrics."}
                {idx === 3 && "Plug us in as your invisible delivery team."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#06070f] via-[#0b0d18] to-[#05060c]" />
        <div className="section-shell">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Services</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">What we execute</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                Four core service lines cover every lever required to scale offers: disciplined media buying, conversion-first builds,
                full-service growth, and white-label fulfillment for agencies.
              </p>
            </div>
            <Link to="/services" className="text-sm font-semibold text-elite-gold hover:text-elite-gold/80">
              Explore the services →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, idx) => (
              <article
                key={service.title}
                className="glass-card animate-fade-up flex h-full flex-col gap-4 p-6"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10">
                    <img src={service.image} alt={`${service.title} visual`} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold leading-tight">{service.title}</h3>
                </div>
                <p className="text-sm leading-6 text-white/75">{service.description}</p>
                <a
                  href="https://calendly.com/semg-jeremy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-elite-gold hover:text-elite-gold/80"
                >
                  Book a call →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-12 text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Integrated Delivery</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Images belong to the story, not as dividers</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/75">
            From concept to conversion, our creative team produces scroll-stopping content that drives real results.
          </p>
        </div>
        <div className="space-y-16">
          {splitShowcase.map((block, idx) => (
            <article key={block.title} className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative overflow-hidden rounded-[32px] border border-elite-line shadow-gold">
                  <img src={block.image} alt={block.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
                </div>
              </div>
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">{`0${idx + 1}`}</p>
                <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{block.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/75">{block.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-elite-gold" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative isolate py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#05060c] via-[#080b16] to-[#05060c]" />
        <div className="section-shell">
          <div className="rounded-[32px] border border-white/5 bg-white/5 p-10 text-center">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Industries</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Built for complex offers across {industriesServed.length}+ sectors</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/75">{industriesCopy}</p>
            <p className="mx-auto mt-5 max-w-4xl text-sm font-medium text-white/80">{industriesServed.join(" · ")} + more</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Results</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Real metrics. Real screenshots.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
            We publish verified account data. Below are a few snapshots of live campaigns from the Social Elite operating system.
          </p>
        </div>
        <div className="mb-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { value: "$120M+", label: "Pipeline influenced" },
            { value: "4.3x", label: "Average blended ROAS across eCom cohorts" },
            { value: "38%", label: "Avg. CPL reduction in service verticals" },
            { value: "<24h", label: "Response time inside active retainers" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card animate-fade-up p-6 text-center"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <p className="text-2xl font-semibold text-elite-gold">{stat.value}</p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resultCards.map((card, idx) => (
            <article
              key={card.image}
              className="glass-card animate-fade-up overflow-hidden"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="relative">
                <img src={card.image} alt={`${card.industry} campaign screenshot`} className="h-52 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
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

      <CTASection />
    </>
  );
}
