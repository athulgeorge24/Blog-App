'use client';

import React, { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalHeight = scrollHeight - clientHeight;
      
      if (totalHeight === 0) {
        setWidth(0);
        return;
      }
      
      const windowScroll = window.scrollY;
      const scrolled = (windowScroll / totalHeight) * 100;
      setWidth(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="reading-bar" 
      style={{ width: `${width}%` }} 
      role="progressbar" 
      aria-valuenow={width} 
      aria-valuemin={0} 
      aria-valuemax={100}
    />
  );
}
