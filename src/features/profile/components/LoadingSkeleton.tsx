import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'

const LoadingSkeleton = () => {
  return (
     <div className="mx-auto min-h-screen max-w-screen-lg bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <Skeleton className="h-6 w-24" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-6" />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-start space-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />

          <div className="flex-1">
            <div className="flex justify-around text-center">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="mb-1 h-5 w-8" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="mb-1 h-3 w-full" />
          <Skeleton className="mb-1 h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        <Skeleton className="h-8 w-full" />
      </div>

      <div className="flex border-t border-gray-100">
        <div className="flex flex-1 items-center justify-start py-3">
          <Skeleton className="h-6 w-6" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0.5 bg-gray-100">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-none border" />
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton