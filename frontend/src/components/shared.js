import { Link } from "react-router-dom";
import {
  Car, Home, Truck, Container, PackageCheck, IdCard, Star,
  ShieldCheck, Award, Clock, HeartHandshake, ChevronRight,
} from "lucide-react";

export const ICONS = { Car, Home, Truck, Container, PackageCheck, IdCard, ShieldCheck, Award, Clock, HeartHandshake };

export const IconChip = ({ name, className = "" }) => {
  const Icon = ICONS[name] || ShieldCheck;
  return (
    <span className={`grid place-items-center h-12 w-12 rounded-xl bg-slate-50 border border-slate-200 text-navy ${className}`}>
      <Icon className="h-6 w-6" />
    </span>
  );
};

export const Stars = ({ value = 5, className = "" }) => (
  <div className={`flex items-center gap-0.5 text-amber-400 ${className}`} aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < value ? "fill-amber-400" : "fill-none text-slate-300"}`} />
    ))}
  </div>
);

export const SectionTitle = ({ eyebrow, title, subtitle, center = false }) => (
  <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
    {eyebrow && (
      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal mb-2">{eyebrow}</span>
    )}
    <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-navy">{title}</h2>
    {subtitle && <p className="mt-3 text-slate-600 leading-relaxed">{subtitle}</p>}
  </div>
);

export const ServiceCard = ({ service }) => {
  const inner = (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-200">
      <IconChip name={service.icon} />
      <h3 className="mt-4 font-display text-lg font-semibold text-navy">{service.title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.desc}</p>
      {service.to && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
          Learn more <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
  if (service.to) {
    return (
      <Link to={service.to} data-testid={`service-card-${service.id}`} className="block h-full">
        {inner}
      </Link>
    );
  }
  return <div data-testid={`service-card-${service.id}`} id={service.id} className="h-full scroll-mt-28">{inner}</div>;
};

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-1.5">
          {it.to ? (
            <Link to={it.to} className="hover:text-navy transition-colors">{it.label}</Link>
          ) : (
            <span className="text-navy font-medium">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
        </li>
      ))}
    </ol>
  </nav>
);

export const FeatureItem = ({ icon, title, children }) => {
  const Icon = ICONS[icon] || ShieldCheck;
  return (
    <div className="flex gap-4">
      <span className="grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-teal/10 text-teal">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-display font-semibold text-navy">{title}</h3>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{children}</p>
      </div>
    </div>
  );
};
