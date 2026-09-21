'use client';

import { useApp } from '@/context/AppContext';

export default function HeroSection() {
  const { switchTab, heroStats } = useApp();

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-stone-950 text-white font-sans overflow-hidden">
      {/* Full-bleed Bezel-to-Bezel Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none z-0 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/hero-bg.webp')` }}
      />

      {/* Dark Gradient Overlay for High Contrast & Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-950/70 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/60 z-0" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bright High-Contrast Content (Image 2 Content) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Top Badge Pill */}
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/40 text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg backdrop-blur-md">
              <span className="text-amber-300">✦</span> ONLY I KNOW WHAT YOU ARE HIDING 💫
            </div>

            {/* Main Headline with Bright Vibrant Gradients */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Unveil Your{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 font-serif font-bold">
                Cosmic
              </span>{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-400 to-orange-400 font-serif font-bold">
                Blueprint
              </span>
            </h1>

            {/* Description Subtitle in Bright Legible Text */}
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed font-light font-sans max-w-xl">
              We align physical objects, cosmic transits, and customized daily astrological calendars to guide your spatial and spiritual energy toward harmonic tranquility.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  switchTab('consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>BEGIN SOUL READING</span>
                <span className="text-lg">➔</span>
              </button>

              <button
                onClick={() => {
                  switchTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-amber-300">🛍</span>
                BROWSE APOTHECARY
              </button>
            </div>

            {/* Stats Row in Bright Vibrant Colors */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-white/15 max-w-xl w-full">
              <div>
                <span className="block text-xl sm:text-3xl font-serif font-extrabold text-purple-400 leading-none whitespace-nowrap">
                  {heroStats?.charts || '12,500+'}
                </span>
                <span className="text-[10px] text-stone-300 uppercase tracking-widest font-bold block mt-1.5 whitespace-nowrap">
                  CHARTS CALIBRATED
                </span>
              </div>
              <div className="border-x border-white/15 px-3 sm:px-6">
                <div className="inline-flex items-center gap-1.5 text-xl sm:text-3xl font-serif font-extrabold text-rose-400 leading-none whitespace-nowrap">
                  <span>
                    {(heroStats?.clientPraise || '4.96').replace(/[★⭐*]/g, '').trim() || '4.96'}
                  </span>
                  <span className="text-rose-400 text-lg sm:text-2xl leading-none">★</span>
                </div>
                <span className="text-[10px] text-stone-300 uppercase tracking-widest font-bold block mt-1.5 whitespace-nowrap">
                  CLIENT PRAISE
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-3xl font-serif font-extrabold text-amber-400 leading-none whitespace-nowrap">
                  {heroStats?.spiritualEthics || '100%'}
                </span>
                <span className="text-[10px] text-stone-300 uppercase tracking-widest font-bold block mt-1.5 whitespace-nowrap">
                  SPIRITUAL ETHICS
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Single Golden Oval Arch Frame with Garima Hero Image */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Background Glow Halo */}
            <div className="absolute w-80 h-96 rounded-full bg-gradient-to-tr from-amber-500/25 via-purple-600/25 to-rose-500/25 blur-3xl pointer-events-none" />

            {/* Decorative Golden Starburst Vector */}
            <div className="absolute -top-6 -right-6 text-amber-300 text-4xl animate-spin" style={{ animationDuration: '30s' }}>
              ✦
            </div>

            {/* Single Golden Oval Arch Frame (Garima hero image) */}
            <div className="relative z-10 flex items-center justify-center">
              
              <div className="relative w-64 sm:w-80 h-[380px] sm:h-[460px] rounded-[180px] p-2.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_60px_rgba(245,158,11,0.4)] transition-transform hover:scale-[1.02] duration-500 group">
                <div className="w-full h-full rounded-[170px] overflow-hidden relative bg-stone-900 border-2 border-amber-200">
                  <img
                    src="/garima-hero.webp"
                    alt="Garima Verma - Founder & Astro-Alchemist"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent pointer-events-none" />
                  
                  {/* Floating Badge inside frame */}
                  <div className="absolute bottom-5 inset-x-4 bg-black/75 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-center">
                    <span className="block font-serif text-sm font-bold text-white tracking-wide">Garima Verma</span>
                    <span className="text-[9px] uppercase tracking-widest text-amber-300 font-extrabold block mt-0.5">FOUNDER & ASTRO-ALCHEMIST</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
