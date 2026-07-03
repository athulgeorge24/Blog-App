import React from 'react';
import { fetchPosts } from '@/lib/api';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
}

export default async function RelatedPosts({ currentPostId, category }: RelatedPostsProps) {
  // Fetch posts in the same category on the server
  const allPosts = await fetchPosts('', category);
  
  // Filter out the active post and limit to 3 items
  const related = allPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-slate-200 pt-12 dark:border-slate-800 md:pt-16">
      <div className="flex flex-col gap-1 pb-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Related Articles
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Continue reading other articles in the <span className="font-semibold text-indigo-600 dark:text-indigo-400">{category}</span> category.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
