import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export const CTABand = ({
  heading = "Ready to protect what matters most?",
  sub = "Talk to a real, local agent who shops multiple carriers for you — no obligation.",
}) => {
  return (
    <section className="bg-navy" data-testid="cta-band">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          {heading}
        </h2>
        <p className="mt-3 text-slate-300 max-w-2xl mx-auto">{sub}</p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={BUSINESS.phoneHref}
            data-testid="cta-band-call"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal text-white px-6 py-3 font-semibold hover:bg-[#0b8b8a] transition-colors"
          >
            <Phone className="h-4 w-4" /> Call {BUSINESS.phone}
          </a>
          <Link
            to="/contact"
            data-testid="cta-band-quote"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-navy px-6 py-3 font-semibold hover:bg-slate-100 transition-colors"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
