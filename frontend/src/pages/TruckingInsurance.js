import { Link } from "react-router-dom";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { SectionTitle, Breadcrumbs } from "@/components/shared";
import { FaqAccordion, faqJsonLd } from "@/components/FaqAccordion";
import { BUSINESS } from "@/lib/business";

const COVERAGES = [
  ["Primary Auto Liability", "Required for MC/DOT authority. Pays for bodily injury and property damage you cause to others while operating. Usually your largest coverage."],
  ["Physical Damage", "Covers your truck and trailer against collision, fire, theft, and more — priced as a percentage of insured value."],
  ["Motor Truck Cargo", "Protects the freight you haul against loss, theft, and damage, with the limits brokers and shippers require."],
  ["Non-Trucking Liability", "Affordable coverage for leased owner-operators when driving off-dispatch (bobtail)."],
  ["General Liability", "Covers non-driving business risks such as premises and loading/unloading incidents."],
  ["Occupational Accident", "Medical and disability benefits for owner-operators who are not covered by workers' comp."],
];

const FAQS = [
  { question: "What does trucking insurance cover?", answer: "A complete trucking program combines primary auto liability, physical damage, motor truck cargo, non-trucking liability, general liability, and often occupational accident coverage. We tailor the mix to how you operate." },
  { question: "How much does trucking insurance cost in Florida?", answer: "Most Florida owner-operators pay roughly $8,000 to $18,000 per truck per year for a full program. Your rate depends on driving record, experience, radius, commodity, and equipment. We shop multiple carriers to find your best price." },
  { question: "Why use an independent trucking insurance agent?", answer: "An independent agency is not tied to one carrier. We market your risk to many trucking insurers, compare quotes, and explain the trade-offs — which usually saves you money and gets you better coverage." },
  { question: "What insurance do I need for Florida DOT/MC authority?", answer: "The FMCSA requires proof of public liability filed on your behalf (BMC-91), generally $750,000 minimum but $1,000,000 in practice. We can file your BMC-91 the same day your policy is bound." },
  { question: "What is the difference between owner-operator and fleet coverage?", answer: "Owner-operators insure a single power unit and driver, while fleet policies cover multiple trucks and drivers, often priced per unit with package savings and simplified management." },
];

export default function TruckingInsurance() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Service", serviceType: "Trucking Insurance", provider: { "@type": "InsuranceAgency", name: BUSINESS.name, telephone: "+1-954-584-3417" }, areaServed: { "@type": "State", name: "Florida" }, description: "Commercial trucking insurance for owner-operators and fleets across Florida." },
    faqJsonLd(FAQS),
  ];
  return (
    <>
      <Seo
        title="Trucking Insurance Florida | Commercial Truck | Sunrise"
        description="Florida trucking insurance from an independent agent in Sunrise, FL. Liability, physical damage, cargo & more for owner-operators & fleets. (954) 584-3417."
        path="/trucking-insurance"
        image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=70"
        jsonLd={jsonLd}
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Trucking Insurance" }]} />
          <div className="mt-4 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">Trucking Insurance in Florida</h1>
              <p className="mt-4 text-lg text-slate-200">As an independent trucking insurance agent in Sunrise, FL, we shop multiple carriers to build the right program for owner-operators and fleets — at a competitive price.</p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a href={BUSINESS.phoneHref} data-testid="trucking-call" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 font-semibold text-white hover:bg-[#0b8b8a] transition-colors"><Phone className="h-5 w-5" /> Call {BUSINESS.phone}</a>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-navy hover:bg-slate-100 transition-colors">Get a Free Quote <ArrowRight className="h-5 w-5" /></Link>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=70" alt="Commercial truck driving on a Florida highway" loading="lazy" width="1000" height="667" className="rounded-2xl border border-white/10 object-cover aspect-[3/2] w-full" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Complete coverage for the way you run</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">Trucking is a high-stakes business, and the wrong policy can put your authority — and your livelihood — at risk. Whether you are hauling under your own MC authority or leased to a carrier, we help you assemble the coverages that keep you compliant and protected. Because we are independent, we compare quotes from multiple trucking carriers instead of pushing a single company's product.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COVERAGES.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="grid place-items-center h-11 w-11 rounded-xl bg-teal/10 text-teal"><ShieldCheck className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">{t}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="fleet" className="bg-white border-y border-slate-200 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Owner-operator vs. fleet coverage</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">A solo <strong>owner-operator</strong> insures one power unit and driver. If you run your own authority, you carry primary liability full-time; if you are leased on, you may only need physical damage and non-trucking liability. A <strong>fleet</strong> policy covers multiple trucks and drivers, is typically priced per unit, and can unlock package discounts and simpler renewals as you grow.</p>
            <p className="mt-4 text-slate-600 leading-relaxed">Not sure which fits you today — or as you scale? We will map out both and show you the numbers.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Florida DOT & MC authority requirements</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">To run for-hire, the FMCSA requires proof of liability insurance filed on your behalf via form <strong>BMC-91</strong>. The federal minimum is generally $750,000, but nearly every broker requires $1,000,000. Certain hazmat operations require up to $5,000,000. We file your BMC-91 directly with the FMCSA — often the same day your policy is bound — so you can activate your authority without delay.</p>
            <Link to="/blog/dot-mc-authority-insurance-requirements-florida" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">Read our DOT & MC guide <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionTitle eyebrow="Why Independent" title="Why choose an independent trucking insurance agent" />
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">Captive agents can only offer one company. As an independent agency, Lighthouse Insurance markets your operation to multiple trucking carriers, negotiates on your behalf, and reviews your policy every renewal so you never overpay. You get a local, licensed advocate in Sunrise, FL who knows Florida's roads, regulations, and carriers.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Link to="/cargo-insurance" data-testid="related-cargo" className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"><h3 className="font-display font-semibold text-navy">Cargo Insurance</h3><p className="mt-1 text-sm text-slate-600">Motor truck cargo coverage explained.</p></Link>
          <Link to="/owner-operator-insurance" data-testid="related-owner-op" className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"><h3 className="font-display font-semibold text-navy">Owner-Operator Insurance</h3><p className="mt-1 text-sm text-slate-600">Coverage to run your own authority.</p></Link>
          <Link to="/contact" className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"><h3 className="font-display font-semibold text-navy">Get a Quote</h3><p className="mt-1 text-sm text-slate-600">Talk to a local agent today.</p></Link>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <SectionTitle eyebrow="FAQ" title="Trucking insurance questions" center />
          <div className="mt-8"><FaqAccordion faqs={FAQS} /></div>
        </div>
      </section>
      <CTABand heading="Get your Florida trucking quote today" sub="Independent, local, and on your side. Call now for a no-obligation quote." />
    </>
  );
}
