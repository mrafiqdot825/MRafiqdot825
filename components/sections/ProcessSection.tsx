"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll active card into horizontal center
  const scrollToCard = useCallback((index: number) => {
    const activeCard = cardRefs.current[index];
    const container = carouselRef.current;

    if (activeCard && container) {
      isProgrammaticScroll.current = true;
      const containerWidth = container.clientWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.clientWidth;
      const targetScroll = cardLeft - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }
  }, []);

  useEffect(() => {
    scrollToCard(activeIndex);
  }, [activeIndex, scrollToCard]);

  // Touch/Scroll Sync: update activeIndex to the card closest to center when user scrolls manually
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current || !carouselRef.current) return;

    const container = carouselRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PROCESS_STEPS.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
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
                onClick={() => setActiveIndex(idx)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 snap-center cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "liquid-glass-accent-button text-text-primary shadow-md scale-105"
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
                onClick={() => setActiveIndex(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "liquid-glass-accent-button scale-110 shadow-lg text-text-primary ring-4 ring-rose/30"
                      : "bg-cream border border-beige text-text-primary hover:border-(--color-rose)"
                  }`}
                >
                  {p.step}
                </div>
                <span
                  className={`mt-2 font-mono text-[10px] uppercase font-bold transition-colors ${
                    isActive ? "text-(--color-rose-deep)" : "text-greige group-hover:text-text-primary"
                  }`}
                >
                  {p.stage}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Track */}
        <div className="relative py-2">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Engineering Workflow Process Carousel"
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-6 sm:py-8 px-[calc(50%-42.5vw)] sm:px-[calc(50%-180px)] md:px-[calc(50%-190px)] snap-x snap-mandatory focus:outline-none focus:ring-1 focus:ring-rose/40 rounded-2xl"
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
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative cursor-pointer shrink-0 transition-all duration-500 ease-out select-none snap-center ${
                    isActive
                      ? "w-[85vw] sm:w-[360px] md:w-[380px] scale-100 sm:scale-105 z-30"
                      : "w-[75vw] sm:w-[290px] md:w-[310px] scale-95 z-10 opacity-65 hover:opacity-90 blur-[0.2px]"
                  }`}
                >
                  {/* Glass Card Container */}
                  <div
                    className={`relative rounded-2xl p-5 sm:p-7 min-h-[320px] sm:min-h-[350px] flex flex-col justify-between transition-all duration-500 shadow-none ${
                      isActive
                        ? "liquid-glass-card ring-2 ring-(--color-rose-active) border-(--color-rose) bg-cream/95"
                        : "liquid-glass-card border-beige"
                    }`}
                  >
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span
                          className={`font-mono transition-all ${
                            isActive
                              ? "text-xl sm:text-2xl font-black text-(--color-rose-deep)"
                              : "text-lg sm:text-xl font-extrabold text-(--color-rose-active)"
                          }`}
                        >
                          {p.step}
                        </span>

                        <div
                          className={`p-2 sm:p-2.5 rounded-2xl border transition-all duration-500 ${
                            isActive ? "scale-105 sm:scale-110" : ""
                          }`}
                          style={{
                            backgroundColor: `${p.color}25`,
                            borderColor: `${p.color}40`,
                            color: p.color,
                          }}
                        >
                          <Icon className={isActive ? "w-5 h-5 sm:w-6 sm:h-6" : "w-4 h-4 sm:w-5 sm:h-5"} />
                        </div>
                      </div>

                      <span className="font-mono text-[10px] uppercase font-extrabold text-(--color-rose-deep) tracking-widest block mb-1">
                        STAGE {p.step} • {p.stage}
                      </span>

                      <h3
                        className={`font-heading text-text-primary transition-all duration-300 ${
                          isActive
                            ? "text-lg sm:text-xl font-black text-(--color-rose-deep) tracking-tight"
                            : "text-base sm:text-lg font-bold group-hover:text-(--color-rose-deep)"
                        }`}
                      >
                        {p.title}
                      </h3>

                      <p
                        className={`mt-2 sm:mt-3 leading-relaxed font-body transition-all ${
                          isActive
                            ? "text-xs sm:text-sm text-text-primary font-bold"
                            : "text-xs text-text-primary font-medium opacity-90"
                        }`}
                      >
                        {p.desc}
                      </p>

                      {/* Detail Tags for Active Card */}
                      {isActive && p.details && (
                        <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4 pt-3 border-t border-rose/30">
                          {p.details.map((d) => (
                            <span
                              key={d}
                              className="font-mono text-[10px] font-bold bg-rose/20 text-(--color-rose-deep) px-2 py-0.5 rounded-md border border-rose/30"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Phase Status */}
                    <div
                      className={`mt-4 sm:mt-6 pt-3 border-t flex items-center justify-between font-mono ${
                        isActive
                          ? "border-(--color-rose)/50 text-xs font-black text-(--color-rose-deep)"
                          : "border-beige text-[10px] font-bold text-text-primary"
                      }`}
                    >
                      <span>PHASE {p.step} OF 07</span>
                      <span className="text-(--color-rose-deep) font-extrabold">
                        {isActive ? "ACTIVE STAGE" : "READY"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="font-mono text-xs font-bold text-text-primary flex items-center gap-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-2">
            <span className="text-(--color-rose-deep)">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-greige">/</span>
            <span>07</span>
            <span className="mx-1.5 text-greige">•</span>
            <span className="text-(--color-rose-deep) uppercase tracking-wider truncate">
              {PROCESS_STEPS[activeIndex].title}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="liquid-glass-accent-button inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-text-primary transition-all shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Previous step"
            >
              <AppleArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full liquid-glass-card border-beige">
              {PROCESS_STEPS.map((p, idx) => (
                <button
                  key={p.step}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to ${p.title}`}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "w-6 sm:w-8 bg-gradient-to-r from-(--color-rose-active) to-(--color-rose-deep) shadow-sm"
                      : "w-2 sm:w-2.5 bg-greige/50 hover:bg-greige"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === PROCESS_STEPS.length - 1}
              className="liquid-glass-accent-button inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-text-primary transition-all shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Next step"
            >
              <AppleArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

