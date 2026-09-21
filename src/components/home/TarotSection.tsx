'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const TAROT_CARDS = [
  {
    id: 'c1',
    icon: '🧭',
    title: 'The Luminary Star',
    emoji: '✨',
    message: '"A beacon of hope, clarity, and unexpected breakthroughs. Trust that the Universe is paving your roadmap right now."',
    element: 'Ether',
    color: 'from-purple-950 via-slate-900 to-stone-900',
    borderColor: 'border-purple-400/40',
    textColor: 'text-purple-300',
  },
  {
    id: 'c2',
    icon: '✦',
    title: 'The Divine Empress',
    emoji: '🌸',
    message: '"Nurture your physical body and creative projects. Great manifestations demand patience, sensory comfort, and self-kindness."',
    element: 'Earth',
    color: 'from-rose-950 via-stone-900 to-purple-950',
    borderColor: 'border-rose-400/40',
    textColor: 'text-rose-300',
  },
  {
    id: 'c3',
    icon: '🌙',
    title: 'The Cosmic Void',
    emoji: '🌌',
    message: '"A call to pause and reflect. Silence external noises. Your subconscious currently holds the keys you seek."',
    element: 'Void',
    color: 'from-indigo-950 via-slate-900 to-stone-950',
    borderColor: 'border-indigo-400/40',
    textColor: 'text-indigo-300',
  },
];

export default function TarotSection() {
  const { playTone, showToast } = useApp();
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const flipCard = (id: string) => {
    if (flipped.has(id)) return;
    playTone(523.25, 'triangle', 0.3);
    setFlipped(prev => new Set([...prev, id]));
    showToast('Celestial Tarot aspect revealed! ✨');
  };

  const resetDeck = () => {
    playTone(293.66, 'sine', 0.15);
    setFlipped(new Set());
    showToast('Sacred deck shuffled and distributed face down.');
  };

  return (
    <div className="py-20 bg-[#0C0A16] text-white border-y border-purple-900/40 relative overflow-hidden font-sans">
      {/* Cosmic background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">✨ Interactive Divine Oracle</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">Your Daily Cosmic Tarot Deck</h2>
          <p className="text-purple-200/80 text-xs sm:text-sm font-light leading-relaxed">
            Focus on a question about your path. Click any face-down cosmic card to draw and flip it to synthesize your custom advice aspect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          {TAROT_CARDS.map(card => (
            <div
              key={card.id}
              className="w-full h-84 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => flipCard(card.id)}
            >
              <div
                className="relative w-full h-full rounded-2xl shadow-2xl transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped.has(card.id) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Back (face down) */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-stone-950 to-purple-950 p-5 rounded-2xl flex flex-col items-center justify-between text-amber-200 border-2 border-amber-400/40 shadow-xl backdrop-blur-md"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-xs tracking-widest text-amber-300 font-serif font-extrabold uppercase">ASTROHEALER4U ORACLE</span>
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-300/50 flex items-center justify-center bg-amber-400/5 shadow-inner">
                    <span className="text-3xl animate-spin text-amber-300" style={{ animationDuration: '20s', display: 'inline-block' }}>{card.icon}</span>
                  </div>
                  <span className="text-[10px] tracking-widest text-amber-300/80 font-mono uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-300/20">REVEAL ALIGNMENT ✦</span>
                </div>

                {/* Front (revealed) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${card.color} p-6 rounded-2xl flex flex-col items-center justify-between text-white border-2 ${card.borderColor} shadow-2xl backdrop-blur-md`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className={`text-xs uppercase tracking-widest font-extrabold ${card.textColor}`}>{card.title}</div>
                  <div className="text-5xl animate-bounce drop-shadow-md">{card.emoji}</div>
                  <div className="text-center space-y-2">
                    <p className="text-xs text-purple-100/90 leading-relaxed font-light italic">{card.message}</p>
                    <span className={`text-[10px] font-mono block pt-1 font-bold tracking-wider uppercase ${card.textColor}`}>Alignment Element: {card.element}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={resetDeck}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full hover:scale-105 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Reshuffle Sacred Deck
          </button>
        </div>
      </div>
    </div>
  );
}
