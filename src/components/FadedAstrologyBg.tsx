'use client';

interface FadedAstrologyBgProps {
  className?: string;
  opacity?: number;
}

export default function FadedAstrologyBg({ className = '', opacity = 0.15 }: FadedAstrologyBgProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* Background Radial Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600/20 filter blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/15 filter blur-[120px]" />
      <div className="absolute -bottom-24 left-1/3 w-[450px] h-[450px] rounded-full bg-rose-500/15 filter blur-[110px]" />

      {/* Faded SVG Constellation Pattern Grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="astrology-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Constellation line segments */}
            <path d="M 20 20 L 60 40 L 100 20 M 60 40 L 60 90 M 30 70 L 90 70" stroke="#fef08a" strokeWidth="0.75" fill="none" strokeDasharray="3 3" />
            <circle cx="20" cy="20" r="1.5" fill="#fef08a" />
            <circle cx="60" cy="40" r="2" fill="#f43f5e" />
            <circle cx="100" cy="20" r="1.5" fill="#fef08a" />
            <circle cx="60" cy="90" r="1.5" fill="#c084fc" />
            <circle cx="30" cy="70" r="1.5" fill="#fef08a" />
            <circle cx="90" cy="70" r="1.5" fill="#c084fc" />

            {/* Subtle Starbursts in grid */}
            <text x="10" y="105" fill="#fef08a" fontSize="10" fontFamily="serif">✦</text>
            <text x="85" y="45" fill="#e879f9" fontSize="8" fontFamily="serif">✧</text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#astrology-pattern)" />
      </svg>

      {/* Floating Faded Celestial Symbols */}
      <div className="absolute top-8 left-[8%] text-amber-200/25 text-3xl sm:text-5xl font-serif animate-pulse" style={{ animationDuration: '6s' }}>
        ✦
      </div>
      <div className="absolute top-1/4 right-[6%] text-purple-300/20 text-4xl sm:text-6xl font-serif">
        🪐
      </div>
      <div className="absolute top-1/2 left-[4%] text-rose-300/25 text-3xl sm:text-5xl font-serif">
        🌙
      </div>
      <div className="absolute bottom-1/3 right-[12%] text-amber-300/20 text-3xl sm:text-5xl font-serif animate-pulse" style={{ animationDuration: '8s' }}>
        ✧
      </div>
      <div className="absolute bottom-12 left-[15%] text-purple-200/25 text-4xl sm:text-6xl font-serif">
        ✨
      </div>
      <div className="absolute top-12 right-[25%] text-amber-100/20 text-2xl sm:text-4xl font-serif">
        ✨
      </div>
    </div>
  );
}
