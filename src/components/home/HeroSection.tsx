'use client';

import { useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export default function HeroSection() {
  const { switchTab, playTone, heroTitle, heroSub, heroStats } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let animFrameId: number;
    let mouseX: number | null = null;

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    const starsArray = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.05 + 0.01,
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      glow: Math.random() > 0.8,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      starsArray.forEach(star => {
        let currentOpacity = star.opacity + Math.sin(time * star.pulseSpeed * 60 + star.pulseOffset) * 0.25;
        currentOpacity = Math.max(0.05, Math.min(1, currentOpacity));

        if (mouseX !== null) {
          const dist = Math.abs(star.x - mouseX);
          if (dist < 100) {
            star.y -= (1 - dist / 100) * 0.6;
          }
        }
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        if (star.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(196, 181, 253, 0.8)';
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.glow ? '#c4b5fd' : '#a8a29e';
        ctx.fill();
        ctx.restore();
      });

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative py-12 md:py-24 px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto opacity-70 z-0" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-1.5 rounded-full text-purple-700 text-xs font-bold uppercase tracking-widest shadow-sm animate-bounce" style={{ animationDuration: '3s' }}>
            <span>✦</span>
            Only i know what you are hiding 💫
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-800 leading-tight">
            {heroTitle.includes('Cosmic Blueprint') ? (
              <>
                {heroTitle.split('Cosmic Blueprint')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-rose-500 to-amber-600 italic font-bold">
                  Cosmic Blueprint
                </span>
                {heroTitle.split('Cosmic Blueprint')[1]}
              </>
            ) : (
              heroTitle
            )}
          </h1>

          <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold">
            {heroSub}
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
            <button
              onClick={() => switchTab('consultation')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-stone-800 to-stone-900 hover:from-purple-900 hover:to-indigo-950 text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Begin Soul Reading
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button
              onClick={() => switchTab('shop')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/80 font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span className="text-purple-600">🛍</span>
              Browse Apothecary
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-stone-200/50 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-purple-800 leading-none">{heroStats.charts}</span>
              <span className="text-[10px] text-stone-500 tracking-wider uppercase font-bold block mt-1">Charts Calibrated</span>
            </div>
            <div className="border-x border-stone-200/60 px-4">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-rose-600 leading-none">{heroStats.clientPraise}</span>
              <span className="text-[10px] text-stone-500 tracking-wider uppercase font-bold block mt-1">Client Praise</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-amber-600 leading-none">{heroStats.spiritualEthics}</span>
              <span className="text-[10px] text-stone-500 tracking-wider uppercase font-bold block mt-1">Spiritual Ethics</span>
            </div>
          </div>
        </div>

        {/* Orbital Graphic */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-200/30 animate-spin" style={{ animationDuration: '45s' }} />
            <div className="absolute inset-6 rounded-full border border-rose-200/40" style={{ animation: 'spin 30s linear infinite reverse' }} />
            <div className="absolute inset-16 rounded-full border border-amber-200/25" />

            <button
              onClick={() => playTone(587.33, 'triangle', 0.8)}
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-purple-100 via-rose-50 to-amber-100 p-4 shadow-xl flex flex-col items-center justify-center border border-white/60 hover:scale-105 transition-transform duration-300 cursor-pointer group"
              title="Tap for Solar Vibrations"
            >
              <div className="absolute inset-3 rounded-full border border-amber-300/30 group-hover:scale-110 transition-transform" />
              <span className="text-4xl sm:text-5xl text-amber-500 animate-pulse mb-1.5">☀️</span>
              <span className="text-[9px] tracking-[0.25em] font-serif uppercase text-stone-500 font-bold block">VIBRATIONAL</span>
              <span className="text-[11px] text-purple-700 italic font-sans font-semibold mt-0.5">HEARTBEAT</span>
            </button>

            <div className="absolute top-6 right-12 w-9 h-9 rounded-full bg-purple-200/80 flex items-center justify-center text-xs animate-bounce" style={{ animationDelay: '0.1s' }}>♈</div>
            <div className="absolute bottom-8 left-8 w-11 h-11 rounded-full bg-rose-200/80 flex items-center justify-center text-sm animate-bounce" style={{ animationDelay: '0.4s' }}>♎</div>
            <div className="absolute top-1/2 left-0 w-8 h-8 rounded-full bg-teal-100/80 flex items-center justify-center text-xs">♊</div>
            <div className="absolute bottom-1/2 right-0 w-7 h-7 rounded-full bg-amber-100/80 flex items-center justify-center text-xs">☉</div>
          </div>
        </div>
      </div>
    </div>
  );
}
