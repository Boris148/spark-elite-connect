import { CTASection } from "../components/CTASection";

const performerCredits = [
  "Toured nationally as both drummer and guitarist",
  "Dropout Kings (Nu Metal / Rap Metal) — Yokai album and national tours",
  "KiCKFLiP (solo project — vocals/singing)",
  "NDGO, Balancing The Different, Crooked Hands",
  "Multi-instrumentalist: drums, guitar, vocals",
];

const marketingCredits = [
  "Teddy Swims — discovery campaigns",
  "Blackbear — merch campaigns",
  "Bowling For Soup — tour marketing",
  "Catch Your Breath — growth campaigns",
  "Cobra Starship — merch and discovery campaigns",
  "Warner Music, Sony Music partnerships + more",
];

export function MusicPage() {
  return (
    <>
      <section className="section-shell pt-10 sm:pt-14 lg:pt-20">
        <div className="glass-card animate-fade-up p-6 sm:p-8 lg:p-10">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">
            From Jeremys personal resume
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            10+ years in music, touring, live production, and marketing.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
            Jeremy&apos;s background spans performing, front-of-house engineering, and marketing execution for artists,
            labels, and entertainment campaigns. That real-world experience informs how Social Elite builds artist and
            fan growth systems.
          </p>
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            "/images/meta-ads/music/teddy-swims.jpeg",
            "/images/meta-ads/music/blackbear.jpg",
            "/images/meta-ads/music/45x-roas-bowling-for-soup.jpg",
          ].map((src, idx) => (
            <div key={src} className="glass-card animate-fade-up overflow-hidden" style={{ animationDelay: `${idx * 60}ms` }}>
              <img src={src} alt="Music marketing and artist campaign work" className="h-56 w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="glass-card p-6">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">As a Performer</p>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {performerCredits.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-card p-6 lg:col-span-2">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">As a Marketing Partner</p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Marketing partner credits include artist discovery, merch campaigns, and tour promotion support.
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              {marketingCredits.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="glass-card p-6 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">As a FOH Engineer</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Front-of-house engineering experience</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
            Professional front-of-house sound engineering for live events, with a deep understanding of live
            production, audience experience, and execution under pressure.
          </p>
        </div>
      </section>

      <CTASection
        title="Need a team that understands both music and marketing?"
        copy="Social Elite combines artist-world experience with performance marketing execution to build campaigns that move streams, merch, tickets, and fan growth."
      />
    </>
  );
}
