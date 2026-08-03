"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  AppleLayers,
  AppleExternalLink,
  AppleTrendingUp,
  AppleGithub,
  AppleDevice,
  AppleMail,
  AppleArrowLeft,
  AppleArrowRight,
  AppleMonitor,
} from "@/components/ui/AppleIcons";
import Section from "@/components/layout/Section";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import GenerateButton from "@/components/ui/GenerateButton";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import { motion } from "framer-motion";

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  Live: { color: "text-[var(--color-rose-deep)]", bg: "bg-rose/10", border: "border-rose/30" },
  "In Progress": { color: "text-[var(--color-rose-active)]", bg: "bg-rose/15", border: "border-rose/35" },
  Archived: { color: "text-text-primary", bg: "bg-bg-surface", border: "border-border-default" },
  "APK Available": { color: "text-[var(--color-rose-hover)]", bg: "bg-rose/12", border: "border-rose/30" },
  "Open Source": { color: "text-[var(--color-rose-active)]", bg: "bg-rose/10", border: "border-rose/30" },
};

const getStatusConfig = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG["Live"];

const ProjectsSection = () => {
  const [selectedProjectForApk, setSelectedProjectForApk] = useState<Project | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft <= 5);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
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
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.85 : clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Section id="projects" className="border-t border-beige bg-transparent pt-12">
      {/* Section Header */}
      <div className="mb-10 max-w-3xl">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-(--color-rose-deep)">
          SHOWCASES
        </span>
        <h2 className="flex items-center gap-3 font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary mt-2">
          Project <span className="bg-gradient-to-r from-(--color-rose-active) via-rose to-(--color-rose-deep) bg-clip-text text-transparent">Worlds</span>
        </h2>
        <p className="mt-3 max-w-2xl font-body text-sm sm:text-base text-text-secondary leading-relaxed">
          Every project is an immersive digital world with device mockups (Laptop, Phone, Tablet), animated screenshots, and tilt interactions.
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div
        ref={carouselRef}
        className="flex items-stretch gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory py-6 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {projects.map((project, index) => {
          const statusConfig = getStatusConfig(project.status);
          const maxTags = 4;
          const visibleTech = project.tech.slice(0, maxTags);
          const remainingTagsCount = project.tech.length - maxTags;

          // Alternate 3D Mockup Badge (Laptop, Phone, Tablet)
          const deviceType = index % 3 === 0 ? "3D Laptop" : index % 3 === 1 ? "3D Phone" : "3D Tablet";
          const DeviceIcon = index % 3 === 0 ? AppleMonitor : index % 3 === 1 ? AppleDevice : AppleLayers;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="snap-start shrink-0 w-[88vw] sm:w-[400px] md:w-[440px] flex flex-col"
            >
              <article className="liquid-glass-card liquid-glass-card-hover flex-1 flex flex-col justify-between rounded-2xl overflow-hidden group">
                <div className="flex flex-col flex-1">
                  {/* 3D Device Frame Preview */}
                  {project.thumbnail && (
                    <div className="overflow-hidden border-b border-beige aspect-video relative bg-cream/80 shrink-0 group-hover:shadow-[0_0_30px_rgba(184,144,125,0.3)] transition-all duration-500">

                      <Image
                        src={project.thumbnail}
                        alt={project.imageAlt}
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Header & Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-(--color-rose-deep) transition-colors">
                          {project.title}
                        </h3>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold ${statusConfig.color} border ${statusConfig.border} ${statusConfig.bg}`}
                        >
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                          {project.status}
                        </div>
                      </div>

                      <p className="font-body text-xs text-text-primary font-medium leading-relaxed mb-4">
                        {project.summary}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {visibleTech.map((item) => (
                          <span
                            key={item}
                            className="font-mono text-[10px] font-bold bg-rose/20 text-(--color-rose-deep) px-2.5 py-1 rounded-md border border-rose/40"
                          >
                            {item}
                          </span>
                        ))}
                        {remainingTagsCount > 0 && (
                          <span className="font-mono text-[10px] bg-cream text-text-primary font-semibold px-2 py-1 rounded-md border border-beige">
                            +{remainingTagsCount} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Liquid Glass Action Buttons */}
                <div className="px-6 pb-6 flex items-center gap-2 pt-4 border-t border-beige bg-cream/60">
                  {project.status === "APK Available" ? (
                    <Button
                      onClick={() => setSelectedProjectForApk(project)}
                      variant="liquid"
                      size="sm"
                      className="flex-1 text-xs font-semibold"
                      icon={<AppleDevice className="w-4 h-4" />}
                    >
                      Get APK
                    </Button>
                  ) : project.status === "Open Source" ? (
                    <Button
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="liquid"
                      size="sm"
                      className="flex-1 text-xs font-semibold"
                      icon={<AppleGithub className="w-4 h-4" />}
                    >
                      GitHub Repo
                    </Button>
                  ) : (
                    <Button
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="liquid"
                      size="sm"
                      className="flex-1 text-xs font-semibold"
                      icon={<AppleExternalLink className="w-4 h-4" />}
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.detailsUrl && (
                    <Button
                      href={project.detailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="liquid"
                      size="sm"
                      className="text-xs px-3.5 font-semibold"
                      icon={<AppleGithub className="w-4 h-4" />}
                    >
                      Code
                    </Button>
                  )}
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => handleScroll("left")}
          disabled={isAtStart}
          className="liquid-glass-accent-button inline-flex items-center justify-center w-10 h-10 rounded-full text-text-primary transition-all disabled:opacity-30 cursor-pointer shadow-sm"
          aria-label="Previous"
        >
          <AppleArrowLeft className="w-5 h-5" />
        </button>

        <div className="h-1.5 w-36 rounded-full bg-beige/60 overflow-hidden relative">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-(--color-rose-active) to-(--color-rose-deep) rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <button
          onClick={() => handleScroll("right")}
          disabled={isAtEnd}
          className="liquid-glass-accent-button inline-flex items-center justify-center w-10 h-10 rounded-full text-text-primary transition-all disabled:opacity-30 cursor-pointer shadow-sm"
          aria-label="Next"
        >
          <AppleArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* GitHub Callout */}
      <div className="mt-12 rounded-2xl liquid-glass-card p-6 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <AppleTrendingUp className="w-5 h-5 text-(--color-rose-deep)" />
            <p className="text-sm font-bold text-text-primary">
              Continuously building open source software and AI agent frameworks on GitHub.
            </p>
          </div>
          <GenerateButton
            href="https://github.com/mrafiqdot825"
            target="_blank"
            rel="noopener noreferrer"
            text="Explore GitHub Repos"
            activeText="Opening GitHub"
            hue={250}
            icon={<AppleGithub />}
          />
        </div>
      </div>

      {/* APK Modal */}
      <Modal
        isOpen={selectedProjectForApk !== null}
        onClose={() => setSelectedProjectForApk(null)}
        title="Mobile Build (APK) Request"
      >
        {selectedProjectForApk && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-rose/20 border border-rose/40">
              <AppleDevice className="w-8 h-8 text-(--color-rose-deep) shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-text-primary text-base">
                  {selectedProjectForApk.title}
                </h4>
                <span className="font-mono text-[11px] font-bold text-(--color-rose-deep) uppercase tracking-wider block mt-0.5">
                  Android APK Package
                </span>
              </div>
            </div>

            <p className="text-sm font-medium text-text-primary leading-relaxed font-body">
              This mobile application is built with React Native and Expo. You can request the direct APK installation package for Android device testing.
            </p>

            <div className="flex gap-3 pt-2">
              <Button
                href={`mailto:mrafiqdot825@gmail.com?subject=APK%20Request:%20${encodeURIComponent(selectedProjectForApk.title)}`}
                variant="liquid"
                size="sm"
                className="w-full text-xs font-bold justify-center"
                icon={<AppleMail className="w-4 h-4" />}
              >
                Email Request
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
};

export default ProjectsSection;
