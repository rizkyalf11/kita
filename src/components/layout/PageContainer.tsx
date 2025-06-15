import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";
import { HeadMetaData } from "./HeadMetaData";

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className="h-full w-full">
      <HeadMetaData />
      <main ref={ref} className={cn("flex flex-col", className)} {...props}>
        {children}
      </main>
    </div>
  );
});

PageContainer.displayName = "PageContainer";
