import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import { Suspense, lazy, useEffect, useLayoutEffect } from "react";

function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation();

  const resetScroll = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useLayoutEffect(() => {
    if (hash) return;

    resetScroll();
    const frame = requestAnimationFrame(() => {
      resetScroll();
      requestAnimationFrame(resetScroll);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, search, hash, key]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleInternalLink = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin === window.location.origin) resetScroll();
    };

    document.addEventListener("click", handleInternalLink, true);
    return () => document.removeEventListener("click", handleInternalLink, true);
  }, []);

  return null;
}

const Home = lazy(() => import("./pages/Home"));
const ProjectCaseDetail = lazy(() => import("./pages/ProjectCaseDetail"));
const ProjectCases = lazy(() => import("./pages/ProjectCases"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Catalog = lazy(() => import("./pages/Catalog"));
const CatalogCategory = lazy(() => import("./pages/CatalogCategory"));
const CatalogDetail = lazy(() => import("./pages/CatalogDetail"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Navigate to="/catalog" replace />} />
            <Route path="/collections/marble" element={<Navigate to="/cases" replace />} />
            <Route path="/collections/product/:id" element={<Navigate to="/catalog" replace />} />
            <Route path="/cases/:slug" element={<ProjectCaseDetail />} />
            <Route path="/cases" element={<ProjectCases />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:category" element={<CatalogCategory />} />
            <Route path="/catalog/:category/:id" element={<CatalogDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  const basename = /^\/zh(?:\/|$)/.test(window.location.pathname) ? "/zh" : "/";
  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
