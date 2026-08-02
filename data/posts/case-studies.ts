import type { BlogPost } from "../blog-types";

const defaultAuthor = {
  name: "Muhammad Rafiq",
  role: "Full Stack Developer & AI/ML Enthusiast",
  avatar: "MR"
};

export const caseStudiesPosts: BlogPost[] = [
  {
    slug: "how-i-built-an-ai-resume-analyzer-nextjs-gemini",
    title: "How I Built an AI Resume Analyzer with Next.js and Gemini AI",
    seoTitle: "Building an AI Resume Analyzer with Next.js & Gemini AI Case Study",
    metaDescription: "Read the case study of building an AI resume analyzer using Next.js and Google Gemini AI, detailing architecture and AI parsing.",
    category: "Project Case Studies",
    excerpt: "Learn how I built a high-performance resume analyzer. Discover PDF text parsing techniques, Gemini prompt engineering, and candidate scoring algorithms.",
    publishedAt: "May 01, 2026",
    readTime: "8 min read",
    tags: ["Next.js", "Gemini", "AI-Evaluation", "CaseStudy"],
    coverGradient: "linear-gradient(135deg, #D7BDB0 0%, #B8907D 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Screening resumes manually is a major bottleneck in recruitment, costing hiring managers hundreds of hours per role. To address this, I built an AI Resume Analyzer that processes PDF uploads, extracts candidate profiles, evaluates qualifications against job descriptions, and outputs structured evaluations in seconds.</p>

      <h2>Background</h2>
      <p>Building a parser requires extracting text from non-standard document formats and converting it to structured data. While raw regular expressions fail on diverse layout structures, combining text extractors with Google's Gemini 1.5 Pro models allows us to convert raw text into structured JSON evaluations accurately.</p>

      <h2>Implementation</h2>
      <p>The architecture is built on a Next.js serverless app. Files are uploaded, parsed using <code>pdf-parse</code>, and sent to Gemini using structured JSON modes.</p>

      <h2>Challenges</h2>
      <p>I encountered two major challenges during implementation:</p>
      <ul>
        <li><strong>PDF Table Parsing</strong>: Traditional text extractors jumble tables together, corrupting candidate experience timelines.</li>
        <li><strong>AI Output Variety</strong>: Older LLMs failing to output consistent JSON, causing application runtime errors.</li>
      </ul>

      <h2>Solutions</h2>
      <p>I solved these problems by implementing the following:</p>
      <ol>
        <li><strong>Layout-aware Parsers</strong>: Migrated parser engines to python-based PDF extractors (like <code>PyMuPDF</code>) that extract blocks based on layout positioning.</li>
        <li><strong>Gemini Structured Schema Envelopes</strong>: Enforced strict validation schemas using Gemini SDK parameters, ensuring 100% JSON compliance.</li>
      </ol>

      <h2>Results</h2>
      <p>The analyzer processes documents in under 2.5 seconds. Enforcing structured schema outputs reduced JSON parsing errors to 0%, while grading alignment with recruiter manual grades reached a 93% match rate.</p>

      <h2>Conclusion</h2>
      <p>Combining Next.js Serverless routes with Gemini structured JSON APIs provides a powerful way to process unstructured files. Building layout-aware parsing pipelines ensures candidate data remains complete and accurate.</p>
    `
  },
  {
    slug: "building-an-ai-powered-recruitment-platform-case",
    title: "Building an AI-Powered Recruitment Platform",
    seoTitle: "Building an AI-Powered Recruitment Platform System Case Study",
    metaDescription: "Read the design case study of a complete AI-powered recruitment platform, explaining background task workers and system architectures.",
    category: "Project Case Studies",
    excerpt: "Study the design of a complete recruitment platform. Understand AI workflows, automated interview generation, and deployment configurations.",
    publishedAt: "May 14, 2026",
    readTime: "9 min read",
    tags: ["Architecture", "SystemDesign", "AI-Agents", "SaaS"],
    coverGradient: "linear-gradient(135deg, #E3D5CA 0%, #C9A999 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Recruitment platforms must serve candidates, recruiters, and interviewers. To make a platform that handles high traffic while generating custom AI interviews, we built a decoupled architecture that runs jobs in background queues and streams updates in real-time.</p>

      <h2>Background</h2>
      <p>The platform required three main workflows: resume parser pipelines, AI interview generators that write custom questions based on resumes, and code executors that run candidates' submissions safely. A traditional single-server architecture blocks threads and crashes under high usage.</p>

      <h2>Implementation</h2>
      <p>We designed the platform using separate microservices deployed on Google Cloud Run. Communication is routed through a Pub/Sub message broker. Below is an architecture diagram of our system components:</p>

      <div class="code-block-wrapper relative mb-6">
        <div class="flex items-center justify-between px-4 py-2 bg-bg-surface-hover border-t border-x border-border-default/50 rounded-t-lg">
          <span class="text-xs font-mono text-text-muted">System Architecture Overview</span>
        </div>
        <pre class="bg-bg-page border-x border-b border-border-default/50 rounded-b-lg p-4 font-mono text-sm overflow-x-auto text-text-primary"><code>[Web Frontend (Next.js)]
       │ (HTTP / WebSocket)
       ▼
[API Gateway (FastAPI)] ──► [Auth Service (Supabase)]
       │
       ├─► (Pub/Sub Event Broker)
       │         │
       │         ├─► [Resume Parser Worker] ──► [Object Storage]
       │         │
       │         └─► [Interview Gen Worker] ──► [Gemini LLM]
       │
[Candidate Sandbox (Docker Runner)]</code></pre>
      </div>

      <h2>Challenges</h2>
      <p>Building the distributed pipeline presented two major challenges:</p>
      <ul>
        <li><strong>Token usage costs</strong>: Re-generating interview questions repeatedly for candidate retries consumed high API budgets.</li>
        <li><strong>Security of code execution</strong>: Running untrusted candidate code submissions on the server.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We implemented two core solutions:</p>
      <ol>
        <li><strong>Context Caching</strong>: Leveraging Gemini Context Caching to cache base job descriptions, reducing token costs by 70% on subsequent queries.</li>
        <li><strong>gVisor Sandboxed Containers</strong>: Executing candidate code submissions in isolated, short-lived Docker containers sandboxed with Google's gVisor.</li>
      </ol>

      <h2>Results</h2>
      <p>Deploying context caching reduced our monthly API expenses from $1,200 to $340, while gVisor sandboxing blocked all unauthorized server access, keeping our runtime environment secure.</p>

      <h2>Conclusion</h2>
      <p>Building AI platforms requires architectural discipline. By isolating worker services, leveraging API context caches, and running code evaluations in sandboxed containers, developers build secure, cost-efficient platforms.</p>
    `
  },
  {
    slug: "creating-a-university-chatbot-using-rag-case",
    title: "Creating a University Chatbot Using RAG",
    seoTitle: "Creating a University Chatbot Using RAG Case Study",
    metaDescription: "Learn how I built a university chatbot using Retrieval-Augmented Generation (RAG), Pinecone, and Gemini API.",
    category: "Project Case Studies",
    excerpt: "Discover how to build a campus chatbot. Learn how to parse university documents, index embeddings in a vector database, and configure safety guardrails.",
    publishedAt: "May 29, 2026",
    readTime: "7 min read",
    tags: ["RAG", "VectorDB", "Gemini", "University-Project"],
    coverGradient: "linear-gradient(135deg, #D6CCC2 0%, #8A6F62 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>University student portals host hundreds of pages of academic calendars, course lists, and exam schedules. Students struggle to find answers quickly. I built a RAG campus chatbot that indexes academic document files and answers queries accurately in real-time.</p>

      <h2>Background</h2>
      <p>University knowledge bases are updated regularly. Fine-tuning an LLM on calendars is slow and expensive. A RAG architecture allows the chatbot to retrieve source text directly from a vector database containing parsed documents and reference them in responses.</p>

      <h2>Implementation</h2>
      <p>The knowledge base is built on a vector index (Pinecone) using text-embedding models. When a user asks a question, the backend retrieves matching documents, builds a prompt, and streams the answer using the Gemini API.</p>

      <h2>Challenges</h2>
      <p>Deploying the campus chatbot revealed two primary challenges:</p>
      <ul>
        <li><strong>Stale Data Conflicts</strong>: Old exam schedules conflicting with newer revisions in search results.</li>
        <li><strong>Safety Concerns</strong>: Handling inappropriate user queries or off-topic questions.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing two key upgrades:</p>
      <ol>
        <li><strong>Metadata Filtering</strong>: Attaching versioning and semester tags to vectors to ensure the retriever filters for the active academic year.</li>
        <li><strong>Llama Guard Evaluation</strong>: Checking incoming queries and outgoing responses against safety policies before routing them.</li>
      </ol>

      <h2>Results</h2>
      <p>Adding semester metadata filters resolved data conflicts, and guardrails successfully filtered inappropriate inputs without increasing latency.</p>

      <h2>Conclusion</h2>
      <p>Building a successful RAG chatbot requires structured document processing. By filtering vectors using metadata and verifying messages with safety checks, developers build stable assistants for users.</p>
    `
  },
  {
    slug: "building-an-ai-website-builder-case",
    title: "Building an AI Website Builder",
    seoTitle: "Building an AI Website Builder Case Study",
    metaDescription: "Read the case study of building an AI website builder, explaining LLM page schema generation and frontend JSX rendering.",
    category: "Project Case Studies",
    excerpt: "Explore how I built an AI page generator. Discover LLM JSON generation, component rendering engines, and real-time design editors.",
    publishedAt: "June 05, 2026",
    readTime: "8 min read",
    tags: ["React", "AI-Generation", "Vite", "UX-Design"],
    coverGradient: "linear-gradient(135deg, #F5EBE1 0%, #D7BDB0 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Creating personal websites is slow for non-technical users. To simplify this, I built an AI Website Builder that allows users to write simple prompts and compiles them into modern page layouts in real-time.</p>

      <h2>Background</h2>
      <p>Generating raw HTML directly from an LLM often results in broken layouts or invalid syntax. To ensure layout quality, the website builder generates a structured JSON page schema that defines sections, blocks, colors, and content, which is then rendered by pre-built React components.</p>

      <h2>Implementation</h2>
      <p>The builder uses Next.js server functions to request JSON schemas from Gemini. The client parses this schema and renders components using dynamic routing.</p>

      <h2>Challenges</h2>
      <p>Generating UI layouts using LLMs presents several design challenges:</p>
      <ul>
        <li><strong>Visual Consistency</strong>: AI selecting random color palettes that create ugly or low-contrast layouts.</li>
        <li><strong>Slow Inferences</strong>: Waiting 8-12 seconds for the model to compile page structures, causing users to abandon the page.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing rendering rules:</p>
      <ol>
        <li><strong>Design Tokens</strong>: The system maps model outputs to pre-defined colors, typography, and spacing tokens rather than letting the AI write raw styling.</li>
        <li><strong>Streaming Inferences</strong>: Streaming JSON tokens and parsing them on the client to render sections as they are generated.</li>
      </ol>

      <h2>Results</h2>
      <p>Design validation rules eliminated all low-contrast layouts. Client-side JSON parsing reduced perceived latency from 10 seconds to under 400ms, creating a smooth page generation experience.</p>

      <h2>Conclusion</h2>
      <p>AI UI generation requires strict constraints. By decoupling page structure generation from styling tokens, you build robust generators that create beautiful, accessible pages.</p>
    `
  },
  {
    slug: "designing-a-hotel-management-system-case",
    title: "Designing a Hotel Management System",
    seoTitle: "Designing a Hotel Management System: Relational Architecture",
    metaDescription: "Read the case study of designing a hotel management system. Covers booking workflows, PostgreSQL transactional isolation, and role permissions.",
    category: "Project Case Studies",
    excerpt: "Study the design of a hotel booking system. Master transactional database schemas, role authentication, and real-time room availability sync.",
    publishedAt: "June 15, 2026",
    readTime: "8 min read",
    tags: ["Databases", "SystemDesign", "SQL", "Security"],
    coverGradient: "linear-gradient(135deg, #C9A999 0%, #4A1B0C 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Booking platforms must prevent double-bookings during high traffic. I designed a Hotel Management System that manages reservations, ensures transactional isolation, and processes payments securely.</p>

      <h2>Background</h2>
      <p>If two users book the same room at the same time, database queries run concurrently. A naive database read-then-write check results in both reservations being processed, causing operational issues. Relational databases address this using database locking or transaction isolation levels.</p>

      <h2>Implementation</h2>
      <p>We structured our booking queries using PostgreSQL transaction blocks with explicit <strong>row locking (FOR UPDATE)</strong>. This blocks concurrent queries from reading the room's booking state until the active transaction completes.</p>

      <h2>Challenges</h2>
      <p>Implementing reservation locks introduced operational challenges:</p>
      <ul>
        <li><strong>Deadlocks</strong>: Concurrent database operations locking different rows in conflicting order, causing database timeouts.</li>
        <li><strong>Slow transactions</strong>: Keeping database connections locked during slow payment gateway API calls, causing connection pool exhaustion.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing database patterns:</p>
      <ol>
        <li><strong>Outbox Payment Processing</strong>: We created bookings in a pending state, released database locks immediately, and processed payments asynchronously in background tasks.</li>
        <li><strong>Order-based Queries</strong>: Enforcing strict order sorting (like <code>room_id</code> alphabetical order) in all multi-row SQL queries to prevent deadlocks.</li>
      </ol>

      <h2>Results</h2>
      <p>Releasing locks before payment processing reduced lock times from 2 seconds to under 5ms, and double-booking errors dropped to zero under high load.</p>

      <h2>Conclusion</h2>
      <p>Preventing race conditions requires transactional discipline. By using row locking, optimizing transaction scopes, and processing payments asynchronously, developers build reliable booking systems.</p>
    `
  }
];
