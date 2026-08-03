"use client";

import { useState, useRef, useEffect } from "react";
import { services } from "@/data/services";
import {
  AppleCpu,
  AppleSparkles,
  AppleServerIcon,
  AppleDevice,
  AppleCode,
  AppleZap,
  AppleLayers,
  AppleMessage,
  AppleArrowLeft,
  AppleArrowRight,
} from "@/components/ui/AppleIcons";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import type { Service } from "@/types/service";

const CUBE_SERVICES = [
  { id: "ai-apps", title: "AI Applications", icon: AppleCpu, color: "#b8907d", desc: "Agentic systems, Gemini/OpenAI integrations, prompt engineering & RAG pipelines." },
  { id: "fullstack", title: "Full Stack Development", icon: AppleSparkles, color: "#8a6f62", desc: "High-performance React/Next.js frontends and Node.js/Python server architectures." },
  { id: "mobile-apps", title: "Mobile Apps", icon: AppleDevice, color: "#d7bdb0", desc: "Cross-platform iOS and Android mobile solutions engineered with React Native & Expo." },
  { id: "cloud-infra", title: "Cloud Infrastructure", icon: AppleServerIcon, color: "#c9a999", desc: "Scalable Docker containerization, AWS microservices, and server deployment." },
  { id: "api-dev", title: "API Development", icon: AppleCode, color: "#4a1b0c", desc: "Restful & GraphQL backend APIs with JWT auth, rate-limiting & caching." },
  { id: "automation", title: "Automation", icon: AppleZap, color: "#b8907d", desc: "Web scraping pipelines, CI/CD GitHub Actions & Playwright test suites." },
  { id: "admin-dashboards", title: "Dashboards", icon: AppleLayers, color: "#8a6f62", desc: "Data visualization dashboards with live charts & role-based access control." },
  { id: "ai-agents", title: "AI Agents & Chatbots", icon: AppleMessage, color: "#d7bdb0", desc: "Autonomous AI agents, conversational chatbots, RAG knowledge bases & LLM integrations." },
];

