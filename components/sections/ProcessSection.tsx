"use client";

import { AppleSearch, AppleFigmaIcon, AppleCode, AppleCloudIcon, AppleTrendingUp } from "@/components/ui/AppleIcons";

const PROCESS_STEPS = [
  { step: "01", stage: "Discover", title: "Architecture & Research", desc: "Understanding product goals, defining tech stack boundaries, schema design, and AI model selection.", icon: AppleSearch, color: "#8a6f62" },
  { step: "02", stage: "Design", title: "UI/UX & Prototyping", desc: "Crafting modern glassmorphic component layouts, dynamic micro-interactions, and visual design systems.", icon: AppleFigmaIcon, color: "#b8907d" },
  { step: "03", stage: "Develop", title: "Engineering & AI Integration", desc: "Building scalable React/Next.js client apps, FastAPI backends, LangChain/Gemini AI agents, and mobile codebases.", icon: AppleCode, color: "#d7bdb0" },
  { step: "04", stage: "Deploy", title: "CI/CD & QA Testing", desc: "Automating Playwright test suites, Docker containerization, and zero-downtime production deployment.", icon: AppleCloudIcon, color: "#c9a999" },
  { step: "05", stage: "Scale", title: "Monitoring & Optimization", desc: "Lighthouse optimization, Redis query caching, server monitoring, and continuous feature expansion.", icon: AppleTrendingUp, color: "#4a1b0c" },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-4 relative bg-transparent border-t border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-(--color-rose-deep)">
            ENGINEERING WORKFLOW
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-text-primary mt-3 tracking-tight">
            Horizontal <span className="bg-gradient-to-r from-(--color-rose-deep) to-(--color-rose-active) bg-clip-text text-transparent">Storytelling Process</span>
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
                className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-beige hover:border-rose/40 hover:-translate-y-2 transition-all duration-300 bg-cream/85 relative group"
              >
                {/* Connecting Line (desktop) */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-beige z-10" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-extrabold text-(--color-rose-active)">
                      {p.step}
                    </span>
                    <div
                      className="p-2 rounded-xl border border-beige"
                      style={{ backgroundColor: `${p.color}20`, color: p.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase font-bold text-(--color-rose-deep) tracking-widest">
                    {p.stage}
                  </span>
                  <h3 className="font-heading text-base font-bold text-text-primary mt-1 group-hover:text-(--color-rose-deep) transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-secondary leading-relaxed font-body">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-beige/60 flex items-center justify-between font-mono text-[10px] text-text-muted">
                  <span>PHASE {p.step}</span>
                  <span className="text-(--color-rose-deep)">READY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
