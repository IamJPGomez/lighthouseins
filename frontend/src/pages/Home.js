import { Link } from "react-router-dom";
import { Phone, ArrowRight, ShieldCheck, Award, HeartHandshake, Star, Container } from "lucide-react";
import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { ServiceCard, SectionTitle, Stars, FeatureItem } from "@/components/shared";
import { BUSINESS, SERVICES, TESTIMONIALS } from "@/lib/business";

export default function Home() {
  return (
    <>
      <Seo
        title="Lighthouse Insurance, Inc. | Sunrise, FL Insurance Agency"
        description="Independent insurance agency in Sunrise, FL offering auto, home, commercial auto, trucking, cargo, owner-operator & fleet insurance. Call (954) 584-3417."
        path="/"
      />

      {/* Hero */}
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {BUSINESS.rating} Google Rating · {BUSINESS.yearsExperience} Years Serving Florida
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
              Protecting What Matters Most to You
            </h1>
            <p className="mt-5 text-lg text-slate-200 leading-relaxed max-w-2xl">
              Personalized insurance for Florida families and businesses. We compare coverage and pricing across multiple carriers — from personal auto and home to trucking, cargo, and owner-operator insurance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={BUSINESS.phoneHref} data-testid="hero-call-button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 font-semibold text-white hover:bg-[#0b8b8a] transition-colors">
                <Phone className="h-5 w-5" /> Call {BUSINESS.phone}
              </a>
              <Link to="/contact" data-testid="hero-quote-button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-navy hover:bg-slate-100 transition-colors">
                Get a Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              {[[BUSINESS.yearsExperience, "Years Experience"], [BUSINESS.rating + "★", "Google Rating"], ["100%", "Dedicated Service"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <div className="font-display text-2xl font-semibold text-white">{n}</div>
                  <div className="text-xs text-slate-300 mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionTitle eyebrow="What We Offer" title="Coverage tailored to your life and your business" subtitle="From everyday drivers and homeowners to owner-operators and growing fleets, we have you covered." center />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (<ServiceCard key={s.id} service={s} />))}
        </div>
      </section>

      {/* Commercial / Trucking highlight */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal mb-2">Commercial & Trucking</span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-navy">Florida trucking insurance from an independent agent</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Whether you are a solo owner-operator getting your MC authority or managing a fleet, we shop primary auto liability, physical damage, motor truck cargo, non-trucking liability, general liability, and occupational accident coverage across multiple carriers to find your best fit.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-teal">✓</span> Owner-operator & fleet programs</li>
              <li className="flex gap-2"><span className="text-teal">✓</span> DOT / MC authority filing assistance (BMC-91)</li>
              <li className="flex gap-2"><span className="text-teal">✓</span> Motor truck cargo limits brokers require</li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/trucking-insurance" data-testid="home-trucking-link" className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-[#162838] transition-colors">
                Explore Trucking Insurance <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/cargo-insurance" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-50 transition-colors">Cargo Insurance</Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=70" alt="Commercial truck on a Florida highway" loading="lazy" width="1000" height="667" className="w-full h-full object-cover aspect-[3/2]" />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionTitle eyebrow="Why Lighthouse" title="More than an agency — your partner in protection" center />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <FeatureItem icon="ShieldCheck" title="Expert Guidance">Luis and our team provide knowledgeable, personalized advice tailored to your needs.</FeatureItem>
          <FeatureItem icon="Award" title="Best Rates">We work with multiple carriers to find competitive rates without compromising coverage.</FeatureItem>
          <FeatureItem icon="Clock" title="Always Available">Responsive service and quick answers whenever you need us.</FeatureItem>
          <FeatureItem icon="HeartHandshake" title="Trusted Service">A 4.9-star rating and years of experience protecting Florida families and businesses.</FeatureItem>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <SectionTitle eyebrow="Client Reviews" title="What our clients say" center />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                <Stars value={5} />
                <blockquote className="mt-3 text-sm text-slate-700 leading-relaxed">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm"><span className="font-semibold text-navy">{t.name}</span><span className="block text-xs text-slate-500">{t.date}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/reviews" className="inline-flex items-center gap-1 text-sm font-semibold text-teal">Read more reviews <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
