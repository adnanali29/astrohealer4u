'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function FaqSection() {
  const { playTone, faqs } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    if (openIndex === i) {
      playTone(329.63, 'sine', 0.08);
      setOpenIndex(null);
    } else {
      playTone(659.25, 'sine', 0.12);
      setOpenIndex(i);
    }
  };

  return (
    <div className="py-20 bg-[#FAF9F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest text-purple-600 font-semibold block">Coordinate Clarification</span>
          <h2 className="text-3xl font-serif text-stone-800">Celestial FAQ Registry</h2>
          <p className="text-stone-500 text-sm font-light">
            Expand our coordinates registry to clarify calculations, consultation bookings, and apothecary shipping times.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggle(i)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none group"
              >
                <span className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wide group-hover:text-purple-700 transition-colors">
                  {item.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 text-stone-400 transition-transform duration-300 shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: openIndex === i ? '300px' : '0px' }}
              >
                <p className="px-6 pb-5 text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
