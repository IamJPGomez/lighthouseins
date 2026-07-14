import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import TruckingInsurance from "@/pages/TruckingInsurance";
import CargoInsurance from "@/pages/CargoInsurance";
import OwnerOperatorInsurance from "@/pages/OwnerOperatorInsurance";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminEditor from "@/pages/admin/AdminEditor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public site with shared layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/trucking-insurance" element={<TruckingInsurance />} />
            <Route path="/cargo-insurance" element={<CargoInsurance />} />
            <Route path="/owner-operator-insurance" element={<OwnerOperatorInsurance />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin (no public layout) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/posts" element={<AdminDashboard />} />
          <Route path="/admin/posts/:id" element={<AdminEditor />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
