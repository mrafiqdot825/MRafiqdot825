"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import MouseBackgroundGlow from "@/components/ui/MouseBackgroundGlow";
import RadialGlowButton from "@/components/ui/RadialGlowButton";
import { prompts, type Prompt, type PromptCategory } from "@/data/prompts";
import {
  AppleCopy,
  AppleCheck,
  AppleTerminal,
  AppleSliders,
  AppleLightbulb,
  AppleChevronDown,
  AppleChevronUp,
  AppleArrowLeft
} from "@/components/ui/AppleIcons";

const CATEGORIES: ("All" | PromptCategory)[] = [
  "All",
  "Fixing Bugs & Code",
  "Writing & Content",
  "Image Generation",
  "Video & Motion",
  "Resume & Career",
  "Product & Strategy",
  "IPhone Wallpapers"
];

const getPlatformColor = (platform: string) => {
  const norm = platform.toLowerCase();
  if (norm.includes("claude")) {
    return "bg-orange-50/70 dark:bg-orange-950/20 border-orange-200/50 dark:border-orange-900/30 text-orange-700 dark:text-orange-400";
  }
  if (norm.includes("chatgpt")) {
    return "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400";
  }
  if (norm.includes("gemini")) {
    return "bg-blue-50/70 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-900/30 text-blue-700 dark:text-blue-400";
  }
  if (norm.includes("midjourney")) {
    return "bg-purple-50/70 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-900/30 text-purple-700 dark:text-purple-400";
  }
  if (norm.includes("sora") || norm.includes("runway") || norm.includes("luma")) {
    return "bg-pink-50/70 dark:bg-pink-950/20 border-pink-200/50 dark:border-pink-900/30 text-pink-700 dark:text-pink-400";
  }
  return "bg-neutral-50/70 dark:bg-neutral-900/40 border-neutral-200/50 dark:border-neutral-800/40 text-neutral-600 dark:text-neutral-400";
};

