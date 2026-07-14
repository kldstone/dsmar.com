import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../content/blog-cn";
import { useLang } from "@/lib/i18n";
import { optimizedImage } from "@/lib/images";

export default function BlogPost() {
  const { lang, t } = useLang();
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
        <h1 className="text-[var(--ink)] text-[1.6rem] font-black mb-4">{t("blog_not_found")}</h1>
        <Link to="/blog" className="text-[#dc2626] text-[14px] font-bold">← {t("blog_back")}</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage(post.image)} alt={post.title[lang]} className="w-full h-full object-cover opacity-50" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-[700px]">
            <span className="text-white/50 text-[10px] font-bold tracking-[0.16em] uppercase">{post.category[lang]}</span>
            <h1 className="text-white text-[clamp(1.4rem,3vw,2.2rem)] font-black tracking-[0.02em] mt-3 mb-3">{post.title[lang]}</h1>
            <p className="text-white/50 text-[13px]">{post.date}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-[760px] mx-auto px-6 py-16">
        <div className="text-[var(--ink)] text-[16px] leading-[2] space-y-5 [&_h2]:text-[1.3rem] [&_h2]:font-black [&_h2]:tracking-[0.03em] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-[1.1rem] [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_table]:w-full [&_table]:border-collapse [&_th]:bg-[#f5f5f5] [&_th]:text-left [&_th]:p-3 [&_td]:border [&_td]:border-black/10 [&_td]:p-3"
          dangerouslySetInnerHTML={{ __html: post.content[lang] }} />
      </article>

      {/* Tags & Share */}
      <section className="max-w-[760px] mx-auto px-6 pb-10 border-b border-black/5">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => <span key={tag.zh} className="bg-black/5 px-3 py-1.5 text-[12px] text-[var(--muted)]">#{tag[lang]}</span>)}
        </div>
      </section>

      {/* Back */}
      <section className="max-w-[760px] mx-auto px-6 py-10 text-center">
        <Link to="/blog" className="text-[#dc2626] text-[13px] font-bold tracking-[0.06em] hover:opacity-70 transition-opacity">← {t("blog_back")}</Link>
      </section>
    </div>
  );
}
