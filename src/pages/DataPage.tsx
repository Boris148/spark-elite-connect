import { Link } from "react-router-dom";

const heroImage = "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1920&q=80";
const servicesImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80";

const stats = [
  { value: "280M", label: "US consumers" },
  { value: "60+ Billion", label: "Behaviors tracked weekly" },
  { value: "1,000+", label: "Advertisers and agencies served" },
  { value: "60+", label: "Data points per individual" },
];

const offerings = [
  {
    title: "Audience Sync",
    description:
      "Unify first-party and third-party audiences to launch precise campaigns across Meta, Google, TikTok, and programmatic channels.",
  },
  {
    title: "Super Pixel",
    description:
      "Capture richer intent signals than standard platform pixels to improve attribution, audience quality, and optimization speed.",
  },
  {
    title: "Canvassing",
    description:
      "Turn offline outreach and field responses into actionable digital segments for follow-up campaigns and retargeting.",
  },
  {
    title: "Data Licensing",
    description:
      "Access premium audience datasets to support media buying, strategic planning, and competitive market expansion.",
  },
  {
    title: "Enrichment",
    description:
      "Append missing firmographic and consumer attributes to strengthen lead scoring, personalization, and sales readiness.",
  },
];

const workflowBullets = [
  "Connect your CRM, ad accounts, and existing audience files",
  "Map high-value segments using CrowdSync intelligence layers",
  "Activate campaigns with tailored creative and channel-specific audiences",
  "Optimize weekly with feedback loops across media, sales, and reporting",
];

export function DataPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden py-24 sm:py-28 lg:py-32">
        <div className="absolute inset-0 -z-20">
          <img src={heroImage} alt="Data intelligence dashboard" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/70 to-[#04070f]/85" />
        <div className="absolute inset-0 -z-[5] opacity-70 blur-3xl">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(245,200,120,0.2),_transparent_58%)]" />
        </div>
        <div className="section-shell">
          <div className="max-w-4xl">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">CrowdSync Data</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Data-Driven Marketing. Precision Targeting.
            </h1>
            <p className="mt-6 text-base leading-7 text-white/80 sm:text-lg">
              CrowdSync gives Social Elite clients a measurable targeting advantage with identity-informed audiences,
              behavior-level insights, and activation workflows built for modern performance marketing.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Get a Free Demo
              </Link>
              <a
                href="https://calendly.com/semg-jeremy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Power of Data</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Scale decisions with deeper market visibility</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <article
              key={stat.label}
              className="glass-card animate-fade-up p-6"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <p className="text-2xl font-semibold text-elite-gold">{stat.value}</p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[32px] border border-elite-line/70">
            <img src={servicesImage} alt="Data services in action" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-transparent to-black/65" />
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Data Services</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Five CrowdSync-powered capabilities</h2>
            <div className="mt-6 grid gap-4">
              {offerings.map((offering) => (
                <article key={offering.title} className="glass-card p-5">
                  <h3 className="text-xl font-semibold">{offering.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">{offering.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="glass-card p-8 sm:p-10">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">How It Works</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">From raw data to revenue-ready campaigns</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/75 sm:text-base">
            We combine CrowdSync&apos;s identity and behavior data with Social Elite&apos;s creative and media buying
            frameworks to produce faster learning cycles, cleaner targeting, and stronger lead quality across every
            campaign you launch.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/80 sm:text-base">
            {workflowBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(53,166,219,0.2),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(245,200,120,0.18),transparent_50%),linear-gradient(135deg,#05070f,#0b1020,#05070f)]" />
          <div className="relative flex flex-col gap-7 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">CrowdSync Advantage</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Give your campaigns an unfair data advantage</h2>
              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                Partner with Social Elite to combine premium data intelligence with proven creative execution and
                full-funnel performance management.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Get a Free Demo
              </Link>
              <a
                href="https://calendly.com/semg-jeremy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
