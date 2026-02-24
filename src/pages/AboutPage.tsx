import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { industriesServed } from "../lib/data";

const approachSteps = [
  {
    title: "Audit",
    description: "We analyze your current marketing, identify leaks, and find opportunities.",
  },
  {
    title: "Strategy",
    description: "Custom plan built around your goals, budget, and timeline.",
  },
  {
    title: "Execute",
    description: "We launch, test, optimize, and scale.",
  },
  {
    title: "Report",
    description: "Transparent reporting so you always know where your money goes.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Nearly a Decade of Results."
        description="Social Elite Marketing Group was founded in 2017 with one mission: help businesses grow through strategic digital marketing. Based in San Antonio, TX and serving clients nationwide."
      />

      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-card animate-fade-up p-6 sm:p-8">
            <img
              src="/images/logos/logo-color.png"
              alt="Social Elite Marketing Group logo"
              className="h-16 w-auto sm:h-20"
            />
            <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base">
              Social Elite Marketing Group was founded in 2017 to help businesses grow through strategic paid media,
              conversion-focused websites, and disciplined performance marketing execution.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
              We've worked with businesses across 50+ industries, from local home service companies to national
              e-commerce brands. Our team combines media buying expertise with automation and AI-powered systems to
              deliver results that compound over time.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
              <span className="font-semibold text-white">Based in San Antonio, TX</span> | Serving clients nationwide
            </p>
            <Link to="/contact" className="btn-primary mt-6 text-sm">
              Book a Strategy Call
            </Link>
          </div>

          <div className="space-y-4">
            <div className="glass-card animate-fade-up p-6">
              <h2 className="text-xl font-semibold">Industries We Serve</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">{industriesServed.join(" · ")} + more</p>
            </div>
            {approachSteps.map((step, idx) => (
              <div
                key={step.title}
                className="glass-card animate-fade-up p-6"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <h2 className="text-xl font-semibold text-elite-gold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/75">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-2 sm:py-6">
        <div className="glass-card animate-fade-up p-6 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">The Team</p>
          <ul className="mt-4 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
              <span>Strategic leadership with hands-on media buying experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
              <span>Dedicated account managers for every client</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
              <span>Automation specialists using AI and CRM systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
              <span>Creative support for ad copy, design, and video</span>
            </li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Looking for a marketing partner with a proven process?"
        copy="If you need a team that can audit, strategize, execute, and report with full transparency, book a strategy call to discuss your goals."
      />
    </>
  );
}
