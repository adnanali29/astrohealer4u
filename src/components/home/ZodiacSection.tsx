'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ZODIAC_SIGNS, HOROSCOPES_TEXT_BANK, ZodiacSign } from '@/lib/data';

export default function ZodiacSection() {
  const { switchTab, playTone } = useApp();
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign>(ZODIAC_SIGNS[0]);
  const [timeframe, setTimeframe] = useState<'Today' | 'Weekly' | 'Yearly'>('Today');

  const selectSign = (sign: ZodiacSign) => {
    playTone(329.63, 'sine', 0.12);
    setSelectedZodiac(sign);
  };

  const changeTimeframe = (tf: 'Today' | 'Weekly' | 'Yearly') => {
    playTone(392.00, 'sine', 0.08);
    setTimeframe(tf);
  };

  const horoscopeTextIndex = selectedZodiac.name.charCodeAt(0) % 3;
  const horoscopeText = HOROSCOPES_TEXT_BANK[timeframe][horoscopeTextIndex];

  return (
    <div className="py-20 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-purple-600 font-semibold block">Planetary Alignment</span>
          <h2 className="text-3xl font-serif text-stone-800">Your Celestial Zodiac Oracle</h2>
          <p className="text-stone-500 max-w-xl mx-auto font-light text-sm">
            Tap any native alignment sign below to unlock real-time zodiac characteristics and ruling parameters.
          </p>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 mb-10">
          {ZODIAC_SIGNS.map(sign => {
            const isSel = selectedZodiac.name === sign.name;
            return (
              <button
                key={sign.name}
                onClick={() => selectSign(sign)}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 transform hover:-translate-y-1 border ${
                  isSel
                    ? 'bg-gradient-to-tr from-purple-100 via-purple-50 to-rose-50 border-purple-300 shadow-md scale-105'
                    : 'bg-white hover:bg-stone-50 hover:border-stone-200 border-stone-200/40'
                }`}
              >
                <span className={`text-2xl ${isSel ? 'scale-110' : 'text-stone-500'}`}>{sign.symbol}</span>
                <span className="text-xs font-semibold text-stone-700 block truncate w-full text-center">{sign.name}</span>
                <span className="text-[9px] text-stone-400 block truncate">{sign.element}</span>
              </button>
            );
          })}
        </div>

        {/* Horoscope Display */}
        <div className="bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-300 via-rose-300 to-amber-300" />

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-b border-stone-100 pb-6 mb-6">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${selectedZodiac.color} flex items-center justify-center text-3xl shadow-sm border border-white`}>
                {selectedZodiac.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-serif font-bold text-stone-800">{selectedZodiac.name}</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border border-stone-200/20 bg-gradient-to-tr ${selectedZodiac.color} ${selectedZodiac.text}`}>
                    {selectedZodiac.element}
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {selectedZodiac.date} • Ruling Planet: {selectedZodiac.rulingPlanet}
                </p>
              </div>
            </div>

            {/* Timeframe Tabs */}
            <div className="flex bg-stone-100/80 p-1 rounded-xl gap-1">
              {(['Today', 'Weekly', 'Yearly'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => changeTimeframe(tf)}
                  className={`flex-1 md:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    timeframe === tf
                      ? 'bg-white text-purple-700 shadow-sm'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <span className="text-xs uppercase tracking-wider text-purple-600 font-bold block">Intuitive Guidance</span>
              <p className="text-stone-700 leading-relaxed font-light text-base">{horoscopeText}</p>
              <p className="text-xs italic text-stone-400">&quot;{selectedZodiac.description}&quot;</p>
            </div>

            <div className="space-y-4 bg-[#FAF9F5]/60 p-5 rounded-2xl border border-stone-100">
              <span className="text-xs uppercase tracking-wider text-rose-600 font-bold block">astroheal4U Sign Parameters</span>
              <div className="space-y-3">
                {[
                  { label: 'Love Vibration:', value: selectedZodiac.love },
                  { label: 'Aura Color:', value: selectedZodiac.aura },
                  { label: 'Lucky Number:', value: selectedZodiac.lucky, className: 'text-purple-700 font-mono' },
                  { label: 'Strong Synergy:', value: selectedZodiac.synergy },
                ].map(({ label, value, className }) => (
                  <div key={label} className="flex justify-between text-xs border-b border-stone-200/40 pb-1.5 last:border-0">
                    <span className="text-stone-500">{label}</span>
                    <span className={`font-semibold text-stone-700 ${className || ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => switchTab('consultation')}
                className="w-full py-2.5 bg-white hover:bg-purple-50 text-purple-700 text-xs font-semibold rounded-xl transition-colors border border-purple-100/30 flex items-center justify-center gap-1.5 shadow-sm"
              >
                Deepen with full 1-on-1 reading
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
