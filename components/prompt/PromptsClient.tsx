"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import MouseBackgroundGlow from "@/components/ui/MouseBackgroundGlow";
import Button from "@/components/ui/Button";
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
    return "bg-[var(--accent-50)] border-[var(--color-rose)]/50 text-[var(--color-rose-deep)] font-semibold";
  }
  if (norm.includes("chatgpt")) {
    return "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300 font-semibold";
  }
  if (norm.includes("gemini")) {
    return "bg-sky-500/10 border-sky-500/30 text-sky-900 dark:text-sky-300 font-semibold";
  }
  if (norm.includes("midjourney")) {
    return "bg-purple-500/10 border-purple-500/30 text-purple-900 dark:text-purple-300 font-semibold";
  }
  if (norm.includes("sora") || norm.includes("runway") || norm.includes("luma")) {
    return "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300 font-semibold";
  }
  return "bg-bg-surface border-border-default text-text-primary font-semibold";
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
        <div className="absolute top-[60%] right-[5%] w-[450px] h-[450px] rounded-full bg-beige/15 blur-[140px]" />
      </div>

      <main className="page-shell min-h-screen bg-transparent text-text-primary pt-2 pb-21 px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Button
              href="/"
              variant="liquid"
              size="sm"
              icon={<AppleArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />}
              className="rounded-full px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase group shadow-md hover:scale-105 transition-all duration-200"
            >
              Back to Portfolio
            </Button>
          </div>

          {/* Header section */}
          <div className="text-center md:text-left mt-2 mb-6 relative">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-rose-deep)] bg-[var(--accent-50)] border border-[var(--color-rose)]/40 px-3.5 py-1.5 rounded-full shadow-xs">
              AI Engine Toolkit
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl text-text-primary">
              The AI Prompt Deck
            </h1>
            <p className="mt-2.5 max-w-2xl font-body text-base text-text-primary leading-relaxed">
              A curated registry of high-performance prompt templates. Type your variables directly into the fields below, see the live compilation, and copy the customized output.
            </p>
          </div>

          {/* Search, Category, and Platform controls */}
          <div className="mb-8 flex flex-col gap-5 bg-bg-surface/70 border border-border-default p-6 rounded-3xl shadow-lg relative overflow-hidden">
            {/* Search Input */}
            <div className="relative w-full z-10">
              <input
                type="text"
                placeholder="Search prompts by title, description, or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-5 py-3.5 text-sm rounded-xl border border-border-default bg-bg-page text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-rose)]/50 focus:border-[var(--color-rose)] transition-all duration-200 shadow-xs"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-2 justify-start items-center z-10">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border ${
                    selectedCategory === category
                      ? "bg-[var(--color-rose-deep)] text-white shadow-sm font-bold border-transparent"
                      : "bg-bg-page border-border-default text-text-primary hover:border-[var(--color-rose)] font-medium"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Platform selection */}
            <div className="flex flex-wrap gap-2 items-center mt-1 border-t border-border-default/60 pt-4 z-10">
              <span className="text-xs font-mono uppercase tracking-wider text-text-primary font-bold mr-2">Platform:</span>
              <div className="flex flex-wrap gap-1.5">
                {allPlatforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                      selectedPlatform === platform
                        ? "bg-[var(--accent-50)] border-[var(--color-rose)]/60 text-[var(--color-rose-deep)] font-bold shadow-xs"
                        : "bg-bg-page border-border-default text-text-primary hover:border-[var(--color-rose)]"
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
            <div className="text-center py-16 bg-bg-surface border border-border-default rounded-3xl">
              <AppleTerminal className="mx-auto w-10 h-10 text-text-secondary mb-3" />
              <p className="font-body text-text-primary text-base font-medium">No prompt templates found matching your selections.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedPlatform("All");
                }}
                className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[var(--color-rose-deep)] hover:underline transition-colors duration-200 cursor-pointer uppercase tracking-wider"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Prompts list grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrompts.map((prompt) => {
              const userVals = variablesState[prompt.id] || {};
              const hasVariables = prompt.variables && prompt.variables.length > 0;
              const isCopied = copiedStates[prompt.id] || false;
              const tipsExpanded = expandedTips[prompt.id] || false;

              return (
                <article
                  key={prompt.id}
                  className="glass-panel rounded-3xl border border-border-default p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[var(--color-rose)]/70 bg-bg-surface/80 shadow-md hover:shadow-xl relative overflow-hidden"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-rose-deep)] bg-[var(--accent-50)] px-2.5 py-1 rounded-md border border-[var(--color-rose)]/40 font-bold">
                        {prompt.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prompt.platforms.map((plat) => (
                          <span
                            key={plat}
                            className={`font-body text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getPlatformColor(plat)}`}
                          >
                            {plat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Info */}
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2 tracking-tight leading-tight">
                      {prompt.title}
                    </h2>
                    <p className="font-body text-sm text-text-primary leading-relaxed mb-5">
                      {prompt.summary}
                    </p>

                    {/* Playground variables editor */}
                    {hasVariables && (
                      <div className="mb-5 p-4 rounded-2xl bg-bg-page border border-border-default">
                        <div className="flex items-center gap-1.5 mb-3">
                          <AppleSliders className="w-4 h-4 text-[var(--color-rose-deep)]" />
                          <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-bold">
                            Playground Variables
                          </span>
                        </div>
                        <div className="space-y-3.5">
                          {prompt.variables?.map((v) => (
                            <div key={v.name} className="flex flex-col gap-1">
                              <label className="text-xs font-mono text-text-primary font-semibold flex justify-between">
                                <span>{v.name}</span>
                                <span className="text-[11px] text-text-secondary font-normal">{v.description}</span>
                              </label>
                              {v.type === "textarea" ? (
                                <textarea
                                  placeholder={v.placeholder}
                                  value={userVals[v.name] || ""}
                                  onChange={(e) => handleVariableChange(prompt.id, v.name, e.target.value)}
                                  rows={3}
                                  className="w-full p-3 rounded-xl border border-border-default bg-bg-surface text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-[var(--color-rose)] placeholder:text-text-secondary/60 font-body transition-all"
                                />
                              ) : (
                                <input
                                  type="text"
                                  placeholder={v.placeholder}
                                  value={userVals[v.name] || ""}
                                  onChange={(e) => handleVariableChange(prompt.id, v.name, e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl border border-border-default bg-bg-surface text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-[var(--color-rose)] placeholder:text-text-secondary/60 font-body transition-all"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code block Live Preview */}
                    <div className="mb-5">
                      <span className="block font-mono text-xs uppercase tracking-wider text-text-primary mb-1.5 font-bold">
                        Compiled Output
                      </span>
                      <div className="rounded-2xl p-4 font-mono text-xs text-text-primary bg-bg-page border border-border-default overflow-y-auto max-h-[160px] relative shadow-inner">
                        <pre className="whitespace-pre-wrap break-all pr-4 select-all leading-relaxed font-mono font-medium">
                          {compilePrompt(prompt)}
                        </pre>
                      </div>
                    </div>

                    {/* Pro Tips collapsible */}
                    {prompt.tips && prompt.tips.length > 0 && (
                      <div className="mb-5 border-t border-border-default pt-3">
                        <button
                          onClick={() => toggleTips(prompt.id)}
                          className="flex items-center gap-1.5 text-xs text-text-primary hover:text-[var(--color-rose-deep)] transition-colors duration-200 cursor-pointer font-mono font-bold"
                        >
                          <AppleLightbulb className="w-4 h-4 text-[var(--color-rose-deep)]" />
                          <span>Pro Tips for Best Results</span>
                          {tipsExpanded ? <AppleChevronUp className="w-3.5 h-3.5" /> : <AppleChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {tipsExpanded && (
                          <ul className="mt-2.5 space-y-1.5 list-disc pl-4 text-xs text-text-primary leading-relaxed font-body font-medium">
                            {prompt.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-2 pt-3 border-t border-border-default flex justify-center w-full">
                    <Button
                      onClick={() => handleCopy(prompt)}
                      variant="liquid"
                      size="sm"
                      className="w-full text-xs font-bold"
                      icon={
                        isCopied ? (
                          <AppleCheck className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AppleCopy className="w-3.5 h-3.5" />
                        )
                      }
                    >
                      {isCopied ? "Copied to Clipboard!" : "Copy Prompt Template"}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Unlock More Prompts CTA Banner */}
          <div className="mt-16 p-8 md:p-10 rounded-3xl border border-border-default bg-bg-surface text-center max-w-3xl mx-auto shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-rose-deep)] bg-[var(--accent-50)] px-3.5 py-1.5 rounded-full border border-[var(--color-rose)]/40 font-bold mb-3.5">
                Unlock Full Library
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight mb-2.5">
                Need Custom Prompt Architectures?
              </h3>
              <p className="font-body text-sm text-text-primary leading-relaxed max-w-xl mx-auto mb-6">
                I design and optimize specialized prompt chains, system instructions, and RAG architectures for custom engineering and product workflows. Get in touch to unlock the full library or collaborate on custom AI integrations.
              </p>

              <div className="flex justify-center">
                <Button
                  href="/#contact"
                  variant="liquid"
                  size="md"
                  className="px-8 font-bold"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

