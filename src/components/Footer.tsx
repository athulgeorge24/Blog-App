'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon, LogoIcon } from './icons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40">
      
      {/* Newsletter Section */}
      <section id="newsletter" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="rounded-2xl bg-indigo-600 px-6 py-10 shadow-xl shadow-indigo-600/10 sm:px-12 sm:py-16 md:flex md:items-center md:justify-between lg:px-16 dark:bg-indigo-700">
          <div className="md:w-0 md:flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base text-indigo-100">
              Get the latest posts on UI design, React architecture, product strategy, and engineering delivered straight to your inbox.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md md:mt-0 md:ml-8">
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-lg bg-indigo-500/30 border border-indigo-400/30 p-4 text-white animate-fade-in">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-200" />
                <span className="text-sm font-medium">Thanks for subscribing! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="sm:flex gap-2">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border-0 bg-white/10 px-5 py-3 text-sm text-white placeholder-indigo-200 outline-none ring-1 ring-white/20 transition-all focus:bg-white/15 focus:ring-white/40 dark:bg-black/20"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow transition-all hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white sm:mt-0 sm:w-auto shrink-0 active:scale-95 disabled:opacity-80"
                >
                  <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-indigo-200">
              We care about your data. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Links & Credits */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <LogoIcon className="transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Blog<span className="text-indigo-600 dark:text-indigo-400">App</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A premium, production-ready SaaS blog sharing clean concepts, engineering practices, and design tokens for scaling products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400" aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400" aria-label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Categories
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {['Design', 'Engineering', 'Product', 'Growth', 'Culture'].map((cat) => (
                    <li key={cat}>
                      <Link 
                        href={`/blog?category=${cat.toLowerCase()}`}
                        className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="/about" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#careers" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#features" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Features
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Press
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Resources
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Changelog
                    </a>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Contact support
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'CCPA'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Blog App. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            Designed for Beyond UI and SaaS experiences.
          </p>
        </div>
      </section>

    </footer>
  );
}
