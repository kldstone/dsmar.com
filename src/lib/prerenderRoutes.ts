import { blogPosts } from "@/content/blog-cn";
import categories from "@/data/catalog";
import { projectCases } from "@/data/projectCases";

export type PrerenderRoute = { path: string; indexable: boolean };

const coreRoutes = ["/", "/catalog", "/about", "/faq", "/blog", "/contact", "/cases"];

export const prerenderRoutes: PrerenderRoute[] = [
  ...coreRoutes.map((path) => ({ path, indexable: true })),
  ...categories.flatMap((category) => [
    { path: `/catalog/${category.key}`, indexable: true },
    ...category.products.map((product) => ({
      path: `/catalog/${category.key}/${product.id}`,
      indexable: true,
    })),
  ]),
  ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, indexable: true })),
  ...projectCases.map((projectCase) => ({ path: `/cases/${projectCase.slug}`, indexable: true })),
  { path: "/search", indexable: false },
];
