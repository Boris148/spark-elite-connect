type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="section-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="glass-card animate-fade-up p-6 sm:p-8 lg:p-10">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-elite-gold">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/75 sm:text-base">{description}</p>
      </div>
    </section>
  );
}
