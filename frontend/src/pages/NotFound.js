import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | Lighthouse Insurance" description="The page you are looking for could not be found." path="/404" />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="font-display text-6xl font-semibold text-navy">404</p>
        <h1 className="mt-4 text-xl font-semibold text-slate-800">Page not found</h1>
        <p className="mt-2 text-slate-600">Sorry, we couldn't find the page you were looking for.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-[#0b8b8a] transition-colors">Back to Home</Link>
      </section>
    </>
  );
}
