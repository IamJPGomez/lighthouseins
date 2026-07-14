import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, CalendarDays, Phone, ArrowRight } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Seo from "@/components/Seo";
import { Breadcrumbs, SectionTitle } from "@/components/shared";
import { FaqAccordion, faqJsonLd } from "@/components/FaqAccordion";
import { api } from "@/lib/api";
import { BUSINESS, SITE_URL } from "@/lib/business";

const fmt = (d) => { try { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); } catch { return ""; } };

// Markdown -> HTML, sanitized to prevent XSS before rendering.
const renderPostHtml = (markdown) =>
  DOMPurify.sanitize(String(marked.parse(markdown || "")));

// Structured data (BlogPosting + optional FAQPage) for a post.
const buildPostJsonLd = (post) => {
  const blocks = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      image: post.coverImage || undefined,
      author: { "@type": "Organization", name: BUSINESS.name },
      publisher: { "@type": "Organization", name: BUSINESS.name, logo: { "@type": "ImageObject", url: BUSINESS.logo } },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    },
  ];
  if (post.faqs && post.faqs.length) blocks.push(faqJsonLd(post.faqs));
  return blocks;
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    api.get(`/posts/${slug}`).then(({ data }) => { setPost(data); setStatus("ok"); }).catch(() => setStatus("notfound"));
  }, [slug]);

  if (status === "loading") {
    return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-teal" /></div>;
  }
  if (status === "notfound" || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <Seo title="Post Not Found | Lighthouse Insurance" description="Post not found." path={`/blog/${slug}`} />
        <h1 className="font-display text-2xl font-semibold text-navy">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-teal font-semibold">Back to blog <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }

  const html = renderPostHtml(post.content);
  const faqs = post.faqs || [];
  const jsonLd = buildPostJsonLd(post);

  return (
    <>
      <Seo
        title={(post.seoTitle || post.title).slice(0, 65)}
        description={(post.seoDescription || post.excerpt || "").slice(0, 160)}
        path={`/blog/${post.slug}`}
        image={post.coverImage}
        jsonLd={jsonLd}
      />
      <article>
        <header className="hero-gradient">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]} />
            <h1 data-testid="blog-post-title" className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">{post.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {fmt(post.publishedAt)}</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <img src={post.coverImage} alt={post.title} className="rounded-2xl border border-slate-200 shadow-sm w-full object-cover aspect-[16/9]" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="article-body" data-testid="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />

          {faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-navy mb-4">Frequently Asked Questions</h2>
              <FaqAccordion faqs={faqs} testId="blog-post-faq" />
            </div>
          )}

          {/* CTA strip */}
          <div className="mt-12 rounded-2xl bg-navy p-6 sm:p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-white">Have questions about your coverage?</h2>
            <p className="mt-2 text-sm text-slate-300">Talk to a local, independent Florida agent who shops multiple carriers for you.</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={BUSINESS.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-[#0b8b8a] transition-colors"><Phone className="h-4 w-4" /> Call {BUSINESS.phone}</a>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-100 transition-colors">Get a Free Quote</Link>
            </div>
          </div>

          {/* Related services */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link to="/trucking-insurance" className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow text-sm font-semibold text-navy">Trucking Insurance</Link>
            <Link to="/cargo-insurance" className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow text-sm font-semibold text-navy">Cargo Insurance</Link>
            <Link to="/owner-operator-insurance" className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow text-sm font-semibold text-navy">Owner-Operator Insurance</Link>
          </div>
        </div>
      </article>
    </>
  );
}
