import { Link } from "react-router-dom";
import { Phone, ArrowRight, PackageCheck } from "lucide-react";
import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { SectionTitle, Breadcrumbs } from "@/components/shared";
import { FaqAccordion, faqJsonLd } from "@/components/FaqAccordion";
import { BUSINESS } from "@/lib/business";

const COVERS = [
  "Collision, overturn, fire, and explosion damage to your load",
  "Theft of cargo (subject to policy conditions)",
  "Water damage and load shift on many policies",
  "Debris removal and refrigeration breakdown (optional add-ons)",
];
const SCENARIOS = [
  ["Load shift", "A hard brake shifts the load and product is crushed in transit."],
  ["Reefer breakdown", "A refrigeration unit fails overnight and a produce load spoils."],
  ["Trailer theft", "A loaded trailer is stolen from a truck stop."],
  ["Water intrusion", "Rain enters through a torn tarp on a flatbed load."],
];
const FAQS = [
  { question: "How much motor truck cargo insurance do I need?", answer: "Most brokers and shippers require a minimum of $100,000, though $250,000 is increasingly common. High-value commodities may require more. We match your limit to the loads you actually haul." },
  { question: "What does cargo insurance not cover?", answer: "Standard policies often exclude certain commodities (money, jewelry, live animals, hazmat), damage from improper securement, and theft from unattended/unlocked vehicles. Always review your exclusions." },
  { question: "Is motor truck cargo insurance required by law?", answer: "Federally, only household goods movers must carry it. In practice, virtually every broker and shipper contractually requires proof of cargo insurance before tendering a load." },
];

export default function CargoInsurance() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Service", serviceType: "Motor Truck Cargo Insurance", provider: { "@type": "InsuranceAgency", name: BUSINESS.name, telephone: "+1-954-584-3417" }, areaServed: { "@type": "State", name: "Florida" } },
    faqJsonLd(FAQS),
  ];
  return (
    <>
      <Seo
        title="Cargo Insurance Florida | Motor Truck Cargo Coverage"
        description="Motor truck cargo insurance in Florida. Learn what it covers, common claims, and the limits brokers require. Independent agent — call (954) 584-3417."
        path="/cargo-insurance"
        jsonLd={jsonLd}
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Trucking Insurance", to: "/trucking-insurance" }, { label: "Cargo Insurance" }]} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">Motor Truck Cargo Insurance</h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl">Protect the freight you haul with the right limits — the coverage brokers and shippers require before they tender you a load.</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={BUSINESS.phoneHref} data-testid="cargo-call" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-semibold text-white hover:bg-[#a3831f] transition-colors"><Phone className="h-5 w-5" /> Call {BUSINESS.phone}</a>
            <Link to="/contact" data-testid="cargo-quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-navy hover:bg-slate-100 transition-colors">Get a Free Quote <ArrowRight className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">What cargo insurance covers</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">Motor truck cargo insurance pays for direct physical loss or damage to the freight you are legally hauling. While federal law only mandates it for household goods carriers, almost no broker will give you a load without it.</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-700">
            {COVERS.map((c) => (<li key={c} className="flex gap-2"><span className="text-gold">✓</span> {c}</li>))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Coverage limits brokers require</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">$100,000 has long been the standard minimum and is still the most common figure on a rate confirmation. More brokers now require <strong>$250,000</strong>, especially for higher-value freight like electronics or pharmaceuticals. Carrying too little can cost you loads; carrying far more than you need wastes premium. We help you match the limit to the freight you actually run.</p>
          <Link to="/blog/motor-truck-cargo-insurance-owner-operators-guide" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">Read the full cargo guide <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <SectionTitle eyebrow="Real World" title="Common cargo claim scenarios" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SCENARIOS.map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="grid place-items-center h-11 w-11 rounded-xl bg-gold/10 text-gold"><PackageCheck className="h-5 w-5" /></span>
                <h3 className="mt-4 font-display font-semibold text-navy">{t}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link to="/trucking-insurance" className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"><h3 className="font-display font-semibold text-navy">Full Trucking Insurance</h3><p className="mt-1 text-sm text-slate-600">See all trucking coverages we offer.</p></Link>
          <Link to="/owner-operator-insurance" className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"><h3 className="font-display font-semibold text-navy">Owner-Operator Insurance</h3><p className="mt-1 text-sm text-slate-600">Coverage to run your own authority.</p></Link>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <SectionTitle eyebrow="FAQ" title="Cargo insurance questions" center />
          <div className="mt-8"><FaqAccordion faqs={FAQS} /></div>
        </div>
      </section>
      <CTABand heading="Get the right cargo limits" sub="We match your coverage to the freight you haul — without overpaying." />
    </>
  );
}
