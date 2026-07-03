import React from 'react';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchPosts, fetchCategories } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import BlogGrid from '@/components/BlogGrid';
import { Library } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export const metadata = {
  title: 'Blog Library | In-depth Technical Articles',
  description: 'Filter and search through our engineering logs, UI/UX guides, product growth papers, and technical tutorials.',
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const category = resolvedParams.category || 'all';

  // Fetch categories server-side
  const categoriesList = await fetchCategories();
  const categoryNames = categoriesList.map((c) => c.name);

  // Initialize QueryClient and prefetch the filtered search query server-side
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', q, category],
    queryFn: () => fetchPosts(q, category),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Library className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Our Library</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Engineering & Design Logs
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            Deep dives, technical logs, architectural design decisions, and SaaS growth strategies written directly by our team.
          </p>
        </div>
      </div>

      {/* Dynamic Search & Filter Pills */}
      <SearchBar categories={categoryNames} />

      {/* React Query hydration boundary */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogGrid />
      </HydrationBoundary>

    </div>
  );
}
