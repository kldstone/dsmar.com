import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileStickyCTA from "./MobileStickyCTA";
import SEO from "./SEO";
import { trackPageview } from "@/lib/analytics";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
