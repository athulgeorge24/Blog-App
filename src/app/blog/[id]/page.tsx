import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPostById } from '@/lib/api';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import ShareButtons from '@/components/ShareButtons';
import RelatedPosts from '@/components/RelatedPosts';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${post.id}`,
      publishedTime: post.createdAt,
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `/blog/${post.id}`,
    },
  };
}

// Custom Markdown parser for rendering mock content beautifully
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.JSX.Element[] = [];
  
  let inCode = false;
  let codeBlockContent: string[] = [];
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCode) {
        inCode = false;
        elements.push(
          <pre 
            key={`code-${i}`} 
            className="my-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs sm:text-sm font-mono text-indigo-200 dark:bg-slate-950 border border-slate-800 shadow-inner"
          >
            <code className={codeLanguage}>{codeBlockContent.join('\n')}</code>
          </pre>
        );
        codeBlockContent = [];
        codeLanguage = '';
      } else {
        inCode = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCode) {
      codeBlockContent.push(rawLine); // Keep indentation
      continue;
    }

    // Headings
    if (line.startsWith('## ')) {
      elements.push(
        <h2 
          key={`h2-${i}`} 
          className="mt-10 mb-4 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl md:text-3xl border-b border-slate-100 dark:border-slate-800 pb-2"
        >
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 
          key={`h3-${i}`} 
          className="mt-8 mb-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl"
        >
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote 
          key={`quote-${i}`} 
          className="my-6 border-l-4 border-indigo-600 pl-4 italic text-slate-700 dark:border-indigo-400 dark:text-slate-300 bg-slate-50/50 py-2 pr-2 rounded-r-lg dark:bg-slate-900/20"
        >
          {line.slice(2)}
        </blockquote>
      );
      continue;
    }

    // List items
    if (line.startsWith('* ') || line.startsWith('- ')) {
      elements.push(
        <li 
          key={`li-${i}`} 
          className="ml-6 list-disc my-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          {line.slice(2)}
        </li>
      );
      continue;
    }

    // Inline formatting: Bold (simple helper)
    let processedLine: React.ReactNode = line;
    if (line.includes('**')) {
      const parts = line.split('**');
      processedLine = parts.map((part, idx) => (idx % 2 === 1 ? <strong key={idx} className="font-bold text-slate-900 dark:text-white">{part}</strong> : part));
    }

    // Inline formatting: Code (simple helper)
    if (line.includes('`')) {
      const parts = line.split('`');
      processedLine = parts.map((part, idx) => (
        idx % 2 === 1 
          ? <code key={idx} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-indigo-600 dark:bg-slate-900 dark:text-indigo-400 border border-slate-200 dark:border-slate-800">{part}</code> 
          : part
      ));
    }

    // Blank lines
    if (line === '') {
      continue;
    }

    // Paragraph
    elements.push(
      <p 
        key={`p-${i}`} 
        className="my-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
      >
        {processedLine}
      </p>
    );
  }

  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* Scroll indicator bar at the top */}
      <ReadingProgressBar />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8 text-left">
          {/* Category */}
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>

          {/* Excerpt Summary */}
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author Details and Publishing Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-6">
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-100 dark:border-slate-800">
                <Image
                  src={post.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'}
                  alt={post.authorName || 'Anonymous'}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{post.authorName || 'Anonymous'}</span>
            </div>

            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />

            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />

            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative aspect-[21/10] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Main Content Area */}
        <div className="mt-10 sm:mt-12 text-slate-800 dark:text-slate-200">
          {renderContent(post.content)}
        </div>

        {/* Share buttons */}
        <div className="mt-12">
          <ShareButtons title={post.title} />
        </div>

        {/* Related Posts Section */}
        <div className="mt-12 md:mt-16">
          <RelatedPosts currentPostId={post.id} category={post.category} />
        </div>

      </article>
    </>
  );
}
