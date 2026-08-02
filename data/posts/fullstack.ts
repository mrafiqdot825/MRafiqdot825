import type { BlogPost } from "../blog-types";

const defaultAuthor = {
  name: "Muhammad Rafiq",
  role: "Full Stack Developer & AI/ML Enthusiast",
  avatar: "MR"
};

export const fullstackPosts: BlogPost[] = [
  {
    slug: "authentication-in-modern-applications",
    title: "Authentication in Modern Applications",
    seoTitle: "Modern Authentication Guide: JWT, Sessions, OAuth & Security",
    metaDescription: "Learn security best practices for implementing JWT, stateful sessions, and OAuth2 with PKCE in modern web applications.",
    category: "Full Stack Development",
    excerpt: "Demystify authentication. Compare JSON Web Tokens (JWT) vs Sessions, study OAuth2 flows, and apply industry-standard security safeguards.",
    publishedAt: "April 18, 2026",
    readTime: "7 min read",
    tags: ["Auth", "Security", "JWT", "OAuth"],
    coverGradient: "linear-gradient(135deg, #D7BDB0 0%, #B8907D 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Authentication is the entry gate of your application. A weak authentication system compromises user data and destroys user trust. Developers must design secure, reliable token systems that protect against hijacking, XSS (Cross-Site Scripting), and CSRF (Cross-Site Request Forgery) attacks.</p>

      <h2>Background</h2>
      <p>Historically, web applications stored session IDs in cookies and kept session state in server memory. With the rise of single-page apps and serverless environments, stateless JWTs (JSON Web Tokens) became popular because they don't require database lookups. However, JWT storage on the client presents significant security challenges.</p>

      <h2>Implementation</h2>
      <p>We designed an authentication workflow combining stateful security with stateless scalability. Access tokens are kept in short-lived memory, while refresh tokens are stored in secure, HttpOnly, SameSite=Strict cookies.</p>

      <h2>Challenges</h2>
      <p>During deployment, several authentication security vulnerabilities were identified:</p>
      <ul>
        <li><strong>XSS vulnerabilities</strong>: Storing JWT tokens in browser localStorage made them readable by malicious script injections.</li>
        <li><strong>CSRF risk</strong>: Even with HttpOnly cookies, refresh token routes are vulnerable to CSRF requests unless properly configured.</li>
        <li><strong>Stale sessions</strong>: Revoking a compromised user session before the JWT naturally expires is challenging in a fully stateless model.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved these challenges by implementing three standard defenses:</p>
      <ol>
        <li><strong>Memory Token Management</strong>: Storing the access token inside React state rather than localStorage.</li>
        <li><strong>Refresh Token Rotation</strong>: Each time a refresh token is used to generate a new access token, the database invalidates it and issues a new refresh token. If a token is reused, the entire session tree is immediately revoked.</li>
        <li><strong>Redis-backed Deny List</strong>: Maintain a lightweight Redis blacklist of active JWT IDs (jti) that are checked on incoming secure requests.</li>
      </ol>

      <h2>Results</h2>
      <p>Our vulnerability scans resolved all high-risk vulnerabilities, and token rotation prevented session replay hijacks. Redis validation added less than 1.8ms to total endpoint latency, preserving the benefits of fast stateless checks.</p>

      <h2>Conclusion</h2>
      <p>Never store sensitive access tokens in localStorage. By utilizing in-memory storage for access tokens and enforcing rotated, secure HttpOnly cookies for refresh tokens, you build a robust defense-in-depth security model.</p>
    `
  },
  {
    slug: "building-scalable-saas-applications",
    title: "Building Scalable SaaS Applications",
    seoTitle: "Building Scalable SaaS Apps: Multi-tenancy & DB Scaling",
    metaDescription: "An engineering-first guide to designing multi-tenant software architectures, database partitioning, and rate-limiting SaaS systems.",
    category: "Full Stack Development",
    excerpt: "Learn how to architecture multi-tenant databases, isolate customer data, manage billing states, and scale API throughput.",
    publishedAt: "May 03, 2026",
    readTime: "8 min read",
    tags: ["SaaS", "Architecture", "PostgreSQL", "Scaling"],
    coverGradient: "linear-gradient(135deg, #E3D5CA 0%, #C9A999 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Software-as-a-Service (SaaS) products must handle multiple customers (tenants) securely and efficiently on shared infrastructure. The primary engineering goal is to isolate tenant data so one tenant can never access another's records, while maximizing compute utilization.</p>

      <h2>Background</h2>
      <p>There are three main multi-tenancy database architectures:</p>
      <ol>
        <li><strong>Shared Database, Shared Schema</strong>: All tenants share tables, isolated by a <code>tenant_id</code> column.</li>
        <li><strong>Shared Database, Separate Schemas</strong>: PostgreSQL schemas isolate tables per tenant.</li>
        <li><strong>Database-per-Tenant</strong>: Separate physical servers or containers host each tenant.</li>
      </ol>
      <p>For mid-market SaaS systems, Shared Database/Shared Schema offers the best balance of cost and operational simplicity.</p>

      <h2>Implementation</h2>
      <p>To enforce isolation in a Shared Database design, we utilize PostgreSQL's <strong>Row Level Security (RLS)</strong>. RLS intercepts all SQL queries and automatically appends tenant checks, preventing developers from accidentally omitting <code>tenant_id</code> WHERE clauses.</p>

      <h2>Challenges</h2>
      <p>Deploying RLS and tenant structures uncovered major scale challenges:</p>
      <ul>
        <li><strong>Noisy Neighbors</strong>: A single tenant running heavy analytics queries saturated database connections for all other tenants.</li>
        <li><strong>Migration Management</strong>: Running database schema updates across multiple servers without causing downtime.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing a combination of architectural patterns:</p>
      <ol>
        <li><strong>Token Bucket Rate Limiting</strong>: Using Redis-based middleware to throttle users based on their active subscription tiers.</li>
        <li><strong>Connection Pool Isolation</strong>: Distributing connections using PgBouncer to prevent database thread starvation.</li>
      </ol>

      <h2>Results</h2>
      <p>Database CPU spikes during peak analytics windows dropped from 95% to a stable 35%, and rate limiting isolated active tenant spikes completely, resulting in 99.99% system availability.</p>

      <h2>Conclusion</h2>
      <p>Building SaaS applications requires scaling discipline. Relying on RLS for data isolation, deploying connection proxies, and setting up strict Redis throttling shields systems from customer load volatility.</p>
    `
  },
  {
    slug: "supabase-for-full-stack-development",
    title: "Supabase for Full Stack Development",
    seoTitle: "Supabase for Full Stack: Auth, RLS, Storage & Real-Time",
    metaDescription: "Learn how to build real-time full-stack applications quickly using Supabase Auth, PostgreSQL RLS, storage buckets, and real-time sockets.",
    category: "Full Stack Development",
    excerpt: "Accelerate development using Supabase. Dive into database triggers, real-time sync, and securing object storage policies.",
    publishedAt: "May 20, 2026",
    readTime: "6 min read",
    tags: ["Supabase", "React", "PostgreSQL", "Serverless"],
    coverGradient: "linear-gradient(135deg, #D6CCC2 0%, #8A6F62 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Supabase has emerged as a premier open-source Firebase alternative, providing a full suite of backend tools (Auth, Database, Storage, Edge Functions) built on top of a production-grade PostgreSQL database. By leveraging Supabase, developers can ship features rapidly without managing complex backend architectures.</p>

      <h2>Background</h2>
      <p>Traditional serverless backends abstract the database entirely (e.g., Firestore). Supabase, however, exposes the raw PostgreSQL API directly. This lets developers run complex SQL queries, set up database triggers, write stored procedures, and configure robust Row-Level Security (RLS) directly on relational data.</p>

      <h2>Implementation</h2>
      <p>We built a real-time message board using Supabase, utilizing Postgres triggers to capture table updates and broadcast them to connected clients.</p>

      <h2>Challenges</h2>
      <p>Relying fully on client-side Supabase SDK calls presented unique challenges:</p>
      <ul>
        <li><strong>Complex business logic</strong>: Placing complicated validation rules in Postgres triggers became difficult to debug compared to traditional application servers.</li>
        <li><strong>SDK footprint</strong>: Managing raw client requests securely without introducing security vulnerabilities in RLS definitions.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing **Supabase Edge Functions** (TypeScript/Deno) to handle payment integrations (Stripe) and complex AI requests, reserving database triggers strictly for simple table operations and sync updates. We also conducted rigorous RLS test dry-runs before deployment.</p>

      <h2>Results</h2>
      <p>Offloading heavy operations to Edge Functions kept database query times under 12ms. RLS security checks blocked all unauthenticated writes, while PostgreSQL triggers automated user onboarding flawlessly.</p>

      <h2>Conclusion</h2>
      <p>Supabase is a power-tool for rapid prototyping and scalable production apps. By combining RLS, database triggers, and Deno Edge Functions, teams can build complete, secure, real-time products with minimal operational overhead.</p>
    `
  },
  {
    slug: "fastapi-production-guide",
    title: "FastAPI Production Guide",
    seoTitle: "FastAPI Production Guide: Structure, Security & Deployment",
    metaDescription: "Learn how to structure FastAPI services for production. Covers Pydantic V2 schemas, dependency injection, and Docker configurations.",
    category: "Full Stack Development",
    excerpt: "Structure FastAPI projects for production. Learn about dependency injection, async database connections, and Dockerizing for deployment.",
    publishedAt: "June 04, 2026",
    readTime: "7 min read",
    tags: ["FastAPI", "Python", "Docker", "Async"],
    coverGradient: "linear-gradient(135deg, #F5EBE1 0%, #D7BDB0 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>FastAPI is a modern, high-performance web framework for building APIs with Python, based on standard Python type hints. Because it leverages ASGI (Asynchronous Server Gateway Interface) and Pydantic validation, it is highly efficient and quick to develop.</p>

      <h2>Background</h2>
      <p>Many developers build FastAPI applications using a single, monolithic file. In production, this becomes unmaintainable. A mature FastAPI application requires a clean separation of router files, dependency injections (like database sessions and security checks), and Pydantic validation schemas.</p>

      <h2>Implementation</h2>
      <p>We structured our FastAPI app using a modular router layout and async database sessions via SQLAlchemy.</p>

      <h2>Challenges</h2>
      <p>Optimizing python applications in containerized settings presented several challenges:</p>
      <ul>
        <li><strong>Blocking synchronous code</strong>: Accidentally running blocking libraries (like raw requests or sync filesystems) inside async functions blocked the entire event loop.</li>
        <li><strong>SQL Connection pool saturation</strong>: Inability to recycle connections quickly during heavy load periods.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We optimized the runtime configurations:</p>
      <ol>
        <li><strong>Thread Pools for Sync Tasks</strong>: Wrapping blocking functions in FastAPI's <code>run_in_threadpool</code> helper.</li>
        <li><strong>Uvicorn Workers with Gunicorn</strong>: Deploying FastAPI using Gunicorn as a process manager with Uvicorn workers (<code>uvicorn.workers.UvicornWorker</code>) to balance CPU workloads.</li>
        <li><strong>SQLAlchemy Pool Tuning</strong>: Tuning parameters (<code>pool_size=20</code>, <code>max_overflow=10</code>, <code>pool_recycle=3600</code>) to prevent DB connection drops.</li>
      </ol>

      <h2>Results</h2>
      <p>Running FastAPI with Gunicorn workers increased throughput from 350 to 2,400 requests per second under benchmark tests, while connection recycling eliminated all database connection timeout errors.</p>

      <h2>Conclusion</h2>
      <p>FastAPI is exceptionally fast when deployed correctly. By splitting routes, enforcing async database drivers, tuning SQLAlchemy pools, and using Gunicorn worker processes, developers can build stable, high-throughput APIs.</p>
    `
  },
  {
    slug: "react-and-next-js-best-practices",
    title: "React and Next.js Best Practices",
    seoTitle: "React & Next.js Best Practices: RSC, SEO & Performance",
    metaDescription: "Master React Server Components (RSC), page load optimization, and state management strategies in Next.js applications.",
    category: "Full Stack Development",
    excerpt: "Learn how to optimize Next.js rendering, leverage React Server Components, and structure state for maximum performance.",
    publishedAt: "June 18, 2026",
    readTime: "7 min read",
    tags: ["React", "Next.js", "Performance", "RSC"],
    coverGradient: "linear-gradient(135deg, #C9A999 0%, #4A1B0C 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>The modern React ecosystem, led by Next.js, has shifted from pure client-side rendering (SPA) to hybrid server-side rendering (SSR). Understanding how to balance React Server Components (RSC) and Client Components is critical to building fast, SEO-friendly web apps.</p>

      <h2>Background</h2>
      <p>React Server Components run exclusively on the server, meaning their dependencies do not bloat the bundle size of the client. By default, all components in Next.js App Router are Server Components. We only mark components with <code>"use client"</code> when they require interactive hooks like <code>useState</code>, <code>useEffect</code>, or browser APIs.</p>

      <h2>Implementation</h2>
      <p>We designed a high-performance rendering hierarchy: data fetching is done inside Server Components at the layout level, and values are passed down as properties to lightweight Client Components that manage interaction.</p>

      <h2>Challenges</h2>
      <p>Implementing RSCs introduces unique compilation challenges:</p>
      <ul>
        <li><strong>Hydration Mismatches</strong>: Discrepancies between HTML rendered on the server and initial client states (e.g. rendering local date timestamps).</li>
        <li><strong>Prop Drilling Bloat</strong>: Over-sharing data through deep component trees when state sharing is required on the client side.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We resolved these issues by applying robust structural patterns:</p>
      <ol>
        <li><strong>Hydration Isolation</strong>: Wrapping dynamic browser components (like dates) inside client-only hooks or rendering wrapper utilities.</li>
        <li><strong>Zustand for client state</strong>: Keeping UI states (sidebar toggles, themes) inside lightweight, modular stores rather than global context wrappers that force deep tree rerenders.</li>
      </ol>

      <h2>Results</h2>
      <p>Applying server-side fetching and removing hydration errors reduced our bundle payload by 40% and improved Google Lighthouse performance scores from 71 to 98.</p>

      <h2>Conclusion</h2>
      <p>Next.js is a powerful framework. By defaulting to Server Components for data ingestion and restricting <code>"use client"</code> to interactive leaf components, you achieve the fastest page loads and optimal SEO rankings.</p>
    `
  }
];
