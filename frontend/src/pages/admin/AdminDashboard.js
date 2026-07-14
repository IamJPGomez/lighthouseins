import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, ExternalLink, Loader2, Ship } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import { api, authHeaders, clearToken, getToken } from "@/lib/api";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = useCallback(() => {
    setLoading(true);
    api.get("/admin/posts", { headers: authHeaders() })
      .then(({ data }) => setPosts(data))
      .catch((e) => { if (e?.response?.status === 401) { clearToken(); navigate("/admin"); } })
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    if (!getToken()) { navigate("/admin"); return; }
    load();
  }, [load, navigate]);

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/posts/${id}`, { headers: authHeaders() });
      toast.success("Post deleted");
      setPosts((p) => p.filter((x) => x.id !== id));
    } catch { toast.error("Failed to delete"); }
  };

  const logout = () => { clearToken(); navigate("/admin"); };

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo title="Manage Posts | Lighthouse Admin" description="Admin dashboard" path="/admin/posts" />
      <header className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="grid place-items-center h-9 w-9 rounded-lg bg-white/10"><Ship className="h-5 w-5" /></span><span className="font-display font-semibold">Lighthouse Admin</span></div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm text-slate-300 hover:text-white inline-flex items-center gap-1">View site <ExternalLink className="h-3.5 w-3.5" /></a>
            <button onClick={logout} data-testid="admin-logout" className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 transition-colors"><LogOut className="h-4 w-4" /> Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div><h1 className="font-display text-2xl font-semibold text-navy">Blog Posts</h1><p className="text-sm text-slate-500">{posts.length} total</p></div>
          <Link to="/admin/posts/new" data-testid="admin-new-post" className="inline-flex items-center gap-2 rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0b8b8a] transition-colors"><Plus className="h-4 w-4" /> New Post</Link>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-7 w-7 animate-spin text-teal" /></div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center text-slate-500">No posts yet. Create your first post.</div>
          ) : (
            <table className="w-full text-sm" data-testid="admin-posts-table">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium hidden sm:table-cell">Updated</th><th className="px-4 py-3 font-medium text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((p) => (
                  <tr key={p.id} data-testid={`admin-post-row-${p.slug}`}>
                    <td className="px-4 py-3"><span className="font-medium text-navy">{p.title}</span><span className="block text-xs text-slate-400">/{p.slug}</span></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {p.status === "published" && (<a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="grid place-items-center h-8 w-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" title="View"><ExternalLink className="h-4 w-4" /></a>)}
                        <Link to={`/admin/posts/${p.id}`} data-testid={`admin-edit-${p.slug}`} className="grid place-items-center h-8 w-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" title="Edit"><Pencil className="h-4 w-4" /></Link>
                        <button onClick={() => remove(p.id, p.title)} data-testid={`admin-delete-${p.slug}`} className="grid place-items-center h-8 w-8 rounded-lg border border-slate-200 text-red-600 hover:bg-red-50" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
