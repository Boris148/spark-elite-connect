import { Link } from "react-router-dom";

type CTASectionProps = {
  title?: string;
  copy?: string;
  backgroundImage?: string;
};

export function CTASection({
  title = "Ready to turn strategy into measurable growth?",
  copy = "Book a strategy call to review your current marketing, identify missed opportunities, and build a plan focused on lead quality and ROI.",
  backgroundImage,
}: CTASectionProps) {
  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10">
        {backgroundImage ? (
          <>
            <img src={backgroundImage} alt="CTA background" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-[#05070d]/80" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(210,180,120,0.25),_transparent_55%),linear-gradient(135deg,#05070f,#0b1020,#05070f)]" />
        )}
        <div className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Strategy Call</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">{copy}</p>
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
