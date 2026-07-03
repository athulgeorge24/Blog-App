import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format publish date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
      
      {/* Cover Image Container */}
      <div className="image-zoom-container relative aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover"
          priority={post.featured} // Load featured post images faster
        />
        {/* Category Badge on Top of Image */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur-sm dark:bg-slate-950/95 dark:text-slate-100">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        
        {/* Title */}
        <h3 className="text-lg font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-indigo-600 dark:text-slate-50 dark:group-hover:text-indigo-400 transition-colors">
          <Link href={`/blog/${post.id}`} className="focus:outline-none focus-visible:underline">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3 dark:text-slate-400 flex-1">
          {post.excerpt}
        </p>

        {/* Separator */}
        <div className="my-5 h-[1px] w-full bg-slate-100 dark:bg-slate-800/80" />

        {/* Author & Footer Meta */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <Image
                src={post.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'}
                alt={post.authorName || 'Anonymous'}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
              {post.authorName || 'Anonymous'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(post.createdAt)}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>

      </div>

      {/* Hover arrow indicator in bottom corner */}
      <div className="absolute right-4 bottom-4 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 pointer-events-none md:block hidden">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>

    </article>
  );
}
