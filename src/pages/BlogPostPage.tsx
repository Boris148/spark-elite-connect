import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { getArticleBySlug, getRelatedArticles, type Article } from "../lib/blog";

const SITE_URL = "https://socialelitemarketinggroup.com";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (!article) return;
    const title = `${article.title} | Social Elite Marketing Group`;
    document.title = title;
    setMeta("description", article.description);
    setMeta("og:title", title, true);
    setMeta("og:description", article.description, true);
    setMeta("og:type", "article", true);
    setMeta("og:image", article.heroImage, true);
    setMeta("og:url", `${SITE_URL}/blog/${article.slug}`, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", article.description);
    setMeta("twitter:image", article.heroImage);
    setMeta("article:published_time", article.date, true);
    setMeta("article:author", article.author, true);
    setMeta("article:section", article.category, true);
    setCanonical(`${SITE_URL}/blog/${article.slug}`);
    setJsonLd(buildJsonLd(article));
    return () => removeJsonLd();
  }, [article]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const related = getRelatedArticles(article.slug);

  return (
    <>
      <article className="section-shell pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-elite-gold">
            <Link to="/blog" className="hover:text-white">
              Insights
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{article.category}</span>
          </div>
          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{article.title}</h1>
          <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">{article.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/55">
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </article>

      <section className="section-shell mt-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-elite-line">
          <div className="relative aspect-[16/9]">
            <img src={article.heroImage} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      <section className="section-shell pb-12 pt-12">
        <div className="mx-auto max-w-3xl">
          <div className="prose-elite" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

          {article.faq && article.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
              <div className="mt-6 space-y-3">
                {article.faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group rounded-2xl border border-elite-line bg-white/[0.04] p-5 transition open:bg-white/[0.06]"
                  >
                    <summary className="cursor-pointer list-none text-base font-semibold text-white">
                      <span className="mr-3 text-elite-gold">+</span>
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-white/75">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 rounded-3xl border border-elite-line bg-[radial-gradient(circle_at_top_right,rgba(53,166,219,0.18),transparent_55%)] p-8 sm:p-10">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Get a custom plan</p>
            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Want this analysis applied to your funnel?
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Book a strategy call. We&apos;ll audit your current marketing, identify missed opportunities, and map a
              plan focused on lead quality and ROI — not vanity metrics.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://calendly.com/semg-jeremy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a Strategy Call
              </a>
              <Link to="/results" className="btn-secondary">
                See Recent Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-shell pb-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">Keep reading</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group block">
                  <article className="glass-card flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/10]">
                      <img
                        src={r.heroImage}
                        alt={r.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-elite-gold backdrop-blur">
                        {r.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold leading-snug">{r.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/65">{r.description}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function buildJsonLd(article: Article): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [article.heroImage],
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "Social Elite Marketing Group" },
    publisher: {
      "@type": "Organization",
      name: "Social Elite Marketing Group",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logos/logo-color.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${article.slug}` },
    articleSection: article.category,
    keywords: article.keyword,
  });
}

function setJsonLd(json: string) {
  removeJsonLd();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "blog-jsonld";
  script.text = json;
  document.head.appendChild(script);
}

function removeJsonLd() {
  const existing = document.getElementById("blog-jsonld");
  if (existing) existing.remove();
}
