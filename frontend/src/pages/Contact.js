import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import { Breadcrumbs } from "@/components/shared";
import { api } from "@/lib/api";
import { BUSINESS } from "@/lib/business";

const TYPES = ["Personal Auto", "Homeowners", "Commercial Auto", "Trucking", "Cargo", "Owner-Operator", "Fleet", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", insuranceType: "", zip: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || (!form.phone && !form.email)) {
      toast.error("Please provide your name and a phone or email.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      setSubmittedName(form.name.trim());
      toast.success("Request received! We'll be in touch within 1 business day.");
      setForm({ name: "", phone: "", email: "", insuranceType: "", zip: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please call us at " + BUSINESS.phone);
    } finally {
      setLoading(false);
    }
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.fullAddress)}&output=embed`;

  return (
    <>
      <Seo
        title="Contact Lighthouse Insurance | Sunrise, FL"
        description="Contact Lighthouse Insurance, Inc. in Sunrise, FL. Call (954) 584-3417 or request a free quote for auto, home, trucking, and cargo insurance."
        path="/contact"
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl">Get a fast, no-obligation quote or ask us anything. We're here to help.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy">Reach Lighthouse Insurance</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-3"><span className="grid place-items-center h-11 w-11 rounded-xl bg-gold/10 text-gold shrink-0"><MapPin className="h-5 w-5" /></span><div><p className="font-semibold text-navy">Address</p><p className="text-sm text-slate-600" data-testid="contact-address">{BUSINESS.street}, {BUSINESS.cityStateZip}</p></div></div>
            <a href={BUSINESS.phoneHref} data-testid="contact-phone" className="flex gap-3"><span className="grid place-items-center h-11 w-11 rounded-xl bg-gold/10 text-gold shrink-0"><Phone className="h-5 w-5" /></span><div><p className="font-semibold text-navy">Phone</p><p className="text-sm text-slate-600">{BUSINESS.phone}</p></div></a>
            <a href={BUSINESS.emailHref} className="flex gap-3"><span className="grid place-items-center h-11 w-11 rounded-xl bg-gold/10 text-gold shrink-0"><Mail className="h-5 w-5" /></span><div><p className="font-semibold text-navy">Email</p><p className="text-sm text-slate-600">{BUSINESS.email}</p></div></a>
            <div className="flex gap-3"><span className="grid place-items-center h-11 w-11 rounded-xl bg-gold/10 text-gold shrink-0"><Clock className="h-5 w-5" /></span><div><p className="font-semibold text-navy">Hours</p><p className="text-sm text-slate-600">{BUSINESS.hours}</p></div></div>
          </div>
          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200">
            <iframe title="Lighthouse Insurance location" src={mapSrc} width="100%" height="280" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {submittedName ? (
            <div className="py-6 text-center" data-testid="contact-success">
              <span className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-gold/10 text-gold"><CheckCircle2 className="h-8 w-8" /></span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-navy">Thanks, {submittedName}!</h2>
              <p className="mt-2 text-slate-600">We&apos;ve received your request and will be in touch within <strong>1 business day</strong>.</p>
              <p className="mt-1 text-sm text-slate-500">Need coverage sooner? Call us at <a href={BUSINESS.phoneHref} className="font-semibold text-gold">{BUSINESS.phone}</a>.</p>
              <button onClick={() => setSubmittedName(null)} data-testid="contact-send-another" className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy hover:bg-slate-50 transition-colors">Send another request</button>
            </div>
          ) : (
          <>
          <h2 className="font-display text-2xl font-semibold text-navy">Request a Free Quote</h2>
          <p className="mt-1 text-sm text-slate-500">Fast quotes. No obligation.</p>
          <form onSubmit={submit} className="mt-6 space-y-4" data-testid="contact-form">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input value={form.name} onChange={set("name")} data-testid="contact-name" className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Jane Doe" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input value={form.phone} onChange={set("phone")} data-testid="contact-phone-input" className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="(954) 555-0100" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input value={form.email} onChange={set("email")} data-testid="contact-email" type="email" className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="you@email.com" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Insurance Type</label>
                <select value={form.insuranceType} onChange={set("insuranceType")} data-testid="contact-type" className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold">
                  <option value="">Select...</option>
                  {TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label><input value={form.zip} onChange={set("zip")} data-testid="contact-zip" className="w-full h-11 rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="33351" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Message</label><textarea value={form.message} onChange={set("message")} data-testid="contact-message" rows={4} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Tell us what you need coverage for..." /></div>
            <button type="submit" disabled={loading} data-testid="contact-quote-form-submit-button" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-semibold text-white hover:bg-[#a3831f] transition-colors disabled:opacity-60">
              {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>) : "Request My Quote"}
            </button>
            <p className="text-center text-xs text-slate-500">Prefer to talk? Call <a href={BUSINESS.phoneHref} className="font-semibold text-gold">{BUSINESS.phone}</a></p>
          </form>
          </>
          )}
        </div>
      </section>
    </>
  );
}
