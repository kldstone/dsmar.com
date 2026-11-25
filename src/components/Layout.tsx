import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileStickyCTA from "./MobileStickyCTA";
import SEO from "./SEO";
import { trackPageview } from "@/lib/analytics";
import CookieConsent from "./CookieConsent";
import { useLang } from "@/lib/i18n";

export default function Layout() {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-3 focus:text-[#111] focus:shadow-lg focus:outline focus:outline-2 focus:outline-[#e60012]"
      >
        {lang === "zh" ? "跳转到主要内容" : "Skip to main content"}
      </a>
      <Navbar key={`${location.pathname}${location.search}`} />
      <main id="main-content" tabIndex={-1} className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
      <CookieConsent />
    </div>
  );
}
