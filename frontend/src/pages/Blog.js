import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, CalendarDays } from "lucide-react";
import Seo from "@/components/Seo";
import CTABand from "@/components/CTABand";
import { SectionTitle, Breadcrumbs } from "@/components/shared";
import { api } from "@/lib/api";

const fmt = (d) => { try { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); } catch { return ""; } };

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/posts").then(({ data }) => setPosts(data)).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo
        title="Insurance Blog | Lighthouse Insurance Sunrise FL"
        description="Trucking, cargo, and insurance insights from Lighthouse Insurance in Sunrise, FL. Costs, coverage, and compliance explained. Call (954) 584-3417."
        path="/blog"
      />
      <section className="hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">Insurance Insights</h1>
          <p className="mt-4 text-lg text-slate-200 max-w-2xl">Practical guides on trucking, cargo, and personal insurance for Florida drivers and businesses.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {loading ? (
          <div className="flex justify-center py-20" data-testid="blog-loading"><Loader2 className="h-8 w-8 animate-spin text-teal" /></div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-slate-500" data-testid="blog-empty">No posts found.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-testid="blog-list">
            {posts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} data-testid={`blog-card-${p.slug}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                {p.coverImage ? (
                  <img src={p.coverImage} alt={p.title} loading="lazy" className="h-44 w-full object-cover" />
                ) : (<div className="h-44 w-full bg-navy" />)}
                <div className="flex flex-col flex-1 p-6">
                  {p.tags && p.tags[0] && (<span className="text-xs font-semibold uppercase tracking-wide text-teal">{p.tags[0]}</span>)}
                  <h2 className="mt-2 font-display text-lg font-semibold text-navy group-hover:text-teal transition-colors">{p.title}</h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {fmt(p.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-teal">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <CTABand />
    </>
  );
}
