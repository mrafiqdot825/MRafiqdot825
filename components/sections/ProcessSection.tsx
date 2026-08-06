"use client";

import { useState, useRef, useEffect } from "react";
import {
  AppleSearch,
  AppleFigmaIcon,
  AppleCode,
  AppleCpu,
  AppleZap,
  AppleCloudIcon,
  AppleTrendingUp,
  AppleArrowLeft,
  AppleArrowRight,
} from "@/components/ui/AppleIcons";

const PROCESS_STEPS = [
  {
    step: "01",
    stage: "Discover",
    title: "Architecture & Research",
    desc: "Understanding product vision, technical feasibility, system topology, schema architecture, and AI model choices.",
    icon: AppleSearch,
    color: "#8a6f62",
    details: ["Requirements Audit", "Database Schema", "Tech Architecture"],
  },
  {
    step: "02",
    stage: "Design",
    title: "UI/UX & Design System",
    desc: "Designing responsive glassmorphic interfaces, interactive design tokens, dark mode variants, and accessibility standards.",
    icon: AppleFigmaIcon,
    color: "#b8907d",
    details: ["Wireframing & Comps", "Design System", "Micro-Interactions"],
  },
  {
    step: "03",
    stage: "Engineer",
    title: "Frontend Development",
    desc: "Building high-performance React/Next.js client applications with clean component trees and state management.",
    icon: AppleCode,
    color: "#d7bdb0",
    details: ["Next.js App Router", "TypeScript Strict", "Responsive Layouts"],
  },
  {
    step: "04",
    stage: "Integrate",
    title: "AI & Backend Services",
    desc: "Constructing robust Node.js/Python microservices, custom RAG search pipelines, and autonomous Gemini AI agents.",
    icon: AppleCpu,
    color: "#c9a999",
    details: ["LangChain & Gemini", "REST & GraphQL", "Vector Databases"],
  },
  {
    step: "05",
    stage: "Verify",
    title: "QA & Playwright Testing",
    desc: "Executing Playwright end-to-end integration tests, unit test suites, security scans, and code quality audits.",
    icon: AppleZap,
    color: "#4a1b0c",
    details: ["Playwright E2E", "CI/CD Workflows", "Security Audit"],
  },
  {
    step: "06",
    stage: "Deploy",
    title: "Cloud & DevOps Delivery",
    desc: "Automating zero-downtime deployments via Docker containerization, AWS microservices, and Vercel edge networks.",
    icon: AppleCloudIcon,
    color: "#8a6f62",
    details: ["Docker Containers", "Vercel / AWS", "Zero Downtime"],
  },
  {
    step: "07",
    stage: "Scale",
    title: "Monitoring & Optimization",
    desc: "Continuously optimizing Lighthouse Web Vitals, Redis caching layers, telemetry analytics, and active production scale.",
    icon: AppleTrendingUp,
    color: "#b8907d",
    details: ["Redis Query Caching", "Lighthouse 100", "Live Analytics"],
  },
];

