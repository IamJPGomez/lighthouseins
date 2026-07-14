import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone, Menu, ChevronDown, Ship } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS, NAV_LINKS, COMMERCIAL_LINKS } from "@/lib/business";

const linkBase =
  "text-sm font-medium text-slate-700 hover:text-navy transition-colors";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className="sticky top-0 z-50 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200"
      data-testid="site-header"
    >
      {/* Top utility strip */}
      <div className="bg-navy text-slate-200 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <span className="hidden sm:inline whitespace-nowrap">{`${BUSINESS.street}, ${BUSINESS.cityStateZip}`}</span>
          <span className="sm:hidden">Sunrise, FL</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-300">{BUSINESS.hoursShort}</span>
            <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-teal transition-colors" data-testid="topbar-phone">
              <Phone className="h-3.5 w-3.5" /> {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5" data-testid="header-logo">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-navy text-white">
              <Ship className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold text-navy leading-tight">
              Lighthouse<span className="text-teal">.</span>
              <span className="block text-[10px] font-medium tracking-wide text-slate-500 uppercase">Insurance, Inc.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            <NavLink to="/" className={linkBase} data-testid="nav-home">Home</NavLink>
            <NavLink to="/about" className={linkBase} data-testid="nav-about">About</NavLink>
            <NavLink to="/services" className={linkBase} data-testid="nav-services">Services</NavLink>

            {/* Commercial Insurance dropdown */}
            <div className="relative group" data-testid="nav-commercial">
              <button className={`${linkBase} inline-flex items-center gap-1`}>
                Commercial Insurance <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-150">
                <div className="rounded-xl border border-slate-200 bg-white shadow-lg p-2">
                  {COMMERCIAL_LINKS.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      data-testid={`nav-commercial-${l.to.replace(/[/#]/g, "")}`}
                      className="block rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <span className="block text-sm font-semibold text-navy">{l.label}</span>
                      <span className="block text-xs text-slate-500">{l.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <NavLink to="/reviews" className={linkBase} data-testid="nav-reviews">Reviews</NavLink>
            <NavLink to="/blog" className={linkBase} data-testid="nav-blog">Blog</NavLink>
            <NavLink to="/contact" className={linkBase} data-testid="nav-contact">Contact</NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={BUSINESS.phoneHref} data-testid="header-call-button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-50 transition-colors">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <Link to="/contact" data-testid="header-quote-button" className="inline-flex items-center rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b8b8a] transition-colors">
              Get a Quote
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <a href={BUSINESS.phoneHref} data-testid="header-mobile-call" className="grid place-items-center h-10 w-10 rounded-xl bg-teal text-white">
              <Phone className="h-5 w-5" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button data-testid="mobile-menu-button" aria-label="Open menu" className="grid place-items-center h-10 w-10 rounded-xl border border-slate-200 text-navy">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-96 overflow-y-auto">
                <div className="mt-6 flex flex-col gap-1">
                  {NAV_LINKS.map((l) => (
                    <Link key={l.to} to={l.to} onClick={() => setOpen(false)} data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                      className={`rounded-lg px-3 py-3 text-base font-medium ${isActive(l.to) ? "bg-slate-100 text-navy" : "text-slate-700"}`}>
                      {l.label}
                    </Link>
                  ))}
                  <div className="mt-2 border-t pt-3">
                    <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Commercial Insurance</p>
                    {COMMERCIAL_LINKS.map((l) => (
                      <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col gap-2 px-1">
                    <a href={BUSINESS.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white">
                      <Phone className="h-4 w-4" /> Call {BUSINESS.phone}
                    </a>
                    <Link to="/contact" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-xl bg-teal px-4 py-3 text-sm font-semibold text-white">
                      Get a Free Quote
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
