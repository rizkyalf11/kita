import React, { forwardRef } from "react";
import { cn } from "~/lib/utils";
import { HeadMetaData } from "./HeadMetaData";

type PageContainerProps = {
  withFooter?: boolean;
};

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PageContainerProps
>(({ className, children, withFooter, ...props }, ref) => {
  return (
    <div className="h-full w-full">
      <HeadMetaData />
      <main ref={ref} className={cn("flex flex-col", className)} {...props}>
        {children}
      </main>
      {withFooter && (
        <footer className="flex min-h-16 border-t-2 p-4">
          <p className="text-muted-foreground w-full text-center">
            Made With 💖 by Alfi
          </p>
        </footer>
      )}
    </div>
  );
});

PageContainer.displayName = "PageContainer";
