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
        title="Schedule a free strategy call"
        description="Tell us about your business, goals, and current marketing challenges. We’ll review your needs and recommend the best path forward for generating better results."
      />

      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={handleSubmit} className="glass-card animate-fade-up p-6 sm:p-8">
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
                  className="w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-elite-gold/50"
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
              <Field label="Monthly Ad Budget" name="adBudget" placeholder="e.g. 2k - 10k+ per month" required />
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
                placeholder="Tell us about your business, goals, current marketing efforts, and what you want to improve."
                className="w-full rounded-xl border border-elite-line bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-elite-gold/50"
              />
            </div>

            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              Schedule a Free Strategy Call
            </button>
          </form>

          <div className="space-y-4">
            <div className="glass-card animate-fade-up p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Reach out directly or submit the form to start the conversation. Every engagement starts with a
                strategy-first discussion focused on your goals and current opportunities.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <a href={site.phoneHref} className="block font-medium text-elite-gold hover:text-elite-gold/85">
                  {site.phone}
                </a>
                <a href={site.emailHref} className="block font-medium text-elite-gold hover:text-elite-gold/85">
                  {site.email}
                </a>
              </div>
            </div>

            <div className="glass-card animate-fade-up p-6 [animation-delay:100ms] sm:p-8">
              <h2 className="text-xl font-semibold">What to expect on the call</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                  Review your current marketing and lead flow
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                  Identify bottlenecks in traffic, conversion, or follow-up
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elite-gold" />
                  Recommend the best service mix for your goals and budget
                </li>
              </ul>
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
