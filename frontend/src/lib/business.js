// Single source of truth for NAP (must match Google Business Profile exactly)
export const BUSINESS = {
  name: "Lighthouse Insurance, Inc.",
  shortName: "Lighthouse Insurance",
  street: "10242 NW 47th St, Suite 10",
  city: "Sunrise",
  state: "FL",
  zip: "33351",
  get cityStateZip() {
    return `${this.city}, ${this.state} ${this.zip}`;
  },
  get fullAddress() {
    return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
  },
  phone: "(954) 584-3417",
  phoneHref: "tel:+19545843417",
  email: "luis@lhinsur.com",
  emailHref: "mailto:luis@lhinsur.com",
  website: "https://lighthouseinsgroup.com",
  hours: "Monday – Friday: 9 AM – 5 PM",
  hoursShort: "Mon–Fri 9AM–5PM",
  rating: "4.9",
  reviewCount: 17,
  yearsExperience: "20+",
  logo: "https://lighthouseinsgroup.com/lighthouse-logo.svg",
};

export const SITE_URL = "https://lighthouseinsgroup.com";

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

// Commercial / Trucking Insurance dropdown
export const COMMERCIAL_LINKS = [
  { label: "Trucking Insurance", to: "/trucking-insurance", desc: "Complete coverage for Florida truckers" },
  { label: "Cargo Insurance", to: "/cargo-insurance", desc: "Motor truck cargo protection" },
  { label: "Owner-Operator Insurance", to: "/owner-operator-insurance", desc: "Coverage to run your own authority" },
  { label: "Commercial Auto Insurance", to: "/services#commercial-auto", desc: "Business vehicles & fleets" },
];

export const SERVICES = [
  {
    id: "personal-auto",
    icon: "Car",
    title: "Personal Auto Insurance",
    desc: "Comprehensive coverage for your vehicle with competitive rates and personalized service.",
  },
  {
    id: "homeowners",
    icon: "Home",
    title: "Homeowners Insurance",
    desc: "Safeguard your home and belongings with comprehensive homeowners insurance coverage.",
  },
  {
    id: "commercial-auto",
    icon: "Truck",
    title: "Commercial Auto Insurance",
    desc: "Protect your business vehicles and fleet with tailored commercial auto insurance solutions.",
  },
  {
    id: "trucking",
    icon: "Container",
    title: "Trucking Insurance",
    desc: "Primary liability, physical damage & more for owner-operators and fleets across Florida.",
    to: "/trucking-insurance",
  },
  {
    id: "cargo",
    icon: "PackageCheck",
    title: "Motor Truck Cargo Insurance",
    desc: "Protect the freight you haul against loss, theft, and damage with the limits brokers require.",
    to: "/cargo-insurance",
  },
  {
    id: "owner-operator",
    icon: "IdCard",
    title: "Owner-Operator Insurance",
    desc: "Everything a solo owner-operator needs to obtain MC authority and stay compliant.",
    to: "/owner-operator-insurance",
  },
  {
    id: "fleet",
    icon: "Truck",
    title: "Fleet Insurance",
    desc: "Scalable programs for growing fleets — priced per unit with package savings.",
    to: "/trucking-insurance#fleet",
  },
];

export const TESTIMONIALS = [
  {
    name: "Lucy Molina",
    date: "2 months ago",
    text: "I had such a great experience with Lighthouse Insurance! From the start, Luis was incredibly helpful, professional, and knowledgeable. He really took the time to clearly explain my options, answered all of my questions, and made the entire process smooth and stress-free.",
  },
  {
    name: "Coach Rocco – High Voltage Volleyball Academy",
    date: "2 weeks ago",
    text: "Great service, fast response and very knowledgeable. Luis is the best. Thank you Lighthouse Insurance — almost 10 years with you guys!",
  },
  {
    name: "Ryntox",
    date: "5 months ago",
    text: "I couldn't be happier with the service I received. From start to finish, the process was smooth, professional, and stress free. They took the time to explain all my options clearly and helped me find the perfect plan for my needs.",
  },
];
