import articlesData from "../content/articles.json";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keyword: string;
  date: string;
  readingTime: number;
  author: string;
  heroImage: string;
  contentHtml: string;
  faq?: Array<{ question: string; answer: string }>;
  relatedSlugs?: string[];
};

const all = (articlesData.articles as Article[]).slice().sort((a, b) =>
  a.date < b.date ? 1 : -1
);

export function getAllArticles(): Article[] {
  return all;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return all.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return all.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const sameCategory = all.filter(
    (a) => a.slug !== slug && a.category === current.category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = all.filter(
    (a) => a.slug !== slug && a.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategories(): string[] {
  return Array.from(new Set(all.map((a) => a.category))).sort();
}
