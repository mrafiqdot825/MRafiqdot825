"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import MouseBackgroundGlow from "@/components/ui/MouseBackgroundGlow";
import { blogPosts, getAeoEnrichedPost } from "@/data/blog";
import { AppleArrowLeft, AppleCalendar, AppleClock, AppleShare, AppleArrowRight, AppleGithub, AppleLinkedin } from "@/components/ui/AppleIcons";
import Button from "@/components/ui/Button";

interface BlogDetailClientProps {
  slug: string;
}

const BlogDetailClient = ({ slug }: BlogDetailClientProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string; depth: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Retrieve post and enrich with AEO data
  const post = useMemo(() => {
    const rawPost = blogPosts.find((p) => p.slug === slug);
    if (!rawPost) return null;
    return getAeoEnrichedPost(rawPost);
  }, [slug]);

  // Dynamically calculate word count & reading time based on text length
  const computedReadTime = useMemo(() => {
    if (!post) return "3 min read";
    const wordsPerMinute = 200;
    // Strip HTML tags to get pure text content
    const cleanText = post.content.replace(/<\/?[^>]+(>|$)/g, " ");
    const wordCount = cleanText.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }, [post]);

  // Track scroll progress
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  // Dynamically extract headings (H2s and H3s) for the Table of Contents & setup IntersectionObserver
  useEffect(() => {
    if (!post) return;

    const container = document.getElementById("blog-content-body");
    if (!container) return;

    const headingElements = container.querySelectorAll("h2, h3");
    const extractedHeadings: { id: string; text: string; depth: number }[] = [];

    headingElements.forEach((el, index) => {
      const text = (el as HTMLElement).innerText || el.textContent || "";
      const depth = el.tagName.toLowerCase() === "h2" ? 2 : 3;
      const cleanId = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
      el.id = cleanId;
      extractedHeadings.push({ id: cleanId, text, depth });
    });

    setHeadings(extractedHeadings);

    // IntersectionObserver to highlight active item in TOC
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [post]);

  // Automatically inject code copy buttons into rendered HTML
  useEffect(() => {
    if (!post) return;

    const container = document.getElementById("blog-content-body");
    if (!container) return;

    const wrappers = container.querySelectorAll(".code-block-wrapper");
    wrappers.forEach((wrapper) => {
      const pre = wrapper.querySelector("pre");
      const header = wrapper.querySelector(".flex");
      if (pre && header && !header.querySelector(".copy-btn")) {
        const btn = document.createElement("button");
        btn.className = "copy-btn text-[11px] font-mono text-text-muted hover:text-accent-600 transition-colors duration-150 cursor-pointer flex items-center gap-1 bg-transparent border-0 outline-none py-0.5 px-1.5 rounded";
        btn.innerHTML = "Copy";
        btn.onclick = () => {
          navigator.clipboard.writeText(pre.innerText.trim());
          btn.innerHTML = "Copied!";
          setTimeout(() => {
            btn.innerHTML = "Copy";
          }, 2000);
        };
        header.appendChild(btn);
      }
    });
  }, [post]);

  // Find related posts based on category and tags matching relevance (Limit to 3 related articles)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.slug !== post.slug)
      .map((p) => {
        let score = 0;
        if (p.category === post.category) score += 3;
        const sharedTags = p.tags.filter((t) => post.tags.includes(t)).length;
        score += sharedTags;
        return { post: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.post);
  }, [post]);

  // Share link handler
  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!post) return null;

  return (
    <>
      <CustomCursor />
      <MouseBackgroundGlow />
      <Navbar />
      {/* Reading Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-border-default/30">
        <div
          className="h-full bg-accent-600 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="page-shell min-h-screen bg-transparent text-text-primary pt-2 pb-25 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto mt-8">
          {/* Breadcrumb Navigation - Semantic HTML & Microdata */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-accent-600 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/blog" className="hover:text-accent-600 transition-colors">Blog</Link>
            <span>&gt;</span>
            <span className="text-text-secondary">{post.category}</span>
            <span>&gt;</span>
            <span className="text-text-primary font-semibold truncate max-w-[200px] md:max-w-xs">{post.title}</span>
          </nav>
          {/* Back button */}
          <div className="mb-4">
            <Button
              href="/blog"
              variant="metal"
              dark
              icon={<AppleArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />}
              size="sm"
            >
              Back to Articles
            </Button>
          </div>

          {/* Grid Layout (Article content vs TOC sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Article Body wrapper */}
            <div className="lg:col-span-9">
              <article className="overflow-hidden rounded-[24px] border border-border-default bg-bg-surface shadow-sm mb-8 glass-panel">

                {/* Visual Cover Gradient (Hero image representation) */}
                <header
                  className="h-44 md:h-60 w-full relative flex flex-col justify-end p-6 md:p-8"
                  style={{ background: post.coverGradient }}
                >
                  <div className="absolute inset-0 bg-text-primary/15 backdrop-blur-[2px]" />
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase text-offwhite bg-text-primary/30 backdrop-blur-md rounded-md mb-3 border border-offwhite/10">
                      {post.category}
                    </span>
                    <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-offwhite tracking-tight leading-tight drop-shadow-md">
                      {post.title}
                    </h1>
                  </div>
                </header>
                {/* Author Info, Publish Date, and Reading Time bar */}
                <section aria-label="Article details" className="px-6 md:px-8 py-4 border-b border-border-default/40 bg-bg-surface-hover/30 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
                    <span className="inline-flex items-center gap-1">
                      <span className="inline-block w-4 h-4 rounded-full bg-accent-600 text-text-primary text-[8px] font-bold text-center leading-4">
                        {post.author.avatar}
                      </span>
                      <span>By {post.author.name}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <AppleCalendar className="w-3 h-3" />
                      <span>Published: {post.publishedAt}</span>
                    </span>
                    {post.lastUpdated && post.lastUpdated !== post.publishedAt && (
                      <span className="inline-flex items-center gap-1 text-accent-700">
                        <span>(Updated: {post.lastUpdated})</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <AppleClock className="w-3 h-3" />
                      <span>Calculated Time: {computedReadTime}</span>
                    </span>
                  </div>
                  {/* Share button */}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-text-secondary hover:text-accent-600 bg-bg-surface border border-border-default/80 hover:border-accent-100 rounded-lg py-1 px-2.5 transition-all duration-200 cursor-pointer"
                  >
                    <AppleShare className="w-3 h-3" />
                    {isCopied ? "Link Copied!" : "Share Post"}
                  </button>
                </section>
                {/* Mobile Expandable Table of Contents */}
                <div className="lg:hidden px-6 md:px-8 pt-6">
                  <div className="border border-border-default bg-bg-surface-hover/20 rounded-xl p-4 glass-panel">
                    <button
                      onClick={() => setMobileTocOpen(!mobileTocOpen)}
                      className="w-full flex items-center justify-between font-heading text-[13px] font-bold text-text-primary"
                    >
                      <span>Table of Contents</span>
                      <span className="transform transition-transform duration-200 text-[10px]" style={{ transform: mobileTocOpen ? "rotate(180deg)" : "rotate(0)" }}>
                        ▼
                      </span>
                    </button>
                    {mobileTocOpen && (
                      <nav className="mt-3 flex flex-col gap-1.5 border-t border-border-default/50 pt-3">
                        {headings.map((h) => (
                          <a
                            key={h.id}
                            href={`#${h.id}`}
                            onClick={() => setMobileTocOpen(false)}
                            className={`text-xs py-1.5 px-3 rounded-lg font-body transition-all duration-200 border-l-2 leading-snug ${h.depth === 3 ? "ml-4 text-text-muted" : "text-text-secondary"
                              } ${activeId === h.id
                                ? "border-accent-600 bg-accent-50 text-accent-700 font-semibold"
                                : "border-transparent hover:text-text-primary hover:bg-bg-surface-hover/50"
                              }`}
                          >
                            {h.text}
                          </a>
                        ))}
                      </nav>
                    )}
                  </div>
                </div>
                {/* Inner Content Wrapper */}
                <div className="px-6 md:px-8 py-6 border-b border-border-default/40">

                  {/* Quick Answer Section (AEO optimized summary for answer engines) */}
                  <section aria-label="Quick Answer Summary" className="mb-8 p-6 rounded-[20px] border border-accent-600/35 bg-accent-50/15 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-accent-600 text-text-primary font-mono text-[8px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg shadow-sm">
                      AI Insight / Quick Answer
                    </div>
                    <h2 className="font-heading text-base font-extrabold text-text-primary mb-3 flex items-center gap-2">
                      <span className="text-accent-700 text-lg">✦</span> Quick Answer
                    </h2>
                    <p className="font-body text-sm text-text-primary leading-relaxed">
                      {post.quickAnswer}
                    </p>
                  </section>
                  {/* TL;DR Section */}
                  <section aria-label="TL;DR Key Points" className="mb-10 p-6 rounded-[20px] border border-border-default bg-bg-surface-hover/20 backdrop-blur-md relative overflow-hidden group glass-panel-inset">
                    <h2 className="font-heading text-base font-extrabold text-text-primary mb-4 flex items-center gap-2 border-b border-border-default/50 pb-2">
                      TL;DR Summary
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xs font-mono text-accent-700 font-semibold uppercase tracking-wider mb-2">What You'll Build</h3>
                        <p className="text-xs font-body text-text-secondary leading-relaxed">{post.tldr.build}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-mono text-accent-700 font-semibold uppercase tracking-wider mb-2">Technologies Used</h3>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {post.tldr.technologies.map(tech => (
                            <span key={tech} className="px-2 py-0.5 rounded-[6px] text-[10px] font-mono bg-bg-page/55 text-text-secondary border border-border-default/80">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border-default/50">
                      <h3 className="text-xs font-mono text-accent-700 font-semibold uppercase tracking-wider mb-2">Key Learning Outcomes</h3>
                      <ul className="list-disc pl-5 text-xs font-body text-text-secondary space-y-1.5">
                        {post.tldr.learnings.map((learning, idx) => (
                          <li key={idx}>{learning}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 text-[10px] font-mono text-text-muted flex items-center gap-1.5">
                      <span>Calculated Reading Time:</span>
                      <span className="text-accent-700 font-semibold">{post.tldr.readTime || computedReadTime}</span>
                    </div>
                  </section>
                  {/* Main Article Content */}
                  <div
                    id="blog-content-body"
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <section aria-label="Frequently Asked Questions" className="px-6 md:px-8 py-8 border-b border-border-default/40 bg-bg-surface-hover/10">
                    <h2 id="frequently-asked-questions" className="font-heading text-2xl font-bold text-text-primary mb-6 pl-1 border-l-4 border-accent-600">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                      {post.faqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-border-default/30 pb-4 last:border-b-0 last:pb-0">
                          <h3 className="font-heading text-base font-semibold text-text-primary mb-2">
                            {faq.question}
                          </h3>
                          <p className="font-body text-xs md:text-sm text-text-secondary leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {/* References Section */}
                {post.references && post.references.length > 0 && (
                  <section aria-label="Sources and references" className="px-6 md:px-8 py-6 border-b border-border-default/40 bg-bg-surface/50">
                    <h2 id="references" className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted mb-4 pl-1">
                      Official Documentation & References
                    </h2>
                    <ul className="list-disc pl-5 text-xs font-body text-text-secondary space-y-2">
                      {post.references.map((ref, idx) => (
                        <li key={idx}>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-700 hover:text-accent-800 transition-colors inline-flex items-center gap-1"
                          >
                            {ref.title}
                            <span className="text-[10px]">↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {/* Call To Action Block */}
                {post.cta && (
                  <section aria-label="Engagement call to action" className="px-6 md:px-8 py-8 bg-gradient-to-r from-accent-600/10 to-beige/25 rounded-b-[24px]">
                    <div className="max-w-2xl">
                      <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                        {post.cta.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-text-secondary leading-relaxed mb-4">
                        {post.cta.description}
                      </p>
                      <a
                        href={post.cta.linkUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-accent-600 text-text-primary font-mono text-[11px] font-semibold hover:bg-accent-700 transition-all duration-300 shadow-md shadow-accent-600/20"
                      >
                        {post.cta.linkText}
                        <span className="text-[11px]">→</span>
                      </a>
                    </div>
                  </section>
                )}

              </article>
              {/* Author Box with EEAT signals */}
              <section aria-label="Author Profile" className="p-6 md:p-8 rounded-[24px] border border-border-default bg-bg-surface shadow-sm glass-panel flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-12">
                <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-600 text-text-primary font-mono text-2xl font-bold border border-accent-100 shadow-sm shadow-accent-600/10">
                  {post.author.avatar}
                </span>
                <div className="text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-text-primary">
                        {post.author.name}
                      </h4>
                      <p className="text-xs font-mono text-accent-700 font-semibold">
                        {post.author.role}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <a
                        href="https://github.com/mrafiq825"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent-600 transition-colors cursor-pointer"
                        aria-label="GitHub Profile"
                        title="GitHub"
                      >
                        <AppleGithub className="w-4.5 h-4.5" />
                      </a>
                      <a
                        href="https://linkedin.com/in/mrafiq825"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent-600 transition-colors cursor-pointer"
                        aria-label="LinkedIn Profile"
                        title="LinkedIn"
                      >
                        <AppleLinkedin className="w-4.5 h-4.5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm font-body text-text-secondary leading-relaxed mb-4">
                    Muhammad Rafiq is a Full Stack Developer and AI Engineer specializing in building scalable web applications, Retrieval-Augmented Generation (RAG) platforms, optimized container pipelines, and site reliability telemetry using Next.js, FastAPI, LangGraph, and modern cloud technologies.
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {["Next.js", "React 19", "FastAPI", "LangGraph", "Docker", "Kubernetes", "PostgreSQL", "AEO"].map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-[6px] text-[9px] font-mono bg-bg-page/55 text-text-muted border border-border-default/80">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            {/* Right Column: Sticky Table of Contents (TOC) for Desktop */}
            <aside className="lg:col-span-3 hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
              <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-text-muted mb-4 pl-1">
                Table of Contents
              </h2>
              <nav aria-label="Table of contents navigation" className="flex flex-col gap-1.5">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`text-xs py-1.5 px-3 rounded-lg font-body transition-all duration-200 border-l-2 leading-snug ${h.depth === 3 ? "ml-4 text-text-muted" : "text-text-secondary"
                      } ${activeId === h.id
                        ? "border-accent-600 bg-accent-50 text-accent-700 font-semibold"
                        : "border-transparent hover:text-text-primary hover:bg-bg-surface-hover/50"
                      }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </aside>
          </div>
          {/* Related Articles Section (Displaying 3 related posts, enforcing the Tag Capping Rule) */}
          {relatedPosts.length > 0 && (
            <section aria-label="Related Publications" className="mt-12 border-t border-border-default/50 pt-10">
              <h3 className="font-heading text-xl font-bold mb-6 text-text-primary pl-1 border-l-4 border-accent-600">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link key={rPost.slug} href={`/blog/${rPost.slug}`} className="group block">
                    <article className="h-full flex flex-col justify-between overflow-hidden rounded-[16px] border border-border-default bg-bg-surface shadow-sm glass-panel glass-panel-hover">
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-[10px] font-mono text-text-muted mb-2">
                            <span>{rPost.publishedAt}</span>
                            <span>•</span>
                            <span>{rPost.readTime}</span>
                          </div>
                          <h4 className="font-heading text-base font-bold text-text-primary group-hover:text-accent-600 transition-colors duration-200 leading-snug line-clamp-2">
                            {rPost.title}
                          </h4>
                          <p className="mt-2 font-body text-xs text-text-secondary leading-relaxed line-clamp-2">
                            {rPost.excerpt}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-border-default/30 flex flex-col gap-2">
                          {/* Tags - Enforcing the Tag Capping Rule on related cards too */}
                          <div className="flex flex-wrap gap-1">
                            {rPost.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-[6px] text-[8px] font-mono bg-accent-50 text-accent-700 border border-accent-100/50">
                                {tag}
                              </span>
                            ))}
                            {rPost.tags.length > 4 && (
                              <span className="text-[8px] font-mono text-text-muted self-center ml-1">
                                +{rPost.tags.length - 4} more
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-border-default/10">
                            <span className="text-[10px] font-mono text-accent-700 bg-accent-50 px-2 py-0.5 rounded border border-accent-100">
                              {rPost.category}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-accent-700 group-hover:translate-x-0.5 transition-transform duration-200">
                              Read <AppleArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default BlogDetailClient;
