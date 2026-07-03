import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPosts } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import BlogCard from '@/components/BlogCard';
import { Flame, ArrowRight, Sparkles, Rocket, ShieldCheck } from 'lucide-react';

export default async function Home() {
  // Fetch posts on the server for SSR
  const allPosts = await fetchPosts();
  
  // Highlight the top 4 recent posts for the homepage grid (excluding the primary hero)
  const heroPost = allPosts.find(p => p.featured) || allPosts[0];
  const recentPosts = allPosts
    .filter(p => p.id !== heroPost?.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* SECTION 1: Featured Hero Area */}
      <HeroSection posts={allPosts} />

      {/* Spacing & Accent Divider */}
      <div className="my-10 h-[1px] w-full bg-slate-100 dark:bg-slate-800/80" />

      {/* SECTION 2: Recent Posts */}
      <section className="py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
          >
            <span>Explore all articles</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <p className="text-sm text-slate-500">No recent articles found.</p>
          </div>
        )}
      </section>

      {/* Spacing & Accent Divider */}
      <div className="my-16 h-[1px] w-full bg-slate-100 dark:bg-slate-800/80" />

      {/* SECTION 3: Visual Features Section */}
      <section className="py-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to build beyond limits
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400">
            A curation of resources, ideas, and strategies designed specifically for modern developers and product builders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              <span>01. Premium Layouts</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We design components with structural spacing rules, high-fidelity font scaling, and optimized responsive dimensions.
            </p>
          </div>
          
          <div className="p-6 rounded-xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>02. Next.js Architecture</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Leverage Server-Side Rendering, Next Image Optimization, and React Query Hydration for bulletproof SEO and performance.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <span>03. Accessible Design</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Adhere to WCAG standards with semantic markup, proper ARIA labeling, keyboard navigation focus indicators, and dark mode contrast.
            </p>
          </div>
        </div>
      </section>

      {/* Spacing & Accent Divider */}
      <div className="my-16 h-[1px] w-full bg-slate-100 dark:bg-slate-800/80" />

      {/* SECTION 4: About Us Snippet */}
      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Who we are
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Pioneering the future of user experience design.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              At Blog App, our mission is to decode complex technical concepts and deliver them through digestible, highly aesthetic reading experiences. We believe that development and design should go hand in hand to create flawless applications.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                <span>Read Our Mission</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-100 dark:bg-slate-900">
            <Image 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
              alt="About Us Video Overlay"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
