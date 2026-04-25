import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/results", label: "Results" },
  { to: "/funding", label: "Funding" },
  { to: "/data", label: "Data" },
  { to: "/blog", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-elite-line bg-elite-black/85 backdrop-blur-md">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center" aria-label="Social Elite Marketing Group home">
            <img
              src="/images/logos/logo-color.png"
              alt="Social Elite Marketing Group"
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-white/10 text-elite-gold" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://calendly.com/semg-jeremy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ml-2 text-sm"
            >
              Book a Call
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-elite-line bg-white/5 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>

        {open && (
          <nav className="mb-4 animate-fade-up rounded-2xl border border-elite-line bg-black/80 p-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? "bg-white/10 text-elite-gold" : "text-white/85 hover:bg-white/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href="https://calendly.com/semg-jeremy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 text-sm"
              >
                Book a Call
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
