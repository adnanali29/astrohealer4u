'use client';

import { useState, useRef, useId } from 'react';
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
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5]/70 border border-stone-200/60 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">

          {/* Form Panel */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-600 font-bold block mb-1">Stellar Calibration</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-800">Procedural Natal Blueprint</h2>
              <p className="text-stone-500 text-sm font-light mt-2">
                Input your exact terrestrial coordinates to map your foundational planet structures.
              </p>
            </div>

            <form onSubmit={calculateChart} className="space-y-4">
              <div>
                <label htmlFor={dateId} className="block text-xs font-semibold text-stone-600 mb-1.5">Date of Descent</label>
                <input
                  type="date"
                  id={dateId}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200/60 bg-white text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={timeId} className="block text-xs font-semibold text-stone-600 mb-1.5">Descent Time</label>
                  <input
                    type="time"
                    id={timeId}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200/60 bg-white text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={placeId} className="block text-xs font-semibold text-stone-600 mb-1.5">Descent Location</label>
                  <input
                    type="text"
                    id={placeId}
                    placeholder="Paris, France"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200/60 bg-white text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-stone-950 text-white font-medium text-xs tracking-wider uppercase rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                🧭 Calculate Astral Mapping
              </button>
            </form>
          </div>

          {/* Visualizer Panel */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-stone-200/60 min-h-[400px]">

            {chartState === 'waiting' && (
              <div className="text-center space-y-4 max-w-sm">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto text-purple-400">
                  <span className="text-2xl animate-spin" style={{ display: 'inline-block', animationDuration: '8s' }}>⭐</span>
                </div>
                <h3 className="text-lg font-serif text-stone-700">Awaiting Alignment Values</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Enter your physical parameters to activate the astrological projection matrix.
                </p>
              </div>
            )}

            {chartState === 'calculating' && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 relative flex items-center justify-center mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-purple-200 animate-spin" />
                  <span className="text-2xl text-purple-600 animate-pulse">🧭</span>
                </div>
                <h3 className="text-lg font-serif text-purple-800 animate-pulse">Consulting Ephemeris Registers...</h3>
              </div>
            )}

            {chartState === 'results' && natalData && (
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="text-xs uppercase tracking-widest text-purple-600 font-bold">YOUR PROPORTIONAL ALIGNMENT</span>
                  <button onClick={reset} className="text-xs text-rose-500 hover:underline">Re-calibrate</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* SVG Chart Wheel */}
                  <div className="flex justify-center">
                    <svg
                      className="w-56 h-56 transition-transform duration-1000 ease-out"
                      style={{ transform: `rotate(${natalData.rotation}deg)` }}
                      viewBox="0 0 200 200"
                    >
                      <circle cx="100" cy="100" r="95" fill="none" stroke="#E2DFD2" strokeWidth="1" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#E2DFD2" strokeWidth="0.7" />
                      <circle cx="100" cy="100" r="45" fill="none" stroke="#E2DFD2" strokeDasharray="2,2" strokeWidth="0.7" />
                      <line x1="100" y1="5" x2="100" y2="195" stroke="#E2DFD2" strokeWidth="0.5" />
                      <line x1="5" y1="100" x2="195" y2="100" stroke="#E2DFD2" strokeWidth="0.5" />
                      <line x1="33" y1="33" x2="167" y2="167" stroke="#E2DFD2" strokeWidth="0.3" strokeDasharray="1,1" />
                      <line x1="167" y1="33" x2="33" y2="167" stroke="#E2DFD2" strokeWidth="0.3" strokeDasharray="1,1" />
                      <circle cx="100" cy="40" r="4" fill="#DFD1B0" />
                      <line x1="100" y1="100" x2="100" y2="40" stroke="#DFD1B0" strokeWidth="0.8" />
                      <text x="100" y="32" fontSize="6" fill="#78716C" textAnchor="middle">☉</text>
                      <circle cx="150" cy="80" r="4" fill="#93C5FD" />
                      <line x1="100" y1="100" x2="150" y2="80" stroke="#93C5FD" strokeWidth="0.8" />
                      <text x="156" y="80" fontSize="6" fill="#78716C" textAnchor="middle">☽</text>
                      <circle cx="60" cy="130" r="4" fill="#C084FC" />
                      <line x1="100" y1="100" x2="60" y2="130" stroke="#C084FC" strokeWidth="0.8" />
                      <text x="54" y="136" fontSize="6" fill="#78716C" textAnchor="middle">ASC</text>
                    </svg>
                  </div>

                  {/* Analysis */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {[
                        { icon: '☀️', label: 'Sun:', value: natalData.sun },
                        { icon: '🌙', label: 'Moon:', value: natalData.moon },
                        { icon: '🧭', label: 'Ascendant:', value: natalData.asc },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="flex items-center gap-1.5">
                          <span className="text-sm">{icon}</span>
                          <span className="text-xs text-stone-500">{label}</span>
                          <span className="text-xs font-semibold text-stone-800">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100/30 text-xs text-purple-950 font-light leading-relaxed">
                      <strong>Aura Spectrum Matrix:</strong> {natalData.summary}
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
