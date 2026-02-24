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
              {site.tagline}. Performance-driven marketing strategies designed to generate leads, grow revenue,
              and improve ROI.
            </p>
            <Link to="/contact" className="btn-primary mt-5 text-sm">
              Schedule a Free Strategy Call
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
              <Link to="/about" className="hover:text-elite-gold">
                About
              </Link>
              <div className="mt-2 flex gap-4">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-elite-gold">
                  Facebook
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-elite-gold">
                  Instagram
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-elite-gold">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-elite-line pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
