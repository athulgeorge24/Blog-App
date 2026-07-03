'use client';

import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, FacebookIcon } from './icons';

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getPageUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleCopyLink = () => {
    const url = getPageUrl();
    if (!url) return;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareTwitter = () => {
    const url = getPageUrl();
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check out this article: "${title}"`
    )}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = getPageUrl();
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = getPageUrl();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-4 py-6 border-t border-b border-slate-100 dark:border-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Share this article
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-600 dark:text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* Twitter */}
        <button
          onClick={handleShareTwitter}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400 cursor-pointer"
          aria-label="Share on Twitter"
        >
          <TwitterIcon className="h-3.5 w-3.5" />
        </button>

        {/* LinkedIn */}
        <button
          onClick={handleShareLinkedIn}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 cursor-pointer"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon className="h-3.5 w-3.5" />
        </button>

        {/* Facebook */}
        <button
          onClick={handleShareFacebook}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400 cursor-pointer"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
