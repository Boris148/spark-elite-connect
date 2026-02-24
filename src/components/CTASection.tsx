import { Link } from "react-router-dom";

type CTASectionProps = {
  title?: string;
  copy?: string;
};

export function CTASection({
  title = "Ready to turn strategy into measurable growth?",
  copy = "Book a strategy call to review your current marketing, identify missed opportunities, and build a plan focused on lead quality and ROI.",
}: CTASectionProps) {
  return (
    <section className="section-shell py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-elite-line bg-gradient-to-br from-white/5 to-white/[0.02] p-6 shadow-gold sm:p-8 lg:p-10">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,.15),transparent)] bg-[length:200%_100%] animate-shimmer" />
        </div>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">Strategy Call CTA</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base">{copy}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Book a Strategy Call
            </Link>
            <Link to="/results" className="btn-secondary">
              View Results
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
