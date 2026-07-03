'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API request submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 animate-fade-in">
      
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Support Desk</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Have an article request, feedback on design tokens, or partnership inquiries? Send us a message below.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Contact info */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="p-6 bg-white border border-slate-200 rounded-2xl dark:border-slate-800 dark:bg-slate-900/40 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Contact Channels</h2>
            
            <div className="space-y-6">
              
              {/* Mail */}
              <div className="flex gap-4 items-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">hello@blogapp.io</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Expect a reply within 24 hours.</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Headquarters</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">San Francisco, CA</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Silicon Valley Tech District</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Operating Hours</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Mon - Fri: 9am - 6pm EST</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Support is closed on weekends.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Social Card */}
          <div className="p-6 bg-slate-900 border border-slate-950 rounded-2xl dark:bg-indigo-950/20 dark:border-indigo-900/40 text-white">
            <h3 className="font-bold text-lg">Prefer direct chat?</h3>
            <p className="mt-2 text-xs sm:text-sm text-indigo-200 leading-relaxed">
              We host open-office developer Q&A hours every Wednesday. Stop by, suggest ideas, or chat directly with our writers on Discord.
            </p>
            <a 
              href="#"
              className="mt-6 inline-flex items-center justify-center w-full rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-indigo-50 transition-all cursor-pointer shadow-md"
            >
              Join Our Discord
            </a>
          </div>

        </div>

        {/* Right Side: Message form */}
        <div className="lg:col-span-2">
          <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl dark:border-slate-800 dark:bg-slate-900/20 shadow-sm">
            {success ? (
              <div className="text-center py-16 space-y-4 animate-fade-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-500 dark:bg-green-950/30 dark:text-green-400 shadow-md">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. We have received your query and our team will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Send us a message</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-550">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all dark:bg-slate-900/30 dark:text-slate-100 ${
                        errors.name 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:focus:border-indigo-400'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] font-semibold text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-555">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all dark:bg-slate-900/30 dark:text-slate-100 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:focus:border-indigo-400'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] font-semibold text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-556">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry topic"
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all dark:bg-slate-900/30 dark:text-slate-100 ${
                      errors.subject 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:focus:border-indigo-400'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] font-semibold text-red-500">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-557">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you need help with..."
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all dark:bg-slate-900/30 dark:text-slate-100 ${
                      errors.message 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:focus:border-indigo-400'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] font-semibold text-red-500">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-indigo-500 active:scale-95 transition-all w-full sm:w-auto cursor-pointer disabled:opacity-80"
                  >
                    <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