export default function ProcessSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft <= 5);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);

      // Track active card index based on center of visible container
      const containerCenter = scrollLeft + clientWidth / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      if (scrollLeft <= 15) {
        closestIdx = 0;
      } else if (scrollLeft + clientWidth >= scrollWidth - 15) {
        closestIdx = cardRefs.current.length - 1;
      } else {
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        });
      }
      setActiveIndex(closestIdx);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      window.addEventListener("resize", checkScrollPosition);
      return () => {
        el.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const newIdx =
      direction === "left"
        ? Math.max(0, activeIndex - 1)
        : Math.min(PROCESS_STEPS.length - 1, activeIndex + 1);
    scrollToStep(newIdx);
  };

  const scrollToStep = (index: number) => {
    setActiveIndex(index);
    const card = cardRefs.current[index];
    if (card && carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      const cardWidth = card.offsetWidth;
      const targetLeft = card.offsetLeft - (containerWidth - cardWidth) / 2;
      carouselRef.current.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="process" className="py-12 relative bg-transparent border-t border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-(--color-rose-deep)">
            ENGINEERING WORKFLOW
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary mt-3 tracking-tight">
            Interactive <span className="bg-gradient-to-r from-(--color-rose-deep) via-rose to-(--color-rose-active) bg-clip-text text-transparent">Storytelling Process</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-body font-medium">
            A comprehensive 7-stage engineering methodology powering scalable software deliverables.
          </p>
        </div>

        {/* Mobile Stage Stepper (< lg) */}
        <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 py-2 px-1 mb-6 snap-x">
          {PROCESS_STEPS.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={p.step}
                type="button"
                onClick={() => scrollToStep(idx)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 snap-center cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "liquid-glass-accent-button text-text-primary shadow-md scale-105 ring-2 ring-(--color-rose)"
                    : "bg-cream/80 border border-beige text-text-secondary hover:text-text-primary hover:border-rose/50"
                }`}
              >
                <span>{p.step}</span>
                <span className="text-[10px] uppercase font-semibold">{p.stage}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Timeline Stepper Navigation (>= lg) */}
        <div className="hidden lg:flex items-center justify-between relative mb-8 px-4">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-beige -translate-y-1/2 z-0" />
          {PROCESS_STEPS.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={p.step}
                type="button"
                onClick={() => scrollToStep(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "liquid-glass-accent-button scale-125 shadow-xl text-text-primary ring-4 ring-rose/40 font-black"
                      : "bg-cream border border-beige text-text-primary hover:border-(--color-rose) opacity-70 hover:opacity-100"
                  }`}
                >
                  {p.step}
                </div>
                <span
                  className={`mt-2 font-mono text-[10px] uppercase font-bold transition-colors ${
                    isActive ? "text-(--color-rose-deep) font-black scale-105" : "text-greige group-hover:text-text-primary"
                  }`}
                >
                  {p.stage}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Track — Identical to ProjectsSection */}
        <div
          ref={carouselRef}
          className="relative flex items-stretch gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory py-8 -mx-4 px-[7.5vw] sm:mx-0 sm:px-[calc(50%-175px)] md:px-[calc(50%-190px)]"
        >
          {PROCESS_STEPS.map((p, idx) => {
            const Icon = p.icon;
            const isActive = idx === activeIndex;

            return (
              <div
                key={p.step}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] flex flex-col transition-transform duration-500"
              >
                {/* Glass Card Container */}
                <article
                  className={`liquid-glass-card flex-1 flex flex-col justify-between rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${
                    isActive
                      ? "ring-2 ring-(--color-rose-active) border-(--color-rose) bg-cream dark:bg-cream/80 shadow-[0_20px_50px_color-mix(in_srgb,var(--color-rose)_45%,transparent)] scale-105 z-20"
                      : "bg-cream/50 dark:bg-cream/20 border-beige/60 shadow-xs opacity-75 hover:opacity-95 scale-95 z-10"
                  }`}
                >
                  {/* Glass Top Reflection Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none rounded-2xl" />

                  <div className="flex flex-col flex-1 relative z-10">
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xl sm:text-2xl font-black text-(--color-rose-deep)">
                        {p.step}
                      </span>

                      <div
                        className="p-2.5 rounded-2xl border backdrop-blur-md transition-all duration-300 shadow-sm"
                        style={{
                          backgroundColor: `${p.color}25`,
                          borderColor: `${p.color}45`,
                          color: p.color,
                        }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    <span className="font-mono text-[10px] uppercase font-extrabold text-(--color-rose-deep) tracking-widest block mb-1">
                      STAGE {p.step} • {p.stage}
                    </span>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                      {p.title}
                    </h3>

                    <p className="mt-2 sm:mt-3 leading-relaxed font-body text-xs sm:text-sm text-text-secondary font-medium">
                      {p.desc}
                    </p>

                    {/* Glass Detail Tags */}
                    {p.details && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-beige/60">
                        {p.details.map((d) => (
                          <span
                            key={d}
                            className="font-mono text-[10px] font-bold glass-badge backdrop-blur-md bg-rose/20 text-(--color-rose-deep) px-2.5 py-1 rounded-md border border-rose/40 shadow-xs"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Phase Action Button */}
                  <div className="mt-6 pt-3 border-t border-beige/60 relative z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToStep(idx);
                      }}
                      className={`w-full inline-flex items-center justify-between rounded-xl py-2 px-3.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "liquid-glass-accent-button text-text-primary shadow-sm scale-[1.02]"
                          : "bg-cream/80 border border-beige text-text-secondary hover:text-text-primary hover:border-[var(--color-rose)]"
                      }`}
                    >
                      <span>PHASE {p.step} OF 07</span>
                      <span className="font-extrabold flex items-center gap-1">
                        {isActive ? "Active Stage" : "Select Stage"} →
                      </span>
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls — Identical to ProjectsSection */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={isAtStart}
            className="liquid-glass-accent-button inline-flex items-center justify-center w-10 h-10 rounded-full text-text-primary transition-all disabled:opacity-30 cursor-pointer shadow-sm"
            aria-label="Previous"
          >
            <AppleArrowLeft className="w-5 h-5" />
          </button>

          {/* Progress Line Indicator matching reference image */}
          <div className="h-1.5 w-36 sm:w-48 rounded-full bg-beige/60 overflow-hidden relative shadow-inner">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-(--color-rose-active) via-rose to-(--color-rose-deep) rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_color-mix(in_srgb,var(--color-rose)_60%,transparent)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={isAtEnd}
            className="liquid-glass-accent-button inline-flex items-center justify-center w-10 h-10 rounded-full text-text-primary transition-all disabled:opacity-30 cursor-pointer shadow-sm"
            aria-label="Next"
          >
            <AppleArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
