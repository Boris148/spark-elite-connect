import { FormEvent } from "react";
import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { site } from "../lib/data";

const serviceOptions = [
  "Media Buying (Meta/Google/TikTok)",
  "White Label Media Buying",
  "Full-Service Digital Marketing",
  "Website Development",
  "Lead Generation",
  "Marketing Strategy",
];

export function ContactPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Schedule a strategy conversation"
        description="Share your business goals, current marketing mix, and bottlenecks. We'll map the fastest path to measurable growth."
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80"
      />

      <section className="section-shell py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={handleSubmit} className="glass-card p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Business Name" name="businessName" required />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-medium text-white/85">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-elite-gold/50"
                  defaultValue=""
                  required
                >
                  <option value="" disabled className="bg-elite-black">
                    Select a service
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} className="bg-elite-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Monthly Ad Budget" name="adBudget" placeholder="e.g. 5k - 25k+" required />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/85">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Tell us about your offers, goals, and current marketing stack."
                className="w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-elite-gold/50"
              />
            </div>

            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              Schedule a Free Strategy Call
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/5 bg-gradient-to-br from-[#06070f] via-[#0b0d18] to-[#05060c] p-8">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Contact Information</p>
              <h2 className="mt-3 text-2xl font-semibold">San Antonio HQ, nationwide delivery</h2>
              <p className="mt-3 text-sm text-white/75">
                Fully-remote fulfillment with weekly calls, Loom recaps, and Slack collaboration.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <a href={site.phoneHref} className="block font-medium text-elite-gold">
                  {site.phone}
                </a>
                <a href={site.emailHref} className="block font-medium text-elite-gold">
                  {site.email}
                </a>
                <p className="text-white/70">Hours: Monday - Friday / 9a - 6p CST</p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-semibold">What to expect on the call</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {["Audit your current demand gen", "Identify gaps in traffic, conversion, or follow-up", "Map next steps + service mix"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-semibold">Need answers before booking?</h2>
              <p className="mt-3 text-sm text-white/75">
                Drop a note with timing, budgets, or specific campaign questions. We respond within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need answers before booking?"
        copy="Send a message with your goals and current ad budget. We’ll point you toward the most effective next step."
      />
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", placeholder, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-white/85">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-elite-gold/50"
      />
    </div>
  );
}
