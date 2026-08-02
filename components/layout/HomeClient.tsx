"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/feedback/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import LenisProvider from "@/components/layout/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TechStackOrbit3D from "@/components/sections/TechStackOrbit3D";
import ServicesSection3D from "@/components/sections/ServicesSection3D";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";

const HOME_LOADING_DURATION = 2400;

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, HOME_LOADING_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return <LoadingScreen title="MRafiq.dev" subtitle="Crafting high-impact digital experiences" />;
  }

  return (
    <LenisProvider>
      <CustomCursor />
      <Navbar />
      <main className="page-shell bg-offwhite text-text-primary min-h-screen relative overflow-hidden">
        <HeroSection />
        <AboutSection />
        <TechStackOrbit3D />
        <ServicesSection3D />
        <ExperienceSection />
        <ProjectsSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </LenisProvider>
  );
}
