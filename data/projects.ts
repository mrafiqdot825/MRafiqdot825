import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "skillflow",
    title: "SkillFlow: Reusable AI Agent Skills",
    status: "Open Source",
    summary:
      "A production-ready open-source repository containing reusable AI engineering skills for coding agents, standardizing tasks like testing, security audits, performance, and prompt engineering.",
    tech: [
      "AI Agents",
      "Node.js",
      "CI/CD",
    ],
    imageAlt: "SkillFlow AI Agent Skills framework preview",
    liveUrl: "https://github.com/mrafiqdot825/SkillFlow",
    featured: true,
    thumbnail: "/thumbnails/SkillFlow.png",
  },
  {
    id: "jobpsych",
    title: "JobPsych: AI-Powered Career Intelligence Platform",
    status: "Live",
    summary:
      "An enterprise-grade AI career intelligence platform utilizing Google Gemini LLM API to automate tailored resume analysis, cover letter generation, and interactive interview simulations.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Express.js",
      "FastAPI",
    ],
    imageAlt: "JobPsych platform preview",
    liveUrl: "https://jobpsych.vercel.app/",
    featured: true,
    thumbnail: "/thumbnails/JobPsych.jpeg",
  },
  {
    id: "hiredesk",
    title: "HireDesk: AI-Powered Recruitment Platform",
    status: "Live",
    summary:
      "A next-generation AI-powered recruitment platform designed to parse candidates, analyze alignment to job descriptions, and streamline interview loops, reducing hiring cycles by 50%.",
    tech: [
      "React",
      "TailwindCSS",
      "FastAPI",
      "Express.js",
      "NeonDB"
    ],
    imageAlt: "HireDesk platform preview",
    liveUrl: "https://hiredesk.vercel.app/",
    featured: true,
    thumbnail: "/thumbnails/HireDesk.jpeg",
  },
  {
    id: "readora",
    title: "Readora: AI Voice-Powered Smart Library",
    status: "Live",
    summary:
      "A smart digital library utilizing Next.js, Radix UI, and AI voice integrations (Vapi AI) to transform static PDFs into interactive, spoken-dialogue learning sessions.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "MongoDB",
      "VAPI",
    ],
    imageAlt: "Readora smart library preview",
    liveUrl: "https://readora-ai.vercel.app/",
    featured: true,
    thumbnail: "/thumbnails/Readora.png",
  },
  {
    id: "codify",
    title: "Codify: AI Code Review Agent",
    status: "Live",
    summary:
      "An AI-driven code analysis and review agent leveraging LangChain and Node.js to evaluate repository quality, safety vulnerabilities, and maintainability with chat-assisted feedback.",
    tech: [
      "React",
      "Tailwind CSS",
      "Express.js",
      "LangChain",
    ],
    imageAlt: "Codify AI code review platform preview",
    liveUrl: "https://codify-omega.vercel.app/",
    featured: true,
    thumbnail: "/thumbnails/Codify.png",
  },
  {
    id: "hisabkitab",
    title: "HisabKitab: Personal Budget Tracker",
    status: "APK Available",
    summary:
      "A cross-platform personal finance mobile application built with React Native and Expo, incorporating local data persistence and dynamic visual charts for real-time spending insights.",
    tech: [
      "React Native",
      "Expo",
      "NativeWind",
    ],
    imageAlt: "HisabKitab mobile app preview",
    liveUrl:
      "#",
    featured: true,
    thumbnail: "/thumbnails/HisabKitab.png",
  },
  {
    id: "qrify",
    title: "QRify: Modern QR Code Generator",
    status: "APK Available",
    summary:
      "A sleek mobile QR code utility utilizing Expo and React Native Reanimated, enabling dynamic QR code generation, sharing, and file system management with micro-interactions.",
    tech: [
      "React Native",
      "Expo",
      "NativeWind",
    ],
    imageAlt: "QRify QR code generator app preview",
    liveUrl:
      "#",
    featured: true,
    thumbnail: "/thumbnails/QRify.png",
  },

];

