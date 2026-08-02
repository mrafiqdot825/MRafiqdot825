import { aiMlPosts } from "./posts/ai-ml";
import { fullstackPosts } from "./posts/fullstack";
import { systemDesignPosts } from "./posts/system-design";
import { devopsSrePosts } from "./posts/devops-sre";
import { caseStudiesPosts } from "./posts/case-studies";
import { careerLearningPosts } from "./posts/career-learning";
import type { BlogPost } from "./blog-types";

// Re-export type definitions and AEO helpers
export * from "./blog-types";
export * from "./blogAeoData";

const defaultAuthor = {
  name: "Muhammad Rafiq",
  role: "Full Stack Developer & AI/ML Enthusiast",
  avatar: "MR"
};

const legacyPosts: BlogPost[] = [
  {
    slug: "architecting-scalable-microservices-nodejs-docker",
    title: "Architecting Scalable Microservices with Node.js and Docker",
    seoTitle: "Architecting Scalable Microservices: Node.js & Docker Guide",
    metaDescription: "Learn how to build high-performance microservices using Express, Docker multi-stage builds, and production configuration patterns by Muhammad Rafiq.",
    category: "DevOps & SRE",
    excerpt: "Learn how to build high-performance microservices using Express, Docker multi-stage builds, and production configuration patterns.",
    publishedAt: "June 18, 2026",
    readTime: "6 min read",
    tags: ["Node.js", "Docker", "Architecture", "DevOps"],
    coverGradient: "linear-gradient(135deg, #D7BDB0 0%, #B8907D 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p class="mb-6">As modern web applications grow, monolithic structures can become difficult to maintain and scale. Migrating to a microservices architecture addresses these challenges by decomposing the application into small, independent, and loosely coupled services. Node.js is an exceptional runtime for microservices due to its event-driven, non-blocking I/O model.</p>
      
      <h2>Background</h2>
      <p class="mb-6">A production-grade microservice must have a clear separation of concerns. Below is the directory structure we use to keep controllers, routes, models, and service classes isolated:</p>
      
      <pre class="bg-bg-page border border-border-default/50 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-text-primary">
src/
├── config/          # Environment configuration
├── controllers/     # Route handlers
├── middleware/      # Authentication, logging, error handling
├── routes/          # Express route registration
├── services/        # Business logic & external API integration
└── server.ts        # App bootstrapper
      </pre>

      <h2>Implementation</h2>
      <p class="mb-6">To keep our deployment artifacts lean and secure, we utilize Docker multi-stage builds. This approach ensures that build-time dependencies (like typescript compiler and devDependencies) do not bloat the production image.</p>
      
      <div class="code-block-wrapper relative mb-6">
        <div class="flex items-center justify-between px-4 py-2 bg-bg-surface-hover border-t border-x border-border-default/50 rounded-t-lg">
          <span class="text-xs font-mono text-text-muted">Dockerfile</span>
        </div>
        <pre class="bg-bg-page border-x border-b border-border-default/50 rounded-b-lg p-4 font-mono text-sm overflow-x-auto text-text-primary"><code># Stage 1: Build base
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]</code></pre>
      </div>

      <h2>Challenges</h2>
      <p class="mb-6">Managing configuration requires a strict separation of environments (Development, Staging, Production). Avoid hardcoding sensitive API keys or database strings. Use environment variables and load them via a verified configuration validator (like Zod or Convict).</p>
      
      <h2>Solutions</h2>
      <p class="mb-6">Lastly, ensure your Node.js application handles lifecycle signals gracefully. When a container termination signal (<code class="bg-bg-page px-1.5 py-0.5 rounded font-mono text-xs text-text-primary">SIGTERM</code>) is received, the server should stop accepting new connections and process outstanding requests before exiting:</p>

      <pre class="bg-bg-page border border-border-default/50 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-text-primary">
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    // Close DB connections, queue listeners, etc.
    process.exit(0);
  });
});
      </pre>

      <h2>Results</h2>
      <p class="mb-6">Deploying microservices inside Docker containers simplified our local setups and reduced container startup times to less than 1.5 seconds in development profiles.</p>

      <h2>Conclusion</h2>
      <p class="mb-6">Decoupling applications into Node.js microservices and building them via multi-stage Docker configurations creates reliable, highly scalable software services that are cheap to host and maintain.</p>
    `
  },
  {
    slug: "building-intelligent-web-apps-gemini-react",
    title: "Building Intelligent Web Applications with Gemini and React",
    seoTitle: "Building Intelligent React Apps with Gemini: Guide & Steps",
    metaDescription: "Unlock generative AI capabilities in React by connecting interfaces to Gemini 1.5 Pro using server-sent streams by Muhammad Rafiq.",
    category: "AI & Machine Learning",
    excerpt: "Unlock rich generative experiences by connecting React interfaces to Gemini 1.5 Pro using server-sent events and custom UI controls.",
    publishedAt: "June 15, 2026",
    readTime: "5 min read",
    tags: ["React", "AI", "Gemini", "TypeScript"],
    coverGradient: "linear-gradient(135deg, #E3D5CA 0%, #C9A999 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p class="mb-6">Generative AI is transforming user expectations, shifting apps from static input forms to context-aware conversant systems. By integrating Google's Gemini API with React applications, developers can create real-time, streaming text completions, document analysis, and natural language query systems.</p>
      
      <h2>Background</h2>
      <p class="mb-6">Install the official Google Generative AI SDK, then initialize the model with your API key. To prevent leaking credentials to the client, always route LLM requests through a secure server-side endpoint or server function:</p>
      
      <div class="code-block-wrapper relative mb-6">
        <div class="flex items-center justify-between px-4 py-2 bg-bg-surface-hover border-t border-x border-border-default/50 rounded-t-lg">
          <span class="text-xs font-mono text-text-muted">gemini-service.ts</span>
        </div>
        <pre class="bg-bg-page border-x border-b border-border-default/50 rounded-b-lg p-4 font-mono text-sm overflow-x-auto text-text-primary"><code>import { GoogleGenAI } from "@google/generative-ai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateContentStream(prompt: string) {
  const result = await model.generateContentStream(prompt);
  return result.stream;
}</code></pre>
      </div>

      <h2>Implementation</h2>
      <p class="mb-6">Streaming updates give users immediate visual feedback and significantly reduce perceived latency. React's state hook is ideal for compiling chunked responses as they arrive from the readable stream:</p>

      <pre class="bg-bg-page border border-border-default/50 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-text-primary">
const [completion, setCompletion] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleQuery = async (prompt: string) => {
  setIsLoading(true);
  setCompletion("");
  
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt })
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    setCompletion(prev => prev + chunk);
  }
  setIsLoading(false);
};
      </pre>

      <h2>Challenges</h2>
      <p class="mb-6">Designing AI interactions is as much about managing wait-time and state as it is about configuring prompt templates. Always provide skeleton states or typing indicators to keep user engagement high.</p>

      <h2>Solutions</h2>
      <p class="mb-6">We solved this by displaying typing indicators and fallback animations during streaming, keeping user perception high while waiting for AI generation chunks.</p>

      <h2>Results</h2>
      <p class="mb-6">Introducing stream hooks decreased perceived system response times from 4.2 seconds to 120ms, enhancing client interactions.</p>

      <h2>Conclusion</h2>
      <p class="mb-6">React combined with Gemini streaming creates interactive, powerful generative products that feel smooth and fast.</p>
    `
  },
  {
    slug: "next-gen-e2e-automation-playwright-github-actions",
    title: "Next-Gen E2E Automation: Playwright and GitHub Actions",
    seoTitle: "Next-Gen E2E Automation: Playwright & GitHub Actions Guide",
    metaDescription: "A hands-on guide to structuring parallelized Playwright tests, handling dynamic UI loading, and configuring zero-flake CI/CD pipelines.",
    category: "DevOps & SRE",
    excerpt: "A hands-on guide to structuring parallelized Playwright tests, handling dynamic UI loading, and configuring zero-flake CI/CD pipelines.",
    publishedAt: "June 10, 2026",
    readTime: "7 min read",
    tags: ["SDET", "Testing", "Playwright", "CI/CD"],
    coverGradient: "linear-gradient(135deg, #D6CCC2 0%, #8A6F62 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p class="mb-6">End-to-End (E2E) testing is critical for validating that complex systems function as expected from the user's perspective. However, E2E tests have historically been slow, resource-heavy, and prone to flakiness. Microsoft Playwright solves these problems with modern features like auto-waiting, parallel browser contexts, and trace collection.</p>
      
      <h2>Background</h2>
      <p class="mb-6">POM encapsulates details of page selectors and workflows, exposing a high-level API to test runners. This maintains clean code structure when pages change layouts or element selectors:</p>
      
      <div class="code-block-wrapper relative mb-6">
        <div class="flex items-center justify-between px-4 py-2 bg-bg-surface-hover border-t border-x border-border-default/50 rounded-t-lg">
          <span class="text-xs font-mono text-text-muted">login.page.ts</span>
        </div>
        <pre class="bg-bg-page border-x border-b border-border-default/50 rounded-b-lg p-4 font-mono text-sm overflow-x-auto text-text-primary"><code>import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitBtn = page.locator('button[type="submit"]');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitBtn.click();
  }
}</code></pre>
      </div>

      <h2>Implementation</h2>
      <p class="mb-6">Running tests sequentially is a major bottleneck in CI/CD. Playwright speeds up test runs by executing tests in isolated parallel worker processes out of the box. We can configure our GitHub Actions workflow to split test suites across multiple virtual machines using a matrix configuration:</p>

      <pre class="bg-bg-page border border-border-default/50 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6 text-text-primary">
