import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "web-development",
    title: "Full-Stack Web Engineering",
    subtitle: "Scalable Next.js & React Solutions",
    description: "Deploying blazingly fast, SEO-optimized, and pixel-perfect web applications built to scale. From dynamic frontend architectures using React/Next.js to robust server ecosystems in Node.js and FastAPI.",
    iconName: "AppleReactIcon",
    techStack: ["Next.js", "React.js", "TypeScript", "Node.js", "Express.js", "FastAPI", "Tailwind CSS", "MongoDB", "PostgreSQL"],
    benefits: [
      "Core Web Vitals optimized (100% PageSpeed targets)",
      "Responsive design for seamless mobile & desktop rendering",
      "Fully-glowing micro-animations and smooth page transitions",
      "Secure API endpoints with JWT authorization & database caching"
    ],
    metrics: [
      { label: "Page Load Speed Improvement", value: "55%" },
      { label: "Uptime Backend Architecture", value: "99.9%" }
    ],
    faqs: [
      {
        question: "Why do you use Next.js for web development?",
        answer: "Next.js offers superior server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR) out-of-the-box. This ensures search engines index content instantly and users experience near-zero latency."
      },
      {
        question: "Can you build custom REST and GraphQL APIs?",
        answer: "Yes, I architect scalable backend microservices using Node.js/Express and Python/FastAPI with JWT authentication, secure databases, and high-performance caching via Redis."
      }
    ]
  },
  {
    id: "ai-engineering",
    title: "AI & Agentic Systems",
    subtitle: "Advanced LLM & Workflow Integrations",
    description: "Integrating state-of-the-art cognitive capabilities directly into your software. Specializing in Google Gemini, LangChain, custom AI agents, Retrieval-Augmented Generation (RAG) pipelines, and real-time voice AI.",
    iconName: "AppleCpu",
    techStack: ["Gemini API", "OpenAI API", "LangChain", "Vapi AI", "Python", "Node.js"],
    benefits: [
      "Automated resume analysis and structured data processing",
      "Custom chatbot systems with context-rich retrieval (RAG)",
      "Safe prompt engineering and injection mitigation protocols",
      "Real-time spoken dialogue integration (Vapi AI)"
    ],
    metrics: [
      { label: "Reduction in Hiring Cycles via AI", value: "50%" },
      { label: "Customer Chat Engagement Boost", value: "3x" }
    ],
    faqs: [
      {
        question: "How do you ensure AI chatbots don't hallucinate or leak data?",
        answer: "I enforce context boundaries using Retrieval-Augmented Generation (RAG), strict prompt engineering instructions, and security validation layers that reject unauthorized requests."
      },
      {
        question: "What AI models do you have experience working with?",
        answer: "I have extensive experience with Google Gemini (Flash/Pro), OpenAI GPT models, and tool orchestration using LangChain."
      }
    ]
  },
  {
    id: "mobile-development",
    title: "Mobile App Engineering",
    subtitle: "Seamless React Native & Expo Apps",
    description: "Developing native-quality, high-performance iOS and Android mobile applications from a single TypeScript codebase. Leveraging Expo for rapid feature cycles and NativeWind for sleek styles.",
    iconName: "AppleDevice",
    techStack: ["React Native", "Expo", "NativeWind", "TypeScript", "Redux Toolkit"],
    benefits: [
      "Unified codebase for 50% faster time-to-market",
      "Fluid 60fps animations and micro-interactions",
      "Offline-first data persistence and local storage configurations",
      "Direct file system utility management (sharing, generation)"
    ],
    metrics: [
      { label: "Savings on Development Costs", value: "50%" },
      { label: "Unified Feature Launch Parity", value: "100%" }
    ],
    faqs: [
      {
        question: "Why choose React Native and Expo over native Swift or Kotlin?",
        answer: "React Native and Expo allow us to deploy to both Apple App Store and Google Play Store simultaneously from a single codebase. This halves development timelines and simplifies updates."
      },
      {
        question: "Do your mobile apps support offline functionality?",
        answer: "Yes, I design apps with local database persistence and caching mechanisms so users can access core features offline."
      }
    ]
  },
  {
    id: "devops-testing",
    title: "DevOps & Test Automation",
    subtitle: "Zero-Defect CI/CD & QA Pipelines",
    description: "Bridging the gap between development and operations. Building containerized infrastructure deployments, automating CI/CD pipelines, and establishing bulletproof automated QA systems.",
    iconName: "AppleServerIcon",
    techStack: ["Docker", "CI/CD", "GitHub Actions", "Playwright", "Jest", "Vitest"],
    benefits: [
      "85%+ test code coverage configurations using Jest and Vitest",
      "Multi-browser web automation and end-to-end testing with Playwright",
      "Seamless GitHub Actions workflows for zero-downtime releases",
      "Docker containerization for uniform local-to-production environments"
    ],
    metrics: [
      { label: "Reduction in Manual Workflow Time", value: "35%" },
      { label: "Security Vulnerabilities Prevented", value: "60%" }
    ],
    faqs: [
      {
        question: "What is your testing approach for web applications?",
        answer: "I run unit/integration tests (Jest/Vitest) to check business logic, and end-to-end browser automation (Playwright) to verify user journeys across Chromium, WebKit, and Firefox."
      },
      {
        question: "How do you automate deployments?",
        answer: "I write GitHub Actions workflows that automatically run linting, type-checks, and testing on pull requests, then build and deploy Docker containers to hosting environments."
      }
    ]
  },
  {
    id: "ai-agents-chatbots",
    title: "AI Agents & Chatbots",
    subtitle: "Autonomous Agentic Workflows & Intelligent Conversational Bots",
    description: "Architecting custom AI agents and conversational chatbots powered by Gemini, OpenAI, and LangChain. Integrating Retrieval-Augmented Generation (RAG) to connect intelligent bots directly to your business data and user workflows.",
    iconName: "AppleMessage",
    techStack: ["Gemini API", "OpenAI API", "LangChain", "Vector DBs (Pinecone/Qdrant)", "RAG Pipelines", "TypeScript", "Python"],
    benefits: [
      "24/7 automated user support and lead generation bots",
      "Context-aware RAG pipelines using domain-specific documents",
      "Multi-agent task routing and automated tool orchestration",
      "Strict safety rails preventing prompt injections and hallucinations"
    ],
    metrics: [
      { label: "Customer Support Automation", value: "70%" },
      { label: "Response Resolution Speed", value: "< 2s" }
    ],
    faqs: [
      {
        question: "What is the difference between a simple chatbot and an AI agent?",
        answer: "A simple chatbot follows rule-based responses, whereas an AI agent uses LLMs to reason, plan, select external tools, execute code, and make decisions autonomously to complete complex user requests."
      },
      {
        question: "Can these AI chatbots integrate with our existing website or database?",
        answer: "Yes! I build server-side route handlers and web components that seamlessly embed into your web app, connecting directly to your APIs, databases, or documents via RAG."
      }
    ]
  }
];
