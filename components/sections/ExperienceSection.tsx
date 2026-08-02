"use client";

import * as React from "react";
import Section from "@/components/layout/Section";
import { experience } from "@/data/experience";
import { motion } from "framer-motion";

const ExperienceSection = () => {
  return (
    <Section id="experience" className="bg-transparent pt-12">
      {/* Header */}
      <div className="mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border-default pb-6">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            Career <span className="bg-gradient-to-r from-[var(--color-rose-deep)] to-[var(--color-rose-active)] bg-clip-text text-transparent">Timeline</span>
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            A chronological breakdown of key roles, responsibilities, and technical achievements.
          </p>
        </div>
        <span className="self-start md:self-auto font-mono text-xs tracking-wider text-text-secondary uppercase font-semibold bg-bg-surface border border-border-default px-3.5 py-1.5 rounded-full shadow-xs">
          Roles & Impact Timeline
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto py-4 pl-6 md:pl-0">
        {/* Timeline Center Line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-rose-active)]/40 -translate-x-1/2" />

        <div className="space-y-12 md:space-y-16">
          {experience.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative grid md:grid-cols-2 gap-6 md:gap-16 items-center"
              >
                {/* Glowing Node */}
                <div className="absolute left-[15px] md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8">
                  <div className="h-5 w-5 rounded-full bg-bg-page border-2 border-[var(--color-rose-deep)] shadow-md flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[var(--color-rose-deep)]" />
                  </div>
                </div>

                {/* Date Period Badge */}
                <div
                  className={`order-1 mb-2 md:mb-0 md:flex md:items-center ${
                    isEven
                      ? "md:order-1 md:justify-end md:pr-8"
                      : "md:order-2 md:justify-start md:pl-8"
                  }`}
                >
                  <span className="inline-block font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-rose-deep)] bg-bg-surface/90 border border-border-default px-3.5 py-1.5 rounded-full shadow-xs">
                    {item.period}
                  </span>
                </div>

                {/* Glass Experience Card */}
                <div
                  className={`order-2 ${
                    isEven ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"
                  }`}
                >
                  <div
                    className={`liquid-glass-card rounded-2xl p-6 sm:p-7 max-w-[500px] border border-border-default shadow-md hover:shadow-xl transition-all duration-300 ${
                      isEven ? "mr-auto" : "ml-auto"
                    }`}
                  >
                    {/* Header: Role & Mode */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-heading text-xl font-bold text-text-primary tracking-tight">
                        {item.role}
                      </h3>
                      <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider border border-[var(--color-rose)]/40 bg-[var(--accent-50)] px-2.5 py-0.5 rounded-full text-text-primary">
                        {item.mode}
                      </span>
                    </div>

                    {/* Company Name */}
                    <p className="font-mono text-xs font-bold tracking-wide text-[var(--color-rose-deep)] mb-4">
                      {item.company}
                    </p>

                    {/* Responsibilities */}
                    <ul className="text-sm text-text-primary font-normal space-y-2.5 leading-relaxed font-body">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-rose-deep)]" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Tags */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-border-default flex flex-wrap items-center gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs bg-bg-surface text-text-primary border border-border-default px-2.5 py-1 rounded-md font-medium shadow-xs hover:border-[var(--color-rose)] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
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

