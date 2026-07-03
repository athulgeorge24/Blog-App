'use client';

import React, { useEffect, useState, useTransition, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X, LayoutGrid } from 'lucide-react';

interface SearchBarProps {
  categories: string[];
}

function SearchBarContent({ categories }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [inputVal, setInputVal] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Sync state with URL parameters
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'all';
    setInputVal(q);
    setActiveCategory(cat.toLowerCase());
  }, [searchParams]);

  // Update query params helper
  const updateParams = (newQ: string, newCat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newQ) {
      params.set('q', newQ);
    } else {
      params.delete('q');
    }

    if (newCat && newCat !== 'all') {
      params.set('category', newCat);
    } else {
      params.delete('category');
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    updateParams(val, activeCategory);
  };

  const handleCategoryClick = (cat: string) => {
    const newCat = cat.toLowerCase();
    setActiveCategory(newCat);
    updateParams(inputVal, newCat);
  };

  const handleClearSearch = () => {
    setInputVal('');
    updateParams('', activeCategory);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-6 border-b border-slate-100 dark:border-slate-800">
      
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15 dark:bg-indigo-500'
              : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <LayoutGrid className="h-3 w-3" />
          <span>All Posts</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              activeCategory === cat.toLowerCase()
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15 dark:bg-indigo-500'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input Container */}
      <div className="relative w-full md:max-w-xs shrink-0">
        <input
          type="text"
          placeholder="Filter articles, authors, category..."
          value={inputVal}
          onChange={handleInputChange}
          className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-xs outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-200 dark:focus:border-indigo-400 dark:focus:bg-slate-900"
        />
        <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-400" />
        
        {/* Loading Spinner / Clear Icon */}
        {isPending ? (
          <div className="absolute right-3.5 top-3.5 h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        ) : inputVal ? (
          <button
            onClick={handleClearSearch}
            className="absolute right-3.5 top-3 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        ) : null}
      </div>

    </div>
  );
}

export default function SearchBar({ categories }: SearchBarProps) {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-6 border-b border-slate-100 dark:border-slate-800">
        <div className="h-8 w-64 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse"></div>
        <div className="h-8 w-48 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse"></div>
      </div>
    }>
      <SearchBarContent categories={categories} />
    </Suspense>
  );
}
