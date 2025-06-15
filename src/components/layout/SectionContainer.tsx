import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";

type SectionContainerProps = {
  containerClassName?: string;
  minFullscreen?: "withOffset" | "withoutOffset";
};

export const SectionContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & SectionContainerProps
>(({ className, children, containerClassName, ...props }, ref) => {
  return (
    <div className={cn("relative h-full", containerClassName)}>
      <section
        ref={ref}
        className={cn(
          "container mx-auto flex flex-col px-4 lg:max-w-screen-lg",
          props.minFullscreen === "withOffset" &&
            "flex min-h-[calc(100svh-64px)] w-full flex-col",
          props.minFullscreen === "withoutOffset" &&
            "flex min-h-svh w-full flex-col",
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
