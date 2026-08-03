"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { AppleCpu, AppleSparkles, AppleServerIcon, AppleDevice, AppleCode, AppleZap, AppleLayers, AppleMessage } from "@/components/ui/AppleIcons";
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

  const handleOpenDetails = (title: string) => {
    // Match with real data from services.ts or fallback to primary service
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
    <section id="services" className="py-4 relative bg-transparent border-t border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-(--color-rose-deep)">
            ENGINEERING OFFERINGS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary mt-3 tracking-tight">
            Interactive <span className="bg-gradient-to-r from-(--color-rose-active) via-rose to-(--color-rose-deep) bg-clip-text text-transparent">Service Cubes</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-primary leading-relaxed font-body font-medium">
            Click any service cube to expand complete specifications, performance metrics, and technical architecture.
          </p>
        </div>

        {/* 3D Cubes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUBE_SERVICES.map((cube) => {
            const Icon = cube.icon;
            return (
              <div
                key={cube.id}
                onClick={() => handleOpenDetails(cube.title)}
                className="group relative cursor-pointer"
              >
                {/* Glowing Outer Backdrop */}
                <div
                  className="absolute -inset-0.5 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                  style={{ backgroundColor: cube.color }}
                />

                {/* 3D Glass Card Container */}
                <div className="relative liquid-glass-card liquid-glass-card-hover rounded-2xl p-6 h-full flex flex-col justify-between">
                  <div>
                    {/* Floating Cube Header Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-beige shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${cube.color}20`, color: cube.color }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-(--color-rose-deep) transition-colors">
                      {cube.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-text-primary leading-relaxed font-body font-medium">
                      {cube.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-beige flex items-center justify-between font-mono text-[11px] text-(--color-rose-deep) font-bold">
                    <span>EXPLORE SPECS</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
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
