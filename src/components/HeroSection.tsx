import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  posts: Post[];
}

export default function HeroSection({ posts }: HeroSectionProps) {
  // Extract featured posts
  const featuredPosts = posts.filter((post) => post.featured);
  
  // Fallbacks if not enough posts are marked as featured
  const primaryPost = featuredPosts[0] || posts[0];
  const secondaryPosts = featuredPosts.length > 1 
    ? featuredPosts.slice(1, 4) 
    : posts.slice(1, 4);

  if (!primaryPost) return null;

  // Date formatting helper
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Side: Large Featured Post */}
        <div className="lg:col-span-2">
          <article className="group relative flex h-[480px] sm:h-[520px] flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition-all duration-300 hover:shadow-xl">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={primaryPost.image}
                alt={primaryPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Complex overlay for readability: bottom dark vignette and slight top gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-slate-950/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 text-white">
              
              {/* Category Pill */}
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-indigo-600 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm dark:bg-indigo-500">
                  {primaryPost.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl leading-tight">
                <Link href={`/blog/${primaryPost.id}`} className="hover:text-indigo-200 transition-colors focus:outline-none focus:underline">
                  {primaryPost.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-200 line-clamp-2 leading-relaxed">
                {primaryPost.excerpt}
              </p>

              {/* Author and Metadata */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src={primaryPost.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'}
                      alt={primaryPost.authorName || 'Anonymous'}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-semibold text-white">{primaryPost.authorName || 'Anonymous'}</span>
                </div>
                
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(primaryPost.createdAt)}</span>
                </div>

                <span className="h-1 w-1 rounded-full bg-slate-500" />

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                   <span>{primaryPost.readTime}</span>
                </div>
              </div>

              {/* Read More button */}
              <div className="mt-6">
                <Link
                  href={`/blog/${primaryPost.id}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 shadow-md transition-all hover:bg-indigo-600 hover:text-white"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </article>
        </div>

        {/* Right Side: Sidebar of Other Featured Posts */}
        <div className="flex flex-col justify-between gap-6 lg:col-span-1">
          <div className="flex flex-col gap-1 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Articles
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curated guides handpicked by our editors.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            {secondaryPosts.map((post) => (
              <article 
                key={post.id} 
                className="group flex gap-4 items-start pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
              >
                {/* Thumbnail Image */}
                <div className="image-zoom-container relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-cover"
                  />
                </div>

                {/* Text Context */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {post.category}
                  </span>
                  
                  <h4 className="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h4>
                  
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1 dark:text-slate-400">
                    {post.excerpt}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-slate-400">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                     <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
