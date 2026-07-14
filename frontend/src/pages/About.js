import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { SectionTitle, FeatureItem, Breadcrumbs } from "@/components/shared";
import { BUSINESS } from "@/lib/business";

const VALUES = [
  ["Integrity", "We believe in honest, transparent communication and always doing what's right for our clients."],
  ["Compassion", "We understand that insurance protects what matters most, and we treat every client with care and respect."],
  ["Excellence", "We strive for excellence in every interaction, ensuring you receive the best service and coverage."],
];

export default function About() {
  return (
    <>
      <Seo
        title="About Lighthouse Insurance | Sunrise, FL Agent"
        description="Learn about Lighthouse Insurance, Inc., an independent agency in Sunrise, FL led by Luis — honest, knowledgeable, personalized insurance service."
        path="/about"
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">About Lighthouse Insurance</h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl">An independent insurance agency proudly serving the Sunrise, Florida community with honest, knowledgeable, and personalized service.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <SectionTitle eyebrow="Our Story" title="Personalized protection since day one" />
          <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
            <p>Founded and led by Luis, Lighthouse Insurance has built its reputation on exceptional customer service, competitive rates, and unwavering dedication to our clients' needs. With over {BUSINESS.yearsExperience} years of experience in the insurance industry, we know how to match Florida families and businesses with the right coverage.</p>
            <p>As an independent agency, we are not tied to any single carrier. That means we shop the market on your behalf — comparing coverage and pricing across multiple insurers to find the protection that fits your life and budget.</p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[[BUSINESS.yearsExperience, "Years"], [BUSINESS.rating, "Rating"], [BUSINESS.reviewCount + "+", "Reviews"]].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <div className="font-display text-2xl font-semibold text-navy">{n}</div>
                <div className="text-xs text-slate-500 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=70" alt="Insurance agent helping a client" loading="lazy" width="900" height="700" className="w-full object-cover aspect-[9/7]" />
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <SectionTitle eyebrow="Why Choose Us" title="We're your partners in protection" center />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <FeatureItem icon="ShieldCheck" title="Expert Guidance">Knowledgeable, personalized insurance advice tailored to your needs.</FeatureItem>
            <FeatureItem icon="Award" title="Best Rates">Multiple carriers compared to find competitive rates without compromising coverage.</FeatureItem>
            <FeatureItem icon="Clock" title="Always Available">Here when you need us with responsive service and quick answers.</FeatureItem>
            <FeatureItem icon="HeartHandshake" title="Trusted Service">A 4.9-star rating and years of experience you can rely on.</FeatureItem>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionTitle eyebrow="Core Values" title="What we stand for" center />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {VALUES.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-navy">{t}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
