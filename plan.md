# plan.md

## 1) Objectives
- Rebuild Lighthouse Insurance, Inc. marketing site (React/FastAPI/Mongo) to match current lighthouseinsgroup.com look (navy `#1f3549`) with strong mobile UX.
- Fix **NAP** everywhere to match Google Business Profile exactly (name/address/phone/site) and eliminate old ZIP/domains.
- Implement **technical SEO**: per-page canonical tags, global LocalBusiness/InsuranceAgency JSON-LD, sitemap.xml + robots.txt.
- Add 3 new keyword-targeted pages: **/trucking-insurance**, **/cargo-insurance**, **/owner-operator-insurance** with internal links + CTAs.
- Activate **Blog CMS**: public blog + post pages; simple password-protected admin dashboard; seed 4 editable posts w/ starter content + FAQ schema.
- Update homepage + services page to explicitly include trucking/cargo/owner-operator/fleet insurance.
- Provide hosting-level redirect rules for **http→https** and **www/non-www** canonicalization.

## 2) Implementation Steps

### Phase 1 — Build V1 directly (no POC required)
**User stories (Phase 1)**
1. As a visitor, I can quickly see services offered and tap to call (954) 584-3417 on mobile.
2. As a visitor, I can view trucking/cargo/owner-operator insurance pages with clear explanations and CTAs.
3. As a visitor, I can browse blog posts and read a post with proper headings and FAQs.
4. As an admin, I can log in with a password and create/edit/publish blog posts.
5. As a search engine, I can crawl canonical URLs, sitemap.xml, robots.txt, and consistent structured data.

**Backend (FastAPI + MongoDB)**
- Create models/collections:
  - `blog_posts` (slug, title, excerpt, contentHtml/contentMarkdown, author, tags, status draft/published, publishedAt, updatedAt, faqSchemaJsonLd, seoTitle, seoDescription)
  - `admin_sessions` (optional) or JWT-only
  - `contact_submissions` (store-only MVP; user requested holding destination)
- Auth:
  - Simple password-protected admin via `ADMIN_PASSWORD` env + JWT (PyJWT) login endpoint.
  - Middleware/dependency to protect admin CRUD routes.
- Blog APIs:
  - Public: list published posts, get by slug.
  - Admin: create/update/delete, publish/unpublish, list all.
- Seed 4 starter posts with editable placeholder content + one FAQ JSON-LD block each (user will later replace).

**Frontend (React 19)**
- Build site layout to match current look:
  - Header/nav with logo + primary nav: Home, About, Services, Blog, Reviews, Contact
  - Add nav dropdown: **Commercial Insurance** → Trucking Insurance, Cargo Insurance, Owner-Operator Insurance
  - Global footer with exact NAP.
- Pages:
  - Home (hero + service highlights + testimonials + CTA)
  - About (mission/values/why-choose-us content)
  - Services (existing + trucking/cargo/owner-operator/fleet)
  - Trucking pillar page `/trucking-insurance`
  - `/cargo-insurance`
  - `/owner-operator-insurance`
  - Reviews (testimonials)
  - Contact (NAP corrected ZIP 33351; map embed uses exact address string)
  - Blog list `/blog` and blog detail `/blog/:slug`
  - Admin login `/admin` and admin dashboard `/admin/posts` + editor `/admin/posts/:id`
- SEO implementation (no react-helmet):
  - Create custom `<Seo />` component to set:
    - document title
    - meta description
    - canonical link `https://lighthouseinsgroup.com/[path]`
    - JSON-LD injection (page-specific + FAQs for posts)
  - Add global InsuranceAgency JSON-LD (exact NAP, areaServed, services) in `public/index.html` as safe default.
- Content requirements for trucking pages:
  - Unique keyword-optimized `<title>` (<60 chars) + meta description (<155 chars)
  - Proper H1/H2 structure, internal cross-links between the 3 pages and to /contact
  - Prominent CTA with click-to-call.

**Technical SEO assets (static)**
- Add `public/sitemap.xml` (include all routes + blog slugs) and `public/robots.txt` (allow all + sitemap URL).
- Ensure sitemap updates when new blog posts publish (MVP approach: backend endpoint `/api/sitemap.xml` generated dynamically + frontend proxies OR rebuild static sitemap on publish; choose simplest reliable approach during implementation).

**Hosting redirect rules (deliverable doc)**
- Provide rules for:
  - 301 http→https
  - 301 www→non-www (or vice versa) to a single canonical host
  - Ensure trailing slash consistency.

**Testing (end of Phase 1)**
- End-to-end checks:
  - All pages render, nav works, mobile responsive
  - NAP exact match everywhere (header/footer/contact/schema/map)
  - Canonicals correct on each route
  - JSON-LD validates (LocalBusiness/InsuranceAgency + FAQ on blog posts)
  - Blog: list shows seeded posts; detail loads by slug
  - Admin: login → create/edit/publish → visible publicly
  - robots.txt + sitemap reachable and correct

### Phase 2 — Polish + SEO hardening
**User stories (Phase 2)**
1. As a visitor, I see fast-loading pages with no layout shift on mobile.
2. As a visitor, I can share a blog post link with a clean snippet (title/description).
3. As Google, I can parse consistent structured data across all pages.
4. As an admin, I can set SEO title/description per post.
5. As a visitor, I can find trucking coverage info quickly via in-page TOC/sections.

- Core Web Vitals optimizations:
  - Compress/inline critical SVG logo; defer non-critical scripts; minimize heavy UI components on initial route.
  - Ensure responsive images and avoid CLS.
- Improve content UX:
  - Add “Coverage checklist” sections and FAQ accordion on trucking pages.
  - Add internal-link cards to related services/blog posts.
- SEO hardening:
  - Add OpenGraph/Twitter meta tags via `<Seo />`.
  - Ensure canonical paths reflect router path accurately.
  - Add schema enhancements: `hasMap`, `sameAs` (if provided), `openingHoursSpecification`.

### Phase 3 — Contact workflow (kept minimal until user decides)
**User stories (Phase 3)**
1. As a visitor, I can submit a quote request and get a confirmation message.
2. As staff, I can view submissions in admin.
3. As staff, I can export submissions to CSV.
4. As a visitor, I can choose insurance type (auto/home/trucking/cargo).
5. As an admin, I can mark submissions as contacted.

- Implement admin view for stored contact submissions (no email integration unless requested later).

## 3) Next Actions
- Implement Phase 1 in one cohesive build: backend blog/auth + frontend pages/layout + SEO component + seed posts + sitemap/robots.
- After Phase 1, run full end-to-end testing and fix issues.
- Ask user for final blog article content to replace seeded placeholders.

## 4) Success Criteria
- NAP is identical across all UI + schema + map embed: **Lighthouse Insurance, Inc.**, **10242 NW 47th St, Suite 10, Sunrise, FL 33351**, **(954) 584-3417**, **https://lighthouseinsgroup.com**.
- All key pages exist and are indexable with correct canonical tags.
- New trucking/cargo/owner-operator pages meet title/description/H1-H2/CTA/internal-link requirements.
- Blog is functional: seeded posts show; admin login works; can publish/edit posts; each post outputs FAQ schema.
- sitemap.xml + robots.txt accessible and correct; redirect rules document provided for hosting.
- Site is mobile responsive and reasonably performant (no obvious CLS, fast initial render).