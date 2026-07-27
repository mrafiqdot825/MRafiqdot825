"use client";

import { AppleSearch, AppleFigmaIcon, AppleCode, AppleCloudIcon, AppleTrendingUp } from "@/components/ui/AppleIcons";

const PROCESS_STEPS = [
  { step: "01", stage: "Discover", title: "Architecture & Research", desc: "Understanding product goals, defining tech stack boundaries, schema design, and AI model selection.", icon: AppleSearch, color: "#00E5FF" },
  { step: "02", stage: "Design", title: "UI/UX & Prototyping", desc: "Crafting modern glassmorphic component layouts, dynamic micro-interactions, and visual design systems.", icon: AppleFigmaIcon, color: "#7C3AED" },
  { step: "03", stage: "Develop", title: "Engineering & AI Integration", desc: "Building scalable React/Next.js client apps, FastAPI backends, LangChain/Gemini AI agents, and mobile codebases.", icon: AppleCode, color: "#8B5CF6" },
  { step: "04", stage: "Deploy", title: "CI/CD & QA Testing", desc: "Automating Playwright test suites, Docker containerization, and zero-downtime production deployment.", icon: AppleCloudIcon, color: "#3B82F6" },
  { step: "05", stage: "Scale", title: "Monitoring & Optimization", desc: "Lighthouse optimization, Redis query caching, server monitoring, and continuous feature expansion.", icon: AppleTrendingUp, color: "#10B981" },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-4 relative bg-transparent border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
            ENGINEERING WORKFLOW
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Horizontal <span className="bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">Storytelling Process</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed font-body">
            A systematic 5-phase engineering methodology powering scalable software deliverables.
          </p>
        </div>

        {/* Horizontal Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.step}
                className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-white/10 hover:border-[#00E5FF]/40 hover:-translate-y-2 transition-all duration-300 bg-[#101010]/90 relative group"
              >
                {/* Connecting Line (desktop) */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-white/20 z-10" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-extrabold text-[#7C3AED]">
                      {p.step}
                    </span>
                    <div
                      className="p-2 rounded-xl border border-white/10"
                      style={{ backgroundColor: `${p.color}20`, color: p.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase font-bold text-[#00E5FF] tracking-widest">
                    {p.stage}
                  </span>
                  <h3 className="font-heading text-base font-bold text-white mt-1 group-hover:text-[#00E5FF] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-secondary leading-relaxed font-body">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-text-muted">
                  <span>PHASE {p.step}</span>
                  <span className="text-[#00E5FF]">READY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
