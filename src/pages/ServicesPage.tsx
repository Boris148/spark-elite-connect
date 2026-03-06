import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { services } from "../lib/data";

const servicesHeroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80";

export function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Paid media, websites, full-service growth, and white-label fulfillment."
        description="Every engagement includes deep discovery, measurable goals, and transparent reporting. These are the four delivery lanes we run every day."
        backgroundImage={servicesHeroImage}
      />

      <section className="section-shell py-20">
        <div className="space-y-20">
          {services.map((service, idx) => (
            <article key={service.title} className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative overflow-hidden rounded-[32px] border border-elite-line/70">
                  <img src={service.image} alt={`${service.title} showcase`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/25 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-elite-gold">
                    {service.title.split(" ")[0]}
                  </div>
                </div>
              </div>
              <div className={`glass-card p-8 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Service Focus</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{service.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">{service.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary text-sm">
                    Book a Strategy Call
                  </Link>
                  <Link to="/results" className="btn-secondary text-sm">
                    View Proof
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Need the right mix for your growth stage?"
        copy="We’ll map your offers, sales process, and internal resources to the combination of paid media, website builds, and support required to hit goal." 
      />
    </>
  );
}
