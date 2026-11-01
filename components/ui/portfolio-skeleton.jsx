'use client';

import { Skeleton } from '@/components/ui/skeleton';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';

export default function PortfolioSkeleton() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#EDEDED] overflow-x-hidden pt-28">
      <FloatingCapsuleNav />

      {/* Hero Header Skeleton */}
      <section className="relative px-4 pt-16 pb-12 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Badge Pill */}
        <Skeleton className="h-7 w-64 rounded-full mb-6" />

        {/* Display Title Skeleton */}
        <Skeleton className="h-12 sm:h-16 md:h-20 w-3/4 max-w-2xl rounded-2xl mb-4" />

        {/* Subtitle Skeleton */}
        <div className="space-y-2.5 max-w-2xl w-full flex flex-col items-center mt-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>

        {/* Category Filter Pills Skeleton */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 sm:w-28 rounded-full" />
          ))}
        </div>
      </section>

      {/* 3-Column Media Gallery Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden border border-white/10 bg-[#0C1017]/85 backdrop-blur-xl shadow-xl shadow-black/80 flex flex-col justify-between"
            >
              {/* Media Thumbnail Container Skeleton */}
              <div className="relative aspect-video w-full bg-[#080B10] overflow-hidden">
                <Skeleton className="w-full h-full rounded-none border-0" />

                {/* Simulated Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-14 h-14 rounded-full bg-white/10 border border-white/10" />
                </div>

                {/* Simulated Aspect Ratio Tag */}
                <div className="absolute top-3 left-3">
                  <Skeleton className="h-5 w-12 rounded-md bg-black/60 border border-white/10" />
                </div>

                {/* Simulated Duration Tag */}
                <div className="absolute bottom-3 right-3">
                  <Skeleton className="h-5 w-14 rounded-md bg-black/60 border border-white/10" />
                </div>
              </div>

              {/* Card Info Footer Skeleton */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  {/* Category Pill Tag */}
                  <Skeleton className="h-3 w-24 rounded" />

                  {/* Title */}
                  <Skeleton className="h-6 w-5/6 rounded-lg" />

                  {/* Description lines */}
                  <div className="space-y-1.5 pt-1">
                    <Skeleton className="h-3.5 w-full rounded" />
                    <Skeleton className="h-3.5 w-4/5 rounded" />
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Custom Production Callout Skeleton */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0C1017]/80 backdrop-blur-xl text-center flex flex-col items-center space-y-4">
          <Skeleton className="h-8 sm:h-10 w-2/3 max-w-md rounded-xl" />
          <Skeleton className="h-4 w-4/5 max-w-lg rounded-md" />
          <Skeleton className="h-11 w-52 rounded-full mt-2" />
        </div>
      </section>
    </div>
  );
}
