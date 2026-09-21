'use client';

import { useState, useId } from 'react';
import { useApp } from '@/context/AppContext';
import { ZODIAC_SIGNS } from '@/lib/data';

type ChartState = 'waiting' | 'calculating' | 'results';

interface NatalData {
  sun: string;
  moon: string;
  asc: string;
  summary: string;
  rotation: number;
}

export default function BirthChartSection() {
  const { playTone, showToast } = useApp();
  const [chartState, setChartState] = useState<ChartState>('waiting');
  const [natalData, setNatalData] = useState<NatalData | null>(null);
  const dateId = useId();
  const timeId = useId();
  const placeId = useId();

  const calculateChart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const birthDate = (form.querySelector('#' + CSS.escape(dateId)) as HTMLInputElement)?.value;
    const birthPlace = (form.querySelector('#' + CSS.escape(placeId)) as HTMLInputElement)?.value;

    if (!birthDate || !birthPlace) return;

    playTone(440, 'sine', 0.15);
    setTimeout(() => playTone(659.25, 'triangle', 0.15), 350);

    setChartState('calculating');

    setTimeout(() => {
      const parsedDate = new Date(birthDate);
      const day = parsedDate.getDate() || 15;
      const month = parsedDate.getMonth() || 6;

      const sunSign = ZODIAC_SIGNS[month % 12];
      const moonSign = ZODIAC_SIGNS[(day * 2) % 12];
      const ascSign = ZODIAC_SIGNS[(day + month) % 12];

      const elementsList = [
        'Ethereal stardust elements', 'Igniting high flame potentials',
        'Grounded fertile earth foundations', 'Breezy mental pathways', 'Fluid intuitive tide streams',
      ];

      setNatalData({
        sun: `${sunSign.name} (House ${(day % 12) + 1})`,
        moon: `${moonSign.name} (House ${((day + month) % 12) + 1})`,
        asc: `${ascSign.name} (Ascendant Zenith)`,
        summary: `Your stellar coordinates demonstrate a magnificent interaction between ${sunSign.name} sun and ${moonSign.name} aspects. Your spatial field is highly optimized by introducing ${elementsList[day % 5]}.`,
        rotation: 180 + (day * 15) % 360,
      });
      setChartState('results');

      playTone(523.25, 'sine', 0.2);
      setTimeout(() => playTone(659.25, 'sine', 0.15), 150);
      setTimeout(() => playTone(783.99, 'sine', 0.15), 300);
      setTimeout(() => playTone(1046.50, 'sine', 0.25), 450);
      showToast('Astral blueprint calculated! Dynamic house lines structured successfully. 🔮');
    }, 1500);
  };

  const reset = () => {
    playTone(293.66, 'sine', 0.15);
    setChartState('waiting');
    setNatalData(null);
  };

  return (
    <div className="py-20 bg-[#0B0813] text-white border-t border-purple-950/40 relative font-sans overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#140F26]/90 border border-amber-400/25 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12">

          {/* Form Panel */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6 bg-black/25">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">✦ Stellar Calibration</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">Procedural Natal Blueprint</h2>
              <p className="text-purple-200/80 text-xs sm:text-sm font-light mt-2 leading-relaxed">
                Input your exact terrestrial coordinates to map your foundational planet structures.
              </p>
            </div>

            <form onSubmit={calculateChart} className="space-y-4">
              <div>
                <label htmlFor={dateId} className="block text-xs font-semibold text-purple-200 mb-1.5 uppercase tracking-wider">Date of Descent</label>
                <input
                  type="date"
                  id={dateId}
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/30 bg-stone-900/90 text-white text-sm focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30 transition-all placeholder:text-stone-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={timeId} className="block text-xs font-semibold text-purple-200 mb-1.5 uppercase tracking-wider">Descent Time</label>
                  <input
                    type="time"
                    id={timeId}
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 bg-stone-900/90 text-white text-sm focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30 transition-all placeholder:text-stone-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={placeId} className="block text-xs font-semibold text-purple-200 mb-1.5 uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    id={placeId}
                    placeholder="Paris, France"
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 bg-stone-900/90 text-white text-sm focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30 transition-all placeholder:text-stone-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                🧭 Calculate Astral Mapping
              </button>
            </form>
          </div>

          {/* Visualizer Panel */}
          <div className="lg:col-span-7 bg-[#0A0713]/80 p-8 sm:p-12 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-purple-500/20 min-h-[400px]">

            {chartState === 'waiting' && (
              <div className="text-center space-y-4 max-w-sm">
                <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300 shadow-inner">
                  <span className="text-3xl animate-spin text-amber-300" style={{ display: 'inline-block', animationDuration: '10s' }}>⭐</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white">Awaiting Alignment Values</h3>
                <p className="text-xs text-purple-200/70 font-light leading-relaxed">
                  Enter your physical parameters to activate the astrological projection matrix.
                </p>
              </div>
            )}

            {chartState === 'calculating' && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 relative flex items-center justify-center mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-400/60 animate-spin" />
                  <span className="text-3xl text-amber-300 animate-pulse">🧭</span>
                </div>
                <h3 className="text-lg font-serif text-amber-200 animate-pulse font-bold">Consulting Ephemeris Registers...</h3>
              </div>
            )}

            {chartState === 'results' && natalData && (
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">✦ YOUR PROPORTIONAL ALIGNMENT</span>
                  <button onClick={reset} className="text-xs text-rose-400 hover:text-rose-300 transition-colors uppercase font-bold tracking-wider">Re-calibrate</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* SVG Chart Wheel */}
                  <div className="flex justify-center">
                    <svg
                      className="w-60 h-60 transition-transform duration-1000 ease-out drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                      style={{ transform: `rotate(${natalData.rotation}deg)` }}
                      viewBox="0 0 200 200"
                    >
                      <circle cx="100" cy="100" r="95" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#A855F7" strokeWidth="0.8" opacity="0.5" />
                      <circle cx="100" cy="100" r="45" fill="none" stroke="#38BDF8" strokeDasharray="3,3" strokeWidth="0.8" opacity="0.5" />
                      <line x1="100" y1="5" x2="100" y2="195" stroke="#F59E0B" strokeWidth="0.5" opacity="0.4" />
                      <line x1="5" y1="100" x2="195" y2="100" stroke="#F59E0B" strokeWidth="0.5" opacity="0.4" />
                      <line x1="33" y1="33" x2="167" y2="167" stroke="#A855F7" strokeWidth="0.4" strokeDasharray="1,1" opacity="0.4" />
                      <line x1="167" y1="33" x2="33" y2="167" stroke="#A855F7" strokeWidth="0.4" strokeDasharray="1,1" opacity="0.4" />
                      <circle cx="100" cy="40" r="4" fill="#F59E0B" />
                      <line x1="100" y1="100" x2="100" y2="40" stroke="#F59E0B" strokeWidth="1" />
                      <text x="100" y="32" fontSize="7" fill="#F59E0B" fontWeight="bold" textAnchor="middle">☉</text>
                      <circle cx="150" cy="80" r="4" fill="#38BDF8" />
                      <line x1="100" y1="100" x2="150" y2="80" stroke="#38BDF8" strokeWidth="1" />
                      <text x="158" y="80" fontSize="7" fill="#38BDF8" fontWeight="bold" textAnchor="middle">☽</text>
                      <circle cx="60" cy="130" r="4" fill="#C084FC" />
                      <line x1="100" y1="100" x2="60" y2="130" stroke="#C084FC" strokeWidth="1" />
                      <text x="52" y="136" fontSize="7" fill="#C084FC" fontWeight="bold" textAnchor="middle">ASC</text>
                    </svg>
                  </div>

                  {/* Analysis */}
                  <div className="space-y-4">
                    <div className="space-y-2.5">
                      {[
                        { icon: '☀️', label: 'Sun:', value: natalData.sun },
                        { icon: '🌙', label: 'Moon:', value: natalData.moon },
                        { icon: '🧭', label: 'Ascendant:', value: natalData.asc },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-purple-500/20">
                          <span className="text-base">{icon}</span>
                          <span className="text-xs text-purple-200 font-medium">{label}</span>
                          <span className="text-xs font-bold text-amber-300">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-purple-950/60 rounded-xl border border-purple-500/30 text-xs text-purple-100 font-light leading-relaxed">
                      <strong className="text-amber-300 font-bold block mb-1">Aura Spectrum Matrix:</strong> {natalData.summary}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
