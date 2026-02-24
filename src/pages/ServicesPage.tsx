import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { services } from "../lib/data";

export function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Paid media, websites, and growth systems built to scale revenue"
        description="From paid media management to white-label fulfillment, Social Elite offers four core service categories designed for performance, accountability, and measurable business growth."
      />

      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => (
            <article
              key={service.title}
              className="glass-card animate-fade-up flex h-full flex-col p-6"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold leading-snug">{service.title}</h2>
                <span className="shrink-0 rounded-full border border-elite-line bg-white/5 px-3 py-1 text-xs font-medium text-elite-gold">
                  {service.price}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/70">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary mt-6 text-sm">
                Book a Strategy Call
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Need the right service mix for your growth stage?"
        copy="We can map your budget, offer, and sales process to the right combination of paid media, website buildout, full-service support, or white-label media buying."
      />
    </>
  );
}
