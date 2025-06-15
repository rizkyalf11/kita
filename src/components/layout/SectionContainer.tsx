import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";

type SectionContainerProps = {
  containerClassName?: string;
  minFullscreen?: boolean;
};

export const SectionContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & SectionContainerProps
>(({ className, children,containerClassName, ...props }, ref) => {
  return (
    <div className={cn("relative h-full", containerClassName)}>
      <section
        ref={ref}
        className={cn(
          "container mx-auto flex flex-col px-4 lg:max-w-screen-lg",
          props.minFullscreen && "flex min-h-svh w-full flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    </div>
  );
});

SectionContainer.displayName = "SectionContainer";
