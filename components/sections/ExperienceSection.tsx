"use client";

import * as React from "react";
import Section from "@/components/layout/Section";
import { experience } from "@/data/experience";
import { motion } from "framer-motion";

const TIMELINE_COLORS = [
  { dot: "bg-(--color-rose-active)", glow: "rgba(184, 144, 125, 0.6)" },
  { dot: "bg-(--color-rose-deep)", glow: "rgba(138, 111, 98, 0.6)" },
  { dot: "bg-rose", glow: "rgba(215, 189, 176, 0.6)" },
];

const ExperienceSection = () => {
  return (
    <Section id="experience" className="bg-transparent pt-12">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 border-b border-beige pb-4">
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Interactive <span className="bg-gradient-to-r from-(--color-rose-active) to-(--color-rose-deep) bg-clip-text text-transparent">Timeline</span>
        </h2>
        <span className="font-mono text-xs tracking-widest text-text-muted uppercase">
          Career Roles & Impact Timeline
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto py-8 pl-8 md:pl-0">
        {/* Timeline Center Line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-(--color-rose-active) via-(--color-rose-deep) to-rose -translate-x-1/2 opacity-40" />

        <div className="space-y-12 md:space-y-16">
          {experience.map((item, index) => {
            const isEven = index % 2 === 0;
            const colors = TIMELINE_COLORS[index % TIMELINE_COLORS.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative grid md:grid-cols-2 gap-8 md:gap-20 items-center"
              >
                {/* Glowing Node */}
                <div className="absolute left-[15px] md:left-1/2 top-5 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8">
                  <div
                    className={`h-4 w-4 rounded-full ${colors.dot} border-2 border-offwhite`}
                    style={{ boxShadow: `0 0 18px 6px ${colors.glow}` }}
                  />
                </div>

                {/* Date Period */}
                <div
                  className={`order-1 mb-1 font-mono text-xs font-bold uppercase tracking-wider md:mb-0 md:flex md:items-center ${isEven
                    ? "md:order-1 md:justify-end md:pr-10 text-(--color-rose-deep)"
                    : "md:order-2 md:justify-start md:pl-10 text-text-secondary"
                    }`}
                >
                  {item.period}
                </div>

                {/* 3D Tilted Glass Card */}
                <div
                  className={`order-2 ${isEven ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"
                    }`}
                >
                  <div
                    className={`glass-panel rounded-2xl p-6 max-w-[480px] border border-beige bg-cream/85 hover:border-rose/40 hover:-translate-y-1.5 transition-all duration-300 ${isEven ? "mr-auto" : "ml-auto"
                      }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading text-lg font-bold text-text-primary">
                        {item.role}
                      </h3>
                      <span className="inline-flex items-center font-mono text-[9px] uppercase tracking-wider border border-beige bg-beige/40 px-2 py-0.5 rounded text-text-muted">
                        {item.mode}
                      </span>
                    </div>

                    <p className="font-mono text-xs font-semibold tracking-wider text-(--color-rose-deep) mt-1">
                      {item.company}
                    </p>

                    <ul className="text-xs text-text-secondary mt-3.5 space-y-2 leading-relaxed font-body">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-rose-active)" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tag Capping Rule (Max 4 visible) */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-beige flex flex-wrap items-center gap-1.5">
                        {item.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] uppercase bg-rose/15 text-(--color-rose-deep) border border-rose/30 px-2 py-0.5 rounded font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 4 && (
                          <span className="font-mono text-[9px] text-text-muted px-1.5 py-0.5 font-semibold">
                            +{item.technologies.length - 4} MORE
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
