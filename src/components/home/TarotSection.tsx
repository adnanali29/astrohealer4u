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
    color: 'from-purple-50 to-white',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
  },
  {
    id: 'c2',
    icon: '✦',
    title: 'The Divine Empress',
    emoji: '🌸',
    message: '"Nurture your physical body and creative projects. Great manifestations demand patience, sensory comfort, and self-kindness."',
    element: 'Earth',
    color: 'from-rose-50 to-white',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
  },
  {
    id: 'c3',
    icon: '🌙',
    title: 'The Cosmic Void',
    emoji: '🌌',
    message: '"A call to pause and reflect. Silence external noises. Your subconscious currently holds the keys you seek."',
    element: 'Void',
    color: 'from-sky-50 to-white',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
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
    <div className="py-16 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-purple-600 font-semibold block">Interactive Divine Oracle</span>
          <h2 className="text-3xl font-serif text-stone-800">Your Daily Cosmic Tarot Deck</h2>
          <p className="text-stone-500 text-sm font-light">
            Focus on a question about your path. Click any face-down cosmic card to draw and flip it to synthesize your custom advice aspect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          {TAROT_CARDS.map(card => (
            <div
              key={card.id}
              className="w-full h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => flipCard(card.id)}
            >
              <div
                className="relative w-full h-full rounded-2xl shadow-md border border-stone-200/60 transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped.has(card.id) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Back (face down) */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-stone-800 to-stone-950 p-4 rounded-2xl flex flex-col items-center justify-between text-amber-200 border-4 border-amber-100/20"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-xs tracking-widest text-amber-300 font-serif font-semibold">ASTROHEALER4U ORACLE</span>
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-200/40 flex items-center justify-center">
                    <span className="text-2xl animate-spin" style={{ animationDuration: '20s', display: 'inline-block' }}>{card.icon}</span>
                  </div>
                  <span className="text-[10px] tracking-wider text-amber-200/60 font-mono">REVEAL ALIGNMENT</span>
                </div>

                {/* Front (revealed) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${card.color} p-6 rounded-2xl flex flex-col items-center justify-between text-stone-800 border-2 ${card.borderColor}`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className={`text-xs uppercase tracking-widest font-bold ${card.textColor}`}>{card.title}</div>
                  <div className="text-5xl animate-bounce">{card.emoji}</div>
                  <div className="text-center space-y-1">
                    <p className="text-xs text-stone-600 leading-normal font-light">{card.message}</p>
                    <span className={`text-[9px] font-mono block pt-1 font-semibold ${card.textColor}`}>Alignment Element: {card.element}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={resetDeck}
            className="px-5 py-2.5 text-xs text-purple-700 font-bold bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
          >
            Reshuffle Sacred Deck
          </button>
        </div>
      </div>
    </div>
  );
}
