import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center bg-bg-page px-6">
      <section className="w-full max-w-xl rounded-[20px] border border-border-default bg-bg-surface p-8 text-center shadow-sm">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
          404
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-text-secondary">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-7 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-body text-sm font-medium transition-all duration-200 ease-out bg-accent-600 text-text-primary rounded-[12px] px-6 py-3 hover:bg-accent-700 active:bg-accent-800"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
