import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: string | ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
};

const Section = ({
  id,
  title,
  description,
  children,
  className,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn("section-reveal relative pt-1 pb-0 md:pt-0 md:pb-0", className)}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-border-default" />
      <Container className="relative">
        {(title || description) && (
          <header className="mb-6 max-w-3xl md:mb-6">
            {title && (
              <h2 className="flex items-center gap-3 font-heading text-h2 font-bold tracking-tight text-text-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 max-w-2xl font-body text-body text-text-primary font-medium leading-relaxed">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
