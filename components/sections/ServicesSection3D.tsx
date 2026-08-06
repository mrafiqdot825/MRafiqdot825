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
        : Math.min(CUBE_SERVICES.length - 1, activeIndex + 1);
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

  const handleCardClick = (index: number, id: string, title: string) => {
    scrollToStep(index);
    const matched =
      services.find((s) => s.id === id) ||
      services.find((s) => s.title.toLowerCase().includes(title.toLowerCase())) ||
      services[index % services.length];
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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-(--color-rose-deep)">
            ENGINEERING OFFERINGS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary mt-3 tracking-tight">
            Interactive <span className="bg-gradient-to-r from-(--color-rose-active) via-rose to-(--color-rose-deep) bg-clip-text text-transparent">Service Cubes</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-primary leading-relaxed font-body font-medium">
            Explore our engineering services in an interactive carousel. Select any service to explore detailed specifications, metrics, and technical deliverables.
          </p>
        </div>

        {/* Carousel Track — Identical to ProjectsSection */}
        <div
          ref={carouselRef}
          className="relative flex items-stretch gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory py-8 -mx-4 px-[7.5vw] sm:mx-0 sm:px-[calc(50%-175px)] md:px-[calc(50%-190px)]"
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
                onClick={() => handleCardClick(index, cube.id, cube.title)}
                className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] flex flex-col cursor-pointer transition-transform duration-500"
              >
                {/* 3D Glass Card Container */}
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
                    {/* Top Header Row with Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="rounded-2xl flex items-center justify-center border border-beige/80 transition-all duration-300 shadow-sm w-12 h-12 sm:w-14 sm:h-14"
                        style={{ backgroundColor: `${cube.color}25`, color: cube.color }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                      {cube.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 sm:mt-3 leading-relaxed font-body text-xs sm:text-sm text-text-secondary font-medium">
                      {cube.desc}
                    </p>
                  </div>

                  {/* Action Footer Button */}
                  <div className="mt-6 pt-4 border-t border-beige/60 flex items-center justify-between relative z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(index, cube.id, cube.title);
                      }}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${
                        isActive
                          ? "liquid-glass-accent-button text-text-primary shadow-md hover:scale-[1.02]"
                          : "bg-cream/80 border border-beige text-text-primary hover:bg-cream hover:border-[var(--color-rose)]"
                      }`}
                    >
                      <span>Explore Specs & Details</span>
                      <AppleSparkles className="w-3.5 h-3.5 text-current shrink-0" />
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
            aria-label="Previous service"
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
            aria-label="Next service"
          >
            <AppleArrowRight className="w-5 h-5" />
          </button>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
