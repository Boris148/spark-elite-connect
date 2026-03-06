type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage?: string;
};

export function PageHeader({ eyebrow, title, description, backgroundImage }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-28 lg:py-32">
      {backgroundImage ? (
        <div className="absolute inset-0 -z-20">
          <img src={backgroundImage} alt="Page hero background" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#05070f] via-[#0a0f1c] to-[#05070f]" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/80 via-black/65 to-[#05060c]/85" />
      <div className="absolute inset-0 -z-[5] opacity-70 blur-3xl">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(245,200,120,0.22),_transparent_55%)]" />
      </div>
      <div className="section-shell">
        <div className="max-w-4xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 text-base leading-7 text-white/80 sm:text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
