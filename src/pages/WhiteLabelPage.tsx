import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";

const howItWorks = [
  {
    title: "You keep the relationship",
    description: "You stay front-facing with your client. We operate behind the scenes so your brand stays front and center.",
  },
  {
    title: "Full-stack media buying",
    description: "Meta, Google, TikTok, and YouTube campaigns planned, launched, and optimized by specialists who have scaled across 50+ industries.",
  },
  {
    title: "Weekly branded reports",
    description: "Delivery-ready reports with your logo, colors, and talking points — so updates feel seamless inside your agency.",
  },
  {
    title: "Dedicated Slack channel",
    description: "Instant access to our team for creative swaps, budget shifts, and rapid-response campaign adjustments.",
  },
];

const reasons = [
  "Nearly a decade of media buying experience (est. 2017)",
  "Battle-tested strategies instead of guesswork",
  "50+ industries served — we already know your client’s market",
  "Seamless white-label integration — clients never know we exist",
  "Weekly branded reporting and proactive insights",
  "Dedicated communication channel for your internal team",
];

const whoThisIsFor = [
  "Agencies without in-house media buyers",
  "Teams scaling beyond current fulfillment capacity",
  "Freelancers who want to offer paid media without learning every platform",
  "Agencies losing clients over inconsistent ad performance",
];

export function WhiteLabelPage() {
  return (
    <>
      <section className="section-shell pt-10 sm:pt-14 lg:pt-20">
        <div
          className="relative overflow-hidden rounded-3xl border border-elite-line bg-white/5 shadow-gold"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(3,7,18,0.5), rgba(3,7,18,0.92)), url('https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">White-Label Division</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              White-Label Media Buying for Agencies
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
              Your branding. Our expertise. Stop losing clients over ad performance — outsource your media buying to a
              team that has managed millions in ad spend across 50+ industries.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary text-base">
                Partner With Us
              </Link>
              <Link to="/results" className="btn-secondary text-base">
                See Our Proof
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {["Millions managed", "Est. 2017", "50+ industries"].map((stat) => (
                <div key={stat} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  {stat}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        </div>
      </section>

      <PageHeader
        eyebrow="Program Overview"
        title="Operate like you have a senior media department on standby"
        description="Plug Social Elite directly into your delivery stack. We handle strategy, launch, optimization, and reporting while you focus on sales, client management, and scaling your agency."
      />

      <section className="section-shell py-10 sm:py-14">
        <div className="mb-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">How It Works</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">A simple four-step partnership</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {howItWorks.map((item, idx) => (
            <article
              key={item.title}
              className="glass-card animate-fade-up flex h-full flex-col p-6"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <span className="text-sm font-semibold text-elite-gold">{`0${idx + 1}`}</span>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Why Agencies Choose Us</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Fulfillment you can trust with your best clients</h2>
            <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
              When you bring us in, you get a fulfillment team that’s already battle-tested in Meta, Google, TikTok, and
              YouTube. We plug into your processes, keep you informed with proactive communication, and protect your
              brand as if it were ours.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason} className="rounded-2xl border border-elite-line/60 bg-white/5 p-4 text-sm text-white/80">
                  {reason}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className="relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-elite-line"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(3,7,18,0.35), rgba(3,7,18,0.85)), url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1500&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col justify-end p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-elite-gold">Delivery Infrastructure</p>
                <h3 className="mt-3 text-2xl font-semibold">Slack + weekly reports + direct platform access</h3>
                <p className="mt-3 text-sm text-white/80">
                  Every engagement includes a dedicated Slack channel, weekly white-labeled reporting, and full campaign
                  transparency so you always walk into client calls with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-10 sm:pb-14">
        <div className="mb-6">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Who This Is For</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">The perfect fit if you’re scaling delivery</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {whoThisIsFor.map((item, idx) => (
            <div
              key={item}
              className="glass-card animate-fade-up flex items-start gap-4 p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-elite-gold" />
              <p className="text-sm leading-6 text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to scale your agency without hiring?"
        copy="Book a partner call to walk through your current accounts, fulfillment bottlenecks, and how Social Elite can operate as your invisible media buying department."
      />
    </>
  );
}
