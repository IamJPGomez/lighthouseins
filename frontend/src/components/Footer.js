import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS, COMMERCIAL_LINKS } from "@/lib/business";

export const Footer = () => {
  return (
    <footer className="bg-navy-ink text-slate-300" data-testid="site-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 text-white">
            <span className="font-display text-lg font-semibold">Lighthouse Insurance</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Your trusted independent insurance agency in Sunrise, Florida — personalized coverage across multiple carriers.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm">
            <span className="text-amber-400">★</span>
            <span className="font-semibold text-white">{BUSINESS.rating}</span>
            <span className="text-slate-400">Google Rating</span>
          </div>
        </div>

        <div>
          <h3 className="font-display text-white font-semibold mb-3">Contact</h3>
          <address className="not-italic space-y-2 text-sm">
            <div className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-teal shrink-0" /><span>{BUSINESS.street}<br/>{BUSINESS.cityStateZip}</span></div>
            <a href={BUSINESS.phoneHref} data-testid="footer-phone" className="flex gap-2 hover:text-white transition-colors"><Phone className="h-4 w-4 text-teal shrink-0" />{BUSINESS.phone}</a>
            <a href={BUSINESS.emailHref} className="flex gap-2 hover:text-white transition-colors"><Mail className="h-4 w-4 text-teal shrink-0" />{BUSINESS.email}</a>
            <div className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 text-teal shrink-0" /><span>{BUSINESS.hours}</span></div>
          </address>
        </div>

        <div>
          <h3 className="font-display text-white font-semibold mb-3">Personal & Home</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services#personal-auto" className="hover:text-white transition-colors">Personal Auto</Link></li>
            <li><Link to="/services#homeowners" className="hover:text-white transition-colors">Homeowners</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">All Services</Link></li>
            <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-white font-semibold mb-3">Commercial & Trucking</h3>
          <ul className="space-y-2 text-sm">
            {COMMERCIAL_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <p>{BUSINESS.fullAddress} • {BUSINESS.phone}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
