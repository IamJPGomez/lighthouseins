// Lighthouse Insurance brand logo: shield emblem with a stylized lighthouse
// (navy + gold), paired with stacked "LIGHTHOUSE" / "INSURANCE" wordmark.

export const LogoMark = ({ className = "h-10 w-auto" }) => (
  <svg viewBox="0 0 48 56" className={className} role="img" aria-label="Lighthouse Insurance emblem" xmlns="http://www.w3.org/2000/svg">
    {/* Shield */}
    <path
      d="M24 2 L44 10 V28 C44 40.5 35.2 49.2 24 53 C12.8 49.2 4 40.5 4 28 V10 Z"
      fill="#1a2b4a"
      stroke="#b8962e"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Light beams */}
    <path d="M27.2 16.5 L36 12.5 L36 20 Z" fill="#b8962e" opacity="0.75" />
    <path d="M20.8 16.5 L12 12.5 L12 20 Z" fill="#b8962e" opacity="0.75" />
    {/* Dome + lantern */}
    <path d="M21.5 13.5 h5 l-1.1 -3 h-2.8 z" fill="#f6f1e3" />
    <rect x="21.3" y="13.5" width="5.4" height="4.4" rx="0.5" fill="#b8962e" />
    {/* Tower body */}
    <path d="M20 41 L21.6 18 H26.4 L28 41 Z" fill="#f6f1e3" />
    {/* Gold stripes */}
    <path d="M20.9 24 L27.1 24 L27.35 27 L20.65 27 Z" fill="#b8962e" />
    <path d="M20.4 31 L27.6 31 L27.85 34 L20.15 34 Z" fill="#b8962e" />
    {/* Base */}
    <rect x="17.5" y="40.5" width="13" height="3" rx="1.2" fill="#f6f1e3" />
    <rect x="16" y="44" width="16" height="2.4" rx="1.2" fill="#b8962e" />
  </svg>
);

export const Logo = ({ light = false, className = "", markClass = "h-11 w-auto" }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoMark className={markClass} />
    <span className="leading-none">
      <span className={`block font-display font-extrabold tracking-wide text-[15px] sm:text-base ${light ? "text-white" : "text-navy"}`}>
        LIGHTHOUSE
      </span>
      <span className="block font-display font-semibold tracking-[0.22em] text-[9px] sm:text-[10px] text-gold mt-0.5">
        INSURANCE
      </span>
    </span>
  </span>
);

export default Logo;
