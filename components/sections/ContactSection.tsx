"use client";

import {
  AppleMail,
  AppleMessage,
  AppleCheckCircle,
  AppleWarning,
  AppleFacebook,
  AppleGithub,
  AppleInstagram,
  AppleLinkedin,
  AppleWhatsapp,
  AppleXSocial,
  AppleCpu,
  AppleTiktok,
} from "@/components/ui/AppleIcons";
import { useEffect, useRef, useState } from "react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Chatbot from "@/components/ui/Chatbot";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { ICON_CLASS } from "@/lib/constants";
import { motion } from "framer-motion";

const SOCIAL_ICONS = {
  Facebook: AppleFacebook,
  Github: AppleGithub,
  X: AppleXSocial,
  Linkedin: AppleLinkedin,
  Instagram: AppleInstagram,
  Whatsapp: AppleWhatsapp,
  WhatsApp: AppleWhatsapp,
  Tiktok: AppleTiktok,
  TikTok: AppleTiktok,
};

const ContactSection = () => {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (succeeded) {
      contactFormRef.current?.reset();
    }
  }, [succeeded]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSucceeded(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      setSucceeded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      title={
        <>
          <AppleCpu className={`${ICON_CLASS.section} text-[#00E5FF]`} />
          Futuristic Control Center
        </>
      }
      description="Connect directly via the holographic transmission terminal or query the Gemini AI chatbot assistant."
      className="border-t border-white/10 bg-transparent pt-12 pb-40 md:pb-10 mb-10"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Futuristic Floating Holographic Panel */}
        <Card className="relative flex flex-col justify-between border border-white/10 bg-[#101010]/90 shadow-[0_0_35px_rgba(124,58,237,0.2)]">
          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF]">
                  <AppleMessage className={ICON_CLASS.nav} />
                </span>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00E5FF]">
                    CONTROL TERMINAL
                  </p>
                  <p className="text-xs text-text-secondary">
                    Direct Holographic Transmission
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center font-mono text-[10px] text-[#7C3AED] bg-[#7C3AED]/20 border border-[#7C3AED]/30 px-2.5 py-1 rounded-full animate-pulse">
                SYS_ONLINE
              </span>
            </div>

            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white mb-6">
              STATUS: <span className="text-[#00E5FF]">{site.availability}</span>
            </p>

            {succeeded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-xl border border-[#00E5FF]/40 bg-[#00E5FF]/10 p-4 text-center"
              >
                <AppleCheckCircle className="h-6 w-6 text-[#00E5FF] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Transmission Received!</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Thank you for reaching out. Muhammad will respond within 24 hours.
                </p>
              </motion.div>
            )}

            <form
              ref={contactFormRef}
              className="mt-6 space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 block">
                  <span className="text-xs font-mono font-semibold uppercase text-text-secondary">
                    Your Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Muhammad Rafiq"
                    required
                    className="w-full glass-input rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-text-muted"
                  />
                </label>

                <label className="space-y-1.5 block">
                  <span className="text-xs font-mono font-semibold uppercase text-text-secondary">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full glass-input rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-text-muted"
                  />
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="text-xs font-mono font-semibold uppercase text-text-secondary">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  placeholder="AI Agent Architecture / Next.js Redesign"
                  className="w-full glass-input rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-text-muted"
                />
              </label>

              <label className="space-y-1.5 block">
                <span className="text-xs font-mono font-semibold uppercase text-text-secondary">
                  Transmission Message
                </span>
                <textarea
                  name="message"
                  placeholder="Outline project goals, scope, and timeline..."
                  rows={5}
                  required
                  className="w-full resize-none glass-input rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-text-muted"
                />
              </label>

              {error && (
                <div className="rounded-xl border border-rose-800/40 bg-rose-950/30 p-3 text-xs text-rose-400 flex items-center gap-2">
                  <AppleWarning className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="metal"
                  size="sm"
                  dark
                  icon={submitting ? null : <AppleMail className="h-4 w-4 text-[#00E5FF]" />}
                >
                  {submitting ? "Transmitting..." : "Send Transmission"}
                </Button>
              </div>
            </form>

            <div className="mt-6 border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs font-mono text-text-secondary shrink-0">
                Direct:{" "}
                <a href={`mailto:${site.email}`} className="text-[#00E5FF] font-bold">
                  {site.email}
                </a>
              </p>
              <div className="flex items-center flex-nowrap gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all"
                  >
                    {social.icon ? (
                      (() => {
                        const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
                        return <Icon className="w-3.5 h-3.5" />;
                      })()
                    ) : (
                      <span className="text-[10px] font-mono">{social.label}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Gemini Chatbot Console */}
        <Chatbot />
      </div>
    </Section>
  );
};

export default ContactSection;
