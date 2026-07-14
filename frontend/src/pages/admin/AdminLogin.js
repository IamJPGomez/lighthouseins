import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import { Logo } from "@/components/Logo";
import { api, setToken } from "@/lib/api";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", { password });
      setToken(data.token);
      toast.success("Welcome back!");
      navigate("/admin/posts");
    } catch (err) {
      toast.error("Incorrect password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[#0f1b26] px-4">
      <Seo title="Admin Login | Lighthouse Insurance" description="Admin area" path="/admin" />
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <Logo markClass="h-12 w-auto" />
        </div>
        <h1 className="mt-6 text-center text-sm text-slate-500">Sign in to manage blog posts</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="admin-password" placeholder="Password" className="w-full h-11 rounded-xl border border-slate-200 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" autoFocus />
          </div>
          <button type="submit" disabled={loading} data-testid="admin-login-button" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-semibold text-white hover:bg-[#a3831f] transition-colors disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
