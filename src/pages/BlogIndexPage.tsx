import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { getAllArticles, getCategories } from "../lib/blog";

const heroBackground = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80";

const META_TITLE = "Marketing & Growth Insights | Social Elite Marketing Group";
const META_DESCRIPTION =
  "Operator-grade tactics on paid media, lead generation, marketing automation, AI, and agency growth — built from real campaigns we run.";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogIndexPage() {
  const articles = getAllArticles();
  const categories = getCategories();
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(() => {
    if (filter === "All") return articles;
    return articles.filter((a) => a.category === filter);
  }, [articles, filter]);

  useEffect(() => {
    document.title = META_TITLE;
    setMeta("description", META_DESCRIPTION);
    setMeta("og:title", META_TITLE, true);
    setMeta("og:description", META_DESCRIPTION, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", "https://socialelitemarketinggroup.com/blog", true);
    setCanonical("https://socialelitemarketinggroup.com/blog");
  }, []);

  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Marketing playbooks from the operators running them."
        description="Field-tested tactics on paid media, lead gen, marketing automation, AI, and agency growth — written from inside the campaigns, not the cheap seats."
        backgroundImage={heroBackground}
      />

      {articles.length === 0 ? (
        <section className="section-shell py-20">
          <div className="glass-card p-10 text-center">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-elite-gold">Coming soon</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">First articles publish this week</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              We&apos;re rolling out a new article every weekday. In the meantime, book a call and we&apos;ll send you the
              playbook for your situation directly.
            </p>
            <a
              href="https://calendly.com/semg-jeremy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 text-sm"
            >
              Book a Strategy Call
            </a>
          </div>
        </section>
      ) : (
        <>
          <section className="section-shell py-12">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter("All")}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  filter === "All"
                    ? "border-elite-gold/60 bg-white/10 text-white"
                    : "border-elite-line bg-white/5 text-white/70 hover:text-white"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    filter === cat
                      ? "border-elite-gold/60 bg-white/10 text-white"
                      : "border-elite-line bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {featured && (
            <section className="section-shell pb-8">
              <Link to={`/blog/${featured.slug}`} className="group block">
                <article className="glass-card overflow-hidden">
                  <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative aspect-[16/10] lg:aspect-auto">
                      <img
                        src={featured.heroImage}
                        alt={featured.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-10">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-elite-gold">
                        <span>Featured</span>
                        <span className="text-white/40">/</span>
                        <span className="text-white/70">{featured.category}</span>
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{featured.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-white/75">{featured.description}</p>
                      <div className="mt-6 flex items-center gap-3 text-xs text-white/55">
                        <span>{formatDate(featured.date)}</span>
                        <span>·</span>
                        <span>{featured.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {rest.length > 0 && (
            <section className="section-shell pb-16">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, idx) => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="group block"
                  >
                    <article
                      className="glass-card animate-fade-up flex h-full flex-col overflow-hidden"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <div className="relative aspect-[16/10]">
                        <img
                          src={article.heroImage}
                          alt={article.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-elite-gold backdrop-blur">
                          {article.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-lg font-semibold leading-snug">{article.title}</h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">{article.description}</p>
                        <div className="mt-auto flex items-center gap-3 pt-5 text-xs text-white/55">
                          <span>{formatDate(article.date)}</span>
                          <span>·</span>
                          <span>{article.readingTime} min read</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <CTASection
        title="Want this kind of analysis applied to your funnel?"
        copy="Book a strategy call. We'll audit your current marketing, find the leverage, and map a plan focused on lead quality and ROI."
      />
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