export default function ServicesSection3D() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < CUBE_SERVICES.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const activeCard = cardRefs.current[activeIndex];
    const container = carouselRef.current;

    if (activeCard && container) {
      const containerWidth = container.clientWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.clientWidth;
      const targetScroll = cardLeft - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleCardClick = (index: number, title: string) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      handleOpenDetails(title);
    }
  };

  const handleOpenDetails = (title: string) => {
    const matched = services.find((s) => s.title.toLowerCase().includes(title.toLowerCase())) || services[0];
    setSelectedService(matched);
  };

  const handleBookConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedService(null);

    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#contact";
      }
    }, 150);
  };

  return (
    <section id="services" className="py-12 relative bg-transparent border-t border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-(--color-rose-deep)">
            ENGINEERING OFFERINGS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary mt-3 tracking-tight">
            Interactive <span className="bg-gradient-to-r from-(--color-rose-active) via-rose to-(--color-rose-deep) bg-clip-text text-transparent">Service Cubes</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-primary leading-relaxed font-body font-medium">
            Explore our engineering services in an interactive carousel. The active middle service is highlighted with bold specifications and elevated 3D depth.
          </p>
        </div>

        {/* 3D Carousel Track */}
        <div className="relative py-4">
          <div
            ref={carouselRef}
            className="flex items-center gap-6 overflow-x-auto scroll-smooth no-scrollbar py-8 px-[10vw] sm:px-[25vw] md:px-[30vw] snap-x snap-proximity"
          >
            {CUBE_SERVICES.map((cube, index) => {
              const Icon = cube.icon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={cube.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => handleCardClick(index, cube.title)}
                  className={`group relative cursor-pointer shrink-0 transition-all duration-500 ease-out select-none snap-center ${
                    isActive
                      ? "w-[85vw] sm:w-[360px] md:w-[400px] scale-105 sm:scale-110 z-30"
                      : "w-[75vw] sm:w-[300px] md:w-[320px] scale-95 z-10 opacity-70 hover:opacity-90 blur-[0.2px]"
                  }`}
                >
                  {/* 3D Glass Card Container */}
                  <div
                    className={`relative rounded-2xl p-6 sm:p-7 min-h-[340px] flex flex-col justify-between transition-all duration-500 shadow-none ${
                      isActive
                        ? "liquid-glass-card ring-2 ring-(--color-rose-active) border-(--color-rose) bg-cream/95"
                        : "liquid-glass-card border-beige"
                    }`}
                  >
                    <div>
                      {/* Active Status Badge */}
                      {isActive && (
                        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-(--color-rose-deep) bg-rose/20 border border-rose/40 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-(--color-rose-deep)" />
                          ACTIVE
                        </div>
                      )}

                      {/* Floating Header Icon */}
                      <div
                        className={`rounded-2xl flex items-center justify-center mb-5 border border-beige transition-all duration-500 ${
                          isActive
                            ? "w-16 h-16 scale-105"
                            : "w-14 h-14 group-hover:scale-105"
                        }`}
                        style={{ backgroundColor: `${cube.color}25`, color: cube.color }}
                      >
                        <Icon className={isActive ? "w-8 h-8" : "w-7 h-7"} />
                      </div>

                      {/* Title: Bolder when Active */}
                      <h3
                        className={`font-heading text-text-primary transition-all duration-300 ${
                          isActive
                            ? "text-2xl font-black text-(--color-rose-deep) tracking-tight"
                            : "text-xl font-bold group-hover:text-(--color-rose-deep)"
                        }`}
                      >
                        {cube.title}
                      </h3>

                      {/* Description: Bolder when Active */}
                      <p
                        className={`mt-3 leading-relaxed font-body transition-all ${
                          isActive
                            ? "text-sm text-text-primary font-bold"
                            : "text-xs text-text-primary font-medium"
                        }`}
                      >
                        {cube.desc}
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div
                      className={`mt-6 pt-4 border-t flex items-center justify-between font-mono ${
                        isActive
                          ? "border-(--color-rose)/50 text-xs font-black text-(--color-rose-deep)"
                          : "border-beige text-[11px] font-bold text-(--color-rose-deep)"
                      }`}
                    >
                      <span>{isActive ? "CLICK FOR SPECS & METRICS" : "EXPLORE SPECS"}</span>
                      <span
                        className={`transition-transform duration-300 ${
                          isActive ? "translate-x-1 scale-125" : "group-hover:translate-x-1"
                        }`}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls & Navigation */}
        <div className="flex flex-col items-center gap-5 mt-4">
          {/* Active Service Title & Index */}
          <div className="font-mono text-xs font-bold text-text-primary flex items-center gap-2">
            <span className="text-(--color-rose-deep)">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-greige">/</span>
            <span>{String(CUBE_SERVICES.length).padStart(2, "0")}</span>
            <span className="mx-2 text-greige">•</span>
            <span className="text-(--color-rose-deep) uppercase tracking-wider">
              {CUBE_SERVICES[activeIndex].title}
            </span>
          </div>

          {/* Prev / Next & Indicators */}
          <div className="flex items-center gap-5">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="liquid-glass-accent-button inline-flex items-center justify-center w-11 h-11 rounded-full text-text-primary transition-all shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Previous service"
            >
              <AppleArrowLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full liquid-glass-card border-beige">
              {CUBE_SERVICES.map((cube, idx) => (
                <button
                  key={cube.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to ${cube.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "w-8 bg-gradient-to-r from-(--color-rose-active) to-(--color-rose-deep) shadow-sm"
                      : "w-2.5 bg-greige/50 hover:bg-greige"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === CUBE_SERVICES.length - 1}
              className="liquid-glass-accent-button inline-flex items-center justify-center w-11 h-11 rounded-full text-text-primary transition-all shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Next service"
            >
              <AppleArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Modal Details */}
      <Modal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || "Service Details"}
      >
        {selectedService && (
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-(--color-rose-deep) uppercase tracking-widest">
                {selectedService.subtitle}
              </span>
              <p className="mt-2 text-sm text-text-primary leading-relaxed font-body font-medium">
                {selectedService.description}
              </p>
            </div>

            {/* Metrics Grid */}
            {selectedService.metrics && selectedService.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {selectedService.metrics.map((m) => (
                  <div key={m.label} className="liquid-glass-card p-3.5 rounded-xl">
                    <span className="font-heading text-2xl font-extrabold text-(--color-rose-deep)">
                      {m.value}
                    </span>
                    <p className="text-[11px] font-mono text-text-primary font-bold mt-1 uppercase leading-tight">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Benefits */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                Key Benefits
              </h4>
              <ul className="space-y-2 text-xs text-text-primary font-medium">
                {selectedService.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--color-rose-deep) mt-1.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedService.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] bg-rose/20 text-(--color-rose-deep) px-2.5 py-1 rounded-md border border-rose/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                href="#contact"
                onClick={handleBookConsultation}
                variant="liquid"
                size="md"
                className="w-full font-bold text-sm justify-center"
              >
                Book Service Consultation
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

