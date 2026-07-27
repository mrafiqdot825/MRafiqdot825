"use client";

import Image from "next/image";
import * as React from "react";
import dynamic from "next/dynamic";
import {
  AppleCode,
  AppleZap,
  AppleSparkles,
  AppleMapPin,
  AppleCalendar,
  AppleCheckCircle,
  AppleMonitor,
} from "@/components/ui/AppleIcons";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import LiquidGlassFrame from "@/components/ui/LiquidGlassFrame";
import { site } from "@/data/site";
import { education } from "@/data/education";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[160px]">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-[#0e4429] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-[#26a641] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 bg-[#39d353] rounded-full animate-bounce"></div>
        </div>
      </div>
    ),
  }
);


const AboutSection = () => {
  const [selectedYear, setSelectedYear] = React.useState<number | "last">("last");

  return (
    <Section id="about" className="bg-transparent pt-12">
      {/* Hero Intro Grid */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center mb-20">
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex items-center font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-3.5 py-1.5 rounded-full select-none">
            ENGINEERING PHILOSOPHY
          </span>
          <h2 className="mt-6 font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
            Crafting <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#00E5FF] bg-clip-text text-transparent">Resilient</span> Digital Ecosystems.
          </h2>
          <p className="mt-6 text-base text-text-secondary leading-relaxed font-body">
            {site.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white">
              <AppleMonitor className="h-5 w-5 text-[#00E5FF]" />
              <span>Full-Stack Architecture</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white">
              <AppleSparkles className="h-5 w-5 text-[#7C3AED]" />
              <span>AI/ML Enthusiast</span>
            </div>
          </div>
        </div>

        {/* Profile Liquid Glass Frame */}
        <LiquidGlassFrame >
          <Image
            src="/profile.png"
            alt="Muhammad Rafiq"
            width={900}
            height={900}
            priority
            className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </LiquidGlassFrame>
      </div>

      {/* Timeline & Academic Foundation */}
      <div className="mt-20 mb-12 border-b border-white/10 pb-4">
        <h3 className="font-heading text-3xl font-bold tracking-tight text-white">
          Academic <span className="text-[#00E5FF]">Foundation</span>
        </h3>
        <span className="font-mono text-xs tracking-widest text-text-muted uppercase">
          Qualifications & Degree
        </span>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto mb-20">
        {education.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group border border-white/10 bg-[#101010]/90"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-3 py-1 rounded-md text-[#00E5FF]">
                  {item.degree}
                </span>
                <h4 className="font-heading text-2xl font-bold text-white">
                  {item.institution}
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary font-mono">
                  <span className="flex items-center gap-1.5">
                    <AppleMapPin className="h-4 w-4 text-[#00E5FF]" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <AppleCalendar className="h-4 w-4 text-[#7C3AED]" />
                    {item.period}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex shrink-0 flex-col items-center justify-center rounded-xl glass-panel-inset px-5 py-4 text-center min-w-[110px]">
                <span className="text-3xl font-extrabold leading-none text-[#00E5FF] font-heading">
                  {item.endYear}
                </span>
                <span className="mt-1 text-[9px] font-mono uppercase tracking-widest text-text-muted">
                  Graduated
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <AppleCheckCircle className="h-4 w-4 text-[#00E5FF]" />
                  <h5 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                    Highlights
                  </h5>
                </div>
                <ul className="space-y-2 text-xs leading-relaxed text-text-secondary font-body">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <AppleCode className="h-4 w-4 text-[#7C3AED]" />
                  <h5 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                    Key Coursework
                  </h5>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.courses.map((course) => (
                    <span
                      key={course}
                      className="font-mono text-[10px] uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-text-secondary"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Contributions Activity */}
      <div id="github-activity" className="mt-20 mb-12 text-center">
        <h3 className="font-heading text-3xl font-bold tracking-tight text-white">
          Proof of <span className="text-[#3fb950]">Work</span>
        </h3>
        <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto leading-relaxed font-body">
          Live commit activity and repository contributions on GitHub.
        </p>
      </div>

      <div className="max-w-5xl mx-auto py-4">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-white/10 bg-[#101010]/90">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#238636]/20 text-[#3fb950]">
                <AppleCode className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-heading text-lg font-bold text-white">
                  mrafiqdot825
                </h4>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  GitHub Profile
                </span>
              </div>
            </div>

            <Button
              href="https://github.com/mrafiqdot825"
              variant="metal"
              dark
              size="sm"
              icon={<AppleZap className="h-4 w-4" />}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4 justify-start items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted mr-2 font-mono">
              Year:
            </span>
            {(['last', 2026, 2025, 2024, 2023] as const).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedYear === year
                  ? 'bg-[#238636] text-white border border-[#3fb950]/40'
                  : 'bg-white/5 border border-white/10 text-text-secondary hover:text-white'
                  }`}
              >
                {year === 'last' ? 'Last Year' : year}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto flex justify-center py-2 min-h-[160px] no-scrollbar">
            <div className="min-w-[750px] w-full flex justify-center">
              <GitHubCalendar
                username="mrafiqdot825"
                year={selectedYear}
                colorScheme="dark"
                theme={{
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
