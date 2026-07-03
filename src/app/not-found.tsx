import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="max-w-md space-y-6">
        
        {/* Not Found Illustration */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 shadow-md shadow-indigo-600/10 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Compass className="h-8 w-8 animate-spin-slow" />
        </div>

        {/* Header content */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Page not found
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Sorry, we couldn&apos;t find the page you are looking for. It might have been moved, deleted, or never existed in the first place.
          </p>
        </div>

        {/* Quick links & Redirect button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-indigo-500 active:scale-95 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95 transition-all"
          >
            <span>Explore Articles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
