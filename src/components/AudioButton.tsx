'use client';

import { useApp } from '@/context/AppContext';

export default function AudioButton() {
  const { audioEnabled, toggleAudio } = useApp();

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-white/95 border border-stone-200/80 hover:border-amber-400 px-4 py-2.5 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 group"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <span className={`text-sm text-purple-700 ${audioEnabled ? 'animate-pulse' : ''}`}>🎵</span>
        {!audioEnabled && (
          <span className="absolute w-2 h-2 rounded-full bg-amber-400 -top-0.5 -right-0.5" />
        )}
      </div>
      <span className="text-xs font-semibold text-stone-700 tracking-wider">
        Celestial Sound: {audioEnabled ? 'On' : 'Off'}
      </span>
    </button>
  );
}
