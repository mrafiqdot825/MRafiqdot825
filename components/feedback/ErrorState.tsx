import Link from "next/link";

type ErrorStateProps = {
  title?: string;
  description?: string;
  stack?: string;
};

const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  stack,
}: ErrorStateProps) => {
  return (
    <main className="page-shell flex min-h-screen items-center justify-center bg-bg-page px-6">
      <section className="w-full max-w-xl rounded-[16px] border border-border-default bg-bg-surface p-6 shadow-sm">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-(--color-rose-deep)">
          Error
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-text-primary">{title}</h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-body text-sm font-medium transition-all duration-200 ease-out bg-accent-600 text-text-primary rounded-[12px] px-6 py-3 hover:bg-accent-700 active:bg-accent-800"
          >
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center font-body text-sm font-medium transition-all duration-200 ease-out bg-transparent border border-border-default text-text-primary rounded-[12px] px-6 py-3 hover:border-border-hover hover:bg-bg-surface-hover active:bg-bg-surface-hover/80"
          >
            Reload Page
          </button>
        </div>

        {stack && (
          <pre className="mt-5 overflow-x-auto rounded-[12px] border border-border-default bg-bg-surface-hover p-3 font-mono text-xs text-text-secondary">
            <code>{stack}</code>
          </pre>
        )}
      </section>
    </main>
  );
};

export default ErrorState;
