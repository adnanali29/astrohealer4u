'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import FadedAstrologyBg from '@/components/FadedAstrologyBg';

export default function ContactTab() {
  const { playTone, showToast, officeAddress, contactEmail, contactPhone } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTone(523.25, 'triangle', 0.2);
    setSubmitted(true);
    showToast("Courier dispatch successfully initiated! 🕊️");
  };

  const reset = () => {
    playTone(293.66, 'sine', 0.12);
    setSubmitted(false);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0a0818] text-white min-h-[85vh] relative overflow-hidden">
      <FadedAstrologyBg opacity={0.16} />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">✦ Direct Celestial Dispatch</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">Get In Touch</h1>
          <p className="text-purple-200/80 font-light text-xs sm:text-sm max-w-lg mx-auto">
            Connect directly with Garima Verma for customized astro consultation inquiries, crystal placement guidance, or partnership questions.
          </p>
        </div>

        {/* White Card Wrapper */}
        <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">

          {/* Left Column: Contact Details (Dark Purple Accent Pane) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#180e2e] via-[#1f123d] to-[#120924] p-8 sm:p-12 space-y-8 flex flex-col justify-between border-r border-purple-900/30 text-white relative">
            
            {/* Subtle glow inside pane */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-extrabold block">Aura Messenger</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold leading-tight">Stellar Dispatch</h2>
              <p className="text-purple-200/80 text-xs font-light leading-relaxed">
                Send a message regarding birth mappings, customized daily calendars, or crystal apothecaries.
              </p>
            </div>

            <div className="space-y-5 text-xs relative z-10">
              {[
                { icon: '📍', label: 'Office Location', value: officeAddress },
                { icon: '📧', label: 'Contact Email', value: contactEmail },
                { icon: '📞', label: 'Phone Number', value: contactPhone },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-200 text-base shadow-sm shrink-0">
                    {icon}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block text-amber-300 font-bold">{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-purple-200/60 leading-relaxed font-light border-t border-purple-800/40 pt-4 relative z-10">
              ⚡ We respond to all authentic queries within 1 solar cycle.
            </div>
          </div>

          {/* Right Column: White Card Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 justify-center flex flex-col bg-white text-stone-900">
            {submitted ? (
              <div className="text-center py-8 space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-3xl font-serif">✦</div>
                <h3 className="text-xl font-serif text-stone-900 font-bold">Dispatch Transmitted</h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Your message has been launched successfully. Our AstroHealer4u team will review it shortly.
                </p>
                <button onClick={reset} className="text-xs font-bold text-purple-700 hover:underline">
                  Send another dispatch →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-stone-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Email Destination</label>
                  <input
                    type="email"
                    placeholder="yourname@domain.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-stone-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Inquiry Details</label>
                  <textarea
                    rows={4}
                    placeholder="Write your consultation or crystal inquiry details..."
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-[#FAF9F5] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-stone-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-700 via-rose-600 to-amber-500 hover:opacity-90 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  Transmit Message ✦
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
