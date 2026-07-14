import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import { api, authHeaders, getToken, clearToken } from "@/lib/api";

const EMPTY = { title: "", slug: "", excerpt: "", content: "", author: "Lighthouse Insurance", coverImage: "", tags: "", status: "draft", seoTitle: "", seoDescription: "", faqs: [] };

// Stable unique id used as React key for dynamically added/removed FAQ rows.
const uid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : `k_${Math.random().toString(36).slice(2)}${Date.now()}`;

const withKeys = (faqs = []) => faqs.map((f) => ({ ...f, _key: f._key || uid() }));

export default function AdminEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!getToken()) { navigate("/admin"); return; }
    if (!isNew) {
      api.get(`/admin/posts/${id}`, { headers: authHeaders() })
        .then(({ data }) => setForm({ ...EMPTY, ...data, tags: (data.tags || []).join(", "), faqs: withKeys(data.faqs || []) }))
        .catch((e) => { if (e?.response?.status === 401) { clearToken(); navigate("/admin"); } else { toast.error("Post not found"); navigate("/admin/posts"); } })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setFaq = (i, k, v) => setForm((f) => ({ ...f, faqs: f.faqs.map((q, idx) => (idx === i ? { ...q, [k]: v } : q)) }));
  const addFaq = () => setForm((f) => ({ ...f, faqs: [...f.faqs, { question: "", answer: "", _key: uid() }] }));
  const removeFaq = (i) => setForm((f) => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));

  const save = async (publishOverride) => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    const payload = {
      ...form,
      status: publishOverride || form.status,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      faqs: form.faqs
        .filter((q) => q.question.trim() && q.answer.trim())
        .map((q) => ({ question: q.question, answer: q.answer })),
    };
    try {
      if (isNew) {
        await api.post("/admin/posts", payload, { headers: authHeaders() });
        toast.success("Post created");
      } else {
        await api.put(`/admin/posts/${id}`, payload, { headers: authHeaders() });
        toast.success("Post saved");
      }
      navigate("/admin/posts");
    } catch (e) {
      if (e?.response?.status === 401) { clearToken(); navigate("/admin"); }
      else toast.error("Failed to save");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="min-h-screen grid place-items-center bg-slate-50"><Loader2 className="h-8 w-8 animate-spin text-teal" /></div>;

  const field = "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal";
  const label = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo title={`${isNew ? "New" : "Edit"} Post | Lighthouse Admin`} description="Editor" path="/admin/posts" />
      <header className="bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/admin/posts" className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to posts</Link>
          <div className="flex items-center gap-2">
            <button onClick={() => save("draft")} disabled={saving} data-testid="admin-save-draft" className="rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 transition-colors disabled:opacity-60">Save Draft</button>
            <button onClick={() => save("published")} disabled={saving} data-testid="admin-post-publish-button" className="inline-flex items-center gap-1.5 rounded-lg bg-teal px-3 py-1.5 text-sm font-semibold hover:bg-[#0b8b8a] transition-colors disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Publish</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        <h1 className="font-display text-2xl font-semibold text-navy">{isNew ? "New Post" : "Edit Post"}</h1>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <div><label className={label}>Title *</label><input value={form.title} onChange={set("title")} data-testid="editor-title" className={field} placeholder="Post title" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={label}>Slug (optional)</label><input value={form.slug} onChange={set("slug")} data-testid="editor-slug" className={field} placeholder="auto-generated from title" /></div>
            <div><label className={label}>Status</label>
              <select value={form.status} onChange={set("status")} data-testid="editor-status" className={field}><option value="draft">Draft</option><option value="published">Published</option></select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={label}>Author</label><input value={form.author} onChange={set("author")} className={field} /></div>
            <div><label className={label}>Tags (comma separated)</label><input value={form.tags} onChange={set("tags")} data-testid="editor-tags" className={field} placeholder="Trucking, Cargo" /></div>
          </div>
          <div><label className={label}>Cover Image URL</label><input value={form.coverImage} onChange={set("coverImage")} className={field} placeholder="https://..." /></div>
          <div><label className={label}>Excerpt</label><textarea value={form.excerpt} onChange={set("excerpt")} rows={2} data-testid="editor-excerpt" className={field} placeholder="Short summary shown on the blog list" /></div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <label className={label}>Content (Markdown supported)</label>
          <textarea value={form.content} onChange={set("content")} rows={18} data-testid="editor-content" className={`${field} font-mono text-xs leading-relaxed`} placeholder={"## Heading\n\nWrite your article using Markdown..."} />
          <p className="mt-2 text-xs text-slate-400">Use ## for headings, - for bullet lists, **bold**, and [links](https://...).</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between"><label className={label + " mb-0"}>FAQ Schema (optional)</label><button onClick={addFaq} data-testid="editor-add-faq" className="inline-flex items-center gap-1 text-sm font-semibold text-teal"><Plus className="h-4 w-4" /> Add FAQ</button></div>
          <p className="mt-1 text-xs text-slate-400">Adds an FAQ accordion + FAQPage structured data to the post.</p>
          <div className="mt-4 space-y-3">
            {form.faqs.map((q, i) => (
              <div key={q._key || i} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center gap-2"><input value={q.question} onChange={(e) => setFaq(i, "question", e.target.value)} className={field} placeholder="Question" /><button onClick={() => removeFaq(i)} className="grid place-items-center h-9 w-9 shrink-0 rounded-lg border border-slate-200 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button></div>
                <textarea value={q.answer} onChange={(e) => setFaq(i, "answer", e.target.value)} rows={2} className={`${field} mt-2`} placeholder="Answer" />
              </div>
            ))}
            {form.faqs.length === 0 && <p className="text-sm text-slate-400">No FAQs added.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="font-display font-semibold text-navy">SEO</h2>
          <div><label className={label}>SEO Title <span className="text-slate-400">({(form.seoTitle || "").length}/60)</span></label><input value={form.seoTitle} onChange={set("seoTitle")} data-testid="editor-seo-title" className={field} placeholder="Defaults to post title" /></div>
          <div><label className={label}>Meta Description <span className="text-slate-400">({(form.seoDescription || "").length}/155)</span></label><textarea value={form.seoDescription} onChange={set("seoDescription")} rows={2} data-testid="editor-seo-desc" className={field} placeholder="Defaults to excerpt" /></div>
        </div>
      </main>
    </div>
  );
}
