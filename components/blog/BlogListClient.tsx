"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import MouseBackgroundGlow from "@/components/ui/MouseBackgroundGlow";
import Button from "@/components/ui/Button";
import { blogPosts, type BlogCategory } from "@/data/blog";
import { AppleSearch, AppleCalendar, AppleClock, AppleArrowRight, AppleUser, AppleArrowLeft } from "@/components/ui/AppleIcons";

const CATEGORIES: ("All" | BlogCategory)[] = [
  "All",
  "AI & Machine Learning",
  "Full Stack Development",
  "System Design",
  "DevOps & SRE",
  "Project Case Studies",
  "Career & Learning"
];

const BlogListClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | BlogCategory>("All");

  // Sort posts by date descending so the latest uploads are always at the top
  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, []);

  // Filter posts based on search query (title, excerpt, metaDescription, tags, category, content/headings) and category
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sortedPosts.filter((post) => {
      const matchesSearch = !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.metaDescription && post.metaDescription.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.content.toLowerCase().includes(query); // Searches headings and body text

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, sortedPosts]);

  // The latest upload overall (used to mark the absolute newest post in the listing)
  const absoluteLatestPost = useMemo(() => {
    return sortedPosts[0] || null;
  }, [sortedPosts]);

  // Featured post is the first match of the current filter list (or overall first)
  const featuredPost = useMemo(() => {
    return filteredPosts[0] || null;
  }, [filteredPosts]);

  // The rest of the posts in the list
  const otherPosts = useMemo(() => {
    if (!featuredPost) return [];
    return filteredPosts.slice(1);
  }, [filteredPosts, featuredPost]);

  return (
    <>
      <CustomCursor />
      <MouseBackgroundGlow />
      <Navbar />
      {/* Dynamic ambient lights in the background for a modern glow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-accent-600/5 blur-[120px]" />
        <div className="absolute top-[60%] right-[5%] w-[450px] h-[450px] rounded-full bg-beige/15 blur-[140px]" />
      </div>

      <main className="page-shell min-h-screen bg-transparent text-text-primary pt-2 pb-21 px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Back to Portfolio button */}
          <div className="mb-6 flex justify-center">
            <Button
              href="/"
              variant="liquid"
              size="sm"
              icon={<AppleArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />}
              className="rounded-full px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase group shadow-md hover:scale-105 transition-all duration-200"
            >
              Back to Portfolio
            </Button>
          </div>

          {/* Header Section */}
          <header className="text-center md:text-left mt-0 mb-5 relative">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-(--color-rose-deep) bg-rose/15 border border-rose/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              Engineering Logs
            </span>
            <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-tight sm:text-6xl text-text-primary">
              The Developer Log
            </h1>
            <p className="mt-4 max-w-2xl font-body text-base md:text-lg text-text-secondary leading-relaxed font-medium">
              Deep-dives, tutorials, and career insights. Exploring high-scale architectures, artificial intelligence, and developer culture.
            </p>
          </header>

          {/* Search and Category Filters */}
          <section aria-label="Search and filter articles" className="mb-12 flex flex-col gap-4 bg-cream/85 backdrop-blur-xl border border-beige p-6 rounded-[28px] shadow-sm relative overflow-hidden group">
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search insights by title, tags, description, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 text-sm rounded-[18px] border border-beige bg-cream/70 text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-rose focus:border-rose transition-all duration-300 backdrop-blur-md font-body"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-rose-deep)">
                <AppleSearch className="w-4 h-4" />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <nav aria-label="Article categories" className="flex flex-wrap gap-2 justify-start items-center">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-[10px] text-[11px] font-mono transition-all duration-300 cursor-pointer border ${selectedCategory === category
                    ? "bg-rose/30 text-text-primary shadow-sm font-bold border-rose/60"
                    : "bg-cream/60 border-beige text-text-primary hover:bg-rose/15 hover:border-rose/40 hover:text-(--color-rose-deep) font-medium"
                    }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </section>

          {/* No Results Fallback */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-cream/80 border border-beige rounded-[28px] backdrop-blur-xl">
              <p className="font-body text-text-primary text-base font-semibold">No articles found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-(--color-rose-deep) hover:underline transition-all duration-200 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Featured Spotlight Card */}
          {featuredPost && (
            <section aria-label="Featured article" className="mb-14 relative">
              <Link href={`/blog/${featuredPost.slug}`} className="group block relative">
                <article className="grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-[28px] border border-beige bg-cream/85 backdrop-blur-xl shadow-md transition-all duration-300 hover:border-rose/60 hover:shadow-xl">
                  {/* Decorative Gradient Cover */}
                  <div
                    className="md:col-span-5 h-56 md:h-full min-h-[300px] relative overflow-hidden"
                    style={{ background: featuredPost.coverGradient }}
                  >
                    {/* Glass sheen overlay */}
                    <div className="absolute inset-0 bg-text-primary/10 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/45 via-text-primary/10 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div className="flex flex-wrap gap-2">
                        {absoluteLatestPost && featuredPost.slug === absoluteLatestPost.slug ? (
                          <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-offwhite/25 backdrop-blur-md text-offwhite font-mono text-[9px] font-bold uppercase tracking-wider border border-offwhite/30 shadow-sm animate-pulse">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                            NEW RELEASE
                          </span>
                        ) : (
                          <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-offwhite/15 backdrop-blur-md text-offwhite font-mono text-[9px] font-bold uppercase tracking-wider border border-offwhite/15">
                            SPOTLIGHT
                          </span>
                        )}
                      </div>

                      <span className="self-center font-heading text-2xl md:text-3xl font-extrabold text-offwhite text-center tracking-wide drop-shadow-md select-none group-hover:scale-105 transition-transform duration-500">
                        {featuredPost.category}
                      </span>
                      <div />
                    </div>
                  </div>

                  {/* Spotlight Info */}
                  <div className="md:col-span-7 p-8 flex flex-col justify-between">
                    <div>
                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary font-semibold mb-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose/15 text-(--color-rose-deep) font-bold text-[10px] uppercase border border-rose/30">
                          {featuredPost.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <AppleCalendar className="w-3.5 h-3.5 text-(--color-rose-deep)" />
                          {featuredPost.publishedAt}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <AppleClock className="w-3.5 h-3.5 text-(--color-rose-deep)" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight group-hover:text-(--color-rose-deep) transition-colors duration-200">
                        {featuredPost.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mt-4 font-body text-sm md:text-base text-text-secondary leading-relaxed line-clamp-3 font-medium">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-beige flex flex-wrap gap-4 items-center justify-between">
                      {/* Author Bio */}
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose/30 text-(--color-rose-deep) font-mono text-xs font-bold border border-rose/50">
                          {featuredPost.author.avatar}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-text-primary leading-none">
                            {featuredPost.author.name}
                          </span>
                          <span className="text-[10px] text-text-secondary font-medium mt-1">
                            {featuredPost.author.role}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-(--color-rose-deep) group-hover:translate-x-1.5 transition-all duration-300">
                        Read Post <AppleArrowRight className="w-4 h-4 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {/* Grid of Other Posts */}
          {otherPosts.length > 0 && (
            <section aria-label="Other articles list">
              <div className="flex items-center justify-between mb-8 pl-2 border-l-4 border-(--color-rose-deep)">
                <h2 className="font-heading text-2xl font-extrabold text-text-primary ml-2">
                  All Publications
                </h2>
                <span className="text-xs font-mono text-text-secondary font-semibold">
                  Showing {filteredPosts.length} article{filteredPosts.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col justify-between overflow-hidden rounded-[24px] border border-beige bg-cream/85 backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-rose/60 hover:-translate-y-1 hover:shadow-md">
                      {/* Gradient Header */}
                      <div
                        className="h-44 w-full relative overflow-hidden"
                        style={{ background: post.coverGradient }}
                      >
                        <div className="absolute inset-0 bg-text-primary/10 backdrop-blur-[0.5px] transition-opacity duration-300 group-hover:opacity-0" />

                        <div className="absolute top-4 right-4">
                          {absoluteLatestPost && post.slug === absoluteLatestPost.slug && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cream/90 backdrop-blur-md text-(--color-rose-deep) font-mono text-[8px] font-bold uppercase tracking-wider border border-beige">
                              LATEST
                            </span>
                          )}
                        </div>

                        <span className="absolute bottom-4 left-4 font-mono text-[9px] font-bold tracking-widest uppercase text-offwhite bg-text-primary/35 backdrop-blur-md px-2.5 py-1 rounded-md border border-offwhite/15">
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-text-secondary font-semibold mb-3">
                            <span className="inline-flex items-center gap-1">
                              <AppleCalendar className="w-3.5 h-3.5 text-(--color-rose-deep)" />
                              {post.publishedAt}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <AppleClock className="w-3.5 h-3.5 text-(--color-rose-deep)" />
                              {post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-(--color-rose-deep) transition-colors duration-200 leading-snug line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="mt-3 font-body text-xs md:text-sm text-text-secondary leading-relaxed line-clamp-3 font-medium">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-6 pt-5 border-t border-beige flex flex-col gap-4">
                          {/* Tags - Enforcing the Tag Capping Rule (Limit to 4 visible tags, truncate as +X more) */}
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-[6px] text-[10px] font-mono bg-rose/15 text-(--color-rose-deep) border border-rose/30 font-semibold">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 4 && (
                              <span className="text-[10px] font-mono text-text-muted self-center ml-1">
                                +{post.tags.length - 4} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-beige/40">
                            {/* Author Info */}
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose/30 text-(--color-rose-deep) font-mono text-[9px] font-bold border border-rose/50">
                                {post.author.avatar}
                              </span>
                              <span className="text-[11px] font-semibold text-text-primary">
                                {post.author.name}
                              </span>
                            </div>

                            {/* Read more */}
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-(--color-rose-deep) group-hover:translate-x-1 transition-all duration-200">
                              Read <AppleArrowRight className="w-3.5 h-3.5" />
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

export default BlogListClient;
