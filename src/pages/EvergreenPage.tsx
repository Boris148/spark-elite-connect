import { Link } from "react-router-dom";

const artistCredits = [
  "Teddy Swims",
  "Blackbear",
  "Bowling For Soup",
  "Catch Your Breath",
  "Cobra Starship",
  "Warner Music",
  "Sony Music",
];

const steps = [
  "We identify your target audience using data-driven research",
  "Build evergreen ad campaigns that compound streams and followers over time",
  "Optimize weekly by cutting waste and scaling winners",
  "Your music keeps getting discovered long after launch",
];

export function EvergreenPage() {
  return (
    <>
      <section className="section-shell pt-10 sm:pt-14 lg:pt-20">
        <div className="relative overflow-hidden rounded-3xl border border-elite-line bg-white/[0.03] p-6 shadow-gold sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(212,175,55,.14),transparent_45%)]" />
          <div className="relative">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Evergreen Discovery Engine™</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              The System That Puts Artists on the Map.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
              The Evergreen Discovery Engine™ is Social Elite&apos;s proprietary music marketing system, built from
              years of running campaigns for artists, labels, and management companies.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/80 sm:text-base">
              A few names from Jeremy&apos;s personal resume, the creator behind the Evergreen Discovery Engine™:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {artistCredits.map((credit) => (
                <span key={credit} className="rounded-full border border-elite-line bg-black/40 px-3 py-1 text-xs text-white/85">
                  {credit}
                </span>
              ))}
              <span className="rounded-full border border-elite-line bg-black/40 px-3 py-1 text-xs text-elite-gold">
                + more
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, idx) => (
            <article key={step} className="glass-card animate-fade-up p-5" style={{ animationDelay: `${idx * 70}ms` }}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-elite-gold">Step {idx + 1}</p>
              <p className="mt-3 text-sm leading-6 text-white/80">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-card overflow-hidden">
            <img
              src="/images/meta-ads/music/the-take-away--discovery_new-listener-campaign-.png"
              alt="Music discovery campaign example"
              className="h-full min-h-64 w-full object-cover"
            />
          </div>
          <div className="glass-card p-6 sm:p-8">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">How It Works</p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Evergreen growth, not short bursts</h2>
            <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
              This system is designed to compound discovery over time so campaigns keep producing streams, followers,
              and fan growth after launch instead of spiking and dying.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Get Your Music Discovered
              </Link>
              <Link to="/music" className="btn-secondary">
                See Jeremy&apos;s Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
