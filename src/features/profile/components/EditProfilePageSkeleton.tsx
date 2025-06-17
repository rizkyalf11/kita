import React from "react";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

const EditProfilePageSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-4 p-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-2 w-24 rounded-full" />
      </div>

      <Separator className="mb-4 lg:mb-6" />

      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-44 rounded-full" />
          <Skeleton className="h-10 w-full rounded-full" />
          <Skeleton className="h-3 w-32 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-44 rounded-full" />
          <Skeleton className="h-10 w-full rounded-full" />
          <Skeleton className="h-3 w-32 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-44 rounded-full" />
          <Skeleton className="h-30 w-full rounded-full" />
          <Skeleton className="h-3 w-32 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
};

export default EditProfilePageSkeleton;
