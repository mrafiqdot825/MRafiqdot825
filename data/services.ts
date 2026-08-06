import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "ai-apps",
    title: "AI Applications",
    subtitle: "Generative AI, Prompt Engineering & LLM Integrations",
    description: "Architecting custom AI applications powered by Gemini, OpenAI, and LangChain. Integrating Retrieval-Augmented Generation (RAG) pipelines, system prompt optimization, and real-time LLM features into production software.",
    iconName: "AppleCpu",
    techStack: ["Gemini API", "OpenAI GPT-4", "LangChain", "Vector DBs", "RAG Pipelines", "TypeScript", "Python"],
    benefits: [
      "Context-aware RAG pipelines using domain-specific documents",
      "Safe prompt engineering and injection mitigation protocols",
      "Autonomous resume analysis and structured data extraction",
      "Real-time voice dialogue and multimodal AI features"
    ],
    metrics: [
      { label: "Reduction in Data Processing Time", value: "60%" },
      { label: "User Interaction Engagement Boost", value: "3.5x" }
    ],
    faqs: [
      {
        question: "How do you ensure AI applications don't hallucinate?",
        answer: "I enforce context boundaries using Retrieval-Augmented Generation (RAG), strict system prompts, and output validation layers that reject unauthorized responses."
      },
      {
        question: "What LLM frameworks do you specialize in?",
        answer: "I specialize in Google Gemini (Flash & Pro), OpenAI models, LangChain agent orchestration, and Pinecone/Qdrant vector databases."
      }
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    subtitle: "Scalable Next.js App Router & React Architectures",
    description: "Deploying blazingly fast, SEO-optimized, and pixel-perfect web applications built to scale. From dynamic frontend architectures using React/Next.js to robust server ecosystems in Node.js, Express, and FastAPI.",
    iconName: "AppleSparkles",
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
        answer: "Next.js offers superior server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR) out-of-the-box, ensuring near-zero latency."
      },
      {
        question: "Can you build custom REST and GraphQL APIs?",
        answer: "Yes, I architect scalable backend microservices using Node.js/Express and Python/FastAPI with JWT authentication and Redis caching."
      }
    ]
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    subtitle: "Seamless React Native & Expo Apps for iOS & Android",
    description: "Developing native-quality, high-performance iOS and Android mobile applications from a single TypeScript codebase. Leveraging Expo for rapid feature cycles and NativeWind for sleek UI.",
    iconName: "AppleDevice",
    techStack: ["React Native", "Expo", "NativeWind", "TypeScript", "Redux Toolkit"],
    benefits: [
      "Unified codebase for 50% faster time-to-market",
      "Fluid 60fps animations and micro-interactions",
      "Offline-first data persistence and local storage configurations",
      "Direct file system utility management (sharing, PDF generation)"
    ],
    metrics: [
      { label: "Savings on Development Costs", value: "50%" },
      { label: "Unified Feature Launch Parity", value: "100%" }
    ],
    faqs: [
      {
        question: "Why choose React Native and Expo over native Swift or Kotlin?",
        answer: "React Native and Expo allow us to deploy to both Apple App Store and Google Play Store simultaneously from a single codebase, halving development timelines."
      },
      {
        question: "Do your mobile apps support offline functionality?",
        answer: "Yes, I design apps with local database persistence and caching mechanisms so users can access core features offline."
      }
    ]
  },
  {
    id: "cloud-infra",
    title: "Cloud Infrastructure",
    subtitle: "Docker Containerization, AWS Microservices & DevOps",
    description: "Bridging the gap between development and cloud operations. Building containerized infrastructure deployments, automating deployment pipelines, and managing cloud environments.",
    iconName: "AppleServerIcon",
    techStack: ["Docker", "AWS (EC2/S3/ECS)", "Vercel", "GitHub Actions", "Nginx", "Linux"],
    benefits: [
      "Zero-downtime deployment pipelines via Docker containerization",
      "Automated SSL certificates, domain management & CDN caching",
      "Scalable cloud architecture handling high user traffic spikes",
      "Environment isolation for staging and production parity"
    ],
    metrics: [
      { label: "Deployment Failure Rate Reduction", value: "80%" },
      { label: "Server Response Latency", value: "< 100ms" }
    ],
    faqs: [
      {
        question: "How do you handle cloud deployments?",
        answer: "I containerize applications with Docker and deploy them to cloud platforms like Vercel or AWS with automated CI/CD pipelines via GitHub Actions."
      }
    ]
  },
  {
    id: "api-dev",
    title: "API Development",
    subtitle: "High-Performance REST & GraphQL Backend Services",
    description: "Designing robust, secure, and well-documented RESTful and GraphQL backend microservices. Built with Node.js, Express, and FastAPI, featuring JWT authentication, rate-limiting, and Redis caching.",
    iconName: "AppleCode",
    techStack: ["Node.js", "Express.js", "FastAPI", "Python", "GraphQL", "PostgreSQL", "Redis"],
    benefits: [
      "Sub-50ms API query response times with Redis caching layers",
      "Secure JWT & OAuth 2.0 authentication protocols",
      "Strict Swagger/OpenAPI documentation for smooth frontend integration",
      "Automated rate-limiting and DDoS mitigation controls"
    ],
    metrics: [
      { label: "Average API Response Time", value: "< 45ms" },
      { label: "API Uptime Reliability", value: "99.95%" }
    ],
    faqs: [
      {
        question: "Which backend framework do you recommend?",
        answer: "I recommend Node.js/Express for asynchronous real-time APIs and Python/FastAPI for data-heavy or AI-integrated services."
      }
    ]
  },
  {
    id: "automation",
    title: "Automation & QA",
    subtitle: "Web Scraping Pipelines, CI/CD & Playwright Testing",
    description: "Automating repetitive workflows, data extraction, and quality assurance. Constructing Playwright end-to-end browser test suites, custom web scraping bots, and GitHub Actions CI/CD workflows.",
    iconName: "AppleZap",
    techStack: ["Playwright", "Puppeteer", "Python (BeautifulSoup/Scrapy)", "GitHub Actions", "Jest"],
    benefits: [
      "End-to-end multi-browser test coverage across Chrome, Safari & Firefox",
      "High-throughput headless web scrapers with proxy rotation",
      "Automated bug regression detection on every code commit",
      "Automated email notifications and scheduled CRON jobs"
    ],
    metrics: [
      { label: "Reduction in Manual QA Testing", value: "85%" },
      { label: "Data Extraction Efficiency", value: "10x" }
    ],
    faqs: [
      {
        question: "What tool do you use for End-to-End browser testing?",
        answer: "I use Playwright because it supports chromium, firefox, and webkit engines natively with reliable auto-waiting and headless execution."
      }
    ]
  },
  {
    id: "admin-dashboards",
    title: "Dashboards & Analytics",
    subtitle: "Real-Time Data Visualization & Admin Panels",
    description: "Engineering sleek, interactive analytics dashboards and administrative management panels. Featuring real-time charts, dynamic filters, role-based access control (RBAC), and exportable reports.",
    iconName: "AppleLayers",
    techStack: ["React.js", "Next.js", "Chart.js", "Recharts", "Tailwind CSS", "PostgreSQL"],
    benefits: [
      "Interactive data charts with live streaming WebSocket updates",
      "Role-based access control (RBAC) with secure permissions",
      "Export capabilities to PDF, CSV, and Excel spreadsheets",
      "Fully responsive glassmorphic layouts tailored for dark/light themes"
    ],
    metrics: [
      { label: "Admin Workflow Efficiency Boost", value: "40%" },
      { label: "Data Query Render Speed", value: "< 120ms" }
    ],
    faqs: [
      {
        question: "Can dashboards handle live data updates?",
        answer: "Yes, I integrate WebSockets and Server-Sent Events (SSE) so metric charts update live without manual page reloads."
      }
    ]
  },
  {
    id: "ai-agents",
    title: "AI Agents & Chatbots",
    subtitle: "Autonomous Agentic Workflows & Intelligent Conversational Bots",
    description: "Architecting custom AI agents and conversational chatbots powered by Gemini, OpenAI, and LangChain. Integrating Retrieval-Augmented Generation (RAG) to connect intelligent bots directly to your business data.",
    iconName: "AppleMessage",
    techStack: ["Gemini API", "OpenAI API", "LangChain", "Vector DBs", "RAG Pipelines", "TypeScript", "Python"],
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
      }
    ]
  }
];
