"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { AppleCpu, AppleSparkles, AppleServerIcon, AppleDevice, AppleCode, AppleZap, AppleLayers, AppleMessage } from "@/components/ui/AppleIcons";
import Modal from "@/components/ui/Modal";
import RadialGlowButton from "@/components/ui/RadialGlowButton";
import type { Service } from "@/types/service";

const CUBE_SERVICES = [
  { id: "ai-apps", title: "AI Applications", icon: AppleCpu, color: "#7C3AED", desc: "Agentic systems, Gemini/OpenAI integrations, prompt engineering & RAG pipelines." },
  { id: "fullstack", title: "Full Stack Development", icon: AppleSparkles, color: "#00E5FF", desc: "High-performance React/Next.js frontends and Node.js/Python server architectures." },
  { id: "mobile-apps", title: "Mobile Apps", icon: AppleDevice, color: "#8B5CF6", desc: "Cross-platform iOS and Android mobile solutions engineered with React Native & Expo." },
  { id: "cloud-infra", title: "Cloud Infrastructure", icon: AppleServerIcon, color: "#3B82F6", desc: "Scalable Docker containerization, AWS microservices, and server deployment." },
  { id: "api-dev", title: "API Development", icon: AppleCode, color: "#10B981", desc: "Restful & GraphQL backend APIs with JWT auth, rate-limiting & caching." },
  { id: "automation", title: "Automation", icon: AppleZap, color: "#F59E0B", desc: "Web scraping pipelines, CI/CD GitHub Actions & Playwright test suites." },
  { id: "admin-dashboards", title: "Dashboards", icon: AppleLayers, color: "#EC4899", desc: "Data visualization dashboards with live charts & role-based access control." },
  { id: "ai-agents", title: "AI Agents & Chatbots", icon: AppleMessage, color: "#6366F1", desc: "Autonomous AI agents, conversational chatbots, RAG knowledge bases & LLM integrations." },
];

export default function ServicesSection3D() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenDetails = (title: string) => {
    // Match with real data from services.ts or fallback to primary service
    const matched = services.find((s) => s.title.toLowerCase().includes(title.toLowerCase())) || services[0];
    setSelectedService(matched);
  };

  return (
    <section id="services" className="py-4 relative bg-transparent border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
            ENGINEERING OFFERINGS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Interactive <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#00E5FF] bg-clip-text text-transparent">Service Cubes</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-body">
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
                <div className="relative glass-panel rounded-2xl p-6 h-full flex flex-col justify-between border border-white/10 group-hover:border-white/30 group-hover:-translate-y-2 transition-all duration-300 bg-[#101010]/90">
                  <div>
                    {/* Floating Cube Header Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${cube.color}20`, color: cube.color }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {cube.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-text-secondary leading-relaxed font-body">
                      {cube.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#00E5FF] font-bold">
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
              <span className="font-mono text-xs font-bold text-[#00E5FF] uppercase tracking-widest">
                {selectedService.subtitle}
              </span>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed font-body">
                {selectedService.description}
              </p>
            </div>

            {/* Metrics Grid */}
            {selectedService.metrics && selectedService.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {selectedService.metrics.map((m) => (
                  <div key={m.label} className="glass-panel p-3.5 rounded-xl border border-white/10 bg-[#101010]">
                    <span className="font-heading text-2xl font-extrabold text-[#7C3AED]">
                      {m.value}
                    </span>
                    <p className="text-[11px] font-mono text-text-muted mt-1 uppercase leading-tight">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Benefits */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                Key Benefits
              </h4>
              <ul className="space-y-2 text-xs text-text-secondary">
                {selectedService.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] mt-1.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedService.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] bg-[#7C3AED]/20 text-[#00E5FF] px-2.5 py-1 rounded-md border border-[#7C3AED]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <RadialGlowButton href="#contact" containerClassName="w-full flex">
                <span>Book Service Consultation</span>
              </RadialGlowButton>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
