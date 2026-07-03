'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('NextJS App Error Boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="max-w-md space-y-6">
        
        {/* Error icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-md shadow-red-500/10 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="h-8 w-8" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            An unexpected error occurred while rendering this page. Our team has been notified.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900/50 p-2 rounded">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        {/* Action Button Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Back Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
