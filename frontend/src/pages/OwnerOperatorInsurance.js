import { Link } from "react-router-dom";
import { Phone, ArrowRight, IdCard } from "lucide-react";
import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { SectionTitle, Breadcrumbs } from "@/components/shared";
import { FaqAccordion, faqJsonLd } from "@/components/FaqAccordion";
import { BUSINESS } from "@/lib/business";

const NEEDS = [
  ["Primary auto liability", "Required to activate your MC authority (filed via BMC-91)."],
  ["Physical damage", "Protects your truck and trailer — essential if financed."],
  ["Motor truck cargo", "Required by virtually every broker before you can haul."],
  ["Non-trucking liability", "Covers you when driving off-dispatch if you also lease on."],
  ["Occupational accident", "Medical/disability benefits since you have no workers' comp."],
];
const COSTS = [
  "Your CDL experience and driving record (MVR)",
  "Time in business under your own authority (new-authority surcharge under 12 months)",
  "Radius of operation — local/regional vs. long-haul",
  "Commodity hauled — reefer, hazmat, and high-value cost more",
  "Truck age, value, and chosen deductibles",
];
const FAQS = [
  { question: "What insurance do I need to get my MC authority?", answer: "You need primary auto liability filed with the FMCSA via BMC-91 (generally $750,000 minimum, $1,000,000 in practice). Most owner-operators also add physical damage and motor truck cargo to satisfy lenders and brokers." },
  { question: "How much does owner-operator insurance cost in Florida?", answer: "A full owner-operator program in Florida typically runs $700 to $1,400 per month, depending on your experience, driving record, radius, commodity, and equipment. We shop multiple carriers to lower your rate." },
  { question: "How is owner-operator insurance different from fleet insurance?", answer: "Owner-operator policies cover a single power unit and driver, while fleet policies cover multiple trucks and drivers, usually priced per unit with package savings and centralized management." },
];

export default function OwnerOperatorInsurance() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Service", serviceType: "Owner-Operator Insurance", provider: { "@type": "InsuranceAgency", name: BUSINESS.name, telephone: "+1-954-584-3417" }, areaServed: { "@type": "State", name: "Florida" } },
    faqJsonLd(FAQS),
  ];
  return (
    <>
      <Seo
        title="Owner Operator Insurance Florida | Lighthouse"
        description="Owner operator insurance in Florida. Coverage to get your MC authority, cost factors, and how it differs from fleet insurance. Call (954) 584-3417."
        path="/owner-operator-insurance"
        jsonLd={jsonLd}
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Trucking Insurance", to: "/trucking-insurance" }, { label: "Owner-Operator Insurance" }]} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">Owner-Operator Insurance</h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl">Everything a solo owner-operator needs to get on the road, obtain MC authority, and stay compliant — from an independent Florida agent.</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href={BUSINESS.phoneHref} data-testid="ownerop-call" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 font-semibold text-white hover:bg-[#0b8b8a] transition-colors"><Phone className="h-5 w-5" /> Call {BUSINESS.phone}</a>
            <Link to="/contact" data-testid="ownerop-quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-navy hover:bg-slate-100 transition-colors">Get a Free Quote <ArrowRight className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Coverage you need to run your own authority</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">Going out on your own is a big step. Before you can legally haul under your own MC number, you need the right insurance on file with the FMCSA. Here is what most Florida owner-operators carry:</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NEEDS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="grid place-items-center h-11 w-11 rounded-xl bg-teal/10 text-teal"><IdCard className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display font-semibold text-navy">{t}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">What drives your cost</h2>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {COSTS.map((c) => (<li key={c} className="flex gap-2"><span className="text-teal">✓</span> {c}</li>))}
            </ul>
            <Link to="/blog/how-much-does-trucking-insurance-cost-florida-2026" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">See 2026 cost breakdown <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Owner-operator vs. fleet insurance</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">As an owner-operator, you insure a single power unit and yourself as the driver. Fleet policies cover multiple trucks and drivers, are priced per unit, and often include package discounts. If you plan to add trucks, we will structure coverage that grows with you — see our <Link to="/trucking-insurance#fleet" className="text-teal underline underline-offset-2">fleet insurance options</Link>.</p>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <SectionTitle eyebrow="FAQ" title="Owner-operator insurance questions" center />
          <div className="mt-8"><FaqAccordion faqs={FAQS} /></div>
        </div>
      </section>
      <CTABand heading="Ready to get your authority rolling?" sub="We file your BMC-91 fast and shop multiple carriers for your best rate." />
    </>
  );
}
