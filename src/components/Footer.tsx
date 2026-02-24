import { Link } from "react-router-dom";
import { site } from "../lib/data";

export function Footer() {
  return (
    <footer className="border-t border-elite-line bg-black/60">
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img
              src="/images/logos/logo-white.png"
              alt={site.shortName}
              className="h-11 w-auto"
            />
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              {site.tagline}. Performance-driven marketing systems built to generate leads, grow revenue, and improve
              ROI.
            </p>
            <Link to="/contact" className="btn-primary mt-5 text-sm">
              Book a Strategy Call
            </Link>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.18em] text-elite-gold">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <a href={site.phoneHref} className="block hover:text-elite-gold">
                {site.phone}
              </a>
              <a href={site.emailHref} className="block hover:text-elite-gold">
                {site.email}
              </a>
              <a
                href="https://socialelitemarketinggroup.com"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-elite-gold"
              >
                socialelitemarketinggroup.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.18em] text-elite-gold">Links</h3>
            <div className="mt-4 grid gap-3 text-sm text-white/80">
              <Link to="/" className="hover:text-elite-gold">
                Home
              </Link>
              <Link to="/services" className="hover:text-elite-gold">
                Services
              </Link>
              <Link to="/results" className="hover:text-elite-gold">
                Results
              </Link>
              <Link to="/funding" className="hover:text-elite-gold">
                Funding
              </Link>
              <Link to="/music" className="hover:text-elite-gold">
                Music
              </Link>
              <Link to="/evergreen" className="hover:text-elite-gold">
                Evergreen
              </Link>
              <Link to="/about" className="hover:text-elite-gold">
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-elite-line pt-6 text-xs text-white/50">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2017-2026 {site.name}. All rights reserved.</p>
            <p>
              Powered by{" "}
              <a
                href="https://crowdsync.ai"
                target="_blank"
                rel="noreferrer"
                className="text-elite-gold hover:text-elite-gold/80"
              >
                CrowdSync
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
