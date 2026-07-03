'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from '@/providers/ThemeProvider';
import { Search, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { LogoIcon } from './icons';

function NavbarContent() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync search input with URL search param
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    
    // Live search updates URL if already on the blog page or homepage
    if (pathname === '/blog' || pathname === '/') {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <LogoIcon className="transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
              Blog<span className="text-indigo-600 dark:text-indigo-400">App</span>
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                pathname === '/blog' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                pathname === '/about' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                pathname === '/contact' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side - Search, Theme, CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-48 lg:w-60 rounded-full border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-4 text-xs outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:focus:border-indigo-400 dark:focus:bg-slate-950"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </form>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />) : <div className="h-4 w-4" />}
            </button>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-indigo-600 hover:shadow-indigo-600/10 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 dark:hover:text-white"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              suppressHydrationWarning
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />) : <div className="h-4 w-4" />}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </form>
          <nav className="flex flex-col gap-3 font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-1.5 text-sm transition-colors ${
                pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-1.5 text-sm transition-colors ${
                pathname === '/blog' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-1.5 text-sm transition-colors ${
                pathname === '/about' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-1.5 text-sm transition-colors ${
                pathname === '/contact' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-slate-950 py-2.5 text-sm font-semibold text-white shadow-md dark:bg-white dark:text-slate-950"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 w-full glass-nav h-16 animate-pulse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          <div className="text-xl font-bold text-slate-900 dark:text-white">BlogApp</div>
          <div className="w-48 h-8 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        </div>
      </header>
    }>
      <NavbarContent />
    </Suspense>
  );
}
