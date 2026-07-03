import React from 'react';

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* SECTION 1: Hero Area Skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-pulse">
        {/* Left Primary Featured */}
        <div className="lg:col-span-2">
          <div className="h-[480px] sm:h-[520px] w-full rounded-2xl bg-slate-100 dark:bg-slate-900/50 flex flex-col justify-end p-6 sm:p-10 gap-4">
            <div className="h-6 w-20 rounded-full bg-slate-250 dark:bg-slate-800" />
            <div className="h-10 w-3/4 rounded bg-slate-250 dark:bg-slate-800" />
            <div className="h-6 w-full rounded bg-slate-250 dark:bg-slate-800" />
            <div className="h-12 w-32 rounded-full bg-slate-250 dark:bg-slate-800 mt-4" />
          </div>
        </div>

        {/* Right Secondary List */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <div className="h-6 w-32 rounded bg-slate-100 dark:bg-slate-900/50" />
          <div className="flex flex-col gap-6 flex-1 justify-between">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-900/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-12 rounded bg-slate-100 dark:bg-slate-900/50" />
                  <div className="h-5 w-full rounded bg-slate-100 dark:bg-slate-900/50" />
                  <div className="h-3.5 w-1/2 rounded bg-slate-100 dark:bg-slate-900/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 h-[1px] w-full bg-slate-100 dark:bg-slate-850" />

      {/* SECTION 2: Grid Filter and Card Grid Skeleton */}
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-7 w-40 rounded bg-slate-100 dark:bg-slate-900/50" />
          <div className="h-4 w-32 rounded bg-slate-100 dark:bg-slate-900/50" />
        </div>

        {/* Search filter line */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-6">
          <div className="flex gap-2 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-full bg-slate-100 dark:bg-slate-900/50" />
            ))}
          </div>
          <div className="h-10 w-full md:w-60 rounded-full bg-slate-100 dark:bg-slate-900/50" />
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-slate-100 p-4 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/20">
              <div className="aspect-[16/10] w-full rounded-lg bg-slate-100 dark:bg-slate-900/50" />
              <div className="mt-4 h-4 w-1/4 rounded bg-slate-100 dark:bg-slate-900/50" />
              <div className="mt-2 h-6 w-3/4 rounded bg-slate-100 dark:bg-slate-900/50" />
              <div className="mt-2 h-4 w-full rounded bg-slate-100 dark:bg-slate-900/50" />
              <div className="mt-4 flex gap-2 items-center">
                <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-900/50" />
                <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-900/50" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