export default function PromptsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | PromptCategory>("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [variablesState, setVariablesState] = useState<Record<string, Record<string, string>>>({});
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});

  const allPlatforms = useMemo(() => {
    const platformsSet = new Set<string>();
    prompts.forEach((p) => p.platforms.forEach((plat) => platformsSet.add(plat)));
    return ["All", ...Array.from(platformsSet)];
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.promptText.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesPlatform = selectedPlatform === "All" || p.platforms.includes(selectedPlatform);

      return matchesSearch && matchesCategory && matchesPlatform;
    });
  }, [searchQuery, selectedCategory, selectedPlatform]);

  const handleVariableChange = (promptId: string, varName: string, value: string) => {
    setVariablesState((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [varName]: value
      }
    }));
  };

  const compilePrompt = (prompt: Prompt) => {
    let result = prompt.promptText;
    const promptVars = prompt.variables || [];
    const userVals = variablesState[prompt.id] || {};

    promptVars.forEach((v) => {
      const val = userVals[v.name] !== undefined ? userVals[v.name] : "";
      const replacement = val.trim() || `[${v.name}]`;
      result = result.replaceAll(`[${v.name}]`, replacement);
    });

    return result;
  };

  const handleCopy = async (prompt: Prompt) => {
    const compiled = compilePrompt(prompt);
    try {
      await navigator.clipboard.writeText(compiled);
      setCopiedStates((prev) => ({ ...prev, [prompt.id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [prompt.id]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleTips = (promptId: string) => {
    setExpandedTips((prev) => ({ ...prev, [promptId]: !prev[promptId] }));
  };

  return (
    <>
      <CustomCursor />
      <MouseBackgroundGlow />
      <Navbar />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-accent-600/5 blur-[120px]" />
        <div className="absolute top-[60%] right-[5%] w-[450px] h-[450px] rounded-full bg-indigo-600/5 blur-[140px]" />
      </div>

      <main className="page-shell min-h-screen bg-transparent text-text-primary pt-2 pb-21 px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-2 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-mono font-bold tracking-wider text-text-secondary hover:text-text-primary border border-border-default hover:border-accent-600 bg-white/5 hover:bg-accent-600/10 transition-all duration-300 group shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] cursor-pointer"
            >
              <AppleArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 text-text-secondary group-hover:text-accent-700" />
              <span>BACK TO PORTFOLIO</span>
            </Link>
          </div>

          {/* Header section */}
          <div className="text-center md:text-left mt-0 mb-1 relative">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-accent-700 bg-accent-50/70 border border-accent-100/50 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              AI Engine Toolkit
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-6xl text-text-primary">
              The AI Prompt Deck
            </h1>
            <p className="mt-3 max-w-2xl font-body text-base md:text-lg text-text-secondary leading-relaxed">
              A curated registry of high-performance prompt templates. Type your variables directly into the fields below, see the live compilation, and copy the customized output.
            </p>
          </div>

          {/* Search, Category, and Platform controls */}
          <div className="mb-5 flex flex-col gap-5 bg-bg-surface/30 backdrop-blur-xl border border-border-default/55 p-6 rounded-[28px] shadow-2xl relative overflow-hidden group">
            {/* Ambient border gradient highlight on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Search Input */}
            <div className="relative w-full z-10">
              <input
                type="text"
                placeholder="Search prompts by title, description, or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 text-sm rounded-[18px] border border-border-default bg-bg-page/40 text-text-primary placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent-600/50 focus:border-accent-600 transition-all duration-300 backdrop-blur-md"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-2 justify-start items-center z-10">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-[14px] text-xs font-mono transition-all duration-300 cursor-pointer border ${selectedCategory === category
                    ? "bg-accent-600 text-white shadow-lg shadow-accent-600/25 font-semibold border-accent-500"
                    : "bg-bg-page/30 border-border-default/80 text-text-secondary hover:bg-bg-surface-hover hover:border-border-hover hover:text-text-primary"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Platform selection */}
            <div className="flex flex-wrap gap-1.5 items-center mt-2 border-t border-border-default/30 pt-4 z-10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted mr-3">Platform:</span>
              <div className="flex flex-wrap gap-1.5">
                {allPlatforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-3 py-1 rounded-full text-xs font-body transition-all duration-300 cursor-pointer border ${selectedPlatform === platform
                      ? "bg-accent-50 border-accent-200 text-accent-700 font-semibold dark:bg-accent-950/20 dark:border-accent-900/30 dark:text-accent-400"
                      : "bg-transparent border-transparent text-text-muted hover:border-border-default hover:text-text-primary"
                      }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Empty state fallback */}
          {filteredPrompts.length === 0 && (
            <div className="text-center py-20 bg-bg-surface/40 border border-border-default/60 rounded-[28px] backdrop-blur-xl">
              <AppleTerminal className="mx-auto w-10 h-10 text-text-muted mb-4" />
              <p className="font-body text-text-secondary text-base">No prompt templates found matching your selections.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedPlatform("All");
                }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:text-accent-800 transition-colors duration-200 cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Prompts list grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {filteredPrompts.map((prompt) => {
              const userVals = variablesState[prompt.id] || {};
              const hasVariables = prompt.variables && prompt.variables.length > 0;
              const isCopied = copiedStates[prompt.id] || false;
              const tipsExpanded = expandedTips[prompt.id] || false;

              return (
                <article
                  key={prompt.id}
                  className="glass-panel rounded-[28px] border border-border-default p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-border-hover group relative overflow-hidden bg-bg-surface/30 backdrop-blur-xl shadow-xl hover:-translate-y-0.5"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent-700 bg-accent-50 dark:bg-accent-950/20 px-2.5 py-1 rounded-md border border-accent-100/50 dark:border-accent-900/30">
                        {prompt.category}
                      </span>
                      <div className="flex gap-1.5">
                        {prompt.platforms.map((plat) => (
                          <span
                            key={plat}
                            className={`font-body text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPlatformColor(plat)}`}
                          >
                            {plat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Info */}
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2.5 tracking-tight leading-tight">
                      {prompt.title}
                    </h2>
                    <p className="font-body text-[14px] text-text-secondary leading-relaxed mb-6">
                      {prompt.summary}
                    </p>

                    {/* Playground variables editor */}
                    {hasVariables && (
                      <div className="mb-6 p-4 rounded-2xl bg-bg-page/35 border border-border-default/45 backdrop-blur-md">
                        <div className="flex items-center gap-1.5 mb-3">
                          <AppleSliders className="w-3.5 h-3.5 text-accent-600" />
                          <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
                            Playground Variables
                          </span>
                        </div>
                        <div className="space-y-4">
                          {prompt.variables?.map((v) => (
                            <div key={v.name} className="flex flex-col gap-1.5">
                              <label className="text-[11px] font-mono text-text-secondary flex justify-between">
                                <span>{v.name}</span>
                                <span className="text-[10px] text-text-muted">{v.description}</span>
                              </label>
                              {v.type === "textarea" ? (
                                <textarea
                                  placeholder={v.placeholder}
                                  value={userVals[v.name] || ""}
                                  onChange={(e) => handleVariableChange(prompt.id, v.name, e.target.value)}
                                  rows={3}
                                  className="w-full p-3 rounded-[12px] border border-border-default bg-bg-page/40 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-600 placeholder-text-muted/40 font-body transition-all"
                                />
                              ) : (
                                <input
                                  type="text"
                                  placeholder={v.placeholder}
                                  value={userVals[v.name] || ""}
                                  onChange={(e) => handleVariableChange(prompt.id, v.name, e.target.value)}
                                  className="w-full px-3 py-2 rounded-[12px] border border-border-default bg-bg-page/40 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-600 placeholder-text-muted/40 font-body transition-all"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code block Live Preview */}
                    <div className="mb-6">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2 font-semibold">
                        Compiled Output
                      </span>
                      <div className="glass-panel-inset rounded-2xl p-4 font-mono text-xs text-text-secondary bg-black/5 dark:bg-black/20 overflow-y-auto max-h-[160px] border border-border-default/40 relative">
                        <pre className="whitespace-pre-wrap break-all pr-4 select-all leading-relaxed font-mono">
                          {compilePrompt(prompt)}
                        </pre>
                      </div>
                    </div>

                    {/* Pro Tips collapsible */}
                    {prompt.tips && prompt.tips.length > 0 && (
                      <div className="mb-6 border-t border-border-default/30 pt-3">
                        <button
                          onClick={() => toggleTips(prompt.id)}
                          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer font-mono font-semibold"
                        >
                          <AppleLightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>Pro Tips for Best Results</span>
                          {tipsExpanded ? <AppleChevronUp className="w-3.5 h-3.5" /> : <AppleChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {tipsExpanded && (
                          <ul className="mt-2.5 space-y-1.5 list-disc pl-4 text-xs text-text-secondary leading-relaxed font-body">
                            {prompt.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-4 pt-4 border-t border-border-default/30 flex justify-center w-full">
                    <RadialGlowButton
                      onClick={() => handleCopy(prompt)}
                      className="w-full"
                      containerClassName="w-full"
                      style={isCopied ? {
                        "--rg-color-1": "#064e3b",
                        "--rg-color-2": "#059669",
                        "--rg-color-3": "#10b981",
                        "--rg-color-4": "#a7f3d0",
                        "--rg-color-5": "hsl(160 80% 2.5%)"
                      } as React.CSSProperties : undefined}
                    >
                      {isCopied ? (
                        <>
                          <span className="mr-1.5">
                            <AppleCheck className="w-4 h-4 animate-bounce" />
                          </span>
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-1.5">
                            <AppleCopy className="w-3.5 h-3.5" />
                          </span>
                          <span>Copy Prompt Template</span>
                        </>
                      )}
                    </RadialGlowButton>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Unlock More Prompts CTA Banner */}
          <div className="mt-16 p-8 md:p-12 rounded-[28px] border border-border-default/65 bg-bg-surface/20 backdrop-blur-xl relative overflow-hidden text-center max-w-3xl mx-auto shadow-2xl">
            {/* Background Accent Mesh */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute -top-12 -right-12 w-[180px] h-[180px] rounded-full bg-accent-600/10 blur-[40px]" />
              <div className="absolute -bottom-12 -left-12 w-[180px] h-[180px] rounded-full bg-indigo-600/10 blur-[40px]" />
            </div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-accent-700 bg-accent-50 dark:bg-accent-950/20 px-3.5 py-1.5 rounded-full border border-accent-100/50 dark:border-accent-900/30 mb-4">
                Unlock Full Library
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight mb-3">
                Need Custom Prompt Architectures?
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed max-w-xl mx-auto mb-6">
                I design and optimize specialized prompt chains, system instructions, and RAG architectures for custom engineering and product workflows. Get in touch to unlock the full library or collaborate on custom AI integrations.
              </p>

              <div className="flex justify-center">
                <RadialGlowButton
                  href="/#contact"
                  className="px-8"
                >
                  Get in Touch
                </RadialGlowButton>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
