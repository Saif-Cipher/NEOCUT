'use client';

import { Skeleton } from '@/components/ui/skeleton';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';

/**
 * ServicesSkeleton: Matches the 5-capability deep-dive matrix layout.
 */
export function ServicesSkeleton() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#FFFFFF] overflow-x-hidden pt-28">
      <FloatingCapsuleNav />

      {/* Hero Header */}
      <section className="relative px-4 pt-16 pb-20 max-w-7xl mx-auto text-center flex flex-col items-center">
        <Skeleton className="h-7 w-72 rounded-full mb-6" />
        <Skeleton className="h-14 sm:h-20 w-4/5 max-w-3xl rounded-2xl mb-4" />
        <div className="space-y-2.5 max-w-2xl w-full flex flex-col items-center mt-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
      </section>

      {/* Deep Dive Service Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-16">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="p-8 sm:p-12 rounded-3xl border border-[#26407F]/50 bg-[#0D1B3E]/85 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-px w-8 rounded" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
                <Skeleton className="h-10 sm:h-12 w-4/5 rounded-xl" />
                <Skeleton className="h-4 w-3/5 rounded" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-11/12 rounded" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                </div>
                {/* Capabilities checkmarks */}
                <div className="pt-4 border-t border-[#162A5C] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[1, 2, 3, 4].map((c) => (
                    <Skeleton key={c} className="h-6 w-full rounded-lg" />
                  ))}
                </div>
              </div>

              {/* Right Column (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#050B1F]/90 border border-[#26407F]/40 space-y-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-28 rounded" />
                  {[1, 2, 3, 4].map((d) => (
                    <Skeleton key={d} className="h-4 w-4/5 rounded" />
                  ))}
                </div>
                <div className="pt-2 flex gap-3">
                  <Skeleton className="h-10 w-28 rounded-full" />
                  <Skeleton className="h-10 w-32 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

/**
 * AboutSkeleton: Matches Metrics bar, Founder card, 4 Pillars, and Arsenal.
 */
export function AboutSkeleton() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#FFFFFF] overflow-x-hidden pt-28">
      <FloatingCapsuleNav />

      {/* Hero Header */}
      <section className="relative px-4 pt-12 pb-16 max-w-7xl mx-auto text-center flex flex-col items-center">
        <Skeleton className="h-7 w-60 rounded-full mb-6" />
        <Skeleton className="h-14 sm:h-20 w-4/5 max-w-4xl rounded-2xl mb-4" />
        <Skeleton className="h-4 w-2/3 max-w-2xl rounded-md mt-4" />
      </section>

      {/* Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#0D1B3E]/80 border border-[#26407F]/40">
          {[1, 2, 3, 4].map((m) => (
            <div key={m} className="p-4 space-y-2">
              <Skeleton className="h-10 w-20 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-4/5 rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl border border-[#26407F]/50 bg-[#0D1B3E]/90 p-8 flex flex-col justify-between">
              <div className="flex justify-between">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <Skeleton className="h-4 w-36 rounded" />
              </div>
              <div className="flex flex-col items-center space-y-3">
                <Skeleton className="w-28 h-28 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-lg" />
                <Skeleton className="h-4 w-44 rounded" />
              </div>
              <div className="flex justify-between pt-4 border-t border-[#162A5C]">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-12 w-4/5 rounded-xl" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            <div className="pt-4 flex gap-4">
              <Skeleton className="h-11 w-44 rounded-full" />
              <Skeleton className="h-11 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * ProcessSkeleton: Matches the 6-stage interactive workbench and 3D geometry box.
 */
export function ProcessSkeleton() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#FFFFFF] overflow-x-hidden pt-28">
      <FloatingCapsuleNav />

      {/* Hero Header */}
      <section className="relative px-4 pt-12 pb-16 max-w-7xl mx-auto text-center flex flex-col items-center">
        <Skeleton className="h-7 w-64 rounded-full mb-6" />
        <Skeleton className="h-14 sm:h-20 w-4/5 max-w-3xl rounded-2xl mb-4" />
        <Skeleton className="h-4 w-2/3 max-w-2xl rounded-md mt-4" />
      </section>

      {/* Production Pipeline Workbench */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Stages */}
          <div className="lg:col-span-5 space-y-3">
            {[1, 2, 3, 4, 5, 6].map((st) => (
              <div key={st} className="rounded-2xl p-5 border border-[#26407F]/30 bg-[#050B1F]/90 flex items-center gap-4">
                <Skeleton className="w-9 h-9 rounded-xl" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Stage Details & 3D Core */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 sm:p-10 bg-[#0D1B3E]/95 border border-[#26407F]/50 space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-[#162A5C]">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48 rounded-lg" />
                  <Skeleton className="h-3 w-32 rounded" />
                </div>
                <Skeleton className="h-7 w-28 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[1, 2, 3, 4].map((d) => (
                  <Skeleton key={d} className="h-10 rounded-xl" />
                ))}
              </div>
              <Skeleton className="h-14 w-full rounded-2xl" />
              <div className="pt-6 border-t border-[#162A5C] space-y-2">
                <Skeleton className="h-4 w-48 rounded" />
                <Skeleton className="aspect-[16/7] w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * ContactSkeleton: Matches the 4-step production brief form and studio coordinates.
 */
export function ContactSkeleton() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#FFFFFF] overflow-x-hidden pt-28">
      <FloatingCapsuleNav />

      {/* Hero Header */}
      <section className="relative px-4 pt-12 pb-16 max-w-7xl mx-auto text-center flex flex-col items-center">
        <Skeleton className="h-7 w-72 rounded-full mb-6" />
        <Skeleton className="h-14 sm:h-20 w-3/5 max-w-2xl rounded-2xl mb-4" />
        <Skeleton className="h-4 w-2/3 max-w-xl rounded-md mt-4" />
      </section>

      {/* Form + Coordinates Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Skeleton */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 sm:p-10 bg-[#0D1B3E]/95 border border-[#26407F]/50 space-y-8">
              <div className="flex justify-between items-center pb-6 border-b border-[#162A5C]">
                <div className="space-y-1.5">
                  <Skeleton className="h-7 w-48 rounded-lg" />
                  <Skeleton className="h-3 w-56 rounded" />
                </div>
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              {/* Step 1: Services */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-44 rounded" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <Skeleton key={s} className="h-10 rounded-xl" />
                  ))}
                </div>
              </div>

              {/* Step 2 & 3: Timeline & Budget */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-44 rounded" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[1, 2, 3, 4].map((t) => (
                    <Skeleton key={t} className="h-10 rounded-xl" />
                  ))}
                </div>
              </div>

              {/* Step 4: Text inputs */}
              <div className="space-y-4 pt-4 border-t border-[#162A5C]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-12 rounded-xl" />
                  <Skeleton className="h-12 rounded-xl" />
                </div>
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
              </div>

              <div className="pt-4 flex gap-4">
                <Skeleton className="h-12 flex-1 rounded-full" />
                <Skeleton className="h-12 flex-1 rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl p-8 bg-[#0D1B3E]/90 border border-[#26407F]/40 space-y-5">
              <Skeleton className="h-4 w-40 rounded" />
              <Skeleton className="h-20 w-full rounded-2xl" />
              <Skeleton className="h-20 w-full rounded-2xl" />
            </div>
            <div className="rounded-3xl p-8 bg-[#0D1B3E]/90 border border-[#26407F]/40 space-y-4">
              <Skeleton className="h-4 w-36 rounded" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Universal PageSkeleton generic fallback.
 */
export default function PageSkeleton() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#FFFFFF] overflow-x-hidden pt-28">
      <FloatingCapsuleNav />
      <section className="relative px-4 pt-16 pb-20 max-w-7xl mx-auto text-center flex flex-col items-center">
        <Skeleton className="h-7 w-60 rounded-full mb-6" />
        <Skeleton className="h-14 sm:h-20 w-3/4 max-w-3xl rounded-2xl mb-4" />
        <Skeleton className="h-4 w-1/2 max-w-xl rounded-md mt-4" />
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-8">
        <Skeleton className="h-64 w-full rounded-3xl" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </section>
    </div>
  );
}