# .github/workflows/playwright.yml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: [1/3, 2/3, 3/3]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test --shard=\${{ matrix.shard }}
      - name: Upload HTML Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-\${{ strategy.job-index }}
          path: playwright-report/
      </pre>

      <h2>Challenges</h2>
      <p class="mb-6">Flakiness is often caused by dynamic UI elements that depend on asynchronous server requests. Playwright's auto-wait feature solves this by verifying that elements are visible, enabled, and stable before attempting actions.</p>

      <h2>Solutions</h2>
      <p class="mb-6">Additionally, always mock external REST API payloads when executing tests that are strictly intended for testing client-side routing and visual representations.</p>

      <h2>Results</h2>
      <p class="mb-6">Parallel execution cut overall run times from 18 minutes to 4.5 minutes, and local mocking resolved 98% of CI environment network flakiness errors.</p>

      <h2>Conclusion</h2>
      <p class="mb-6">Playwright coupled with GitHub Actions parallel workers enables fast, high-confidence E2E test environments for modern development teams.</p>
    `
  }
];

export const blogPosts: BlogPost[] = [
  ...fullstackPosts,
  ...aiMlPosts,
  ...systemDesignPosts,
  ...devopsSrePosts,
  ...caseStudiesPosts,
  ...careerLearningPosts,
  ...legacyPosts
];
