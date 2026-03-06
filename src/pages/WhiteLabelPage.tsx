import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";

const heroBackground = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80";

const partnershipStats = [
  { value: "Est. 2017", label: "Operating since" },
  { value: "50+", label: "Industries supported" },
  { value: "$12M+", label: "Ad spend managed quietly" },
  { value: "<2hr", label: "Average Slack response" },
];

const benefits = [
  {
    icon: "🤝",
    title: "Invisible integration",
    description: "We work inside your Slack, Asana, or ClickUp with your branding front and center.",
  },
  {
    icon: "📊",
    title: "Executive-ready reporting",
    description: "Weekly decks and Loom reviews templated with your logos and talking points.",
  },
  {
    icon: "⚙️",
    title: "Full-stack media buyers",
    description: "Meta, Google, TikTok, YouTube, and funnel consultation handled end-to-end.",
  },
  {
    icon: "🛡️",
    title: "Compliance & QA",
    description: "We protect your client relationships with platform-safe copy and dedicated QA steps.",
  },
];

const howItWorks = [
  {
    title: "Scope & access",
    copy: "Audit live accounts, agree on KPIs, and connect ad platforms + Slack in 48 hours.",
  },
  {
    title: "Launch playbooks",
    copy: "Deploy our pre-built campaign architectures, custom creative briefs, and reporting cadences.",
  },
  {
    title: "Operate in your brand",
    copy: "We join client calls as part of your team or remain fully behind the scenes — your choice.",
  },
  {
    title: "Scale & iterate",
    copy: "Weekly optimization sprints, CRO recommendations, and budget reallocation with proactive communication.",
  },
];

const whoThisIsFor = [
  "Agencies selling retainers faster than fulfillment can keep up",
  "Boutique shops without senior media buyers in-house",
  "Freelancers upgrading offers without hiring a team",
  "Enterprise teams needing overflow capacity for launches",
];

export function WhiteLabelPage() {
  return (
    <>
      <PageHeader
        eyebrow="White-Label Division"
        title="Operate like you have a senior media department on standby."
        description="Plug Social Elite into your fulfillment stack. We handle paid media strategy, launch, optimization, and reporting while you focus on client relationships."
        backgroundImage={heroBackground}
      />

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnershipStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card animate-fade-up p-6 text-center"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <p className="text-2xl font-semibold text-elite-gold">{stat.value}</p>
              <p className="mt-1 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10 max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Benefits</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Why agencies trust Social Elite behind the curtain</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit, idx) => (
            <article
              key={benefit.title}
              className="glass-card animate-fade-up flex flex-col gap-3 p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{benefit.icon}</span>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-sm leading-6 text-white/75">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-12">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Four steps from kickoff to scale</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {howItWorks.map((step, idx) => (
            <article
              key={step.title}
              className="glass-card animate-fade-up p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-elite-gold">0{idx + 1}</span>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/75">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Delivery Infrastructure</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Slack, Loom, and shared dashboards keep your team informed</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Every partnership includes a joint Slack channel, weekly Loom recaps, white-labeled reporting templates, and real-time
              access to the specialists working the account. We remove the guesswork so your CSMs walk into calls confident.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {["Creative requests handled within 48 hours", "Campaign QA checklist documented", "Client-ready talking points delivered weekly"].map(
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
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1500&q=80"
              alt="Delivery infrastructure"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/65" />
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="mb-8 max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Who this is for</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Bring us in when fulfillment has to be flawless</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {whoThisIsFor.map((item, idx) => (
            <div
              key={item}
              className="glass-card animate-fade-up p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <p className="text-sm leading-6 text-white/80">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-[28px] border border-white/5 bg-white/5 p-8">
          <p className="text-sm text-white/70">
            Need NDAs before introducing us to your clients? Already standard. We document communication lanes on kickoff and operate with
            zero surprises.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to scale your agency without hiring?"
        copy="Book a partner call to walk through current accounts, fulfillment bottlenecks, and how Social Elite can operate as your invisible media buying department."
      />
    </>
  );
}
