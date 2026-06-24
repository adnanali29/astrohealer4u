'use client';

import { useApp } from '@/context/AppContext';

export default function AboutTab() {
  const { switchTab } = useApp();

  return (
    <section className="relative py-16 md:py-28 px-4 overflow-hidden bg-gradient-to-br from-[#FAF9F5] via-[#FCFBF9] to-[#F5F2EB] min-h-[85vh]">
      {/* Premium background radial highlights */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-purple-200/10 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-rose-200/10 filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-amber-100/10 filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Stylized Arch Portrait Frame & Orbit Rings */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Glowing background halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-amber-300/25 filter blur-3xl pointer-events-none" />

            {/* Orbiting Celestial Circles */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-amber-300/40 animate-spin pointer-events-none" style={{ animationDuration: '45s' }} />
            <div className="absolute -inset-10 rounded-full border border-purple-300/30 pointer-events-none" style={{ animation: 'spin 60s linear infinite reverse' }} />
            
            {/* Elegant Portrait Frame - Modern Temple Arch Shape */}
            <div className="relative w-full max-w-[325px] aspect-[3/4.2] rounded-t-[162px] rounded-b-[42px] bg-gradient-to-tr from-purple-200 via-rose-100 to-amber-200 p-1.5 shadow-2xl overflow-hidden group">
              <div className="w-full h-full rounded-t-[156px] rounded-b-[36px] overflow-hidden relative bg-stone-100 border border-white/40">
                <img
                  src="https://i.ibb.co/WNLPvBzx/IMG-8762.png"
                  alt="Garima Verma - Founder & Astro-Alchemist"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-stone-900/10 to-transparent pointer-events-none" />
                <div className="absolute top-6 right-6 text-white/80 text-xl font-serif">✦</div>
                <div className="absolute bottom-6 left-6 text-white/80 text-xl font-serif">★</div>
              </div>
            </div>

            {/* Floating Glassmorphism Title Badge */}
            <div className="mt-8 bg-white/80 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/60 shadow-xl text-center w-full max-w-[280px] z-10 transition-transform hover:scale-[1.02] duration-300">
              <span className="block font-serif text-xl font-bold text-stone-900 leading-tight">Garima Verma</span>
              <span className="text-[10px] uppercase tracking-widest text-purple-600 font-bold block mt-1">Founder & Astro-Alchemist</span>
            </div>
          </div>

          {/* Right Column: bio, credentials and personal statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100/60 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-purple-700">
                <span>✨</span> The Astro-Alchemist
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
                AstroHealer4u <span className="font-light italic text-purple-900 font-sans block mt-1.5 text-2xl sm:text-3xl">by Garima Verma</span>
              </h2>
              {/* Premium Quote Block */}
              <div className="relative border-l-4 border-purple-400 pl-4 py-2 italic text-stone-600 font-light text-sm sm:text-base bg-purple-50/30 pr-4 rounded-r-xl leading-relaxed">
                <span className="absolute -top-3 -left-1 text-6xl text-purple-200 pointer-events-none select-none">&ldquo;</span>
                In the laboratory, I studied the physical science of matter. In the universe, I discovered the spiritual alchemy of the soul.
                <span className="absolute -bottom-8 right-2 text-6xl text-purple-200 pointer-events-none select-none">&rdquo;</span>
              </div>
            </div>

            {/* Narrative */}
            <div className="text-stone-600 space-y-4 font-light leading-relaxed text-sm sm:text-base">
              <p>
                Greetings, curious seeker. My journey into astrology and crystals began not with superstition, but with molecular grids. Holding a <strong>Masters degree in Chemistry</strong>, I spent years researching the atomic structure of elements, bonding, and crystallization processes.
              </p>
              <p>
                Through this scientific lens, I realized that crystals are not inert decorations. Their geometric lattices form perfect, natural vibratory channels capable of focusing energy fields. At <strong>AstroHealer4u</strong>, I integrate this chemical understanding with <strong>Vedic Astrology</strong> and <strong>Vastu Shastra</strong> to provide remedies free of superstition, structured for modern paths.
              </p>
            </div>

            {/* Credential Grid */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Qualifications & Sacred Path</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Cred 1 */}
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-xl shrink-0">🎓</div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-stone-900 uppercase tracking-wide">Masters in Chemistry</span>
                    <p className="text-[11px] text-stone-500 font-light leading-snug">Blending chemical sciences with structural energy resonance of stones.</p>
                  </div>
                </div>

                {/* Cred 2 */}
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">🔭</div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-stone-900 uppercase tracking-wide">Vedic Astrologer</span>
                    <p className="text-[11px] text-stone-500 font-light leading-snug">Decoding planetary transits and natal charts into actionable life paths.</p>
                  </div>
                </div>

                {/* Cred 3 */}
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl shrink-0">🧭</div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-stone-900 uppercase tracking-wide">Vastu Consultant</span>
                    <p className="text-[11px] text-stone-500 font-light leading-snug">Aligning spatial directions to optimize abundance, flow, and protection.</p>
                  </div>
                </div>

                {/* Cred 4 */}
                <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/50 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-xl shrink-0">✨</div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-stone-900 uppercase tracking-wide">Spiritual Guide</span>
                    <p className="text-[11px] text-stone-500 font-light leading-snug">Leading mindfulness, crystal programming, and energy alignment rituals.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Timeline of Journey */}
            <div className="border-t border-stone-200/60 pt-8 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">The Journey of AstroHealer4u</h4>
              <div className="relative border-l border-stone-200/80 ml-3 pl-6 space-y-6 text-xs text-stone-600">
                {/* Node 1 */}
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-white" />
                  <span className="font-bold text-stone-900">Academic Roots in Science</span>
                  <p className="text-stone-500 font-light mt-0.5 font-sans">Conducted molecular structure research, focusing on crystal structures and compounds.</p>
                </div>
                {/* Node 2 */}
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white" />
                  <span className="font-bold text-stone-900">Vedic Synthesis & Vastu Practice</span>
                  <p className="text-stone-500 font-light mt-0.5 font-sans">Studied Vedic astrology and Vastu science to bridge spatial geometry with astro-transits.</p>
                </div>
                {/* Node 3 */}
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-white" />
                  <span className="font-bold text-stone-900">AstroHealer4u Crystals Launch</span>
                  <p className="text-stone-500 font-light mt-0.5 font-sans">Began sourcing ethical minerals, cleansing them under solar peaks, and aligning them with user chakras.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button
                onClick={() => switchTab('consultation')}
                className="px-8 py-3.5 bg-stone-900 hover:bg-purple-950 text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => switchTab('shop')}
                className="px-8 py-3.5 border-2 border-purple-200 hover:border-purple-300 bg-white hover:bg-stone-50 text-purple-700 font-bold text-xs tracking-wider uppercase rounded-full transition-all shadow-sm active:scale-[0.98]"
              >
                Explore Crystals
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
