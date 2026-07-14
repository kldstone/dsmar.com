import { Link } from "react-router-dom";
import { blogPosts } from "../content/blog-cn";
import { useLang } from "@/lib/i18n";
import { optimizedImage } from "@/lib/images";

export default function BlogList() {
  const { lang, t } = useLang();
  const categories = [
    { key: "all", label: t("blog_category_all") },
    { key: "knowledge", label: t("blog_category_knowledge") },
    { key: "industry", label: t("blog_category_industry") },
    { key: "events", label: t("blog_category_events") },
    { key: "company", label: t("blog_category_company") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/hero-blog.jpg")} alt="" className="w-full h-full object-cover opacity-50" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/50 text-[11px] font-bold tracking-[0.20em] uppercase">NEWS</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">{t("blog_title")}</h1>
            <p className="text-white/55 text-[15px] max-w-[520px] mx-auto leading-relaxed">{t("blog_subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1100px] mx-auto px-6 pt-12 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category.key} to={category.key === "all" ? "/blog" : `/blog?cat=${category.key}`}
              className="px-4 py-2 text-[12px] font-bold tracking-[0.06em] border border-black/10 hover:border-[#dc2626] hover:text-[#dc2626] transition-colors">
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <div className="space-y-10">
          {blogPosts.map(post => (
            <article key={post.slug} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-black/5 pb-10">
              <Link to={`/blog/${post.slug}`} className="overflow-hidden md:col-span-1">
                <img src={optimizedImage(post.image)} alt={post.title[lang]} className="w-full aspect-[4/3] object-cover img-hover" loading="lazy" decoding="async" />
              </Link>
              <div className="md:col-span-2">
                <span className="text-[#dc2626] text-[10px] font-bold tracking-[0.12em] uppercase">{post.category[lang]}</span>
                <Link to={`/blog/${post.slug}`} className="block mt-1 mb-2">
                  <h2 className="text-[var(--ink)] text-[1.2rem] font-black tracking-[0.02em] hover:text-[#dc2626] transition-colors">{post.title[lang]}</h2>
                </Link>
                <p className="text-[var(--muted)] text-[13px] leading-relaxed mb-3">{post.summary[lang]}</p>
                <div className="flex items-center gap-3 text-[var(--muted)] text-[11px]">
                  <span>{post.date}</span>
                  <span>·</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => <span key={tag.zh} className="bg-black/5 px-2 py-0.5">#{tag[lang]}</span>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
