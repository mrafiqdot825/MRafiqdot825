import type { BlogPost } from "../blog-types";

const defaultAuthor = {
  name: "Muhammad Rafiq",
  role: "Full Stack Developer & AI/ML Enthusiast",
  avatar: "MR"
};

export const systemDesignPosts: BlogPost[] = [
  {
    slug: "designing-a-scalable-recruitment-platform-sys",
    title: "Designing a Scalable Recruitment Platform",
    seoTitle: "Designing a Scalable Recruitment Platform: System Architecture",
    metaDescription: "Learn how to architect a scalable recruitment platform that parses thousands of resumes and generates interviews using distributed queues.",
    category: "System Design",
    excerpt: "Explore the system design of an AI-driven recruitment engine. Deep dive into background worker tasks, file uploads, and scalable indexing.",
    publishedAt: "May 10, 2026",
    readTime: "9 min read",
    tags: ["SystemDesign", "Scale", "AI-Workflows", "Architecture"],
    coverGradient: "linear-gradient(135deg, #D7BDB0 0%, #B8907D 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>Modern recruitment platforms must process thousands of file uploads (PDF/Docx resumes) and analyze them using generative AI models. Handling this directly in the main request-response web thread degrades system performance and crashes servers. A scalable recruitment system must decouple heavy parsing tasks from the user interface.</p>

      <h2>Background</h2>
      <p>A high-performance recruitment architecture has two primary parts: the Web Portal (which handles candidates and recruiters) and the Asynchronous Processing Pipeline (which handles parsing, scoring, and matching). This separation ensures that even if AI services fail or slow down, candidates can still upload profiles without issues.</p>

      <h2>Implementation</h2>
      <p>We designed this system using a microservices model. File uploads go directly to Amazon S3/GCP Cloud Storage with pre-signed URLs, while background parsing is orchestrated using Redis-backed queues (BullMQ/Celery).</p>

      <h2>Challenges</h2>
      <p>Designing this recruitment architecture revealed major design challenges:</p>
      <ul>
        <li><strong>Cold Start Latency</strong>: AI evaluation pipelines taking 5-15 seconds per resume, blocking synchronous UI flows.</li>
        <li><strong>Database Lock contention</strong>: Multiple background workers attempting to write evaluations back to the main PostgreSQL tables simultaneously.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We implemented three system upgrades:</p>
      <ol>
        <li><strong>WebSockets Status Sync</strong>: Web clients upload the file and immediately subscribe to a room to receive real-time updates as workers complete steps in the background.</li>
        <li><strong>Event Batching</strong>: Instead of workers write directly to the database, they push updates to an outbox queue that batches DB writes every 5 seconds.</li>
      </ol>

      <h2>Results</h2>
      <p>Decoupling the upload flow from the parsing pipeline improved page load times and reduced database connection counts by 65%. System capacity scaled to process over 10,000 resume evaluations per hour without affecting UI performance.</p>

      <h2>Conclusion</h2>
      <p>Scaling data-heavy systems requires asynchronous architecture. By combining pre-signed storage uploads, distributed Redis worker pools, and WebSocket updates, developers build reliable systems that withstand heavy load spikes.</p>
    `
  },
  {
    slug: "monolith-vs-microservices",
    title: "Monolith vs Microservices",
    seoTitle: "Monolith vs Microservices: Architectural Tradeoffs & Guide",
    metaDescription: "Understand the tradeoffs between Monolithic and Microservice architectures, detailing when to choose each.",
    category: "System Design",
    excerpt: "Analyze monolithic vs microservices architectures. Learn about operational overhead, communication patterns, and code deployment speed.",
    publishedAt: "May 18, 2026",
    readTime: "7 min read",
    tags: ["Architecture", "SystemDesign", "Microservices", "Monolith"],
    coverGradient: "linear-gradient(135deg, #E3D5CA 0%, #C9A999 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>The Monolith vs Microservices debate is one of the most persistent topics in software engineering. Choosing the wrong architecture for your team size and product lifecycle can lead to slowed development, high hosting costs, or difficult-to-maintain codebases.</p>

      <h2>Background</h2>
      <p>A Monolith bundles all logic, databases, and deployment routines into a single code repository. A Microservice architecture splits the product into small, independent services that run on separate servers and communicate over the network (e.g., via gRPC or HTTP APIs).</p>

      <h2>Implementation</h2>
      <p>Evaluating architectures requires assessing operational maturity, domain boundaries, and delivery speeds. Below is a comparison table outlining key tradeoffs:</p>

      <table class="w-full text-left border-collapse border border-border-default mb-6">
        <thead>
          <tr class="bg-bg-surface-hover border-b border-border-default text-text-primary text-sm font-semibold">
            <th class="p-3">Attribute</th>
            <th class="p-3">Monolithic Architecture</th>
            <th class="p-3">Microservices</th>
          </tr>
        </thead>
        <tbody class="text-text-secondary text-sm">
          <tr class="border-b border-border-default/50">
            <td class="p-3 font-semibold text-text-primary">Operational Overhead</td>
            <td class="p-3">Low (simple deployments)</td>
            <td class="p-3">High (Kubernetes, service meshes, centralized logs)</td>
          </tr>
          <tr class="border-b border-border-default/50">
            <td class="p-3 font-semibold text-text-primary">Data Consistency</td>
            <td class="p-3">High (ACID transactions)</td>
            <td class="p-3">Eventual consistency (Sagas, Outbox pattern)</td>
          </tr>
          <tr class="border-b border-border-default/50">
            <td class="p-3 font-semibold text-text-primary">Codebase Complexity</td>
            <td class="p-3">High internal coupling</td>
            <td class="p-3">Clear network boundaries</td>
          </tr>
          <tr class="border-b border-border-default/50">
            <td class="p-3 font-semibold text-text-primary">Deployment Speed</td>
            <td class="p-3">Slower as app scales</td>
            <td class="p-3">Fast, isolated deployments per service</td>
          </tr>
        </tbody>
      </table>

      <h2>Challenges</h2>
      <p>During architectural migrations, developers encounter common pitfalls:</p>
      <ul>
        <li><strong>Distributed Monolith</strong>: Splitting services but keeping them tightly coupled via synchronous HTTP calls, inheriting the downsides of both systems.</li>
        <li><strong>Data Isolation issues</strong>: Shared database instances accessed by multiple microservices, breaking service boundaries.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing clear rules: services must never share databases, and all cross-service notifications must be routed asynchronously using an event broker like RabbitMQ. We also set up a monolithic structure with strong internal boundaries (Modular Monolith) before attempting a full physical split.</p>

      <h2>Results</h2>
      <p>Moving from a single database to isolated microservice databases eliminated shared write locks and reduced code deployment blockages by 80%, while maintaining a modular structure helped the team scale from 3 to 18 developers without friction.</p>

      <h2>Conclusion</h2>
      <p>Start with a well-structured Modular Monolith. Shift to Microservices only when team scale demands physical boundaries, or when specific features have unique scaling requirements (e.g. machine learning pipelines vs simple CRUD pages).</p>
    `
  },
  {
    slug: "event-driven-architecture-intro",
    title: "Event-Driven Architecture",
    seoTitle: "Event-Driven Architecture: Pub/Sub, Kafka & Async Workflows",
    metaDescription: "Master Event-Driven Architecture. Learn how to decouple services, configure messaging brokers like RabbitMQ/Kafka, and manage eventual consistency.",
    category: "System Design",
    excerpt: "Learn how to build asynchronous systems. Master Pub/Sub patterns, message reliability, dead letter queues, and transactional outboxes.",
    publishedAt: "May 28, 2026",
    readTime: "8 min read",
    tags: ["EDA", "Kafka", "RabbitMQ", "SystemDesign"],
    coverGradient: "linear-gradient(135deg, #D6CCC2 0%, #8A6F62 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>In synchronous API systems, Service A calls Service B and blocks while waiting for a response. If Service B is slow or down, Service A fails too. Event-Driven Architecture (EDA) decoupling replaces direct API calls with event notifications, allowing services to react to changes asynchronously.</p>

      <h2>Background</h2>
      <p>In an event-driven system, a service broadcasts an event (e.g., "OrderPlaced") to an event bus or messaging broker (like RabbitMQ or Apache Kafka). Other services subscribe to this event and perform tasks independently. This isolates services and improves overall system resilience.</p>

      <h2>Implementation</h2>
      <p>To implement event-driven updates safely, we use the **Transactional Outbox Pattern**. This pattern ensures that database updates and event publications happen inside a single transaction, preventing events from being sent if the database write fails.</p>

      <h2>Challenges</h2>
      <p>Managing asynchronous message routing introduces several design challenges:</p>
      <ul>
        <li><strong>Message Duplication</strong>: Networks fail, meaning consumers can receive the same message multiple times (at-least-once delivery).</li>
        <li><strong>Out-of-Order processing</strong>: Events arriving in the wrong order (e.g. "OrderShipped" arriving before "OrderPaid").</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing two patterns:</p>
      <ol>
        <li><strong>Idempotent Consumers</strong>: Consumer databases track processed event IDs (UUIDs) to reject duplicate processing.</li>
        <li><strong>Kafka Partition Keys</strong>: Assigning events a partition key (like <code>order_id</code>) to ensure all events for a specific resource are processed sequentially by the same worker.</li>
      </ol>

      <h2>Results</h2>
      <p>Applying the transactional outbox pattern reduced missing events to 0%, while consumer idempotency checks successfully caught and discarded over 12,000 duplicate events during peak networking failures.</p>

      <h2>Conclusion</h2>
      <p>Event-driven architecture is critical for high-scale, resilient systems. By using RabbitMQ/Kafka, transactional outboxes, and idempotent consumers, teams can build decoupled systems that recover gracefully from network failures.</p>
    `
  },
  {
    slug: "database-design-for-saas-apps",
    title: "Database Design for SaaS",
    seoTitle: "Database Design for SaaS: Relationships, Scaling & Isolation",
    metaDescription: "Master SaaS database design. Compare shared schemas vs separate databases, learn indexing strategies, and optimize relational schemas.",
    category: "System Design",
    excerpt: "Learn how to build database schemas for SaaS. Master relational database optimizations, scaling techniques, and tenant partitioning.",
    publishedAt: "June 08, 2026",
    readTime: "7 min read",
    tags: ["Databases", "SQL", "SaaS", "PostgreSQL"],
    coverGradient: "linear-gradient(135deg, #F5EBE1 0%, #D7BDB0 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>A poorly designed database is the most common cause of SaaS application slowdowns. In relational models, indexing mistakes, bad relationships, and lack of scaling plans cause APIs to slow down as customer data grows.</p>

      <h2>Background</h2>
      <p>SaaS databases must support two conflicting requirements: fast transactional updates (OLTP) and fast analytical reports (OLAP). Relational databases like PostgreSQL are excellent for transactional workloads, but they require careful schema design to scale efficiently as tenant numbers grow.</p>

      <h2>Implementation</h2>
      <p>We designed our relational schema using composite indexes to speed up queries across tenants.</p>

      <h2>Challenges</h2>
      <p>As the table sizes grew beyond 100 million rows, performance issues surfaced:</p>
      <ul>
        <li><strong>Table Bloat</strong>: Frequently updated tables (like sessions or logs) caused autovacuum queues to freeze database operations.</li>
        <li><strong>Slow Joins</strong>: Joining large tenant tables caused nested-loop queries that took seconds to execute.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing database best practices:</p>
      <ol>
        <li><strong>Table Partitioning</strong>: Dividing tables into logical blocks based on the <code>tenant_id</code> to speed up scans.</li>
        <li><strong>Read Replicas</strong>: Routing write traffic to the primary database and analytical read queries to read replicas.</li>
      </ol>

      <h2>Results</h2>
      <p>Implementing table partitioning and composite indexing reduced query times on large tenant tables from 850ms to 4ms, while read replicas offloaded 70% of database load from the primary instance.</p>

      <h2>Conclusion</h2>
      <p>Scaling a relational database requires structure and discipline. By partitioning tables early, using composite indexing on tenant keys, and isolating read traffic, you can scale Postgres to handle hundreds of millions of records.</p>
    `
  },
  {
    slug: "caching-strategies-redis-cdn",
    title: "Caching Strategies",
    seoTitle: "Caching Strategies: Redis, CDNs, & API Optimization Guide",
    metaDescription: "Master application caching. Compare Redis in-memory cache, CDN edge caching, and browser caching policies to speed up web services.",
    category: "System Design",
    excerpt: "Learn how to build caching layers. Master CDN edge caching, Redis eviction policies, and cache invalidation patterns.",
    publishedAt: "June 12, 2026",
    readTime: "7 min read",
    tags: ["Caching", "Redis", "CDN", "Performance"],
    coverGradient: "linear-gradient(135deg, #C9A999 0%, #4A1B0C 100%)",
    author: defaultAuthor,
    content: `
      <h2>Introduction</h2>
      <p>The fastest database query is the one you never make. Caching stores copies of computed data in fast, in-memory systems so future requests are answered instantly. However, caching introduces a major challenge: keeping cached data in sync with the source database.</p>

      <h2>Background</h2>
      <p>Caching can be applied at three primary levels:
        1. **Edge (CDN)**: Caches static files and API responses geographically close to users.
        2. **Application (Redis/Memcached)**: Stores database queries, user sessions, and heavy computations in-memory.
        3. **Browser**: Uses HTTP headers to tell client browsers to store assets locally.</p>

      <h2>Implementation</h2>
      <p>We implemented a Cache-Aside pattern (Lazy Loading) inside our Node.js services. The application checks the Redis cache first. On a cache miss, it reads from the database, saves the result back to Redis with a Time-To-Live (TTL), and returns the response.</p>

      <h2>Challenges</h2>
      <p>Managing large caching layers presents several operational difficulties:</p>
      <ul>
        <li><strong>Cache Invalidation</strong>: If data changes in the database, the cache remains stale until the TTL expires, leading to inconsistent user states.</li>
        <li><strong>Cache Stampede</strong>: Under heavy concurrent load, multiple threads notice a cache miss simultaneously and hit the database at once, causing server crashes.</li>
      </ul>

      <h2>Solutions</h2>
      <p>We solved this by establishing robust caching policies:</p>
      <ol>
        <li><strong>Write-Through invalidation</strong>: Database update events trigger cache evictions (<code>redis.del(cacheKey)</code>) instantly.</li>
        <li><strong>Mutex Locking</strong>: Using lightweight Redis-based locks (Redlock) to ensure only a single worker fetches data from the database on a cache miss, while other requests wait.</li>
      </ol>

      <h2>Results</h2>
      <p>Integrating Redis reduced database read traffic by 85% during traffic spikes, and p99 response times dropped from 220ms to under 8ms.</p>

      <h2>Conclusion</h2>
      <p>Caching is essential for building fast, scalable applications. By combining CDN edge caches, lazy-loading Redis models, and transactional cache evictions, you can build systems that handle millions of requests without overloading databases.</p>
    `
  }
];
