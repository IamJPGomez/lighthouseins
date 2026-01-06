import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Reviews } from "./pages/Reviews";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminBlog } from "./pages/AdminBlog";
import { AdminBlogEditor } from "./pages/AdminBlogEditor";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public routes with header/footer */}
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/about" element={<><Header /><About /><Footer /></>} />
            <Route path="/services" element={<><Header /><Services /><Footer /></>} />
            <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
            <Route path="/blog/:slug" element={<><Header /><BlogPost /><Footer /></>} />
            <Route path="/reviews" element={<><Header /><Reviews /><Footer /></>} />
            <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
            <Route path="/privacy-policy" element={<><Header /><PrivacyPolicy /><Footer /></>} />
            
            {/* Admin routes (no header/footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/blog" 
              element={
                <ProtectedRoute>
                  <AdminBlog />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blog/new" 
              element={
                <ProtectedRoute>
                  <AdminBlogEditor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blog/edit/:id" 
              element={
                <ProtectedRoute>
                  <AdminBlogEditor />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
