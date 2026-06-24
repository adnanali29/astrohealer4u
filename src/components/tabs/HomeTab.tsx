'use client';

import HeroSection from '@/components/home/HeroSection';
import TarotSection from '@/components/home/TarotSection';
import ZodiacSection from '@/components/home/ZodiacSection';
import BirthChartSection from '@/components/home/BirthChartSection';
import FaqSection from '@/components/home/FaqSection';
import { useApp } from '@/context/AppContext';
import { SERVICES } from '@/lib/data';

export default function HomePage() {
  const { switchTab, openBooking, testimonials, services, displayedServices } = useApp();

  const teaserSessions = displayedServices
    .map(id => services.find(s => s.id === id))
    .filter(Boolean) as typeof services;

  const handleBookNow = (serviceId: string) => {
    const matchedService = services.find(s => s.id === serviceId);
    if (matchedService) {
      openBooking(matchedService);
    }
  };

  // Star rendering helper
  const renderStars = (rating: number) => {
    const starsArray = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsArray.push(<span key={i} className="text-amber-400 text-xs">★</span>);
      } else if (i === fullStars && hasHalf) {
        starsArray.push(
          <span key={i} className="text-amber-400 text-xs relative inline-block select-none">
            ★
            <span className="absolute top-0 left-[50%] right-0 bottom-0 overflow-hidden text-stone-200 select-none">★</span>
          </span>
        );
      } else {
        starsArray.push(<span key={i} className="text-stone-200 text-xs">★</span>);
      }
    }
    return <div className="flex gap-0.5">{starsArray}</div>;
  };

  // Infinite marquee tracks
  const half = Math.ceil(testimonials.length / 2);
  const track1 = [...testimonials.slice(0, half), ...testimonials.slice(0, half)];
  const track2 = [...testimonials.slice(half), ...testimonials.slice(half)];

  return (
    <div>
      <HeroSection />
      <TarotSection />
      <ZodiacSection />
      <BirthChartSection />

      {/* Consultation Teasers */}
      <div className="py-20 bg-[#FAF9F5]/40 border-t border-stone-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-purple-600 font-semibold block">Jyotish Consultation Services</span>
            <h2 className="text-3xl font-serif text-stone-800">Popular Services</h2>
            <p className="text-stone-500 text-sm font-light leading-relaxed">
              Expert astrology guidance via Chat, Call or Video Consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-10">
            {teaserSessions.map((s, i) => {
              const isMiddle = i === 1;
              return (
                <div 
                  key={i} 
                  className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between relative ${
                    isMiddle 
                      ? 'p-8 border-purple-300/80 shadow-2xl md:scale-105 z-10 bg-gradient-to-b from-white to-purple-50/20 md:-translate-y-2' 
                      : 'p-6 border-stone-200/50 hover:shadow-lg hover:border-purple-200 shadow-sm'
                  }`}
                >
                  {isMiddle && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      🔥 Best Seller
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl">{s.icon}</div>
                      {isMiddle && (
                        <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider bg-purple-100/40 px-2.5 py-0.5 rounded-full">Recommended</span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-stone-800 leading-snug">{s.title}</h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Dynamic Pricing Columns */}
                  {(() => {
                    const priceCols = [s.chatPrice, s.callPrice, s.videoPrice].filter(p => p !== null && p !== undefined).length;
                    return (
                      <div className={`pt-5 mt-5 border-t border-stone-100 grid gap-2 ${
                        priceCols === 3 ? 'grid-cols-3' : priceCols === 2 ? 'grid-cols-2' : 'grid-cols-1'
                      }`}>
                        {s.chatPrice !== null && s.chatPrice !== undefined && (
                          <div className="text-center bg-green-50/70 rounded-xl p-2 border border-green-100/60">
                            <span className="text-[9px] text-stone-500 block font-semibold uppercase">💬 Chat</span>
                            <span className="text-xs font-bold text-green-700 font-mono">₹{s.chatPrice.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        {s.callPrice !== null && s.callPrice !== undefined && (
                          <div className="text-center bg-blue-50/70 rounded-xl p-2 border border-blue-100/60">
                            <span className="text-[9px] text-stone-500 block font-semibold uppercase">📞 Call</span>
                            <span className="text-xs font-bold text-blue-700 font-mono">₹{s.callPrice.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        {s.videoPrice !== null && s.videoPrice !== undefined && (
                          <div className="text-center bg-purple-50/70 rounded-xl p-2 border border-purple-100/60">
                            <span className="text-[9px] text-stone-500 block font-semibold uppercase">📹 Video</span>
                            <span className="text-xs font-bold text-purple-700 font-mono">₹{s.videoPrice.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => handleBookNow(s.id)}
                    className={`mt-4 w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                      isMiddle 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' 
                        : 'bg-stone-900 hover:bg-purple-800 text-white'
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => switchTab('consultation')} className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-md">
              View All 10 Services
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Marquee Section */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-purple-600 font-semibold block">Aligned Client Experiences</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-800">Reviews & Cosmic Testimonies</h2>
            <p className="text-stone-500 text-xs sm:text-sm font-light max-w-xl mx-auto">
              Read feedback from 30 verified clients locally and globally. Hover to pause autoscrolling.
            </p>
          </div>
        </div>

        {/* Marquee Tracks */}
        <div className="space-y-6">
          {/* Row 1: Leftward Marquee */}
          <div className="w-full overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee flex gap-6 py-2 select-none">
              {track1.map((t, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FAF9F5] border border-stone-200/50 rounded-3xl p-6 hover:shadow-md hover:border-purple-200/50 transition-all duration-300 w-[280px] sm:w-[320px] shrink-0 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      {renderStars(t.stars)}
                      <span className="text-[10px] text-purple-600 font-semibold uppercase font-mono">{t.sign}</span>
                    </div>
                    <p className="text-stone-600 text-xs font-light leading-relaxed italic">{t.text}</p>
                  </div>
                  <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-stone-200/30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-100 to-rose-100 flex items-center justify-center text-xs font-bold text-purple-700 uppercase">
                      {t.name[0]}
                    </div>
                    <span className="text-xs font-bold text-stone-800">{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Marquee */}
          <div className="w-full overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee-reverse flex gap-6 py-2 select-none">
              {track2.map((t, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FAF9F5] border border-stone-200/50 rounded-3xl p-6 hover:shadow-md hover:border-purple-200/50 transition-all duration-300 w-[280px] sm:w-[320px] shrink-0 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      {renderStars(t.stars)}
                      <span className="text-[10px] text-purple-600 font-semibold uppercase font-mono">{t.sign}</span>
                    </div>
                    <p className="text-stone-600 text-xs font-light leading-relaxed italic">{t.text}</p>
                  </div>
                  <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-stone-200/30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-100 to-rose-100 flex items-center justify-center text-xs font-bold text-purple-700 uppercase">
                      {t.name[0]}
                    </div>
                    <span className="text-xs font-bold text-stone-800">{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FaqSection />

      {/* Styled Inline Marquee Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite reverse;
        }
        .animate-marquee:hover, 
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
