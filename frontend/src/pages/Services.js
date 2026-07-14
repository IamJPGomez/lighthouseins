import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { ServiceCard, SectionTitle, Breadcrumbs } from "@/components/shared";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/business";

const DETAILS = [
  { id: "personal-auto", title: "Personal Auto Insurance", body: "Comprehensive and liability coverage for your personal vehicles at competitive Florida rates. We help you balance protection and price, including full coverage, PIP, uninsured motorist, and roadside options." },
  { id: "homeowners", title: "Homeowners Insurance", body: "Protect your home, belongings, and liability with coverage built for Florida homeowners — including wind and hurricane considerations. We shop multiple carriers to find the right dwelling and personal property limits." },
  { id: "commercial-auto", title: "Commercial Auto Insurance", body: "Coverage for business vehicles and small fleets — vans, service trucks, and more. Protect your drivers, vehicles, and liability so your business keeps moving." },
  { id: "trucking", title: "Trucking Insurance", body: "Full trucking programs for owner-operators and fleets: primary auto liability, physical damage, motor truck cargo, non-trucking liability, general liability, and occupational accident coverage.", to: "/trucking-insurance" },
  { id: "cargo", title: "Motor Truck Cargo Insurance", body: "Protect the freight you haul against loss, theft, and damage with the coverage limits brokers and shippers require — typically $100,000 to $250,000 or more.", to: "/cargo-insurance" },
  { id: "owner-operator", title: "Owner-Operator Insurance", body: "Everything a solo owner-operator needs to obtain and keep MC authority — with BMC-91 filing assistance and coverage matched to your operation.", to: "/owner-operator-insurance" },
  { id: "fleet", title: "Fleet Insurance", body: "Scalable programs for growing fleets, priced per unit with package savings across liability, physical damage, and cargo.", to: "/trucking-insurance#fleet" },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Insurance Services in Sunrise, FL | Lighthouse"
        description="Auto, home, commercial auto, trucking, cargo, owner-operator & fleet insurance in Sunrise, FL. Independent agency comparing multiple carriers. (954) 584-3417."
        path="/services"
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services" }]} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">Our Insurance Services</h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl">Personal, home, and commercial coverage — including trucking, cargo, owner-operator, and fleet insurance — all from one trusted independent agency.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (<ServiceCard key={s.id} service={s} />))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-12">
          {DETAILS.map((d) => (
            <div key={d.id} id={d.id} className="scroll-mt-28 grid lg:grid-cols-3 gap-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy">{d.title}</h2>
                {d.to && (<Link to={d.to} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal">Dedicated page <ArrowRight className="h-4 w-4" /></Link>)}
              </div>
              <p className="lg:col-span-2 text-slate-600 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
