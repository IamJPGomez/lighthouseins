import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { SectionTitle, Stars, Breadcrumbs } from "@/components/shared";
import { BUSINESS, TESTIMONIALS } from "@/lib/business";

export default function Reviews() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: BUSINESS.name,
    aggregateRating: { "@type": "AggregateRating", ratingValue: BUSINESS.rating, reviewCount: String(BUSINESS.reviewCount) },
  };
  return (
    <>
      <Seo
        title="Client Reviews | Lighthouse Insurance Sunrise FL"
        description="Read what Lighthouse Insurance clients say. 4.9-star rated independent insurance agency in Sunrise, FL. Call (954) 584-3417."
        path="/reviews"
        jsonLd={jsonLd}
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Reviews" }]} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">Client Reviews</h1>
          <div className="mt-5 inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3" data-testid="reviews-google-rating">
            <span className="font-display text-3xl font-semibold text-white">{BUSINESS.rating}</span>
            <div><Stars value={5} /><span className="text-xs text-slate-300">Based on {BUSINESS.reviewCount} Google reviews</span></div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Stars value={5} />
              <blockquote className="mt-3 text-sm text-slate-700 leading-relaxed">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-sm"><span className="font-semibold text-navy">{t.name}</span><span className="block text-xs text-slate-500">{t.date}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CTABand heading="Join our happy clients" sub="Experience the personalized service our clients rave about." />
    </>
  );
}
