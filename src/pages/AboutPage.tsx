import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";

const values = [
  {
    title: "Strategy First",
    description:
      "Every campaign starts with positioning, audience clarity, and a plan tied to business outcomes instead of guesswork.",
  },
  {
    title: "Results Driven",
    description:
      "We prioritize metrics that matter: qualified leads, booked calls, conversion efficiency, and return on ad spend.",
  },
  {
    title: "Execution With Discipline",
    description:
      "Consistent testing, optimization, and reporting create the compounding improvements most accounts need to scale.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built to help businesses grow with smarter marketing execution"
        description="Social Elite Marketing Group, LLC is led by founder Jeremy Garcia, a performance marketer with 6+ years of experience helping businesses improve lead generation and marketing ROI across multiple industries."
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
              Jeremy Garcia founded Social Elite Marketing Group to bridge a gap many businesses face: they either get
              high-level strategy with weak execution, or tactics without a clear growth plan. The agency is built to
              deliver both.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
              With over 6 years of hands-on experience in paid media and digital marketing, Jeremy focuses on campaign
              systems that are measurable, repeatable, and aligned with the realities of sales pipelines and revenue
              goals.
            </p>
            <Link to="/contact" className="btn-primary mt-6 text-sm">
              Book a Strategy Call With Jeremy
            </Link>
          </div>

          <div className="space-y-4">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className="glass-card animate-fade-up p-6"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <h2 className="text-xl font-semibold text-elite-gold">{value.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/75">{value.description}</p>
              </div>
            ))}
            <div className="glass-card animate-fade-up p-6 [animation-delay:180ms]">
              <h2 className="text-xl font-semibold">Who we work best with</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Service businesses, local brands, and growth-focused teams that want a marketing partner who can build
                a clear strategy, execute consistently, and optimize based on real performance data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Looking for a marketing partner who can think and execute?"
        copy="If you need a team that understands strategy and handles the day-to-day performance work, book a free strategy call to discuss your goals."
      />
    </>
  );
}
