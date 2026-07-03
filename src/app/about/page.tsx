import React from 'react';
import Image from 'next/image';
import { Compass, ShieldCheck, Sparkles, Code2, Users2 } from 'lucide-react';

export const metadata = {
  title: 'About Us | Blog App',
  description: 'Learn more about our team, core engineering values, design systems, and why we build beyond the limits of standard interfaces.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Monthly Readers', value: '50K+' },
    { label: 'Technical Articles', value: '150+' },
    { label: 'GitHub Stars', value: '1.2K+' },
    { label: 'Active Contributors', value: '15+' },
  ];

  const values = [
    {
      icon: <Code2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Developer-Led Insights',
      description: 'We believe in writing code-centric articles with verified implementation details rather than generic overviews.',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Premium Aesthetics',
      description: 'Design and coding are not separate disciplines. We advocate for visual excellence and interactive animations.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Accessible & Performant',
      description: 'Everything we write or recommend centers on high-speed static delivery, CDN caching, and full WCAG guidelines compliance.',
    },
  ];

  const team = [
    {
      name: 'Sarah Connor',
      role: 'Principal Engineer',
      bio: 'Ex-NextJS core contributor. Specializes in edge runtime rendering, hydration models, and compiler design.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    },
    {
      name: 'Alex Rivera',
      role: 'Head of Product Design',
      bio: 'Passionate about typography, micro-interactions, dark mode token maps, and clean structural layouts.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    },
    {
      name: 'Marcus Aurelius',
      role: 'Engineering lead',
      bio: 'Obsessed with data queries caching, database schema optimizations, and distributed serverless environments.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Compass className="h-3.5 w-3.5 animate-spin-slow" />
          <span>Our Journey</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl leading-none">
          Building the Future of Tech Publication
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          We are a team of software engineers, UX designers, and technical writers committed to producing the most detailed, visually stunning dev logs online. We build for performance, write for impact, and design to inspire.
        </p>
      </section>

      {/* Stats Board */}
      <section className="mb-20 sm:mb-28">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 bg-white/50 border border-slate-200 p-8 rounded-2xl dark:border-slate-800 dark:bg-slate-900/20 shadow-sm">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section id="features" className="mb-20 sm:mb-28 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Our Core Values
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            We adhere to a strict set of values to deliver high-integrity educational assets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-xl border border-slate-200 bg-white/30 dark:border-slate-800 dark:bg-slate-900/10 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/80 mb-4">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{val.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section id="careers" className="scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            <Users2 className="h-3.5 w-3.5" />
            <span>The Crew</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Meet Our Technical Editors
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Experienced engineers and creators publishing guides you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {team.map((member, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center text-center p-6 bg-white border border-slate-200 rounded-2xl dark:border-slate-800 dark:bg-slate-900/40 shadow-sm hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-indigo-100 dark:border-indigo-900">
                <Image 
                  src={member.avatar} 
                  alt={member.name}
                  width={96}
                  height={96}
                  className="object-cover h-full w-full"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mt-0.5">{member.role}</p>
              <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
