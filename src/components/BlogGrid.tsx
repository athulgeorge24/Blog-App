'use client';

import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchPosts } from '@/lib/api';
import BlogCard from './BlogCard';
import { Post } from '@/types/blog';
import { Sparkles, Trash2, Library } from 'lucide-react';

function BlogGridContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const search = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  // React Query client-side query (hydrated from SSR prefetch)
  const { data: posts = [], isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts', search, category],
    queryFn: () => fetchPosts(search, category),
  });

  const handleClearFilters = () => {
    router.push(pathname);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white/50 p-4 dark:border-slate-800 dark:bg-slate-900/20 animate-pulse">
            <div className="aspect-[16/10] w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 flex gap-2 items-center">
              <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-red-50 p-3 text-red-500 dark:bg-red-950/30 dark:text-red-400">
          <Library className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">Failed to load articles</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
          There was an error communicating with the backend database server.
        </p>
        <button
          onClick={handleClearFilters}
          className="mt-6 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-400 dark:bg-slate-900/60 dark:border-slate-800">
          <Trash2 className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">No articles found</h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          We couldn&apos;t find any blog posts matching your search query &ldquo;{search}&rdquo; or filter. Try checking for typos or searching a different term.
        </p>
        <button
          onClick={handleClearFilters}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
        >
          <span>Clear Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Grid Header Info */}
      <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
        <span>Showing {posts.length} {posts.length === 1 ? 'article' : 'articles'}</span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default function BlogGrid() {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white/50 p-4 dark:border-slate-800 dark:bg-slate-900/20 animate-pulse">
            <div className="aspect-[16/10] w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-4 h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    }>
      <BlogGridContent />
    </Suspense>
  );
}
